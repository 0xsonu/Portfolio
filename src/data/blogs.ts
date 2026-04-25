export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "building-high-throughput-event-streaming",
    title: "Building High-Throughput Event Streaming Microservices",
    description:
      "Lessons from building streaming microservices that handle 96M events/sec using Kafka, Protobuf, and binary encodings in Java and Go",
    date: "2025-01-15",
    tags: ["Microservices", "Kafka", "Event Streaming", "Java", "Go"],
    readTime: "8 min read",
    content: `
# Building High-Throughput Event Streaming Microservices

When your system needs to process tens of millions of events per second, every design decision matters. Over the past year, I've built production-grade streaming microservices in Java and Go that achieve peak throughput of 96M events/sec. Here's what I learned.

## Why Binary Encodings Matter

JSON is convenient, but at high throughput it becomes a bottleneck. Serialization and deserialization eat CPU cycles, and the verbose text format wastes bandwidth. Switching to binary encodings like **Protocol Buffers (Protobuf)** and **ASN.1** was one of the biggest wins.

\`\`\`java
// Protobuf message definition for a telecom event
syntax = "proto3";

message TelecomEvent {
  string event_id = 1;
  int64 timestamp = 2;
  EventType type = 3;
  bytes payload = 4;
  string source_node = 5;

  enum EventType {
    CALL_SETUP = 0;
    CALL_RELEASE = 1;
    HANDOVER = 2;
    LOCATION_UPDATE = 3;
  }
}
\`\`\`

Protobuf gives us compact wire format, schema evolution, and fast serialization. For telecom-specific protocols, ASN.1 with BER/DER encoding is the standard — and it's even more compact for structured data.

\`\`\`java
// Serializing events with Protobuf in Java
TelecomEvent event = TelecomEvent.newBuilder()
    .setEventId(UUID.randomUUID().toString())
    .setTimestamp(System.nanoTime())
    .setType(TelecomEvent.EventType.CALL_SETUP)
    .setPayload(ByteString.copyFrom(rawPayload))
    .setSourceNode("node-42")
    .build();

byte[] serialized = event.toByteArray(); // ~60 bytes vs ~300+ bytes in JSON
\`\`\`

## Kafka Producer Tuning for Maximum Throughput

Default Kafka producer settings are optimized for safety, not speed. For high-throughput scenarios, tuning these parameters is critical:

\`\`\`java
Properties props = new Properties();
props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka-cluster:9092");
props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, ByteArraySerializer.class);
props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, ByteArraySerializer.class);

// Batching: accumulate records before sending
props.put(ProducerConfig.BATCH_SIZE_CONFIG, 65536);        // 64KB batches
props.put(ProducerConfig.LINGER_MS_CONFIG, 5);              // Wait up to 5ms to fill batch
props.put(ProducerConfig.BUFFER_MEMORY_CONFIG, 67108864);   // 64MB buffer

// Compression reduces network I/O
props.put(ProducerConfig.COMPRESSION_TYPE_CONFIG, "lz4");

// Acks=1 for throughput (leader only), acks=all for durability
props.put(ProducerConfig.ACKS_CONFIG, "1");

KafkaProducer<byte[], byte[]> producer = new KafkaProducer<>(props);
\`\`\`

The combination of batching, compression, and binary serialization is what gets us from thousands to millions of events per second.

## Zerocopy Processing in Go

Go's \`io.Reader\` and \`io.Writer\` interfaces make zerocopy pipelines natural. Instead of deserializing every event, we pass raw byte slices through the pipeline and only decode what we need:

\`\`\`go
// Zerocopy event router — reads from Kafka, routes by header, writes to output
func routeEvents(consumer *kafka.Reader, outputs map[string]*kafka.Writer) error {
    for {
        msg, err := consumer.ReadMessage(context.Background())
        if err != nil {
            return fmt.Errorf("read failed: %w", err)
        }

        // Route based on header without deserializing the full payload
        eventType := extractEventType(msg.Value[:4]) // First 4 bytes encode type
        writer, ok := outputs[eventType]
        if !ok {
            continue // Drop unknown event types
        }

        // Write raw bytes — no serialization/deserialization overhead
        err = writer.WriteMessages(context.Background(), kafka.Message{
            Key:   msg.Key,
            Value: msg.Value,
        })
        if err != nil {
            log.Printf("write failed for %s: %v", eventType, err)
        }
    }
}
\`\`\`

## Backpressure Handling

Without backpressure, a fast producer will overwhelm a slow consumer and eventually crash the system. We use a combination of bounded channels and rate limiting:

\`\`\`go
// Bounded channel acts as a natural backpressure mechanism
eventCh := make(chan []byte, 10000) // Buffer 10K events

// Producer goroutine respects channel capacity
go func() {
    for {
        msg, _ := consumer.ReadMessage(ctx)
        select {
        case eventCh <- msg.Value:
            // Sent successfully
        default:
            // Channel full — apply backpressure
            metrics.IncrCounter("backpressure.events_dropped", 1)
            log.Warn("backpressure: dropping event, consumer too slow")
        }
    }
}()
\`\`\`

## Results

With these techniques applied across 6 production microservices:

- **Peak throughput**: 96M events/sec
- **Latency**: Sub-millisecond p99 for event routing
- **Encoding overhead**: ~80% reduction vs JSON (Protobuf)
- **Network bandwidth**: ~60% reduction with LZ4 compression + binary encoding

## Key Takeaways

1. **Choose binary encodings early** — retrofitting Protobuf into a JSON-based system is painful
2. **Batch aggressively** — the overhead of individual sends dominates at high throughput
3. **Avoid unnecessary deserialization** — route and filter on raw bytes when possible
4. **Design for backpressure from day one** — it's not optional at scale
5. **Profile before optimizing** — use async-profiler (Java) or pprof (Go) to find real bottlenecks
    `,
  },
  {
    id: "kubernetes-security-in-production",
    title: "Securing Kubernetes Deployments in Production",
    description:
      "Practical guide to Kubernetes security with RBAC, namespace isolation, encrypted secrets, and Helm-based deployments",
    date: "2024-10-20",
    tags: ["Kubernetes", "Security", "DevOps", "Helm"],
    readTime: "10 min read",
    content: `
# Securing Kubernetes Deployments in Production

Running Kubernetes in production means taking security seriously. Default configurations are permissive by design — great for getting started, terrible for production. Here's how we lock things down across our streaming platform deployments.

## RBAC: Principle of Least Privilege

Role-Based Access Control is the foundation. Every service account should have exactly the permissions it needs and nothing more.

\`\`\`yaml
# Service account for the event-processor microservice
apiVersion: v1
kind: ServiceAccount
metadata:
  name: event-processor-sa
  namespace: streaming
---
# Role scoped to only what event-processor needs
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: event-processor-role
  namespace: streaming
rules:
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get", "watch"]
  - apiGroups: [""]
    resources: ["secrets"]
    verbs: ["get"]
    resourceNames: ["kafka-credentials", "redis-credentials"]
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: event-processor-binding
  namespace: streaming
subjects:
  - kind: ServiceAccount
    name: event-processor-sa
    namespace: streaming
roleRef:
  kind: Role
  name: event-processor-role
  apiGroup: rbac.authorization.k8s.io
\`\`\`

Notice the \`resourceNames\` field on the secrets rule — this restricts access to only the specific secrets the service needs, not all secrets in the namespace.

## Namespace Isolation

We use namespaces to create hard boundaries between environments and teams. Each microservice group gets its own namespace with network policies that enforce isolation:

\`\`\`yaml
# Network policy: streaming namespace can only talk to kafka and redis namespaces
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: streaming-isolation
  namespace: streaming
spec:
  podSelector: {}  # Applies to all pods in namespace
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: ingress-gateway
        - podSelector:
            matchLabels:
              role: api-gateway
      ports:
        - protocol: TCP
          port: 8080
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              name: kafka
      ports:
        - protocol: TCP
          port: 9092
    - to:
        - namespaceSelector:
            matchLabels:
              name: redis
      ports:
        - protocol: TCP
          port: 6379
    - to:  # Allow DNS resolution
        - namespaceSelector: {}
      ports:
        - protocol: UDP
          port: 53
\`\`\`

Without the DNS egress rule, pods can't resolve service names — a common gotcha when first implementing network policies.

## Encrypted Secrets Management

Kubernetes secrets are base64-encoded by default, not encrypted. For production, we encrypt secrets at rest and use external secret management:

\`\`\`yaml
# EncryptionConfiguration for etcd at-rest encryption
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
    providers:
      - aescbc:
          keys:
            - name: key1
              secret: <base64-encoded-32-byte-key>
      - identity: {}  # Fallback for reading old unencrypted secrets
\`\`\`

For sensitive credentials like Kafka broker passwords and Redis auth tokens, we use sealed secrets that can be safely committed to Git:

\`\`\`yaml
apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  name: kafka-credentials
  namespace: streaming
spec:
  encryptedData:
    bootstrap-servers: AgBy3i4OJSWK+PiTySYZZA9rO...
    sasl-password: AgCtr8OJSWK+PiTySYZZA9rO43cG...
    sasl-username: AgBjE8OJSWK+PiTySYZZA9rO43cG...
\`\`\`

## Helm Charts for Consistent Deployments

Helm templates let us enforce security defaults across all microservices. Our base chart includes security contexts, resource limits, and pod disruption budgets:

\`\`\`yaml
# values.yaml — security defaults for all streaming microservices
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
  capabilities:
    drop:
      - ALL

resources:
  requests:
    cpu: 250m
    memory: 512Mi
  limits:
    cpu: "1"
    memory: 1Gi

podDisruptionBudget:
  minAvailable: 1

serviceAccount:
  create: true
  automountServiceAccountToken: false
\`\`\`

\`\`\`yaml
# deployment.yaml template with security context applied
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}
  namespace: {{ .Release.Namespace }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ .Release.Name }}
  template:
    metadata:
      labels:
        app: {{ .Release.Name }}
    spec:
      serviceAccountName: {{ .Release.Name }}-sa
      automountServiceAccountToken: {{ .Values.serviceAccount.automountServiceAccountToken }}
      securityContext:
        runAsNonRoot: {{ .Values.securityContext.runAsNonRoot }}
        runAsUser: {{ .Values.securityContext.runAsUser }}
      containers:
        - name: {{ .Release.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          securityContext:
            readOnlyRootFilesystem: {{ .Values.securityContext.readOnlyRootFilesystem }}
            allowPrivilegeEscalation: {{ .Values.securityContext.allowPrivilegeEscalation }}
            capabilities:
              drop:
                {{- toYaml .Values.securityContext.capabilities.drop | nindent 16 }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
\`\`\`

## Pod Security Standards

Enforce pod security at the namespace level using Pod Security Admission:

\`\`\`yaml
apiVersion: v1
kind: Namespace
metadata:
  name: streaming
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
\`\`\`

The \`restricted\` profile prevents running as root, blocks privilege escalation, and requires dropping all capabilities — exactly what we want for production workloads.

## Security Checklist

Before any deployment goes to production, we verify:

1. **RBAC** — Service accounts have minimal permissions, no cluster-admin bindings
2. **Network policies** — Default deny with explicit allow rules per namespace
3. **Secrets** — Encrypted at rest, sealed secrets for Git, no plaintext in manifests
4. **Pod security** — Non-root, read-only filesystem, no privilege escalation
5. **Resource limits** — CPU and memory limits set to prevent noisy neighbors
6. **Image security** — Images pulled from private registry, scanned for CVEs
7. **Audit logging** — API server audit logs enabled and shipped to monitoring

## Conclusion

Kubernetes security isn't a one-time setup — it's an ongoing practice. Start with RBAC and namespace isolation, add network policies, encrypt your secrets, and enforce pod security standards. Each layer reduces your attack surface and makes your production environment more resilient.
    `,
  },
  {
    id: "performance-optimization-techniques",
    title: "Performance Optimization in High-Throughput Streaming Systems",
    description:
      "Deep dive into zerocopy I/O, batching strategies, backpressure handling, and binary encoding choices for streaming platforms",
    date: "2024-07-05",
    tags: ["Performance", "Optimization", "Streaming", "Rust"],
    readTime: "12 min read",
    content: `
# Performance Optimization in High-Throughput Streaming Systems

When you're building a platform that simulates 100,000+ telecom nodes and streams millions of events per second, performance isn't a feature — it's a requirement. Here are the techniques that made the biggest difference in our streaming infrastructure.

## Zerocopy I/O: Eliminating Unnecessary Copies

Every time data is copied between buffers, you pay in CPU cycles and memory bandwidth. Zerocopy techniques minimize these copies by letting the kernel transfer data directly between file descriptors or by mapping memory regions.

### The Problem with Traditional I/O

In a typical read-process-write pipeline, data gets copied multiple times:

1. Kernel reads from disk/network into kernel buffer
2. Kernel copies to user-space buffer (your application)
3. Application processes and copies to output buffer
4. Kernel copies from user-space to kernel send buffer
5. Kernel sends from send buffer to network

That's 4 copies for a simple passthrough. With zerocopy, we can reduce this to 1 or even 0 copies.

### Zerocopy in Rust with Memory-Mapped I/O

\`\`\`rust
use memmap2::MmapOptions;
use std::fs::File;

/// Read events from a memory-mapped file without copying into user buffers.
/// The OS handles paging data in and out as needed.
fn process_event_log(path: &str) -> Result<Vec<EventSummary>, Box<dyn std::error::Error>> {
    let file = File::open(path)?;
    let mmap = unsafe { MmapOptions::new().map(&file)? };

    let mut summaries = Vec::new();
    let mut offset = 0;

    while offset + EVENT_HEADER_SIZE <= mmap.len() {
        // Read directly from mapped memory — no copy into a Vec<u8>
        let header = EventHeader::from_bytes(&mmap[offset..offset + EVENT_HEADER_SIZE]);
        let payload_end = offset + EVENT_HEADER_SIZE + header.payload_len as usize;

        if payload_end > mmap.len() {
            break;
        }

        // Only decode fields we need for the summary
        let summary = EventSummary {
            event_type: header.event_type,
            timestamp: header.timestamp,
            source_node: header.source_node,
        };
        summaries.push(summary);

        offset = payload_end;
    }

    Ok(summaries)
}
\`\`\`

### Zerocopy Network Transfers in Rust

For forwarding events between services, we use \`sendfile\`-style transfers:

\`\`\`rust
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use bytes::BytesMut;

/// Forward events from source to sink with minimal copying.
/// Uses a shared BytesMut buffer that avoids reallocation.
async fn forward_events(
    source: &mut tokio::net::TcpStream,
    sink: &mut tokio::net::TcpStream,
    buf: &mut BytesMut,
) -> Result<u64, std::io::Error> {
    let mut total_bytes = 0u64;

    loop {
        buf.clear();
        buf.reserve(65536); // 64KB read buffer

        let n = source.read_buf(buf).await?;
        if n == 0 {
            break; // Connection closed
        }

        // Write the exact bytes read — no intermediate serialization
        sink.write_all(&buf[..n]).await?;
        total_bytes += n as u64;
    }

    Ok(total_bytes)
}
\`\`\`

## Batching Strategies

Individual event processing has fixed overhead per operation: system calls, network round trips, lock acquisitions. Batching amortizes this overhead across many events.

### Time-Based vs Size-Based Batching

We use a hybrid approach — flush when the batch is full OR when a time deadline expires, whichever comes first:

\`\`\`rust
use std::time::{Duration, Instant};

struct BatchAccumulator<T> {
    items: Vec<T>,
    max_size: usize,
    max_wait: Duration,
    deadline: Instant,
}

impl<T> BatchAccumulator<T> {
    fn new(max_size: usize, max_wait: Duration) -> Self {
        Self {
            items: Vec::with_capacity(max_size),
            max_size,
            max_wait,
            deadline: Instant::now() + max_wait,
        }
    }

    /// Add an item. Returns Some(batch) if the batch should be flushed.
    fn add(&mut self, item: T) -> Option<Vec<T>> {
        self.items.push(item);

        if self.items.len() >= self.max_size || Instant::now() >= self.deadline {
            self.deadline = Instant::now() + self.max_wait;
            let batch = std::mem::replace(
                &mut self.items,
                Vec::with_capacity(self.max_size),
            );
            Some(batch)
        } else {
            None
        }
    }
}
\`\`\`

### Batching Impact

In our benchmarks, batching 1000 events per Kafka produce call vs sending individually:

| Metric | Individual | Batched (1000) | Improvement |
|--------|-----------|----------------|-------------|
| Throughput | 50K events/sec | 4.2M events/sec | **84x** |
| CPU usage | 85% | 22% | **74% reduction** |
| Network calls | 50K/sec | 50/sec | **1000x reduction** |

## Backpressure: Don't Let Fast Producers Kill Slow Consumers

Backpressure is the mechanism that prevents a fast upstream component from overwhelming a slow downstream component. Without it, you get unbounded memory growth, OOM kills, and cascading failures.

### Bounded Channels with Metrics

\`\`\`rust
use tokio::sync::mpsc;
use std::sync::atomic::{AtomicU64, Ordering};

static EVENTS_DROPPED: AtomicU64 = AtomicU64::new(0);
static BACKPRESSURE_EVENTS: AtomicU64 = AtomicU64::new(0);

async fn produce_with_backpressure(
    tx: &mpsc::Sender<Vec<u8>>,
    event: Vec<u8>,
) {
    match tx.try_send(event) {
        Ok(()) => {}
        Err(mpsc::error::TrySendError::Full(event)) => {
            BACKPRESSURE_EVENTS.fetch_add(1, Ordering::Relaxed);

            // Strategy: wait with timeout, then drop if still full
            match tokio::time::timeout(
                Duration::from_millis(100),
                tx.send(event),
            ).await {
                Ok(Ok(())) => {}
                _ => {
                    EVENTS_DROPPED.fetch_add(1, Ordering::Relaxed);
                }
            }
        }
        Err(mpsc::error::TrySendError::Closed(_)) => {
            // Channel closed — consumer is gone
            return;
        }
    }
}
\`\`\`

### Rate Limiting as a Backpressure Signal

When downstream systems signal they're overwhelmed (via HTTP 429, Kafka quota errors, or full buffers), we use adaptive rate limiting:

\`\`\`rust
struct AdaptiveRateLimiter {
    current_rate: f64,    // events per second
    max_rate: f64,
    min_rate: f64,
    increase_factor: f64, // Multiplicative increase
    decrease_factor: f64, // Multiplicative decrease
}

impl AdaptiveRateLimiter {
    fn on_success(&mut self) {
        // Slowly increase rate on success (additive increase)
        self.current_rate = (self.current_rate * self.increase_factor).min(self.max_rate);
    }

    fn on_backpressure(&mut self) {
        // Quickly decrease rate on backpressure (multiplicative decrease)
        self.current_rate = (self.current_rate * self.decrease_factor).max(self.min_rate);
    }
}
\`\`\`

## Binary Encoding Choices

Not all binary encodings are equal. Here's how the options compare for our telecom event streaming use case:

| Encoding | Size (bytes) | Encode (ns) | Decode (ns) | Schema Evolution |
|----------|-------------|-------------|-------------|-----------------|
| JSON | 312 | 850 | 1200 | Flexible |
| Protobuf | 64 | 120 | 95 | Good |
| ASN.1 BER | 58 | 180 | 150 | Excellent |
| FlatBuffers | 72 | 45 | 0* | Limited |
| Cap'n Proto | 80 | 40 | 0* | Good |

*Zero decode time because FlatBuffers and Cap'n Proto access data in-place without deserialization.

For our use case, we chose **Protobuf** as the primary encoding for its balance of size, speed, and schema evolution. For telecom protocol messages that follow ASN.1 standards, we use **ASN.1 BER/DER** directly to avoid a translation layer.

## Putting It All Together

The combination of these techniques is multiplicative, not additive:

- **Zerocopy** eliminates 3-4 memory copies per event → ~40% CPU reduction
- **Batching** amortizes per-event overhead → ~84x throughput increase
- **Backpressure** prevents cascading failures → stable performance under load
- **Binary encoding** reduces payload size → ~80% bandwidth reduction

Together, these techniques took our platform from handling thousands of events per second to **96 million events per second** — enough to simulate 100,000+ telecom nodes in real time.

## Conclusion

Performance optimization at this scale requires a systems-level mindset. Understand where your bytes flow, how many times they get copied, and where overhead accumulates. The biggest gains come from eliminating unnecessary work, not from making necessary work faster.
    `,
  },
];

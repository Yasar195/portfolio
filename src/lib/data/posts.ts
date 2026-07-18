export interface BlogPost {
  title: string;
  slug: string;
  brief: string;
  content: string; // HTML format with code blocks
  publishedAt: string; // ISO date
  readTimeInMinutes: number;
  tags: string[];
  coverImage?: string;
}

export const posts: BlogPost[] = [
  {
    title: "Building High-Performance API Gateways with Go and Redis",
    slug: "building-high-performance-api-gateways-go-redis",
    brief: "An in-depth look at implementing rate limiting, routing, and token bucket algorithms at the edge using Go's concurrency model and Redis.",
    publishedAt: "2026-05-12",
    readTimeInMinutes: 8,
    tags: ["Go", "Redis", "Backend", "System Design"],
    content: `
      <p>API Gateways are the critical entry points for modern microservices architectures. They handle rate limiting, authentication, request routing, and metric collection. Doing this at scale requires extremely low-latency components. In this guide, we will build a custom API gateway in Go utilizing Redis to implement a distributed token bucket rate limiter.</p>
      
      <h3>Why Go and Redis?</h3>
      <p>Go's goroutines provide lightweight concurrency, allowing a single server to handle tens of thousands of concurrent connections with minimal memory overhead. Redis, being an in-memory data store, offers sub-millisecond read and write latencies, making it the perfect backend to store rate limit counters across horizontal gateway instances.</p>

      <h3>Designing the Token Bucket Limiter</h3>
      <p>The token bucket algorithm allows for bursts of traffic up to a maximum bucket capacity, while steadily refilling tokens at a constant rate. Here is a simple implementation of the rate limiter client in Go utilizing Redis lua scripts to ensure atomic increments:</p>

      <pre><code class="language-go">package main

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

type RateLimiter struct {
	client *redis.Client
	limit  int
	burst  int
}

const rateLimitScript = \`
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local current = tonumber(redis.call('get', key) or "0")

if current + 1 > limit then
    return 0
else
    redis.call("INCRBY", key, 1)
    if current == 0 then
        redis.call("EXPIRE", key, 60)
    end
    return 1
end
\`

func (rl *RateLimiter) Allow(ctx context.Context, clientID string) (bool, error) {
	key := fmt.Sprintf("ratelimit:%s", clientID)
	
	res, err := rl.client.Eval(ctx, rateLimitScript, []string{key}, rl.limit).Result()
	if err != nil {
		return false, err
	}
	
	return res.(int64) == 1, nil
}
</code></pre>

      <h3>Configuring the Gateway Middleware</h3>
      <p>Now, let's wire this rate limiter into a standard HTTP middleware in Go. If a client exceeds their limit, we will short-circuit the request and return an HTTP <code>429 Too Many Requests</code> status code.</p>

      <pre><code class="language-go">func (rl *RateLimiter) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		clientID := r.Header.Get("X-Client-ID")
		if clientID == "" {
			clientID = r.RemoteAddr // Fallback to IP address
		}

		allowed, err := rl.Allow(r.Context(), clientID)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		if !allowed {
			w.Header().Set("Retry-After", "60")
			http.Error(w, "Too Many Requests", http.StatusTooManyRequests)
			return
		}

		next.ServeHTTP(w, r)
	})
}
</code></pre>

      <h3>Conclusion</h3>
      <p>By shifting rate limiting logic directly onto an in-memory database like Redis, we keep the stateless gateway instances extremely fast. They can easily be scaled horizontally behind a Layer 4 load balancer (like AWS NLB) to handle millions of requests daily with minimal resource overhead.</p>
    `
  },
  {
    title: "Zero-Downtime Database Migrations in PostgreSQL",
    slug: "zero-downtime-database-migrations-postgresql",
    brief: "How to run database schema updates, column alterations, and index builds on active production databases without locking tables or dropping transactions.",
    publishedAt: "2026-06-20",
    readTimeInMinutes: 6,
    tags: ["PostgreSQL", "Database", "SRE", "DevOps"],
    content: `
      <p>Modifying the schema of a database supporting a high-traffic production application is always a high-risk operation. If done improperly, PostgreSQL can lock tables, causing writes to queue up and eventually resulting in connection pool exhaustion and application downtime. Let's look at how to run common migrations safely without blocking traffic.</p>

      <h3>1. Adding an Index Concurrently</h3>
      <p>By default, creating an index in PostgreSQL takes an <code>SHARE</code> lock on the table, blocking all writes (INSERTs, UPDATEs, DELETEs) until the index build is complete. On a table with millions of rows, this can take minutes or hours.</p>
      
      <p>The solution is to use the <code>CONCURRENTLY</code> keyword. This tells PostgreSQL to build the index by scanning the table twice without taking a write-blocking lock.</p>

      <pre><code class="language-sql">-- BAD: Locks the entire table for writes
CREATE INDEX idx_users_email ON users(email);

-- GOOD: Builds the index in the background without locking writes
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
</code></pre>

      <blockquote>
        <strong>Note:</strong> Concurrent index builds cannot run inside a transaction block. Make sure your migration tool runs this migration outside a transaction (e.g. <code>disable_ddl_transaction!</code> in Rails or using non-transactional migrations in Go/Node.js).
      </blockquote>

      <h3>2. Adding Columns with Defaults Safely</h3>
      <p>Historically, adding a column with a default value required PostgreSQL to rewrite the entire table to write the default value to each existing row. On large tables, this caused heavy I/O operations and long-running locks.</p>

      <p>Since PostgreSQL 11, adding a column with a constant default value no longer rewrites the table. It is a metadata-only change and takes less than a millisecond. However, adding columns with non-constant defaults (like <code>random()</code> or functions) still locks the table.</p>

      <pre><code class="language-sql">-- Safe in PostgreSQL 11+ (metadata-only update)
ALTER TABLE transactions ADD COLUMN status VARCHAR(20) DEFAULT 'pending';

-- Unsafe (requires table rewrite because default is dynamic)
ALTER TABLE transactions ADD COLUMN token UUID DEFAULT gen_random_uuid();
</code></pre>

      <p>If you must add a column with a dynamic default value without downtime, use this multi-step approach:</p>
      <ol>
        <li>Add the column without a default (or with a null default).</li>
        <li>Set the default value on the column metadata so new rows receive it automatically.</li>
        <li>Backfill existing rows in small batches (e.g., 5,000 rows at a time) to prevent connection timeouts and CPU spikes.</li>
      </ol>

      <pre><code class="language-sql">-- Step 1: Add the column (instant)
ALTER TABLE transactions ADD COLUMN token UUID;

-- Step 2: Add default metadata for new rows (instant)
ALTER TABLE transactions ALTER COLUMN token SET DEFAULT gen_random_uuid();

-- Step 3: Backfill in batches via your application background worker
-- UPDATE transactions SET token = gen_random_uuid() WHERE token IS NULL;
</code></pre>

      <h3>Conclusion</h3>
      <p>Always inspect the lock modes requested by DDL statements before executing them on production. Tools like <code>pg_blocking_pids()</code> can help monitor and diagnose lock contention before it escalates into database downtime.</p>
    `
  },
  {
    title: "Automating Kubernetes Canary Deployments with GitOps",
    slug: "automating-kubernetes-canary-deployments-gitops-argocd",
    brief: "A guide to implementing progressive delivery using Argo Rollouts, Prometheus query analysis, and automated rollback triggers for safe releases.",
    publishedAt: "2026-07-05",
    readTimeInMinutes: 10,
    tags: ["Kubernetes", "DevOps", "CI/CD", "SRE"],
    content: `
      <p>In high-velocity development environments, pushing code directly to production can lead to regressions that affect all users. Canary deployments mitigate this risk by routing a small percentage of traffic (e.g., 5%) to the new version, verifying its health using live metrics, and gradually scaling it up to 100%. In this post, we'll set up automated canary deployments using Argo Rollouts and Prometheus.</p>

      <h3>Introducing Argo Rollouts</h3>
      <p>Argo Rollouts is a Kubernetes controller and set of CRDs that provides advanced deployment capabilities such as blue-green, canary, and canary analysis. It replaces the default Kubernetes <code>Deployment</code> object and integrates with ingress controllers and service meshes to shape traffic dynamically.</p>

      <h3>Step 1: The Rollout Manifest</h3>
      <p>Instead of a standard Deployment, we define a <code>Rollout</code> resource. We specify a <code>canary</code> strategy with steps that increment the traffic routing percentage and pause for analysis.</p>

      <pre><code class="language-yaml">apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: payment-service
spec:
  replicas: 5
  strategy:
    canary:
      analysis:
        templates:
          - templateName: prometheus-error-rate
        args:
          - name: service-name
            value: payment-service
      steps:
        - setWeight: 10
          pause: { duration: 5m }
        - setWeight: 25
          pause: { duration: 10m }
        - setWeight: 50
          pause: { duration: 15m }
</code></pre>

      <h3>Step 2: Configuring Automated Analysis</h3>
      <p>An Analysis Template defines how to query metrics from a monitoring system (like Prometheus) to validate the new canary version. If the error rate exceeds a specified threshold during the analysis window, Argo Rollouts will automatically abort the rollout and restore the stable version.</p>

      <pre><code class="language-yaml">apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: prometheus-error-rate
spec:
  metrics:
  - name: success-rate
    interval: 1m
    successCondition: result[0] >= 0.995
    failureLimit: 2
    provider:
      prometheus:
        address: http://prometheus.monitoring.svc.cluster.local:9090
        query: |
          sum(rate(http_requests_total{status=~"2.*|3.*", service="{{args.service-name}}"}[2m])) 
          / 
          sum(rate(http_requests_total{service="{{args.service-name}}"}[2m]))
</code></pre>

      <h3>How GitOps Ties It Together</h3>
      <p>With GitOps, the source of truth is your Git repository. When a developer merges a change:
      <ol>
        <li>GitHub Actions builds the new Docker image and updates the tag in the Git repository manifest.</li>
        <li>ArgoCD detects the drift, syncs the state, and applies the new <code>Rollout</code> resource to the cluster.</li>
        <li>The Argo Rollouts controller starts routing 10% of traffic to the new replica set and initiates the Prometheus Analysis run.</li>
        <li>If success rate drops below 99.5% twice, Argo Rollouts aborts the deploy, sets traffic back to 100% stable, and alerts the SRE team via Webhooks.</li>
      </ol>
      This loop ensures that bad deployments are caught and self-healed within minutes, preventing widespread user impact.</p>
    `
  }
];

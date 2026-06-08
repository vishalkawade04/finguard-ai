# FinGuard Production Deployment Checklist

## Docker
- [ ] Build frontend image using `docker build -t finguard-frontend:prod ./frontend` and verify nginx serves index.
- [ ] Build backend image using `docker build -t finguard-backend:prod .` and verify `/health` and `/metrics` endpoints.
- [ ] Ensure `JWT_SECRET` and `MONGO_URI` provided to backend container.

## Docker Compose
- [ ] Start compose stack: `docker-compose up -d --build`.
- [ ] Verify backend health: `curl http://localhost:5000/health` returns 200.
- [ ] Verify frontend serving: `curl http://localhost/` returns HTML.

## Kubernetes (Helm)
- [ ] Set `image.repository` and `image.tag` appropriately in `finguard-chart/values.yaml`.
- [ ] Enable `prometheusScrape.enabled` if Prometheus will scrape the service.
- [ ] Apply chart with `helm upgrade --install finguard ./finguard-chart -f values.yaml`.
- [ ] Verify readiness/liveness: `kubectl get pods` shows READY and no restarts.

## Monitoring
- [ ] Add `monitoring/prometheus-scrape.yaml` to Prometheus config or create ServiceMonitor.
- [ ] Import `monitoring/grafana-dashboard-skeleton.json` and add panels for `http_requests_total`, `process_cpu_seconds_total`, etc.

## AWS EC2
- [ ] Ensure security groups allow ports 80 (frontend) and 5000 (backend) as needed.
- [ ] Use Docker Compose or systemd units to manage containers.
- [ ] Configure environment variables via a secrets manager or environment files (not committed).

## Notes
- The backend now exposes `/health` and `/metrics`.
- Helm chart probes use `/health` by default.

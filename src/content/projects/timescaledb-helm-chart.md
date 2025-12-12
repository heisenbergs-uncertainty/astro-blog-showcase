---
title: "TimescaleDB Helm Chart"
description: "A production-grade Helm chart for deploying TimescaleDB on Kubernetes. Simplifies the management and scaling of time-series databases in cloud-native environments."
pubDate: "2024-10-15"
tags: ["Favorite", "Kubernetes", "Database", "DevOps"]
stack: ["Helm", "Kubernetes", "PostgreSQL"]
heroImage: "../../assets/projects/tiger-data-yellow.svg"
repoUrl: "https://github.com/heisenbergs-uncertainty/helm-charts/tree/master/charts/timescaledb"
---

## Inspiration

At work, I manage an ETL application that collects data from hundreds of CNC machines. Initially, we used basic connectors to funnel data into InfluxDB, which we then visualized with Grafana dashboards. However, as our fleet of supported machines grew, so did the complexity of our structured IoT data. Managing this data in a separate database became increasingly challenging, highlighting the need for a more robust solution—TimescaleDB.

The main challenge was deploying TimescaleDB on Kubernetes. As noted in the [Tiger Data Kubernetes docs](https://www.tigerdata.com/docs/self-hosted/latest/install/installation-kubernetes#install-with-postgres-kubernetes-operators), there is no longer an officially supported TimescaleDB Helm chart. While other charts exist—often leveraging Postgres Operators or supporting high-availability Postgres clusters—they tend to prioritize the broader Postgres ecosystem, where Timescale-specific updates and optimizations can be overlooked.

To address this gap, I developed a dedicated Helm chart focused on TimescaleDB. This chart is designed for self-hosted, high-availability, single-node deployments, with a strong emphasis on Timescale-specific features and upgrades.

## Project Overview

This Helm chart offers a robust and flexible way to deploy [TimescaleDB](https://www.timescale.com/), the leading open-source time-series SQL database, on Kubernetes clusters. It is engineered for both simplicity and customization, supporting a range of deployment scenarios—from local development to production-grade, high-availability clusters.

### Key Features

- **Effortless Deployment**: Spin up a fully functional TimescaleDB instance with a single Helm command.
- **Custom Configuration**: Fine-tune `postgresql.conf`, resource limits, storage classes, and more to fit your workload.
- **Data Persistence**: Built-in PersistentVolumeClaim support ensures your data is safe and durable.
- **High Availability**: (Configurable) Supports replication and failover strategies tailored for Kubernetes environments.
- **Monitoring Ready**: Optional Prometheus sidecars for real-time database metrics and observability.
- **Secure by Default**: Sensible security defaults, with options for custom secrets and TLS.

### Getting Started

Add the Helm repository and install TimescaleDB with:

```bash
helm repo add heisenbergs-uncertainty https://heisenbergs-uncertainty.github.io/helm-charts
helm install my-timescaledb heisenbergs-uncertainty/timescaledb
```

You can customize your deployment by overriding values in your own `values.yaml` file. For example, to set resource limits and enable Prometheus monitoring:

```yaml
resources:
  requests:
    cpu: 500m
    memory: 2Gi
  limits:
    cpu: 1
    memory: 4Gi

metrics:
  enabled: true
```

Apply your custom configuration with:

```bash
helm install my-timescaledb heisenbergs-uncertainty/timescaledb -f values.yaml
```

For full documentation, advanced configuration options, and upgrade instructions, visit the [GitHub Repository](https://github.com/heisenbergs-uncertainty/helm-charts/tree/master/charts/timescaledb).

## Roadmap

The TimescaleDB Helm chart is under active development, with several advanced features planned to further enhance reliability, scalability, and operational flexibility. Upcoming features include:

- **Patroni High Availability**: Integrate [Patroni](https://patroni.readthedocs.io/) for automated failover and cluster management, enabling true high-availability TimescaleDB clusters on Kubernetes.
- **Point in Time Recovery (PITR)**: Support for PITR to allow restoration of the database to any specific moment, improving disaster recovery capabilities.
- **PGBackRest Integration**: Add [PGBackRest](https://pgbackrest.org/) for robust, efficient, and secure backup and restore operations.
- **Read and Write Replicas**: Enable configuration of dedicated read and write replicas to scale workloads and improve performance.
- **Standby Replica**: Support for standby replicas for enhanced data redundancy and failover scenarios.
- **Additional Postgres High Availability Features**: Incorporate other advanced HA features from the Postgres ecosystem, such as synchronous replication, automated failover, and advanced monitoring.

If you have feature requests or would like to contribute to any of these roadmap items, please join the discussion or submit a pull request on [GitHub](https://github.com/heisenbergs-uncertainty/helm-charts/tree/master/charts/timescaledb).

---

**Contributions and feedback are welcome!** If you have suggestions or encounter issues, please open an issue or pull request on GitHub.

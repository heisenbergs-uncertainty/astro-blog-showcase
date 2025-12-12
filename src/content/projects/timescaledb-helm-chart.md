---
title: "TimescaleDB Helm Chart"
description: "A production-grade Helm chart for deploying TimescaleDB on Kubernetes. Simplifies the management and scaling of time-series databases in cloud-native environments."
pubDate: "2024-10-15"
tags: ["Favorite","Kubernetes", "Database", "DevOps"]
stack: ["Helm", "Kubernetes", "PostgreSQL"]
heroImage: "/assets/projects/tiger-data-yellow.svg"
repoUrl: "https://github.com/heisenbergs-uncertainty/helm-charts/tree/master/charts/timescaledb"
---

## Project Overview

This Helm chart provides a robust and configurable way to deploy [TimescaleDB](https://www.timescale.com/), an open-source time-series SQL database, on Kubernetes clusters. It is designed to be highly customizable, supporting various deployment scenarios from development to high-availability production clusters.

### Key Features

*   **Easy Deployment**: Deploy a fully functional TimescaleDB instance with a single command.
*   **Custom Configuration**: Granular control over `postgresql.conf` settings, resource limits, and storage classes.
*   **Persistence**: Built-in support for PersistentVolumeClaims to ensure data safety.
*   **High Availability**: (Configuration dependent) Supports replication and failover strategies compatible with Kubernetes.
*   **Prometheus Integration**: Optional sidecars for monitoring database metrics.

### Usage

```bash
helm repo add heisenbergs-uncertainty https://heisenbergs-uncertainty.github.io/helm-charts
helm install my-timescaledb heisenbergs-uncertainty/timescaledb
```

Check the [GitHub Repository](https://github.com/heisenbergs-uncertainty/helm-charts/tree/master/charts/timescaledb) for full documentation and configuration options.

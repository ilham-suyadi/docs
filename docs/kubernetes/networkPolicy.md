# Kubernetes Network Policy

## Introduction

**ingress:** apps/pod *diakses/masuk* oleh pod lain

**egress:** apps/pod *mengakses/keluar* pod lain

## Tolak Semua Trafik Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
spec:
  podSelector: {}
  policyTypes:
  - Ingress
```

## izinkan semua trafik ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-all
spec:
  podSelector: {}
  ingress:
  - {}
  policyTypes:
  - Ingress
```

## Tolak Semua Trafik Egress

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
spec:
  podSelector: {}
  policyTypes:
  - Egress
```

## izinkan semua trafik egress

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-all
spec:
  podSelector: {}
  egress:
  - {}
  policyTypes:
  - Egress
```

## tolak semua trafik ingress dan egress

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

## mengizinkan pods tertentu yang berada di dalam namespace tertentu yang hanya bisa mengakses secara ingress dan egress

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db
  namespace: test1
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: test2
      podSelector:
        matchLabels:
          role: db
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: test2
      podSelector:
        matchLabels:
          role: db
```

## bisa mengakses semua pods/apps tapi hanya bisa diakses pods/apps tertentu

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: np
spec:
  podSelector:
    matchLabels:
      role: np
  policyTypes:
  - Ingress
#  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          role: np
```

> ***Penjelasan :*** Network Policy ini mengatur pod yang memiliki label <u> *role: db* </u> yang berada di <u> *namespace: test1* </u>, yang hanya bisa mengakses dan di akses oleh pod dengan label <u> *role: db* </u> yang berada di <u> *namespace: test2* </u>

<br>
<br>

:link: Referensi:

<https://kubernetes.io/id/docs/concepts/services-networking/network-policies/#default-tolak-semua-trafik-egress>

<https://snyk.io/blog/kubernetes-network-policy-best-practices/>

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

:::info
script di atas akan mengatur semua pod yang berada di namespace(default) agar tidak bisa diakses oleh siapa pun termasuk pod yang ada di dalam namespace, tetapi pod yang di namaspace tersebut masih bisa mengakses pod yang ada di luar
:::

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

:::info
sebenarnya ini tidak ada perbedaan dengan default atau tanpa configurasi network policy yang dimana semuanya bisa mengakses ataupun di akses
:::

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

:::info
script di atas akan mengatur semua pod yang berada di namespace(default) bisa diakses oleh siapa pun, tetapi pod yang berada di namespace tidak bisa mengakses keluar
:::

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

:::info
sebenarnya ini tidak ada perbedaan dengan default atau tanpa configurasi network policy yang dimana semuanya bisa mengakses ataupun di akses
:::

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

:::info
file di atas mungatur semua pod yang berada di namaspace tidak bisa diakses maunpun mengakses pod lain
:::

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

:::info
perintah di atas mengatur semua pod yang ada di namespace ***test1*** yang memiliki labels ***role: db***, bisa di akses ataupun mengakses pod yang berada di namaspace ***test2*** yang memiliki labels ***role: db***.
:::

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

:::info
Network Policy ini mengatur pod yang memiliki label ***role: db*** yang berada di ***namespace: test1*** , yang hanya bisa mengakses dan di akses oleh pod dengan label ***role: db*** yang berada di ***namespace: test2***
:::

<br>
<br>

:link: Referensi: \
<https://kubernetes.io/id/docs/concepts/services-networking/network-policies/#default-tolak-semua-trafik-egress> \
<https://snyk.io/blog/kubernetes-network-policy-best-practices/>

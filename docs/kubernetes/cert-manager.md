# Cert-Manager

## Mengginstall Cert Manager Menggunakan Kubectl

sebelum menginstall cert manager pastikan version kubectl support dengan version cert manager yang akan di install jika belum yakin bisa mengunjungi <https://cert-manager.io/docs/installation/supported-releases/> , sedangkan untuk mengecek version dari kubectl bisa menggunakan perintah di bawah.

```sh
kubectl version --short
```

<br>

pilih version cert manager yang sesuai dengan kubectl, dalam script di bawah saya menggunakan version 1.11.0

```sh
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.11.0/cert-manager.yaml
```

## Unistall Cert Manager Menggunakan kubectl

:::warning
sebelum menghapus cert-manager, sebaiknya membaca <https://cert-manager.io/docs/installation/kubectl/#uninstalling> terlebih dahulu
:::

### pengecekan resource

```sh
kubectl get Issuers,ClusterIssuers,Certificates,CertificateRequests,Orders,Challenges --all-namespaces
```

### unistall cert manager menggunakan kubectl

```sh
kubectl delete -f https://github.com/cert-manager/cert-manager/releases/download/vX.Y.Z/cert-manager.yaml
```

## Contoh secript yaml configurasi Cert Manager

::: details
Issuer hanya dapat digunakan di **namespace tertentu**

ClusterIssuer bisa digunakan di **semua namespace**
:::

### SelfSigned

```yaml
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: selfsigned-issuer
  namespace: sandbox
spec:
  selfSigned: {}
```

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: selfsigned-cluster-issuer
spec:
  selfSigned: {}
```

### CA

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: devopsbyexample-io-ca
spec:
  isCA: true
  duration: 43800h # 5 years
  commonName: kubernetes247.test
  secretName: devopsbyexample-io-key-pair
  privateKey:
    algorithm: ECDSA
    size: 256
  issuerRef:
    name: selfsigned
    kind: ClusterIssuer
    group: cert-manager.io
```

<br>
<br>

:link: Referensi:\
<https://cert-manager.io/docs/installation/kubectl/>\
<https://cert-manager.io/docs/configuration/selfsigned/>\
<https://cert-manager.io/docs/configuration/ca/>

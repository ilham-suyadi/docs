# Blue Green Deployment

## Summary

deployment biru/hijau adalah strategi deployment di mana Anda membuat dua deployment  yang terpisah namun identik, yang membedakan satu sama lain ada di versinya.
Satu lingkungan (biru) menjalankan versi aplikasi saat ini dan satu lingkungan (hijau) menjalankan versi aplikasi baru. Setelah pengujian selesai pada lingkungan hijau, lalu lintas aplikasi langsung diarahkan ke lingkungan hijau dan lingkungan biru tidak digunakan lagi.

## Deploy aplikasi v1

1. buat file blue-green-v1 untuk mendeploy aplikasi v1

```sh
vi blue-green-v1.yml
```

2. masukkan code ini di file blue-green-v1

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name:  blue-green-v1
  labels:
    app:  blue-green
spec:
  selector:
    matchLabels:
      app: blue-green
      version: v1
  replicas: 2
  template:
    metadata:
      labels:
        app:  blue-green
        version: v1
    spec:
      containers:
      - image: httpd:alpine
        name: blue-green
```

3. terapkan file blue-green-v1 tersebut dengan perintah

```sh
kubectl apply -f blue-green-v1.yml
```

## Create Service

1. buat file blue-green-service untuk membuat service

```sh
vi blue-green-service.yml
```

2. masukkan code ini ke dalam file blue-green-service

```yml
apiVersion: v1
kind: Service
metadata:
  name: blue-green-svc
  labels:
    app: blue-green
spec:
  selector:
    app: blue-green
    version: v1
  ports:
  - port: 80
    targetPort: 80
  type: NodePort
```

3. terapkan file blue-green-service dengan perintah

```sh
kubectl apply -f blue-green-service.yml
```

4. mengecek nodeport service

```sh
kubectl get svc blue-green-svc
```

## test deployment aplikasi versi v1 dan service

untuk mengetes aplikasi versi 1 dan service bisa menggunakan terminal dengan perintah ***curl localhost:(nodeport)***, atau bisa menggunakan browser dengan mengakses ip dari node dimana aplikasi berjalan ***examples:*** *192.68.1.202:(nodeport)*.

## Deploy app v2

1. buat file blue-green-v2 untuk mendeploy aplikasi v2

```sh
vi blue-green-v2.yml
```

2. masukkan code ini di file blue-green-v2

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: blue-green-v2
  labels:
    name: blue-green
spec:
  replicas: 2
  selector:
    matchLabels:
      app: blue-green
      version: v2
  template:
    metadata:
      labels:
        app: blue-green
        version: v2
    spec:
      containers:
      - name: blue-green-nginx
        image: nginx:alpine
```

3. terapkan file blue-green-v1 tersebut dengan perintah

```sh
kubectl apply -f blue-green-v2.yml
```

## arahkan service ke deployment versi ke 2

1. edit config service

```sh
kubectl edit svc blue-green-svc
```

2. arahkan version di config service ke v2

<img src="/blue-green-deployment.png">

<!-- ![blue-green-deployment.png](./blue-green-deployment.png) -->

## scale down deployment v1

1. scale berguna untuk menentukan jumlah pod yang bisa di gunakan, jika mengatur scale ke 0, maka tidak ada pod yang tersedia atau aplikasi dalam keadaan mati

```sh
kubectl -n devops scale deploy green-blue-v2 --replicas=0
```

<br>
<br>

:link: Referensi:

<https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/bluegreen-deployments.html>

<https://killercoda.com/killer-shell-ckad/scenario/rollout-green-blue>

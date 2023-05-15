# Canary Deployment

## Summary

canary deployment adalah teknik perilisan secara bertahap, yaitu dengan cara menyebar atau meluncurkan beberapa pod yang terbaru ke beberapa pengguna terlebih dahulu.
jika aplikasi mengalami masalah, maka tidak semua pengguna kena dampaknya.

## Deploy apps v1

1. buat file canary-v1.yml untuk mendeploy aplikasi v1
  
```sh
vi canary-v1.yml
```

2. masukkan code ini di file canary-v1.yml

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: canary-v1
spec:
  replicas: 1
  selector:
    matchLabels:
      app: canary
      version: v1
  template:
    metadata:
      labels:
        app: canary
        version: v1
    spec:
      containers:
      - name: canary-httpd
        image: httpd:alpine
        imagePullPolicy: Always
```

3. terapkan file canary-v1.yml tersebut dengan perintah

```sh
kubectl apply -f canary-v1.yml
```

## Create service

1. buat file canary-service.yml untuk membuat service

```sh
vi canary-service.yml
```

2. masukkan code ini ke dalam file canary-service.yml

```yml
apiVersion: v1
kind: Service
metadata:
  name: canary-service
  labels:
    app: canary
spec:
  selector:
    app: canary
  ports:
  - port: 80
    targetPort: 80
  type: NodePort
```

3. terapkan file blue-green-service dengan perintah

```sh
kubectl apply -f canary-service.yml
```

4. mengecek nodeport service

```sh
kubectl get svc canary-service
```

## deploy apps V2

1. buat file canary-v2.yml untuk mendeploy aplikasi v2

```sh
vi canary-v2.yml
```

2. masukkan code ini di file canary-v2.yml

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: canary-v2
spec:
  replicas: 1
  selector:
    matchLabels:
      app: canary
      version: v2
  template:
    metadata:
      labels:
        app: canary
        version: v2
    spec:
      containers:
      - name: canary-nginx
        image: nginx:alpine
        imagePullPolicy: Always
```

3. terapkan file blue-green-v1 tersebut dengan perintah

```sh
kubectl apply -f blue-green-v2.yml
```

## Pengujian

untuk menguji canary deployment seperti biasa, jika menggunakan terminal bisa menggunakan perintah ***curl localhost:(nodeport)***, jika mengggunakan browser dengan mengakses ip dari node dimana aplikasi berjalan ***examples:*** *192.68.1.202:(nodeport)*, bila tampilan tidak berubah bisa menggunakan *ctr + f5* untuk mereload tab browser.

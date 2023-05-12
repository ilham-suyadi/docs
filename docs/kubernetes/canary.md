# Canary Deployment

## Deploy apps v1

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

## Create service

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

## deploy apps V2

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

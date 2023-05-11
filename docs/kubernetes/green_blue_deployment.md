# Green Blue Deployment

::: details
mengarahkan service ke deployment versi yang terbaru.
:::

## Deploy app v1

```sh
vi green-blue-v1.yml
```

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name:  green-blue-v1
  labels:
    app:  green-blue
spec:
  selector:
    matchLabels:
      app: green-blue
      version: v1
  replicas: 2
  template:
    metadata:
      labels:
        app:  green-blue
        version: v1
    spec:
      containers:
      - image: httpd:alpine
        name: green-blue
```

## Create service

```yml
apiVersion: v1
kind: Service
metadata:
  name: green-blue
  labels:
    app: green-blue
spec:
  selector:
    app: green-blue
    version: v1 
  ports:
  - port: 80
    targetPort: 80
  type: NodePort
```

## Deploy app v2

```sh

```

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: green-blue-v2
  labels:
    name: green-blue
spec:
  replicas: 2
  selector:
    matchLabels:
      app: green-blue
      version: v2
  template:
    metadata:
      labels:
        app: green-blue
        version: v2
    spec:
      containers:
      - name: green-blue-nginx
        image: nginx:alpine
```

## arahkan service ke deployment versi ke 2

```sh
kubectl edit svc green-blue
```

```yml
apiVersion: v1
kind: Service
metadata:
  name: green-blue
  labels:
    app: green-blue
spec:
  selector:
    app: green-blue
    version: v2
  ports:
  - port: 80
    targetPort: 80
  type: NodePort
```

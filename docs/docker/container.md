# Create and access Container

## create contianer centos

```sh
docker run --name centos -d -it -v=./docker:/root centos:centos7
```

## Access Container centos

```sh
docker exec -it centos /bin/bash
```

# Container scanning

catatan:
container scanning **tidak tersedia di versi gitlab free**, tersedia di gitlab unlimited
container sanning di jalankan image di build dan di push

## Troubleshooting

### Error 01

> The image reg.gitlab.id/ilhamsuyadi/ib/main:fd8d2e032c72777972c37cc82021e85f8b953163 could not be found. To change the image being scanned, use the DOCKER_IMAGE environment variable.

### solve

tambahkan config di bawah ini di gitlab-ci.yml

```yaml
build_push:
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

container_scanning:
  variables:
    CS_DOCKER_INSECURE: "true"
    CI_APPLICATION_REPOSITORY: $CI_REGISTRY_IMAGE
```

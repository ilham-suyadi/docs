# CODE QUALITY

## Gitlab Runner for code quality

```sh
gitlab-runner register --executor "docker" \
--docker-image="docker:stable" \
--url "[https://gitlab.com]" \
--description "code-quality" \
--tag-list "code-quality" \
--locked="false" \
--access-level="not_protected" \
--docker-volumes "/cache" \
--docker-volumes "/builds:/builds" \
--builds-dir "/tmp/builds" \
--docker-volumes "/tmp/builds:/tmp/builds" \
--docker-volumes "/var/run/docker.sock:/var/run/docker.sock" \
--registration-token="[token]" \
--non-interactive
```

## Config code quality di .gitlab-ci.yaml

```yaml
code_quality:
  services:
    - name: docker:stable
  variables:
    TIMEOUT_SECONDS: 3600
  tags:
    - code-quality
```


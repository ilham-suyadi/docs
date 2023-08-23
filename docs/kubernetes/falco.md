# Falco

    - --audit-policy-file=/etc/kubernetes/audit-policy.yml
    - --audit-log-path=/var/kubernetes/audit-logs/audit.log
    - --audit-webhook-config-file=/etc/kubernetes/webhook.yml
    - --audit-log-maxsize=128
    - --audit-log-maxbackup=8

    volumeMounts:
    - mountPath: /etc/ssl/certs
      name: ca-certs
      readOnly: true
    - mountPath: /etc/pki
      name: etc-pki
      readOnly: true
    - mountPath: /etc/kubernetes/pki
      name: k8s-certs
      readOnly: true
    - mountPath: /etc/kubernetes/audit-policy.yml
      name: audit-policy
      readOnly: true
    - mountPath: /var/kubernetes/audit-logs
      name: audit-logs
      readOnly: false
    - mountPath: /etc/kubernetes/webhook.yml
      name: webhook-config
      readOnly: true

volumes:
  - hostPath:
      path: /etc/ssl/certs
      type: DirectoryOrCreate
    name: ca-certs
  - hostPath:
      path: /etc/pki
      type: DirectoryOrCreate
    name: etc-pki
  - hostPath:
      path: /etc/kubernetes/pki
      type: DirectoryOrCreate
    name: k8s-certs
  - hostPath:
      path: /etc/kubernetes/audit-policy.yml
      type: File
    name: audit-policy
  - hostPath:
      path: /var/kubernetes/audit-logs
      type: DirectoryOrCreate
    name: audit-logs
  - hostPath:
      path: /etc/kubernetes/webhook.yml
      type: File
    name: webhook-config
## uninstall falco

```sh
helm uninstall falco --namespace falco
```

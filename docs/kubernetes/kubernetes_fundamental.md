# Kubernetes fundamental

1. Membuat Deployment

    ```sh
    kubectl create deploy [name] --image [name_image]
    ```

2. Deploy dan memiliki output berupa file

    ```sh
    kubectl create deploy [name] --image [name_image] --dry-run='client' -o=yaml > [name_file].yaml
    ```

3. Membuat Service

  ```sh
  kubectl expose deploy [name_deploy] --port [number_port] --type=[type_port]
  ```

4.



kubectl port-forward svc/falco-falcosidekick-ui 2802:2802 --namespace falco --address 0.0.0.0
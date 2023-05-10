# Dasboard

## Install & Setup Kubernetes Dashboard

1. install Kubernetes Dashboard

   ```sh
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
   ```

2. Change port in edit Kubernetes Dashboard from clusterip to nodeport

   ```sh
   kubectl edit service/kubernetes-dashboard -n kubernetes-dashboard
   ```

3. show port kubernetes dashboard

   ```sh
   kubectl get service -n kubernetes-dashboard
   ```

## create new user and token for login to kubernetes dashboard

1. create a file to create a new user for the kubernetes dashboard. *example admin-user.yml*

   ```sh
   touch admin-user.yml
   ```

2. edit file admin-user.yml, and add config

   ```sh
   vi admin-user.yml
   ```

   > add config

   ```yml
    ---
    apiVersion: v1
    kind: ServiceAccount
    metadata:
    name: admin-user
    namespace: kubernetes-dashboard
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRoleBinding
    metadata:
    name: admin-user
    roleRef:
    apiGroup: rbac.authorization.k8s.io
    kind: ClusterRole
    name: cluster-admin
    subjects:
    - kind: ServiceAccount
    name: admin-user
    namespace: kubernetes-dashboard
   ```

3. apply admin-user.yml

   ```sh
   kubectl apply -f admin-user.yml
   ```

4. generate token for user kubernetes

   ```sh
   kubectl -n kubernetes-dashboard create token admin-user
   ```

> :link: Referensi :
> dashboard instalation: !<https://adamtheautomator.com/kubernetes-dashboard/>
> token generator : !<https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md>

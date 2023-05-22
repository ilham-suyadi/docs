# Port Forward kubernetes

## Port Forward di latar belakang

```sh
nohup kubectl port-forward svc/ingress-nginx-controller 80:80 --namespace ingress-nginx --address 0.0.0.0 &> /dev/null &
```

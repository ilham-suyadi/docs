# Namespace

## Create ns

```sh
# Template
kubectl create ns (name_namespace)
```

<br>

> *example*
>
> ```sh
> kubectl create ns test
> ```

## How to know which namespace I am using

```sh
kubectl config view --minify -o jsonpath='{..namespace}'
```

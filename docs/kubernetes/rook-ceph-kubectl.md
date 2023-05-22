# Install Rook-Ceph

## Step 1: menambahkan devices/partitions ke semua node worker

### cek node worker

list semua domain/nama dari node worker yang berjalan di cluster, untuk mengecek semua node yang berjalan bisa mengetikan perintah di bawah di **cluster/node master**

```sh
kubectl get nodes
```

### cek nama vm dari node worker

masukkan perintah **virsh list** diserver yang dimana terdapat kvm atau vm yang berjalan.

```sh
sudo virsh list
```

> ***catatan :*** beda user yang mengakses virsh maka akan berbeda juga outputnya.

### membuat storage untuk node worker

untuk melihat storage list atau pool-list bisa menggunakan perintah

```sh
sudo virsh pool-list
```

disini saya akan membuat storage untuk node worker yang berjumlah 3 dengan nama  **kube-wrk1, kube-wrk2, kube-wrk3** dan storage  pool yang saya gunakan adalah **pool-1** yang berada di **/pool/1** dengan kapasitas **16 Giga**

<br>
pindah directory

```sh
sudo cd /pool/1
```

<br>
membuat volume atau storage untuk node worker

```sh
for domain in kube-wrk{1..3}; do  
sudo virsh vol-create-as pool-1 ${domain}-ceph.qcow2 16;
done
```

<br>
check details dari image

```sh
sudo qemu-img info /pool/1/kube-wrk3-ceph.qcow2
```

### attach disk ke node worker

saya akan attach disk ke node worker dengan nama vdc untuk block device, jika tidak bisa/error saat mengeksekusi code bisa gunakan super user/root

```sh
for domain in kube-wrk{1..3}; do
sudo virsh attach-disk --domain ${domain} \
--source /pool/1/${domain}-ceph.qcow2
--persistent --target vdc
done
```

<br>
untuk mengecek block device bisa menggunakan perintah dibawah

```sh
lsblk
```

## Step 2: Deploy Rook Storage

:::warning
semua proses deployment ini berjalan di **node master**
:::

clone rook project dari github

```sh
git clone --single-branch --branch release-1.11 https://github.com/rook/rook.git
```

<br>
pindah ke rook folder examples yang berada di dalam folder rook

```sh
cd rook/deploy/exapmles/
```

<br>
terapkan file *crds.yaml* untuk membuat CRDs

```sh
kubectl crds.yml
```

<br>
terapkan file *common.yaml*

```sh
kubectl create -f common.yaml
```

<br>
terapkan file *operator.yaml*

```sh
kubectl create -f operator.yaml
```

<br>
lihat semua hasil deployment rook-ceph

```sh
kubectl -n rook-ceph get pod
```

## Step 3: Create Ceph Cluster di Kubernetes

atur default namespace ke rook-ceph,

```sh
kubectl config set-context --current --namespace rook-ceph
```

<br>
terapkan file *cluster.yaml*

```sh
kubectl create -f cluster.yaml
```

<br>
melihat semua resource yang telah dibuat

```sh
kubectl get all -n rook-ceph
```

<br>
Verifikasi bahwa CR cluster telah dibuat dan aktif:

```sh
kubectl -n rook-ceph get cephcluster
```

## Step 4: Deploy Rook Ceph toolbox di Kubernetes

terapkan file *toolbox.yaml*

```sh
kubectl  apply  -f toolbox.yaml
```

<br>
masuk ke shell dari rook-ceph-tools

```sh
kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash
```

<br>
check status rook ceph menggunakan rook-ceph-tools. pastikan sudah berada di shell dari rook-ceph-tools

```sh
ceph status
```

## step 5: bekerja dengan ceph storage mode

rook ceph mempunyai 3 type storage:

1. Shared Filesystem: dapat digunakan oleh beberapa pods(RWX)
2. block : digunakan oleh 1 pod (RWO)
3. Object: dapat di akses dari luar maupun dari dalam cluster kubernetes

### contoh penggunaan  rook ceph

disini saya mengambil contoh dari pemakaian atau penggunaan  type Shared Filesystem.

```sh
kubectl create -f filesystem.yaml
```

<br>
menerapkan file storage class

```sh
kubectl create -f csi/cephfs/storageclass.yaml
```

<br>
mengecek storage class

```sh
kubectl get sc
```

<br>
test storage class dengan membuat pvc dan pod

```sh
kubectl create  -f  csi/cephfs/pvc.yaml
```

```sh
kubectl create -f csi/cephfs/pod.yaml
```

```sh
kubectl get pvc
```

## Step 6: Rook Ceph Dashboard

terapkan dashboard-external-https

```sh
kubectl create -f dashboard-external-https.yaml
```

<br>
cek nodeport dari dashboard-external-https

```sh
kubectl -n rook-ceph get service rook-ceph-mgr-dashboard-external-https
```

<br>

untuk login ke rook ceph dashboard menggunakan user ***admin***, sedangkan passwordnya bisa didapatkan dengan perintah

```sh
kubectl -n rook-ceph get secret rook-ceph-dashboard-password -o jsonpath="{['data']['password']}" | base64 --decode && echo
```

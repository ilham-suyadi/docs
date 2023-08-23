# SUMMARY

ini adalah penjelasan mengenai cara membuat Virtual Machine(VMs) dengan terraform yang menggunakan provider KVM yang berada di local.

Hal-hal yang diperlukan :

>- aplikasi kvm
>- aplikasi terraform
>- image yang akan di jalankan, kali ini adalah centos 7 generic cloud  <https://mirrors.cloud.tencent.com/centos-cloud/centos/7/images/>
>- text editor

Basic Command/perintah dasar :

| Perintah | Fungsi |
|--- | ---|
| terraform init | berguna untuk mengeksekusi dan menginstall plugins provider|
| terraform plan | menunjukkan file yang akan di eksekusi |
| terraform apply | mengapply dan mengeksekusi file terraform (membuat infrastructure )|
| terraform apply -auto-approve | terraform apply tanpa perlu confirmation |
| terraform destroy | menghapus infrastructure yang di buat oleh terrafrom |

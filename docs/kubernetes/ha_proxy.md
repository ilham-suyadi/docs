# kubernetes cluster menggunakan HAProxy dan Keepalived

## install haproxy & keepalived <sup> *all master* </sup>

```sh
sudo yum install haproxy keepalived -y
```

## buat file check_apiserver.sh dan isi dengan script di bawah <sup> *all master* </sup>

> membuat file
>
>```sh
> sudo vi /etc/keepalived/check_apiserver.sh
> ```

<br>

> Script yang di masukkan ke file_apiserver.sh
>
```sh
script : 
#!/bin/sh
APISERVER_VIP=192.168.1.45
APISERVER_DEST_PORT=6443

errorExit() {
	echo "*** $*" 1>&2
	exit 1
}

curl --silent --max-time 2 --insecure https://localhost:${APISERVER_DEST_PORT}/ -o /dev/null || errorExit "Error GET https://localhost:${APISERVER_DEST_PORT}/"
if ip addr | grep -q ${APISERVER_VIP}; then
	curl --silent --max-time 2 --insecure https://${APISERVER_VIP}:${APISERVER_DEST_PORT}/ -o /dev/null || errorExit "Error GET https://${APISERVER_VIP}:${APISERVER_DEST_PORT}/"
fi
```

## atur ijin file check_apiserver.sh <sup> *all master* </sup>

```sh
sudo chmod +x /etc/keepalived/check_apiserver.sh
```

## backup file keepalived.conf dan truncate file <sup> *all master* </sup>

```sh
sudo cp /etc/keepalived/keepalived.conf /etc/keepalived/keepalived.conf-org
```

```sh
sudo sh -c '> /etc/keepalived/keepalived.conf'
```

## edit file /etc/keepalived/keepalived.conf <sup> *all master tapi ada beberpa perbedaan konfigurasi* </sup>

***master 1***

```sh
! /etc/keepalived/keepalived.conf
! Configuration File for keepalived
global_defs {
	router_id LVS_DEVEL
}
vrrp_script check_apiserver {
  script "/etc/keepalived/check_apiserver.sh"
  interval 3
  weight -2
  fall 10
  rise 2
}

vrrp_instance VI_1 {
	state MASTER
	interface eth0
	virtual_router_id 151
	priority 255
	authentication {
    	auth_type PASS
    	auth_pass 1111!
	}
	virtual_ipaddress {
    	192.168.122.5/24
	}
	track_script {
    	check_apiserver
	}
}
```

<br>

***master 2***

```sh
! /etc/keepalived/keepalived.conf
! Configuration File for keepalived
global_defs {
	router_id LVS_DEVEL
}
vrrp_script check_apiserver {
  script "/etc/keepalived/check_apiserver.sh"
  interval 3
  weight -2
  fall 10
  rise 2
}

vrrp_instance VI_1 {
	slave MASTER
	interface eth0
	virtual_router_id 151
	priority 254
	authentication {
    	auth_type PASS
    	auth_pass 1111!
	}
	virtual_ipaddress {
    	192.168.122.5/24
	}
	track_script {
    	check_apiserver
	}
}
```

<br>

***master 3***

```sh
! /etc/keepalived/keepalived.conf
! Configuration File for keepalived
global_defs {
	router_id LVS_DEVEL
}
vrrp_script check_apiserver {
  script "/etc/keepalived/check_apiserver.sh"
  interval 3
  weight -2
  fall 10
  rise 2
}

vrrp_instance VI_1 {
	slave MASTER
	interface eth0
	virtual_router_id 151
	priority 253
	authentication {
    	auth_type PASS
    	auth_pass 1111!
	}
	virtual_ipaddress {
    	192.168.122.5/24
	}
	track_script {
    	check_apiserver
	}
}
```

## backups file haproxy.cfg <sup> *all master* </sup>

```sh
sudo cp /etc/haproxy/haproxy.cfg /etc/haproxy/haproxy.cfg-org
```

## edit config /etc/haproxy/haproxy.cfg

```sh
frontend main
    bind *:8443
    mode tcp
    option tcplog
    default_backend             kubernetes-master

#---------------------------------------------------------------------
# round robin balancing between the various backends
#---------------------------------------------------------------------
backend kubernetes-master
    option httpchk GET /healthz
    http-check expect status 200
    mode tcp
    option ssl-hello-chk
    balance     roundrobin
    server  kubernetes-master-0 192.168.122.33:6443 check
    server  kubernetes-master-1 192.168.122.183:6443 check
    server  kubernetes-master-1 192.168.122.122:6443 check
```

## enable keepalived and haproxy <sup> *all master* </sup>

```sh
sudo systemctl enable keepalived --now
sudo systemctl enable haproxy --now
```

## disable Swap <sup> *all master & worker* </sup>

```sh
sudo swapoff -a 
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fsta
```

## Atur SELinux sebagai permisive <sup> *all master & worker* </sup>

```sh
sudo setenforce 0
sudo sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config
```

## kubeadm init <sup> *master master* </sup>

```sh
sudo kubeadm init --control-plane-endpoint "192.168.122.5:8443" --upload-certs --pod-network-cidr=10.244.0.0/16
```

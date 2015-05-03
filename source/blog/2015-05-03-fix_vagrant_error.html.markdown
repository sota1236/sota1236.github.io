---
title: Vagrantfileにchefバージョン指定した時に出たエラー直した
date: 2015-05-03 18:20 JST
tags:
- Vagrant
---

細々とVagrantいじってる過程でchefとやらを入れてみようと思って、

`vagrant-omnibus`をインストールした後、Vagrantfileに以下のように追記した。

```shell
$ vagrant plugin install vagrant-omnibus
```

* Vagrantfile

```
config.omnibus.chef_version = :latest
```

そしたら以下のようなエラーを吐いた。

```shell
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Clearing any previously set forwarded ports...
==> default: Clearing any previously set network interfaces...
==> default: Preparing network interfaces based on configuration...
    default: Adapter 1: nat
    default: Adapter 2: hostonly
==> default: Forwarding ports...
    default: 22 => 2222 (adapter 1)
==> default: Booting VM...
==> default: Waiting for machine to boot. This may take a few minutes...
    default: SSH address: 127.0.0.1:2222
    default: SSH username: vagrant
    default: SSH auth method: private key
    default: Warning: Connection timeout. Retrying...
==> default: Machine booted and ready!
==> default: Checking for guest additions in VM...
==> default: Configuring and enabling network interfaces...
==> default: Mounting shared folders...
    default: /vagrant => /Users/sota1235/Documents/sota1235/vagrant_space/centos7
Failed to mount folders in Linux guest. This is usually because
the "vboxsf" file system is not available. Please verify that
the guest additions are properly installed in the guest and
can work properly. The command attempted was:

mount -t vboxsf -o uid=`id -u vagrant`,gid=`getent group vagrant | cut -d: -f3` vagrant /vagrant
mount -t vboxsf -o uid=`id -u vagrant`,gid=`id -g vagrant` vagrant /vagrant

The error output from the last command was:

/sbin/mount.vboxsf: mounting failed with the error: No such device
```

追記する前はなんの問題もなく起動できてたのに、いきなりエラー吐いて意味ぷーさん。

んで、いろいろggってたら、以下のページの３番目の手法で解決できた。

[Vagrant (3) 続・CentOS7 の仮想マシンを作る](http://techblog.clara.jp/2015/01/vagrant-3-centos7-virtual-machine/)

以下解決策。

* vagrant-vbguestをインストール

これだけ。なので、

```shell
$ vagrant plugin install vagrant-vbguest
```

して`vagrant up`して解決。ちゃんちゃん。

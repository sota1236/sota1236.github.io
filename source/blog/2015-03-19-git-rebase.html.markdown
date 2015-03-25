---
title: Git開発でmasterの内容を開発ブランチに反映させる方法
date: 2015-03-19 13:53 JST
tags:
- git
- GitHub
---

Git開発を行っていると、こんなことありませんか。

- `origin/master`ブランチから`hoge`ブランチを切る

- `hoge`の実装をゴリゴリ行ってる間に`origin/master`ブランチがどんどん更新されていく

- 自分が編集してたファイルが`master`で更新されてた＼(^o^)／

- `origin/master`を一回merge、コンフリクトを直してPull Requestを送る

あるあるですよね。

そしてrebaseを知らない頃の僕は以下の方法で解決していました。

```Shell
% git checkout master

% git pull origin master

% git checkout hoge

% git merge master

(ここでコンフリクトが出て怒られる)
(bot modifiedステータスのファイルを修正、コミット)

% git push origin hoge
```

ここでやっとPull Requestを送ることができます

下の図で言うと

- CからGへmergeコミット(この際、コンフリクトを解消)

- GからFへmergeコミット(プルリクエスト)

となります。

![](/blog/2015/03/19/git-rebase/rebase01.png)

しかしrebaseコマンドを使うことでこの2回のコミットを1回に減らすことができます


# rebaseコマンド

`rebase`コマンドを使うことで、現在のブランチが生えているポイントをmasterの最新のコミットに変更することができます。

図で言うならば下図の状態が

![](/blog/2015/03/19/git-rebase/rebase02.png)

こうなります。

![](/blog/2015/03/19/git-rebase/rebase03.png)

この際、コミットは1回も増えていません。

ここからプルリクを出し、mergeされると下図のようになります。

![](/blog/2015/03/19/git-rebase/rebase04.png)

mergeコミットはこの1回で済み、履歴を綺麗に残すことができました！YATTA！

# 使い方

### 1 ローカルのmasterを最新の状態にする

まずはrebaseするmasterブランチを最新の状態にします。

この際、ブランチがmasterに切り替わっていないと開発ブランチにmergeしようとしてしまうので注意してください。

```Shell

% git checkout master

% git pull origin master

```

### 2 rebaseコマンドを叩く

開発ブランチに戻り、rebaseコマンドを叩きます。

この際、コンフリクトが発生しなければ手順は終了です。`git log`あたりで履歴を見て見てください！

当然、コンフリクトが起こることもあるので、その場合を次で説明します。

```Shell

% git checkout hoge

% git rebase master

```

### 3 コンフリクトを解消する

コンフリクトが発生した場合は、ファイルを修正、`add`して`rebase --continue`します。これをコンフリクトが消えるまで繰り返します。

ここで`commit`してしまうとやり直しになってしまうので気をつけてください。

rebaseを途中でやめて、rebase直前の状態に戻す場合は`git rebase --abort`を叩けばオッケーです。

```Shell

% vi conflictFile1.txt

% git add conflictFile1.txt

% git rebase --continue

(ここでまたコンフリクトが出たら同じことを繰り返す)

※rebase直前の状態に戻す場合は

% git rebase --abort

```

# 注意点

もし、すでに開発ブランチをリモートにpushしている場合、rebaseを行った後にpushすると怒られてしまうので`force`オプションをつけてください

※ リモートの開発ブランチが変更される処理なので慎重に行ってください

```

% git push -f origin hoge

```

# 何が嬉しいか

- コミット2回が1回で済むので履歴が綺麗

- 作業途中で一旦`master`を反映したいとき、commitを増やすことなくmergeすることができる

# その他

ここ間違ってるよーとか読みづれーよーとかあったらコメントなり編集なりしてくださいm(_ _)m

# 参考

[Seasons.NETgit rebaseって超便利じゃね？](http://blog.seasons.cc/entry/20090329/1238351273)

[git rebasetips](http://kik.xii.jp/archives/117)#

---
title: GistのCSSがおかしいので!importする
date: 2015-04-19 14:24 JST
tags:
- CSS
---

先日書いたブログ記事にGistを埋め込むと表示がおかしくなってる。

![](/images/general/0419gist.png)

ネタバレ防止みたいになってるので直す。

Chromeのデベロッパーツールで見てみると、なぜか```span```タグに囲まれていないコードだけblog由来のハイライト用スタイルシートがあたっている。

ggってみるとCSSの優先順位は後から読み込まれたものが優先されるはずなのだが、原因が不明なので`.gist pre`要素だけ新たにスタイルシートを追記して解決を試みる

**※前提としてブログ構築環境はmiddleman-blog 3.5.3です**

1. まず```_gist.sass```を新たに作成し、`/data/stylesheets/`にいれる

```sass

.gist
  pre
    color: #66757f

```

2. これを`all.css.sass`に読み込ませる

```sass

@import "gist"

```

3. middleman build & middleman deploy

デプロイする前にローカルで確認してみる

![](/images/general/0419gist2.png)

できた(╹◡╹)


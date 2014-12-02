---
title: レスポンシブ対応しようとした時に困ったこと
date: 2014-12-02 15:15 JST
tags:
- CSS
---

このsota1235.comは静的サイトジェネレータである[Middleman blog](http://middlemanapp.com/jp/basics/blogging/)とCSSフレームワークである[Pure](http://purecss.io/)を用いて作成されている。

これは[camuro.org](http://camuro.org)をリスペクトしての構成であるが、レスポンシブ対応を試みた時につまづいたのでメモする。

### Media Queriesとviewport

Pure CSSでは`divタグ`にclassを付与することでレイアウトを作成することができる。

生成されたページのCSSを見ると以下のようになっている。

```CSS
@media screen and (min-width: 48em)
.pure-u-md-1-4, .pure-u-md-6-24 {
  width: 25%;
}
```

`min-width: 48em`の部分で基準のサイズを決めており、このような記法をMedia Queriesという。

また、これを反映させるためには`metaタグ`でviewportを設定する必要がある。(ここでつまづいていた…)

sota1235.comでは以下のように設定してある。

```HTML
<meta content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" name="viewport">
```

contentの内容は

- `width=device-width` ... 横幅をデバイスの幅として設定

- `initial-scale=1.0` ... 倍率の初期設定

- `user-scalable=no` ... ユーザがズームできるかの設定

- `minimum-scale=1.0` ... 最小比率の設定

- `maximum-scale=1.0` ... 最大比率の設定

という感じ。

これを設定してあげることでCSSがデバイスの画面幅を読み込み、そのサイズにあったスタイルシートをあててくれる。

「とりあえずBootstrapダー！！」とか「Pureでレスポンシブなおしゃれブログ構築ヤー！！」なんて言う前に、こういう基礎の部分をしっかり抑えないとつまづくことが多いような気がします。

お勉強になったしいい教訓でした。ちゃんちゃん

### 参考

[レスポンシブWebデザインはviewportとメディアクエリーからはじめろ！](http://barktoimagine.com/web/846)

[CSS3のMedia Queries（メディアクエリ）の使い方と実装例](http://coliss.com/articles/build-websites/operation/css/css3-media-queries.html)

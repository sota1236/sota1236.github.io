---
title: SlackにHubot Integrationを追加してから開発環境を整えるまで
date: 2015-04-29 17:11 JST
tags:
- Hubot
---

入社してからぼちぼち楽しい日々を送っているのですが、

研修中はコードが書けないのでフラストレーション溜まって、同期で使ってるSlackのHubot開発で残業した

ということでこの記事では

**「SlackにHubotを追加し、実際に運用するまで」**

をまとめます。

そのために以下の環境を予め整えてください。

* Slack Teamの作成

* Node.js( >= 0.10 )のインストール

* GitHubの登録

* Herokuの登録

* Travis CIの登録

* Heroku Toolbeltのインストール

具体的には以下の順で説明していきます

1. SlackにHubot Integrationを追加

2. Slack Hubotリポジトリを作成

3. Herokuにデプロイ

3. 実際にいくつかHubotプラグインを入れる

4. 自分でオリジナルのHubotプラグインを入れる

やっていきましょう。

# 1 SlackにHubot Integrationを追加

Slackを開いて、左上のチーム名をクリックします。

すると"Team Settings"というのがあるので、それを開きます。

![](http://i.gyazo.com/af296c68f98fb2244146f1d500c38caf.png)

するとこんなかんじでページが開かれるので、左上の"Menu"から"Integrations"をクリック。

![](http://i.gyazo.com/c546e0441d4aee84ed4c1311fe78aa86.png)

![](http://i.gyazo.com/54dd75b6061940d86235accf76225471.png)

するとIntegration一覧が出るので、Hubotを探して"Add"してください。

![](http://i.gyazo.com/6a3d92ed1d16b276f4df842efeae7e17.png)

あとは指示に従ってUser名やアイコン等をお好みで変えて完了です。

これであなたのSlack TeamにHubotアカウントが追加されました。

しかし、このままではHubotは抜け殻のままなので、中身を実装していきます。

※ `HUBOT_SLACK_TOKEN`は後ほど使います。画面は開いたままで！

# 2 Slack Hubotリポジトリを作成

手順１で作ったHubotアカウントの中身を作りましょう。

今回はGitHub上で開発する前提で話を進めていきます。

まずは必要なnpmをインストール。

```shell
$ npm i -g hubot coffee-script generator-hubot
```

次に適当な場所でHubot用のディレクトリを作成し、botoを作成します。

```shell
$ mkdir [hubot_name]
$ cd [hubot_name]
$ yo hubot

? ==========================================================================
We're constantly looking for ways to make yo better!
May we anonymously report usage statistics to improve the tool over time?
More info: https://github.com/yeoman/insight & http://yeoman.io
========================================================================== Yes
                     _____________________________
                    /                             \
   //\              |      Extracting input for    |
  ////\    _____    |   self-replication process   |
 //////\  /_____\   \                             /
 ======= |[^_/\_]|   /----------------------------
  |   | _|___@@__|__
  +===+/  ///     \_\
   | |_\ /// HUBOT/\\
   |___/\//      /  \\
         \      /   +---+
          \____/    |   |
           | //|    +===+
            \//      |xx|

? Owner: sota1235 <sota1235@gmail.com>
? Bot name: test2
? Description: A simple helpful robot for your Company
? Bot adapter: (campfire) slack
? Bot adapter: slack

```

これでディレクトリにHubotのひな形ができました。

これをgitリポジトリ化して次の手順に進みます。

```shell
$ git init

$ git add .

$ git commit -m "initial commit"
```

# 3 Herokuにデプロイ

これで実際に中身ができたので、Herokuにデプロイします。

HerokuはPaaSサービスの一種です。詳しくはこちらの記事を参照ください。

[初心者でも15分で公開できるHerokuのはじめかた](http://developers.mobage.jp/blog/how-to-use-for-beginners-heroku)

Herokuへのデプロイは[heroku-toolbelt](https://toolbelt.heroku.com/)を使用します。

先ほどHubotを作成したフォルダに移動してください。

まずheorkuにログイン、アプリケーションの作成を行います。

```shell
$ heroku login
Enter your Heroku credentials.
Email: your@mail.address
Password (typing will be hidden):
Authentication successful.

$ heroku create [hubot_name]
```

これでGitリポジトリのリモートリポジトリにHerokuが追加されました。

`git remote -v`して確認してみてください。

次に、Hubotに必要な`Redis`のアドオンをHerokuに追加します。

```shell
$ heroku addons:add redistogo:nano
```

完了したら、いくつかの環境変数をHerokuへ送信します。

コマンドは`heroku config:set key1=val1`を使用します。

1番の手順で出てきた`HUBOT_SLACK_TOKEN`を使用します。

```shell
$ heroku config:set HUBOT_SLACK_TOKEN=[先ほどのTOKEN]
```

次に`HUBOT_HEROKU_KEEPALIVE_URL`をセットする。

値は以下のコマンドの結果の`web_url`に書いてあるものを設定する。

```shell
$ heroku apps:info

=== slack-hubot-fresh15
Addons:        redistogo:nano
Dynos:         1
Git URL:       https://git.heroku.com/yourapp.git
Owner Email:   your@email.jp
Region:        us
Repo Size:     19k
Slug Size:     19M
Stack:         cedar-14
Web URL:       [hubot app url]
Workers:       0

$ heroku config:set HUBOT_HEROKU_KEEPALIVE_URL=[hubot app url]
```

これでHerokuの設定は完了です。

以下のコマンドでデプロイしてみましょう。

```shell
$ git push heroku master
```

SlackでHubotにpingを送って返って来れば成功です！

![](http://i.gyazo.com/22940cd8f69a376467c2cace2de090ed.png)

# 4 実際にいくつかHubotプラグインを入れる

まずはnpmで配布されてるhubotプラグインをいくつか入れてみます。

今回はhubot-shubotとhubot-rss-readerを追加してみます。

追加する手順としては、

1. `external-scripts.json`を編集

2. `package.json`を編集

するだけです。なんて簡単＼(^o^)／！

`external-scripts.json`

```javascript
[
  "hubot-shubot",
  "hubot-rss-reader"
]
```

`package.json`は、`dependencies`の項に追加する

```json
{
  "name": "your hubot app",
  "version": "0.0.0",
  "private": true,
  "author": "sota1235 <sota1235@gmail.com>",
  "description": "hubot",
  "dependencies": {
    "hubot": "^2.12.0",
    "hubot-diagnostics": "0.0.1",
    "hubot-google-images": "^0.1.4",
    "hubot-google-translate": "^0.1.0",
    "hubot-help": "^0.1.1",
    "hubot-heroku-keepalive": "0.0.4",
    "hubot-maps": "0.0.2",
    "hubot-pugme": "^0.1.0",
    "hubot-redis-brain": "0.0.2",
    "hubot-rules": "^0.1.0",
    "hubot-scripts": "^2.5.16",
    "hubot-shipit": "^0.2.0",
    "hubot-slack": "^3.3.0",
    "hubot-youtube": "^0.1.2",
    "hubot-shubot": "*",
    "hubot-rss-reader": "*",
  },
  "engines": {
    "node": "0.10.x"
  }
}
```

これでデプロイするだけ！

ただ、それぞれのプラグインで別途設定項目がある場合もあるので`README.md`をしっかり読みましょう。

# 5 自分でオリジナルのHubotプラグインを入れる

プラグインとしてでなく、Hubotに機能を追加する場合は基本`scripts`ディレクトリにファイルを追加します。

ファイル名に特に規則はありませんが、１機能１ファイルで作成していきましょう。

言語は`CoffeeScript`です。

弊社では新卒１年目に課される納会という名の試練があるので、納会の話が始まるとHubotが現実逃避をし始める機能を追加しました。

* `scripts/nokai.coffee`

```coffeescript
# Description:
#   心の叫びを具現化する
#
# Author:
#   @sota1235

_ = require 'lodash'

module.exports = (robot) ->
  robot.hear /納会/i, (msg) ->
    words = [
      "納会なんてないっっっ！！！"
      "納会なんてなかったんや…"
      "納会？なにそれ美味しいの"
    ]
    msg.send _.sample words
```

これで納会機能が追加されました。

![](http://i.gyazo.com/5809637868c1013d7efefe77020db28c.png)

# まとめ

Hubot最高

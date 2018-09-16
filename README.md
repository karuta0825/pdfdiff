### アプリ名
pdfdiff

### 概要
electronで作った２つのpdfを比較するアプリです。  
差分イメージと比較元イメージの両方を一画面でみれます

![イメージ](https://user-images.githubusercontent.com/9998881/45592675-0343f200-b9af-11e8-9cdc-649d7e1dad5d.gif)

#### 動作環境
 [x] Windows  
 [x] Mac  
 [-] Linux(未検証だが多分Macと同じ)  

#### 起動方法
1. git cloneでソース取得

2. 起動
  electronをグローバルインストールしている場合
 `npm install`後、`npm start`で起動させることができます。

  electronをグローバルインストールしていない場合
 `npm i -g electron`あるいは`npm i electron`の実行も必要となります。

#### できること
- ドラッグ&ドロップあるいはボタンよりファイル選択
- 差分イメージ、元イメージのどちらか一方のみ表示できる

#### 今後の課題
- 勉強のためRedux導入
- 選択ページに枠線追加、UI向上の為
- 比較ページを選択できるようにする


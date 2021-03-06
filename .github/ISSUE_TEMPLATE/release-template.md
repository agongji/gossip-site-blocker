---
name: Release template
about: Template for release.
title: ''
labels: ''
assignees: ikemo3

---

## ToDo

* [ ] 開発完了
* [ ] 新機能の動作確認
    * [ ] 「全てのブロックを一時解除」を非表示にすると「禁止用語でブロックされたサイトの情報を表示」が無効になる(#149)という問題がある
* [ ] Chromeで確認
    * [ ] 基本のブロック機能
    * [ ] 戻るボタンを押したときにブロックされること
        * [ ] 一部ゴミが表示されるが軽微(#146)
    * [ ] トップニュース(カード型)のブロック機能
    * [ ] 動画のブロック機能
    * [ ] Tweet(カード型)のブロック機能
    * [ ] コンパクトモード時のアイコンの位置
        * [ ] 基本
        * [ ] トップニュース・・・一部文字が隠れる(#147)
        * [ ] 動画
        * [ ] Tweet(カード型)
    * [ ] オプション画面
* [ ] Firefoxで確認
    * [ ] 基本のブロック機能
    * [ ] 戻るボタンを押したときにブロックされること
    * [ ] トップニュース(カード型)のブロック機能
    * [ ] 動画のブロック機能
    * [ ] Tweet(カード型)のブロック機能
    * [ ] コンパクトモード時のアイコンの位置
        * [ ] 基本
        * [ ] トップニュース
        * [ ] 動画
        * [ ] Tweet(カード型)
    * [ ] オプション画面
* [ ] エラーが出てないことの確認
* [ ] スクリーンショットがおかしくないことの確認(今はテストを止めている)
* [ ] CHANGELOG.mdの更新
* [ ] リリース準備
    * [ ] manifest.jsonのバージョンを変更
    * [ ] package.jsonのバージョンを変更
    * [ ] manifest.jsonから `version_name` を削除
    * [ ] タグの作成
* [ ] リリースバージョンをダウンロード
* [ ] Chrome Web Storeにリリース
* [ ] Firefox Add-onsにリリース
* [ ] ブログを更新
    * [ ] 記事を追加
    * [ ] 更新履歴を追加(英語)
    * [ ] 更新履歴を追加(日本語)
* [ ] 次のバージョンのマイルストーンを作成
* [ ] バージョンを変更
    * [ ] `apps/manifest.json`: version, version_nameを更新
    * [ ] `package.json`: versionを更新
* [ ] リリーステンプレートに反映させる

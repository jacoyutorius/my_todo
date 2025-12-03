<div align="center">
  <img src="public/favicon.png" alt="Daily TODO Logo" width="120" height="120">
  <h1>Daily TODO</h1>
  <p>
    <b>Simple, Local, Markdown-based TODO App</b>
  </p>
</div>

Daily TODOは、File System Access APIを活用したローカル完結型の日次TODOリストアプリケーションです。
あなたのPC内の指定したフォルダに、日ごとのMarkdownファイルとしてタスクを保存・管理します。

## ✨ 特徴

- **🔒 プライバシー重視**: データは全てあなたのローカルPC内に保存されます。サーバーには送信されません。
- **📝 Markdown形式**: データは標準的なMarkdownファイル(`YYYY-MM-DD.md`)として保存されるため、他のエディタでも閲覧・編集可能です。
- **📂 ディレクトリ管理**: 好きなフォルダを作業ディレクトリとして指定できます。
- **🎨 モダンなUI**: Vanilla CSSによる、美しくシンプルなダークモードデザイン。

## 🚀 使い方

1. アプリを開きます。
2. 「フォルダを選択」ボタンをクリックし、タスクを保存したいローカルフォルダを選択します。
3. ブラウザの権限リクエスト（ファイルの表示・編集）を許可します。
4. 今日の日付のファイルが自動作成され、TODOリストが表示されます。
5. タスクを追加したり、チェックを入れたりして管理しましょう。

## 🛠️ 技術スタック

- **Frontend**: React, TypeScript
- **Build Tool**: Vite
- **Styling**: Vanilla CSS
- **API**: File System Access API

## 📦 インストールと起動

```bash
# リポジトリのクローン
git clone https://github.com/jacoyutorius/my_todo.git

# ディレクトリ移動
cd my_todo

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

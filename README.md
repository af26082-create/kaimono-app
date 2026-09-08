# kaimono-app（買い物・支出管理アプリ）

買いたいものを登録しておき、実際に買ったらチェックを入れると、自動で支出として記録されるWebアプリです。
買い物リストを経由せず、支出だけを直接登録することもできます。

一人暮らしを始めたばかりで買い物に慣れていない学生を想定しています。
買い物メモアプリと家計簿アプリを別々に使うと同じ商品を2回入力することになり続かないため、
「チェックを入れる」という1回の操作で両方を済ませられるようにするのが狙いです。

## 使用技術

| 分類 | 内容 |
|---|---|
| フレームワーク | React 19 |
| 言語 | TypeScript |
| ビルドツール | Vite |
| スタイリング | 通常のCSS（CSSフレームワークは不使用） |
| 状態管理 | useState / useContext（外部ライブラリは不使用） |
| データ保存 | localStorage |

外部APIおよび外部データベースは使用していません。

## 起動方法

```bash
# 依存パッケージのインストール（初回のみ）
npm install

# 開発サーバーの起動
npm run dev
```

起動後、http://localhost:5180 を開いてください。

その他のコマンド:

```bash
npm run build     # 本番用ビルド（型チェックも実行されます）
npm run preview   # ビルド結果の確認
npx tsc -b        # 型チェックのみ
```

## フォルダ構成

```
src/
├── components/
│   ├── ItemCard.tsx    項目1件の表示（チェック・削除）
│   ├── ItemCard.css
│   └── ItemList.tsx    項目を件数分並べる
├── types.ts            データの型定義と合計計算
├── App.tsx             全体の組み立て
├── App.css
├── index.css
└── main.tsx            アプリの起動地点
```

## データ構造

買い物予定と支出は、`status` が違うだけの同じ `Item` として扱っています。
チェックを入れる操作が「`status` を変える」だけで済み、2種類のデータを同期させる必要がなくなります。

```ts
type Item = {
  id: string                    // 重複しないID
  name: string                  // 品名
  unitPrice: number             // 単価
  quantity: number              // 個数
  category: Category            // 食費 / 日用品 / 衣類 / 趣味・娯楽 / 交通 / その他
  memo: string                  // メモ
  status: 'planned' | 'bought'  // 買う予定 / 購入済み
  boughtAt: string | null       // 購入日（未購入なら null）
  createdAt: string             // 登録日時
}
```

合計金額は保存せず、`単価 × 個数` でその都度計算しています。
保存する値を最小限にして、データの食い違いが起きないようにするためです。

## 開発状況

- [x] プロジェクトの初期設定
- [x] データ型の定義
- [x] ItemCard（1件の表示、チェック、削除）
- [x] ItemList（一覧表示、0件のときの案内）
- [ ] ItemsContext（データの保持と localStorage への保存）
- [ ] ItemForm（入力フォーム）
- [ ] 買い物リスト / 支出の2セクションへの振り分け
- [ ] 合計金額の表示

## ドキュメント

| ファイル | 内容 |
|---|---|
| `設計書.txt` | アプリの設計（機能・画面・コンポーネント・技術構成） |
| `学習記録_ItemCard.txt` | ItemCard 制作時の記録とふりかえり |
| `メモ/props.txt` | props の仕組みのまとめ |
| `CLAUDE.md` | 開発の進め方のルール |

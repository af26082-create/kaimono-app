const CATEGORIES = ['食費', '日用品', '衣類', '趣味・娯楽', '交通', 'その他'] as const;

type Category = (typeof CATEGORIES)[number]

type ItemStatus = 'planned' | 'bought';

type Item = {
    id: string          // 重複しないID
    name: string        // 品名
    unitPrice: number   // 単価
    quantity: number    // 個数
    category: Category  // 食費 / 日用品 / 衣類 / 趣味・娯楽 / 交通 / その他
    memo: string        // メモ
    status: ItemStatus // 買う予定 / 購入済み
    boughtAt: string | null       // 購入日（未購入ならnull）
    createdAt: string             // 登録日時
}

type NewItemInput = {
  name: string
  unitPrice: number
  quantity: number
  category: Category
  memo: string
  status: ItemStatus
}

const itemTotal = (item: Item) => {
    return item.unitPrice * item.quantity;
};

/**
 * 今日の日付を '2026-09-10' の形の文字列で返す。
 * Date型ではなく文字列で扱うのは、localStorage に保存するとどのみち文字列になるため。
 */
function today(): string {
    // new Date() は「呼んだ瞬間の日時」を持つオブジェクトを作る。
    // 関数の中で呼ぶことが大事。外に置くと、アプリを開いた瞬間の日付で固定されてしまう。
    const d = new Date()

    const year = d.getFullYear()

    // getMonth() は 0 から始まる（1月が 0）ので 1 を足す。
    // padStart(2, '0') は「2文字になるまで先頭に 0 を足す」（9 → '09'）。
    // 数値には padStart がないので、String() で文字列にしてから呼ぶ。
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')

    // テンプレートリテラル（バッククォートと ${}）で連結して返す。
    return `${year}-${month}-${day}`
}

export { itemTotal, CATEGORIES, today };          // 値（実行時に存在するもの）
export type { Category, ItemStatus, Item, NewItemInput }; // 型（ビルド時に消えるもの）

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

const itemTotal = (item: Item) => {
    return item.unitPrice * item.quantity;
};

export { itemTotal, CATEGORIES };          // 値（実行時に存在するもの）
export type { Category, ItemStatus, Item }; // 型（ビルド時に消えるもの）
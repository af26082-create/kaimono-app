import type { Item } from '../types'
import ItemCard from './ItemCard'

// このコンポーネントが受け取る値の取り決め。
type ItemListProps = {
    items: Item[]                     // 表示する項目の配列
    onToggle: (id: string) => void    // ItemCard にそのまま渡す
    onDelete: (id: string) => void    // ItemCard にそのまま渡す
    emptyMessage: string              // 0件のときに出す文言
}

function ItemList({ items, onToggle, onDelete, emptyMessage }: ItemListProps) {
    // 0件のときはここで終わり（早期リターン）。
    // これ以降は「1件以上ある」前提で書ける。
    if (items.length === 0) {
        return <div>{emptyMessage}</div>
    }

    return (
        <div>
            {/* データ1件 → ItemCard 1つ に変換して並べる。
                key は React が要素を見分けるための目印。データの id を使う。 */}
            {items.map((item) => (
                <ItemCard
                    key={item.id}
                    item={item}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default ItemList

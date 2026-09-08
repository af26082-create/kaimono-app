import './App.css'
// ItemList を読み込む。default export なので {} は付けない。
// 名前は自由に付けられるが、中身と同じ名前にしておく。
import ItemList from './components/ItemList'
import type { Item } from './types'

// 動作確認用の仮データ。あとで localStorage のデータに置き換える。
// コンポーネントの外に置いているので、再描画のたびに作り直されない。
const item1: Item = {
  id: '1',
  name: '商品1',
  unitPrice: 100,
  quantity: 2,
  category: '食費',
  memo: '',
  status: 'planned',
  boughtAt: null,
  createdAt: '2026-08-30',
}

const item2: Item = {
  id: '2',
  name: '商品2',
  unitPrice: 200,
  quantity: 1,
  category: '日用品',
  memo: 'めも',
  status: 'bought',
  boughtAt: '2026-08-30',
  createdAt: '2026-08-30',
}

const item3: Item = {
  id: '1',
  name: '商品3',
  unitPrice: 100,
  quantity: 2,
  category: '食費',
  memo: '',
  status: 'planned',
  boughtAt: null,
  createdAt: '2026-08-30',
}

// ItemList は配列を受け取るので、2件をまとめておく。
const items: Item[] = [item1, item2, item3]

function App() {
  // チェックが押されたときの動作。
  // ItemCard → ItemList → App と、id だけが伝わってくる。
  // 今は確認用に Console へ出すだけ。あとで本当にデータを変える処理に差し替える。
  function handleToggle(id: string) {
    console.log('toggle:', id)
  }

  // 削除が押されたときの動作。今は確認用。
  function handleDelete(id: string) {
    console.log('delete:', id)
  }

  return (
    <div className="app">
      <h1>お買い物メモ</h1>

      {/* ItemList に4つの props を渡す。
          items        … 表示したい項目の配列
          onToggle     … チェックが押されたときに呼んでほしい関数
          onDelete     … 削除が押されたときに呼んでほしい関数
          emptyMessage … 0件のときに出す文言 */}
      <ItemList
        items={items}
        onToggle={handleToggle}
        onDelete={handleDelete}
        emptyMessage="表示する項目がありません"
      />
    </div>
  )
}

export default App

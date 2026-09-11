import './App.css'
// ItemList を読み込む。default export なので {} は付けない。
// 名前は自由に付けられるが、中身と同じ名前にしておく。
import ItemList from './components/ItemList'
import type { Item } from './types'
import { useState ,useEffect} from 'react'
import { today } from './types'

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
  id: '3',
  name: '商品3',
  unitPrice: 100,
  quantity: 2,
  category: '食費',
  memo: '',
  status: 'planned',
  boughtAt: null,
  createdAt: '2026-08-30',
}

const STORAGE_KEY = 'kaimono-app.items'

function loadItems() : Item[] {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)

      if(raw === null) {return [item1, item2, item3]} 

      return JSON.parse(raw)
    }catch{
      return [item1,item2,item3]
    }
  }

function App() {
  const [items, setItems] = useState<Item[]>(() => loadItems())
  // チェックが押されたときの動作。
  // ItemCard → ItemList → App と、id だけが伝わってくる。
  
  function handleToggle(id: string) {
    setItems(
      items.map((item) => {
        if (item.id !== id) return item

        // ここ：item.status を見て、新しいオブジェクトを return する
        return item.status === 'planned' ? { ...item, status: 'bought', boughtAt: today() } : {...item, status:'planned', boughtAt:null}
      })
    )
  }

  // 削除が押されたときの動作。今は確認用。
  function handleDelete(id: string) {
    setItems(
      items.filter((item) =>  (item.id !== id) ))
  }

  useEffect(() =>{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
  },[items])

  const plannedItems = items.filter((item) => (item.status === 'planned'))

  const boughtItems = items.filter((item) => item.status === 'bought')

  return (
    <div className="app">

      <h1>お買い物メモ</h1>

    {/* ItemList に4つの props を渡す。
          items        … 表示したい項目の配列
          onToggle     … チェックが押されたときに呼んでほしい関数
          onDelete     … 削除が押されたときに呼んでほしい関数
          emptyMessage … 0件のときに出す文言 */}
      <section>
      <h2>買い物リスト</h2>
      <ItemList
        items={plannedItems}
        onToggle={handleToggle}
        onDelete={handleDelete}
        emptyMessage="買う予定のものはありません"
      />
      </section>
      <section>
      <h2>支出</h2>
      <ItemList
        items={boughtItems}
        onToggle={handleToggle}
        onDelete={handleDelete}
        emptyMessage="支出はありません"
      />
      </section>
    </div>
  )
}

export default App

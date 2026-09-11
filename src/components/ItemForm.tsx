import { type ItemStatus, type NewItemInput, type Category, CATEGORIES } from "../types";
import { useState } from 'react'

type ItemFormProps = {
    status: ItemStatus
    onAdd: (input: NewItemInput) => void
}

function ItemForm({ status, onAdd }: ItemFormProps) {

    const [name, setName] = useState('')
    const [unitPrice, setUnitPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState<Category>('その他')
    const [memo, setMemo] = useState('')

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onAdd({
            name,
            unitPrice: Number(unitPrice),
            quantity: Number(quantity),
            category: category,
            memo: memo,
            status,
        })
        setName('')
        setUnitPrice('')
        setQuantity('')
        setCategory('その他')
        setMemo('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>品名
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /></label>
            <label>単価
                <input
                    type="number"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                />
            </label>
            <label>個数
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </label>
            <label>カテゴリ
                <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
                    {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </label>
            <label>メモ
                <input
                    type="text"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                />
            </label>
            <button type="submit">追加</button>
        </form>)

}

export default ItemForm
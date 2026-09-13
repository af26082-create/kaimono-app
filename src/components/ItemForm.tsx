import { type ItemStatus, type NewItemInput, type Category, CATEGORIES } from "../types";
import { useState } from 'react'
import './ItemForm.css'

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
    const [error, setError] = useState('')

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        // <form> の既定の動作（ページ再読み込み）を止める。
        e.preventDefault()

        // 先に変換をまとめておく。
        // Number.isNaN や Number.isInteger は文字列を変換しないので、
        // 必ず数値に変換してから渡すこと。
        const trimmedName = name.trim()
        const price = Number(unitPrice)
        const qty = Number(quantity)

        // 品名：空白だけの入力も弾くため、trim してから判定する。
        if (trimmedName === '') {
            setError('品名を入力してください')
            return
        }

        // 単価：0以上の数値であること。整数でなくてよい。
        // Number('') は 0 になってしまうので、空欄チェックを別に行う。
        if (unitPrice.trim() === '' || Number.isNaN(price) || price < 0) {
            setError('単価は0以上の数値で入力してください')
            return
        }

        // 個数：1以上の整数であること。1.5個は買えないので isInteger で弾く。
        if (quantity.trim() === '' || !Number.isInteger(qty) || qty < 1) {
            setError('個数は1以上の整数で入力してください')
            return
        }

        // ここまで来たら問題なし。前回のエラー表示を消す。
        setError('')

        // 品名は前後の空白を取り除いたものを登録する。
        onAdd({
            name: trimmedName,
            unitPrice: price,
            quantity: qty,
            category,
            memo,
            status,
        })

        // 入力欄を初期状態に戻す。
        setName('')
        setUnitPrice('')
        setQuantity('')
        setCategory('その他')
        setMemo('')
    }

    return (
        <form className="item-form" onSubmit={handleSubmit}>
            {error !== '' && <p className="form-error">{error}</p>}
            <label>品名
                <input className="item-form__name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>単価
                <input className="item-form__price"
                    type="number"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                />
            </label>
            <label>個数
                <input className="item-form__quantity"
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
                <input className="item-form__memo"
                    type="text"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                />
            </label>
            <button type="submit">追加</button>
        </form>
    )
}

export default ItemForm

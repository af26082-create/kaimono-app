import type { ItemStatus, NewItemInput } from "../types";
import { useState } from 'react'

type ItemFormProps = {
    status: ItemStatus
    onAdd: (input: NewItemInput) => void
}

function ItemForm({ status, onAdd }: ItemFormProps) {

    const [name, setName] = useState('')

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onAdd({
            name,
            unitPrice: 0,
            quantity: 1,
            category: 'その他',
            memo: '',
            status,
        })
        setName('')
    }

        return(
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">追加</button>
        </form>)
    
}

export default ItemForm
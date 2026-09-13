import type { Item } from '../types'
import { itemTotal } from '../types'
import { useState } from 'react';
import './ItemCard.css'

type ItemCardProps = {
    item: Item;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (updated: Item) => void;
};



function ItemCard({ item, onToggle, onDelete, onUpdate }: ItemCardProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [draftName, setDraftName] = useState('')

    if (isEditing) {
        return (

            <div className="item-card">
                <label>品名
                    <input
                        type="text"
                        value={draftName}
                        onChange={(e) => setDraftName(e.target.value)}
                    /></label>

                <button onClick={() => {
                    if (draftName.trim() === '') return
                    onUpdate({ ...item, name: draftName.trim() })
                    setIsEditing(false)
                }}>保存</button>
                <button onClick={() => setIsEditing(false)}>キャンセル</button>
            </div >
        )
    }

    return (
        <div className={item.status === 'bought' ? 'item-card is-bought' : 'item-card'}>

            <input
                type="checkbox"
                checked={item.status === 'bought'}
                onChange={() => onToggle(item.id)}
            />
            <div className="item-card__body">
                <div className="item-card__item">{item.name}</div>
                <div>{item.unitPrice}円 × {item.quantity}個 = {itemTotal(item).toLocaleString()}円</div>
                <div>{item.category}{item.memo !== "" && ` ・ ${item.memo}`}</div>
                {item.boughtAt !== null && <p>購入日: {item.boughtAt}</p>}
            </div>
            <button onClick={() => {
                setIsEditing(true)
                setDraftName(item.name)
            }}>編集</button>
            <button onClick={() => onDelete(item.id)}>削除</button>

        </div>

    );
}

export default ItemCard
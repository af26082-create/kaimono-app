import type { Item } from '../types'
import { itemTotal } from '../types'
import './ItemCard.css'

type ItemCardProps = {
    item: Item;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

function ItemCard({ item, onToggle, onDelete }: ItemCardProps) {
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
            <button onClick={() => onDelete(item.id)}>削除</button>
        </div>

    );
}

export default ItemCard
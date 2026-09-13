import './TotalBar.css'
import {sumTotal, type Item } from '../types'

type TotalBarProps ={
    label:string,
    items: Item[],
}

function TotalBar({label,items}:TotalBarProps){
    return(
        <div className="total-bar">{label} {sumTotal(items).toLocaleString()}円 ({items.length}件)</div>
    )
}

export default TotalBar
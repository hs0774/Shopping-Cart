import React from "react"; 
import '../css/Shop.css'

interface Item {
    image: string,
    id: number,
    price: number,
    title: string,
    inCart:boolean,
    quantity:number,
    cost:number,
    rating: {
        rate:number
    },
}
interface Props {
    data: Item[];
    setData: React.Dispatch<React.SetStateAction<Item[]>>;
}
const Shop: React.FC<Props> = ({data,setData}) => {
    return (
        <h1>Shop</h1>
    )
}

export default Shop;
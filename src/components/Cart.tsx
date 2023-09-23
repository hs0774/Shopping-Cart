import React from "react"; 
import '../css/Cart.css'

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

const Cart: React.FC<Props> = ({data,setData}) => {
    return (
        <h1>Cart</h1>
    )
}

export default Cart;
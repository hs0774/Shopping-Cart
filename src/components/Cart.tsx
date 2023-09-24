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
    const [cart,setCart] = React.useState<Item[]>(data);
    React.useEffect(() => {
        if(data && data.length>0){
            setCart(data);
        }
        console.log(data)
    }, []);

    return (
        <div className="Cart">
            <div className="CartLeft">
                {cart[0].inCart ?
                <p>{cart[0].quantity}</p>:<p>Cart is empty shop now!</p>}
            {/* make a div with buy items if cart is empty  
            here is list of items with pic ,editable quantity, total,x button  */}
            </div>
            <div className="CartRight">
            {/* item list names quantity x price  total at bottom*/}
            </div>
        </div>
    )
}

export default Cart;
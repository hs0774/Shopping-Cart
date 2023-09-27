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
    orderData: Set<number>
    setOrderData: React.Dispatch<React.SetStateAction<Set<number>>>
}

const Cart: React.FC<Props> = ({data,setData,orderData,setOrderData}) => {
    const [cart,setCart] = React.useState<Item[]>(data);
    const [totalcost,setTotalCost] = React.useState(0);
    const [orderState,setOrderState] = React.useState(orderData);

    React.useEffect(() => {
        if(data && data.length===0){
            setTotalCost(0);
            return;
        }
        
        const newTotal = data.reduce((accumulator,item:Item) => {
            if(item.inCart){
                return accumulator + item.cost
            }
            return accumulator;
        },0)

        setTotalCost(newTotal);
    }, [data]);
    console.log(orderState);
    return (
        <div className="Cart">
            <div className="CartLeft">
                {cart.some(item => item.inCart && item.quantity>0)
                ? cart.map((item:Item) => {
                    if(item.inCart && item.quantity>0){
                        return (
                        <div key={item.id}>
                        <img src={item.image} height={'70px'} width={'70px'} alt={item.title} />
                        <p>{item.title}</p>
                        <p>{item.quantity} x ${item.price}.00</p>
                        <p>${item.cost}.00</p>
                        </div>
                        )
                    }
                    return null;
                }):<p>Cart is empty!</p>}
            </div>
            <div className="CartRight">
            {cart.some(item => item.inCart && item.quantity>0)
        ? <h1>Total : ${totalcost}.00</h1>
        :null}
                {/* item list names quantity x price  total at bottom*/}
            </div>
        </div>
    )
    
}

export default Cart;

//ok so now we have the ids of items in the cart, now we should display the item 
//matching the id to the display
//create a remove from cart button 
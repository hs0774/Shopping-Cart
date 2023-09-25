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
    const [totalcost,setTotalCost] = React.useState(0);

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

    return (
        <div className="Cart">
            <div className="CartLeft">
                {cart.some(item => item.inCart)
                ? cart.map((item:Item) => {
                    if(item.inCart===true){
                        return (
                        <div key={item.id}>
                        <img src={item.image} height={'70px'} width={'70px'} alt={item.title} />
                        <p>{item.title}</p>
                        <p>{item.quantity} x ${item.price}</p>
                        <p>${item.cost}</p>
                        </div>
                        )
                    }
                    return null;
                }):<p>Cart is empty!</p>}
            </div>
            <div className="CartRight">
            {cart.some(item => item.inCart)
        ? <h1>Total : $ {totalcost}</h1>
        :null}
                {/* item list names quantity x price  total at bottom*/}
            </div>
        </div>
    )
    
}

export default Cart;
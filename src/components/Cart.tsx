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

    // React.useEffect(() => {
    //     if(data && data.length===0){
    //         return <p>Cart is empty!</p>
    //     }
    //     console.log(data)
    // }, []);

    return (
        <div className="Cart">
            <div className="CartLeft">
                {cart.some(item => item.inCart)
                ? cart.map((item:Item) => {
                    if(item.inCart===true){
                        return (
                        <>
                        <img src={item.image} height={'70px'} width={'70px'} alt={item.title} />
                        <p>{item.title}</p>
                        <p>{item.quantity} x ${item.price}</p>
                        <p>${item.cost}</p>
                        </>
                        )
                    }
                    return null;
                }):<p>Cart is empty!</p>}
                {/* {cart ? 
                    <>
                        <img src={cart[0].image} height={'70px'} width={'70px'} alt={cart[0].title} />
                        <p>{cart[0].title}</p>
                        <p>{cart[0].quantity} x ${cart[0].price}</p>
                        <p>${cart[0].cost}</p>
                    </>
                 : 
                    <p>Cart is empty. Shop now!</p>
                } */}
            </div>
            <div className="CartRight">
                {/* item list names quantity x price  total at bottom*/}
            </div>
        </div>
    )
    
}

export default Cart;
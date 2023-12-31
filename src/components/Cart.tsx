import React from "react"; 
import '../css/Cart.css'
import { Link} from "react-router-dom";


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

    }, [cart]);

    function handleClick(id:number){
        setData(prevItems =>
            prevItems.map(item => {
                if(item.id === id){
                    return {
                        ...item,
                        inCart:false,
                        quantity:1,
                    }
                }
                return item;
            }));
        setCart(prevItems =>
                prevItems.map(item => {
                    if(item.id === id){
                        return {
                            ...item,
                            inCart:false,
                            quantity:1,
                        }
                    }
                    return item;
        }));
        setOrderData(prev => {
            const newState = new Set(prev);
            newState.delete(id);
            return newState;
        });
        setOrderState(prev => {
            const newState = new Set(prev);
            newState.delete(id);
            return newState;
        });
        

    }

  function cartDisplay(bool:boolean){
     return bool ? Array.from(orderState).map((id) => {
          const item = cart.find((item) => item.inCart && item.id === id);
          if (item) {
            return (
              <div className='Cart1' key={item.id}>
                 <div className="leftItem">
                  <div className="leftimg">
                      <img src={item.image} height={'50px'} width={'50px'} alt={item.title} />
                  </div>
                  <div className="leftItemText">
                  <p>{item.title.split(' ').slice(0, 5).join(' ')}</p>
                  {/* <p>{item.quantity} x ${item.price}.00</p> */}
                  <p>${item.cost}.00</p> 
                  </div>
                </div>
                <div className="xbutton">
                   <button className='Xbutton'type="button" onClick={() => handleClick(item.id)}>&times;</button>
                </div>
              </div>
            );
          }
          return null;
      })
        : (
        <>
        {Array.from(orderState).map((id) => {
          const item = cart.find((item) => item.inCart && item.id === id);
          if (item) {
            return (
              <div className='CartItem' key={item.id}>
                  <div className="leftofRight">
                      <div><p>{item.title.split(' ').slice(0, 5).join(' ')}</p></div>
                      {/* <p>{item.title.split(' ').slice(0, 5).join(' ')} */}
                      <div>
                      <p>{item.quantity} x ${item.price}.00</p>
                      </div>
                  </div>
                  <div className="rightofRight">
                      {/* <p>${item.cost}.00</p> */}
                  </div>
              </div>
            );
          }
          return null;
      })}
      <div className="rightofRight">
        <h1>Total - ${totalcost}.00</h1>
      </div>
      <div className="checkout">
        <button>Proceed to Checkout</button>
      </div>
      </>
      )
  }
    return (
        <div className="Cart">
            <div className="CartLeft">
                {cart.some(item => item.inCart && item.quantity>0)
                ? cartDisplay(true) :<h1 className="EmptyCart">Cart is empty!</h1>}
            </div>
            <div className="CartRight">
            {cart.some(item => item.inCart && item.quantity>0)
        ?cartDisplay(false):<div className="checkout2"><Link to='/Shop'><button>Click to Shop</button></Link></div>}
            </div>
        </div>
    )
    
}

export default Cart;
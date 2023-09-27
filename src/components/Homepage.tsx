import React from "react"; 
import '../css/Homepage.css'
import { Link } from "react-router-dom";



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

const Homepage: React.FC<Props> = ({data,setData,orderData,setOrderData}) => {
    const [items, setItems] = React.useState<Item[]>([]);
    const [orderState,setOrderState] = React.useState(orderData);

    React.useEffect(() => {
        if(data && data.length > 0){
            setItems(data)
        } else {
      fetch('https://fakestoreapi.com/products?limit=15')
        .then(res => res.json())
        .then((json) => {
           const createdItems =  json.map((item:Item) => ({
                image: item.image,
                id: item.id,
                price: Math.floor(item.price),
                title: item.title,
                inCart:false,
                quantity:1,
                cost:Math.floor(item.price),
                rating: {
                    rate:item.rating.rate
                }
            }));
            setItems(createdItems);
            setData(createdItems);
        });
        }
    }, [data]);
            // console.log(data)

    function handleChange(e:any, id:number){
       // console.log(e.target.value);
       
        const {name, value} = e.target;
             setItems(prevItems => 
                prevItems.map(item => {
                    if (id === item.id) {
                        return {
                            ...item,
                            [name]: parseInt(value,10),
                            cost: value * item.price,
                        }
                    }
                    return item;
                })
            );
            // setData(prevData =>
            //     prevData.map(item => {
            //       if (id === item.id) {
            //        // const quantity = parseInt(value, 10);
            //         return {
            //           ...item,
            //           [name]: parseInt(value,10),
            //           cost: value * item.price,
            //         };
            //       }
            //       return item;
            //     })
            //   );
            // setData(items);
            // console.log('data',data);
            console.log('items',items);
    }
    function handleSubmit(e:any,id:number){
        e.preventDefault();

        console.log(e.target[0].value);
        const {name, value} = e.target[0];
        console.log(value,name);

        parseInt(value,10) > 0 
        ? setOrderState(prev => new Set(prev).add(id))
        : setOrderState(prev => {
            const newState = new Set(prev);
            newState.delete(id);
            return newState;
        });

        parseInt(value,10) >0
        ? setOrderData(prev => new Set(prev).add(id))
        : setOrderData(prev => {
            const newState = new Set(prev);
            newState.delete(id);
            return newState;
        });

        // setItems(prevItems => 
        //     prevItems.map(item => {
        //         if (id === item.id) {
        //             return {
        //                 ...item,
        //                 [name]:parseInt(value,10),
        //                 cost:value*item.price,
        //                 inCart:item.quantity>0?true:false,
        //             }
        //         }
        //         return item;
        //     })  
        // );

        setData(prevData => 
            prevData.map(item => {
                if (id === item.id) {
                    return {
                        ...item,
                        [name]:parseInt(value,10),
                        cost:value*item.price,
                        inCart:item.quantity>0?true:false,
                    }
                }
                return item;
            })  
        );
        
        // console.log('data',data);  .slice(0,3)
        // console.log('items',items);
    }
    return (
        <>
        <Link to='/Shop'><button>Shop Now</button></Link>
        <div className="HomeItems">
            {items.slice(0,1).map((item, index) => (
                <div key={item.id}>
                    <img className="HomeItemImg" src={item.image}/>
                    <p>Title: {item.title}</p>
                    <p>Price: {item.price}.00</p>
                    <p>Rating: {item.rating.rate}</p>
                    <form onSubmit  ={(e) => handleSubmit(e,item.id)}>
                        <p>Quantity: 
                            <input value={item.quantity} name='quantity' min='0' step='1'
                            type="number" onChange={(e) => handleChange(e,item.id)}></input>
                        </p>
                        <button>Add to Cart</button>
                    </form>  
                    <p>$ {item.cost ? item.cost : item.price}.00</p>
                </div>
            ))}
        </div>
        </>    
    )
}

export default Homepage;

//todo

//delete button for items in cart page 
//quantity button, price and total 
//right side with total of all items, maybe a title on left side,
//right side has quantity x cost 
//grand total
//proceed to checkout which just takes user back to homepage and sets default state?


//remove the onchange but save it for cart page,
// add to cart is what matters, 

//so what we have to do is remove on change but get the input value when we press
//submit so the value is only changed when we press submit by doing this,
//all changes that change because of changing value only change when we press add
//to cart 
//after that we have to have the set that holds ids display the data that matches 
//the ids. and then finally we have a delete button which should, remove id from set,
//set quantity back 1 one default, by removing id the display will get updated we either
// have to set that item back to false or we have to use set in the total calc 
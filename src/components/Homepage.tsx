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

    function handleChange(e:any, id:number){
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
    }

    function handleSubmit(e:any,id:number){
        e.preventDefault();
        const {name, value} = e.target[0];

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

        setItems(prevItems => 
            prevItems.map(item => {
                if (id === item.id) {
                    return {
                        ...item,
                        [name]:parseInt(value,10),
                        cost:value*item.price,
                        inCart: parseInt(value,10)>0,
                    }
                }
                return item;
            })  
        );

        setData(prevData => 
            prevData.map(item => {
                if (id === item.id) {
                    return {
                        ...item,
                        [name]:parseInt(value,10),
                        cost:value*item.price,
                        inCart:parseInt(value,10)>0,  
                    }
                }
                return item;
            })  
        );
    }

    return (
        <>
        <Link to='/Shop'><button>Shop Now</button></Link>
        <div className="HomeItems">
            {items.slice(0,3).map((item, index) => (
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
                    {/* <p>$ {item.cost ? item.cost : item.price}.00</p> */}
                </div>
            ))}
        </div>
        </>    
    )
}

export default Homepage;
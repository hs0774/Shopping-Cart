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
}

const Homepage: React.FC<Props> = ({data,setData}) => {
    const [items, setItems] = React.useState<Item[]>([
    ]);

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
                cost:0,
                rating: {
                    rate:item.rating.rate
                }
            }));
            setItems(createdItems);
            setData(items);
        });
        }
    }, []);
            console.log(items)

    function handleChange(e:any, id:number){
        console.log(e.target.value);
        const {name, value} = e.target;
            setItems(prevItems => 
                prevItems.map(item => {
                    if (id === item.id) {
                        let costt = value * item.price;
                        return {
                            ...item,
                            [name]: value,
                            cost: costt,
                        }
                    }
                    return item;
                })
            );
            setData(items);
    }
    function handleSubmit(e:any,id:number){
        e.preventDefault();
        setItems(prevItems => 
            prevItems.map(item => {
                if (id === item.id) {
                    return {
                        ...item,
                        inCart:true
                    }
                }
                return item;
            })
        );
        setData(items);
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
                            <input value={item.quantity} name='quantity' min='1' step='1'
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
//set items in cart page,
//delete button for items in cart page 
//quantity button, price and total 
//right side with total of all items, maybe a title on left side,
//right side has quantity x cost 
//grand total
//proceed to checkout which just takes user back to homepage and sets default state?
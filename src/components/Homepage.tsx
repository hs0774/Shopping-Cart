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

const Homepage: React.FC = () => {
       const [items, setItems] = React.useState<Item[]>([]);

    React.useEffect(() => {
      fetch('https://fakestoreapi.com/products?limit=15')
        .then(res => res.json())
        .then((json) => {
           const createdItems =  json.map((item:Item) => ({
                image: item.image,
                id: item.id,
                price: item.price,
                title: item.title,
                inCart:false,
                quantity:1,
                cost:0,
                rating: {
                    rate:item.rating.rate
                }
            }));
            setItems(createdItems);
        });
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
        console.log(items)
    }
    return (
        <>
        <Link to='/Shop'><button>Shop Now</button></Link>
        <div className="HomeItems">
            {items.slice(0,3).map((item, index) => (
                <div key={item.id}>
                    <img className="HomeItemImg" src={item.image}/>
                    <p>Title: {item.title}</p>
                    <p>Price: {item.price}</p>
                    <p>Rating: {item.rating.rate}</p>
                    <form onSubmit  ={(e) => handleSubmit(e,item.id)}>
                        <p>Quantity: 
                            <input value={item.quantity} name='quantity' min='1'
                            type="number" onChange={(e) => handleChange(e,item.id)}></input>
                        </p>
                        <button>Add to Cart</button>
                    </form>  
                    <p>$ {item.cost ? item.cost:item.price}</p>
                </div>
            ))}
        </div>
        </>    
    )
}

export default Homepage;

//todo
//make the add to cart button a form with quantity,
//maybe make a added to cart(boolean) and quantity(number) property for items
//onchange function to reflect quantity change, maybe 
//submit button that takes quantity change and adds it to cart 
import React from "react"; 
import '../css/Homepage.css'
import { Link } from "react-router-dom";


interface Item {
    image: string,
    id: number,
    price: number,
    title: string,
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
                rating: {
                    rate:item.rating.rate
                }
            }));
            setItems(createdItems);
            console.log(items)
        });
    }, []);
            
    return (
        <>
        <Link to='/Shop'><button>Shop Now</button></Link>
        <div className="HomeItems">
            {items.slice(0, 3).map((item, index) => (
                <div key={item.id}>
                    <img className="HomeItemImg" src={item.image}/>
                    <p>Title: {item.title}</p>
                    <p>Price: {item.price}</p>
                    <p>Rating: {item.rating.rate}</p>
                    <p>Quantity: <input type="number"></input></p>
                    <button>Add to Cart</button>
                </div>
            ))}
        </div>
        </>
        
    )
}

export default Homepage;

//fetch an img,id,title, price, maybe rating:rate

// .then((json) => ({
//     img: json[i].image,
//     id: json[i].id,
//     price: json[i].price,
//     title: json[i].title,
//     rating: json[i].rating.rate,
//   }
//   ))
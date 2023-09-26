import React from "react"; 
import About from './About'
import Cart from './Cart'
import Homepage from "./Homepage";
import Shop from './Shop'
import { Link, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import '../css/Navbar.css'

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
const Navbar: React.FC<Props> = ({data,setData}) => {

    const totalQuantity = data.reduce((accumulator,item) => {
        if(item.inCart){
            return accumulator + item.quantity
        }
        return accumulator;
    },0);

    // React.useEffect(() => {
    //     if(data && data.length===0){
    //         setAllItems(0);
    //         return;
    //     }
        
    //     const newTotal = data.reduce((accumulator,item:Item) => {
    //         if(item.inCart){
    //             return accumulator + item.quantity
    //         }
    //         return accumulator;
    //     },0)

    //     setAllItems(newTotal);
    // }, [data]);

    return (
        <>
        <div className="Nav">
            <div className="NavLeft">
                <Link to='/'><h1>ShopName</h1></Link>
            </div>
            <ul className="NavRight">
                <li>
                    <Link to='/'><h3>Home</h3></Link>
                </li>
                <li>
                    <Link to='/Shop'><h3>Shop</h3></Link>
                </li>
                <li>
                    <Link to='/About'><h3>About</h3></Link>
                </li>
                <li>
                    <Link to='/Cart'><h3>{totalQuantity === 0 ? null : totalQuantity} Cart</h3></Link>
                </li>
           </ul>
        </div>   
        <Outlet/>
        </>
    )
}

export default Navbar;
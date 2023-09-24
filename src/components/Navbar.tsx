import React from "react"; 
import About from './About'
import Cart from './Cart'
import Homepage from "./Homepage";
import Shop from './Shop'
import { Link, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import '../css/Navbar.css'

const Navbar: React.FC = () => {
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
                    <Link to='/Cart'><h3>Cart</h3></Link>
                </li>
           </ul>
        </div>   
        <Outlet/>
        </>
    )
}

export default Navbar;
import React from "react"; 
import '../css/Navbar.css'

const Navbar: React.FC = () => {
    return (
        <div className="Nav">
            <div className="NavLeft">
                <h1>ShopName</h1>
            </div>
            <ul className="NavRight">
                <li><h3>Home</h3></li>
                <li><h3>Shop</h3></li>
                <li><h3>About</h3></li>
                <li><h3>Cart</h3></li>
           </ul>
        </div>   
    )
}

export default Navbar;
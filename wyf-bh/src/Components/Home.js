import React from "react";
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <h1>What's Your Flavor?</h1>
            <h2>build a t-shirt for any flavor that you identify as!</h2>
            <img className="t-shirt" src="https://cdn2.bigcommerce.com/server2800/677b8/products/26200/images/114756/11402f__96790.1490634559.1100.1100.jpg?c=2" alt="corn on the cob t-shirt" />
            <h3>click here to order your t-shirt! 👇</h3>
            <Link className="flexin" to={"/order"}>
                <div className="order-here">Get Orderin'</div>
            </Link>
        </div>
    )
}

export default Home;
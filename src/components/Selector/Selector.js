import React from 'react'
import {Link} from 'react-router-dom'
function Selector() {
 return (
    <div className="container">      
            <div >
                <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique hm-gradient">           
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-3" aria-controls="navbarSupportedContent-3" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> 
                </nav>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                    <Link className="nav-link bg-dark active m-3" data-toggle="pill" to="/flight">Select your flight</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link bg-dark active m-3" data-toggle="pill" to="/seat">Enter Your Details</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link bg-dark active m-3" data-toggle="pill" to="/pay">Payment Page</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link bg-dark active m-3" data-toggle="pill" to="/view">View MY Ticket</Link>
                    </li> 
                </ul>
            </div>
    </div>
 )
}
export default Selector;
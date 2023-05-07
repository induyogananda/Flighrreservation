import React from 'react'
import './homepage.css'
function Homepage({history}){
    const handleLogoClick = e => {
        e.preventDefault()
        history.push('/')
    } 
    return(
        <div className='container maint-cnt m-2 col-sm-1 col-md-2 col-lg-3'>  
           <div className="header-nav text-primary ">
                <h1 class="head"> <span>Our Travels Happy Travels <i  class="fa fa-fighter-jet m-3" onChange={e => { handleLogoClick(e) }}aria-hidden="true"></i></span></h1>              
           </div>   
          
        </div>
    )
}
export default Homepage





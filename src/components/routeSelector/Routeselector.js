import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './Routeselector.css'
import axios from 'axios'
function Routeselector() {
 const [dataInp, setData] = useState("")
 const [startCity, setStartCity] = useState('')
 const [destination, setDestination] = useState('')
 const [flight,setFlight]= useState('')
 const [trip, setTrip] =useState('')
let history=useHistory( )
const bookFlight = e => {
    localStorage.setItem("start",startCity)
    localStorage.setItem("destination",destination)
    history.push('/seat')
}
 //get flight
 useEffect(() => {
    axios.get('http://localhost:8080/flight/getflight')
        .then(res => {
            setFlight(res.data.message)
            console.log(res.data.message)
        })
        .catch(err => {
            console.log("err in reading cart", err)
            alert("Something went wrong in getting flight")
        })
}, [])
 const handleType=e=>{
     e.preventDefault()
     setTrip({ trip : e.target.value })
     localStorage.setItem("trip", e.target.value)
 }
 return (
 <div className="rdc">
    <form className="form-inline">
        <h2 className="text-light">Book a Flight</h2>
        <div onChange={e => { handleType(e) }}>
            <input type="radio" value="Oneway" name="gender" className="m-3"/> <span className="text-light">Oneway</span>
            <input type="radio" value="Roundway" name="gender" className="m-3"/><span className="text-light">Round Trip</span> 
            <input type="radio" value="Multicity" name="gender" className="m-3"/> <span className="text-light">Multi City</span>
        </div>        
        <select name="ad_account_selected" data-style="btn-new" class="selectpicker m-5" onChange={e =>setStartCity( e.target.value )}>
            <option>FROM</option>
            <option>Chennai</option>
            <option>Bangalore</option>.
        </select>
        <select name="ad_account_selected" data-style="btn-new" class="selectpicker " onChange={e =>setDestination(e.target.value )}>
            <option>TO</option>
            <option>Hyderabad</option>
            <option>Coimbatore</option>
            <option>Vishakapatnam</option>
            <option>Bangalore</option>
            <option>Chennai</option>
        </select>        
    </form>
    <div>
        {
            flight && flight.filter((ele)=>{
                if(ele.startCity===startCity &  ele.destination===destination){
                    return ele;                   
                }                             
            })
            .map((ele)=>{
                return(
                    <div className="table mt-4 " >
                        <table className="table table-border">
                            <tbody className="text-light">
                                <tr>
                                    <td >{ele.company}</td>
                                    <td>{ele.starts}</td>
                                    <td>{ele.duration}</td>
                                    <td>{ele.type}</td>
                                    <td >{ele.destination}</td>
                                    <td >{ele.startCity}</td>
                                    <td> <button className=" btn btn-primary  m-3" onClick={e => {bookFlight(e)}}> BOOK</button>  </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })
        }       
    </div>
 </div>
 )
}
export default Routeselector
import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
function ViewTicket() {
    let [email,setEmail] =useState('')
    let[pnrnumber,setPnrnumber] =useState('')
    let [ticket,setTicket] =useState('')
    useEffect(() => {
        axios.get('http://localhost:8080/ticket/getticket')
            .then(res => {
                setTicket(res.data.message)
                console.log(res.data.message)
            })
            .catch(err => {
                console.log("err in reading cart", err)
                alert("Something went wrong in getting ticket")
            })
    }, [])
    return (
        <div>          
            <form>
                <h3 className="m-3">Enter your email & PNR number below to view Your Ticket</h3>
                <label htmlFor="em">Email:</label>
                <input id="em"  type="email" onChange={e=>setEmail(e.target.value)} />
                <label htmlFor="pn">PNR Number:</label>
                <input id="pn" type="id" onChange={e=>setPnrnumber(e.target.value)}/>
            </form>
            <div>
            {
            ticket && ticket.filter((ele)=>{
                if(ele.Email===email & ele._id===pnrnumber){
                    return ele;                   
                }                             
            })
            .map((ele)=>{  
                return(
                    <div className="table mt-4 " >
                        <table className="table table-border">
                            <thead>
                                <tr>
                                    <th>PNR Number</th>
                                    <th>passengername</th>
                                    <th>Departure</th>
                                    <th>ReturnDate</th>
                                    <th>Gender</th>
                                    <th>EmailId</th>
                                    <th>Adhaarnumber</th>
                                    <th>Food</th>
                                    <th>Tax</th>
                                    <th>Class</th>
                                    <th>Baggage</th>
                                </tr>
                            </thead>
                            <tbody className="text-light">
                                <tr>
                                    <td>{ele._id}</td>
                                    <td >{ele.passengername}</td>
                                    <td >{ele.departure} </td>
                                    <td>{ele.returndate}</td>
                                    <td>{ele.gender}</td>
                                    <td>{ele.Email}</td> 
                                    <td>{ele.Adharnumber}</td>     
                                    <td>{ele.food}</td> 
                                    <td>{ele.Tax}</td> 
                                    <td>{ele.class}</td> 
                                    <td>{ele.bag}</td>      
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

export default ViewTicket

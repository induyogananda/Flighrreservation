import React from 'react'
import { useHistory } from 'react-router-dom'

import {useState,useEffect} from 'react'
import axios from 'axios'

function BookingDetails() {
    let [ticket,setTicket] =useState('')
    let history=useHistory()
    const goToPay= e =>{
      history.push('/pay')
    }
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
    const getSumTotal = () => {
        let count = 0       
        let tax=+(JSON.parse(localStorage.getItem("tax")))
        let foodArr=localStorage.getItem("foodcost")
        let food=+(JSON.parse(foodArr))
        let bagArr=localStorage.getItem("bagcost")
        let baggage=+(JSON.parse(bagArr))
        let ticketArr=localStorage.getItem("ticketcost")
        let ticket =+(JSON.parse(ticketArr))
        let seatArray = localStorage.getItem('reservedSeats') 
        if (seatArray) {
        let seaArr = JSON.parse(seatArray)
        for (let i = 0; i < seaArr.length; i++) {
        count++
        }    
        return (
        <div>
            <hr className="hr3" />
            <p>{ticket*count}</p>
            <p>+{tax}</p>
            <p>+{food}</p>
            <p>+{baggage}</p>
            <p>{(ticket*count)+ tax+ food +baggage}</p>         
        </div>
        )
        }
    }   
 
    return (
        <div>
            <div className="columnTwo">
            <p>BOOKING DETAILS</p>
            <div>          
            {
                ticket && ticket.filter((n)=>{
                    if(n.passengername===localStorage.getItem("nameData")){
                        return n;
                    }
                }).map((n)=>{
                    <p>{n._id}</p>
                })
             }
            </div>
            <div className="row">
                <div className="col-6 pt">      
                    <hr className="hr3" />                   
                    <p className="hdng">StartDate</p>     
                    <p className="hdng">ReturnDate</p>      
                    <p className="hdng">From</p>
                    <p className="hdng">To</p>
                    <p className="hdng">Food</p>
                    <p className="hdng">Baggage</p>
                    <p className="hdng">Type</p>
                    <p className="hdng">Discount Category</p>
                    <hr className="hr3" />
                    <p className="hdng">Passengers</p>
                    {localStorage.getItem("nameData")}    
                    <p>Gender</p>     
                    <hr className="hr3" />
                    <p className="hdng">Ticket price</p>
                    <p className="hdng">Tax-{localStorage.getItem("taxcategory")}</p>
                    <p className="hdng">Food-{localStorage.getItem("food")}</p>
                    <p className="hdng">Baggage-{localStorage.getItem("bag")}</p>
                    <p className="hdng">Toal Sum</p>
                </div>
                <div className="col-6">
                    <hr className="hr3" />   
                    
                    <p className="usrName">{localStorage.getItem("date")}</p>
                    <p className="usrName">--{localStorage.getItem("returndate")}--</p>
                    <p className="usrName">{localStorage.getItem("start")}</p>
                    <p className="usrName">{localStorage.getItem("destination")}</p>
                    <p className="usrName">{localStorage.getItem("food")}</p>
                    <p className="usrname">{localStorage.getItem("bag")}</p>
                    <p className="usrName">{localStorage.getItem("trip")}</p>
                    <p className="usrName">{localStorage.getItem("taxcategory")}</p>
                    <hr className="hr3"/>
                    <p className="hdng">Seat No</p>
                    { localStorage.getItem('reservedSeats')}
                    <p className="usrName">{localStorage.getItem('gender')}</p>
                    <p>{getSumTotal()}</p>
                </div>
            </div>
            <button className="btn btn-dark text-light" onClick={e => goToPay(e)}>Continue</button>
            </div>
        </div>
    )
}

export default BookingDetails

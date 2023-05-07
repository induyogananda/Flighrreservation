import React from "react";
import './PaymentTab.css'
import jsPDF from 'jspdf'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
function PaymentTab() {
    let [formState,setFormState]=useState({
        cardnumber:"",     
        cvc:''
    })
    const [errors,setErrors] = useState('');
    let history=useHistory('')
    const handleBookAgainIcon = e => {
        e.preventDefault()
        history.push('/flight')
        }    
        let [ticket,setTicket] =useState('')
        let [pnr,setPnr] =useState('')
        let [email,setEmail]=useState('')
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
        const PNR=e=>{
            let adhar=localStorage.getItem("adhar")
            e.preventDefault()
            {
                ticket && ticket.filter((ele)=>{
                    if(ele.Adharnumber===adhar){
                      setPnr(ele._id)
                      setEmail(ele.Email)
                                          
                    }                             
                })
            }
            alert("payment success")         
        }
    const PdfGenerate=(e)=>{
        var doc=new jsPDF('landscape','px','a4','false');
        doc.text(`PNR:${pnr}`,10,10)
        doc.text(`PassengerName:${localStorage.getItem("nameData")}`,10,30)
        doc.text(`Gender:${localStorage.getItem("gender")}`,10,45)
        doc.text(`Class:${localStorage.getItem("ticket")}`,10,60)
        doc.text(`SeatNo: ${localStorage.getItem("reservedSeats")}`,10,90)
        doc.text(`StartDate:${localStorage.getItem("date")}`,10,120)
        doc.text(`ReturnDate:${localStorage.getItem("returndate")}`,10,150)
        doc.text(`Food:${localStorage.getItem("food")}`,10,180)
        doc.text(`Category:${localStorage.getItem("taxcategory")}`,10,210)
        doc.text(`Origin:${localStorage.getItem("start")}`,10,240)
        doc.text(`Destination:${localStorage.getItem("destination")}`,10,270)
        doc.text(`Email:${email}`,10,300)
        doc.save("ticket.pdf")
        localStorage.clear()
    }
    useEffect(()=>{           
        if(formState.cardnumber.length<12 && formState.cardnumber.length>12){
            setErrors({...errors,cardnumberLengthErr:'Min & Max length should be 12',cardnumberRequiredErr:''})
        }   
        if(formState.cvc.length<3 && formState.cvc.length>3){
            setErrors({...errors,cvcLengthErr:'Min & max length should be 3',cvcRequiredErr:''})
        }
    },[formState.cardnumber,formState.cvc])
    return (
        <div className="paym">          
            <div className="row">          
                <div key="Payment">
                    <div className="App-payment cl-1">
                        <h6>Payment accepted only with card</h6>
                        <p className="pPayment">Enter Credit card details</p>      
                        <form className="credit-form">
                            <div className="form-group">
                                <input
                                type="tel"
                                name="cardnumber"
                                className="frm-ctrl mb-2"
                                placeholder="Card Number"
                                pattern="[\d| ]{16,22}"
                                required
                                value={formState.cardnumber}
                                onChange={e=>setFormState({...formState,cardnumber:e.target.value})}                             
                                />
                               {errors.cardnumberRequiredErr && <p className="text-danger">{errors.cardnumberRequiredErr}</p>}
                               {errors.cardnumberLengthErr && <p className="text-danger">{errors.cardnumberLengthErr}</p>}
                            </div>
                            <div className="form-group">
                                <input
                                type="text"
                                name="name"
                                className="frm-ctrl mb-3"
                                placeholder="Enter Your Name"
                                required
                                value={formState.associateid}                                         
                                />
                            </div>
                            <div className="form-group">
                                <input
                                type="email"
                                name="email"
                                className="frm-ctrl mb-3"
                                placeholder="Email Id"
                                required                             
                                />
                            </div>
                            <div className="form-group">
                                <input
                                type="number"
                                name="name"
                                className="frm-ctrl mb-3"
                                placeholder="Mobile number"
                                required                               
                                />
                            </div>
                            <div className="form-group">
                                <input
                                type="tel"
                                name="expiry"
                                className="frm-ctrl mb-3"
                                placeholder="Valid Thru"
                                pattern="\d\d/\d\d"
                                required                                          
                                />                              
                            </div>
                            <div className="form-group">
                                <input
                                type="tel"
                                name="cvc"
                                className="frm-ctrl cvc mb-3"
                                placeholder="CVC"
                                pattern="\d{3,4}"
                                required
                                onChange={e=>setFormState({...formState,cvc:e.target.value})}                               
                                />
                                {errors.cvcRequiredErr && <p className="text-danger">{errors.cvcRequiredErr}</p>}
                                {errors.cvcLengthErr && <p className="text-danger">{errors.cvcLengthErr}</p>}                               
                            </div>
                            <input type="hidden" name="issuer"  />
                            <div className="mb-3">
                                <button onClick={e => PNR(e)} className="btn btn-dark text-light btCustom">PAY</button>
                            </div>
                        </form>                        
                        <div> 
                            <button  className="btn btn-dark m-4" onClick={e => handleBookAgainIcon(e)}>Book Again</button>
                            <button className="btn btn-dark" onClick={e=>PdfGenerate(e)} >Download PDF</button>
                        </div>                       
                    </div>
                </div>               
            </div>
        </div>
    );
}
export default PaymentTab

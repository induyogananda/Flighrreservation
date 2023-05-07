import React from 'react'
import axios from 'axios'
import { useState ,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import './PassengerDetails.css'
function PassengerDetails() {
    let {register,handleSubmit,formState:{errors}}=useForm();
    let history=useHistory()
    const [counter,setCounter]=useState(1456)
    const [file, setFile] = useState(null)
    const [name, setName] = useState('') 
    const [gender, setGender] = useState([])
    const [reservedSeat, setReservedSeat] = useState(["2A","4A","5C"])
    const [seatNumber, setSeatnumber] = useState([])
    const [food,setFood] = useState([])
    const [foodCost,setFoodCost] = useState('')
    const [bag,setBag]=useState([])
    const [ticketCost,setTicketCost]=useState('')
    const [bagCost,setBagCost]=useState('')
    const [ticket,setTicket] =useState('')
    const [tax,setTax]=useState('')
    const [taxCategory,setTaxCategory]=useState('')
    const goBackToRoutes = e => { 
        e.preventDefault()
        history.push('/flight')
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
    const getSeatNumber = (e) => {
        renderPassengerData(seatNumber)
        let newSeat = e.target.value
        if (reservedSeat.includes(newSeat)) {
        e.disabled = true
        if (seatNumber.includes(newSeat)) {
        setSeatnumber(seatNumber.filter(seat => seat !== newSeat))
        }
        } else {
        setSeatnumber([...seatNumber, newSeat])
        setReservedSeat([...reservedSeat, newSeat])
        console.log(seatNumber)
        }
    }
    const handleGender = (e, seatNo) => {
        const { value } = e.target
        setGender(gender.concat(value))   
        localStorage.setItem("gender",e.target.value)
    }
    const handleFood=(e, seatNo) =>{
        e.preventDefault()
        setFood({ food: e.target.value })
        localStorage.setItem("food", e.target.value)
          
        if(e.target.value=="Veg"){
            setFoodCost(200)
        
        }
        if(e.target.value=="NonVeg"){
            setFoodCost(300)
         
        }
    }
    const handleTicket=(e, seatNo) =>{
        e.preventDefault()
        setTicket({ ticket: e.target.value })
        localStorage.setItem("ticket", e.target.value)          
        if(e.target.value=="Economy"){
            setTicketCost(800)       
        }
        if(e.target.value=="Business Class"){
            setTicketCost(1500)        
        }
    }
    const handleTax=(e, seatNo) =>{
        e.preventDefault()
        setTaxCategory({ taxcategory: e.target.value })
        localStorage.setItem("taxcategory", e.target.value)         
        if(e.target.value=="ArmedForces"){
            setTax(0)        
        }
        if(e.target.value=="Doctors&Nurses"){
            setTax(50)         
        }
        if(e.target.value=="Students"){
            setTax(150)        
        }
        if(e.target.value=="Others"){
            setTax(200)         
        }
    }
    const handleBag=(e,seatNo)=>{       
        e.preventDefault()
        setBag({ bag: e.target.value })
        localStorage.setItem("bag", e.target.value)          
        if(e.target.value=="0-5kg"){
            setBagCost(50)        
        }
        if(e.target.value=="5-10kg"){
            setBagCost(80)         
        }      
        if(e.target.value=="+10kg"){
            setBagCost(120)         
        }  
    }
    const handlePassengerName = (e, seatNo) => {
        e.preventDefault()
        let value = e.target.value      
        if (!value) {
        return (setName("name is required"))
        } else {
        setName(name.concat(value))
        }
    }       
   
    const onFormSubmit=(ticketObj)=>{
        console.log("ticketObj",ticketObj)
        //create FormData obj
        let formData = new FormData();
        // //add file(s) to formdata obj
        formData.append('photo', file, file.name)
        //add ticketObj to formData object
        formData.append("ticketObj", JSON.stringify(ticketObj))
        //post req
        axios.post("http://localhost:8080/ticket/createticket", formData)
            .then(res => {
                let resObj = res.data;
                alert(resObj.message)
                console.log("resObj",resObj)
                localStorage.setItem("reservedSeats",JSON.stringify(seatNumber))
                localStorage.setItem("nameData", JSON.stringify(name))
                localStorage.setItem("bagcost",JSON.stringify(bagCost))
                localStorage.setItem("foodcost",JSON.stringify(foodCost))
                localStorage.setItem("ticketcost",JSON.stringify(ticketCost))
                localStorage.setItem("tax",JSON.stringify(tax))
                history.push('/booking')
            })
            .catch(err => {
                console.log(err);
                alert("something went wrong")
            })          
    }
    const onFileSelect = (e) => {
        setFile(e.target.files[0])
    }
    const handleDate = e => {
    e.preventDefault()
    localStorage.setItem("date", e.target.value)
        }
    const handleAdhar=(e)=>{
        localStorage.setItem("adhar",e.target.value)
    }
    const handleReturnDate=e=>{
        e.preventDefault()
        localStorage.setItem("returndate",e.target.value)
    }
    const renderPassengerData = (seatArray) => {
        return seatArray.map((seat, idx) => {
            return (               
                <form className="w-50 mx-auto" key={idx}>                    
                    <p class="text-capitalize text-dark text-center m-2">Seat No:{seat}</p>
                    <div className="m-2">
                        <label htmlFor="un" className="text-dark">PassengerName</label>
                        <input type="text" id="un" {...register('passengername',{required:true,minLength:4})} onBlur={e => handlePassengerName(e, seat)} className="form-control "/>
                        {errors.passengername?.type==='required'&& <p className="text-danger">Passengername is required</p>}
                        {errors.passengername?.type==='minLength'&& <p className="text-danger">Min length should be 4 characters</p>}
                    </div>
                        {/*gender */}
                    <div class="form-check m-2">
                        <input type="radio" id="male" {...register("gender")}  onClick={e => handleGender(e, seat)} value="male"  className="form-check-input "></input>
                        <label for="male" className="form-check-label text-dark"> Male</label>
                    </div>
                    <div class="form-check m-2">
                        <input type="radio" id="female" class="form-check-input " onClick={e => handleGender(e, seat)} value="female" {...register("gender")}></input>
                        <label for="female" className="form-check-label text-dark">Female</label>
                    </div>                    
                </form>                
            )
        })
    }
    return(
        <div className="main">
            <h3 className="text-dark text-center">Passenger Details</h3>
            <span><button className="btn btn-dark m-2 ms-auto" onClick={(e) => goBackToRoutes(e)}>GO BACK</button></span>
                <div className="row">
                <div className="column1 m-3">
                    <div className="plane">
                        <form onChange={e => getSeatNumber(e)} >
                            <ol className="cabin fuselage">
                            <li className="row row--1">
                                <ol className="seats" type="A">
                                    <li className="seat">
                                        <input type="checkbox" value="1A" id="1A" />
                                        <label htmlFor="1A" className="p-2">1A</label>
                                    </li>
                                    <li className="seat">
                                            <input type="checkbox" id="1B" value="1B" />
                                            <label htmlFor="1B" className="p-2">1B</label>
                                    </li>
                                    <li className="seat">
                                            <input type="checkbox" value="1C" id="1C" />
                                            <label htmlFor="1C" className="p-2">1C</label>
                                    </li>
                                    </ol>
                                </li>
                                <li className="row row--2">
                                    <ol className="seats" type="A">
                                        <li className="seat">
                                            <input type="checkbox" disabled value="2A" id="2A" />
                                            <label htmlFor="2A" className="p-2">2A</label>
                                        </li>
                                        <li className="seat">
                                            <input type="checkbox" value="2B" id="2B" />
                                            <label htmlFor="2B" className="p-2">2B</label>
                                        </li>
                                        <li className="seat">
                                            <input type="checkbox" value="2C" id="2C" />
                                            <label htmlFor="2C" className="p-2">2C</label>
                                        </li>

                                    </ol>
                                </li>
                                <li className="row row--3">
                                    <ol className="seats" type="A">
                                        <li className="seat">
                                            <input type="checkbox" value="3A" id="3A" />
                                            <label htmlFor="3A" className="p-2">3A</label>
                                        </li>
                                        <li className="seat">
                                            <input type="checkbox" disabled value="3B" id="3B" />
                                            <label htmlFor="3B" className="p-2" >3B</label>
                                        </li>
                                        <li className="seat">
                                            <input type="checkbox" value="3C" id="3C" />
                                            <label htmlFor="3C" className="p-2">3C</label>
                                        </li>
                                    </ol>
                                </li>
                                <li className="row row--4">
                                    <ol className="seats" type="A">
                                        <li className="seat">
                                            <input type="checkbox" disabled value="4A" id="4A" />
                                            <label htmlFor="4A" className="p-2">4A</label>
                                        </li>
                                        <li className="seat">
                                            <input type="checkbox" value="4B" id="4B" />
                                            <label htmlFor="4B" className="p-2">4B</label>
                                        </li>
                                        <li className="seat">
                                            <input type="checkbox" value="4C" id="4C" />
                                            <label htmlFor="4C"className="p-2">4C</label>
                                        </li>
                                    </ol>
                                </li>
                                <li className="row row--5">
                                    <ol className="seats" type="A">
                                        <li className="seat">
                                            <input type="checkbox" value="5A" id="5A" />
                                            <label htmlFor="5A" className="p-2" >5A</label>
                                        </li>
                                        <li className="seat">
                                            <input type="checkbox" value="5B" id="5B" />
                                            <label htmlFor="5B" className="p-2">5B</label>
                                        </li>
                                        <li className="seat">
                                            <input type="checkbox" disabled value="5C" id="5C" />
                                            <label htmlFor="5C" className="p-2">5C</label>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </form>
                       
                    </div>
                </div>
                <div className="column2">                    
                    <div className="seatInfo">
                        <form className="form-group"  onSubmit={handleSubmit(onFormSubmit)} >                        
                            {renderPassengerData(seatNumber)}
                            <div className="m-2">
                                <span className="text-dark">Departure Date:</span>
                                <input   type="date"  {...register('departure')}  className="form-control" onChange={e => { handleDate(e) }}/>
                            </div>
                            <div className="m-2">
                                <span className="text-dark">Return Date:</span>
                                <input   type="date" {...register('returndate')}  className="form-control" onChange={e => { handleReturnDate(e) }}/>
                            </div>
                            <div className="m-2">
                                <span className="text-dark">Email:</span>
                                <input className="form-control" {...register("Email")} type="email"/>
                            </div>                                        
                            {/*Id proof */}
                            <div className="m-2">
                                <span className="text-dark">AadharId:</span>
                                <input type="text"{...register('Adharnumber',{required:true,minLength:4})} onChange={e => handleAdhar(e)} className="form-control "/>
                                {errors.Adharnumber?.type==='required'&& <p className="text-danger">AdharId is required</p>}
                                {errors.Adharnumber?.type==='minLength'&& <p className="text-danger">Min length should be 12 characters</p>}
                            </div>
                            <div className="m-2">
                                <span className="text-dark">Add Adharproof in jpeg format:</span>
                                <input type="file" name="photo" className="form-control " onChange={(e) => { onFileSelect(e) }} />
                            </div>
                            {/*Discount category*/}
                            <div  className="m-2">
                                <span className="text-dark">Food:</span>
                                    <select data-style="btn-new" className="form-control" {...register("food")} onChange={e => { handleFood(e) }}>
                                        <option>choose your choice</option>
                                        <option>Veg</option>
                                        <option>NonVeg</option>               
                                    </select>                                  
                                    <span>Food:- veg:200/- nonveg:300/-</span> 
                            </div>
                            <div  className="m-2">
                                <span className="text-dark">Profession:</span>
                                <select name="ad_account_selected" data-style="btn-new" className="form-control " {...register("Tax")} onChange={e => { handleTax(e ) }}>
                                    <option>Select your profession</option>
                                    <option>ArmedForces</option>
                                    <option>Doctors&Nurses</option>     
                                    <option>Students</option>
                                    <option>Others</option>             
                                </select>
                                <span>ArmedForces:Tax-0/-  Doctors&Nurses:Tax-50/-  Students:Tax-150/-  Others:Tax-200</span>
                            </div>
                            <div className="m-2">
                                <span className="text-dark">Ticket Class:</span>
                                <select name="ad_account_selected" data-style="btn-new" className="form-control "{...register('class')} onChange={e => { handleTicket(e ) }}>
                                    <option>choose your class</option>
                                    <option>Economy</option>
                                    <option>Business Class</option>               
                                </select>
                                <span>Economy:800/- BusinessClass:1500/-</span>
                            </div>
                            <div  className="m-2">
                                <span className="text-dark">Baggage:</span>
                                <select name="ad_account_selected" data-style="btn-new" placeholder="Add Your Baggage" className="form-control " {...register("bag")} onChange={e => { handleBag(e ) }}>
                                    <option>Add your luggauge</option>
                                    <option>0-5kg</option>
                                    <option>5-10kg</option>    
                                    <option>+10kg</option>              
                                </select>
                                <span>0-5kg:50/- 5-10kg:80/- +10kg:120</span>
                            </div>                        
                            <hr></hr>
                            <button type="submit" className="btn btn-dark m-3 text-light">Submit</button>
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default PassengerDetails

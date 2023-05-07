import React from 'react'
import ViewTicket from './ViewTicket/ViewTicket';
import Routeselector from './routeSelector/Routeselector';
import PassengerDetails from './PassengerDetails/PassengerDetails';
import PaymentTab from './Payment/PaymentTab'
import BookingDetails from './BookingDetails/BookingDetails';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Homepage from './Homepage/Homepage'
import Selector from './Selector/Selector'
function MainPage() {
    return (
        <div>
        <Router>
        <Homepage/>
        <Selector/>  
        <Switch>         
          <Route path="/flight">
            <Routeselector/>
          </Route>
          <Route path="/seat">
             <PassengerDetails/>
          </Route>
          <Route path="/pay">
            <PaymentTab/>
          </Route>
          <Route path="/booking">
            <BookingDetails/>
          </Route>
       
          <Route path="/view">
            <ViewTicket/>
          </Route>
        </Switch>
      </Router>
        </div>
    )
}

export default MainPage

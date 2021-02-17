import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../core/Home.js'
import Menu from '../core/Menu.js'
import Signin from '../user/Signin.js'
import Signup from '../user/Signup.js'
/**
* @author
* @function Routes
**/

const Routes = (props) => {
  return(
      <>
    <BrowserRouter>
    <Menu />
      <Switch>
      <Route path='/signup' exact component={ Signup } />
      <Route path='/signin' exact component={ Signin } />
     <Route path='/' exact component={ Home} />
      </Switch>
    </BrowserRouter>
    </>
   )

 }

export default Routes
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import AdminRoute from '../auth/AdminRoute.js'
import PrivateRoute from '../auth/PrivateRoute.js'
import AdminDashboard from '../core/AdminDashboard.js'
import Dashboard from '../core/Dashboard.js'
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
      <PrivateRoute path="/user/dashboard" exact component={ Dashboard } />
      <AdminRoute path="/admin/dashboard" exact component={ AdminDashboard } />
      
      </Switch>
    </BrowserRouter>
    </>
   )

 }

export default Routes
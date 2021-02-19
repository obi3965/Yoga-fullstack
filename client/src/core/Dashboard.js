import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'

/**
* @author
* @function Dashboard
**/

const Dashboard = () => {
    const {user: {_id, name, email, role}} = isAuthenticated()

    const userLinks = () => (
        <div className="nav">
            <Link to="/user/profile/update">edit profile</Link>
        </div>
    )

   const userDetails = () => (
       <div>
               <span>{name}</span>
              <span>{email}</span>
              <span>{ role == 1 ? 'Admin': 'register user' }</span>
        </div>
    )
  return(
    <div className="container">
        <div className="row">
            <div className="col-md-4 offset-md-2">
             {userDetails()}
            </div>
            <div className="col-md-4 offset-md-2">
                {userLinks()}
            </div>
        </div>
    </div>
   )

 }

export default Dashboard
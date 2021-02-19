import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'

/**
* @author
* @function AdminDashboard
**/

const AdminDashboard = () => {
    const {user: {_id, name, email, role}} = isAuthenticated()

    const adminLinks = () => (
        <div className="card">
                <h4 className="card-header">Admin links</h4>
                 <ul className="list-group">
                     <li className="list-group-item">
                         <Link className="nav-link" to="/admin/create/category">create category</Link>
                     </li>
                    
                     <li className="list-group-item">
                     <Link className="nav-link" to="/admin/create/yoga">manage yoga</Link>
                     </li>
                 </ul>
            </div>
    )

   const adminDetails = () => (
       <div className="card">
           <h4 className="card-header">Admin profile info</h4>
               <span>{name}</span>
              <span>{email}</span>
              <span>{ role == 1 ? 'Admin': 'register user' }</span>
        </div>
    )
  return(
    <div className="container">
        <div className="row">
            <div className="col-md-4">
             {adminLinks()}
            </div>
            <div className="col-md-8">
               {adminDetails()} 
            </div>
        </div>
    </div>
   )

 }

export default AdminDashboard
import React, {Fragment, useState } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth'
import homeBanner from '../image/logo.png'
import '../styles/Navbar.css'
import Dashboard from './Dashboard'



const Navbar = ({history}) => {
    const [ click, setClick ] = useState(false)
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)
    
  return(
    <>
     <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
           <img src={ homeBanner} alt=""/>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <NavLink to='/' className='nav-links' activeClassName="is-active" onClick={closeMobileMenu} exact={true}>
                Home
              </NavLink>
            </li>
            
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
               <li className='nav-item'>
              <NavLink
                to='/user/dashboard'
                className='nav-links' activeClassName="is-active"
                onClick={closeMobileMenu}
              >
                Dashboard
              </NavLink>
            </li>
            )}

         { isAuthenticated() && isAuthenticated().user.role === 1 && (
               <li className='nav-item'>
              <NavLink
                to='/admin/dashboard'
                className='nav-links' activeClassName="is-active"
                onClick={closeMobileMenu}
              >
                Dashboard
              </NavLink>
            </li>
            )} 
            
            {!isAuthenticated() && (
                <Fragment>
                 <li className='nav-item'>
                 <NavLink className="btn btn-outline"
                 to='/signin'
                 className='nav-links' activeClassName="is-active"
                 onClick={closeMobileMenu} > 
                    sign in
                 </NavLink>
                 </li>
   
                 <li className='nav-item'>
                 <NavLink className="btn btn-outline"
                 to='/signup'
                 className='nav-links' activeClassName="is-active"
                 onClick={closeMobileMenu} > 
                    sign up
                 </NavLink>
               </li>
               </Fragment>
            )}

           
           
           {isAuthenticated() && (
            <li className='nav-item'>
              <NavLink className="btn btn-signout"
              to='/signout'
              onClick={()=> signout(() =>{
                history.push('/')
            })}
              > 
                 sign out
              </NavLink>
            </li>
            )}
            
            
          </ul>
          
        </div>
        
      </nav>
    </>
   )

 }

export default withRouter(Navbar)



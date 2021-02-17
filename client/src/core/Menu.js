import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { signout } from '../auth'
import homeBanner from '../image/logo.png'
import '../styles/Navbar.css'



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
            
            <li className='nav-item'>
              <NavLink
                to='/contact'
                className='nav-links' activeClassName="is-active"
                onClick={closeMobileMenu}
              >
                contacts
              </NavLink>
            </li>
            
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
            <li className='nav-item'>
              <NavLink className="btn btn-outline"
              to='/signout'
              className='nav-links' activeClassName="is-active"
              onClick={() => signout(()=>{
                  history.push('/')
              }) } > 
                 signout
              </NavLink>
            </li>
            
          </ul>
          
        </div>
        
      </nav>
    </>
   )

 }

export default Navbar



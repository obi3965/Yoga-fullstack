import React,{useState} from 'react'
import Spinner from '../../node_modules/react-spinners-css/dist/Spinner/index';
import {authenticate, login} from '../auth'
import {Link, Redirect} from 'react-router-dom'
/**
* @author
* @function Signup
**/

const Signup = () => {

  const [values, setValues] = useState({
    
    email:'',
    password:'',
    error:'',
   loading:false,
   redirectRefer:false
  });
  const { email, password, loading, error, redirectRefer } = values;

  const handleChange = name => event => {
      setValues({ ...values, error: false, [name]: event.target.value });
  };


  const clickSubmit = async event =>{
    event.preventDefault();
    setValues({ ...values, error: false, loading:true });
     const data = await login({ email, password })   
        //  .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
              //use a callback function
              authenticate(data, () =>{
                setValues({
                  ...values, 
                  redirectRefer:true
              });
              })
            }
        // });
  }
const loginForm = () => (
  <form>
  

  <div className="form-group">
      <label className="text-muted">Email</label>
      <input onChange={handleChange('email')} type="email" className="form-control" autoFocus="off" autoComplete="off" value={email} />
  </div>

  <div className="form-group">
      <label className="text-muted">Password</label>
      <input onChange={handleChange('password')} type="password" className="form-control"  autoFocus="off" autoComplete="off" value={password} />
  </div>
  <button type="submit" onClick={clickSubmit} className="btn btn-primary">
      Submit
  </button>
  </form>
)


const showError = () => (
  <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
      {error}
  </div>
);

const showLoading = () =>
        loading && (
            <div className="alert alert-info">
               <Spinner color="#ff782b" />
            </div>
        );

        const redirect = () =>{
          if(redirectRefer){
            return <Redirect to="/" />
          }
        }

  return(
    <div className="container">
    <div className="col-md-8 offset-md-2">
      {loginForm()}
      {showError()}
      {showLoading()}
      {redirect()}
    </div>
      
    </div>
   )

 }

export default Signup
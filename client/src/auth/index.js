import {API} from '../configUrl'

export const register = async (user) => {
    
    try {
         const res = await fetch(`${API}/signup`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
         })
         return res.json()
        
    } catch (error) {
        console.log(error);
    }    
}

export const login = async (user) => {
    
    try {
         const res = await fetch(`${API}/signin`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
         })
         return res.json()
        
    } catch (error) {
        console.log(error);
    }    
}


export const authenticate = (data,next) =>{
    if(typeof window !== 'undefined'){
         localStorage.setItem('t', JSON.stringify(data))
         next()
   
    }
   
}


export const signout = async (next) =>{
    if(typeof window !== 'undefined'){
      localStorage.removeItem('t')
      next()
     
    try { 
        
        const res = await fetch(`${API}/signout`,{
            method:"GET"
        })
             return res.json()
       
    } catch (error) {
        console.log(error);
    }
    }
}

export const isAuthenticated =  () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('t')) {
        return JSON.parse(localStorage.getItem('t'));
    } else {
        return false;
    }
}
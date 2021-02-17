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


export const authenticate = async (data,next) =>{
    if(typeof window !== 'undefined'){
         localStorage.setItem('t', JSON.stringify(data))
         next()
   
    }
   
}


export const signout = async (next) =>{
    if(typeof window !== 'undefined'){
      localStorage.removeItem('t')
      next()
      const signOutData ={
        method:'GET'
    }
    try {
        const res = await fetch(`${API}/signout`, signOutData)
             return res.json()
       
    } catch (error) {
        console.log(error);
    }
    }
}
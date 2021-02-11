const User = require("../models/user");
const jwt = require('jsonwebtoken');


exports.signup = async (req, res) => {
  const { email } = req.body;
   try {
     const existUser = await User.findOne({email: email})
     if(existUser){
       return res.status(403).json({
         error:'user already exist please signin'
       })
     }
          const user = new User(req.body)
             await user.save()
             user.hashed_password = undefined
             user.salt = undefined
             res.status(200).json(
                 user
             )
   } catch (error) {
     res.status(500).json({
       error:error
     })
   }
};





exports.signin = async (req, res) => {
  const { email, password } = req.body
  try {
      const user = await User.findOne({email:email})
     
       if(user){
         if(user.authenticate(password)){
          const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_TOKEN);
          res.cookie("token", token, { expire: new Date() + process.env.JWT_EXPIRES_IN });
          const { _id, email, firstName, lastName, role } = user;
           res.json({ 
             token, 
             user: { _id, email, firstName, lastName, role } });
          } 
       }
       else{
          return res.status(401).json({
            error: 'Email and password do not match'
           })
         }
      } catch (error) {
       res.status(500).json({
         error:error
       })
      }
}
  

  
exports.signout = async (req,res) =>{
 const userSignOut = await res.clearCookie('token')
  res.json({
     
     userSignOut: "you are signed out now",
    });
  
  
}
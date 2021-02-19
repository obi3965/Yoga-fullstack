const User = require("../models/user");
const jwt = require('jsonwebtoken');
const { errorHandler } = require("../errorHandler/AppError");


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
   } catch (err) {
     res.status(500).json(
       {err: errorHandler(err)}
     )
   }

  
};





exports.signin = async (req, res) => {
  const { email, password } = req.body
  try {
      const user = await User.findOne({email:email})
     
       if(user){
         if(user.authenticate(password)){
          const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_TOKEN);
          res.cookie("token", token, { expire: new Date() + process.env.JWT_EXPIRES_IN },{httpOnly:true} );
          const { _id, email, name, role } = user;
           res.json({ 
             success:true,
             token, 
             user: { _id, email, name, role } });
          } 
          
       }
       else{
          return res.status(401).json({
            error: error
           })
         }
      } catch (error) {
      return res.status(500).json({
         error:error
       })
      }
}
  

  
exports.signout = async (req,res) =>{
//  const userSignOut = await res.clearCookie('token')
//   res.json({
//     userSignOut,
//      message: "you are signed out now",
//     });
  
res.cookie('token', 'none', {
  expires : new Date(Date.now()),
  httpOnly : true 
});

res.status(200).json({
  success : true,
  message : 'Logged out successfully.'
});
  
}
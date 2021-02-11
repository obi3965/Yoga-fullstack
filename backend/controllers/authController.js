const User = require("../models/user");
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  const { email } = req.body;
  try {
    const userExist = await User.findOne({email: email}) 
    if(userExist){
        return res.status(403).json({
            error: "Email is already exist"
        })
    } 
          const user = new User(req.body)
          
           await user.save()
           //user.hashed_password = undefined
           user.salt = undefined
           res.status(200).json(
            
            user 
              
           )
  } catch (err) {
    res.status(400).json({
      err: error,
    });
  }
};


exports.signin = async (req,res) =>{
  const { email, password } = req.body
 try {
     const user = await User.findOne({email})
      if(user){
        if(user.authenticate(password)){
         const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_TOKEN);
         res.cookie("token", token, { expire: new Date() + process.env.JWT_EXPIRES_IN });
         const { _id, name, email, role } = user;
         return res.json({ token, user: { _id, email, name, role } });
         } 
      }
      else{
          res.status(401).json({
            status:'not valid email/password'
          })
        }
     } catch (err) {
      return res.status(500).json({
        message:'not valid email/password',
        err:err
      })
     }
 
}
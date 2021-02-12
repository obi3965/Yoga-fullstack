const User = require('../models/user')

exports.userById = async (req,res,next, id) =>{
    // User.findById(id).exec((err, user) => {
    //     if (err || !user) {
    //       return res.status(400).json({
    //         error: "user not found",
    //       });
    //     }
    //     req.profile = user;
    //     next();
    //   });
     try {
       const user = await  User.findById(id)
        req.profile = user
        next()
     } catch (error) {
        res.status(500).json({
        error: "user not found",
        });
     }    
     
}

exports.singleUser = (req,res)=>{
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(
    { user: req.profile}
      );
}
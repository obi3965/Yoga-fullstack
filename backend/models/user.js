
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

  name:{
      type:String,
      required:true,
      trim:true,
      maxlength:32
    },
    email:{
        type: String,
        required:true,
        trim:true,
        unique: 32
    },

    password:{
        required:true,
        type:String,
    },
    role:{
        type:Number,
        default: 0
    },
   

}, { toJSON : {virtuals : true},
    toObject : {virtuals : true}},{ timestamps: true, })


//encrypting the password
userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10)
})

// Return JSON Web Token
userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id : this._id}, process.env.JWT_TOKEN, {
        expiresIn : process.env.JWT_EXPIRES_IN
    });
}

//get rid off _id
userSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model('user', userSchema) 
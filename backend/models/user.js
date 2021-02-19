
const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid')

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true,
        trim:true,
        min:3,
        max:30
    },
   
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    salt: String,
    hashed_password:{
        required:true,
        type:String,
    },
    role:{
        type:Number,
        default: 0
    },
   

}, { timestamps: true, })


    userSchema
    .virtual("password")
    .set(function (password) {
      this._password = password;
      this.salt = uuidv4();
      this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
      return this._password;
    });
  
  userSchema.methods = {
    authenticate: function (plainText) {
      return this.encryptPassword(plainText) === this.hashed_password;
    },
  
    encryptPassword: function (password) {
      if (!password) return "";
      try {
        return crypto
          .createHmac("sha1", this.salt)
          .update(password)
          .digest("hex");
      } catch (err) {
        return "";
      }
    },
  };

module.exports = mongoose.model('user', userSchema) 


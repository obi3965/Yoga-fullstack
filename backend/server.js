const express = require('express');
const logger = require('morgan')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
//const fileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose')
const app = express();




//to define our routes
const auth = require('./routes/auth')


// Setting up config.env file variables
dotenv.config({path : './config/config.env'})

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database is connected");
  });


// middleware -
app.use(express.json());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(express.static('public'));

// Setup security headers
app.use(helmet());


// Sanitize data
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xssClean());

// Prevent Parameter Pollution
app.use(hpp({
    whitelist: ['positions']
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10*60*1000, //10 Mints
    max : 100
});



app.use(limiter);


// const auth = require('./routes/auth');
 const user = require('./routes/user');

 
 app.use('/api', auth);
 app.use('/api', user);



const port = process.env.PORT;


app.listen(port, function(){
    console.log(
        `http://localhost:${port}`
      );
        
})


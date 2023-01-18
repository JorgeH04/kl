const mongoose = require('mongoose');

  mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      
  }) 
      .then(db => console.log(`DB is connected`))
      .catch(err => console.error(err));






    //   'use strict';

    //   require('dotenv-safe').config();
      
    //   const cfg = {};
      
    //   // HTTP Port to run our web application
    //   cfg.port = process.env.PORT || 3000;
      
    //   // A random string that will help generate secure one-time passwords and
    //   // HTTP sessions
    //   cfg.secret = process.env.APP_SECRET || 'keyboard cat';
      
    //   // Your Twilio account SID and auth token, both found at:
    //   // https://www.twilio.com/user/account
    //   //
    //   // A good practice is to store these string values as system environment
    //   // variables, and load them from there as we are doing below. Alternately,
    //   // you could hard code these values here as strings.
    //   cfg.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    //   cfg.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
      
    //   // A Twilio number you control - choose one from:
    //   // Specify in E.164 format, e.g. "+16519998877"
    //   cfg.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
      
    //   // MongoDB connection string - MONGO_URL is for local dev,
    //   // MONGOLAB_URI is for the MongoLab add-on for Heroku deployment
    //   cfg.mongoUrl = process.env.MONGOLAB_URI || process.env.MONGODB_URI;
    //   cfg.mongoUrlTest = process.env.MONGO_URL_TEST;
      
    //   // Export configuration object
    //   module.exports = cfg;
            
 
     
    // //   MONGODB_URI=mongodb://localhost/marketportdosv
    // //   TWILIO_ACCOUNT_SID=AC3159436f8bb88f83f66a22fac8f71003
    // //   TWILIO_AUTH_TOKEN=f425369b56c1665cca2efad0d9d128a2
    // //   TWILIO_PHONE_NUMBER=+18456689535
    // //   NODE_ENV=production
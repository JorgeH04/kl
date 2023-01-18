'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
const cfg = require('../config');
const Twilio = require('twilio');
 
const accountSid = process.env.TWILIO_ACCOUNT_SID 
const authToken = process.env.TWILIO_AUTH_TOKEN  
const numbertwilio = process.env.TWILIO_PHONE_NUMBER  
 
// const accountSid = 'AC7921e66dffe635d9c91d97dfbe2c136c'  
// const authToken = 'f50f363fb9eb798acfb8c13ce88cc2e6'  
const client = require('twilio')(accountSid, authToken); 

const AppointmentSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  notification: Number,
  timeZone: String,
 // time: String,
  time: {type: Date, index: true},
});
 
AppointmentSchema.methods.requiresNotification = function(date) {
  return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc()
                          .diff(moment(date).utc())
                        ).asMinutes()) === this.notification;
};

AppointmentSchema.statics.sendNotifications = function(callback) {
  // now
  const searchDate = new Date();
  Appointment
    .find()
    .then(function(appointments) {
      appointments = appointments.filter(function(appointment) {
              return appointment.requiresNotification(searchDate);
      });
      if (appointments.length > 0) {
        sendNotifications(appointments);
      }
    });

    /**
    * Send messages to all appoinment owners via Twilio
    * @param {array} appointments List of appointments.
    */
    
     function sendNotifications(appointments) {

      const client = new Twilio(accountSid, authToken);


       
        appointments.forEach(async function(appointment) {


            const response = await client.messages.create({
 
                body:  [
                 
                    `Hola ${appointment.name}. Te recordamos que tenés un turno el día ${appointment.time.toLocaleDateString()} a las ${appointment.time.toLocaleTimeString()} .`
                 ],
               from: `whatsapp:+${numbertwilio}`,   
              // to: `whatsapp:5491130952942`
               to: `whatsapp:549${appointment.phoneNumber}`
                
             });
             
             console.log(response);

             
        });

       
        if (callback) {
          callback.call();
        }
    }
};

 
const Appointment = mongoose.model('appointment', AppointmentSchema);
module.exports = Appointment;

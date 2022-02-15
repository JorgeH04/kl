'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
const cfg = require('../config');
const Twilio = require('twilio');
const accountSid = 'ACb5384ea5b470b867a2fddf5edd40c795'
const authToken = '41a0390540664a4ef0fe30a7189926a6' 
const client = require('twilio')(accountSid, authToken); 

const AppointmentSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  notification: Number,
  timeZone: String,
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
               from: 'whatsapp:+14155238886',   
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

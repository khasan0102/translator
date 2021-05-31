const {Schema, model} = require('mongoose')

const userSchema = new Schema({
   user_first_name: {
      type: String,
      required: true,
      minlength: 3
   },
   user_last_name: {
      type: String,
      required: true,
      minlength: 3
   }
}, { collection: 'users' })

module.exports = model('User', userSchema)
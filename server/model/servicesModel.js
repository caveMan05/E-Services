const mongoose = require("mongoose")

const serviceSchema = mongoose.Schema({
  service:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  prie: { 
    type: String, 
    required: true
  },
  provider:
  { 
    type: String, 
    required: true 
  },

});

const Service = new mongoose.model("Service", serviceSchema)


module.exports = Service;
const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema(
  {
    service: { type: String, required: true },
    description: { type: String, required: true },
    provider:{type: mongoose.Types.ObjectId, ref:'User'},
    ratings:{type:Number,default:0},
    loc:{type:String,required:true},
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], default: [0, 0] }
    },
    prevServices:[{type:mongoose.Types.ObjectId,ref:'Post'}]
  },
  {
    timestamps: true
  }
);

// Add geospatial index for location field
servicesSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Service', servicesSchema);
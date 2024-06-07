const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    propic: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
    postedJobs: [{ type: mongoose.Types.ObjectId, ref: 'Job' }],
    appliedJobs:[{type:mongoose.Types.ObjectId,ref:'Job'}],
    Services: [{ type: mongoose.Types.ObjectId, ref: 'Service' }],
    loc:{type:String,required:true},
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], default: [0, 0] }
    }
  },
  {
    timestamps: true // for logging timestamp for create and update of records
  }    
);

// Add geospatial index for location field
userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);

module.exports = User;


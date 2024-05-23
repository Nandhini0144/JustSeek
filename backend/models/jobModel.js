const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    jobName:{ type: String, required: true },
    description:{ type: String, required: true },
    provider:{type: mongoose.Types.ObjectId, ref:'User'},
    avgSal:{ type: Number, required: true },
    timing:{ type: String, required: true },
    workingDays:{ type: String, required: true },
    loc:{type:String,required:true},
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], default: [0, 0] }
    }
  },
  {
    timestamps: true
  }
);

jobSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Job', jobSchema);

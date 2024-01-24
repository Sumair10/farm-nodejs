const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true , 'Tour Name must be provide!'],
      unique: true
    },
    duration: {
      type: Number,
      required: [true , 'Tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true , 'Tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true , 'Tour must have a difficulty'],
    },
    raitingsAverage: {
      type: Number,
     default:4.5
    },
    raitingsQuantity: {
      type: Number,
     default: 0
    },
    price: {
      type: Number,
      required: [true, 'Price must be provide!']
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim : true,
      required: [true, 'Tour must have a description']
    },
    description: {
      type: String,
      trim : true,
    },
    imageCover: {
      type: String,
      required: [true, 'Tour must have a cover image']
    },
    images : [String],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    startDates : [Date]



    
  }) 
  
  const Tour = mongoose.model('Tour', tourSchema);

  module.exports = Tour
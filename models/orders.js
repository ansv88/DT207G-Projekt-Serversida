const mongoose = require('mongoose');

//OrderItemSchema
const orderSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Du måste ange ditt namn'],
      },
      phone: {
        type: String,
        required: [true, 'Du måste ange ditt telefonnummer'],
      },
      pickupDate: {
        type: Date,
        required: [true, 'Du måste ange datum och tid för avhämtning'],
      },
      items: {
        type: [String],
        required: [true, 'Du måste välja minst en maträtt'],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
  });
  
  const Order = mongoose.model('Order', orderSchema);
  module.exports = Order;
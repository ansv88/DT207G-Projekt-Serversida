const mongoose = require('mongoose');

//MenuItemschema
const menuItemSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: [true, 'Du måste ange ett namn på maträtten'],
        unique: true,
        trim: true,
      },
      ingredients: {
        type: String,
        required: [true, 'Du måste ange ingredienserna'],
      },
      price: {
        type: Number,
        required: [true, 'Du måste ange pris'],
      },
      category: {
        type: String,
        required: [true, 'Du måste ange en kategori för maträtten'],
      },
});

const MenuItem = mongoose.model("menuItems", menuItemSchema);

module.exports = MenuItem;
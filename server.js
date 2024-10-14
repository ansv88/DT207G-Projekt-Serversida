const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// CORS-alternativ
const corsOptions = {
  origin: 'https://dt207g-projekt-klientsida.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

//Använd CORS-middleware med specifika alternativ
app.use(cors(corsOptions));

app.use(express.json());

//Anslut till databasen
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('Ansluten till MongoDB');
  })
  .catch((error) => {
    console.log('Fel vid anslutning: ' + error);
  });

//Routes
app.use('/api', authRoutes);
app.use('/api', menuItemRoutes);
app.use('/api', orderRoutes);

//Starta applikationen
app.listen(port, () => {
  console.log(`Servern körs på port: ${port}`);
}); 
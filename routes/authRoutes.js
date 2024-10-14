const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Användarmodell
const User = require('../models/adminUser');

//Lägg till ny användare
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    //Validera input
    if (!username || !password) {
      return res.status(400).json({ error: 'Ange både användarnamn och lösenord' });
    }

    //Kontrollera om användarnamnet redan finns
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Användarnamnet finns redan' });
    }

    //Skapa och spara användare
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'Användare skapad' });
  } catch (error) {
    res.status(500).json({ error: 'Internt serverfel, försök igen senare.' });
  }
});

//Logga in användare
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
  //Validera input
  if (!username || !password) {
    return res.status(400).json({ error: 'Ange både användarnamn och lösenord' });
  }
  
  //Kontrollera om användaren existerar (anv.namn och lösenord)
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Fel användarnamn eller lösenord' });
    }

    //Jämför lösenord
    const isPasswordMatch = await user.comparePassword(password);

    //Om lösenordet inte matchar, returnera ett fel
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Fel användarnamn eller lösenord' });
    } else {
      //Annars skapa JWT
      const payload = { username: username };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      const response = {
        message: 'Inloggad',
        token: token, //Skickar tillbaka token till klienten
      };
      res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internt serverfel, försök igen senare.' });
  }
});

module.exports = router; //Exporterar router för användning i andra moduler
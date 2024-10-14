const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItems'); //Importerar menyobjektsmodellen
const authenticateToken = require('../middleware/authenticateToken'); //Middleware för autentisering


  //Hämta alla rätter
router.get('/projektdt207g/menuitems', async (req, res) => {
    try {
       //Hämta alla maträtter från databasen och sortera dem efter kategori (alfabetisk ordning)
       let result = await MenuItem.find({}).sort({ category: 1 });
  
      //Kontrollera om resultatet är tomt
      if (!result.length) {
        return res
          .status(404)
          .json({ error: 'Inga rätter hittades.' });
      }
  
      //Om databasfrågan fungerar som den ska, returnera statuskod samt datan från servern
      return res.status(200).json(result);
    } catch (error) {
      console.error('Fel vid databasfråga: ', error);
      return res
        .status(500)
        .json({ error: 'Internt serverfel. Kontrollera loggar.' });
    }
  });
  
  //Hämta en specifik rätt baserat på ID
  router.get('/projektdt207g/menuitems/:id', async (req, res) => {
    try {
      //Hämta rätten baserat på ID som skickas i URL:en
      const menuItem = await MenuItem.findById(req.params.id);
  
      //Om rätten inte hittas, skicka tillbaka ett felmeddelande
      if (!menuItem) {
        return res.status(404).json({ error: 'Rätten hittades inte.' });
      }
  
      //Skicka tillbaka den hittade rätten
      return res.status(200).json(menuItem);
    } catch (error) {
      console.error('Fel vid hämtning av rätt: ', error);
      return res.status(500).json({ error: 'Internt serverfel.' });
    }
  });
  
  //Lägg till en rätt
  router.post('/projektdt207g/menuitems', authenticateToken, async (req, res) => {
    try {
      const { dishName, ingredients, price, category } = req.body;
  
      //Kontrollera om alla obligatoriska fält finns
      if (!dishName || !ingredients || !price || !category) {
        return res.status(400).json({ error: 'Alla fält (maträtt, ingredienser, pris, kategori) måste anges.' });
      }
  
      //Skapa ett nytt menyobjekt med hjälp av MenuItem-modellen
      const newMenuItem = new MenuItem({
        dishName: dishName,
        ingredients: ingredients,
        price: price,
        category: category
      });
  
      //Spara menyobjektet i databasen
      const savedMenuItem = await newMenuItem.save();
  
      //Skicka tillbaka det sparade objektet i svaret
      return res.status(201).json(savedMenuItem);
    } catch (error) {
      console.error('Fel vid skapande av maträtt: ', error);
      return res.status(500).json({ error: 'Internt serverfel, försök igen senare.' });
    }
  });
  
  //Uppdatera en rätt
  router.put('/projektdt207g/menuitems/:id', authenticateToken, async (req, res) => {
    try {
      const { dishName, ingredients, price, category } = req.body;
  
      const updatedMenuItem = await MenuItem.findByIdAndUpdate(
        req.params.id,
        { dishName, ingredients, price, category },
        { new: true, runValidators: true }
      );
  
      if (!updatedMenuItem) {
        return res.status(404).json({ error: 'Rätten hittades inte.' });
      }
  
      return res.status(200).json(updatedMenuItem); //Returnerar den uppdaterade rätten
    } catch (error) {
      console.error('Fel vid uppdatering av maträtt: ', error);
      return res.status(500).json({ error: 'Internt serverfel.' });
    }
  });
  
  //Ta bort en rätt
  router.delete('/projektdt207g/menuitems/:id', authenticateToken, async (req, res) => {
    try {
      const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
  
      if (!deletedMenuItem) {
        return res.status(404).json({ error: 'Rätten hittades inte.' });
      }
  
      return res.status(200).json({ message: 'Rätten har tagits bort.' });
    } catch (error) {
      console.error('Fel vid borttagning av maträtt: ', error);
      return res.status(500).json({ error: 'Internt serverfel, försök igen senare.' });
    }
  });

  module.exports = router; //Exporterar router för användning i andra moduler
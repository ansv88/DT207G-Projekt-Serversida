const express = require('express');
const router = express.Router();
const Order = require('../models/orders'); //Importerar ordermodellen
const authenticateToken = require('../middleware/authenticateToken'); //Middleware för autentisering

//Skapa en ny beställning (från Take Away-formuläret)
router.post('/projektdt207g/orders', async (req, res) => {
  try {
    const { fullname, phone, pickupDate, items } = req.body;

    if (!fullname || !phone || !pickupDate || !items || items.length === 0) {
      return res.status(400).json({ error: 'Alla fält måste fyllas i och minst en maträtt måste väljas' });
    }

    const newOrder = new Order({
      fullname,
      phone,
      pickupDate,
      items,
    });

    const savedOrder = await newOrder.save(); //Sparar beställningen

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Fel vid skapande av beställning: ', error);
    res.status(500).json({ error: 'Internt serverfel' });
  }
});

//Hämta alla beställningar (admin)
router.get('/projektdt207g/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); //Sortera efter skapad tid

    if (!orders.length) {
      return res.status(404).json({ error: 'Inga beställningar hittades.' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Fel vid hämtning av beställningar: ', error);
    res.status(500).json({ error: 'Internt serverfel' });
  }
});

//Ta bort en beställning (admin)
router.delete('/projektdt207g/orders/:id', authenticateToken, async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Beställningen hittades inte.' });
    }

    res.status(200).json({ message: 'Beställningen har tagits bort.' });
  } catch (error) {
    console.error('Fel vid borttagning av beställning: ', error);
    res.status(500).json({ error: 'Internt serverfel' });
  }
});

module.exports = router; //Exporterar router för användning i andra moduler
const jwt = require('jsonwebtoken');

//Validera (autentisera) JWT-token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; //Hämtar authorization-headern
    const token = authHeader && authHeader.split(' ')[1]; //Token från headern
  
    if (token == null) {
      return res.status(401).json({ message: 'Token saknas, åtkomst nekad' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, username) => {
      if (error) {
        return res.status(403).json({ message: 'Ogiltig token' }); //Fel om token inte är giltig
      }
  
      req.username = username;
      next();
    });
  }

  module.exports = authenticateToken; //Exporterar middleware
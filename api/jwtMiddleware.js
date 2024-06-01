const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token no enviado' });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Fallo en autenticacion token' });
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = verifyToken;
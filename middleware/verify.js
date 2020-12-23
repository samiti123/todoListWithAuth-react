import jwt from 'jsonwebtokens';

export const authenticate = (req, res, next) => {
  const token = req.header('token');
  if (!token) return res.status(401).send('Acces Deneid.');
  try {
    const verifiedUser = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verifiedUser;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token.');
  }
};

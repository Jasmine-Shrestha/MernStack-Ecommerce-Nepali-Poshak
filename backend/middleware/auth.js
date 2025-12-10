// authenticate for cart .....

import jwt from 'jsonwebtoken'
{/**const authUser = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again'})
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id;
        next()


    } catch (error) {
       console.log(error);
       res.json({success: false, message: error.message})
        
    }
}  */}


const authUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.json({ success: false, message: 'Not Authorized Login Again' });
  
    const token = authHeader.split(' ')[1]; // after "Bearer"
    try {
      const token_decode = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = token_decode.id;
      next();
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  }; 

  





export default authUser
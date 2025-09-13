import jwt from "jsonwebtoken";
import User from "../models/User.js";

const getTokenFromHeader = (h) => {
  if (!h) return null;
  const parts = h.split(" ");
  if (parts.length ===2 && parts[0]==="Bearer") return parts[1];
  return null;
};

export const authMiddleware = {
  required: async (req,res,next) => {
    try {
      const token = getTokenFromHeader(req.headers.authorization);
      if (!token) return res.status(401).json({error:"Unauthorized"});
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.sub);
      if (!user) return res.status(401).json({error:"Unauthorized"});
      req.user = user; // includes tenantId
      next();
    } catch(e) {
      return res.status(401).json({error:"Unauthorized"});
    }
  },
  optional: async (req,res,next) => {
    try {
      const token = getTokenFromHeader(req.headers.authorization);
      if (!token) return next();
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.sub);
      if (user) req.user = user;
    } catch(e){}
    next();
  }
};

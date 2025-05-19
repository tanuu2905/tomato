
import express from "express"
import  authMiddleware from "../middleware/auth.js"
// import adminOnly from "../middleware/adminMiddleware.js"

import { placeOrder } from "../controllers/orderController.js"
import { showOrder } from "../controllers/orderController.js"

const orderRouter  = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.get("/show",  showOrder);


export default orderRouter;

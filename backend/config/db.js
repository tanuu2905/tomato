
import mongoose from "mongoose";

 export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://Tanu:tanu3889@cluster0.yrxh4no.mongodb.net/food-del").then(() => console.log("DB connected"));
    
        
     
}
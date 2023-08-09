import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: String,
   customerId: String,
   email: String,
   password: String,
   balance: {type:Number, default:1000},
   transactions: Array,
});

const User = mongoose.model("User", userSchema);

export default User;

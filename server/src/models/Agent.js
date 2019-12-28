import mongoose from "mongoose";

export const Agent = mongoose.model("Agent", {
    name: String,
    email: String,
    phone: String,
    address: String,
    zipcode: String,
});
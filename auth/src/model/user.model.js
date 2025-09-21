import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true , unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    forgotPasswordToken: { type: String },
    forgotPasswordExpiry: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpiry: { type: Date },
},{ timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema)

export {User};

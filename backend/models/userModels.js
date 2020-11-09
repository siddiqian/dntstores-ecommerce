import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    loginName: {type: String, required: true},
    loginEmail: {type: String, required: true, unique: true, dropDups: true},
    loginPassword: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false}
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
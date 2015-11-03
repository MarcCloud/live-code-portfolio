import mongoose from 'mongoose';

const User = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    repos_url: String,
    avatar_url: String,
    bio: String,
    token: String
});

export default mongoose.model('User', User);

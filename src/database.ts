import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ChallengeDB', {
})
    .then(db => console.log('*MongoDB* Database is connected'))
    .catch(err => console.log(err));
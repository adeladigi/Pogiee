



const userSchema = new mongoose.Schema ({
 email: {
   type: String,
   unique: true
 },
 password: String,
 nickname: {
   type: String,
   unique: true
 },
 points: Number,
 level: String,
 status: String,
 subID: String,
 priceID: String,
 customerID: String
});

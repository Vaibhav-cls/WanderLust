const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    
    },
    description: String,
    image: {
        type:String,
        set: (v)=> v===""?
        "https://www.imf.org/-/media/Images/IMF/News/news-article-images/2020/CF-570x312-Tourism-Preto-perola-Getty-Images-iStock-1011241694.ashx"
        :v,
        default: "https://www.imf.org/-/media/Images/IMF/News/news-article-images/2020/CF-570x312-Tourism-Preto-perola-Getty-Images-iStock-1011241694.ashx"
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
})
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
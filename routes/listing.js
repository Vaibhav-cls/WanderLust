const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const path = require("path");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = err.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// INDEX ROUTE

router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

// NEW ROUTE

router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

// SHOW ROUTE

router.get(
  "/:id",
  // validateListing,
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      req.flash("error", "Listing you requested for is deleted");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  })
);

// Create Route

router.post(
  "/",
  wrapAsync(async (req, res, next) => {
    //let {title,description,price,image,country,location} = req.body;
    //let listing = req.body.listing;
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for listing");
    // }

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
    // THIS IS ANOTHER WAY OF HANDLING THE SERVER SIDE ERROR

    // if(!newListing.title){
    //     throw new ExpressError(400,"Title is missing");
    // }
    // if(!newListing.description){
    //     throw new ExpressError(400,"Description is missing");
    // }
    // if(!newListing.location){
    //     throw new ExpressError(400,"Location is missing");
    // }
  })
);

//  EDIT ROUTE

router.get(
  "/:id/edit",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested for is deleted");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  })
);

// UPDATE ROUTE

router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  })
);

//  DELETE ROUTE

router.delete(
  "/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  })
);

// router.get("/testListing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title:"My new villa",
//         description: "By the beach",
//         price:1200,
//         location:"Calangute , Goa",
//         country:"India",
//     })
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// })

module.exports = router;

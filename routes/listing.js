const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
// INDEX ROUTE

router.get("/", wrapAsync(listingController.index));

// NEW ROUTE

router.get("/new", isLoggedIn, listingController.renderNewForm);

// SHOW ROUTE

router.get(
  "/:id",
  // validateListing,
  wrapAsync(listingController.showListing)
);

// Create Route

router.post("/", isLoggedIn, wrapAsync(listingController.createListing));

//  EDIT ROUTE

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);

// UPDATE ROUTE

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing)
);

//  DELETE ROUTE

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
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

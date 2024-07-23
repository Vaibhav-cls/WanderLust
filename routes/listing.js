const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
// INDEX ROUTE
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, wrapAsync(listingController.createListing));

// NEW ROUTE

router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(
    // validateListing,
    wrapAsync(listingController.showListing)
  )
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//  EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
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

const express = require('express');
const router = express.Router();
const HomePage = require('../model/Home');
const mongoose = require('mongoose');

//post request
router.post('/', async(req,res)=>{
    // console.log("post request to home");
    const { welcomeContent, writeUp, footerLeft, footerRight } = req.body; // 👈 Get both from frontend
    const homePage = new HomePage({ welcomeContent, writeUp, footerLeft, footerRight }); // 👈 Save both;
    await homePage.save();
    res.json(homePage);

});

//get request
router.get('/', async(req,res)=>{
    // console.log("get request to home")
    const homePage = await HomePage.findOne();
    res.json(homePage);
})

router.put('/', async (req, res) => {
  // console.log("PUT request to home");

  const { welcomeContent, writeUp, footerLeft, footerRight } = req.body;

  if (!welcomeContent && !writeUp && !footerLeft && !footerRight) {
    return res.status(400).json({ message: 'no content to update' });
  }

  try {
    const updatedHomePage = await HomePage.findOneAndUpdate(
      {},
      { welcomeContent, writeUp, footerLeft, footerRight },
      { new: true }
    );

    if (updatedHomePage) {
      res.json(updatedHomePage);
    } else {
      // Agar document nahi mila, ek naya create kar lo
      const newHomePage = new HomePage({ welcomeContent, writeUp, footerLeft, footerRight });
      await newHomePage.save();
      res.json(newHomePage);
    }
  } catch (error) {
    // console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

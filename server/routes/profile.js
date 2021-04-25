const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");

router.post("/post", async (req, res) => {
  if (req.body.key) {
    try {
      const value = await Profile.findOneAndUpdate({
        key: req.body.key,
      });
      res.json(value);
    } catch (err) {
      res.json({ msg: err });
    }
  } else {
    try {
      const value = await Profile.create({
        name: req.body.name,
        age: req.body.age,
        image: req.body.image,
        workExperience: req.body.workExperience,
      });
      res.json({ id: value._id });
    } catch (err) {
      console.log("triggered");
      res.json({ msg: err });
    }
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const value = await Profile.findOne({
      key: req.body.key,
    });
    res.json(value);
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;

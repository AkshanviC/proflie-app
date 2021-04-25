const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");

router.post("/post", async (req, res) => {
  if (req.body.id) {
    try {
      console.log(req.body.id);
      const value = await Profile.findOneAndUpdate(
        {
          _id: req.body.id,
        },
        {
          name: req.body.name,
          age: req.body.age,
          image: req.body.image,
          workExperience: req.body.workExperience,
        }
      );
      console.log("post triggered");
      res.json({ id: value._id });
    } catch (err) {
      console.log("no");
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
      console.log("post else");
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
      _id: req.params.id,
    });
    //console.log(value, req.params.id, "get request");
    res.json(value);
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;

const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, address, email, dob, gender } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(409).send({ msg: "User exists!" });
    } else {
      const userData = new User({
        name: name,
        email: email,
        dob: dob,
        gender: gender,
        address: address,
      });
      await userData.save();
      res.status(200).send({ msg: "User created" });
    }
  } catch (error) {
    res.status(500).send({ msg: "DB Error" });
  }
});

module.exports = router;

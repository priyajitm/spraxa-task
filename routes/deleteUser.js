const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/:email', async (req, res) => {
  
    try {
        const user = await User.findOneAndDelete({email: req.params.email})
        if (user) {
            res.status(200).send({ msg: "User deleted" });
        } else {
            res.status(404).send({ msg: "No user Found" });
        }
      } catch (error) {
        res.status(500).send({ msg: "DB Error" });
      }
});

module.exports = router;
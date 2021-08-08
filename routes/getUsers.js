const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
    
    
    try {
        const users = await User.find()
        res.send(users)
      } catch (error) {
        res.status(500).send({ msg: "DB Error" });
      }
});

module.exports = router;
const express = require("express");
const controller = require("./controllar");

const router = express.Router();

router.get('/crime', controller.getdata);
router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/post', controller.adddata);
router.get('/findbyid/:id', controller.getdatabyid);
router.delete('/delete/:id', controller.deletedatabyid);
router.put('/update/:id', controller.updatedatabyid);

module.exports = router;

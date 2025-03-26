const express  = require("express")
const controllar = require('./controllar')

const router = express.Router()

router.get('/crime',controllar.getdata)
router.post('/login',controllar.login)
router.post('/register',controllar.register)
router.post('/post',controllar.adddata)
router.get('/findbyid/:id', controllar.getdatabyid)
router.delete('/delete/:id',controllar.deletedatabyid)
router.put('/update/:id',controllar.updatedatabyid)

module.exports = router 
const express=require('express');
const router=express.Router();
const controllers=require('../controllers/mainController');

router.get('/',controllers.Home)
router.get('/about',controllers.About)




module.exports=router;
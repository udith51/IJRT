const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/', userController.first);
router.get('/homePris', userController.view);
router.post('/homePris', userController.find);
router.get('/addPris', userController.form);
router.post('/addPris', userController.create);
router.get('/editPris/:id', userController.edit);
router.post('/editPris/:id', userController.update);
router.get('/viewPris/:id', userController.viewPris);
router.get('/:id', userController.delete);


module.exports = router;
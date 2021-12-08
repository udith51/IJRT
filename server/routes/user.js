const express = require('express');
const router = express.Router();
const prisionerController = require('../controllers/prisionerController')
// const policeController = require('../controllers/policeController')

router.get('/', prisionerController.first);
router.get('/homePris', prisionerController.view);
router.post('/homePris', prisionerController.find);
router.get('/addPris', prisionerController.form);
router.post('/addPris', prisionerController.create);
router.get('/editPris/:id', prisionerController.edit);
router.post('/editPris/:id', prisionerController.update);
router.get('/viewPris/:id', prisionerController.viewPris);
router.get('/:id', prisionerController.delete);

// router.get('/', policeController.first);
// router.get('/homePol', policeController.view);
// router.post('/homePol', policeController.find);
// router.get('/addPol', policeController.form);
// router.post('/addPol', policeController.create);
// router.get('/editPol/:id', policeController.edit);
// router.post('/editPol/:id', policeController.update);
// router.get('/viewPol/:id', policeController.viewPris);
// router.get('/:id', policeController.delete);
module.exports = router;
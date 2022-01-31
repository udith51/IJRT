const express = require('express');
const router = express.Router();
const prisionerController = require('../controllers/prisionerController')
const policeController = require('../controllers/policeController')
const judgeController = require('../controllers/judgeController')
const initialController = require('../controllers/initialController')



router.get('/', initialController.first);
router.get('/jud/login', initialController.loginJ);
router.get('/ccp/login', initialController.loginC);
router.get('/pol/login', initialController.loginP);

router.get('/homePris', prisionerController.view);
router.post('/homePris', prisionerController.find);
router.get('/addPris', prisionerController.form);
router.post('/addPris', prisionerController.create);
router.get('/editPris/:id', prisionerController.edit);
router.post('/editPris/:id', prisionerController.update);
router.get('/viewPris/:id', prisionerController.viewPris);
router.get('/pr/:id', prisionerController.delete);

router.get('/homePol', policeController.view);
router.post('/homePol', policeController.find);
router.get('/addPol', policeController.form);
router.post('/addPol', policeController.create);
router.get('/editPol/:id', policeController.edit);
router.post('/editPol/:id', policeController.update);
router.get('/viewPol/:sid/:pid', policeController.viewPol);
router.get('/po/:id', policeController.delete);

router.get('/homeJud', judgeController.view);
router.post('/homeJud', judgeController.find);
router.get('/editJud/:id', judgeController.edit);
router.post('/editJud/:id', judgeController.update);
router.get('/viewJud/:crid/:crimid', judgeController.viewPris);
router.get('/jd/:id', judgeController.delete);
module.exports = router;
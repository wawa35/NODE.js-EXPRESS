const express = require('express');
const router = express.Router();
const controlThing = require('../controller/thing.controller');




router.post('/',controlThing.createThing);
router.get('/',controlThing.getAllThing);
router.get('/:id',controlThing.getThing);
router.put('/:id',controlThing.modifyThing);
router.delete('/:id',controlThing.deleteThing);

module.exports = router;

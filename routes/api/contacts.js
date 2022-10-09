const express = require('express')

const router = express.Router()

const cntrl=require("../../controllers/contacts");

const {isValidId}=require("../../middlewares");

const {cntrlWrapper}= require("../../helpers")

router.get('/', cntrlWrapper(cntrl.getAll));

router.get('/:contactId', isValidId, cntrlWrapper(cntrl.getById));

router.post('/', cntrlWrapper(cntrl.addContact));

router.delete('/:contactId', isValidId, cntrlWrapper(cntrl.removeContact));

router.put('/:contactId', isValidId, cntrlWrapper(cntrl.updateContact));

router.patch('/:contactId/favorite', isValidId, cntrlWrapper(cntrl.updateFavorite));

module.exports = router;

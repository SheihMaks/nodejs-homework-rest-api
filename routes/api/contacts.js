const express = require('express')

const router = express.Router()

const cntrl=require("../../controllers/contacts");

const {isValidId,authenticate}=require("../../middlewares");

const {cntrlWrapper}= require("../../helpers")

router.get('/', authenticate, cntrlWrapper(cntrl.getAll));

router.get('/:contactId', authenticate, isValidId, cntrlWrapper(cntrl.getById));

router.post('/', authenticate, cntrlWrapper(cntrl.addContact));

router.delete('/:contactId', authenticate, isValidId, cntrlWrapper(cntrl.removeContact));

router.put('/:contactId', authenticate, isValidId, cntrlWrapper(cntrl.updateContact));

router.patch('/:contactId/favorite', authenticate, isValidId, cntrlWrapper(cntrl.updateFavorite));

module.exports = router;

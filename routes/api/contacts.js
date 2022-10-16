const express = require('express')

const contactsRouter = express.Router()

const cntrl=require("../../controllers/contacts");

const {isValidId,authenticate}=require("../../middlewares");

const {cntrlWrapper}= require("../../helpers")

contactsRouter.get('/', authenticate, cntrlWrapper(cntrl.getAll));

contactsRouter.get('/:contactId', authenticate, isValidId, cntrlWrapper(cntrl.getById));

contactsRouter.post('/', authenticate, cntrlWrapper(cntrl.addContact));

contactsRouter.delete('/:contactId', authenticate, isValidId, cntrlWrapper(cntrl.removeContact));

contactsRouter.put('/:contactId', authenticate, isValidId, cntrlWrapper(cntrl.updateContact));

contactsRouter.patch('/:contactId/favorite', authenticate, isValidId, cntrlWrapper(cntrl.updateFavorite));

module.exports = contactsRouter;

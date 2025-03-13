const express = require('express');
const EntryController = require('../controllers/EntryController');
const { authenticate } = require('../middleware/authUtils');
const { validateEntry } = require('../middleware/authUtils');

const router = express.Router();

router.post('/', authenticate, validateEntry, EntryController.createEntry);

router.patch('/:entryId', authenticate, validateEntry, EntryController.updateEntry);

router.delete('/:entryId', authenticate, EntryController.deleteEntry);

router.get('/', authenticate, EntryController.getAllEntries);

router.get('/:entryId', authenticate, EntryController.getEntry);


module.exports = router;

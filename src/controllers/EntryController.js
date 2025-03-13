const Entry = require('../models/Entry');

// Create a new entry
exports.createEntry = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newEntry = new Entry({ title, description });
        await newEntry.save();
        res.status(200).json({ data: newEntry });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create entry' });
    }
};

// Get all entries
exports.getAllEntries = async (req, res) => {
    try {
        const entries = await Entry.find();
        res.status(200).json({ data: entries });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch entries' });
    }
};

// Get a specific entry
exports.getEntry = async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.entryId);
        if (!entry) return res.status(404).json({ error: 'Entry not found' });
        res.status(200).json({ data: entry });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid entry ID' });
        }
        res.status(500).json({ error: 'Server error' });
    }
};

// Update an entry
exports.updateEntry = async (req, res) => {
    try {
        const { entryId } = req.params;
        const { title, description } = req.body;
        const updatedEntry = await Entry.findByIdAndUpdate(

            entryId,
            { title, description },
            { new: true }
        );
        if (!updatedEntry) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.status(200).json({ data: updatedEntry });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update entry' });
    }
};

// Delete an entry
exports.deleteEntry = async (req, res) => {
    try {
        const { entryId } = req.params;
        const deletedEntry = await Entry.findByIdAndDelete(entryId);

        if (!deletedEntry) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete entry' });
    }
};

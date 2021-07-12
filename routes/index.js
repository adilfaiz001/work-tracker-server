var express = require('express');
var router = express.Router();

var NotesController = require('../controllers/notes.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/notes', NotesController.GetAllNotes);

router.post('/note', NotesController.AddNote);

router.post('/sync/notes', NotesController.SyncNotes);

module.exports = router;

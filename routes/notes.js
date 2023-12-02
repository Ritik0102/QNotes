const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../modles/Note');

// Fetching User Data using get
router.get('/fetchnotes', fetchuser, async(req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id});
        res.json(notes)  
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Error Occured")
    }
})

//Add notes using post
router.post('/addnotes', fetchuser, [
    body('title',"Enter a valid Title").isLength({min : 3}),
    body('description', 'Enter a Valid Description').isLength({min : 3})
], async(req, res) =>{
    try {
        const { title, description, tag } = req.body;
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).json({errors : result.array()})
        }
    
        const note = new Note({
            title, description, tag, user : req.user.id
        })
    
        const savedNotes = await note.save();
    
        res.json(savedNotes)
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Error Occured")
    }
})

//Udating Notes Using put
router.put('/updatenotes/:id', fetchuser, async(req, res) =>{
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
    
        //finding the note to update
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found!")
        }
    
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Valid User");
        }
    
        note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true})
        res.json(note)
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Error Occured")
    }
})

//delete note using delete

router.delete('/deletenote/:id', fetchuser, async(req, res) =>{
    try {
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found!")
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Valid User");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"successes": "note deleted", note:note})
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Error Occured")
    }
})

module.exports = router 
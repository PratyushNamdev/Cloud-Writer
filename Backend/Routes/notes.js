const express = require("express");
const router = express.Router();
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");
const decodingToken = require("../Middleware/decodingToken");

//Route 1 to POST req to add a note to the database /api/notes/addnote
router.post(
  "/addnote",
  decodingToken,
  [
    body("title")
      .isLength({ min: 1 })
      .withMessage("The title should be a minimum of three letters"),
    // body("tag")
    //   .isLength({ min: 1 })
    //   .withMessage("The title should be a minimum of three letters"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    try {
      Notes.create({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      })
        .then((note) =>{ 
        
          res.json(note)
      }
        )
        .catch(() => {
          res.status(401).json({ error: "fill title field" });
        });
    } catch (error) {
      res.stauts(500).send({ error: "Some internal error occured" });
    }
  }
);

//Route 2 to GET req to fetch all the notes from the database /api/notes/fetchnotes
router.get("/fetchnotes", decodingToken, async (req, res) => {
  try {
    let page = 1;
    if(parseInt(req.query.page) > 0){
       page = parseInt(req.query.page);
    }
    
    const limit = parseInt(req.query.limit) || 5;
    const notes = await Notes.find({ user: req.user.id })
    .skip((page-1)*limit)
    .limit(limit)
    .exec();
    const totalNotes = await Notes.countDocuments({ user: req.user.id });
    console.log(totalNotes);
    console.log(notes);
    res.json({ totalNotes , notes});
  } catch (error) {
    res.status(500).send({ error: "Some internal error occured" });
  }
});

//Route 3 to DELETE req to delete a specific note from the database /api/notes/deletenote
router.delete("/deletenote/:id", decodingToken, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("error : Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Error : Access Denied");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.send({Delete:"Deleted"});
  } catch (err) {
    res.status(500).send({ error: "Some internal error occured" });
  }
});

router.put("/updatenote/:id", decodingToken, async (req, res) => {
  const { title, description, tag } = req.body;
  
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send({error : "Not found"});
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({error : "Access Denied"});
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    res.status(500).send({ error: "Some internal error occured" });
  }
});
module.exports = router;

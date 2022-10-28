const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const Tool = require("../models/Tool");

// post new tool by the user
router.post("/api/tool", upload.single("file"), (req, res) => {
  try {
    //check if the request has an image or not
    if (!req.file) {
      res.json({
        success: false,
        message: "You must provide at least 1 file",
      });
    } else {
      const { owner, type, price, description } = req.body;
      if (!owner || !type || !price || !description) {
        return res.status(422).json({ error: "Please add all the fields" });
      }
      const tool = new Tool({
        owner,
        type,
        price,
        description,
        file: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        },
      });
      tool
        .save()
        .then((tool) => {
          return res.status(201).json({ message: "Saved successfully" });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ error: err, message: "Error in saving to db!!" });
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// get tools by filter
router.get("/api/tool", (req, res) => {
  Tool.find(req.query).then((savedTools) => {
    if (!savedTools) {
      return res.status(422).json({ error: "No tools found" });
    }
    return res.status(200).json({ savedTools });
  });
});

// delete tool
router.delete("/api/tool", (req, res) => {
  Tool.findByIdAndDelete(req.query._id).then((tool) => {
    if (!tool) {
      return res.status(422).json({ error: "No tools found" });
    }
    return res.status(200).json({ tool });
  });
});

module.exports = router;

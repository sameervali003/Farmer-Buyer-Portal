const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const Crop = require("../models/Crop");

// post new crop by the user
router.post("/api/crop", upload.single("file"), (req, res) => {
    try{
        //checking there exist a image or not 
        if(!req.file){
            res.json({
                success: false,
                message: "You must provide at least 1 file"
            });
        }else{
            const {owner, type, price, description} = req.body;
            if(!owner || !type || !price || !description){
                return res.status(422).json({error: "Please add all the fields"});
            }
            const crop = new Crop({
                owner,
                type,
                price,
                description,
                file: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                }
            });
            crop.save().then(crop => {
                return res.status(201).json({message: "Saved successfully"});
            }).catch(err => {
                return res.status(500).json({error: err, message: "Error in saving to db!!"});
            });
        }
    }catch(error){
        console.error(error);
        res.status(500).send("Server Error");

    }
});

// get crops by filter
router.get("/api/crop", (req, res) => {
    Crop.find(req.query).then(savedCrops => {
        if(!savedCrops){
            return res.status(422).json({error: "No crops found"});
        }
        return res.status(200).json({savedCrops});
    });
}
);

//delete crop by id

router.delete("/api/crop", (req, res) => {
    Crop.findByIdAndDelete(req.query._id).then((crop) => {
      if (!crop) {
        return res.status(422).json({ error: "No crop found" });
      }
      return res.status(200).json({ crop});
    });
  });

module.exports = router;

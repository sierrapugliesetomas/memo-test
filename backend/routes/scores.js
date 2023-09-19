const express = require("express");
// const multer = require("multer");

const Score = require("../model/score");

const router = express.Router();

// const MIME_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpg",
//   "image/jpg": "jpg"
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error("Invalid mime type");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, "backend/images");
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname
//       .toLowerCase()
//       .split(" ")
//       .join("-");
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, name + "-" + Date.now() + "." + ext);
//   }
// });

router.post(
  "",
  //   multer({ storage: storage }).single("image"),
  (req, res, next) => {
    // const url = req.protocol + "://" + req.get("host");
    const score = new Score({
      playerName: req.body.playerName,
      time: req.body.time,
      moves: req.body.moves,
      //   imagePath: url + "/images/" + req.file.filename
    });
    score.save().then((createdScore) => {
      res.status(201).json({
        message: "Score added successfully",
        score: {
          ...createdScore,
          id: createdScore._id,
        },
      });
    });
  }
);


router.get("", (req, res, next) => {
  Score.find().sort({time: 'asc'}).limit(10).then((documents) => {
    res.status(200).json({
      message: "Scores fetched successfully!",
      scores: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;

const express = require('express');
const { Authenticate } = require('../utils/jwt');
const router = express.Router();
const { db } = require("../models/index");
const multer  = require('multer');

// Upload file to local server storage using multer
// reference: https://www.npmjs.com/package/multer
const profileStorage = multer.diskStorage({
  filename: function(req, file, callback) {
    const extension = file.originalname.split(".").pop();
    callback(null, `${req.auth.UserID}.${extension}`);
  },
  destination: function(req, file, callback) {
    callback(null, 'public/uploads/image-profiles/');
  }
});
const uploadProfile = multer({
  storage: profileStorage,
});

router.post('/upload/profile', Authenticate, uploadProfile.single('image'), async function(req, res, next) {
  // success authenticate
  // success upload file to storage

  // update user data
  const filter = {
    where: {
      ID: req.auth.UserID
    }
  }

  // compose filepath from destination and filename
  // remove public/ from path
  const filePath = `${req.file.destination}${req.file.filename}`.replace("public/", "");
  try {
    await db["user"].update({ProfileImage: filePath}, filter);
  } catch (error) {
    console.log('[/upload/profile] db.update() :>> ', error.message);
    return res.status(400).json({message: "unknown error"});
  }
  res.status(201).json({message: "OK"});
});

// TODO: upload image for background
// 1 define storage
// 2 define uploader
// 3 define router
//   - get filepath
//   - update user data

module.exports = router;

var express = require('express');
var router = express.Router();

var cityModel = require('../models/cities')
var userModel = require('../models/users')

// POST SIGN UP
router.post('/sign-up', async function(req,res,next) {

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if (!searchUser) {
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront
    })
  
    var newUserSaved = await newUser.save()
  
    req.session.user = {
      name: newUserSaved.username,
      id: newUserSaved._id,
    }
  
    res.redirect('/weather')

  } else {
    res.redirect('/')
  }

  
})


// POST SIGN IN
router.post('/sign-in', async function(req,res,next) {

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront,
  })

  console.log(searchUser)

  if (searchUser != null) {
    
    req.session.user = {
      name: searchUser.username,
      id: searchUser._id
    }

    res.redirect('/weather')

  } else {

    res.redirect('/')

  }
})

//GET LOGOUT
router.get('/logout', async function(req,res,next) {
  req.session.user = null;
  res.redirect('/')
})




module.exports = router;

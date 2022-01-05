const express = require('express');
const db = require('../db/index.js');
const dbUtils = require('../utils/dbUtils.js');


const RouterInterface = require('./routeInterface.js');


router = new RouterInterface('user');
const userRouter = router.getRouter();
router.getAll();
router.getItem();
//if u have time make some restriction on user registration and field that are required to pass in like password and ...
userRouter.post('/', (req,res,next) => {
  //encrypt password before saving by postgres module, could be done in express by a crypto library.
  console.log(req.user);
  dbUtils.insertInto('users', req.body.row ,(dbRes,err) => {
    if(err){
    return res.status(500).send('DB error has occured');
    }
    res.status(201).send(`data inserted into users`);
  }, 2)
});
router.put();
router.remove();


module.exports = router.getRouter() ;

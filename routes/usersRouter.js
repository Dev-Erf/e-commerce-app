const express = require('express');
const db = require('../db/index.js');
const dbUtils = require('../utils/dbUtils.js');
const RouterInterface = require('./routeInterface.js');

/**
 * @swagger
 /users:
 *     get:
 *       tags:
 *       - "users"
 *       summary: "get all the items"
 *       description: ""
 *       produces:
 *       - "application/json"
 *
 *       responses:
 *         "500":
 *           description: "database Error"
 *         "200":
 *           description: "an array containing all the items"
 *     post:
 *       tags:
 *       - "users"
 *       summary: "add another item"
 *       description: ""
 *       consumes:
 *       - "application/json"
 *       produces:
 *       - "application/json"
 *       parameters:
 *       - name: "body"
 *         in: "body"
 *         description: "item object need to be added , it should be inside of row field of body object"
 *         required: true
 *         schema:
 *           type: "array"
 *           items:
 *             type: "object"
 *       responses:
 *         "500":
 *           description: "database Error"
 *         "200":
 *           description: "an array containing all the items"
 *
     /user/{userId}:
 *     parameters:
 *       - name: "userId"
 *         in: "path"
 *         description: "id of item"
 *         required: true
 *         type: "string"
 *
 *     get:
 *       tags:
 *       - "users"
 *       summary: "return a specific item"
 *       description: ""
 *       produces:
 *       - "application/json"
 *       responses:
 *         "500":
 *           description: "database Error"
 *         "200":
 *           description: "an object containing specific item"
 *     put:
 *       tags:
 *       - "users"
 *       summary: "change a specific item"
 *       description: ""
 *       produces:
 *       - "application/json"
 *       responses:
 *         "500":
 *           description: "database Error"
 *         "204":
 *           description: "empty body"
 *     delete:
 *       tags:
 *       - "users"
 *       summary: "return a specific item"
 *       description: ""
 *       produces:
 *       - "application/json"
 *       responses:
 *         "500":
 *           description: "database Error"
 *         "204":
 *           description: "empty body"
 *
 *
 */


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

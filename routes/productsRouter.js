const express = require('express');
const db = require('../db/index.js');
const RouterInterface = require('./routeInterface.js');

/**
 * @swagger
 /products:
 *     get:
 *       tags:
 *       - "products"
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
 *       - "products"
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
     /products/{productId}:
 *     parameters:
 *       - name: "productId"
 *         in: "path"
 *         description: "id of item"
 *         required: true
 *         type: "string"
 *
 *     get:
 *       tags:
 *       - "products"
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
 *       - "products"
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
 *       - "products"
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

router = new RouterInterface('product');
router.getAll();
router.getItem();
router.post();
router.put();
router.remove();


module.exports = router.getRouter() ;

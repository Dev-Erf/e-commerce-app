const express = require('express');
const db = require('../db/index.js');
const dbUtils = require('../utils/dbUtils.js');
const RouterInterface = require('./routeInterface.js');

/**
 * @swagger
 /carts:
 *     get:
 *       tags:
 *       - "carts"
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
 *       - "carts"
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
     /carts/{cartId}:
 *     parameters:
 *       - name: "cartId"
 *         in: "path"
 *         description: "id of item"
 *         required: true
 *         type: "string"
 *
 *     get:
 *       tags:
 *       - "carts"
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
 *       - "carts"
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
 *       - "carts"
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

router = new RouterInterface('cart');
router.getAll();
router.getItem();
router.post();

router.getRouter().put('/checkout', (req,res,next)=> {
  db.getQuery(`
    select * from cart_item
    join products on cart_item.product_id = products.id
    join carts on cart_item.cart_id = carts.id
    join users on carts.user_id = users.id
    where users.id = $1 ;`, [req.user.id], (err,joinRes) => {
      if(err){
        res.status(500).send();
        //check for user account balance could be added here if constraint on user balance be added on db, if not check
        //should be added outside if block.
      }
      const cartId = joinRes.rows[0].cart_id ;
      dbUtils.insertInto('orders', {cart_id: cartId, date_added: new Date() },(dbRes,err)=>{
        if (err){
          res.status(500).send();
          //sth to do when db error happen
        }
        res.status(201).send(`items on cart ${cartId} bought`);
      })
    }
    )
})

router.put();
router.remove();


module.exports = router.getRouter() ;

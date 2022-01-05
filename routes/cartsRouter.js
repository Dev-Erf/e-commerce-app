const express = require('express');
const db = require('../db/index.js');
const dbUtils = require('../utils/dbUtils.js');

const RouterInterface = require('./routeInterface.js');

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

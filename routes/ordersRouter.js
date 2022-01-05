const express = require('express');
const db = require('../db/index.js');
const RouterInterface = require('./routeInterface.js');


router = new RouterInterface('order');
router.getAll();
router.getItem();
router.post();
router.put();
router.remove();


module.exports = router.getRouter() ;

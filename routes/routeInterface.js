const express = require ('express');
const db = require ('../db/index.js');
const dbUtils = require ('../utils/dbUtils.js');

class RouterInterface {


  constructor(routerName){
    this.router = express.Router();
    this.routerName = routerName ;

    this.router.param(`${this.routerName}Id`, (req,res,next, id)=> {
      dbUtils.getItem(`${this.routerName}s`, 'id', id, (res) => {
        console.log(res);
        if(res.rows.length == 0) return res.status(404).send('item not found');
        req.id = Number(id);
        next();
      })
    })
  }


  getAll(){
    this.router.get('/',(req, res, next) => {
      dbUtils.getAll(`${this.routerName}s`, (dbRes,err) => {
        if(err){
          this.dbErrHandler(res);
        }
        res.status(200).send(dbRes.rows);
      })
    });
  }
  getItem(){
    this.router.get(`/:${this.routerName}Id`, (req,res,next)=> {
      dbUtils.getItem(`${this.routerName}s`, 'id', req.id, (dbRes,err) => {
        if(err){
          this.dbErrHandler(res);
        }
        res.status(200).send(dbRes.rows)
      })
    });

  }
  post(){
    this.router.post('/', (req,res,next) => {
      //values client wish to add to data base should be added to an ARRAY in respect to table columns sequence in db.
      //the array should be assigned to 'row' field of body functino .
      dbUtils.insertInto(`${this.routerName}s`, req.body.row ,(dbRes,err) => {
        if(err){
          this.dbErrHandler(res);
        }
        res.status(201).send(`data inserted into ${this.routerName}s`);
      })
    });
  }
  //dbutils for put might not work as expected if we pass a empty obj as condition
  put(){
    this.router.put(`/:${this.routerName}Id`, (req,res,next) => {
      dbUtils.update(`${this.routerName}s`, req.body.update, {id: req.id}, (dbRes,err)=> {
        if(err){
          this.dbErrHandler(res);
        }
        res.status(204).send(`table ${this.routerName}s id ${req.id} has been updated`);
      })
    });

  }
  remove(){
    this.router.delete(`/:${this.routerName}Id`, (req,res,next)=> {
      dbUtils.delete(`${this.routerName}s`, 'id', req.id, (dbRes,err) => {
        if(err){
          this.dbErrHandler(res);
        }else {
        res.status(204).send(`table ${this.routerName}s id ${req.id} has been deleted`);
        }
    })
    });

  }
  errorHandler(){
    this.router.use((err,req,res,next)=> {
      console.log(err.stack);
      res.status(500).send(`dbError: ${err.stack}`);
    })
  }
  getRouter(){
    return this.router;
  }
  dbErrHandler(res){
    return res.status(500).send('wrong input');
  }
}
module.exports = RouterInterface;

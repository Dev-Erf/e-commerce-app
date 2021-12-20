const {Client, Pool} = require('pg');

const pool = new Pool ({
  host:'localhost' ,
  user: 'postgres',
  database: 'ecommerce-app',
  password: 'postgres'
});


const db = {
  async getQuery(query, parameters){
      let client;
    try{

      client = await pool.connect();
      console.log("client is connected ");
      const queryResult = await client.query(query,parameters);
      return queryResult;

    }catch(e){
      console.log(`an error has happened: ${e.stack}`);
      return e;
    }finally{
      client.release();
      console.log('client has been released');
    }
  }
}

/*
db.getQuery('select * from address')
.then(res => {
  console.log(res.rows[0]);
}, rej => {
  console.log(`this will never execute ! ${rej}`);
})

*/


module.exports = db ;

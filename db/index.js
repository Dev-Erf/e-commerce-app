const {Client, Pool} = require('pg');

const pool = new Pool ({
  host:'localhost' ,
  user: 'postgres',
  database: 'ecommerce-app',
  password: 'postgres'
});


const db = {
  async getQuery(query, parameters, resultCallback){
      let client;
    try{

      client = await pool.connect();
      const queryResult = await client.query(query,parameters);
      if(resultCallback) {
        return resultCallback(null , queryResult)
      }
      return queryResult;

    }catch(e){
      console.log(`an error has happened: ${e.stack}`);
      if(resultCallback) return resultCallback(e);
      return e;
    }finally{
      client.release();
    }
  }
}



/*
db.getQuery(`select * from cart_item
join products on cart_item.product_id = products.id
join carts on cart_item.cart_id = carts.id
join users on carts.user_id = users.id `, [], (err, res) => {
  console.log(res.rows)
})
*/

//test('ali',5, 'reza');
/*
db.getQuery(`select * from ${'address'} where address_id = $1 `, ['1'], (err, res) => {
  console.log(err ? err : res);
})

*/

/*
db.getQuery('select * from address')
.then(res => {
  console.log(res.rows[0]);
}, rej => {
  console.log(`this will never execute ! ${rej}`);
})

*/

module.exports = db ;

const db = require('../db/index.js');

function agrContainer(afterGettingRows){
  //this function is runned inside index which has the try catch statement. why it retuen unhandled promise error when I dont use try catch here while it has one in index ?

  return function (err, res){
      try{
      afterGettingRows(res,err);
      }catch(e){
        console.log(e.stack);
      }
  }
}

function createScopeContainer(input, startingScope ,separator){
  separator = separator || ',';
  startingScope = startingScope || 1;
  let scopeNum = startingScope;
  let queryScope = '' ;
  let queryScopeObjKeys = '';
  if(input.constructor.toString().indexOf("Array") > -1){
  input.forEach((item, i, arr) => {
    if (i == arr.length - 1) {
      queryScope += `$${i + 1}` ;
    }else {
      queryScope += `$${i + 1}${separator} `
    }
  });
 return queryScope
}else {

  for(const property in input){
    if(scopeNum == Object.keys(input).length + startingScope -1){
      queryScope += `${property} = $${scopeNum} `;
      queryScopeObjKeys +=`${property}`;
       scopeNum ++;
    }else{
      queryScope += `${property} = $${scopeNum}${separator} `;
      queryScopeObjKeys +=`${property}${separator} `;
      scopeNum ++;
      }
    }
  }
  return {queryScope: queryScope,
          queryScopeObjKeys: queryScopeObjKeys,
          nextScopeNum: scopeNum
          }
}

const dbUtils = {
  getAll(tableName, afterGettingRows){
     db.getQuery(`select * from ${tableName}`, [], agrContainer(afterGettingRows));
  },

  getItem(tableName, colName, value, afterGettingRows, hashedPass){

    const scopeVal = hashedPass ? `crypt($1, $2)` : '$1';
    const arrValue = hashedPass ? [value, hashedPass]: [value] ;
    const scopeString = `select * from ${tableName} where ${colName} = ${scopeVal}` ;

    db.getQuery(scopeString, arrValue, agrContainer(afterGettingRows));
  },

  insertInto(tableName, obj, afterGettingRows, passIdx){

    //if passIdx given, mandates the postgres to hash the password
    let scopeVal = createScopeContainer(Object.values(obj));
    scopeVal = passIdx ? scopeVal.replace(`$${passIdx}`, `crypt($${passIdx}, gen_salt('bf'))` ) : scopeVal ;

    const objScope = createScopeContainer(obj).queryScopeObjKeys;
    const queryString = `insert into ${tableName} (${objScope}) values(${scopeVal})`;
    console.log(queryString);
    db.getQuery(queryString, Object.values(obj), agrContainer(afterGettingRows) )
  },

  update(tableName, setObj, condition, afterGettingRows ){

    const objScope = createScopeContainer(setObj) ;
    const conditionScope = createScopeContainer(condition, objScope.nextScopeNum).queryScope;
    const allValuesConcatenation = Object.values(setObj).concat(Object.values(condition));
    db.getQuery(`update ${tableName} set ${objScope.queryScope} where ${conditionScope}` , allValuesConcatenation , agrContainer(afterGettingRows));
  },

  delete(tableName, idColName, id, afterGettingRows){
    db.getQuery(`delete from ${tableName} where ${idColName} = $1`, [id], agrContainer(afterGettingRows))
  },
  filter(tableName, columnName, target, afterFindingItem){
    this.getAll(tableName, (res, err)=>{
      if(err){
        afterFindingItem(err)
      }else{
        const result = res.rows.filter( item => item[columnName] == target) ;
        afterFindingItem(null, result);
      }
    })
  },

    authorizePass(email ,pass, afterCheck){
      this.filter('users', 'email', email, (err, res) => {
        if (err){
          console.log(err);
        }else {
          this.getItem('users', 'pass', pass, afterCheck, res[0].pass);
        }
      } )
    },
    isAuthenticated(req,res,next){
      console.log(req.session);
      if(req.user){
        console.log('req.user exist');
        next();
      }else{
        console.log('req.user does not exist');
        res.status(401).send('unAuthorized');
      }
    },


}


/*
dbUtils.authorizePass('gmail', 'padss', (res, err) => {
  if(err) return `something went wrong in database`;

  if (res.rows.length == 0 ){
    console.log('pass is wrong');
  }else {
    console.log('pass is correct');
  }
})
*/

//dbUtils.getItem('users', id, )

/*

dbUtils.insertInto('users',{first_name: 'erfan', email: 'gmail', pass: 'pass'}, (res,err) => {
  if(err) return console.log(err);
  console.log(`the password is set ! `);
}, 3 )

/*

/*
dbUtils.filter('address', 'country', 'iran', (err, res)=> {
  console.log(res[0]);
});
*/
//dbUtils.getAll('address', res => {console.log(res)})
//dbUtils.update('carts',{is_paid: false, date: new Date()} , {id: 7},  res => console.log(res));
//dbUtils.insertInto('carts',{date: new Date(), user_id: 2} ,  res => console.log(res));
//dbUtils.delete('carts', 'id', 7, res => console.log(res));
//dbUtils.getItem('carts', 'id', 9, res =>{ console.log(res.rows)});

module.exports = dbUtils;

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerJsdocConf = require('./config/swaggerJsdocConf.js');
const swaggerUi = require('swagger-ui-express');
//const RedisStore = require('connect-redis')(session);
//const redis = require('redis');




const dbUtils = require('./utils/dbUtils.js');
const configurePassport = require('./config/passport.js')(passport);

const userRouter = require('./routes/usersRouter.js');
const productRouter = require('./routes/productsRouter.js');
const cartRouter = require('./routes/cartsRouter.js');
const orderRouter = require('./routes/ordersRouter.js');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

/*
const redisClient = redis.createClient({
  host: 'localhost',
  port: 4000
});
*/


/*
* although it is said in the that session creates its own default store in memory, passport does not deserialize
* user which I think is result of that the sessions is not saved.
* to solve this problem a well understanding of session and passport is required. tests also could be a good way to find
* how they work.
*
* a new store also is required. maybe redis or maybe somethind related to database.
*
* for now I'm only storing session data in a global variable which is totaly incorrect and dangerous in term of security.
*/

app.use(session({
  //store: new RedisStore({client: redisClient}) ,
  secret: 'secret',
  resave: true,
  saveUninitialized: false
})
)

//configuring passport;
app.use(passport.initialize());
app.use(passport.session());
let ses = null;


/**
 * @swagger
 /login:
 *     post:
 *       tags:
 *       - "login"
 *       summary: "login user"
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
 *         "403":
 *           description: "not authorized"
 *         "201":
 *           description: "user succefully logged in"
 */
app.post('/login', passport.authenticate('local'), (req, res, next) => {
  console.log(`${req.user.email} is authenticated`);
  ses = req.user;
  console.log(req.session);
  res.status(201).send('user is authenticated');
})

app.use('/users',userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/carts', (req,res,next) => {
  if (ses){
    req.user = ses;
    next();
  }else{
    res.status(401).send('session is not defined');
  }
} , cartRouter);

const openapiSpec = swaggerJsdoc(swaggerJsdocConf);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));


const port = process.env.PORT || 4000;
app.listen(port, ()=> {console.log(`listening on port ${port}`)});

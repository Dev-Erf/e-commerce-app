module.exports = {
  swaggerDefinition:{
  swagger: '2.0',
  info: {
    title: 'E-commerce API',
    description:'provides API for e-commerce application',
    version: '1.0.0'
    }


  },
  apis: ['./routes/*Router.js', './app.js'],
}

const bcrypt = require ('bcrypt')
const saltRounds = 10
const user = require('../model/user.js')
const order = require('../model/order.js')

module.exports = (app) => {
  //---defining the route for user signup---
  const notes = require('../controllers/userController.js');

  // //---end of user signup---
   app.post('/user/signup', notes.create);

   app.post('/image',notes.image);
   app.get('/image/v',notes.imagev);

  //--defining the route of user signin--
  app.post('/user/signin', notes.login);

  //find all users
  app.get('/user/findall', notes.findAll);
  
app.post('/user/order',(res,req) =>{
  
})
 
};




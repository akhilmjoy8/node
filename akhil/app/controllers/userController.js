const user = require('../model/user.js');
const bcrypt = require ('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')
const passport = require('passport')

exports.create = (req, res) => {      
 // Validate request
  if(!(req.body.username) || !(req.body.password) || !(req.body.email)) {
    res.status(400).json({"status":"error","msg":"Feilds are empty"});
  }

  // Create a Note
  var username =  req.body.username
  var email =  req.body.email
  var password =  req.body.password
  var hash = bcrypt.hashSync(password,saltRounds)
  var userData =  new user({
    username: username,
    email: email,
    password: hash
  })


  // Save Note in the database
  userData.save()
  .then(data => {
      res.status(200).json({"status":"success","msg": "Registration success"});
  }).catch(err => {
    res.status(401).json({"status":"error" ,"msg": "Registration Failed"|| err.message});
  });        
};
exports.login =(req, res) => {
  // Validate request
  //console.log(req.body)
  if(!(req.body.email)||!(req.body.password)) {
     res.status(401).json({"status":"error","msg":"Feilds are empty"});
  }
  else{
    var email =  req.body.email;
    var password =   req.body.password;  
    user.findOne({email:email},function (err,docs){
      if (err){
        res.status(401).json({"status":"error","msg":"db_error_found"})
      } else if (docs==null){
        res.status(401).json({"status":"error","msg": "No user Found"});
      } else{      
        var hash1 = bcrypt.hashSync(password,saltRounds)
        if (bcrypt.compareSync(password, docs.password)){
        const JWTToken = jwt.sign({
          email: email
        },
        'secret',
        {
          expiresIn: '24h'
        })
        res.status(200).json({"status":"success",'token':JWTToken})
        } else {
          res.status(401).json({"status":"error","msg":"password not matching"})
        }
      }
    })

  }
  
};
exports.findAll = (req, res) => {
    user.find()
  .then(notes => {
         res.status(200).json(notes)
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes."
      });
  });
};
exports.image=(req,res) =>{
  var filename1 = uuidv4()+".png";
  if(req.files){
    var file = req.files.uploaded_file,
        filename = file.name;       
        file.mv("./upload/"+filename1,function(err){
        if(err){
            console.log(err);
            res.send("err occurd");
        }
        else
        {
            res.send("done");
        }
    })
  }
  
}
exports.imagev =(req,res) =>{ 
  res.sendFile("C:/Users/Acer/Desktop/akhil/upload/fba40ec3-2275-4999-bff3-dde03b77c147.png");
}
exports.email_login =(req, res) => {

}

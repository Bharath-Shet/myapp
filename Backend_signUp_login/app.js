const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config');
const User = require('./UserSchema');
const cors = require('cors');
const port = process.env.port||5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//getAllUser
app.get('/users',(req,res) => {
    User.find({},(err,user) => {
        if(err) throw err;
        res.send(user)
    })
})
//Register 
app.post('/register',(req,res) => {
    var hashpassword = bcrypt.hashSync(req.body.password);
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log('Error when connecting to DB')
        }
        if(!user){
            User.create({
                fname:req.body.fname,
                password:hashpassword,
                email:req.body.email,
                phone:req.body.phone,
                dob:req.body.dob,
                role:req.body.role?req.body.role:'User'
            },(err,user) => {
                if(err) res.send('Error');
                res.status(200).send({
                    msg: 'Register success'
                })
            })
        }else{
            return res.send({
                msg: 'Email ID Already Exists'
            })
        }
    })
});

app.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,data) => {
        if(err)  console.log('Error while login');
        if(!data)  return res.status(400).send({
			msg: 'No User Found Register first'
		});
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,data.password)
            if(!passIsValid) return res.status(401).send({
				msg:'Wrong password'
			});
            var token = jwt.sign({id:data._id},config.secert,{expiresIn:86400})
            return res.send({auth:true,token:token})
        }
    })
})

 
//userinfo
app.get('/userInfo',(req,res) => {
    var token = req.headers['x-access-token'];
    if(!token) return res.send({auth:false,token:"No Token Provided"})
    jwt.verify(token,config.secert,(err,data) => {
        if(err) return res.send({auth:false,token:"Invalid Token Provided"})
        User.findById(data.id,{password:0},(err,result) => {
            res.send(result)
        })
    })

})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})
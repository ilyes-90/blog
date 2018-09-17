const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const Users = mongoose.model('User');

mongoose.connect('mongodb://localhost:27017/blog');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.get('/', function (req, res) {
    res.status(200).json({
        message: "Authentificate yourself !"
    });
});

router.post('/register', function (req, res) {
    let response = {};
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    let user = new Users(req.body);
    user.save((err, result) => {
        if (err) {
            console.log(err);
            return err;
        }
        response = {
            status: false,
            error_code: 0,
            message: 'Unable to insert'
        };
        if (result) {
            response = {
                status: true,
                error_code: 0,
                result: result,
                message: 'Inserted successfully'
            };
        }
        res.json(response);
    });
});


router.post('/login', function(req, res) {
    Users.findOne({email:req.body.email}).then(user=>{
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid){
            let result = { auth: false, token: null };
            res.render('login', {'msg':'Authentification failed !'})
        }
        let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.render('index', {'msg':'Votre token est : '+token});
    }).catch(err => {        
        return res.status(401).send({ auth: false, token: null });
    });
});



module.exports = router;
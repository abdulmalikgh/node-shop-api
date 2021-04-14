const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports.signup = function(req, res, next) {

    User.find({email: req.body.email}).exec().then( user => {
        if(user.length >= 1) {
            res.status(422).json({
                message:'Account already exists.'
            })
        } else {
            // decrypt password here
            bcrypt.hash(req.body.password, 10, function(err, hash){
                if(err) {
                    res.status(500).json({
                        errors: err
                    })
                }
                
                // create user
                const user = new User({
                    email: req.body.email,
                    password: hash
                })
                user.save().then( user => {
                    if(user) {
                        res.status(201).json({
                            message:'User created'
                        })
                    }
                }).catch(err => {
                    res.status(500).json({
                        errors: err
                    })
                })
            })
        }
    })

}

module.exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email}).then( user => {
        
        if(!user) {
            res.status(401).json({
                message: 'Incorrect email and password'
            })
        }

        bcrypt.compare(req.body.password, user.password, function(err, result) {
            
            if(!result) {
                res.status(401).json({
                    message: 'Incorrect email and password'
                })
            }

            if(result) {
                const data = {
                    user:user.email,
                    userid:user._id
                }
                const token = jwt.sign(data,"process.env.SECRET", {expiresIn: '1h'})
                res.status(200).json({
                    message: 'Login successful',
                    token: token
                })
            }


        })
    }).catch( err => {
        res.status(500).json({
            errors: err
        })
    })
}

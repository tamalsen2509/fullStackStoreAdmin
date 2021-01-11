let express = require('express');
let route = express.Router();
let User = require('../model/userModel')

// diplay all customer list in toy store
//path /toys/ @method get
route.get('/',  async (req, res) => {

    try {
        let users = await User.find({
            account: 'Toy Store'
        }).lean()
        res.render('toyStore/toymain' ,{ users } )
            
    } catch (e) {
        console.log('Error at routes/electronics/get /', e)
        res.render('error/404')
    }
    
})


// diplay form to add user
//path /toys/add @method post

route.get('/add', (req, res) => {
    res.render('toyStore/form' , {title : "ADD DETAILS TO CREATE NEW CUSTOMER"} )   
})


// data receive from client by req.body customer creation form 
//path /toys/add @method post
route.post('/add', async (req, res) => {
    let userdata = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        birthDay: req.body.birthday,
        account: req.body.sector
    }
    try {        
        let user = await User.findOne({
            email : req.body.email
        });
        if (!user) {
            let newUser = await User.create(userdata)
            res.render('msg/success')    
        } else {
            res.render('msg/userCreated')
        }   
    } catch (e) {
        console.log('error at routes/electronic/post/add', e)
        res.render('error/404')
    }

})


route.get('/edit/:id', async (req, res) => {
    
    try {

        let user = await User.findOne({ _id: req.params.id }).lean();
        if (!user) {
            res.render('error/500')
        } else {
            res.render('toyStore/edit_form' , {title:"Edit/Change  desired fields " , user  } )
        }

    } catch (error) {
        console.log('error occured at routes/electronics/get/edit/id' , error )
    }
})






module.exports = route; 
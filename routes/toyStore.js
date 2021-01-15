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
        res.render('toyStore/toymain' ,{ users , title : "Toy-Store home page"  } )
            
    } catch (e) {
        console.log('Error at routes/toys/get /', e)
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
        
        // if user found in db model restrict user to create a duplicate entry
        let user = await User.findOne({
            email: { "$in": req.body.email },
            account : {"$in" : req.body.sector }
        });
        // if user not found then create a new user
        if (!user) {
            let newUser = await User.create(userdata)
            res.render('msg/success')    
        } else {
            res.render('msg/userCreated')
        }   
    } catch (e) {
        console.log('error at routes/toys/post/add', e)
        res.render('error/404')
    }

})


// edit routes to modify user details & displaying edit form
// routes @ /toys/edit/:id method get
route.get('/edit/:id', async (req, res) => {    
    try {
        let user = await User.findOne({ _id: req.params.id }).lean();
        if (!user) {
            res.render('error/500')
        } else {
            res.render('toyStore/edit_form' , {title:"Edit/Change  desired fields " , user  } )
        }
    } catch (e) {
        console.log('error occured at routes/toys/get/edit/id' , e)
    }
})


// edit routes to modify user details
// routes @ /toys/edit/:id method put
route.put('/:id', async (req, res) => {
    try {
        let user = await User.findById( req.params.id ).lean();
        if (!user) {
            res.render('error/404')
        } else {
             user = await User.findByIdAndUpdate({
                _id : req.params.id
            }, req.body, { new : true , runValidators : true  } )
        }
        res.redirect('/toys')

    } catch (e) {
        console.log('Error at routes/toys/put', e)
        res.redirect('error/500')
    }
})


route.delete('/:id', async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.redirect('/toys')
    } catch (e) {
        console.log('error at routes/toys/delete', e);
        res.render('error/500')
    }
})








module.exports = route; 
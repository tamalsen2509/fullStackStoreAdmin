let express = require('express');
let route = express.Router();
let User = require('../model/userModel')

// diplay all customer list 
//path /electronics @method get
route.get('/',  async (req, res) => {

    try {
        let users = await User.find({
            account: 'Electronics'
        }).lean()
        res.render('electronic/Ecustomers' ,{ users } )
            
    } catch (e) {
        console.log('Error at routes/electronics/get /', e)
        res.render('error/404')
    }
    
})


// display customer creation form 
//path /electronics/add @method get
route.get('/add', (req, res) => {
    res.render('electronic/form', {title : "Add details to create New Customer".toUpperCase() })   
})

// data receive from clien by req.body customer creation form 
//path /electronics/add @method post
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
            res.render('electronic/edit_form' , {title:"Edit/Change  desired fields " , user  } )
        }

    } catch (error) {
        console.log('error occured at routes/electronics/get/edit/id' , error )
    }
})

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
        res.redirect('/electronics')

    } catch (error) {
        console.log('Error at routes/electronics/put', error)
        res.redirect('error/500')
    }
})


route.delete('/:id', async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.redirect('/electronics')
    } catch (err) {
        console.log('error at routes/electronics/delete', err);
        res.render('error/500')
    }
})







module.exports = route;
let express = require('express');
let route = express.Router();
//let User = require('../model/userModel')
let controller = require('../controller/eController')


// diplay all customer list 
//path /electronics @method get
route.get('/',controller.getEHome)

// display customer creation form 
//path /electronics/add @method get
route.get('/add', controller.addFormGet);

// data receive from client by req.body customer creation form 
//path /electronics/add @method post
route.post('/add', controller.addFormpost)  
        



route.get('/edit/:id', async (req, res) => {
    
    try {

        let user = await User.findOne({ _id: req.params.id }).lean();
        if (!user) {
            res.render('error/500')
        } else {
            res.render('electronic/edit_form' , {title:"Edit/Change  desired fields " , user  } )
        }

    } catch (e) {
        console.log('error occured at routes/electronics/get/edit/id' , e )
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

    } catch (e) {
        console.log('Error at routes/electronics/put', e)
        res.redirect('error/500')
    }
})


route.delete('/:id', async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.redirect('/electronics')
    } catch (e) {
        console.log('error at routes/electronics/delete', e);
        res.render('error/500')
    }
})







module.exports = route;
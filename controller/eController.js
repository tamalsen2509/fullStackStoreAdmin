let User = require('../model/userModel');

// controller structure for e-commerce section


exports.getEHome = async (req, res) => { // function to get electronic home page 
    try {
        let users = await User.find({
            account: 'Electronics'
        }).lean()
        res.render('electronic/Ecustomers' ,{ users } )
            
    } catch (e) {
        console.log('Error at routes/electronics/get /', e)
        res.render('error/404')
    }
}

exports.addFormGet = (req, res) => {
    res.render('electronic/form', {title : "Add details to create New Customer".toUpperCase() })
}

exports.addFormpost = async (req, res) => {
    // user input
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
        

        // if not then create a user account
        if (!user) {
            let newUser = await User.create(userdata)
            res.render('msg/success')
        } else  {
            res.render('msg/userCreated')
        } 
    } catch (e) {
        console.log('error at routes/electronic/post/add', e)
        res.render('error/404')
    }
}

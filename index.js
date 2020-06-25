const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        name: "Aman",
        phone: "1111111111"
    },
    {
        name: "Ayush",
        phone: "1234567890"
    },
    {
        name: "Rohan",
        phone: "12131321321"
    }
]

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "PlayGround Page"
    });
})

//fetching data fron DB and display to list
app.get('/', function(req, res){


    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });

    })
  
})

//fetching data from browser using URI and store it into DB
app.post('/create-contact', function(req, res){
    
    
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newContact);
            return res.redirect('/');
    })
  

});


app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let id = req.query.id

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object from db');
        }
        return res.redirect('back');
    });

});


app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
        return;
    }
    console.log('Server is running on Port:', port);
})

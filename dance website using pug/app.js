const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
var mongoose=require('mongoose');
const bodyparser=require('body-parser')
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true});
const port=80;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });


  const Contact = mongoose.model('Contact', contactSchema);

  // express specific stuff
app.use('/static',express.static('static'))  //for serving static files
app.use(express.urlencoded())

// pug specific stuff
app.set('view engine','pug')//adding template engine pug
app.set('views',path.join(__dirname,'views'))//setting the views directory

//endpoints
app.get('/',(req,res)=>{
    
    const params={}
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send('This item has been saved to the database.')
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    })

    //res.status(200).render('contact.pug');
})

app.post('/contact',(req,res)=>{
    
    const params={}
    res.status(200).render('contact.pug',params);
})

app.listen(port, () => {
    
    console.log(`Example app listening on port ${port}`)
})
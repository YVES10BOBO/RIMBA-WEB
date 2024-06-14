const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const  cors = require("cors");
// const { error } = require("console");
// const { DefaultDeserializer } = require("v8");
// const { default: Product } = require("../frontend/src/pages/Product");

app.use(express.json());
app.use(cors());

//Data base connection with mongodb

mongoose.connect("mongodb+srv://YVESBOBODEV:MyEcommerceweb@cluster0.bme1f5q.mongodb.net/e-commerce")


//API Creation 

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

// Image Storage Engine that we get to multer
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})
// create Upload endpoint for images 
app.use('/image',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })

})

// schema for creating  Product....
const product = mongoose.model("product", {
    id:{
        type:Number,
        required:true,
    },
   name:{
    type:String,
    required:true,
   },
   image:{ 
    type:String,
    required:true,
   },
   category:{ 
    type:String,
    required:true,
   },
   new_price:{ 
    type:Number,
    required:true,
   },
   old_price:{ 
    type:Number,
    required:true,
   },
   Date:{ 
    type:Date,
    default:Date.now,
   },
   available:{ 
    type:Boolean,
    Default:true,
   },
})
app.post('/addproduct' ,async(req,res) =>{
    let products =  await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
         last_product_array =last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    } 
const product = new Product({
    id:id,
    id:req.body.id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
});
console.log(product); 
await product.save();
console.log("saved");
res.json({
    success:true,
    name:req.body.name,
})

})
// endschem

// Create API for deleting products......
app.post('/removeproduct' , async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })

})


// Create API for deleting products......

// creating API FOR GETTING ALL PRODUCTS .....
app.get('/allproducts', async(req,res)=>{
    let product = await Product.find({});
    console.log("All product Fetched");
    res.send(products);
})

// schema creating for user model.....

const user = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        unique:true,
    },
    password:{
        type:String
    },
    cartData:{
        type:Object,
        default:Date.now,
    }

})
//creating endpoint for registering the user
app.post('/signup' ,async(req,res)=>{
    let check = await User.findOne({email:req.body.email});
    if (check){
        return res.status(400).json({success:false,errors:"existing found with thse same email"})
    }
    let cart = {};
    for (let i=0; i<300; i++) {
    cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartDatacart,
    })
    await user.save();
    const data = {
        user:{
            id:user.id
        }
    }
    const token= jwt.sign(data,'secret_ecom');
    res.json({success:true,token})

})
// creating end point foor user login ....
app.post('/login' , async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data= {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secrete_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,error:"wrong Password"});
        }
    }
    else{ 
        res.json({success:false,error:"wrong Email Id"});
    }
    })
    // creating endpoint  for new collection data....
    app.get('/newcollection', async(req,res)=>{
        let products = await Product.find({});
        let newcollection = products.slice(1).slice(-8);
        console.log("NewCollection Fetched");
        res.send(newcollection); 
    })
    // creating end point  for popular  in women section
    app.get('popularinwomen' , async (req,res)=>{
        let products = await Product.find({category:"women"}); 
        let popular_in_women = product.slice(0,4);
        console.log("popular in women fetched");
        res.send(popular_in_women);  
    })

    // creating middleware to fetch user

    const fetchUser = async(req,res,next)=>{
                const token= req.header('auth-token');
                if(!token){
                    res.status(401).send({errors:"please auth using valid token"})
                }
                else{
                    try{
                        const data = jwt.verify(token, 'secret_ecom');
                        req.user = data.user;
                        next();

                    }catch(error) {
                        res.status(401).send({errors:"please auth using valid token"})

                    }
                }
    }

    // creating  endpoint  for adding products in cart data
    app.post('/addtocart',fetchUser, async(req,res)=>{
        console.log("Added",req.body.itemId);
        let userData = await Users.findOne({_id:req.user.id});
        userData.cartData[req.body.itemId] +=1;
        // await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
       

        res.send("Added")
        
    })
// creating  endpoint  for remove products in cart data
app.post('/removefromcart', fetchUser,async(req,res)=>{
    console.log("removed", req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

// creating endpoint to get cart data

app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("getCart");
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData);

})
app.listen(port,(error)=>{
    if(!error) {
        console.log("server running on Port "+port)
    }
   else{
        console.log("Error : "+error)
    }
})

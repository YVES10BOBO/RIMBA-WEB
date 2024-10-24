    const port = 4000;
    const express = require("express");
    const app = express();
    const mongoose = require("mongoose");
    const jwt = require("jsonwebtoken");
    const multer = require("multer");
    const path = require("path");
    const cors = require("cors");
// const { type } = require("os");
// middleware
    app.use(express.json());
    app.use(cors());

    // Database connection with MongoDB


    mongoose.connect("mongodb+srv://YVESBOBODEV:MyEcommerceweb@cluster0.bme1f5q.mongodb.net/e-commerce",{
    }).then(() => {
      console.log("MongoDB connected");
    })
    .catch(err => {
      console.error("Error connecting to MongoDB:", err);
    });

    // Define Product schema and model
    
    const productSchema = new mongoose.Schema({
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        new_price: {
            type: Number,
            required: true,
        },
        old_price: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        available: {
            type: Boolean,
            default: true,
        },
    });

    const Product = mongoose.model("Product", productSchema);

  


    // API to check if the server is running
    app.get("/", (req, res) => {
        res.send("Express App is Running");
    });

    // Image storage engine configuration for multer
    const storage = multer.diskStorage({
        destination: './upload/images',
        filename: (req, file, cb) => {
            return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
        }
    });

    const upload = multer({ storage: storage });

    // Serve static images
    app.use('/images', express.static(path.join(__dirname, 'upload/images')));

    // Upload image endpoint
    app.post("/upload", upload.single('product'), (req, res) => {
        res.json({
            success: 1,
            image_url: `http://localhost:${port}/images/${req.file.filename}`
        });
    });

    // Add product endpoint
    app.post('/addproduct', async (req, res) => {
      
        let products = await Product.find({});
        let id;
        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id+1;
        } else {
            id = 1;
        }
        const product = new Product({
            id:id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
        console.log(product);
        await product.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name,
    });
       
    
        })


    // Remove product endpoint or creating api for  deleting product 
    app.post('/removeproduct', async (req, res) => {
        await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed")
        res.json({
            success: true,
            name:req.body.name
        });
    });

    // Get all products endpoint  or API for getting all products
    app.get('/allproducts', async (req, res) => {
        let products = await Product.find({});
        console.log("all products fetched");
        res.json(products);
    });


      // Define User schema and model
      const userSchema = new mongoose.Schema({
        name: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        cartData: {
            type: Object,
            default:{},
            
        },
    });

        const User = mongoose.model("User", userSchema);


    // //  User signup endpoint  

     app.post('/signup', async (req, res) => {
        let check = await User.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "existing found with the same email" });
        }

        let cart = {};
        for(let i=0; i<300; i++){
            cart[i]=0;
        }
        const user = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });
        await user.save();
        const data = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    });

    // User login endpoint

    app.post('/login', async (req, res) => {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            const passCompare = req.body.password === user.password;
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id
                    } 
                }
                const token = jwt.sign(data, 'secret_ecom');
                res.json({ success: true, token });
            } else {
                res.json({ success: false, error: "wrong Password" });
            }
        } else {
            res.json({ success: false, error: "wrong Email Id" });
        }
    });

    // creating end point from  newcollection data

    app.get('/newcollections', async(req,res)=>{
        let products = await Product.find({});
        let newcollection = products.slice(1).slice(-8);
        console.log("NewCollection Fetched");
        res.send(newcollection);
    })

    // creating end point  for popular in women section

    app.get('/popularinwomen', async(req,res)=>{
        let products = await Product.find({category:"women"});
        let popular_in_women = products.slice(0,4);
        console.log("popular in women fetched");
        res.send(popular_in_women);
    })

    // Middleware to fetch user
    const fetchUser = (req, res, next) => {
        const token = req.header('auth-token');
        if (!token) {
            res.status(401).send({ errors: "please auth using valid token" });
        } else {
            try {
                const data = jwt.verify(token, 'secret_ecom');
                req.user = data.user;
                next();
            } catch (error) {
                res.status(401).send({ errors: "please auth using valid token" });
            }
        }
    };

    // Add to cart endpoint
        app.post('/addtocart', fetchUser, async (req, res) => {
            let userData = await User.findOne({ _id: req.user.id });
            userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
            await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
            res.send("Added");
        });

    // Remove from cart endpoint
    app.post('/removefromcart', fetchUser, async (req, res) => {
        let userData = await User.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
        }
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removed");
    });

    // Get cart data endpoint
    app.post('/getcart', fetchUser, async (req, res) => {
        let userData = await User.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    });

    // Start the server
    app.listen(port, (error) => {
        if (!error) {
            console.log("server running on Port " + port);
        } else {
            console.log("Error: " + error);
        }
    });







// const port = 4000;

// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");
// // const port = process.env.PORT || 4000;

// app.use(express.json());
// app.use(cors());

// // Database Connection With MongoDB
// mongoose.connect("mongodb+srv://YVESBOBODEV:MyEcommerceweb@cluster0.bme1f5q.mongodb.net/e-commerce");

// // paste your mongoDB Connection string above with password
// // password should not contain '@' special character


// //Image Storage Engine 
// const storage = multer.diskStorage({
//   destination: './upload/images',
//   filename: (req, file, cb) => {
//     return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//   }
// })
// const upload = multer({ storage: storage })
// app.post("/upload", upload.single('product'), (req, res) => {
//   res.json({
//     success: 1,
//     image_url: `/images/${req.file.filename}`
//   })
// })


// // Route for Images folder
// app.use('/images', express.static('upload/images'));


// // MiddleWare to fetch user from token
// const fetchuser = async (req, res, next) => {
//   const token = req.header("auth-token");
//   if (!token) {
//     res.status(401).send({ errors: "Please authenticate using a valid token" });
//   }
//   try {
//     const data = jwt.verify(token, "secret_ecom");
//     req.user = data.user;
//     next();
//   } catch (error) {
//     res.status(401).send({ errors: "Please authenticate using a valid token" });
//   }
// };


// // Schema for creating user model
// const Users = mongoose.model("Users", {
//   name: { type: String },
//   email: { type: String, unique: true },
//   password: { type: String },
//   cartData: { type: Object },
//   date: { type: Date, default: Date.now() },
// });


// // Schema for creating Product
// const Product = mongoose.model("Product", {
//   id: { type: Number, required: true },
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String, required: true },
//   category: { type: String, required: true },
//   new_price: { type: Number },
//   old_price: { type: Number },
//   date: { type: Date, default: Date.now },
//   avilable: { type: Boolean, default: true },
// });


// // ROOT API Route For Testing
// app.get("/", (req, res) => {
//   res.send("Root");
// });


// // Create an endpoint at ip/login for login the user and giving auth-token
// app.post('/login', async (req, res) => {
//   console.log("Login");
//   let success = false;
//   let user = await Users.findOne({ email: req.body.email });
//   if (user) {
//     const passCompare = req.body.password === user.password;
//     if (passCompare) {
//       const data = {
//         user: {
//           id: user.id
//         }
//       }
//       success = true;
//       console.log(user.id);
//       const token = jwt.sign(data, 'secret_ecom');
//       res.json({ success, token });
//     }
//     else {
//       return res.status(400).json({ success: success, errors: "please try with correct email/password" })
//     }
//   }
//   else {
//     return res.status(400).json({ success: success, errors: "please try with correct email/password" })
//   }
// })


// //Create an endpoint at ip/auth for regestring the user & sending auth-token
// app.post('/signup', async (req, res) => {
//   console.log("Sign Up");
//   let success = false;
//   let check = await Users.findOne({ email: req.body.email });
//   if (check) {
//     return res.status(400).json({ success: success, errors: "existing user found with this email" });
//   }
//   let cart = {};
//   for (let i = 0; i < 300; i++) {
//     cart[i] = 0;
//   }
//   const user = new Users({
//     name: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     cartData: cart,
//   });
//   await user.save();
//   const data = {
//     user: {
//       id: user.id
//     }
//   }

//   const token = jwt.sign(data, 'secret_ecom');
//   success = true;
//   res.json({ success, token })
// })


// // endpoint for getting all products data
// app.get("/allproducts", async (req, res) => {
//   let products = await Product.find({});
//   console.log("All Products");
//   res.send(products);
// });


// // endpoint for getting latest products data
// app.get("/newcollections", async (req, res) => {
//   let products = await Product.find({});
//   let arr = products.slice(0).slice(-8);
//   console.log("New Collections");
//   res.send(arr);
// });


// // endpoint for getting womens products data
// app.get("/popularinwomen", async (req, res) => {
//   let products = await Product.find({ category: "women" });
//   let arr = products.splice(0, 4);
//   console.log("Popular In Women");
//   res.send(arr);
// });

// // endpoint for getting womens products data
// app.post("/relatedproducts", async (req, res) => {
//   console.log("Related Products");
//   const {category} = req.body;
//   const products = await Product.find({ category });
//   const arr = products.slice(0, 4);
//   res.send(arr);
// });


// // Create an endpoint for saving the product in cart
// app.post('/addtocart', fetchuser, async (req, res) => {
//   console.log("Add Cart");
//   let userData = await Users.findOne({ _id: req.user.id });
//   userData.cartData[req.body.itemId] += 1;
//   await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
//   res.send("Added")
// })


// // Create an endpoint for removing the product in cart
// app.post('/removefromcart', fetchuser, async (req, res) => {
//   console.log("Remove Cart");
//   let userData = await Users.findOne({ _id: req.user.id });
//   if (userData.cartData[req.body.itemId] != 0) {
//     userData.cartData[req.body.itemId] -= 1;
//   }
//   await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
//   res.send("Removed");
// })


// // Create an endpoint for getting cartdata of user
// app.post('/getcart', fetchuser, async (req, res) => {
//   console.log("Get Cart");
//   let userData = await Users.findOne({ _id: req.user.id });
//   res.json(userData.cartData);

// })


// // Create an endpoint for adding products using admin panel
// app.post("/addproduct", async (req, res) => {
//   let products = await Product.find({});
//   let id;
//   if (products.length > 0) {
//     let last_product_array = products.slice(-1);
//     let last_product = last_product_array[0];
//     id = last_product.id + 1;
//   }
//   else { id = 1; }
//   const product = new Product({
//     id: id,
//     name: req.body.name,
//     description: req.body.description,
//     image: req.body.image,
//     category: req.body.category,
//     new_price: req.body.new_price,
//     old_price: req.body.old_price,
//   });
//   await product.save();
//   console.log("Saved");
//   res.json({ success: true, name: req.body.name })
// });


// // Create an endpoint for removing products using admin panel
// app.post("/removeproduct", async (req, res) => {
//   await Product.findOneAndDelete({ id: req.body.id });
//   console.log("Removed");
//   res.json({ success: true, name: req.body.name })
// });

// // Starting Express Server
// app.listen(port, (error) => {
//   if (!error) console.log("Server Running on port " + port);
//   else console.log("Error : ", error);
// });
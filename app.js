require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const nodeMailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
const jwt = require("jsonwebtoken");
var cors = require('cors');



const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(session({
  secret: "Our little secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

 app.use(cors());

mongoose.connect("mongodb+srv://admin-juniorsnow14:alto1017@pogieecluster.knjcu.mongodb.net/userDB", { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
   username: {
   type: String,
   unique: true
 },
 password: String,
 nickname: {
   type: String,
   unique: true
 },
 points: Number,
 level: String,
 status: String,
 subID: String,
 priceID: String,
 customerID: String,
 hideMode: Boolean,
 easyMode: Boolean,
 normalMode: Boolean,
 hardMode: Boolean,
});


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy(

));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());







const transporter2 = nodeMailer.createTransport({
 service: "Gmail",
   auth: {
      user: process.env.USER_MAIL_KEY,
      pass: process.env.PASS_MAIL_KEY
   }

 });


const JWT_SECRET = process.env.JWT_SECRET;


app.get("/forgot-password", (req, res, next )=>{
  //res.render("forgot-password");
  res.render("forgot-password", {success: req.query.success, error: req.query.error});
});

app.post("/forgot-password", (req, res, next)=>{
  const email = req.body.email;
    let subject = "Email reset";

    // Make sure user exist in database
    User.findOne({ username: req.body.email }, function (err, foundUser) {
      if(err){
        console.log(err);
        res.send("User is not registered");
      }else{
         // do nothing
      }
    });



    // User exist and now create a one time link valid for 15 minutes
  //const secret =  JWT_SECRET + user.password;


  User.findOne({ username: req.body.email }, function (err, foundUser) {
    if(err){
      console.log(err);
      res.redirect("/forgot-password?error=true");
    }else{
      if(!foundUser){
        res.redirect("/forgot-password?error=true");
      }else{
        sendingBoy(foundUser._id)
        console.log(foundUser);
      }


    }
  });




function sendingBoy(newID){
  // User exist and now create a one time link valid for 15 minutes


const secret =  JWT_SECRET;

  const payload  = {
    email: req.body.email,
    id: newID
  }


    const token = jwt.sign(payload, secret, {expiresIn: "15m"});
    const link = "http://www.pogiee.com/reset-password/"+newID+"/"+token;
    const text = "You are receiving this because you (or someone else) have requested the reset of the password of your pogiee account."+
                 "Please click on the following link, or paste this into your browser to complete the process. If you did not request a password "+
                 "reset then contact Pogiee suppoprt."+"\n\n"+link


    const data = {
      email: email,
      subject: subject,
      text: link,
    }

    // setting up email
    const sendMail = (email, subject, link)=> {
     const mailOptions = {
       from: "pogiee.ny@gmail.com",
       to: email,
       subject: subject,
       text: text
     }

     transporter2.sendMail(mailOptions, function(err, data){
        if(err){
          console.log("Error Occurs");
        }else{
          console.log("Message sent!");
        }
     });
   }

   sendMail(email, subject, link);

  //res.send("Password reset link has been sent  to your email.");
  res.redirect("/forgot-password?success=true")
}



});


app.get("/reset-password/:id/:token", (req, res, next)=>{
 const {id, token} = req.params;

 // check if this is exist in database
 User.findOne({ _id: id}, function (err, foundUser) {
   if(err){
     console.log(err);
     res.send("Invalid link");
   }else{
      doTheRest(foundUser.username);
   }
 });


function doTheRest(email){
  // We have a vaild id, and we have a valid user with this id
  const secret = JWT_SECRET;

  try {
   const payload = jwt.verify(token, secret);
   res.render("reset-password", {error: req.query.error, match: req.query.match });
  }catch(error){
   console.log(error.message);
   //res.send(error.message);
   res.send("Invalid link");
  }
}


});


app.post("/reset-password/:id/:token", (req, res, next)=>{
const {id, token} = req.params;
const password = req.body.password;
const password2 = req.body.password2;


// check if this is exist in database
User.findOne({ _id: id}, function (err, foundUser) {
  if(err){
    console.log(err);
    res.send("Invalid link");
  }else{
      stage3();
  }
});

function stage3(){
  const secret = JWT_SECRET;

  try {
    const payload = jwt.verify(token, secret, function(err, decoded){
      if (err) {
      console.log(err);

   }else{
     console.log(decoded);
   }
    });
    //validate password and password2 should match
    // we can simply find the user with the payload email and id and finally update with new password
    // alaways hash the password2 before saving
    // user is your result from userschema using mongoose id
    User.findOne({_id: id}, function(err, foundUser){
      if(err){
        console.log(err);
      }else{

        foundUser.setPassword(password, function(err, user){
            if(err){
              console.log(err);
            }else{
              //do nogthing
              user.save();
            }
        });

      // end of else statement
      }
    });

   res.redirect("/login");
  }catch(error){
   console.log(error.message);
   //res.send(error.message);
   res.send("Invalid link");
  }

}


});



app.post("/difficulty", function(req, res){
  if(req.isAuthenticated()){

    const action = req.body.action;
    //console.log(req.body)
    if(action === "easy"){

      User.findOneAndUpdate( {_id: req.user.id} , {easyMode: true, normalMode: false, hardMode: false}, function(err, foundUser){
        if(err){
          console.log(err);
        }else{
            res.json({modeSetting: foundUser.hideMode});
        }

      });

    }else if(action === "normal"){

      User.findOneAndUpdate( {_id: req.user.id} , {easyMode: false, normalMode: true, hardMode: false}, function(err, foundUser){
        if(err){
          console.log(err);
        }else{
            res.json({modeSetting: foundUser.hideMode});
        }

      });


    }else if(action === "hard"){

      User.findOneAndUpdate( {_id: req.user.id} , {easyMode: false, normalMode: false, hardMode: true}, function(err, foundUser){
        if(err){
          console.log(err);
        }else{
            res.json({modeSetting: foundUser.hideMode});
        }

      });

    }



    // end of if statement
  }



});


app.post("/hidemode", function(req, res){
  if(req.isAuthenticated()){

    const action = req.body.action;

   if(action === "on"){

      User.findOneAndUpdate( {_id: req.user.id} , {hideMode: true}, function(err, foundUser){
        if(err){
          console.log(err);
        }else{
            res.json({modeSetting: foundUser.hideMode});
        }

      });
    }else if(action === "off"){

      User.findOneAndUpdate( {_id: req.user.id} , {hideMode: false}, function(err, foundUser){
        if(err){
          console.log(err);
        }else{
            res.json({modeSetting: foundUser.hideMode});
        }

      });

    }





    //end of if statement
  }


});



app.post("/com", function(req, res){

  if(req.isAuthenticated()){

    ajaxISS(req.body.word, process.env.API_KEY1, process.env.API_KEY2);
     // new api request function
     async function ajaxISS(word, key1, key2){

     let errorCounter = 0
       const apiRequstUrl = "https://api.wordnik.com/v4/word.json/"+word+"/audio?useCanonical=false&limit=10&api_key="+key1;
       const response = await fetch(apiRequstUrl);

       try {

         const data = await response.json();
         if(!data[1].fileUrl)
         {
            throw new SyntaxError("NO file On Name!")
         }
         else
         {
           errorCounter = 0
           // asigning data to variables
           const selectedWord = data[0].word;
           const wordAudio = data[1].fileUrl;

           //asigning sound file
           audioUrl = wordAudio;

            res.json({voice: audioUrl});
         }

       }catch(e)
       {
           if(errorCounter !== 30){
             errorCounter ++;
             console.log("API  ERROR / File Not Found: "+e)
             //setTimeout(ajaxISS(word, key1, key2), 1000);
           }else{
             errorCounter = 0;
           }

       }
      // end of funtion
     }


   // end of if statment
  }


});



app.post("/de", function(req, res){


  ajaxD(req.body.word, process.env.API_KEY1, process.env.API_KEY2);

  // new api request function
  async function ajaxD(word, key1, key2){

  let errorCounter = 0
    const apiRequstUrl = "https://api.wordnik.com/v4/word.json/"+word+"/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key="+key1
    const response = await fetch(apiRequstUrl);

    try {

      const data = await response.json();
      if(!data[1].text)
      {
         throw new SyntaxError("NO file On Name!")
      }
      else
      {
        errorCounter = 0
        // asigning data to variables
        const yup = data[1].text;

        res.json({text: yup});

      }

    }catch(e)
    {
        if(errorCounter !== 30){
          errorCounter ++;
          console.log("API  ERROR / File Not Found: "+e)
             //setTimeout(ajaxD(word, key1, key2), 1000);
        }else{
          errorCounter = 0;
        }

    }
   // end of funtion
  }





});




app.get("/faq", function(req, res){
    res.render("faq");
});


app.get("/check", function(req, res){

  const plan = stripe.plans.retrieve(req.user.priceID, function(err, plan){
    if(err){
      console.log(err)
      res.redirect("login");
    }else{

        if(plan.active === false){
         res.redirect("/restart");
       }else if(plan.active === true){
         res.redirect("/game");
        //end of inner else statement
        }

    }

  });

});


app.get("/restart", function(req, res){
if(req.isAuthenticated()){
  User.findOne({ username: req.user.username }, function (err, foundUser) {

    if(err){
      console.log(err)
    }else{

      const paymentMethods = stripe.paymentMethods.list({customer: foundUser.customerID, type: 'card',}, function(err, cards){
        if(err){
          console.log(err)
        }else{

          res.render("restart",{cards: cards.data});
        }
      });

    }
  });
}else{
  res.redirect("/login");
}



});



app.post("/restart", function(req, res){

  if(req.body.hidden.slice(0,4) === "new"){
 console.log(req.body)
    var param = {};
    param.card = {
      number: req.body.creditNumber,
      exp_month: req.body.creditExpires.slice(0,2),
      exp_year: req.body.creditExpires.slice(2),
      cvc: req.body.creditCvc,
    }



    User.findOne({ username: req.user.username }, function (err, foundUser) {
      if(err){
        console.log(err)
      }else{

        stripe.tokens.create(param, function(err, token){
         if(err){
           console.log("err: "+err);
         }if(token){
           console.log("Success: "+JSON.stringify(token, null, 2));
           // calling add card function
           addCardToCustomer(foundUser.customerID, token.id);
           res.redirect("/restart");
         }else{
           console.log("Somethings wrong!");
         }

        });


      }
    });


    var addCardToCustomer = function(customerID, tokenID){
      stripe.customers.createSource(customerID,{source: tokenID} , function(err, card){
       if(err){
         console.log("err: "+err);
       }if(card){
         console.log("Success: "+JSON.stringify(card, null, 2));
       }else{
         console.log("Somethings wrong!");
       }

      });
    }


  }else if(req.body.hidden.slice(0,4) === "card"){
    const cardID = req.body.hidden;

    User.findOne({ username: req.user.username }, function (err, foundUser) {
      if(err){
        console.log(err)
      }else{

        const deleted = stripe.customers.deleteSource(
           foundUser.customerID,
            cardID,
          );

        res.redirect("/restart");

      }
    });

  }else if(req.body.hidden.slice(0,5) === "start"){

    const subscription = stripe.subscriptions.retrieve(req.user.subID);

    stripe.subscriptions.update(req.user.subID, {
        cancel_at_period_end: false,
        proration_behavior: 'create_prorations',

      });

      User.findByIdAndUpdate(req.user.id, { status: "Active" }, function(err, foundUser){
        if(err){
          console.log(err)
        }
        else{
          if(foundUser){
             res.redirect("/restart");
          }
        }
      });
 }

});


app.get("/", function(req, res){

  res.render("home", {content: "Spell Better"});
});

app.get("/register", function(req, res){

  res.render("register", {content: "Sign up",  error: req.query.error});
});


app.get("/login", function(req, res){
//Incorrect username or password.

res.render("login", {content: "Log In", error: req.query.error});

});

app.get("/game", function(req, res){
 if(req.isAuthenticated()){

  User.findById(req.user.id, function (err, foundUser) {
       if(err){
         console.log(err)
       }else{
         res.render("game", {content: "Welcome to Pogiee!", mode: req.user.hideMode, easyMode: req.user.easyMode, normalMode: req.user.normalMode, hardMode: req.user.hardMode,});
       }
  });

  //res.render("game", {content: "Welcome to Pogiee!"});

 }
 else{
  res.redirect("/login");
 }

});


app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/login");
});


app.get("/profile", function(req, res){
  let nextLevelPoints = 0;
  let nextLevel = "";

  if(req.isAuthenticated()){
    const plan = stripe.plans.retrieve(req.user.priceID, function(err, plan){
      if(err){
        console.log(err)
        res.render("login");
      }else{

          if(plan.active === false){
           res.render("/restart");
         }else if(plan.active === true){

           User.findById(req.user.id, function(err, foundUser){
             if(err){
               console.log(err)
             }
             else{
               if(foundUser){
                if(foundUser.level === "Newbie"){
                  nextLevelPoints = 1000;
                  nextLevel = "Novice";

                }else if(foundUser.level === "Novice"){
                  nextLevelPoints = 2000;
                  nextLevel = "Amateur";
                }else if(foundUser.level === "Amateur"){
                  nextLevelPoints = 3000;
                  nextLevel = "Exceptional";
                }else if(foundUser.level === "Exceptional"){
                  nextLevelPoints = 4000;
                  nextLevel = "Scholar";
                }else if(foundUser.level === "Scholar"){
                  nextLevelPoints = 5000;
                  nextLevel = "Lengendary";
                }else if(foundUser.level === "Lengendary"){
                  nextLevelPoints = 6000;
                  nextLevel = "Mythic";
                }else if(foundUser.level === "Mythic"){
                  nextLevelPoints = 7000;
                  nextLevel = "Big Brain";
                }else if(foundUser.level === "Big Brain"){
                  nextLevelPoints = 0;
                  nextLevel = "?";
                }else{
                  console.log("Error: sonething wrong with level");
                }

                 res.render("profile", {
                   username: foundUser.nickname,
                    email: foundUser.username,
                    points: foundUser.points,
                    level: foundUser.level,
                    next: nextLevelPoints,
                    nextLevel: nextLevel,
                  });
               }
             }
           });

          //end of inner else statement
          }

      }

    });


  }
  else{
   res.redirect("/login");
  }


});


app.get("/terms", function(req, res){

  res.render("terms");
});

app.get("/privacy", function(req, res){

  res.render("privacy");
});


app.get("/cookies", function(req, res){

  res.render("cookies");
});

app.get("/support", function(req, res){

  res.render("support");
});

app.get("/about", function(req, res){

  res.render("about");
});

app.get("/account", function(req, res){
  if(req.isAuthenticated()){

           const plan = stripe.plans.retrieve(req.user.priceID, function(err, plan){
             if(err){
               console.log(err)
               res.render("login");
             }else{

                 if(plan.active === false){
                  res.render("/restart");
                }else if(plan.active === true){
                   let activeMessage1 = ""
                   let activeMessage2 = "subscription is already active!"

                   let cancelMessage1 = ""
                   let cancelMessage2 = "subscription is already canceled!";


                      if(req.user.status === "Active"){
                        res.render("account", {activeMessage: activeMessage2, cancelMessage: cancelMessage1, nameError: req.query.uerror, emailError: req.query.nerror});
                      }else if(req.user.status === "Canceled"){
                        res.render("account", {activeMessage: activeMessage1, cancelMessage: cancelMessage2, nameError: req.query.uerror, emailError: req.query.nerror});
                      }

                 //end of inner else statement
                 }

             }

           });


  }
  else{
   res.redirect("/login");
  }

});


// code for mailer
const auth = {
  auth: {
     api_key: process.env.MAIL_SECRET_KEY,
     domain: process.env.MAIL_DOMAIN
  }
}

const transporter = nodeMailer.createTransport(mailGun(auth));


//APP.POST's
app.post("/support", function(req, res){
  let email = req.body.email;
  let subject = "To support";
  let text = req.body.message;

  const data = {
    email: email,
    subject: subject,
    text: text,
  }


  const sendMail = (email, subject, text)=> {
   const mailOptions = {
     from: email,
     to: "pogiee.ny@gmail.com",
     subject: subject,
     text: text
   }

   transporter.sendMail(mailOptions, function(err, data){
      if(err){
        consoel.log("Error Occurs");
      }else{
        console.log("Message sent!");
      }
   });
 }

 sendMail(email, subject, text);

  res.redirect("/support");
});

app.post("/register", function(req, res){
  const productId = process.env.PRODUCT_ID;
  const priceId = process.env.PRICE_ID;
  const stripeToken = req.body.stripeToken;
  const customerEmail = req.body.stripeEmail;
  const customerName = req.body.customerName;
  let databaseID;


 User.register({username: req.body.username, nickname: req.body.nickname, points: 0, level: "Newbie", status: "Active", hideMode: false, easyMode: false, normalMode: true, hardMode: false}, req.body.password, function(err, user){
       if(err){
         console.log(err)
         res.redirect("/register?error=true");
       }
       else{
          createCustomer(priceId, stripeToken, customerEmail, customerName, user._id);
          passport.authenticate("local")(req, res, function(){
            res.redirect("/game");
          });
       }
 });


});


//Post to Login Page
app.post("/login", function(req, res){

  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

     User.findOne({ username: req.body.username}, function (err, foundUser) {
                if(err){
                   console.log(err)
                }else{
                     if(!foundUser){

                       res.redirect("/login?error=true");
                     }else if(foundUser){

                       const plan = stripe.plans.retrieve(foundUser.priceID, function(err, plan){
                         if(err){
                           console.log(err)
                           res.render("login");
                         }else{

                               req.login(user, function(err){
                                 if(err){
                                   console.log(err);
                                 }
                                 else{

                                     passport.authenticate("local", { failureRedirect: "/login?error=true"})(req, res, function(){

                                       res.redirect("/check");
                                     });

                                 }
                                 // end of login function
                               });

                         }

                       });

                     }
                 // end of first else statement
                }
             // and of user find function
            });


 // end of login post route
});




app.post("/points", function(req, res){
let currentPoints = req.user.points;
let points = req.body.points;
let level = "";
let data = req.body;

const newPoints = currentPoints + points;

if(newPoints >= 0 && newPoints < 1000){
 level = "Newbie";
}else if(newPoints >= 1000 && newPoints < 2000){
  level = "Novice";
}else if(newPoints >= 2000 && newPoints < 4000){
  level = "Amateur";
}else if(newPoints >= 4000 && newPoints < 6000){
  level = "Exceptional";
}else if(newPoints >= 6000 && newPoints < 9000){
  level = "Scholar";
}else if(newPoints >= 9000 && newPoints < 1300){
  level = "Lengendary";
}else if(newPoints >= 13000 && newPoints < 17000){
  level = "Mythic";
}else if(newPoints >= 25000){
  level = "Big Brain";
}


  User.findByIdAndUpdate(req.user.id, {points: newPoints, level: level}, function(err, foundUser){
    if(err){
      console.log(err)
    }
    else{
      if(foundUser){
         res.redirect("/game");
      }
    }
  })


});


app.post("/account", function(req, res){
const buttonPressed = req.body.btn;

if(buttonPressed === "red"){

       if(req.user.status === "Canceled"){
          // do nothing
          res.redirect("/account");
       }else if(req.user.status === "Active"){

         stripe.subscriptions.update(req.user.subID, {cancel_at_period_end: true});

         User.findByIdAndUpdate(req.user.id, { status: "Canceled" }, function(err, foundUser){
           if(err){
             console.log(err)
           }
           else{
             if(foundUser){
                res.redirect("/account");
             }
           }
         });


       }



  }else if(buttonPressed === "green"){
        if(req.user.status === "Active"){
          // do othing
          res.redirect("/account");
        }else if(req.user.status === "Canceled"){
          const subscription = stripe.subscriptions.retrieve(req.user.subID);

          stripe.subscriptions.update(req.user.subID, {
              cancel_at_period_end: false,
              proration_behavior: 'create_prorations',

            });

            User.findByIdAndUpdate(req.user.id, { status: "Active" }, function(err, foundUser){
              if(err){
                console.log(err)
              }
              else{
                if(foundUser){
                   res.redirect("/account");
                }
              }
            });


        }

      }else if(buttonPressed === "email"){

        User.findByIdAndUpdate(req.user.id, { username: req.body.email }, function(err, foundUser){
          if(err){
            console.log(err)
            res.redirect("/account?nerror=true");
          }
          else{
            if(foundUser){
               res.redirect("/account");
            }
          }
        });

      }else if(buttonPressed === "username"){

        // adding username to profile
        User.findByIdAndUpdate(req.user.id, { nickname: req.body.username }, function(err, foundUser){
          if(err){
            console.log(err)
            res.redirect("/account?uerror=true");
          }
          else{
            if(foundUser){
               res.redirect("/account");
            }
          }
        });

      }else{
        console.log(error);
      }


});



let port = process.env.PORT;

if(port == null || port == "") {
    port = 3000;
  }




app.listen(port, function(){
  console.log("Sever has started successfully.");
});

// Stripe functions

//1# Create customer
const createCustomer = async (priceId, stripeToken, customerEmail, customerName, databaseID) => {
    const CUSTOMER_EMAIl = customerEmail;
    const CUSTOMER_SOURCE = stripeToken;
    const CUSTOMER_NAME = customerName;

    const customer = await stripe.customers.create({
        email: CUSTOMER_EMAIl,
        source: CUSTOMER_SOURCE,
        name: CUSTOMER_NAME,
    });

  subscribeCustomerToPlan(customer.id, priceId, databaseID);
}

// set point


// 4# Subscribe a Customer to a Plan
const subscribeCustomerToPlan = async (customerId, priceId, databaseID) => {
    const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price: priceId,
          quantity: 1,
        }],
        trial_from_plan: true,
    });


   User.findByIdAndUpdate(databaseID, { subID: subscription.id, priceID: subscription.plan.id, customerID: customerId}, function(err, foundUser){
     if(err){
       console.log(err)
     }
     else{
       if(foundUser){
          // do nothing
       }
     }
   });

// end of subscribeCustomerToPlan function
}


// If wrong password function
function wrongpassword(){
  errFlag = true;
}

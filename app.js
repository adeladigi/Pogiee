
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

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin-juniorsnow14:alto1017@pogieecluster.knjcu.mongodb.net/userDB", { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
 email: String,
 password: String,
 nickname: String,
 points: Number,
 level: String,
 status: String,
 subID: String,
 priceID: String,
 customerID: String
});


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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

  }


});


app.get("/", function(req, res){

  res.render("home", {content: "Spell Better"});
});

app.get("/register", function(req, res){

  res.render("register", {content: "Sign up"});
});

app.get("/login", function(req, res){

  res.render("login", {content: "Log In"});
});

app.get("/game", function(req, res){
 if(req.isAuthenticated()){
   res.render("game", {content: "Welcome to Pogiee!"});
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
    let activeMessage1 = ""
    let activeMessage2 = "subscription is already active!"

    let cancelMessage1 = ""
    let cancelMessage2 = "subscription is already canceled!"


       if(req.user.status === "Active"){
         res.render("account", {activeMessage: activeMessage2, cancelMessage: cancelMessage1});
       }else if(req.user.status === "Canceled"){
         res.render("account", {activeMessage: activeMessage1, cancelMessage: cancelMessage2});
       }

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
})

app.post("/register", function(req, res){
  const productId = process.env.PRODUCT_ID;
  const priceId = process.env.PRICE_ID;
  const stripeToken = req.body.stripeToken;
  const customerEmail = req.body.stripeEmail;
  const customerName = req.body.customerName;
  let databaseID;


 User.register({username: req.body.username, nickname: req.body.nickname, points: 0, level: "Newbie", status: "Active"}, req.body.password, function(err, user){
       if(err){
         console.log(err)
         res.redirect("/register");
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

                       res.redirect("/login");
                     }else if(foundUser){

                       const plan = stripe.plans.retrieve(foundUser.priceID, function(err, plan){
                         if(err){
                           console.log(err)
                           res.render("login");
                         }else{

                             if(plan.active === "false"){
                              res.render("test");
                             }else{

                               req.login(user, function(err){
                                 if(err){
                                   console.log(err);
                                 }
                                 else{
                                     passport.authenticate("local")(req, res, function(){

                                       res.redirect("/game");
                                     });

                                 }

                               });
                             //end of inner else statement
                             }

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
let points = 90;
let level = "";
let data = req.body;

const newPoints = currentPoints + 100;

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
          }
          else{
            if(foundUser){
               res.redirect("/account");
            }
          }
        });

      }else if(buttonPressed === "username"){

        User.findByIdAndUpdate(req.user.id, { nickname: req.body.username }, function(err, foundUser){
          if(err){
            console.log(err)
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

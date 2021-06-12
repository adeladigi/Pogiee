const plan = stripe.plans.retrieve("price_1IwpSgJuBewLEj8dciuVUIHm", function(err, plan){
  if(err){
    console.log(err)
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





var createCustomer = function(){
  var  param = {};
  param.email = "mike@gmail.com";
  param.name = "Mike";
  param.description = "from node";

  stripe.customers.create(param, function(err, customer){
   if(err){
     console.log("err: "+err);
   }if(customer){
     console.log("Success: "+customer);
   }else{
     console.log("Somethings wrong!");
   }

  });

}

var retrieveCustomer = function(){
  stripe.customers.retrieve("cus_Ja0Ijxjx1ITjcV", function(err, customer){
   if(err){
     console.log("err: "+err);
   }if(customer){
     console.log("Success: "+JSON.stringify(customer, null, 2));
   }else{
     console.log("Somethings wrong!");
   }

  });

}

//retrieveCustomer();

var createToken = function(){

  var param = {};
  param.card = {
    number: "4242424242424242",
    exp_month: 2,
    exp_year: 2024,
    cvc: "212"
  }

  stripe.tokens.create(param, function(err, token){
   if(err){
     console.log("err: "+err);
   }if(token){
     console.log("Success: "+JSON.stringify(token, null, 2));
   }else{
     console.log("Somethings wrong!");
   }

  });
}

//createToken();

var addCardToCustomer = function(){
  stripe.customers.createSource("cus_Ja0Ijxjx1ITjcV",{source: "tok_1IwqdHJuBewLEj8dKiiGgI18"} , function(err, card){
   if(err){
     console.log("err: "+err);
   }if(card){
     console.log("Success: "+JSON.stringify(card, null, 2));
   }else{
     console.log("Somethings wrong!");
   }

  });
}

//addCardToCustomer();

var chargeCustomerThroughCustomerID = function(){

  var param = {
    amount: "299",
    currency: "usd",
    description: "First payment",
    customer: "cus_Ja0Ijxjx1ITjcV"
  }

  stripe.charges.create(param, function(err, charge){
   if(err){
     console.log("err: "+err);
   }if(charge){
     console.log("Success: "+JSON.stringify(charge, null, 2));
   }else{
     console.log("Somethings wrong!");
   }

  });
}

//chargeCustomerThroughCustomerID()

var chargeCustomerThroughTokenID = function(){

  var param = {
    amount: "299",
    currency: "usd",
    description: "First payment",
    source: "tok_1IwrFRJuBewLEj8dUJKcTEsw"
  }

  stripe.charges.create(param, function(err, charge){
   if(err){
     console.log("err: "+err);
   }if(charge){
     console.log("Success: "+JSON.stringify(charge, null, 2));
   }else{
     console.log("Somethings wrong!");
   }

  });
}

//chargeCustomerThroughTokenID();



var getAllCustomers = function(){


  stripe.customers.list({limit: 1}, function(err, customers){
   if(err){
     console.log("err: "+err);
   }if(customers){
     console.log("Success: "+JSON.stringify(customers.data, null, 2));
   }else{
     console.log("Somethings wrong!");
   }

  });
}



//another
stripe.customers.create({
email: "jenny@gmail.com",
source: stripeToken,
}, function(err, customer) {
  console.log(err)
  console.log(customer)
  if(err){
    res.send({
      success: false,
      message: "ERROR"
    })
  }else{
   const { id } = customer;
   stripe.subscriptions.create({
     customer: id,
     items: [
       {
         plan: "prod_JZzRWL7th9ov0Y",
       }
     ]
   }, function(err, subscription){
        console.log(err)
        console.log(subscription)
        if(err){
          res.send({
            success: false,
            message: "ERROR"
          })
        }else{
          res.send({
            success: true,
            message: "SUCCESS"
          })
        }
   });
  }
});






///full scope
User.findOne({ username: req.body.username}, function (err, foundUser) {
     if(err){
       console.log(err)
     }else{

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
});

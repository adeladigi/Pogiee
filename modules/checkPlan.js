




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




       // current setup
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

                                 req.login(user, function(err){
                                   if(err){
                                     console.log(err);
                                   }
                                   else{
                                       passport.authenticate("local")(req, res, function(){

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

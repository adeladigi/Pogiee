




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

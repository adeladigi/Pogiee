




       const plan = stripe.plans.retrieve(req.user.priceID, function(err, plan){
         if(err){
           console.log(err)
           res.render("login");
         }else{

             if(plan.active === false){
              res.render("/restart");
            }else if(plan.active === true){


             //end of inner else statement
             }

         }

       });

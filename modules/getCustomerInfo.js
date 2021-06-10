


var retrieveCustomer = function(){
  stripe.customers.retrieve("cus_JdonKHTZ1ibhlh", function(err, customer){
   if(err){
     console.log("err: "+err);
   }if(customer){
     console.log("Success: "+JSON.stringify(customer, null, 2));
     console.log(customer);
   }else{
     console.log("Somethings wrong!");
   }

  });

}

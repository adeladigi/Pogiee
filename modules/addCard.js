
// create token function
var createToken = function(number, exp_month, exp_year, cvc){
  var param = {};
  param.card = {
    number: number,
    exp_month: exp_month,
    exp_year: exp_year,
    cvc: cvc
  }

  stripe.tokens.create(param, function(err, token){
   if(err){
     console.log("err: "+err);
   }if(token){
     console.log("Success: "+JSON.stringify(token, null, 2));
     // calling add card function
     addCardToCustomer("cus_JeqKq2F0LYQqTW", token.id);
   }else{
     console.log("Somethings wrong!");
   }

  });
}



// add card function
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

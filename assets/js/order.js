$.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
);
/*
$("#order-form").validate({
  rules: {
  	credit-card: {
  		regex: "^[0-9]{4}\ ?[0-9]{4}\ ?[0-9]{4}\ ?[0-9]{4}$" },
    phone: {
      required: true,
      phoneUS: true
    }
  }
});
*/



$(document).ready(() => {

$("#order-form").validate({
  rules: {
    // simple rule, converted to {required:true}
    'credit-card':{
      required: true,
      regex: "^[0-9]{4}\ ?[0-9]{4}\ ?[0-9]{4}\ ?[0-9]{4}$"
    },
    // compound rule
    'first-name' : {
    	required:true,
    	minlength:2
    },
    'last-name' : {
    	required:true,
    	minlength:2
    },
    phone: {
      required: true,
      phoneUS: true
    },
    email: {
      required: true,
      email: true
    },
    'credit-card-expiry':{
      required: true,
      regex: "^(1[0-2]|0[1-9])\/[0-9][0-9]$"
    }    
  },
  messages: {
  	'credit-card':
  	{ 
  		regex:"Le format de votre numéro de carte est invalide." 
  	},
  	'credit-card-expiry':
  	{ 
  		regex:"La date d’expiration de votre carte de crédit est invalide." 
  	}
  }
});

});

var productsInformatations;


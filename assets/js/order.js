$.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
);

$(document).ready(() => {

$("#order-form").validate({
  submitHandler: function(form) {
    // do other things for a valid form
    // save command id
    var orderNum = localStorage.getItem("orderNum");
	
		if(orderNum==null)
			orderNum= 0;
		else
			orderNum=parseInt(orderNum);
		
    orderNum++;
    
		localStorage.setItem("orderNum",orderNum);
    form.action="./confirmation.html?name="+document.getElementById("first-name").value+" "+document.getElementById("last-name").value+"&orderNum="+orderNum;

    form.submit();
  },
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
  		regex:"Veuillez fournir un numéro de carte de crédit valide." 
  	},
  	'credit-card-expiry':
  	{ 
  		regex:"La date d'expiration de votre carte de crédit est invalide." 
  	}
  }
});

});

var productsInformatations;


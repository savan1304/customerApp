var service = {};

var customersList =[
	{id:1,name:'Vivek',email:'vivek@abc.com',phone:'2356422433', address:'India'},
	{id:2,name:'Pratistha',email:'pari@abc.com',phone:'28896422433', address:'India'},
	{id:3,name:'Samridh',email:'samar@abc.com',phone:'2889rr22433', address:'India'},
	{id:4,name:'Vishal',email:'vishal@abc.com',phone:'28899822433', address:'India'}
];

service.getCustomers = function(){
	return customersList;
}

service.addCustomer = function(customer){
	customer.id = Math.floor(Math.random()*10000000);
	customersList.push(customer)
	return {result:'success', msg:"customer added ok."};
}

service.updateCustomer = function(customer){
	for (var i = 0; i < customersList.length; i++) {
		if(customersList[i].id == customer.id){
			 customersList[i] = customer;
			 break;
		}
	}
	return {result:'success', msg:"customer updated ok."};
}

service.searchCustomer = function(field,text){
	var tempList = [];
	for (var i = 0; i < customersList.length; i++) {
		if(customersList[i][field].toLowerCase().startsWith(text.toLowerCase())){
			 tempList.push(customersList[i]);
		}
	}
	return tempList;
}

service.deleteCustomer = function(id){
	var tempList = [];
	for (var i = 0; i < customersList.length; i++) {
		if(customersList[i].id != id){
			tempList.push(customersList[i]);
		}
	}
	customersList = tempList;
	return {result:'success', msg:"customer deleted ok."};
}

service.getCustomerById = function(id){
	var customer = {};
	for (var i = 0; i < customersList.length; i++) {
		if(customersList[i].id == id){
			return customersList[i];
		}
	}
	return customer;
}

module.exports = service;
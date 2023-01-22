var express = require('express');
var router = express.Router();
var customerService = require('../service/customer-service');
var customerMysql = require('../service/customer-mysql');
var customerMongo = require('../service/customer-mongo');
var studentService = require('../service/student-service');
var studentMysql = require('../service/student-mysql');
var studentMongo = require('../service/student-mongo');

// /api
router.get('/', function(req, res, next) {
  res.send('api url is  /');
});

//   /api/customer
router.get('/customer', function(req, res, next) {
	var callback = function(data){
		 res.send(data);
	}
 	//customerMysql.getCustomers(callback);
 	customerMongo.getCustomers(callback);
});
router.get('/companies', function(req, res, next) {
	var callback = function(data){
		 res.send(data);
	}
 	//customerMysql.getCustomers(callback);
 	customerMongo.getCompaniesPromise(callback);
});
//   post /api/customer
router.post('/companies', function(req, res, next) {
	var callback = function(data){
		res.send(data);
	}
  	customerMongo.addCompanies(req.body,callback);
});
router.put('/companies', function(req, res, next) {
	var callback = function(data){
		res.send(data);
	}
  	customerMongo.updateCompanies(req.body,callback);
});
router.delete('/companies', function(req, res, next) {
	var callback = function(data){
		res.send(data);
	}
	console.log(req.body.name);
  	customerMongo.deleteCompanies(req.body.name,callback);
});

//   /api/customer
router.get('/customer/:field/:searchTxt', function(req, res, next) {
  	var callback = function(data){
		res.send(data);
	}
  customerMongo.getCustomersBySearch(req.params.field, req.params.searchTxt,callback)
});

//   /api/customer/:id
router.get('/customer/:id', function(req, res, next) {
	var callback = function(data){
		res.send(data);
	}
	customerMongo.getCustomerById(req.params.id,callback);
});

//   post /api/customer
router.post('/customer', function(req, res, next) {
	var callback = function(data){
		res.send(data);
	}
  	customerMongo.addCustomer(req.body,callback);
});

//   delete /api/customer
router.delete('/customer', function(req, res, next) {
	var callback = function(data){
		res.send(data);
	}
  	customerMongo.deleteCustomer(req.body.id,callback);
});

//  put /api/customer
router.put('/customer', function(req, res, next) {
	var callback = function(data){
		res.send(data);
	}
  	customerMongo.updateCustomer(req.body,callback);
});




//   /api/student
router.get('/students', function(req, res, next) {
	var callback = function(data){
		 res.send(data);
	}
 	//studentMysql.getStudents(callback);
 	studentMongo.getStudents(callback);
});

//   /api/student
router.get('/student/:field/:searchTxt', function(req, res, next) {
  	var callback = function(data){
		res.send(data);
	}
  studentMongo.getStudentsBySearch(req.params.field, req.params.searchTxt,callback)
});

//   /api/student/:id
router.get('/student/:id', function(req, res, next) {
	var callback = function(data){
		res.send(data);
	}
	studentMongo.getStudentById(req.params.id,callback);
});

//   post /api/student
router.post('/student', function(req, res, next) {
	var callback = function(data){
		res.send(data);
	}
  	studentMongo.addStudent(req.body,callback);
});

//   delete /api/student
router.delete('/student', function(req, res, next) {
	var callback = function(data){
		res.send(data);
	}
  	studentMongo.deleteStudent(req.body.id,callback);
});

//  put /api/student
router.put('/student', function(req, res, next) {
	var callback = function(data){
		res.send(data);
	}
  	studentMongo.updateStudent(req.body,callback);
});





module.exports = router;

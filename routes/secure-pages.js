var express = require('express');
var customerService = require('../service/customer-service');
var customerMysql = require('../service/customer-mysql');
var customerMongo = require('../service/customer-mongo');
var studentService = require('../service/student-service');
var studentMysql = require('../service/student-mysql');
var studentMongo = require('../service/student-mongo');
var router = express.Router();


router.get('/companies', function(req, res, next) {
	var callback = function(data){
		res.render('companies', { title: 'companies',data:data});
	}
	customerMongo.getCompaniesPromise(callback);
	//customerMysql.getCustomers(callback);
	//res.render('customers', { title: 'Customers',data:customerService.getCustomers()});
  
  });
router.get('/dashboard', function(req, res, next) {
  res.render('index', { title: 'Dashboard' });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About' });
});

router.get('/customer', function(req, res, next) {
  var callback = function(data){
  	res.render('customers', { title: 'Customers',data:data});
  }
  customerMongo.getCustomers(callback);
  //customerMysql.getCustomers(callback);
  //res.render('customers', { title: 'Customers',data:customerService.getCustomers()});

});

router.get('/customer/add', function(req, res, next) {
  res.render('add-customer', { title: 'Add Customer' });
});

router.get('/customer/edit/:id', function(req, res, next) {
	var callback = function(data){
  		res.render('edit-customer', { title: 'Update Customer',customer:data});
	}
	customerMongo.getCustomerById(req.params.id,callback);
});

//   /api/customer
router.get('/customer/:field/:searchTxt', function(req, res, next) {
	var callback = function(data){
		res.render('customers', { title: 'Customers',data:data});
	}
	customerMongo.getCustomersBySearch(req.params.field, req.params.searchTxt,callback);
});





router.get('/student', function(req, res, next) {
	var callback = function(data){
		res.render('students', { title: 'Students',data:data});
	}
	studentMongo.getStudents(callback);
	//studentMysql.getStudents(callback);
	//res.render('students', { title: 'Students',data:studentService.getStudents()});
  
  });
  
  router.get('/student/add', function(req, res, next) {
	res.render('add-student', { title: 'Add Student' });
  });
  
  router.get('/student/edit/:id', function(req, res, next) {
	  var callback = function(data){
			res.render('edit-student', { title: 'Update Student',student:data});
	  }
	  studentMongo.getStudentById(req.params.id,callback);
  });
  
  //   /api/student
  router.get('/student/:field/:searchTxt', function(req, res, next) {
	  var callback = function(data){
		  res.render('students', { title: 'Students',data:data});
	  }
	  studentMongo.getStudentsBySearch(req.params.field, req.params.searchTxt,callback);
  });

module.exports = router;

var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'smartant',
  database        : 'nodejs'
});
 
var service = {};

service.getCustomers = function(callback){
  pool.query('SELECT * from customer', function (error, results, fields) {
    if (error) {
      callback([]);
      throw error;
    }else{
      callback(results);
    }
  });
}
/*
service.getCustomers = async function(){
  var customers = [];
  await new Promise((resolve, reject) => {
  	pool.query('SELECT * from customer', function (error, results, fields) {
  	if (error) {
  		customers = [];
  		resolve();
  		throw error;
  	}else{
  		customers = results;
  		resolve();
  	}
	});
  });
 return customers;
}
*/
service.addCustomer = function(customer, callback) {
	new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
        if(err) { console.log(err); 
        	callback({result:"fail", msg:'customer addition failed.'});
        	 }
          connection.query("INSERT INTO customer set ? ",customer, function(err, results) {
          if(err){
           console.log("Error Selecting : %s ",err );
           callback({result:"fail", msg:'customer addition failed.'});
          }else{
           callback({result:"success", msg:'customer added ok.'})
         }
      });
    });
    });
};

service.deleteCustomer =  function(id,callback){
  var sql = "delete FROM customer where id='"+id+"'";
  console.log("sql:"+sql);
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback({result:"fail"});}
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback({result:"fail"}); }
      callback({result:"success"}) ;
    });
  });
};
service.getCustomerById = function(id,callback){
  var record = {};
  var sql = "SELECT * FROM customer where id='"+id+"'";
  console.log("sql:"+sql);
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback({}); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback({}); return; }
      if(results.length == 0){
        callback(record);
      }
      callback(results[0]);
    });
  });
};

service.updateCustomer = function(customer,callback){
         pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback({result:"fail"}); return; }
        connection.query("UPDATE customer set ? WHERE id = ? ",[customer,customer.id], function(err, results) {
          if(err){
           console.log("Error Selecting : %s ",err );
           callback({result:"fail"});
          }else{
           callback({result:"success"});
         }
      });
    });
};

service.getCustomersBySearch = function(field, searchText, callback) {
  var recordList = [];
  var sql = "SELECT * FROM customer where "+field+" like '%"+searchText+"%'";
  console.log("sql:"+sql);
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback({}); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback({}); return; }
      if(results.length == 0){
        callback(recordList);
      }else{
        callback(results);
      }
    });
  });
};

module.exports=service;
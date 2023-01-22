var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

//var Promise = require("node-promise").Promise;

var service= {};
var dbName = 'nodejs';
const url = 'mongodb://localhost:27017';


//create
service.addCompanies = function(record,callback) {
  if(record.name == "" || record.name == undefined){
    callback({result:'Name Mandatory'});
    return;
  }
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('companies');
    collection.insertMany([record],function(err,result){
      callback({result:'success'});
    });
    client.close();
  });
}
service.addEmployee = function(record,callback) {
  if(record.firstName == "" || record.firstName == undefined){
    callback({result:'firstName Mandatory'});
    return;
  }
  if(record.lastName == "" || record.lastName == undefined){
    callback({result:'lastName Mandatory'});
    return;
  }
  if(record.company == "" || record.company == undefined){
    callback({result:'company Mandatory'});
    return;
  }

  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('employee');
    collection.insertMany([record],function(err,result){
      callback({result:'success'});
    });
    client.close();
  });
}
//read
service.getCompaniesPromise = function(){
  return new Promise((resolve, reject) => {
    //
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('companies').find().toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        resolve(result);
      });
    client.close();
  });
    //
    });
};
service.getEmployeePromise = function(){
  return new Promise((resolve, reject) => {
    //
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('employee').find().toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        resolve(result);
      });
    client.close();
  });
    //
    });
};
//update
service.updateCompanies = function(companies,callback){
  if(companies.name == "" || companies.name == undefined){
    callback({result:'Name Mandatory'});
    return;
  }
  let name = companies.name;
  delete(companies.name);
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
  assert.equal(null, err);
  const db = client.db(dbName);
  const collection = db.collection('companies');
  collection.updateOne({"name" : ObjectId(name)},{ $set: companies },function(err,result){
    callback({result:'success'});
  });
  client.close();
});
};
service.updateEmployee = function(employee,callback){
  if(employee.firstName == "" || employee.firstName == undefined){
    callback({result:'firstName Mandatory'});
    return;
  }
  if(employee.lastName == "" || employee.lastName == undefined){
    callback({result:'lastName Mandatory'});
    return;
  }
  if(employee.company == "" || employee.company == undefined){
    callback({result:'company Mandatory'});
    return;
  }
  let firstName = employee.firstName;
  delete(employee.firstName);
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
  assert.equal(null, err);
  const db = client.db(dbName);
  const collection = db.collection('companies');
  collection.updateOne({"firstName" : ObjectId(firstName)},{ $set: employee },function(err,result){
    callback({result:'success'});
  });
  client.close();
});
};
//delete
service.deleteCompanies = function(name,callback){
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('companies');
    collection.deleteOne({"name" : { $lt: name } },function(err,result){
      callback({result:'success'});
    });
    client.close();
  });
};
service.deleteEmployee = function(firstName,callback){
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('employee');
    collection.deleteOne({"firstName" : { $lt: firstName } },function(err,result){
      callback({result:'success'});
    });
    client.close();
  });
};




service.getCustomersPromise = function(){
  return new Promise((resolve, reject) => {
    //
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').find().toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        resolve(result);
      });
    client.close();
  });
    //
    });
};

service.getCustomers = function(callback){
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    console.log(">>>",db)
      db.collection('customers').find().toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        callback(result);
      });
    client.close();
  });
};

service.getCustomerById = function(id,callback){
  var record = {};
    console.log(">> getCustomerById "+ id);
    MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').find({"_id" : ObjectId(id)}).toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        callback(result[0]);
      });
    client.close();
  });
};

service.addCustomer = function(record,callback) {
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('customers');
    collection.insertMany([record],function(err,result){
      callback({result:'success'});
    });
    client.close();
  });
}

service.deleteCustomer = function(id,callback){
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('customers');
    collection.deleteOne({"_id" : ObjectId(id)},function(err,result){
      callback({result:'success'});
    });
    client.close();
  });
};

service.updateCustomer = function(customer,callback){
    let id = customer.id;
    delete(customer.id);
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('customers');
    collection.updateOne({"_id" : ObjectId(id)},{ $set: customer },function(err,result){
      callback({result:'success'});
    });
    client.close();
  });
};

service.getCustomersBySearch = function(field,searchText,callback){
    var records = [];
    //searhObject[searchParam.field] = "/"+searchParam.searchword+"/i";
    //console.log("search ==> "+JSON.stringify(searchParam));
    console.log("field:"+field);
    console.log("searchText:"+searchText);

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').find({[field]:{'$regex' : searchText, '$options' : 'i'}}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        callback(result);
      });
    client.close();
  });
}
//sqlService.getCustomersBySearch(searchParam,callback);
service.getCustomersBySearchOLD = function(searchParam,callback){
    var records = [];
    //searhObject = {searchParam.field: '//i'}
    MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').find({name: /vivek/i}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        callback(result);
      });
    client.close();
  });
}

module.exports=service;

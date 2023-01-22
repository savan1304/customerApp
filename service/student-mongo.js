var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

//var Promise = require("node-promise").Promise;

var service= {};
var dbName = 'nodejs';
const url = 'mongodb://localhost:27017';

service.getStudentsPromise = function(){
  return new Promise((resolve, reject) => {
    //
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('students').find().toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        resolve(result);
      });
    client.close();
  });
    //
    });
};

service.getStudents = function(callback){
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
	console.log(">>>db",db)
      db.collection('students').find().toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        callback(result);
      });
    client.close();
  });
};

service.getStudentById = function(id,callback){
  var record = {};
    console.log(">> getStudentById "+ id);
    MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('students').find({"_id" : ObjectId(id)}).toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        callback(result[0]);
      });
    client.close();
  });
};

service.addStudent = function(record,callback) {
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('students');
    collection.insertMany([record],function(err,result){
      callback({result:'success'});
    });
    client.close();
  });
}

service.deleteStudent = function(id,callback){
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('students');
    collection.deleteOne({"_id" : ObjectId(id)},function(err,result){
      callback({result:'success'});
    });
    client.close();
  });
};

service.updateStudent = function(student,callback){
    let id = student.id;
    delete(student.id);
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('students');
    collection.updateOne({"_id" : ObjectId(id)},{ $set: student },function(err,result){
      callback({result:'success'});
    });
    client.close();
  });
};

service.getStudentsBySearch = function(field,searchText,callback){
    var records = [];
    //searhObject[searchParam.field] = "/"+searchParam.searchword+"/i";
    //console.log("search ==> "+JSON.stringify(searchParam));
    console.log("field:"+field);
    console.log("searchText:"+searchText);

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('students').find({[field]:{'$regex' : searchText, '$options' : 'i'}}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        callback(result);
      });
    client.close();
  });
}
//sqlService.getCustomersBySearch(searchParam,callback);
service.getStudentsBySearchOLD = function(searchParam,callback){
    var records = [];
    //searhObject = {searchParam.field: '//i'}
    MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('students').find({name: /vivek/i}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        callback(result);
      });
    client.close();
  });
}

module.exports=service;
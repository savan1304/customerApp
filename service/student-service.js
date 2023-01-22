var service = {};

var studentsList =[
	{id:1,name:'Sagar',classname:'12',parentname:'Mukesh', schoolname:'st. xavirous', subject: 'Maths'},
	{id:2,name:'Ravi',classname:'10',parentname:'Bhavesh', schoolname:'st. xavirous', subject: 'English'},
	{id:3,name:'Vivek',classname:'11',parentname:'Dipak', schoolname:'st. xavirous', subject: 'Geography'},
	{id:4,name:'Raj',classname:'10',parentname:'Samir', schoolname:'st. xavirous', subject: 'Anatomy'},
	
];

service.getStudents = function(){
	return studentsList;
}

service.addStudent = function(student){
	student.id = Math.floor(Math.random()*10000000);
	studentsList.push(student)
	return {result:'success', msg:"student added ok."};
}

service.updateStudent = function(student){
	for (var i = 0; i < studentsList.length; i++) {
		if(studentsList[i].id == student.id){
			 studentsList[i] = student;
			 break;
		}
	}
	return {result:'success', msg:"student updated ok."};
}

service.searchStudent = function(field,text){
	var tempList = [];
	for (var i = 0; i < studentsList.length; i++) {
		if(studentsList[i][field].toLowerCase().startsWith(text.toLowerCase())){
			 tempList.push(studentsList[i]);
		}
	}
	return tempList;
}

service.deleteStudent = function(id){
	var tempList = [];
	for (var i = 0; i < studentsList.length; i++) {
		if(studentsList[i].id != id){
			tempList.push(studentsList[i]);
		}
	}
	studentsList = tempList;
	return {result:'success', msg:"student deleted ok."};
}

service.getStudentById = function(id){
	var student = {};
	for (var i = 0; i < studentsList.length; i++) {
		if(studentsList[i].id == id){
			return studentsList[i];
		}
	}
	return student;
}

module.exports = service;
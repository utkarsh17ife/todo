(function() {

app = angular.module("todo",[]);

app.controller('MainController',MainController)
.service('TodoService',TodoService)
.constant('ApiBasePath', "https://todoserver.herokuapp.com");
//.constant('ApiBasePath', "http://127.0.0.1:5000");


MainController.$inject = ['TodoService'];
function MainController (TodoService){
	var ctrl = this;
	ctrl.items = [];

	ctrl.init = function(){
		var promise = TodoService.getItems();	
		promise.then(function(response){
			ctrl.items = response.data;
			console.log(ctrl.items);
		});
	}
	ctrl.init();
	ctrl.addItem = function(){
		var promise = TodoService.insertItems(ctrl.newItem);
		promise.then(function(){
			ctrl.init();
			ctrl.newItem = "";
		})
	};
	ctrl.taskDone = function(index){
		var updateObj = {
		uPropName : "status",
		uPropValue : "done",
		id : ctrl.items[index]._id
		};
		var promise = TodoService.updateItems(updateObj);
		promise.then(function(response){
			console.log(response)
			ctrl.init();
		});
	}
};

TodoService.$inject = ['$http','ApiBasePath'];
function TodoService($http,ApiBasePath){
	var service = this;
	var item = [];

	service.insertItems = function(newItem){	
		var newItem = {"name":newItem};
		var response = $http.post(ApiBasePath + "/" ,newItem);
		return response;
	};

	service.getItems = function(){
		var response = $http.get(ApiBasePath);
		return response;
	};	

	service.updateItems = function(updateObj){
		var response = $http.put(ApiBasePath + "/", updateObj);
		return response;
	}

};


})();

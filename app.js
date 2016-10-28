(function() {

app = angular.module("todo",[]);

app.controller('MainController',MainController)
.service('TodoService',TodoService)
.constant('ApiBasePath', "https://todoserver.herokuapp.com");

MainController.$inject = ['TodoService'];
function MainController (TodoService){
	var ctrl = this;
	
	ctrl.items = TodoService.viewItems();

	ctrl.addItem = function(){
		TodoService.insertItems(ctrl.newItem);
		ctrl.newItem = "";
	}

	ctrl.callToServer = function(){
		console.log("call to server controller");
		TodoService.getItems();
	}

};


TodoService.$inject = ['$http','ApiBasePath'];
function TodoService($http,ApiBasePath){
	var service = this;
	var items = [];

	// todo.insertItems = function(newItem){
	// 	$http.get(ApiBasePath ,function(data){

	// 	})
	// 	items.push(newItem);
	// };
	service.getItems = function(){
		var response = $http({
          method: "GET",
          url: (ApiBasePath + "/"),
        }).then(function (response){
        	console.log(response);	
        });
        
	};
	
	service.viewItems = function(){
		return items;
	};
};


})();
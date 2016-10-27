(function() {

app = angular.module("todo",[]);

app.controller('MainController',MainController)
.service('todoService',todoService);

MainController.$inject = ['todoService'] 
function MainController (todoService){
	var ctrl = this;
	
	ctrl.items = todoService.viewItems();

	ctrl.addItem = function(){
		todoService.insertItems(ctrl.newItem);
		ctrl.newItem = "";
	}
};


function todoService(){
	var todo = this;
	var items = [];

	todo.insertItems = function(newItem){
		items.push(newItem);
	};

	todo.viewItems = function(){
		return items;
	};
};


})();
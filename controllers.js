var app = angular.module('MyApp',[
	'ngRoute'

	]);


app.config(function($routeProvider,$locationProvider, $httpProvider){


	$httpProvider.defaults.withCredentials = true;

	$routeProvider
	.when('/',{
		templateUrl:'home.html'
	})
	.when('/about',{
		templateUrl: 'about.html'
	})
	.when('/people',{
		templateUrl: 'people.html'
	})
	.otherwise({
		redirectTo:'/'
	});

});



app.controller('MyController', function($scope, $http){
	$scope.serverResponse = [];
	$scope.users = [];
	//$http.defaults.headers.post["Content-Type"] = "application/json";


	$scope.addUser = function (){

		$http.post('/simple/add', {email: $scope.email, fullName: $scope.fullName, age: $scope.age})
			.then(function(response){
				$scope.serverResponse = response.data
				console.log('Added User! : ')

			}, function(response){
				
				console.log('MyController.addUser(): Error Occured' + response)

			});
		

	};

	$scope.deleteUser = function (){

		if($scope.email != '')
		{
			$http.post('/simple/delete',{email: $scope.email})
			.then(function(response){
				
				$scope.serverResponse = response.data


				$http.post('/simple/getAll',{})
				.then(function(response){
					
					$scope.serverResponse = response.data;
					$scope.users = response.data;

				});


			}, function(response){
				
				console.log('MyController.deleteUser(): Error Occured' + response)

			});
		}
		

	};


	$scope.getAllUsers = function (){

		$http.post('/simple/getAll',{})
		.then(function(response){
			
			$scope.serverResponse = response.data;
			$scope.users = response.data;

		}, function(response){
			
			console.log('MyController.getAllUsers(): Error Occured' + response)

		});

	};


	// $scope.sendPost = function(){
		

	// 	var config = 
	// 	{
	// 		withCredentials: true,
	// 		headers:{
	// 					'Authorization': 'Basic',
 //                		'Accept': 'application/json',
 //                		'Content-Type': 'application/json' 
 //            		},
 //            transformRequest: angular.identity
 //        };

	// 	var dataObj = { 
	// 			msg : $scope.data,
	// 			state : $scope.state,
	// 			isFirst : false
	// 	};	

	// 	var data2send =  JSON.stringify(dataObj);


	// 	$http.post('/api/test' ,data2send,config)
	// 	.then(function(response){
	// 		// expects a JSON response 
	// 		$scope.data2 = response.data

	// 	}, function(response){

	// 		console.log('BAD!! :Error Occured' + response)

	// 	});
	// };


	// $scope.sendGet = function(){
		

	// 	var config = 
	// 	{
	// 		withCredentials: true,
	// 		headers:{
	// 					'Authorization': 'Basic',
 //                		'Accept': 'application/json',
 //                		'Content-Type': 'application/json' 
 //            		},
 //            transformRequest: angular.identity
 //        };

	// 	var dataObj = { 
	// 			msg : $scope.data,
	// 			state : "$scope.state",
	// 			isFirst : false
	// 	};	

	// 	var data2send =  JSON.stringify(dataObj);


	// 	$http.get('/api/test')
	// 	.then(function(response){
	// 		// expects a JSON response 
	// 		$scope.data2 = response.data

	// 	}, function(response){
			
	// 		console.log('Error Occured' + response)

	// 	});
	// };





	
});
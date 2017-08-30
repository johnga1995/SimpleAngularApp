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

app.controller('httpTesting', function($scope, $http){
	$scope.data2 = [];
	//$http.defaults.headers.post["Content-Type"] = "application/json";

	$scope.sendPost = function(){
		

		var config = 
		{
			withCredentials: true,
			headers:{
						'Authorization': 'Basic',
                		'Accept': 'application/json',
                		'Content-Type': 'application/json' 
            		},
            transformRequest: angular.identity
        };

		var dataObj = { 
				msg : $scope.data,
				state : $scope.state,
				isFirst : false
		};	

		var data2send =  JSON.stringify(dataObj);


		$http.post('/api/test' ,data2send,config)
		.then(function(response){
			// expects a JSON response 
			$scope.data2 = response.data

		}, function(response){

			console.log('BAD!! :Error Occured' + response)

		});
	};


	$scope.sendGet = function(){
		

		var config = 
		{
			withCredentials: true,
			headers:{
						'Authorization': 'Basic',
                		'Accept': 'application/json',
                		'Content-Type': 'application/json' 
            		},
            transformRequest: angular.identity
        };

		var dataObj = { 
				msg : $scope.data,
				state : "$scope.state",
				isFirst : false
		};	

		var data2send =  JSON.stringify(dataObj);


		$http.get('/api/test')
		.then(function(response){
			// expects a JSON response 
			$scope.data2 = response.data

		}, function(response){
			
			console.log('Error Occured' + response)

		});
	};


	
});
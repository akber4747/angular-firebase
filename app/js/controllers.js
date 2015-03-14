'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function(){

 }])
   .controller('WaitlistController', ['$scope', 'partyService', function($scope, partyService){
      // Connet $scope.parties to live Firebase data
   	$scope.parties = partyService.parties; 
      // Object to store data from the waitlist form
      // adding done property to this object (also change in SaveParty funciton)
   	$scope.newParty = {name: '', phone : '', size: '', done: false, notified: 'No'};
      // Function to save new parties to the waitlist
   	$scope.saveParty = function(){
         partyService.saveParty($scope.newParty);
         $scope.newParty = {name: '', phone : '', size: '', done: false, notified: 'No'};
   	};
      // Function to send a text message to a party
      $scope.sendTextMessage = function(party){

      };
      }])
      .controller('AuthController',['$scope', 'authService', function($scope, authService){


         // Object bound to inputs on the register and login pages
         $scope.user = {email:'', password: ''};
         // method to register new user using authService (services.js)
         $scope.register = function(){
            authService.register($scope.user);

         };
         // method to login user using authService (services.js)
         $scope.login = function(){
            authService.login($scope.user);
         };
         // method to logout user using authService (services.js)

         $scope.logout = function(){
            authService.logout();
            // auth.$logout();
            // $location.path('/#');
            // // redirect users to landing page
         };
      }]);
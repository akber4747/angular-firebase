'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
// .value('FIREBASE_URL', 'http://waitandeat-akber.firebaseio.com/parties')
.value('FIREBASE_URL', 'http://waitandeat-akber.firebaseio.com/')
.factory('partyService', function($firebase, FIREBASE_URL){
	var partiesRef = new Firebase(FIREBASE_URL + '/parties');  	
   	var parties = $firebase(partiesRef);

   	var partyServiceObject = {
   		saveParty: function(party){
   			parties.$add(party);
   			
   		}

   	};
   	return partyServiceObject;
})
.factory('textMessageService', function(FIREBASE_URL){
     var textMessageRef = new Firebase(FIREBASE_URL + '/textMessages');
     var textMessages = $firebase(textMessageRef);
     // new object
     var newTextMessage = {
        phoneNumber: party.phone,
        size: party.size,
        name: party.name
     };
     textMessages.$add(newTextMessage);
     party.notified = 'Yes';
     $scope.parties.$save(party.$id);	
})
.factory('authService', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL){
	var AuthRef = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(AuthRef);
	var authServiceObject = {
		register: function(user){

            auth.$createUser(user.email, user.password).then(function(data){
               // .then handles success
                  console.log(data);
                  authServiceObject.login(user);

            });				
		
		},		
		login: function(user){
			auth.$login('password', user).then(function(data){
               console.log(data);
               $location.path('/waitlist');
               //redirect users to /waitlist 
            });
		},
		logout: function(){
			auth.$logout();
            $location.path('/#');
            // redirect users to landing page
		}

	};
	$rootScope.$on("$firebaseSimpleLogin:login", function(e, user){
		console.log("User " + user.id + " successfully logged in!");
		// Save currentUser on our rootScope
		$rootScope.currentUser = user;
	});
	$rootScope.$on("$firebaseSimpleLogin:logout", function(){
		// set currentUser to null (user not logged in)
		$rootScope.currentUser = null;
	});	
	return authServiceObject;
});

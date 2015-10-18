angular.module('hostelApp.controllers', [])

.controller('DashCtrl', function($rootScope, $scope, $localstorage, OrganizationsFactory) {

   var localActiveOrg = $localstorage.getObject('activeOrg');
    if(localActiveOrg == null || localActiveOrg === "\"undefined\""){
        $scope.selectedOrg = {};
    } else {
      $scope.selectedOrg = localActiveOrg;
      console.log("fetching from local storage : " + $scope.selectedOrg);
    }

    // ------------------------------------------------------------------

    $scope.organizationsList = [];
    $scope.promise = OrganizationsFactory.all(); 

    $scope.promise
    .then(
      function(data){
        
        var jsonString = JSON.stringify(data);
        $scope.organizationsList = JSON.parse(jsonString);
       
      }, function(error){
          console.log(error);
      });
    // ------------------------------------------------------------------
    $scope.selectCurrentOrg = function() {
      $localstorage.setObject('activeOrg', $scope.selectedOrg);
    };
    // ------------------------------------------------------------------

})

.controller('CustomersCtrl', function($scope, Chats) {
  /* For list of customers */

  $scope.customers = Chats.all();
  $scope.settings = {
    enableFriends: true
  };


  $scope.sortType     = 'name'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.searchKey   = '';     // set the default search/filter term
  
  // create the list of sushi rolls 
  $scope.sushi = [
    { name: 'Cali Roll', fish: 'Crab', tastiness: 2 },
    { name: 'Philly', fish: 'Tuna', tastiness: 4 },
    { name: 'Tiger', fish: 'Eel', tastiness: 7 },
    { name: 'Rainbow', fish: 'Variety', tastiness: 6 }
  ];
  

})

.controller('CustomerDetailsCtrl', function($scope, $stateParams, Camera) {
/* For individual customer */


  $scope.testDate = new Date('02-19-1990');

  $scope.getPhoto = function() {
    console.log('Getting camera');
    Camera.getPicture({
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    }).then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    });
    
/*    navigator.camera.getPicture(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
    }, { 
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
    });*/
    
  }


})

.controller('SettingsCtrl', function($scope, Chats) {

  $scope.settings = Chats.all();
  $scope.currentOrg = {
    enableFriends: true
  };
})

.controller('OrganizationsCtrl', function($scope, $timeout,  OrganizationsFactory) {

    $scope.organizationsList = [];
    $scope.promise = OrganizationsFactory.all(); 

    $scope.promise
    .then(
      function(data){
        
        // $scope.organizationsList = data;
        var jsonString = JSON.stringify(data);
        $scope.organizationsList = JSON.parse(jsonString);

        
      }, function(error){
          alert(error);
      });
})


.controller('OrganizationDetailsCtrl', function($scope, $stateParams, OrganizationsFactory) {

    $scope.currentOrganization = {
      name : "Benoy",
      address1 : "Kerala"
    };
    
    $scope.promise = OrganizationsFactory.getOrgById($stateParams.orgId); 
    $scope.promise
    .then(
      function(data){
        if(data.length > 0){
        var jsonString = JSON.stringify(data[0]);
        $scope.currentOrganization = JSON.parse(jsonString);
        }


       }, function(error){
          alert(error);
      });
  
    // $scope.saveOrganizationDetails = function(){
    //   alert($stateParams.orgId);
    // }

  $scope.saveOrganizationDetails = function(){
    OrganizationsFactory.saveOrganization($scope.currentOrganization);
  };
})

.controller('RoomsCtrl', function($scope, RoomsFactory) {

  $scope.rooms = RoomsFactory.all();
})

.controller('RoomDetailCtrl', function($scope, $stateParams, RoomsFactory) {
  $scope.room = RoomsFactory.getRoomById($stateParams.roomId);
})


;



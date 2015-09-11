angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('CustomersCtrl', function($scope, Chats) {

  $scope.customers = Chats.all();
  $scope.settings = {
    enableFriends: true
  };
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('CustomerDetailsCtrl', function($scope, $stateParams, Chats) {
  $scope.cust = Chats.get($stateParams.roomId);
  $scope.testDate = "02-19-1990";
})


.controller('SettingsCtrl', function($scope, Chats) {


  $scope.settings = Chats.all();
  $scope.currentOrg = {
    enableFriends: true
  };
})

.controller('OrganizationsCtrl', function($scope, OrganizationsFactory) {


  $scope.organizations = OrganizationsFactory.all();
  $scope.currentOrg = {
    enableFriends: true
  };
})

.controller('RoomsCtrl', function($scope, Chats) {

  $scope.rooms = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('RoomDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.room = Chats.get($stateParams.roomId);
})


;

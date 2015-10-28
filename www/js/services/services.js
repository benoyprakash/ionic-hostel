angular.module('hostelApp.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})



.factory('RoomsFactory', function($q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var rooms = [{
    id: 'A1',
    name: '101',
    floor: '1',
    capacity: '2',
    aminities : '2 Bed, Table, Chair, Bath attached',
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRVhEp4GQOTW61L7OwEXsF2kyzjNZvEXWLJe3NxVSn7PxSP-ddKwA'
  }, 
  {
    id: 'A2',
    name: '102',
    floor: '1',
    capacity: '2',
    aminities : '2 Bed, Table, Chair, Bath attached',
    image : 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRu6x0KBDbZSboeC0FJCsXOMwar6XyCJfOuoIiyl8luqhPtiFyd'
  }

  ];

  return {
    all: function() {

      var P_Room = Parse.Object.extend("P_Room");
      var query = new Parse.Query(P_Room);
        query.get({
          success: function(rooms) {
            // The object was retrieved successfully.
            //console.log(JSON.stringify(rooms));
            return rooms;
          },
          error: function(object, error) {
            alert(JSON.stringify(error));
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          }
        });


      return null;

    },
    getRoomById: function(roomId) {

      var deferred = $q.defer();

      var P_Room = Parse.Object.extend("P_Room");
      var query = new Parse.Query(P_Room);
      query.equalTo("roomId", roomId),
        query.get({
          success: function(rooms) {
            // The object was retrieved successfully.
            //console.log(JSON.stringify(rooms));
            return rooms;
          },
          error: function(object, error) {
            alert(JSON.stringify(error));
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          }
        });


      return null;


    }, 
    getRoomByName: function(roomName) {


      var P_Room = Parse.Object.extend("P_Room");
      var query = new Parse.Query(P_Room);
      query.equalTo("roomName", roomName),
        query.get({
          success: function(rooms) {
            // The object was retrieved successfully.
            //console.log(JSON.stringify(rooms));
            return rooms;
          },
          error: function(object, error) {
            alert(JSON.stringify(error));
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          }
        });


      return null;


    }
  };
})


.factory('CustomerFactory', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var customers = [{
    name: 'Benoy',
    address: 'Kerala',
    phone: '654654654'
  }, 
  {
    name: 'Moideen',
    address: 'Kerala',
    phone: '8754412654'
  }

  ];

  return {
    all: function() {

      var P_Customer = Parse.Object.extend("P_Customer");
      var query = new Parse.Query(P_Customer);
        query.get({
          success: function(customers) {
            // The object was retrieved successfully.
            //console.log(JSON.stringify(customers));
            return rooms;
          },
          error: function(object, error) {
            alert(JSON.stringify(error));
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          }
        });


      return null;

    },

    getCustomerByName: function(customerName) {

      var P_Customer = Parse.Object.extend("P_Customer");
      var query = new Parse.Query(P_Customer);
      query.equalTo("name", customerName),
        query.get({
          success: function(customers) {
            // The object was retrieved successfully.
            //console.log(JSON.stringify(customers));
            return customers;
          },
          error: function(object, error) {
            alert(JSON.stringify(error));
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          }
        });

      return null;


    }
  };
})


.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
    $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])


.factory('Camera', ['$q', function($q) {
 
  return {
    getPicture: function(options) {
      var q = $q.defer();
      
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  }
}


]);
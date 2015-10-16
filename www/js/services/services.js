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

.factory('OrganizationsFactory', function($q) {

  var orgs = [{
    id : 1,
    name: 'InnFancy',
    address: 'You on your way',
    phone: '8976431321'
  }, {
    id : 2,
    name: 'Annex',
    address: 'It\'s address',
    phone: '987-000-000-0'
  }];
  
  return {

    // all: function() {
    //   return orgs;
    // },

//[{"address1":"Kerala","address2":"India","address3":"Asia","comments":"Nil","contactPerson":"Benoy","name":"Ramdas","phone":987987987,"objectId":"4OKtlbTSBn","createdAt":"2015-10-16T17:37:19.062Z","updatedAt":"2015-10-16T17:37:19.062Z"}
    all: function() {
    //var defer = $q.defer();

      var P_Organization = Parse.Object.extend("P_Organization");
      var query = new Parse.Query(P_Organization);
      var orgs = 

        query.find({
          success: function(orgList) {
            // The object was retrieved successfully.
            //defer.resolve(organizationsList);
            orgs = orgList;
            return orgList;
          },
          error: function(object, error) {
            alert(JSON.stringify(error));
            //defer.reject(error);

            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          }
        });
      return orgs;
    },


    get: function(orgName) {
      for (var i = 0; i < orgName.length; i++) {
        if (orgs[i].name === orgName) {
          return orgs[i];
        }
      }
      return null;
    }, 
    saveOrganization: function(organization){


        var P_Organization = Parse.Object.extend("P_Organization");
        var p_organization = new P_Organization();


      p_organization.set("name", organization.name);
      p_organization.set("phone", organization.phone);
      p_organization.set("address1", organization.address1);
      p_organization.set("address2", organization.address2);
      p_organization.set("address3", organization.address3);
      p_organization.set("contactPerson", organization.contactPerson);
      p_organization.set("comments", organization.comments);
      console.log("before save"+ JSON.stringify(p_organization));

        p_organization.save(null, {
          success: function(newP_organization) {
            // Execute any logic that should take place after the object is saved.
            console.log('New object created with objectId: ' + newP_organization.id);
            alert("Organization saved successfully.");
          },
          error: function(newP_organization, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            console.log('Failed to create new object, with error code: ' + error.message);
            alert("Failed to save Organization data. Please try again.");
          }
        });
    }
  };
})

.factory('RoomsFactory', function() {
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
            console.log(JSON.stringify(rooms));
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

      var P_Room = Parse.Object.extend("P_Room");
      var query = new Parse.Query(P_Room);
      query.equalTo("roomId", roomId),
        query.get({
          success: function(rooms) {
            // The object was retrieved successfully.
            console.log(JSON.stringify(rooms));
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
            console.log(JSON.stringify(rooms));
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
            console.log(JSON.stringify(customers));
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
            console.log(JSON.stringify(customers));
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
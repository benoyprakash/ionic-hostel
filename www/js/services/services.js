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

.factory('OrganizationsFactory', function() {

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
    all: function() {

      var P_Organization = Parse.Object.extend("P_Organization");
      var query = new Parse.Query(P_Organization);
        query.get({
          success: function(organizations) {
            // The object was retrieved successfully.
            console.log(JSON.stringify(organizations));
            return organizations;
          },
          error: function(object, error) {
            alert(JSON.stringify(error));
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          }
        });


      return null;
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
  },
  {
    id: 'A3',
    name: '103',
    floor: '1',
    capacity: '2',
    aminities : '2 Bed, Table, Chair, Bath attached',
    image : 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTSPlqN3p5AYwxOOlJ0vGvYlzbyZwUW1-ntBbzvSRFGJG1_QSTH'
  },{
    id: 'A4',
    name: '104',
    floor: '1',
    capacity: '2',
    aminities : '2 Bed, Table, Chair, Bath attached',
    image : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTWIdBn5yMGspA3YjwIQkcb5rj6SKMthzt9JP4NJMKRTyojC6f7PA'
  },
  {
    id: 'A5',
    name: '105',
    floor: '1',
    capacity: '3',
    aminities : '3 Bed, Table, Chair, Bath attached',
    image : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSoW12oX4FL1vWQqPNz4NhGOMs39ekEpu8k92ykOt6cXnLXHzUn'
  },
  {
    id: 'B1',
    name: '201',
    floor: '1',
    capacity: '2',
    aminities : '2 Bed, Table, Chair, Bath attached',
    image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv_GWE99rEL6cbG6WIbxdlSJbgtlGjZ-7b2NdTmSQHgMvitlobDA'
  }


  ];

  return {
    all: function() {
      return rooms;
    },
    getRoomById: function(roomId) {
      for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].id === roomId) {
          return rooms[i];
        }
      }
      return null;
    }, 
    getRoomByName: function(roomName) {
      for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].name === roomName) {
          return rooms[i];
        }
      }
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
}])

;

angular.module('hostelApp.roomsfactory', [])

.factory('RoomsFactory', function($q, $ionicLoading) {

    return {

        all: function() {
            var deferred = $q.defer();

            var P_Room = Parse.Object.extend("P_Room");
            var query = new Parse.Query(P_Room);
            query.equalTo("status", "active");
            query.find({
                success: function(roomsList) {
                    // The object was retrieved successfully.
                    deferred.resolve(roomsList);
                },
                error: function(object, error) {
                    deferred.reject(error);
                }
            });

            return deferred.promise;
        },


        getOrgById: function(roomId) {
            var deferred = $q.defer();

            var P_Room = Parse.Object.extend("P_Room");
            var query = new Parse.Query(P_Room);
            query.equalTo("objectId", roomId);
            query.find({
                success: function(room) {
                    // The object was retrieved successfully.
                    deferred.resolve(room);
                },
                error: function(object, error) {
                    deferred.reject(error);
                }
            });

            return deferred.promise;
        },
        saveOrganization: function(room) {
            var deferred = $q.defer();

            var P_Room = Parse.Object.extend("P_Room");
            var p_room = new P_Room();

            p_room.set("rName", room.roomName);
            p_room.set("rNumber", room.roomNumber);
            p_room.set("rFloor", room.phone);
            p_room.set("rComments", room.comments);

            if (room !== null && room.objectId !== null) {
                p_room.set("objectId", room.objectId);

            }

            console.log("before save" + JSON.stringify(p_room));

            p_room.save(null, {
                success: function(newP_room) {
                    deferred.resolve(newP_room);
                    // Execute any logic that should take place after the object is saved.
                    console.log('Object created / updated with objectId: ' + JSON.stringify(newP_room));
                },
                error: function(newP_room, error) {
                    deferred.reject(newP_room);
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    console.log('Failed to create new object, with error code: ' + error.message);
                    alert("Failed to save Organization data. Please try again.");

                }
            });
            return deferred.promise;
        }
    };
});
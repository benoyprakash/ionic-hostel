angular.module('hostelApp.organizationFactory', [])

.factory('OrganizationsFactory', function($q, $ionicLoading) {

  return {

//[{"address1":"Kerala","address2":"India","address3":"Asia","comments":"Nil","contactPerson":"Benoy","name":"Ramdas","phone":987987987,"objectId":"4OKtlbTSBn","createdAt":"2015-10-16T17:37:19.062Z","updatedAt":"2015-10-16T17:37:19.062Z"}
    all: function() {
      
      var deferred = $q.defer();

      var P_Organization = Parse.Object.extend("P_Organization");
      var query = new Parse.Query(P_Organization);
      query.equalTo("status", "active");
        query.find({
          success: function(orgList) {
            // The object was retrieved successfully.
            deferred.resolve(orgList);
          },
          error: function(object, error) {
            deferred.reject(error);
          }
        });

      return deferred.promise;
    },


    getOrgById: function(orgId) {
      var deferred = $q.defer();

      var P_Organization = Parse.Object.extend("P_Organization");
      var query = new Parse.Query(P_Organization);
      query.equalTo("objectId", orgId);      
        query.find({
          success: function(organization) {
            // The object was retrieved successfully.
            deferred.resolve(organization);
          },
          error: function(object, error) {
            deferred.reject(error);
          }
        });

      return deferred.promise;
    }, 
    saveOrganization: function(organization){
      var deferred = $q.defer();

      var P_Organization = Parse.Object.extend("P_Organization");
      var p_organization = new P_Organization();

      p_organization.set("name", organization.name);
      p_organization.set("status", organization.status);
      p_organization.set("phone", organization.phone);
      p_organization.set("address1", organization.address1);
      p_organization.set("address2", organization.address2);
      p_organization.set("address3", organization.address3);
      p_organization.set("contactPerson", organization.contactPerson);
      p_organization.set("comments", organization.comments);
      p_organization.set("logo", organization.logo);

      if(organization !== null && organization.objectId !== null){
          p_organization.set("objectId", organization.objectId);

      } 
      
      console.log("before save"+ JSON.stringify(p_organization));

        p_organization.save(null, {
          success: function(newP_organization) {
            deferred.resolve(newP_organization);
            // Execute any logic that should take place after the object is saved.
            console.log('Object created / updated with objectId: ' + JSON.stringify(newP_organization));
          },
          error: function(newP_organization, error) {
            deferred.reject(newP_organization);
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            console.log('Failed to create new object, with error code: ' + error.message);
            alert("Failed to save Organization data. Please try again.");

          }
        });
      return deferred.promise;
    }, 





    show : function() {
      $ionicLoading.show({
          templateUrl : "templates/loading-spinner.html"        
      });
    },

    hide : function(){
      $ionicLoading.hide();
    }

  };




})
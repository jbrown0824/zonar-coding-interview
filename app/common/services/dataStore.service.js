'use strict';

angular.module('myApp')

  .service('dataStore', [function () {

    return (function () {
      var self = {
        data: {
          users: [],
          books: [],
          wishlists: [],
        },

        init: function () {
          self.initRequestedData('users');
          self.initRequestedData('books');
          self.initRequestedData('wishlists');
        },

        initRequestedData: function (name) {
          self.data[name] = {
            loading: false,
            initialized: false,
            data: [],
          };
        },

        setLoading: function(name) {
          self.data[name].loading = true;
          self.data[name].initialized = true;
        },

        get: function (name) {
          return self.data[name];
        },

        set: function(name, data) {
          self.data[name] = Object.assign(self.data[name], {
            loading: false,
            initialized: true,
            data: data
          });
        }
      };

      self.init();

      return self;
    })();
  }]);
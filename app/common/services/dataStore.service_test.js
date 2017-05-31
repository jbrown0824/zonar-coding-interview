describe('API Service Tests', function() {
  beforeEach(module('myApp.dataStore'));

  var $service;

  beforeEach(inject(function($_service_) {
    $service = $_service_();
  }));

  it('should initialize dataStore data', function() {
    expect($service.data.users.initialized).toEqual(false);
  });

  it('should allow you to initialize a store object', function() {
    $service.initRequestedData('someObject');
    expect($service.data.someObject.initialized).toEqual(false);
    expect($service.data.someObject.loading).toEqual(false);
    expect($service.data.someObject.data).toBeDefined();
  });

  it('should be able to setLoading and initialize the data', function() {
    expect($service.data.users.loading).toEqual(false);
    expect($service.data.users.initialized).toEqual(false);

    $service.setLoading('users');

    expect($service.data.users.loading).toEqual(true);
    expect($service.data.users.initialized).toEqual(true);
  });

  it('should be able to retrieve a data object', function() {
    var object = $service.get('users');
    expect(object.data).toBeDefined();
    expect(object.loading).toEqual(false);
    expect(object.initialized).toEqual(false);
  });

  it('should be able to set the data for a dataStore object', function() {
    expect($service.data.users.data.length).toEqual(0);

    var addedData = [
      { someData: 5 }
    ];

    $service.set('users', addedData);

    expect($service.data.users.data).toEqual(addedData);
  });
});

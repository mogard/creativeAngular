
angular.module('app', [])
  .controller('mainCtrl', mainCtrl)
  .directive('picture', pictureDirective);

function mainCtrl ($scope) {

  $scope.picturesInfo = [];
  var info = [];
  
  $scope.getPictures = function(){
      $scope.picturesInfo = [];
      info = [];
      console.log($scope.picture.keywords);
      var keywords = $scope.picture.keywords;
      var baseURL = "https://api.unsplash.com/photos/random/?client_id=823f2017b30d701074d78b09403882d2dab40b2cfdf528f013561bade64981ec&h=800&w=800&count=10&query=";
      var url = baseURL + keywords;
      $.getJSON(url,function(data){
        console.log(data);
        $.each(data, function(i, item) {
            var picture = data[i];
	    info.push({
               pictureURL:picture.urls.small,
               author:picture.user.name,
               downloadURL:picture.links.download + "/?force=true",
            });
        });
	$scope.$apply(function(){
	$scope.picturesInfo = info;
      });
        console.log($scope.picturesInfo);      
      });
       

  };


 };



function pictureDirective () {
  return {
    scope: {
      pictureInfo: '='
    },
    restrict: 'E',
    replace: 'true',
    template: (
      '<div class="Picture">' +
        '<img ng-src="{{pictureInfo.pictureURL}}" />' +
        '<h4>By {{pictureInfo.author}}</h4>' + 
        '<h4><a ng-href="{{pictureInfo.downloadURL}}">Download</a></h4>' +
      '</div>'
    ), 
  };

};


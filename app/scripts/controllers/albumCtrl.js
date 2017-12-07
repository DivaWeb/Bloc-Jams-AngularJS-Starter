(function(){
  function albumCtrl(){
    this.albumData = albumPicasso;
  }

  angular
      .module('blocJams')
      .controller('albumCtrl', albumCtrl);
})();

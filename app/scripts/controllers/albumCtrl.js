(function(){
  function albumCtrl(Fixtures){
  this.albumData = Fixtures.getAlbum();
  }

  angular
      .module('blocJams')
      .controller('albumCtrl', albumCtrl);
      .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();

(function(){
  function albumCtrl(Fixtures, SongPlayer){
  this.albumData = Fixtures.getAlbum();
  this.songPlayer = SongPlayer;
  }

  angular
      .module('blocJams')
      .controller('albumCtrl', ['Fixtures', 'SongPlayer', albumCtrl]);
})();

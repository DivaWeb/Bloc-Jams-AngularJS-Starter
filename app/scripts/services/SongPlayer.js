(function() {
    function SongPlayer(Fixtures) {
         var SongPlayer = {};

         /**
         *@desc to store album information
         *@type {Object}
         */

         var currentAlbum = Fixtures.getAlbum();
         /**
        *@desc Buzz object audio file
        *@type {Object}
        */
         var currentBuzzObject = null;

         /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */

         var setSong = function(song) {
         if (currentBuzzObject) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
        }
        currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

       SongPlayer.currentSong = song;
       };

       /**
      *@function playSong
      *@desc Plays current song and set the playing property to true
      *@param song
       **/

       var playSong = function(song){
       if(currentBuzzObject){
       currentBuzzObject.play();
       song.playing = true;
       }
     };

     var getSongIndex = function(song){
       return currentAlbum.songs.indexOf(song);
     };

     /**
     * @desc Active song object from list of songs
     * @type {Object}
     */
       SongPlayer.currentSong = null;

           /**
          *@function  play
          *@desc determines if song is playing or not
           *@param song
           **/

         SongPlayer.play = function(song) {
           song = song || SongPlayer.currentSong;
           if (SongPlayer.currentSong !== song) {
           setSong(song);

         currentBuzzObject.play();
          song.playing = true;
       }else if (SongPlayer.currentSong === song) {
          if (currentBuzzObject.isPaused()) {
           playSong(song);
      }
    }
};


       /**
      *@function  pause
      *@desc pauses song
      *@param song
      **/
      SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;

     };

     /**
    *@function  previous
    *@desc move to previous song

    **/

     SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;

     if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
     }else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
       }
     };
         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();

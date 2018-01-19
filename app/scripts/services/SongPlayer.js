(function() {
    function SongPlayer($rootScope, Fixtures) {
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

      currentBuzzObject.bind('timeupdate', function(){
        $rootScope.$apply(function(){
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
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

      /**@function playSong
      *@desc Plays current song and set the playing property to true
      *@param songs
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
       *@desc Cureent playback time (in seconds) of currently playing song
       *@type {number}
       */

       SongPlayer.currentTime = null;

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
        stopSong(song);
     }else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
       }
     };

     /**
    *@function  next
    *@desc move to next song

    **/

     SongPlayer.next = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex++;

     if (currentSongIndex.length > song) {
          stopSong();
     }else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
       }
     };

     /**
     *@function setCurrentTime
     *@desc Set current time (in seconds) of currently playing songs
     *@param {number} currentTime
     */
     SongPlayer.setCurrentTime = function(time) {
       if (currentBuzzObject)  {
         currentBuzzObject.setTime(time);
       }
     };
     var stopSong = function(){

           currentBuzzObject.stop();
           SongPlayer.currentSong.playing = null;

         };


         return SongPlayer;
    };

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();

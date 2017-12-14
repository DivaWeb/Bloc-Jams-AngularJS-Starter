(function() {
    function SongPlayer() {
         var SongPlayer = {};


         /**
        *@desc current song
        *@type {Object}
        */
         var currentSong = null;

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
         currentSong.playing = null;
    }

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
         }

        currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

    currentSong = song;
 };


           /**
          *@function  play
          *@desc determines if song is playing or not
           *@param song
           **/

         SongPlayer.play = function(song) {
           if (currentSong !== song) {
           setSong(song);

         currentBuzzObject.play();
          song.playing = true;
       }else if (currentSong === song) {
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
      currentBuzzObject.pause();
      song.playing = false;

     };
         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();

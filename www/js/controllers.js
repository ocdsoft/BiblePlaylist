angular.module('starter.controllers', [])

.controller('PlayerCtrl', function ($scope, Playlists, $q) {
    var player = document.getElementById('audioPlayer');
    var audioUrl = document.getElementById('tbAudioUrl');
    var progress = document.getElementById('progress');
    var cbRepeat = document.getElementById('cbRepeat');
    $scope.playlists = Playlists.all();
    $scope.audioUrl = "";
    $scope.duration = 0.0;
    $scope.currentTime = 0.0;
    var stopTime = 0.0;
    var playlistIndex = 0;
    var verseQueueIndex = 0;
    var playlistLength = 0;
    var verseQueueLength = 0;
    var prefixVoiceText = '';


    player.addEventListener("timeupdate", function () {
        var currentTime = player.currentTime;
        progress.value = currentTime;
        $scope.currentTime = player.currentTime;
        $scope.duration = player.duration;

        if (stopTime == 0.0)
        {
            stopTime = $scope.duration;
        }

        if (currentTime >= stopTime)
        {
            var queue;
            player.pause();
            verseQueueIndex = verseQueueIndex + 1;
            if (verseQueueIndex < verseQueueLength) {
                queue = $scope.playlists[playlistIndex].verseQueues[verseQueueIndex];
                playQueue(queue);
            }
            else {
                playlistIndex = playlistIndex + 1;

                if (playlistIndex < playlistLength) {
                    var playlist = $scope.playlist[playlistIndex];
                    verseQueueIndex = 0;
                    queue = playlist.verseQueues[verseQueueIndex];
                    playQueue(queue);
                }
                else {
                    if (cbRepeat.checked) {
                        startPlaylist();
                    }
                }
            }
        }
        $scope.$apply();
    });

    progress.addEventListener('change', function () {
        player.pause();
        player.currentTime = this.value;
        player.play();
    });

    progress.addEventListener('input', function () {
        player.pause();
        player.currentTime = this.value;
        player.play();
    });

    $scope.play = function () {
        $scope.audioUrl = audioUrl.value;
        loadPlayer($scope.audioUrl);
        player.play();
    }

    $scope.pause = function () {
        player.pause();
    }

    $scope.stop = function () {
        player.src = "";
        player.load();
    }

    $scope.mark = function () {
        console.log(player.currentTime);
    }

    $scope.speak = function () {
        startPlaylist();
    }

    var startPlaylist = function () {
        playlistLength = $scope.playlists.length;
        playlistIndex = 0;

        if (playlistIndex < playlistLength) {
            var playlist = $scope.playlists[playlistIndex];
            verseQueueIndex = 0;
            prefixVoiceText = playlist.book + ' ' + playlist.chapterText + " " + playlist.chapter.toString() + ' ';
            verseQueueLength = playlist.verseQueues.length;

            if (verseQueueIndex < verseQueueLength) {
                
                    loadPlayer(playlist.audioUrl);
                
                    var queue = playlist.verseQueues[verseQueueIndex];
                    playQueue(queue);
                

            }
        }

    }


    var loadPlayer = function (audioUrl) {
        
        if (player.src != audioUrl) {
            player.src = audioUrl;
            player.load();
            
        }
        
    }

    var playQueue = function (queue) {
        var msg = new SpeechSynthesisUtterance(prefixVoiceText + queue.voiceText);        
        player.currentTime = queue.startTime;
        stopTime = queue.endTime;

        msg.addEventListener('end', function () {
            player.play();
        });

        window.speechSynthesis.speak(msg);
    }

    var playVoiceSynthesis = function (prefixVoiceText, voiceText) {
        var deferred = $q.defer;
        var msg = new SpeechSynthesisUtterance(prefixVoiceText + voiceText);

        window.speechSynthesis.speak(msg);
        
        return deferred.promise;
    }

})

.controller('CuratorCtrl', function ($scope, Playlists, $q) {
    var player = document.getElementById('audioPlayer');
    var audioUrl = document.getElementById('tbAudioUrl');
    var progress = document.getElementById('progress');
    var cbRepeat = document.getElementById('cbRepeat');
    $scope.playlists = Playlists.all();
    $scope.audioUrl = "";
    $scope.duration = 0.0;
    $scope.currentTime = 0.0;
    var stopTime = 0.0;
    var playlistIndex = 0;
    var verseQueueIndex = 0;
    var playlistLength = 0;
    var verseQueueLength = 0;
    var prefixVoiceText = '';


    player.addEventListener("timeupdate", function () {
        var currentTime = player.currentTime;
        progress.value = currentTime;
        $scope.currentTime = player.currentTime;
        $scope.duration = player.duration;

        if (stopTime == 0.0)
        {
            stopTime = $scope.duration;
        }

        if (currentTime >= stopTime)
        {
            player.pause();
            verseQueueIndex = verseQueueIndex + 1;
            if (verseQueueIndex < verseQueueLength) {
                var queue = $scope.playlists[playlistIndex].verseQueues[verseQueueIndex];
                playQueue(queue);
            }
            else {
                playlistIndex = playlistIndex + 1;

                if (playlistIndex < playlistLength) {
                    var playlist = $scope.playlist[playlistIndex];
                    verseQueueIndex = 0;
                    var queue = playlist.verseQueues[verseQueueIndex];
                    playQueue(queue);
                }
                else {
                    if (cbRepeat.checked) {
                        startPlaylist();
                    }
                }
            }
        }
        $scope.$apply();
    });

    progress.addEventListener('change', function () {
        player.pause();
        player.currentTime = this.value;
        player.play();
    });

    progress.addEventListener('input', function () {
        player.pause();
        player.currentTime = this.value;
        player.play();
    });

    $scope.play = function () {
        $scope.audioUrl = audioUrl.value;
        loadPlayer($scope.audioUrl);
        player.play();
    }

    $scope.pause = function () {
        player.pause();
    }

    $scope.stop = function () {
        player.src = "";
        player.load();
    }

    $scope.mark = function () {
        console.log(player.currentTime);
    }

    $scope.speak = function () {
        startPlaylist();
    }
    
    $scope.createNTJson = function () {
        alert('Not Implemented Yet!');
    }

    var startPlaylist = function () {
        playlistLength = $scope.playlists.length;
        playlistIndex = 0;

        if (playlistIndex < playlistLength) {
            var playlist = $scope.playlists[playlistIndex];
            verseQueueIndex = 0;
            prefixVoiceText = playlist.book + ' ' + playlist.chapterText + " " + playlist.chapter.toString() + ' ';
            verseQueueLength = playlist.verseQueues.length;

            if (verseQueueIndex < verseQueueLength) {
                
                    loadPlayer(playlist.audioUrl);
              
                    var queue = playlist.verseQueues[verseQueueIndex];
                    playQueue(queue);
                

            }
        }       

    }


    var loadPlayer = function (audioUrl) {
        
        if (player.src != audioUrl) {
            player.src = audioUrl;
            player.load();           

        }
        
    }

    var playQueue = function (queue) {
        var msg = new SpeechSynthesisUtterance(prefixVoiceText + queue.voiceText);
        
        player.currentTime = queue.startTime;
        stopTime = queue.endTime;

        msg.addEventListener('end', function () {
            player.play();
        });

        window.speechSynthesis.speak(msg);
    }

    var playVoiceSynthesis = function (prefixVoiceText, voiceText) {
        var deferred = $q.defer;
        var msg = new SpeechSynthesisUtterance(prefixVoiceText + voiceText);

        window.speechSynthesis.speak(msg);
        
        return deferred.promise;
    }
    
    

})

.controller('CuratorCtrl', function ($scope, Playlists, $q) {
    var player = document.getElementById('audioPlayer');
    var audioUrl = document.getElementById('tbAudioUrl');
    var progress = document.getElementById('progress');
    var cbRepeat = document.getElementById('cbRepeat');
    $scope.playlists = Playlists.all();
    $scope.audioUrl = "";
    $scope.duration = 0.0;
    $scope.currentTime = 0.0;
    var stopTime = 0.0;
    var playlistIndex = 0;
    var verseQueueIndex = 0;
    var playlistLength = 0;
    var verseQueueLength = 0;
    var prefixVoiceText = '';


    player.addEventListener("timeupdate", function () {
        var currentTime = player.currentTime;
        progress.value = currentTime;
        $scope.currentTime = player.currentTime;
        $scope.duration = player.duration;

        if (stopTime == 0.0)
        {
            stopTime = $scope.duration;
        }

        if (currentTime >= stopTime)
        {
            player.pause();
            verseQueueIndex = verseQueueIndex + 1;
            if (verseQueueIndex < verseQueueLength) {
                var queue = $scope.playlists[playlistIndex].verseQueues[verseQueueIndex];
                playQueue(queue);
            }
            else {
                playlistIndex = playlistIndex + 1;

                if (playlistIndex < playlistLength) {
                    var playlist = $scope.playlist[playlistIndex];
                    verseQueueIndex = 0;
                    var queue = playlist.verseQueues[verseQueueIndex];
                    playQueue(queue);
                }
                else {
                    if (cbRepeat.checked) {
                        startPlaylist();
                    }
                }
            }
        }
        $scope.$apply();
    });

    progress.addEventListener('change', function () {
        player.pause();
        player.currentTime = this.value;
        player.play();
    });

    progress.addEventListener('input', function () {
        player.pause();
        player.currentTime = this.value;
        player.play();
    });

    $scope.play = function () {
        $scope.audioUrl = audioUrl.value;
        loadPlayer($scope.audioUrl);
        player.play();
    }

    $scope.pause = function () {
        player.pause();
    }

    $scope.stop = function () {
        player.src = "";
        player.load();
    }

    $scope.mark = function () {
        console.log(player.currentTime);
    }

    $scope.speak = function () {
        startPlaylist();
    }
    
    $scope.createNTJson = function () {
        alert('Not Implemented Not!');
    }

    var startPlaylist = function () {
        playlistLength = $scope.playlists.length;
        playlistIndex = 0;

        if (playlistIndex < playlistLength) {
            var playlist = $scope.playlists[playlistIndex];
            verseQueueIndex = 0;
            prefixVoiceText = playlist.book + ' ' + playlist.chapterText + " " + playlist.chapter.toString() + ' ';
            verseQueueLength = playlist.verseQueues.length;

            if (verseQueueIndex < verseQueueLength) {
               
                    loadPlayer(playlist.audioUrl);
                
                    var queue = playlist.verseQueues[verseQueueIndex];
                    playQueue(queue);
                

            }
        }

    }


    var loadPlayer = function (audioUrl) {      
        if (player.src != audioUrl) {
            player.src = audioUrl;
            player.load();    

        }
        
    }

    playQueue = function (queue) {
        var msg = new SpeechSynthesisUtterance(prefixVoiceText + queue.voiceText);
        //var promise = playVoiceSynthesis(prefixVoiceText, queue.voiceText);
        player.currentTime = queue.startTime;
        stopTime = queue.endTime;

        msg.addEventListener('end', function () {
            player.play();
        });

        window.speechSynthesis.speak(msg);
    }

    playVoiceSynthesis = function (prefixVoiceText, voiceText) {
        var deferred = $q.defer;
        var msg = new SpeechSynthesisUtterance(prefixVoiceText + voiceText);

        window.speechSynthesis.speak(msg);
        
        return deferred.promise;
    }

})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

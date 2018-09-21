jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                // 'current-time',
                // 'duration'
                // 'mute',
                // 'volume'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = 'files/music/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Franz Krommer: Concerto for Two Clarinets in E-flat, Op. 35, I. Allegro",
                "duration": "Dartmouth Symphony Orchestra; Shannon Draucker and Matthew Boyas, soloists",
                "file": "01 Concerto for Two Clarinets in E-flat, Op. 35_ I. Allegro",
                "artwork": "images/music/krommer.jpg"
            }, {
                "track": 2,
                "name": "Francis Poulenc: Clarinet Sonata, I. Allegro tristamente",
                "duration": "Shannon Draucker, Cory Chang",
                "file": "Poulenc Clarinet Sonata, mvt. 1",
                "artwork": "images/music/SeniorRecitalPoster.jpg"
            }, {
                "track": 3,
                "name": "Francis Poulenc: Clarinet Sonata, II. Romanza",
                "duration": "Shannon Draucker, Cory Chang",
                "file": "Poulenc Clarinet Sonata, mvt. 2",
                "artwork": "images/music/SeniorRecitalPoster.jpg"
            }, {
                "track": 4,
                "name": "Francis Poulenc: Clarinet Sonata, III. Allegro con fuoco",
                "duration": "Shannon Draucker, Cory Chang",
                "file": "Poulenc Clarinet Sonata, mvt. 3",
                "artwork": "images/music/SeniorRecitalPoster.jpg"
              }, {
                  "track": 5,
                  "name": "Gustav Mahler: Symphony No. 5, V. Rondo - Finale. Allegro - Allegro giocoso. Frisch",
                  "duration": "Dartmouth Symphony Orchestra",
                  "file": "05 Mahler_ Symphony No. 5, V. Rondo - Finale. Allegro - Allegro giocoso. Frisch",
                  "artwork": "images/music/DSO_S13Poster_FIN.jpg"
              }],
            buildPlaylist = $(tracks).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <div class="plTitle">' + trackName + '</div> \
                        <div class="plSubtitle">' + trackDuration + '</div> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;

                var art = $('#artwork');
                if (tracks[id].artwork !== '') {
                    art.attr('src', tracks[id].artwork);
                } else {
                    art.attr('src', 'https://s3.amazonaws.com/media.drt/22029_logosf.jpg');
                }

            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // boo hoo
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});

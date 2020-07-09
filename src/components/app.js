class App {
  constructor() {
    this.songs = new Songs;
    const blankChordFeed = {id: null, position: 1, chord_array: null}
    const newSongParams = {
      id: null, attributes: {
        title: 'New Song', 
        key: 'C', 
        mode: 'major', 
        tempo: 120, 
        custom_chords: null, 
        chord_feeds: [blankChordFeed]
      }
    }
    this.song = new Song(newSongParams)
    this.song.display();
    this.initBindingsAndListeners();
    this.populateTempo();
    this.populateKey();
    this.populateMode();
  }

  initBindingsAndListeners() {
    this.playBtn = document.getElementById('play');
    this.playBtn.addEventListener('click', this.song.play.bind(this.song))
    this.stopBtn = $('#stop')[0]
    this.stopBtn.addEventListener('click', this.song.addStopStatus.bind(this.song))
    this.pauseBtn = $('#pause')[0]
    this.pauseBtn.addEventListener('click', this.song.addPauseStatus.bind(this.song))
  }

  populateTempo() {
    for (let i = 60; i < 200; i++) {
      $('#tempo').append(`<option id=${i} value='${i}'>${i}</option>`)
    } 
  }

  populateKey() {
    const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
    for (const note of notes) {
      $('#key').append(`<option id=${note} value='${note}'>${note}</option>`)
    }
  }

  populateMode() {
    const modes = ['major', 'minor']
    for (const mode of modes) {
      $('#mode').append(`<option id=${mode} value='${mode}'>${mode}</option>`)
    }
  }
}
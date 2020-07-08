class App {
  constructor() {
    this.songs = new Songs;
    const blankChordFeed = {id: null, position: 1, chord_array: null}
    const newSongParams = {
      id: null, attributes: {
        title: null, 
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
  }

  initBindingsAndListeners() {
    this.playBtn = document.getElementById('play');
    this.playBtn.addEventListener('click', this.song.play.bind(this.song))
  }

  populateTempo() {
    for (let i = 60; i < 200; i++) {
      $('#tempo').append(`<option value='${i}'>${i}</option>`)
    } 
  }

  populateKey() {
    const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
    for (const note of notes) {
      $('#key').append(`<option value='${note}'>${note}</option>`)
    }
  }

}
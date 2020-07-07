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
  }

  initBindingsAndListeners() {
    this.playBtn = document.getElementById('play');
    this.playBtn.addEventListener('click', this.song.play.bind(this.song))
  }
}
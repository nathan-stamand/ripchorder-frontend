class App {
  constructor() {
    this.songs = new Songs(this);
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
    this.controlPanel = new ControlPanel(this)
    this.song.display();
  }
}
class App {
  constructor() {
    this.songs = new Songs;
    const blankChordFeed = {id: null, position: 1, chord_array: ''}
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
    this.song.display()  
  }
}
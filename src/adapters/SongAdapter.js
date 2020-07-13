class SongAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/songs';
  }

  saveVariables(songId) {
    const title = $('h1').text();
    const tempo = $('#tempo').val();
    const key = $('#key');
    const mode = $('#mode');
    const customChords = this.getCustomChordArray();
    const chordFeeds = this.getChordFeeds();
    return {song: {title: title, key: key, mode: mode, tempo: tempo, custom_chords: customChords, chord_feeds: chordFeeds }}
  }

  saveSong(songId) {
    const songObj = {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.saveVariables(songId))
    }

    return fetch(this.baseUrl + `/${songId}`, songObj).then(res => console.log(res))
  }
}
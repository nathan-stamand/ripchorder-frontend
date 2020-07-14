class SongAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/songs';
  }

  saveVariables() {
    const title = $('h1').text();
    const tempo = $('#tempo').val();
    const key = $('#key').val();
    const mode = $('#mode').val();
    const customChords = this.getCustomChordArray();
    return {song: {title: title, key: key, mode: mode, tempo: tempo, custom_chords: customChords}}
  }

  getCustomChordArray() {
    const customChordBtns = $('.custom.chord').toArray();
    const customChords = customChordBtns.map(btn => {
      return btn.textContent
    }).join(', ')
    return customChords
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
    return fetch(this.baseUrl + `/${songId}`, songObj).then(res => res.json())
  }
}
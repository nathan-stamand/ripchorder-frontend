class SongAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/songs';
  }

  saveVariables(song) {
    const title = song.title
    const tempo = song.tempo
    const key = song.key
    const mode = song.mode
    const customChords = song.customChords.join(', ')
    return {song: {title: title, key: key, mode: mode, tempo: tempo, custom_chords: customChords}}
  }

  saveSong(song) {
    const songObj = {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.saveVariables(song))
    }
    return fetch(this.baseUrl + `/${song.id}`, songObj).then(res => res.json())
  }
}
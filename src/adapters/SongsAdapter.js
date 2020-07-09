class SongsAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/songs'
  }

  getSongs() {
    return fetch(this.baseUrl).then(res => res.json())
  }

  variables() {
    return {song: {tempo: 120, key: 'C', mode: 'major', title: `New Song`, custom_chords: '', chord_feeds: []}}
  }

  createSong() {
    const songObject = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.variables())
    }
    return fetch(this.baseUrl, songObject).then(res => res.json())
  }
}
class SongsAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/songs'
  }

  getSongs() {
    return fetch(this.baseUrl).then(res => res.json())
  }
}
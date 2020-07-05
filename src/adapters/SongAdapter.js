class SongAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/songs/';
  }

  getSong(id) {
    return fetch(this.baseUrl + id).then(res => res.json())
  }
}
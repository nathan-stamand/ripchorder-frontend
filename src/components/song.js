class Song {
  constructor(songJson) {
    this.id = songJson.id;
    this.title = songJson.attributes.title;
    this.adapter = new SongAdapter;
  }

  fetchSong() {
    this.adapter.getSong(id).then(song => console.log(song.data))
  }
}
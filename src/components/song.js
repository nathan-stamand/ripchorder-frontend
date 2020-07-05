class Song {
  constructor(songJson) {
    this.id = songJson.id;
    this.title = songJson.attributes.title;
    this.adapter = new SongAdapter;
  }
}
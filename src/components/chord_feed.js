class ChordFeed {
  constructor(feedJson) {
    this.id = feedJson.id;
    this.position = feedJson.position;
    this.chord_array = feedJson.chord_array;
    this.song_id = feedJson.song_id;
  }
}
class ChordFeed {
  constructor(feedJson) {
    this.id = feedJson.id;
    this.position = feedJson.position;
    this.chord_array = feedJson.chord_array ? feedJson.chord_array.split(', ') : [];
    this.song_id = feedJson.song_id;
  }

  isFull() {
    return this.chord_array.length > 7 ? true : false;
  }

  addChordToFeed(chord) {
    this.chord_array.push(chord)
    return this.renderChordArray()
  }

  renderChordArray() {
    return this.chord_array.map(chord => `<div class='feed-chord'>${chord}</div>`).join(' ')
  }
}
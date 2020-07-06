class ChordFeed {
  constructor(feedJson) {
    this.id = feedJson.id;
    this.position = feedJson.position;
    this.chord_array = feedJson.chord_array.split(', ');
    this.song_id = feedJson.song_id;
  }

  renderChordArray() {
    const feedContainer = document.querySelector('song-feed-')
    return this.chord_array.map(chord => `<div class='feed-chord'>${chord}</div>`).join('')
  }
}
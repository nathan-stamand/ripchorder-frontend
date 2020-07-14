class ChordFeed {
  constructor(feedJson) {
    this.id = feedJson.id;
    this.position = feedJson.position;
    this.chord_array = feedJson.chord_array ? feedJson.chord_array.split(', ') : [];
    this.song_id = feedJson.song_id;
    this.adapter = new ChordFeedAdapter
  }

  fetchUpdateChordFeed() {
    this.adapter.updateChordFeed(this.position, this.id)
  }

  renderChordArray(feedDiv) {
    const chordFeed = this;
    this.chord_array.map(chord => {
      const feedChord = document.createElement('div');
      feedChord.className = 'feed-chord';
      feedChord.textContent = chord;
      chordFeed.addFeedChordEventListener(feedChord);
      feedDiv.appendChild(feedChord)
    })
  }

  addFeedChordEventListener(feedChord) {
    feedChord.addEventListener('mousedown', function(e) {
      feedChord.remove()
    })
  }
}
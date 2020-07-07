class ChordFeed {
  constructor(feedJson, parent) {
    this.id = feedJson.id;
    this.position = feedJson.position;
    this.chord_array = feedJson.chord_array ? feedJson.chord_array.split(', ') : [];
    this.song_id = feedJson.song_id;
    this.parent = parent;
  }

  isFull() {
    return this.chord_array.length > 7 ? true : false;
  }

  addChordToFeed(chord) {
    this.chord_array.push(chord)
  }

  renderChordArray(feedDiv) {
    const chordFeed = this;
    this.chord_array.map(chord => {
      const feedChord = document.createElement('div');
      feedChord.className = 'feed-chord';
      feedChord.textContent = chord;
      feedChord.id = feedDiv.childElementCount
      chordFeed.addFeedChordEventListener(feedChord);
      feedDiv.appendChild(feedChord)
    })
  }
}
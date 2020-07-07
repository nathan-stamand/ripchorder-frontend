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
    console.log(this.chord_array)
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
    const feed = this;
    feedChord.addEventListener('mousedown', function(e) {
      feedChord.remove()
      const feedElem = Array.from(document.getElementById(`${feed.position}`).children)
      feed.chord_array = feedElem.map(chord => chord.textContent)
    })
  }
}
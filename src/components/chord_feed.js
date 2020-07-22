class ChordFeed {
  constructor(feedJson, controlPanel) {
    this.id = feedJson.id;
    this.position = feedJson.position;
    this.chord_array = feedJson.chord_array ? feedJson.chord_array.split(', ') : [];
    this.song_id = feedJson.song_id;
    this.controlPanel = controlPanel
    this.adapter = new ChordFeedAdapter
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
    let thisFeed = this;
    feedChord.addEventListener('mousedown', function(e) {
      feedChord.remove()
      let feedSiblings = $(`div#${thisFeed.position}.feed`).children().toArray()
      let newChordArray = feedSiblings.map(child => child.textContent)
      thisFeed.chord_array = newChordArray
      thisFeed.controlPanel.chordsForPlay()
    })
  }

  fetchUpdateChordFeed() {
    this.adapter.updateChordFeed(this)
  }
}
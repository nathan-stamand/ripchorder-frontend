class ChordFeeds {
  constructor(chordFeedJson, songId, controlPanel) {
    this.chordFeeds = [];
    this.songId = songId
    this.controlPanel = controlPanel
    this.renderFeeds(chordFeedJson)
    this.adapter = new ChordFeedsAdapter
  }

  tryAddFeedChord(button) {
    const chord = button.textContent != 'REST.' ? `${button.textContent}-${button.getAttribute('octave')}` : 'REST.'
    const feedId = this.findNextAvailableFeed()
    if (feedId) {
      let feed = this.chordFeeds.find(feed => feed.id === feedId);
      feed.chord_array.push(chord)
    }
    this.refreshFeeds()
  }

  findNextAvailableFeed() {
    for (const feed of this.chordFeeds) {
      if (feed.chord_array.length < 8) {
        return feed.id
      }
    }
  }

  renderFeeds(chordFeedJson) {
    chordFeedJson.forEach(feed => {
      this.chordFeeds.push(new ChordFeed(feed, this.controlPanel
        ))
    });
  }

  refreshFeeds() {
    $('.feed').remove()
    this.addChordFeeds()
  }

  addChordFeeds() {
    const feedContainer = document.getElementById('song-feed-container')
    this.chordFeeds.forEach(feed => {
      const feedDiv = document.createElement('div')
      feedDiv.id = feed.position;
      feedDiv.className = 'feed';
      feedContainer.appendChild(feedDiv)
      feed.renderChordArray(feedDiv);
    })
  }

  async saveChordFeeds() {
    for (const feed of this.chordFeeds) {
      feed.fetchUpdateChordFeed()
      await this.sleep(50)
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
class ChordFeeds {
  constructor(chordFeedJson) {
    this.chordFeeds = [];
    this.renderFeeds(chordFeedJson)
  }

  renderFeeds(chordFeedJson) {
    chordFeedJson.forEach(feed => {
      this.chordFeeds.push(new ChordFeed(feed))
    });
  }

  addChordFeeds() {
    const feedContainer = document.getElementById('song-feed-container')
    feedContainer.innerHTML = this.chordFeeds.map(feed => 
      `<div id='${feed.position}' class='feed'>${feed.renderChordArray()}</div>`).join(' ')
  }
}
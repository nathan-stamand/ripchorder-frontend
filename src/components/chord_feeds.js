class ChordFeeds {
  constructor(chordFeedJson, songId) {
    this.chordFeeds = [];
    this.songId = songId
    this.renderFeeds(chordFeedJson)
    this.adapter = new ChordFeedsAdapter
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

  refreshFeeds() {
    $('.feed').remove()
    this.addChordFeeds()
  }

  renderFeeds(chordFeedJson) {
    chordFeedJson.forEach(feed => {
      this.chordFeeds.push(new ChordFeed(feed))
    });
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
}
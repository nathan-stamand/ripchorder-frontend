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

}
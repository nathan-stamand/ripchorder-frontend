class ChordFeeds {
  constructor(chordFeedJson, songId) {
    this.chordFeeds = [];
    this.songId = songId
    this.renderFeeds(chordFeedJson)
    this.adapter = new ChordFeedsAdapter
  }

  fetchDeleteFeeds() {
    this.chordFeeds.forEach(feed => {
      feed.fetchDeleteFeed()
    })
    this.chordFeeds = []
  }

  saveChordFeeds(songId) {
    this.fetchDeleteFeeds()
    this.fetchCreateFeeds(songId)
  }

  fetchCreateFeeds(songId) {
    const feeds = $('.feed').toArray();
    feeds.forEach(feed => {
      let chordDivs = Array.from(feed.children)
      let chordArray = chordDivs.map(chordDiv => chordDiv.textContent).join(', ')
      let feedData = {position: `${feed.id}`, chord_array: `${chordArray}`, song_id: `${songId}`}
      this.adapter.createFeed(feedData)
    })
  }

  last() {
    return this.chordFeeds[this.chordFeeds.length - 1]
  }

  lastIsFull() {
    return this.last().isFull()
  }

  refreshFeeds() {
    $('.feed').remove()
    this.addChordFeeds()
  }

  renderFeeds(chordFeedJson) {
    chordFeedJson.forEach(feed => {
      this.chordFeeds.push(new ChordFeed(feed, this))
    });
  }

  addEmptyChordFeed() {
    const position = document.getElementById('song-feed-container').childElementCount + 1
    const blankChordFeed = {id: null, position: position, chord_array: '', song_id: this.songId}
    this.chordFeeds.push(new ChordFeed(blankChordFeed))
    this.refreshFeeds()
  }

  full() {
    return this.chordFeeds.length > 3 ? true : false;
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
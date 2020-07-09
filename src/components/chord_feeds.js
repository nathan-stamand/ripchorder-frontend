class ChordFeeds {
  constructor(chordFeedJson) {
    this.chordFeeds = [];
    this.renderFeeds(chordFeedJson)
  }

  variables(songId) {
    const rawFeeds = $('#song-feed-container').children().toArray()
    const feeds = rawFeeds.map(feed => {
      const chords = Array.from(feed.children)
      const chordArray = chords.map(chord => `${chord.textContent}`).join(', ')
      return {position: `${feed.id}`, chord_array: `${chordArray}`, song_id: `${songId}`}
    });
    return {chord_feeds: feeds}
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
    const blankChordFeed = {id: null, position: position, chord_array: null}
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
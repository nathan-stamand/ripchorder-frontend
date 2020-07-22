class ChordFeedAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/chord_feeds'
  }

  setChordFeedBody(feed) {
    const stringChordArray = feed.chord_array.join(', ')
    const chordFeedBody = {chord_feed: {position: feed.positon, chord_array: stringChordArray}}
    return chordFeedBody
  }

  updateChordFeed(feed) {
    const chordFeedBody = this.setChordFeedBody(feed)
    const chordFeedObj = {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chordFeedBody)
    }
    return fetch(this.baseUrl + `/${feed.id}`, chordFeedObj).then(res => res.json()).then(res => console.log(res))
  }
}
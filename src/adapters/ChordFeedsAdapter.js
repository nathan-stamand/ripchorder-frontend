class ChordFeedsAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/chord_feeds'
  }

  createFeed(feedData) {
    const feedObj = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({chord_feed: feedData})
    }
    return fetch(this.baseUrl, feedObj).then(res => console.log(res.json()))
  }
}
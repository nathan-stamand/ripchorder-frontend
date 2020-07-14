class ChordFeedAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/chord_feeds'
  }

  setChordFeedBody(positon) {
    const feed = $(`div#${positon}.feed`)
    const chordArray = feed.children().toArray()
    const stringChordArray = chordArray.map(chord => chord.textContent).join(', ')
    const chordFeedBody = {chord_feed: {position: positon, chord_array: stringChordArray}}
    return chordFeedBody
  }

  updateChordFeed(position, id) {
    const chordFeedBody = this.setChordFeedBody(position)
    const chordFeedObj = {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chordFeedBody)
    }
    return fetch(this.baseUrl + `/${id}`, chordFeedObj).then(res => res.json()).then(res => console.log(res))
  }
}
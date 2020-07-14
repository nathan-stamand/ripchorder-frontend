class ChordFeedAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/chord_feeds'
  }

  // deleteChordFeed(id) {
  //   const feedObj = {
  //     method: "DELETE",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({id: id})
  //   }
  //   return fetch(this.baseUrl + `/${id}`, feedObj).then(res => res.json())
  // }
}
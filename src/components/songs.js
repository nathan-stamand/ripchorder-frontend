class Songs {
  constructor() {
    this.adapter = new SongsAdapter;
    this.songs = [];
    // this.bindEventListeners()
    this.fetchAndLoadSongs()
  }

  fetchAndLoadSongs() {
    this.adapter.getSongs().then(songs => {
      songs.data.forEach(song => this.songs.push(song));
    })
    .then(() => {
      this.render()
    })
  }

}
class Songs {
  constructor() {
    this.adapter = new SongsAdapter;
    this.songs = [];
    this.bindEventListeners()
    this.fetchAndLoadSongs()
  }

  initBindingsAndEventListeners() {
    this.songsContainer = document.getElementById('songs-container');
  }

  fetchAndLoadSongs() {
    this.adapter.getSongs().then(songs => {
      songs.data.forEach(song => this.songs.push(new Song(song)));
    })
    .then(() => {
      this.render()
    })
  }

  render() {
    const songList = document.getElementById("song-list")
    songList.innerHTML = this.songs.map(song => song.renderLi()).join('')
    Song.createShowDeleteButtons()
  }
}
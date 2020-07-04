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


  render() {
    // const songsContainer = document.getElementById("songs-container")
    const songList = document.getElementById("song-list")
    this.songs.forEach(song => {
      let li = document.createElement("li");
      li.className = "song";
      li.id = song.id;
      li.textContent = song.attributes.title;
      songList.appendChild(li);
    })
  }
}
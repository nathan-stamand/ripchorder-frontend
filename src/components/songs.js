class Songs {
  constructor() {
    this.adapter = new SongsAdapter;
    this.songs = [];
    // this.bindEventListeners()
    this.fetchAndLoadSongs()
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
    this.createShowDeleteButtons()
  }

  createShowDeleteButtons() {
    const songList = document.getElementsByClassName('song')
    for (const song of songList) {
      const title = song.innerHTML
      const deleteBtn = `<button class='delete-button' data-song='${song.id}'>DELETE</button>`
      const showBtn = `<button class='show-button' data-song='${song.id}'>SHOW</button>`
      song.innerHTML = `${title}<div class='button-container' id='${song.id}'>${deleteBtn}${showBtn}</div>`
    }
  }
}
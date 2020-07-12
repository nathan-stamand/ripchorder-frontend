class Songs {
  constructor(app, controlPanel) {
    this.adapter = new SongsAdapter;
    this.songs = [];
    this.controlPanel = controlPanel;
    this.symbolSet = {'▷': '▽', '▽': '▷'};
    this.songList = document.getElementById("song-list")
    this.fetchAndLoadSongs();
    this.controlPanel.songs = this;
  }

  initBindingsAndEventListeners() {
    this.songsContainer = document.getElementById('songs-container');
    this.allSongs = document.getElementById('all-songs');
    this.allSongs.addEventListener('click', this.hiderUnhider.bind(this));
  }

  hiderUnhider(e) {
    let symbol = this.allSongs.getAttribute("data-symbol");
    this.allSongsButtoner(symbol)
  }

  allSongsButtoner(symbol) {
    if (symbol === '▷') {
      this.allSongs.setAttribute('data-symbol', this.symbolSet['▷'])
      this.allSongs.textContent = `${this.symbolSet['▷']} ALL SONGS`
      this.songList.hidden = false;
    }
    else {
      this.allSongs.setAttribute('data-symbol', this.symbolSet['▽'])
      this.allSongs.textContent = `${this.symbolSet['▽']} ALL SONGS`
      this.songList.hidden = true;
    }
  }

  showSong(id) {
    const song = this.songs.find(song => song.id === id)
    song.display();
    this.liHider(id)
    this.controlPanel.song = song;
  }

  liHider(id) {
    const songListArray = $(`li`).toArray()
    for (const li of songListArray) {
      li.id === id ? li.hidden = true : li.hidden = false;
    }
  }

  fetchAndLoadSongs() {
    this.adapter.getSongs().then(songs => {
      songs.data.forEach(song => this.songs.push(new Song(song)));
    })
    .then(() => {
      this.render()
    }).then(() => {
      this.initBindingsAndEventListeners()
    })
  }

  render() {
    this.songList.innerHTML = this.songs.map(song => song.renderLi()).join('')
    Song.createShowDeleteButtons()
  }

  createShowDeleteButtons() {
    // const songList = $('.song').toArray()
    // for (const song of songList) {
    //   const deleteBtn = document.createElement('button')
    //   deleteBtn.className = 'delete-button'
    //   deleteBtn.setAttribute('data-song', song.id)
    //   deleteBtn.innerHTML = 'DELETE'
    //   song.children[0].appendChild(deleteBtn)
    //   deleteBtn.addEventListener('click', this.fetchDeleteSong.bind(this, song.id))

    //   const showBtn = document.createElement('button')
    //   showBtn.className = 'show-button'
    //   showBtn.setAttribute('data-song', song.id)
    //   showBtn.innerHTML = 'SHOW'
    //   song.children[0].appendChild(showBtn)
    //   showBtn.addEventListener('click', this.showSong(song.id))
    // }
  }

  fetchCreateSong() {
    return this.adapter.createSong().then(song => {
      const newSong = new Song(song.data)
      this.songs.push(newSong)
      return newSong
    })
    .then((res) => {
      this.showSong(res.id)
      return res
    })
    .then(res => {
      this.liHider(res.id)
      return res
    })
  }

  fetchDeleteSong(id) {
    return this.adapter.deleteSong(id).then(() => {
      $(`li#${id}`).remove()
      this.songs = this.songs.filter(song => song.id != id)
    })
  }
}
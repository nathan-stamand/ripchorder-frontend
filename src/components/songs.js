class Songs {
  constructor() {
    this.adapter = new SongsAdapter;
    this.songs = [];
    this.symbolSet = {'▷': '▽', '▽': '▷'};
    this.songList = document.getElementById("song-list")
    this.fetchAndLoadSongs();
  }

  initBindingsAndEventListeners() {
    this.songsContainer = document.getElementById('songs-container');
    this.allSongs = document.getElementById('all-songs');
    this.allSongs.addEventListener('click', this.hiderUnhider.bind(this));
    this.showBtns = document.getElementsByClassName('show-button')
    for (const btn of this.showBtns) {
      btn.addEventListener('click', this.showSong.bind(this, btn.getAttribute('data-song')))
    }
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
    this.liHider(song)
    song.display()
  }

  liHider(song) {
    const songListArray = $(`ul#song-list`).children().toArray()
    for (const li of songListArray) {
      li.id === song.id ? li.hidden = true : li.hidden = false;
    }
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
    this.songList.innerHTML = this.songs.map(song => song.renderLi()).join('')
    Song.createShowDeleteButtons()
    this.initBindingsAndEventListeners()
  }
}
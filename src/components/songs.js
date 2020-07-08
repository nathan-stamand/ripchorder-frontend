class Songs {
  constructor() {
    this.adapter = new SongsAdapter;
    this.songs = [];
    this.symbolSet = {'▷': '▽', '▽': '▷'};
    this.fetchAndLoadSongs();
  }

  initBindingsAndEventListeners() {
    this.songsContainer = document.getElementById('songs-container');
    this.songList = document.getElementById("song-list")
    this.allSongs = document.getElementById('all-songs');
    this.allSongs.addEventListener('click', this.hiderUnhider.bind(this));
    this.showBtns = document.getElementsByClassName('show-button')
    for (const btn of this.showBtns) {
      btn.addEventListener('click', this.showSong.bind(this, btn.getAttribute('data-song')))
    }
  }

  hiderUnhider(e) {
    const songList = document.getElementById("song-list")
    let symbol = this.allSongs.getAttribute("data-symbol");
    this.allSongsButtoner(songList, symbol)
  }

  allSongsButtoner(songList, symbol) {
    if (symbol === '▷') {
      this.allSongs.setAttribute('data-symbol', this.symbolSet['▷'])
      this.allSongs.textContent = `${this.symbolSet['▷']} ALL SONGS`
      songList.hidden = false;
    }
    else {
      this.allSongs.setAttribute('data-symbol', this.symbolSet['▽'])
      this.allSongs.textContent = `${this.symbolSet['▽']} ALL SONGS`
      songList.hidden = true;
    }
  }

  showSong(id) {
    const song = this.songs.find(song => song.id === id)
    this.liHider(song)
    song.display()
  }

  liHider(song) {
    const songList = $(`ul#song-list`).children().toArray()
    for (const li of songList) {
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
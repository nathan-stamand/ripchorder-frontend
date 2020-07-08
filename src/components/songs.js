class Songs {
  constructor() {
    this.adapter = new SongsAdapter;
    this.songs = [];
    this.symbolSet = {'▷': '▽', '▽': '▷'};
    this.fetchAndLoadSongs();
  }

  initBindingsAndEventListeners() {
    this.songsContainer = document.getElementById('songs-container');
    this.allSongs = document.getElementById('all-songs');
    this.allSongs.addEventListener('click', this.hiderUnhider.bind(this));
    this.showBtns = document.getElementsByClassName('show-button')
    const instance = this
    for (const btn of this.showBtns) {
      btn.addEventListener('click', this.showSong.bind(instance, btn.getAttribute('data-song')))
    }
  }

  hiderUnhider(e) {
    const allSongs = document.getElementById("all-songs");
    const songList = document.getElementById("song-list")
    let symbol = allSongs.getAttribute("data-symbol");
    this.allSongsButtoner(allSongs, songList, symbol)
  }

  allSongsButtoner(allSongs, songList, symbol) {
    if (symbol === '▷') {
      allSongs.setAttribute('data-symbol', this.symbolSet['▷'])
      allSongs.textContent = `${this.symbolSet['▷']} ALL SONGS`
      songList.hidden = false;
    }
    else {
      allSongs.setAttribute('data-symbol', this.symbolSet['▽'])
      allSongs.textContent = `${this.symbolSet['▽']} ALL SONGS`
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
    const songList = document.getElementById("song-list")
    songList.innerHTML = this.songs.map(song => song.renderLi()).join('')
    Song.createShowDeleteButtons()
    this.initBindingsAndEventListeners()
  }
}
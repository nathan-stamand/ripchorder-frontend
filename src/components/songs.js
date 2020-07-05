class Songs {
  constructor() {
    this.adapter = new SongsAdapter;
    this.songs = [];
    this.initBindingsAndEventListeners()
    this.fetchAndLoadSongs()
  }

  initBindingsAndEventListeners() {
    this.songsContainer = document.getElementById('songs-container');
    this.allSongs = document.getElementById('all-songs');
    this.allSongs.addEventListener('click', () => this.hiderUnhider());
  }

  hiderUnhider(e) {
    const allSongs = document.getElementById("all-songs");
    const songList = document.getElementById("song-list")
    let symbol = allSongs.getAttribute("data-symbol");
    this.allSongsButtoner(allSongs, songList, symbol)
  }

  allSongsButtoner(allSongs, songList, symbol) {
    const symbolSet = {'▷': '▽', '▽': '▷'}
    if (symbol === '▷') {
      allSongs.setAttribute('data-symbol', symbolSet['▷'])
      allSongs.textContent = `${symbolSet['▷']} ALL SONGS`
      songList.hidden = false;
    }
    else {
      allSongs.setAttribute('data-symbol', symbolSet['▽'])
      allSongs.textContent = `${symbolSet['▽']} ALL SONGS`
      songList.hidden = true;
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
  }
}
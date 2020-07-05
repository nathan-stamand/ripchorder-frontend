class App {
  constructor() {
    this.songs = new Songs;
    this.allSongsEventListener()
    this.scribble()
  }

  allSongsEventListener() {
    const allSongs = document.getElementById("all-songs")
    const application = this;
    allSongs.addEventListener("click", () => {
      application.hideOrUnhideSongs()
    })
  }

  hideOrUnhideSongs() {
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

  scribble() {
    console.log(
      scribble.chord('CM')
    )
  }
}
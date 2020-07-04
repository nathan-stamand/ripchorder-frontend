class App {
  constructor() {
    this.songs = new Songs;
    this.allSongsEventListener()
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
    allSongsButtoner(allSongs, songList, symbol)
  }
}
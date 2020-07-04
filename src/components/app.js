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
}
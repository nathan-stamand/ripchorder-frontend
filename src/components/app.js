class App {
  constructor() {
    this.songs = new Songs(this);
    this.songs.fetchCreateSong()
    this.controlPanel = new ControlPanel(this);
  }
}
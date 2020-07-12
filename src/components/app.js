class App {
  constructor() {
    this.songs = new Songs(this);
    this.controlPanel = new ControlPanel(this);
  }
}
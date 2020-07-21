class App {
  constructor() {
    this.controlPanel = new ControlPanel(this);
    this.songs = new Songs(this.controlPanel);
  }
}
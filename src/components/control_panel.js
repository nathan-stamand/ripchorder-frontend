class ControlPanel {
  constructor(app) {
    this.app = app;
    this.song = app.song;
    this.initBindingsAndListeners();
    this.populateTempo();
    this.populateKey();
    this.populateMode();
  }
  
  initBindingsAndListeners() {
    this.playBtn = document.getElementById('play');
    this.playBtn.addEventListener('click', this.song.play.bind(this.song))
    this.stopBtn = $('#stop')[0]
    this.stopBtn.addEventListener('click', this.song.addStopStatus.bind(this.song))
    this.pauseBtn = $('#pause')[0]
    this.pauseBtn.addEventListener('click', this.song.addPauseStatus.bind(this.song))
    this.saveBtn = $('#save')[0]
    this.saveBtn.addEventListener('click', this.song.fetchAndSaveSong.bind(this.song))
  }

  populateTempo() {
    for (let i = 60; i < 200; i++) {
      $('#tempo').append(`<option id=${i} value='${i}'>${i}</option>`)
    } 
  }

  populateKey() {
    const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
    for (const note of notes) {
      $('#key').append(`<option id=${note} value='${note}'>${note}</option>`)
    }
  }

  populateMode() {
    const modes = ['major', 'minor']
    for (const mode of modes) {
      $('#mode').append(`<option id=${mode} value='${mode}'>${mode}</option>`)
    }
  }
}
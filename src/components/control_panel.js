class ControlPanel {
  constructor(app) {
    this.app = app;
    this.populateTempo();
    this.populateKey();
    this.populateMode();
    this.initBindingsAndListeners()
  }
  
  initBindingsAndListeners() {
    this.playBtn = document.getElementById('play');
    this.playBtn.addEventListener('click', this.play.bind(this))
    this.stopBtn = $('#stop')[0]
    this.stopBtn.addEventListener('click', this.addStopStatus.bind(this))
    this.pauseBtn = $('#pause')[0]
    this.pauseBtn.addEventListener('click', this.addPauseStatus.bind(this))
    this.saveBtn = $('#save')[0]
    // this.saveBtn.addEventListener('click', this.fetchAndSaveSong.bind(this))
    this.clearBtn = $('#clear')[0]
    this.clearBtn.addEventListener('click', this.clearFeeds.bind(this))
    this.newBtn = $('#new')[0]
    this.newBtn.addEventListener('click', this.createNewSong.bind(this.app))
  }

  clearFeeds() {
    console.log($('.feed').remove())
  }

  createNewSong() {
    const songs = this.songs
    songs.fetchCreateSong()
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

  playChord(button) {
    Tone.start()
    const note = button.textContent;
    const octave = button.getAttribute('octave')
    const notes = scribble.chord(`${note}-${octave}`)
    notes.forEach(note => {
      this.playNote(note)
    })
  }

  playNote(note) {
    Tone.Transport.bpm.value = $('#tempo option:selected').text();
    const synth = new Tone.Synth().toDestination()
    synth.triggerAttackRelease(note, '4n')
  }

  async play(e) {
    Tone.start()
    const chords = this.chordsForPlay()
    for (let i = 0; i < chords.length; i++) {
      this.waitTime = 60000/$('#tempo option:selected').text()
      const status = document.getElementById('song-feed-container').getAttribute('status');
      switch(status) {
        case 'play':
        if (i === chords.length - 1) {
          this.clearStartChords()
        }
        this.playChord(chords[i])
        await this.sleep(this.waitTime)
      break;
      case 'pause':
        chords[i].setAttribute('start-chord', 'start')
        this.addPauseStatus()
        return;
      default:
        return;
      }
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async addStopStatus() {
    $('#song-feed-container').attr('status', 'stop')
    await this.sleep(this.waitTime)
    $('#song-feed-container').attr('status', 'play')
    this.clearStartChords()
}

  chordsForPlay() {
    let chords = $('div.feed-chord').toArray()
    const startChord = chords.findIndex(chord => chord.getAttribute('start-chord') === 'start')
    if (startChord > 0) {
      chords = chords.slice(startChord)
    }
    return chords;
  }

  async addPauseStatus() {
    $('#song-feed-container').attr('status', 'pause')
    await this.sleep(this.waitTime)
    $('#song-feed-container').attr('status', 'play')
    this.refreshStartChord()
  }

  refreshStartChord() {
    let chords = this.chordsForPlay()
    let startChords = chords.filter(chord => chord.getAttribute('start-chord') === 'start')
    if (startChords.length > 1) {
      startChords[0].setAttribute('start-chord', 'false')
    }
  }

  clearStartChords() {
    $('.feed-chord[start-chord="start"').attr('start-chord', 'false')
  }
}
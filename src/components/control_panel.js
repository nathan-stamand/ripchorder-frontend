class ControlPanel {
  constructor(app) {
    this.app = app;
    this.song = null;
    this.populateTempo();
    this.populateKey();
    this.populateMode();
    this.populateChordName();
    this.populateModifier();
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
    this.saveBtn.addEventListener('click', () => this.checkForSongAndSave())
    this.clearBtn = $('#clear')[0]
    this.clearBtn.addEventListener('click', this.clearSongDisplay.bind(this))
    this.newBtn = $('#new')[0]
    this.newBtn.addEventListener('click', this.createNewSong.bind(this))
    this.titleInput = $('#new-title')[0]
    this.titleInput.addEventListener('change', this.updateTitleHeader.bind(this))
    this.addChordBtn = $('#create-chord')[0]
    this.addChordBtn.addEventListener('click', () => this.addCustomChord())
  }

  addCustomChord() {
    if (this.song) {
      const chordName = $('#chord-name').val()
      const modifier = $('#modifier').val()
      const octave = $('select#octave').val()
      const chord = `<button class='custom chord' octave='${octave}'>${chordName}${modifier}</button>`
      $('#chords-container').append(chord)
      this.song.chordContainer.customChords.push(`${chordName}${modifier}-${octave}`)
      this.song.chordContainer.refreshCustomChords()
      $('#add-chord-container').attr('hidden', true)
    }
  }

  async checkForSongAndSave() {
    if (this.song) {
      this.disableEverything()
      this.song.fetchSaveSong()
      this.enableEverything()
    }
  }

  disableEverything() {
    $('button').attr('disabled', true)
    $('select').attr('disabled', true)
    $('input').attr('disabled', true)
    $('#song-feed-container').attr('hidden', true)
  }

  enableEverything() {
    $('button').attr('disabled', false)
    $('select').attr('disabled', false)
    $('input').attr('disabled', false)
    $('#song-feed-container').attr('hidden', false)
  }

  clearSongDisplay() {
    this.song = null;
    $('#chords-container').html(`<ul>
    <li>Click 'NEW' to create and load a new Song</li>
    <li>Chords will play when clicked and automatically add to the next available feed.</li>
    <li>Feeds max out at four (4) total.</li>
    <li>Click the red feed chord to remove it from the feed.</li>
    <li>Chords are automatically placed in the next available spot!</li>
  </ul>`)
    $('h1').remove()
    $('.feed').remove()
    $('select').val('')
    $('input').val('New Song')
    $('li').attr('hidden', false)
    this.songs.fetchAndLoadSongs()
  }

  createNewSong() {
    const songs = this.songs
    songs.fetchCreateSong()
  }

  updateTitleHeader() {
    const newTitle = $('#new-title').val()
    $('h1').text(newTitle)
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

  populateChordName() {
    const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
    for (const note of notes) {
      $('#chord-name').append(`<option id=${note} value='${note}'>${note}</option>`)
    }
  }

  populateModifier() {
    const modifiers = scribble.chords()
    for (const mod of modifiers) {
      $('#modifier').append(`<option id=${mod} value='${mod}'>${mod}</option>`)
    }
  }

  playChord(button) {
    Tone.start()
    if (button.textContent != 'REST.') {
      const note = button.textContent;
      const octave = button.getAttribute('octave')
      const notes = scribble.chord(`${note}-${octave}`)
      notes.forEach(note => {
        this.playNote(note)
      })
    }
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
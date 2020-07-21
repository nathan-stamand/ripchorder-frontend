class ControlPanel {
  constructor(app) {
    this.app = app;
    this.song = null;
    this.status = 'play';
    this.populateTempo();
    this.populateKey();
    this.populateMode();
    this.populateChordName();
    this.populateModifier();
    this.initBindingsAndListeners()
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
    this.titleInput.addEventListener('change', this.updateTitle.bind(this))
    this.addChordBtn = $('#create-chord')[0]
    this.addChordBtn.addEventListener('click', () => this.addCustomChord())
  }

  async play(e) {
    Tone.start()
    for (let i = 0; i < this.chords.length; i) {
      this.waitTime = 60000/$('#tempo option:selected').text()
      switch(this.status) {
        case 'play':
        if (i === this.chords.length - 1) {
          this.addStopStatus()
        }
        this.playChord(this.chords[i])
        this.chords.shift()
        await this.sleep(this.waitTime)
        break;
      case 'pause':
        this.addPauseStatus()
        return;
      default:
        this.chordsForPlay()
        return;
      }
    }
    this.chordsForPlay()
  }

  playChord(chord) {
    Tone.start()
    if (chord != 'REST.') {
      const notes = scribble.chord(`${chord}`)
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

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async addStopStatus() {
    this.status = 'stop'
    await this.sleep(this.waitTime)
    this.status = 'play'
}

  chordsForPlay() {
    this.chordFeeds = this.song.chordFeeds.chordFeeds ;
    this.chords = [];
    this.chordFeeds.forEach(feed => {
      this.chords = this.chords.concat(feed.chord_array)
    });
  }

  async addPauseStatus() {
    this.status = 'pause'
    await this.sleep(this.waitTime)
    this.status = 'play'
  }

  async checkForSongAndSave() {
    if (this.song) {
      this.disableEverything()
      this.song.fetchSaveSong()
      await this.sleep(1000)
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

  updateTitle() {
    const newTitle = $('#new-title').val()
    this.song.title = newTitle;
    // $('h1').text(newTitle)
    this.song.display()
  }

  addCustomChord() {
    if (this.song) {
      const chordName = $('#chord-name').val()
      const modifier = $('#modifier').val()
      const octave = $('select#octave').val()
      this.song.customChords.push(`${chordName}${modifier}-${octave}`)
      this.song.display()
      $('#add-chord-container').attr('hidden', true)
    }
  }
}
class Song {
  constructor(songJson) {
    this.id = songJson.id;
    this.title = songJson.attributes.title;
    this.key = songJson.attributes.key;
    this.mode = songJson.attributes.mode;
    this.tempo = songJson.attributes.tempo;
    console.log(this.tempo)
    this.chordFeeds = new ChordFeeds(songJson.attributes.chord_feeds);
    this.customChords = songJson.attributes.custom_chords ? songJson.attributes.custom_chords.split(', ') : null;
    this.adapter = new SongAdapter;
  }

  renderLi() {
    return `<li class="song" id="${this.id}">${this.title}</li>`
  }

  static createShowDeleteButtons() {
    const songList = document.getElementsByClassName('song')
    for (const song of songList) {
      const title = song.innerHTML
      const deleteBtn = `<button class='delete-button' data-song='${song.id}'>DELETE</button>`
      const showBtn = `<button class='show-button' data-song='${song.id}'>SHOW</button>`
      song.innerHTML = `${title}<div class='button-container' id='${song.id}'>${deleteBtn}${showBtn}</div>`
    }
  }

  display() {
    this.renderKeyChords()
    if (this.customChords) {
      this.addCustomChords()
    }
    this.renderTempoKeyMode()
    this.renderTitle()
    this.chordFeeds.refreshFeeds()
  }

  renderTitle() {
    $('h1#title').remove()
      const title = document.createElement('h1')
      title.textContent = this.title
      title.id = 'title'
      document.body.insertAdjacentElement('afterbegin', title)
  }

  renderTempoKeyMode() {
    $(document).ready(() => {
      $(`select#tempo option[value='${this.tempo}']`).prop('selected', true)
      $(`select#key option[value='${this.key}']`).prop('selected', true)
      $(`select#mode option[value='${this.mode}']`).prop('selected', true)
    })
  }

  renderKeyChords() {
    $('.chord').remove()
    const chordDegrees = scribble.getChordDegrees(`${this.mode}`)
    chordDegrees.forEach(degree => {
      this.addChord(degree)
    })
  }

  addChord(degree) {
    const chord = scribble.getChordsByProgression(`${this.key} ${this.mode}`, `${degree}`).split('-');
    const chordBtn = document.createElement('button')
    chordBtn.id = degree;
    chordBtn.className = 'chord';
    chordBtn.setAttribute('octave', `${chord[1]}`)
    chordBtn.textContent = chord[0];
    this.addChordListener(chordBtn)
    $(chordBtn).insertBefore('#new-chord')
  }

  addCustomChords() {
    for (const chord of this.customChords) {
      const custChord = document.createElement('button');
      custChord.id = 'custom-chord';
      custChord.className = 'chord';
      custChord.setAttribute('octave', '4')
      custChord.textContent = chord;
      this.addChordListener(custChord)
      $(custChord).insertBefore('#new-chord');
    }
  }

  addChordListener(button) {
    const song = this;
    button.addEventListener('mousedown', function(e) {
      song.playChord(button)
      if (!song.chordFeeds.lastIsFull()) {
        const lastFeed = song.chordFeeds.last()
        lastFeed.addChordToFeed(button)
      }
      else {
        if (!song.chordFeeds.full()) {
          song.chordFeeds.addEmptyChordFeed()
          const lastFeed = song.chordFeeds.last()
          lastFeed.addChordToFeed(button)
        }
      }
      song.chordFeeds.refreshFeeds()
    })
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
          this.chordFeeds.refreshFeeds()
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
    this.chordFeeds.refreshFeeds()
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
}
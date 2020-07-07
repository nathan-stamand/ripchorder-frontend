class Song {
  constructor(songJson) {
    this.id = songJson.id;
    this.title = songJson.attributes.title;
    this.key = songJson.attributes.key;
    this.mode = songJson.attributes.mode;
    this.tempo = songJson.attributes.tempo;
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
    this.chordFeeds.addChordFeeds()
  }

  renderKeyChords() {
    $('.chord').remove()
    const chordDegrees = scribble.getChordDegrees(`${this.mode}`)
    chordDegrees.forEach(degree => {
      this.addChord(degree)
    })
  }

  addChord(degree) {
    const text = scribble.getChordsByProgression(`${this.key} ${this.mode}`, `${degree}`).replace('-4', '')
    const chordBtn = document.createElement('button')
    chordBtn.id = degree;
    chordBtn.className = 'chord';
    chordBtn.textContent = text;
    this.addChordListener(chordBtn)
    $(chordBtn).insertBefore('#new-chord')
  }

  addCustomChords() {
    for (const chord of this.customChords) {
      const custChord = document.createElement('button');
      custChord.id = 'custom-chord';
      custChord.className = 'chord';
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
        song.chordFeeds.last().addChordToFeed(button.textContent)
        song.chordFeeds.addChordFeeds()
      }
      else {
        if (!song.chordFeeds.full()) {
          song.chordFeeds.addEmptyChordFeed()
          song.chordFeeds.last().addChordToFeed(button.textContent)
          song.chordFeeds.addChordFeeds()
        }
      }
    })
  }

  playChord(button) {
    Tone.start()
    const notes = scribble.chord(button.textContent)
    notes.forEach(note => {
      this.playNote(note)
    })
  }

  playNote(note) {
    const synth = new Tone.Synth().toDestination()
    synth.triggerAttackRelease(note, '4n')
  }
}
class ChordContainer {
  constructor(song, controlPanel) {
    this.song = song
    this.key = song.key;
    this.mode = song.mode
    this.customChords = song.customChords;
    this.chordFeeds = song.chordFeeds;
    this.controlPanel = controlPanel;
    this.chordContainer = $('#chords-container')[0]
    this.initBindingsAndEventListeners()
  }

  initBindingsAndEventListeners() {
    this.keySelect = $('#key')[0]
    this.keySelect.addEventListener('change', this.updateKeyChords.bind(this))
    this.modeSelect = $('#mode')[0]
    this.modeSelect.addEventListener('change', this.updateKeyChords.bind(this))
  }

  updateKeyChords() {
    const newKey = $('#key').val()
    const newMode = $('#mode').val()
    this.key = newKey;
    this.mode = newMode;
    this.song.key = newKey;
    this.song.mode = newMode;
    this.renderKeyChords()
  }

  renderKeyChords() {
    this.renderRestAndNewChord()
    const chordDegrees = scribble.getChordDegrees(`${this.mode}`)
    chordDegrees.forEach(degree => {
      this.addChord(degree)
    })
  }

  renderRestAndNewChord() {
    const rest = '<button id="rest" class="non-chord">REST.</button>'
    const newChord = '<button id="new-chord" class="non-chord">+</button>'
    this.chordContainer.innerHTML = `${rest}${newChord}`
    this.addRestEventListener()
    this.addNewChordEventListener()
  }

  addRestEventListener() {
    this.restBtn = $('#rest')[0]
    this.addChordListener(this.restBtn)
  }

  addNewChordEventListener() {
    this.newChordBtn = $('#new-chord')[0]
    this.newChordBtn.addEventListener('click', () => {
      $('#add-chord-container').attr('hidden', false)
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

  addChordListener(button) {
    const chordContainer = this;
    const chordFeeds = this.chordFeeds;
    const controlPanel = this.controlPanel;
    button.addEventListener('mousedown', function(e) {
      chordContainer.playChord(button)
      chordFeeds.tryAddFeedChord(button)
      controlPanel.chordsForPlay()
    })
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

  addFeedChord(feedId, button) {
    const chord = document.createElement('div')
    chord.className = 'feed-chord'
    this.setFeedChordText(chord, button)
    this.addFeedChordEventListener(chord)
    const feeds = this.chordFeeds.chordFeeds
    const feed = feeds.find(feed => feed.id === feedId)
    feed.chord_array.push(chord.textContent)
    this.song.display()
    this.controlPanel.chordsForPlay()
  }

  setFeedChordText(chord, button) {
    if (button.getAttribute('octave')) {
      chord.textContent = `${button.textContent}-${button.getAttribute('octave')}`
    }
    else {
      chord.textContent = 'REST.'
    }
  }

  feedsNotMaxedOut() {
    return $('#song-feed-container').children().length < 4 ? true : false
  }

  addCustomChords() {
    for (const chord of this.customChords) {
      const chordName = chord.split('-')[0]
      const octave = chord.split('-')[1]
      const custChord = document.createElement('button');
      custChord.className = 'custom chord';
      custChord.setAttribute('octave', octave)
      custChord.textContent = chordName;
      this.addChordListener(custChord)
      $(custChord).insertBefore('#new-chord');
    }
  }

  refreshCustomChords() {
    $('.custom').remove()
    this.addCustomChords()
  }
}
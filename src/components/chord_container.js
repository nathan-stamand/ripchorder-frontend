class ChordContainer {
  constructor(key, mode, customChords) {
    this.key = key;
    this.mode = mode
    this.customChords = customChords;
    this.chordContainer = $('#chords-container')[0]
    this.initBindingsAndEventListeners()
  }

  renderRestAndNewChord() {
    const rest = '<button id="rest" class="non-chord">REST.</button>'
    const newChord = '<button id="new-chord" class="non-chord">+</button>'
    this.chordContainer.innerHTML = `${rest}${newChord}`
    this.addRestEventListener()
    this.addNewChordEventListener()
  }

  addNewChordEventListener() {
    this.newChordBtn = $('#new-chord')[0]
    this.newChordBtn.addEventListener('click', () => {
      $('#add-chord-container').attr('hidden', false)
    })
  }

  addRestEventListener() {
    this.restBtn = $('#rest')[0]
    this.addChordListener(this.restBtn)
  }

  addChordListener(button) {
    const chordContainer = this;
    button.addEventListener('mousedown', function(e) {
      chordContainer.playChord(button)
      let feedId = chordContainer.findNextAvailableFeed()
      if (feedId) {
        chordContainer.addFeedChord(feedId, button)
      }
    })
  }

  addFeedChordEventListener(feedChord) {
    feedChord.addEventListener('mousedown', function(e) {
      feedChord.remove()
    })
  }

  feedsNotMaxedOut() {
    return $('#song-feed-container').children().length < 4 ? true : false
  }

  addFeedChord(feedId, button) {
    const chord = document.createElement('div')
    chord.className = 'feed-chord'
    this.setFeedChordText(chord, button)
    this.addFeedChordEventListener(chord)
    const feeds = $(`div.feed`).toArray()
    const feed = feeds.find(feed => feed.id === feedId)
    feed.appendChild(chord)
  }

  setFeedChordText(chord, button) {
    if (button.getAttribute('octave')) {
      chord.textContent = `${button.textContent}-${button.getAttribute('octave')}`
    }
    else {
      chord.textContent = 'REST.'
    }
  }

  findNextAvailableFeed() {
    const feeds = $('.feed').toArray();
    for (const feed of feeds) {
      if (feed.childElementCount < 8) {
        return feed.id
      }
    }
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

  renderKeyChords() {
    this.renderRestAndNewChord()
    const chordDegrees = scribble.getChordDegrees(`${this.mode}`)
    chordDegrees.forEach(degree => {
      this.addChord(degree)
    })
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
    this.renderKeyChords()
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
}
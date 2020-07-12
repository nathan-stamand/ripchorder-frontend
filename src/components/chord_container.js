class ChordContainer {
  constructor(key, mode, customChords) {
    this.key = key;
    this.mode = mode
    this.customChords = customChords;
    this.ChordContainer = $('#chords-container')[0]
  }

  renderRestAndNewChord() {
    const rest = '<button id="rest" class="non-chord">REST.</button>'
    const newChord = '<button id="new-chord" class="non-chord">+</button>'
    this.ChordContainer.innerHTML = `${rest}${newChord}`
  }

  addFeed() {
    const position = document.getElementById('song-feed-container').childElementCount + 1
    const newFeed = `<div id="${position}" class="feed"></div>`
    $('div#song-feed-container').append(newFeed)
    }

  addChordListener(button) {
    const chordContainer = this;
    button.addEventListener('mousedown', function(e) {
      chordContainer.playChord(button)
    })
  }

  addChord(degree) {
    console.log(this.ChordContainer)
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
      custChord.className = 'custom chord';
      custChord.setAttribute('octave', '4')
      custChord.textContent = chord;
      this.addChordListener(custChord)
      $(custChord).insertBefore('#new-chord');
    }
  }

  renderKeyChords() {
    this.renderRestAndNewChord()
    $('.chord').remove()
    const chordDegrees = scribble.getChordDegrees(`${this.mode}`)
    chordDegrees.forEach(degree => {
      this.addChord(degree)
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
}
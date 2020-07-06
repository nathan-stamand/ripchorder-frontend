class Song {
  constructor(songJson) {
    this.id = songJson.id;
    this.title = songJson.attributes.title;
    this.key = songJson.attributes.key;
    this.mode = songJson.attributes.mode;
    this.tempo = songJson.attributes.tempo;
    this.chordFeeds = new ChordFeeds(songJson.attributes.chord_feeds);
    this.customChords = songJson.attributes.custom_chords;
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
    if (this.customChords) {
      this.renderKeyChords()
      this.addCustomChords()
    }
    this.chordFeeds.addChordFeeds()
  }

  addCustomChords() {
    const newChord = document.getElementById('new-chord')
    const container = document.getElementById('chords-container')
    const ccArray = this.customChords.split(', ')
    for (const chord of ccArray) {
      const chordBtn = document.createElement('button')
      const idNum = document.getElementById('chords-container').childElementCount.length -1
      chordBtn.className = 'chord'
      chordBtn.id = idNum
      chordBtn.textContent = chord
      chordBtn.setAttribute('data-song', chord)
      container.insertBefore(chordBtn, newChord)
    }
  }
}
class Song {
  constructor(songJson, controlPanel) {
    this.id = songJson.id;
    this.title = songJson.attributes.title;
    this.key = songJson.attributes.key;
    this.mode = songJson.attributes.mode;
    this.tempo = songJson.attributes.tempo;
    this.chordFeeds = new ChordFeeds(songJson.attributes.chord_feeds, this.id, controlPanel);
    this.customChords = songJson.attributes.custom_chords ? songJson.attributes.custom_chords.split(', ') : [];
    this.adapter = new SongAdapter;
    this.chordContainer = new ChordContainer(this, controlPanel)
  }

  fetchSaveSong() {
    this.adapter.saveSong(this).then(() => this.chordFeeds.saveChordFeeds())
  }

  renderLi() {
    return `<li class="song" id="${this.id}">${this.title}<div class='button-container'></div></li>`
  }

  display() {
    this.renderChords()
    this.renderTempoKeyMode()
    this.renderTitle()
    this.chordFeeds.refreshFeeds()
  }

  renderChords() {
    this.chordContainer.renderKeyChords()
    if (this.customChords) {
      this.chordContainer.addCustomChords()
    }
  }

  renderTempoKeyMode() {
    $(document).ready(() => {
      $(`select#tempo option[value='${this.tempo}']`).prop('selected', true)
      $(`select#key option[value='${this.key}']`).prop('selected', true)
      $(`select#mode option[value='${this.mode}']`).prop('selected', true)
    })
  }

  renderTitle() {
    $('h1').remove()
    const title = document.createElement('h1')
    title.textContent = this.title
    title.id = this.id
    const mainContainer = document.getElementById('logo')
    mainContainer.insertAdjacentElement('afterend', title)
    $('#new-title').val(title.textContent)
  }
}
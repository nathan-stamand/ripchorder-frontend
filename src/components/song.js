class Song {
  constructor(songJson) {
    this.id = songJson.id;
    this.title = songJson.attributes.title;
    this.key = songJson.attributes.key;
    this.mode = songJson.attributes.mode;
    this.tempo = songJson.attributes.tempo;
    this.chordFeeds = new ChordFeeds(songJson.attributes.chord_feeds);
    this.customChords = songJson.attributes.custom_chords ? songJson.attributes.custom_chords.split(', ') : [];
    this.adapter = new SongAdapter;
    this.chordContainer = new ChordContainer(this)
  }

  fetchSaveSong() {
    this.adapter.saveSong(this.id).then(() => this.chordFeeds.saveChordFeeds())
  }

  renderLi() {
    return `<li class="song" id="${this.id}">${this.title}<div class='button-container'></div></li>`
  }

  renderChords() {
    this.chordContainer.renderKeyChords()
    if (this.customChords) {
      this.chordContainer.addCustomChords()
    }
  }

  display() {
    this.renderChords()
    this.renderTempoKeyMode()
    this.renderTitle()
    this.chordFeeds.refreshFeeds()
  }

  renderTitle() {
    $('h1').remove()
    const title = document.createElement('h1')
    title.textContent = this.title
    title.id = this.id
    document.body.insertAdjacentElement('afterbegin', title)
    $('#new-title').val(title.textContent)
  }

  renderTempoKeyMode() {
    $(document).ready(() => {
      $(`select#tempo option[value='${this.tempo}']`).prop('selected', true)
      $(`select#key option[value='${this.key}']`).prop('selected', true)
      $(`select#mode option[value='${this.mode}']`).prop('selected', true)
    })
  }
}
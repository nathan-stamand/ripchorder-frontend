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
    this.chordContainer = new ChordContainer(this.key, this.mode, this.customChords)
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
    $('#new-title').attr('value', title.textContent)
  }

  renderTempoKeyMode() {
    $(document).ready(() => {
      $(`select#tempo option[value='${this.tempo}']`).prop('selected', true)
      $(`select#key option[value='${this.key}']`).prop('selected', true)
      $(`select#mode option[value='${this.mode}']`).prop('selected', true)
    })
  }
}
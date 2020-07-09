class SongAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/songs/';
    this.variables.bind(this)
  }

  variables() {
    const tempo = $('#tempo option:selected').text()
    const key = $('#key option:selected').text()
    const mode = $('#mode option:selected').text()
    const newTitle = $('#new-title').val()
    const custMap = $('.custom.chord').toArray().map(chord => {
      return `${chord.textContent}-${chord.getAttribute('octave')}`
    }).join(', ');
    return `{tempo: '${tempo}', key: '${key}', mode: '${mode}', title: '${newTitle}', custom_chords: '${custMap}'}`
  }

  createSong() {
    const songBody = this.variables()
    const songObject = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(songBody)
    }
  }

  saveSong() {

  }
}
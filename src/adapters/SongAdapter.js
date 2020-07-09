class SongAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/songs/';
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

  }

  saveSong() {

  }
}
class SongAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/songs';
    this.variables.bind(this)
  }

  variables(chordFeeds) {
    const tempo = $('#tempo option:selected').text()
    const key = $('#key option:selected').text()
    const mode = $('#mode option:selected').text()
    const newTitle = $('#new-title').val()
    const custMap = $('.custom.chord').toArray().map(chord => {
      return `${chord.textContent}-${chord.getAttribute('octave')}`
    }).join(', ');
    return {song: {tempo: `${tempo}`, key: `${key}`, mode: `${mode}`, title: `${newTitle}`, custom_chords: `${custMap}`, chord_feeds: `${chordFeeds}`}}
  }

  createSong(chordFeedsVar) {
    const songObject = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.variables(chordFeedsVar))
    }
    return fetch(this.baseUrl, songObject).then(res => res.json())
  }
}
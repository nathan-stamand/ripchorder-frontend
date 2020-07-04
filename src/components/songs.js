class Songs {
  constructor() {
    this.adapter = new SongsAdapter;
    this.songs = [];
    // this.bindEventListeners()
    this.fetchAndLoadSongs()
  }

  fetchAndLoadSongs() {
    this.adapter.getSongs().then(songs => {
      songs.data.forEach(song => this.songs.push(song));
    })
    .then(() => {
      this.render()
    })
  }

  render() {
    // const songsContainer = document.getElementById("songs-container")
    const songList = document.getElementById("song-list")
    this.songs.forEach(song => {
      let li = document.createElement("li");
      li.className = "song";
      li.id = song.id;
      li.textContent = `"${song.attributes.title}" by ${song.attributes.author}`;
      songList.appendChild(li);
      this.createButtons(li)
    })
  }

  createButtons(li) {
    const buttonContainer = document.createElement("div")
    buttonContainer.className = 'button-container'
    buttonContainer.id = li.id
    li.appendChild(buttonContainer)

    const deleteButton = document.createElement("button")
    deleteButton.className = 'delete-button';
    deleteButton.setAttribute('data-song', li.id);
    deleteButton.textContent = 'DELETE.'

    const showButton = document.createElement('button')
    showButton.className = 'show-button'
    showButton.setAttribute('data-song', li.id);
    showButton.textContent = 'SHOW.'
    buttonContainer.appendChild(deleteButton)
    buttonContainer.appendChild(showButton)
  }
}
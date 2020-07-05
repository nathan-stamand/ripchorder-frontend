class App {
  constructor() {
    this.songs = new Songs;
    this.allSongsEventListener()
    this.chordEventListener()
  }

  allSongsEventListener() {
    const allSongs = document.getElementById("all-songs")
    const application = this;
    allSongs.addEventListener("click", () => {
      application.hideOrUnhideSongs()
    })
  }

  hideOrUnhideSongs() {
    const allSongs = document.getElementById("all-songs");
    const songList = document.getElementById("song-list")
    let symbol = allSongs.getAttribute("data-symbol");
    this.allSongsButtoner(allSongs, songList, symbol)
  }

  allSongsButtoner(allSongs, songList, symbol) {
    const symbolSet = {'▷': '▽', '▽': '▷'}
    if (symbol === '▷') {
      allSongs.setAttribute('data-symbol', symbolSet['▷'])
      allSongs.textContent = `${symbolSet['▷']} ALL SONGS`
      songList.hidden = false;
    }
    else {
      allSongs.setAttribute('data-symbol', symbolSet['▽'])
      allSongs.textContent = `${symbolSet['▽']} ALL SONGS`
      songList.hidden = true;
    }
  }

  chordEventListener() {
    const application = this;
    const chordBtns = Array.from(document.getElementsByClassName('chord'))
    chordBtns.forEach(chordBtn => {
      if (chordBtn.id != 'new-chord') {
        chordBtn.addEventListener('click', function(e) {
          const allFeeds = Array.from(document.getElementsByClassName('feed'))
          const feed = allFeeds[allFeeds.length -1]
          const feedChord = document.createElement('button')
          feedChord.className = 'feed-chord'
          feedChord.textContent = chordBtn.textContent
          application.addToFeed(feed, feedChord)
        })
      }
    });
  }


  addToFeed(feed, feedChord, ) {
    if (feed.childElementCount > 7) {
      const feedContainer = document.getElementById('song-feed-container')
      const newFeed = document.createElement('div')
      newFeed.id = feedContainer.childElementCount + 1
      newFeed.className = 'feed'
      feedContainer.appendChild(newFeed)
      newFeed.appendChild(feedChord)
    }
    else {
      feedChord.id = feed.childElementCount + 1
      feed.appendChild(feedChord)
    }
  }
}
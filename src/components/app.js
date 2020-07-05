class App {
  constructor() {
    this.songs = new Songs;
    this.chordEventListener()
  }

  showSongEventListener() {
  //   const showBtns = document.getElementsByClassName('show-button');
  //   for (const btn of showBtns) {
  //     btn.addEventListener('click', function(e) {
  //       const id = btn.getAttribute('data-song')
  //       this.fetchThisSong(id)
  //     })
  //   }
  }

  chordEventListener() {
    const application = this;
    const chordBtns = Array.from(document.getElementsByClassName('chord'))
    chordBtns.forEach(chordBtn => {
      if (chordBtn.id != 'new-chord') {
        chordBtn.addEventListener('click', function(e) {
          const allFeeds = Array.from(document.getElementsByClassName('feed'))
          const feed = allFeeds[allFeeds.length -1]
          const feedChord = document.createElement('div')
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
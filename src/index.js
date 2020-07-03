document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function(e) {
        Tone.start()
        buildTriad(this)
    })
})

function buildTriad(root) {
  const rootId = parseInt(root.id)
  const third = document.getElementById(`${sanitizeId(rootId + 2)}`)
  const fifth = document.getElementById(`${sanitizeId(rootId + 4)}`)
  playTriad(root, third, fifth)
}

function playTriad(root, third, fifth) {
    play(`${root.textContent[0]}4`)
  if (root.id > 5) {
    play(`${third.textContent[0]}5`)
    play(`${fifth.textContent[0]}5`)
  }
  else if (root.id > 3 ) {
    play(`${third.textContent[0]}4`)
    play(`${fifth.textContent[0]}5`)
  }
  else {
    play(`${root.textContent[0]}4`)
    play(`${third.textContent[0]}4`)
    play(`${fifth.textContent[0]}4`)
  }
}

function sanitizeId(id) {
  if (id > 7) {
    let newId = id - 7
    return newId
  }
  return id
}

function play(note) {
  const synth = new Tone.Synth().toDestination()
  console.log(note)
  synth.triggerAttackRelease(`${note}`, "8n");
}
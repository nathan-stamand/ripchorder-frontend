document.querySelectorAll("button").forEach(button => {
    button.addEventListener("mousedown", function(e) {
        Tone.start()
        play(this.textContent)
    })
})

function play(note) {
  const synth = new Tone.PolySynth(2).toDestination()
  
  synth.triggerAttackRelease(`${note}4`, "8n");
}
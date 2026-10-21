/**
 * A quiet original drone, used only when the family has not added their own music file.
 * It starts when the guest presses play. It never starts by itself.
 */
export class Tanpura {
  private context: AudioContext | null = null
  private master: GainNode | null = null
  private nodes: OscillatorNode[] = []
  private playing = false

  isPlaying(): boolean {
    return this.playing
  }

  async start(): Promise<void> {
    if (this.playing) return
    const AudioContextCtor = window.AudioContext
    const context = new AudioContextCtor()
    if (context.state === "suspended") await context.resume()

    const master = context.createGain()
    master.gain.value = 0
    master.connect(context.destination)

    const voices = [
      { frequency: 130.81, gain: 0.045 },
      { frequency: 196.0, gain: 0.03 },
      { frequency: 261.63, gain: 0.016 },
      { frequency: 130.81 * 1.004, gain: 0.02 },
    ]

    const nodes: OscillatorNode[] = []
    for (const voice of voices) {
      const osc = context.createOscillator()
      const gain = context.createGain()
      osc.type = "sine"
      osc.frequency.value = voice.frequency
      gain.gain.value = voice.gain
      osc.connect(gain)
      gain.connect(master)
      osc.start()
      nodes.push(osc)
    }

    const now = context.currentTime
    master.gain.linearRampToValueAtTime(1, now + 0.6)
    this.context = context
    this.master = master
    this.nodes = nodes
    this.playing = true
  }

  stop(): void {
    if (!this.playing || !this.context || !this.master) return
    const context = this.context
    const master = this.master
    const nodes = this.nodes
    const now = context.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.setValueAtTime(master.gain.value, now)
    master.gain.linearRampToValueAtTime(0, now + 0.25)
    window.setTimeout(() => {
      for (const node of nodes) node.stop()
      void context.close()
    }, 280)
    this.context = null
    this.master = null
    this.nodes = []
    this.playing = false
  }
}

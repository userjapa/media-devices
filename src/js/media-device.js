(async function (self) {
  const hasMediaDeviceSupport = (self && self.navigator && self.navigator.mediaDevices && self.navigator.mediaDevices.getUserMedia && self.navigator.mediaDevices.getDisplayMedia)

  if (hasMediaDeviceSupport) console.log(`Supports Media Device`)
  else console.warn(`DO NOT Supports Media Device`)

  if (hasMediaDeviceSupport) {
    const browserMediaDevices = self.navigator.mediaDevices

    try {
      const availableMedia = await browserMediaDevices.enumerateDevices()

      class BrowserMediaDevice {

        constructor () {
          this.availableMedia = availableMedia

          this.audio_constrains = {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100
          }

          this.video_constrains = {
            width: { min: 640, ideal: 1920, max: 3840 },
            height: { min: 360, ideal: 1080, max: 2160 },
            aspectRatio: 1.777777778,
            frameRate: { min: 30, max: 60 }
            // facingMode: { exact: 'user | environment | left | right' }
          }

          this.display_constrains = {
            cursor: ['motion', 'always']
          }
        }

        get media () {
          return this.availableMedia
        }

        get audio_in () {
          return this.availableMedia.filter(m => m.kind === 'audioinput')
        }

        get audio_out () {
          return this.availableMedia.filer(m => m.kind === 'audiooutput')
        }

        get video () {
          return this.availableMedia.filter(m => m.kind === 'videoinput')
        }

        getAudio () {
          return new Promise(async (resolve, reject) => {
            try {
              const constrains = {
                audio: this.audio_constrains,
                video: false
              }

              const stream = await browserMediaDevices.getUserMedia(constrains)

              resolve(stream)
            } catch (error) {
              reject(error)
            }
          })
        }

        getVideo (hasAudio = true) {
          return new Promise(async (resolve, reject) => {
            try {
              const constrains = {
                audio: hasAudio ? this.audio_constrains : false,
                video: this.video_constrains
              }

              const stream = await browserMediaDevices.getUserMedia(constrains)

              resolve(stream)
            } catch (error) {
              reject(error)
            }
          })
        }

        getDisplay (hasAudio = true) {
          return new Promise(async (resolve, reject) => {
            try {
              const constrains = {
                audio: hasAudio ? this.audio_constrains : false,
                video: this.display_constrains
              }

              const stream = await browserMediaDevices.getDisplayMedia(constrains)

              resolve(stream)
            } catch (error) {
              reject(error)
            }
          })
        }

      }

      self.BMD = new BrowserMediaDevice()
    } catch (error) {
      console.error(error)
    }
  }
})(window)

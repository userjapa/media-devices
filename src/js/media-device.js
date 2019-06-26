(async function (self) {
  const hasMediaDeviceSupport = (self && self.navigator && self.navigator.mediaDevices && self.navigator.mediaDevices.getUserMedia && self.navigator.mediaDevices.getDisplayMedia)

  if (hasMediaDeviceSupport) console.log(`Supports Media Device`)
  else console.warn(`DO NOT Supports Media Device`)

  if (hasMediaDeviceSupport) {
    const browserMediaDevices = self.navigator.mediaDevices

    try {
      const availableMedia = await browserMediaDevices.enumerateDevices()
      console.log(browserMediaDevices);

      class BrowserMediaDevice {

        constructor () {
          this.availableMedia = availableMedia
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

        getMedia (hasAudio) {
          return new Promise(async (resolve, reject) => {
            try {
              const stream = await browserMediaDevices.getUserMedia({ audio: hasAudio, video: true })
              resolve(stream)
            } catch (error) {
              console.log(error);
              reject(error)
            }
          })
        }

        getDisplay (hasAudio) {
          return new Promise(async (resolve, reject) => {
            try {
              const stream = await browserMediaDevices.getDisplayMedia({ audio: hasAudio, video: true })
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

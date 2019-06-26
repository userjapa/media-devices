const form  = document.getElementById('media-form'),
      video = document.getElementById('video')

const getUserMedia = (ev) => {
  ev.preventDefault()
  const form      = ev.target,
        setStream = stream => { video.srcObject = stream }

  if (form.reportValidity()) {
    const data = Array.from(form.elements)
                    .filter(el => el.tagName !== 'BUTTON')
                    .reduce((acc, cur) => {
                      let data = {}

                      if (acc instanceof HTMLElement)  data[acc.name] = acc.checked == undefined ? acc.value : acc.checked
                      else data = acc

                      data[cur.name] = cur.checked == undefined ? cur.value : cur.checked

                      return data
                    })

    switch (data.media) {
      case 'video':
        BMD.getMedia(data.audio)
          .then(setStream)
          .catch(console.error)
        break;
      case 'display':
        BMD.getDisplay(data.audio)
          .then(setStream)
          .catch(console.error)
        break;
      default:
        return
    }

  }
}

const loadedSource = (ev) => {
  video.currentTime = 0
  video.play()
}

form.addEventListener('submit', getUserMedia)
video.addEventListener('loadedmetadata', loadedSource)

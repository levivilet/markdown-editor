const $Input = document.getElementById('Input')
const $Output = document.getElementById('Output')

const update = async (html) => {
  const { default: DOMPurify } = await import('../web_modules/dompurify.js')
  const sanitizedHtml = DOMPurify.sanitize(html)
  $Output.innerHTML = sanitizedHtml
}

let scheduleUpdate = (text) => {
  const worker = new Worker('./worker.js', { type: 'module' })
  worker.onmessage = ({ data }) => update(data)
  scheduleUpdate = (text) => worker.postMessage(text)
  scheduleUpdate(text)
}

const handleInput = () => {
  const text = $Input.value
  scheduleUpdate(text)
}

$Input.oninput = handleInput

if ($Input.value) {
  scheduleUpdate($Input.value)
}

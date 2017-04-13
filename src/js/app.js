import setupParser from 'uap-ref-impl'
import regexesStr from './regexes'
import yaml from 'yamlparser'

const regexes = yaml.eval(regexesStr)
const parser = setupParser(regexes)

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', start)
} else {
  start()
}

function start() {
  const uaRawList = document.getElementById('user-agents-raw')
  const uaConvertedList = document.getElementById('user-agents-converted')
  const convertButton = document.getElementById('convert')

  convertButton.addEventListener('click', convert)

  function convert() {
    let uaConvertedStr = ''
    const uaStrs = uaRawList.value.trim().split('\n')
    for (const uaStr of uaStrs) {
      const agent = parser.parse(uaStr)
      uaConvertedStr += `${agent.ua.family} ${agent.ua.major}\n`
    }
    uaConvertedList.value = uaConvertedStr
  }
}

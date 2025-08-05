import fm97 from "./fm97.js"
import fm99 from "./fm99.js"

const app = {
  fm97: fm97,
  fm99: fm99
}


export default {
  colors: app[process.env.NEXT_PUBLIC_APP_TAG ?? 'fm97'].theme.colors,
}
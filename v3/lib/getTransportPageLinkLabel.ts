import { isRER, isTram, isTransilien } from "./transport"

const getTransportPageLinkLabel = (line: string): string => {
  if (isRER(line)) {
    return `Randonnées sur le RER ${line}`
  }

  if (isTransilien(line)) {
    return `Randonnées sur la ligne ${line} du Transilien`
  }

  if (isTram(line)) {
    return `Randonnées sur le tramway ${line}`
  }

  return ''
}

export default getTransportPageLinkLabel

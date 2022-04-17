const padToNDigits = (nDigits) => (num) => num.toString().padStart(nDigits, '0')

export const formatTime = milliseconds => {
  const ms = Math.floor(milliseconds % 1000)
  const seconds = Math.floor(milliseconds / 1000) % 60
  const minutes = Math.floor(milliseconds / (60 * 1000)) % 60
  const hours = Math.floor(milliseconds / (60 * 60 * 1000)) % 24

  return `${padToNDigits(2)(hours)}:${padToNDigits(2)(minutes)}:${padToNDigits(2)(seconds)}.${padToNDigits(3)(ms)}`
}

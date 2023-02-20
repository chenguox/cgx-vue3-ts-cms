// export const BASE_URL = 'http://codercba.com:8000'

let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = 'http://codercba.prod:8000'
} else {
  BASE_URL = 'http://coderwhy.dev:8000'
}

console.log(import.meta.env)

export const TIME_OUT = 10000
export { BASE_URL }

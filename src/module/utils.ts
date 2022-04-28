console.log('abc')
const a = 'a'

export default {
  tsTest(payload: { a: string, b: string}): void {
    console.log(payload)
  }
}
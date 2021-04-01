export default {
  isServer(): boolean {
    return typeof window === 'undefined'
  },
}

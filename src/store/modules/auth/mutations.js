export default {
  SET_USER (state, payload) {
    state.token = payload.token
    state.iserId = payload.userId
    state.autoLogout = false
  },
  SET_AUTO_LOGOUT (state) {
    state.autoLogout = true
  }
}
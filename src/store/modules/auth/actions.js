let timer

export default {
  async login (context, payload) {
    context.dispatch('auth', {
      ...payload,
      mode: 'login'
    })
  },

  async signup (context, payload) {
    context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    })
  },

  async auth (context, payload) {
    const mode = payload.mode
    let URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIRESTORE_API_KEY}`

    if (mode === 'signup') {
      URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIRESTORE_API_KEY}`
    }
    const response = await fetch (URL, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.log(responseData)
      const error = new Error(responseData.message || 'Failed to authenticate!')
      throw error
    }
    
    const expiresIn = +responseData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expiresIn

    localStorage.setItem('__vue-course-token', responseData.idToken)
    localStorage.setItem('__vue-course-userId', responseData.localId)
    localStorage.setItem('__vue-course-tokenExpiration', expirationDate)

    timer = setTimeout( () => {
      context.dispatch('autoLogout')
    }, expiresIn)

    context.commit('SET_USER', {
      token: responseData.idToken,
      userId: responseData.localId
    })
  },

  tryLogin (context) {
    const token = localStorage.getItem('__vue-course-token')
    const userId = localStorage.getItem('__vue-course-userId')
    const tokenExpiration = localStorage.getItem('__vue-course-tokenExpiration')

    const expiresIn = +tokenExpiration - new Date().getTime()

    if (expiresIn < 0) {
      return
    }

    timer = setTimeout( () => {
      context.dispatch('autoLogout')
    }, expiresIn)

    if(token && userId) {
      context.commit('SET_USER', {
        token: token,
        userId: userId,
      })
    }
  },

  logout (context) {
    localStorage.removeItem('__vue-course-token')
    localStorage.removeItem('__vue-course-userId')
    localStorage.removeItem('__vue-course-tokenExpiration')

    clearTimeout(timer)

    context.commit('SET_USER', {
      token: null,
      userId: null
    })
  },
  autoLogout (context) {
    context.dispatch('logout')
    context.commit('SET_AUTO_LOGOUT')
  }
}
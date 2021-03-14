export default {
  async registerCoach (context, payload) {
    const userId = context.rootGetters.userId
    const coachData = {
      id: context.rootGetters.userId,
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas
    }

    const token = context.rootGetters.token
    const URL = process.env.VUE_APP_FIRESTORE_BASE_URL

    try {
      const response = await fetch(`${URL}coaches/${userId}.json?auth=${token}`, {
        method: 'PUT',
        body: JSON.stringify(coachData)
      })
      console.log('response: ', response)
      // const responseData = await response.json()
    } catch (e) {
      console.log(e)
    }

    context.commit('REGISTER_COACH', {
      ...coachData,
      id: userId
    })
  },
  async loadCoaches (context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return
    }
    const URL = process.env.VUE_APP_FIRESTORE_BASE_URL

    const response = await fetch(`${URL}coaches.json`)
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!')
      throw error
    }

    const coaches = []
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      }
      coaches.push(coach)
    }

    context.commit('SET_COACHES', coaches)
    context.commit('SET_FETCH_TIMESTAMP')
  }
}
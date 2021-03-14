export default {
  async contactCoach (context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    }

    const URL = process.env.VUE_APP_FIRESTORE_BASE_URL

    const response = await fetch(`${URL}requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    })
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!')
      throw error
    }

    newRequest.id = responseData.name
    newRequest.coachId = payload.coachId

    context.commit('ADD_REQUEST', newRequest)
  },
  async fetchRequests (context) {
    const coachId = context.rootGetters.userId
    const token = context.rootGetters.token
    const URL = process.env.VUE_APP_FIRESTORE_BASE_URL

    const response = await fetch(`${URL}requests/${coachId}.json?auth=${token}`)

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch requests!')
      throw error
    }

    const requests = []
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,

      }
      requests.push(request)
    }

    context.commit('SET_REQUESTS', requests)

  }
}
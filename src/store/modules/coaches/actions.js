import axios from "axios";
export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };
    const token = context.rootGetters.token
    await axios.put(`https://vue-http-demo-b8b4c-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` + token, JSON.stringify(coachData))
      .then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error);
      });
    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },

  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    await axios.get('https://vue-http-demo-b8b4c-default-rtdb.firebaseio.com/coaches.json')
      .then((response) => {
        const coaches = [];
        const responseData = response.data;
        for (const key in responseData) {
          const coach = {
            id: key,
            firstName: responseData[key].firstName,
            lastName: responseData[key].lastName,
            description: responseData[key].description,
            hourlyRate: responseData[key].hourlyRate,
            areas: responseData[key].areas
          }
          coaches.push(coach);
        }
        context.commit('setCoaches', coaches);
        context.commit('setFtechTimestamp');
      }).catch((error) => {
        throw error
      });
  }

}
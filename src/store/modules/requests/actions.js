import axios from "axios";
export default {
    async contactCoach(context, payload) {
        const result = {
            userEmail: payload.email,
            message: payload.message
        };
        await axios.post(`https://vue-http-demo-b8b4c-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, JSON.stringify(result))
            .then((response) => {
                result.id = response.data.name;
                result.coachId = payload.coachId;
                context.commit('addRequest', result);
            }).catch((error) => {
                throw error;
            });
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        await axios.get(`https://vue-http-demo-b8b4c-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=`
            + token)
            .then((response) => {
                const requests = [];
                const responseData = response.data;
                for (const key in responseData) {
                    const request = {
                        id: key,
                        coachId: coachId,
                        userEmail: responseData[key].userEmail,
                        message: responseData[key].message,
                    }
                    requests.push(request);
                }
                context.commit('setRequests', requests);
            }).catch((errror) => {
                throw errror;
            });
    }
}
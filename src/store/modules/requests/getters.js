export default {
    allRequests(state, _, _2, rootGetters) {
        const coachId = rootGetters.userId;
        // console.log(state.requests);
        return state.requests.filter(request => request.coachId === coachId);
    },

    hasRequests(_, getters) {
        return getters.allRequests && getters.allRequests.length > 0;
    }
}
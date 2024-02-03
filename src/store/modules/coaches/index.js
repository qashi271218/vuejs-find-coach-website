import mutations from "./mutations";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
    namespaced: true,
    state() {
        return {
            lastFetch: null,
            userIsCoach: false,
            coaches: []
        }
    },
    mutations,
    actions,
    getters
}
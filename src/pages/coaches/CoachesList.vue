<template>
  <div>
    <base-dialog
      :show="!!errorMessage"
      title="An error occured"
      @close="handleError"
    >
      <p>{{ errorMessage }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="changeFilter"> </coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to Register as Coach</base-button
          >
          <base-button
            v-if="isLoggedIn && !isCoach && !isLoading"
            link
            to="/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <CoachItem
            v-for="coach in filterdCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          />
        </ul>
        <h3 v-else>No coach Found</h3>
      </base-card>
    </section>
  </div>
</template>
<script setup>
import { computed, inject, onMounted, ref } from "vue";
const store = inject("store");
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

const isLoading = ref(false);
const errorMessage = ref(null);

const isLoggedIn = computed(() => {
  return store.getters.isAuthenticated;
});

const filterdCoaches = computed(() => {
  const coaches = store.getters["coaches/coaches"];
  return coaches.filter((coach) => {
    if (activeFilters.value.frontend && coach.areas.includes("frontend")) {
      return true;
    }
    if (activeFilters.value.backend && coach.areas.includes("backend")) {
      return true;
    }
    if (activeFilters.value.carrer && coach.areas.includes("career")) {
      return true;
    }
    return false;
  });
});

const hasCoaches = computed(() => {
  return !isLoading.value && store.getters["coaches/hasCoaches"];
});

const activeFilters = ref({
  frontend: true,
  backend: true,
  carrer: true,
});
const changeFilter = (updatedFilters) => {
  activeFilters.value = updatedFilters;
  console.log(activeFilters.value);
};

const isCoach = computed(() => {
  return store.getters["coaches/isCoach"];
});

const loadCoaches = async (refresh = false) => {
  isLoading.value = true;
  try {
    await store.dispatch("coaches/loadCoaches", { forceRefresh: refresh });
  } catch (error) {
    errorMessage.value = error.message;
  }
  isLoading.value = false;
};

const handleError = () => {
  errorMessage.value = null;
};

onMounted(() => {
  loadCoaches();
});
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
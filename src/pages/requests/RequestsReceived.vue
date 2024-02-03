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
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasRequests && !isLoading">
          <RequestItem
            v-for="request in requests"
            :key="request.id"
            :email="request.userEmail"
            :message="request.message"
          />
        </ul>
        <h3 v-else>You haven't Received any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>
<script setup>
import { computed, inject, onMounted, ref } from "vue";
import RequestItem from "../../components/requests/RequestItem.vue";
const store = inject("store");

const isLoading = ref(false);
const errorMessage = ref(null);

const requests = computed(() => {
  return store.getters["requests/allRequests"];
});

const hasRequests = computed(() => {
  return store.getters["requests/hasRequests"];
});

const loadRequests = async () => {
  isLoading.value = true;
  try {
    await store.dispatch("requests/fetchRequests");
  } catch (error) {
    errorMessage.value = error.message;
  }
  isLoading.value = false;
};

const handleError = () => {
  errorMessage.value = null;
};

onMounted(() => {
  loadRequests();
});
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
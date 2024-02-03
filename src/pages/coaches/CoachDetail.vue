<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ selectedCoach.hourlyRate }}/hour</h3>
      </base-card>
    </section>

    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>

    <section>
      <base-card>
        <base-badge
          v-for="area in selectedCoach.areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ selectedCoach.description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script setup>
import { computed, defineProps, inject, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const store = inject("store");
const route = useRoute();
const props = defineProps({
  id: String,
});

const selectedCoach = ref("");

const fullName = computed(() => {
  return `${selectedCoach.value.firstName} ${selectedCoach.value.lastName}`;
});

const contactLink = computed(() => {
  return `${route.path}/contact`;
});

onMounted(() => {
  selectedCoach.value = store.getters["coaches/coaches"].find(
    (coach) => coach.id == props.id
  );
});
</script>
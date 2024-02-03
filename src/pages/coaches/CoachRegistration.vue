<template>
    <section>
        <base-card>
        <h2>Register as a coach now!</h2>
        <coach-form @save-data="coachRegistration"></coach-form>
        </base-card>
    </section>
</template>
<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import CoachForm from '../../components/coaches/CoachForm.vue'
const store=inject('store');
const router=useRouter();

const coachRegistration=(data) => {
    store.dispatch('coaches/registerCoach',data);
    router.replace('/coaches');
};
</script>
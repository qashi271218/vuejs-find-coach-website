<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating....." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="formData.email" />
        </div>

        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="formData.password"
          />
        </div>
        <p v-if="!formIsValid">Please enter valid email and password</p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script setup>
import { computed, inject, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const store = inject("store");
const router = useRouter();
const route = useRoute();
const formData = reactive({
  email: "",
  password: "",
});
const formIsValid = ref(true);
const mode = ref("login");
const isLoading = ref(false);
const error = ref(null);

const submitForm = async () => {
  formIsValid.value = true;
  if (
    formData.email == "" ||
    !formData.email.includes("@") ||
    formData.password.length < 6
  ) {
    formIsValid.value = false;
    return;
  }
  isLoading.value = true;
  try {
    if (mode.value == "Login") {
      await store.dispatch("login", formData);
    } else {
      await store.dispatch("signUp", formData);
    }
    const redirectUrl = "/" + (route.query.redirect || "coaches");
    router.replace(redirectUrl);
  } catch (err) {
    error.value = err.message || "Failed to authenticate plz try again";
  }
  isLoading.value = false;
};

const switchAuthMode = () => {
  if (mode.value === "Login") {
    mode.value = "Signup";
  } else {
    mode.value = "Login";
  }
};

const submitButtonCaption = computed(() => {
  if (mode.value === "Login") {
    return "Login";
  } else {
    return "Signup";
  }
});

const switchModeButtonCaption = computed(() => {
  if (mode.value === "Login") {
    return "Signup Instead";
  } else {
    return "Login Instead";
  }
});

const handleError = () => {
  error.value = null;
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
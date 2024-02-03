<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !formData.firstName.isValid}">
      <label for="firstname">FirstName</label>
      <input type="text" id="firstname" v-model.trim="formData.firstName.val" @blur="clearValidity('firstName')" />
      <p v-if="!formData.firstName.isValid">Firstname cannot be empty</p>
    </div>

    <div class="form-control" :class="{invalid: !formData.lastName.isValid}">
      <label for="lastname">LastName</label>
      <input type="text" id="lastname" v-model.trim="formData.lastName.val" @blur="clearValidity('lastName')" />
      <p v-if="!formData.lastName.isValid">Lastname cannot be empty</p>
    </div>

    <div class="form-control" :class="{invalid: !formData.description.isValid}">
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model.trim="formData.description.val" @blur="clearValidity('description')" />
      <p v-if="!formData.description.isValid">Description cannot be empty</p>
    </div>

    <div class="form-control" :class="{invalid: !formData.rate.isValid}">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="formData.rate.val" @blur="clearValidity('rate')" />
      <p v-if="!formData.rate.isValid">Rate must be greater than 0</p>
    </div>

    <div class="form-control" :class="{invalid: !formData.areas.isValid}">
        <h3>Areas of Expertise</h3>
        <div>
            <input type="checkbox" id="frontend" value="frontend" v-model="formData.areas.val" @blur="clearValidity('areas')" />
            <label for="frontend">Frontend Development</label>
        </div>

        <div>
            <input type="checkbox" id="backend" value="backend" v-model="formData.areas.val" @blur="clearValidity('areas')" />
            <label for="backend">Backend Development</label>
        </div>

        <div>
            <input type="checkbox" id="career" value="career" v-model="formData.areas.val" @blur="clearValidity('areas')" />
            <label for="career">Career Advisory</label>
        </div>
        <p v-if="!formData.areas.isValid">Areas cannot be empty</p>
    </div>
    <p v-if="!formIsvalid">Please fix the above errors and try again!</p>
    <base-button>Register</base-button>
  </form>
</template>

<script setup>
import { reactive, defineEmits, ref } from "vue";

const emit=defineEmits(['save-data']);
 
const formIsvalid=ref(true);

const formData=reactive({
    firstName: {
      val:'',
      isValid:true,
    },
    lastName: {
      val:'',
      isValid:true,
    },
    description: {
      val:'',
      isValid:true,
    },
    rate: {
      val:null,
      isValid:true,
    },
    areas: {
      val:[],
      isValid:true,
    },
});

const clearValidity=(input) => {
  console.log(input);
  // formData+'.'+input +'.' +'isValid'=true;
  formData[input].isValid=true;
};

const validateForm=() => {
   formIsvalid.value=true;
   if(formData.firstName.val==='')
   {
    formData.firstName.isValid=false;
    formIsvalid.value=false;
   }
   
   if(formData.lastName.val==='')
   {
    formData.lastName.isValid=false;
    formIsvalid.value=false;
   }

   if(formData.description.val==='')
   {
    formData.description.isValid=false;
    formIsvalid.value=false;
   }

   if(!formData.rate.val || formData.rate.val < 0)
   {
    formData.rate.isValid=false;
    formIsvalid.value=false;
   }

   if(formData.areas.val.length===0)
   {
    formData.areas.isValid=false;
    formIsvalid.value=false;
   }
};

const submitForm=() => {
  validateForm();
  if(!formIsvalid.value)
  {
    return;
  }
   const data={
    first:formData.firstName.val,
    last:formData.lastName.val,
    desc:formData.description.val,
    rate:formData.rate.val,
    areas:formData.areas.val
   }
   emit('save-data',data);
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
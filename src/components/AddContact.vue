<template>
  <div>
    <n-button @click="$router.push({ name: 'contacts-table' })">
      <template #icon>
        <n-icon><back /></n-icon>
      </template>
      Back
    </n-button>
    <h1>Add Contact Form</h1>
    <n-form
        ref="formRef"
        :label-width="80"
        :model="formValues"
        size="large"
    >
      <n-form-item label="First Name">
        <n-input v-model:value="formValues.firstName" placeholder="Enter First Name" />
      </n-form-item>
      <n-form-item label="Last Name">
        <n-input v-model:value="formValues.lastName" placeholder="Enter Last Name" />
      </n-form-item>
      <n-form-item label="Email">
        <n-input v-model:value="formValues.email" type="email" placeholder="Enter Email" />
      </n-form-item>
      <n-form-item label="Phone">
        <n-input v-model:value="formValues.phone" placeholder="Enter Phone Number" />
      </n-form-item>
      <n-form-item>
        <n-button :disabled="isDisabled" class="submit-btn" type="success" :loading="loader" @click="submitContact">
          Submit
        </n-button>
      </n-form-item>
      <n-alert v-if="showErrorAlert" title="Server Error" type="error" :closable="true" />
    </n-form>
  </div>
</template>

<script>
import { addContact } from "../db";
import { ChevronBackCircle as Back } from '@vicons/ionicons5'

export default {
  name: "AddContact",
  components: { Back },
  data() {
    return {
      formValues: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      loader: false,
      showErrorAlert: false,
    }
  },
  computed: {
    isDisabled() { // activating submit btn when every field is filled with input
      return this.formValues.firstName === "" || this.formValues.lastName === "" || this.formValues.email === "" || this.formValues.phone === "";
    },
  },
  methods: {
    async submitContact() {
      this.loader = true
      await addContact(this.formValues)
        .then(() => this.$router.push({ name: 'contacts-table' }))
        .catch(() => this.showErrorAlert = true);
      this.loader = false
    },
  },
}
</script>

<style scoped>
.submit-btn{
  margin-left: auto;
}
</style>

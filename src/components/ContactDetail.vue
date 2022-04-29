<template>
  <div>
    <n-button @click="$router.push({ name: 'contacts-table' })">
      <template #icon>
        <n-icon><back /></n-icon>
      </template>
      Back
    </n-button>
    <h1>Edit Contact</h1>
    <n-form
        ref="formRef"
        :label-width="80"
        :model="contact"
        size="large"
    >
      <n-form-item label="First Name">
        <n-input v-model:value="contact.firstName" placeholder="Enter First Name" />
      </n-form-item>
      <n-form-item label="Last Name">
        <n-input v-model:value="contact.lastName" placeholder="Enter Last Name" />
      </n-form-item>
      <n-form-item label="Email">
        <n-input v-model:value="contact.email" type="email" placeholder="Enter Email" />
      </n-form-item>
      <n-form-item label="Phone">
        <n-input v-model:value="contact.phone" placeholder="Enter Phone Number" />
      </n-form-item>
      <n-form-item>
        <n-space class="footer-btns">
          <n-button :loading="updateLoader" type="success" @click="updatingContact">
            <template #icon>
              <n-icon><edit /></n-icon>
            </template>
            Update
          </n-button>
          <n-button :loading="deleteLoader" type="error" @click="deletingContact">
            <template #icon>
              <n-icon><trash /></n-icon>
            </template>
            Delete
          </n-button>
        </n-space>
      </n-form-item>
      <n-alert v-if="showSuccessAlert" title="Contact Updated Successfully" type="success" :closable="true" />
      <n-alert v-if="showErrorAlert" title="Server Error" type="error" :closable="true" />
    </n-form>
  </div>
</template>

<script>
import { updateContact, deleteContact } from "../db";
import { ChevronBackCircle as Back, CreateSharp as Edit, TrashBinSharp as Trash } from '@vicons/ionicons5'

export default {
  name: "ContactDetail",
  components: { Back, Edit, Trash },
  data() {
    return {
      contact: {},
      updateLoader: false,
      deleteLoader: false,
      showErrorAlert: false,
      showSuccessAlert: false,
    }
  },
  created() {
    this.contact = JSON.parse(localStorage.getItem('selectedContact'))
  },
  methods: {
    async updatingContact() {
      this.updateLoader = true
      await updateContact(this.contact)
        .then(() => this.showSuccessAlert = true)
        .catch(() => this.showErrorAlert = true)
      this.updateLoader = false
    },
    async deletingContact() {
      this.deleteLoader = true
      await deleteContact(this.contact)
        .then(() => this.$router.push({ name: 'contacts-table' }))
        .catch(() => this.showErrorAlert = true)
      this.deleteLoader = false
    },
  },
}
</script>

<style scoped>
.footer-btns{
  margin-left: auto;
}
</style>

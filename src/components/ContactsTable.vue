<template>
  <div>
    <h1>Search Contacts</h1>
    <n-input v-model:value="searchedValue" type="search" placeholder="Search Contacts" />
    <n-layout class="contacts-list">
      <n-scrollbar style="max-height: 16rem">
        <n-skeleton v-if="!contacts.length && contactsLoader" :text="true" :repeat="6" />
        <h3 v-if="!contacts.length && !contactsLoader" style="text-align: center">No Contacts Found</h3>
        <n-card
          v-for="contact in contacts"
          :key="contact.id"
          class="contact-name-row"
          @click="viewDetails(contact)">
          {{ `${contact.firstName} ${contact.lastName}` }}
        </n-card>
      </n-scrollbar>
    </n-layout>
    <div class="add-contact-btn">
      <n-button
        :round="true"
        class="add-contact-btn"
        type="success"
        @click="$router.push({ name: 'add-contact' })">
          <template #icon>
            <n-icon>
              <add/>
            </n-icon>
          </template>
          Add a Contact
      </n-button>
    </div>
  </div>
</template>

<script lang="ts">
import { getContacts } from "../db";
import { AddCircleSharp as Add } from '@vicons/ionicons5'

export default {
  name: "ContactsTable",
  components: { Add },
  data() {
    return {
      contactsData: [],
      searchedValue: '',
      contactsLoader: false,
    }
  },
  async created() {
    this.contactsLoader = true
    await getContacts()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.contactsData.push({ id: doc.id, ...doc.data() })
        })
      })
    this.contactsLoader = false
  },
  computed: {
    contacts() {  // sorting by lastname of contacts & searching by first and last names
      let contacts = this.contactsData?.sort((a, b) => a.lastName.localeCompare(b.lastName))
      if (this.searchedValue && contacts.length) contacts = contacts.filter((contact) => contact.firstName.toLowerCase().includes(this.searchedValue.toLowerCase()) || contact.lastName.toLowerCase().includes(this.searchedValue.toLowerCase()))
      return contacts
    },
  },
  methods: {
    viewDetails(contact) {
      localStorage.setItem('selectedContact', JSON.stringify(contact))
      this.$router.push({ name: 'contact-details' })
    },
  },
}
</script>

<style scoped>
.contacts-list{
  padding: 1.5rem 0;
}
.contact-name-row{
  cursor: pointer;
}
.add-contact-btn{
  text-align: center;
}
</style>

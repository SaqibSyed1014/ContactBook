import { createRouter, createWebHistory } from 'vue-router'
import ContactsTable from "../components/ContactsTable.vue"
import AddContact from "../components/AddContact.vue"
import ContactDetail from "../components/ContactDetail.vue"

const routes = [
    {
        path: '/',
        name: 'contacts-table',
        component: ContactsTable
    },
    {
        path: '/add-contact',
        name: 'add-contact',
        component: AddContact
    },
    {
        path: '/contact-details',
        name: 'contact-details',
        component: ContactDetail
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router

import { reactive } from "vue";

export const store = reactive({
    url: 'http://127.0.0.1:8000/api',
    doctors: '/doctors',

    menu: [
        {
            name: 'about',
            label: 'Su di noi'
        },
        {
            name: 'contact',
            label: 'Contattaci'
        }
    ]
});

const my_component = {
    data() {
        return {
            Nav_index: 1
        }
    },
    methods: {
        alt_Nav_index(index) {
            this.Nav_index = index;
            console.log(this.Nav_index)
        }
    },
    computed: {

    }

}


const My_app = Vue.createApp(my_component)

My_app.component('my_tag', {
    data() {
        return {
            model_txt: '',
        }
    },
    props: ['args', 'todolist'],
    methods: {},
    template:
    /*html*/
        `
    
    `,


})

My_app.mount('#sz-nav')
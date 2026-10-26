var Main = {
    data () {
        return {
            count: 0
        }
    },
    methods: {
        load () {
            this.count += 2
        }
    }
}
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')
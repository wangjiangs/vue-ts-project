import Vue, {AsyncComponent} from "vue"
import Router from "vue-router"
declare let require:any
const HelloWorld:AsyncComponent = resolve => require(["@/components/HelloWorld"], resolve)
const HelloWorld1:AsyncComponent = resolve => require(["@/components/HelloWorld1"], resolve)

Vue.use(Router)

export default new Router({
    mode:"history",
    routes: [{
        path: '/',
        name: 'HelloWorld',
        component:HelloWorld
    },{
        path: '/a',
        name: "helloworld1",
        component: HelloWorld1
    }]
})
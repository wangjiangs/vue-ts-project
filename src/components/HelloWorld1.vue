<template>
    <h1>{{message}}</h1>    
</template>
<script>
import $ from "jquery"
import Vue from "vue"
import {Component} from "vue-property-decorator"
@Component
export default class HelloWorld1 extends Vue {

    message = "hello world!"
}
</script>
<style scoped>
    h1{
        color:green
    }
</style>

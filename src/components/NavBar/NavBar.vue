<template lang="">
    <div class="bg-yellow-300 text-gray-900 py-3.5 px-6 shadow md:flex justify-between items-center fixed w-full top-0 z-50">
        <div class="flex items-center">
            <span class="text-gray-900 text-xl mr-1">
                <i class="bi bi-coin"></i>
            </span>
            <h1 class="text-2xl font-bold">&nbsp; Coin Price Tracker</h1>
        </div>

        <span @click="MenuOpen()" class="absolute md:hidden right-6 top-1.5 cursor-pointer text-4xl">
            <i :class="[open ? 'bi bi-x' : 'bi bi-filter-left']"></i>
        </span>

        <ul class="md:flex md:items-center md:px-0 px-10 md:pb-0 pb-4 md:static bg-yellow-300 absolute md:w-auto w-full top-14 duration-300 ease-in" :class="[open ? 'left-0' : 'left-[-100%]']">
            <li class="md:mx-4 md:my-0 my-6" v-for="link in Links">
                <a :href="link.link" class="text-gray-900 text-xl font-semibold hover:text-yellow-600">{{link.name}}</a>
            </li>
        </ul>
    </div>
</template>
<script>
import { ref } from 'vue';
export default {
    setup(){
        let open = ref(false)
        let Links = [
            {name: "Github", link: "https://github.com/enzoggqs"},
            {name: "LinkedIn", link: "https://www.linkedin.com/in/enzoggqs/"},
        ]

        function MenuOpen(){
            open.value = !open.value
        }

        return{Links, open, MenuOpen}
    }
}
</script>
<style lang="">
    
</style>    
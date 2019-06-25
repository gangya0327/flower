<template>
    <div>
        <HelloWorld/>
        <p>{{url}}</p>
    </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
    data() {
        return {
            url: process.env.VUE_APP_URL,
        };
    },
    components: {
        HelloWorld
    }
};
</script>

<template>
    <groupbook-detail :is-edit="true"></groupbook-detail>
</template>
<script>
import GroupbookDetail from "./components/GroupbookDetail";
export default {
    name: "updateGroupbook",
    components: {
        GroupbookDetail
    }
};
</script>

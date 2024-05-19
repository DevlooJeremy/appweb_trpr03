<script setup lang="ts">
const props = defineProps({
    questions: Array<any>
})

</script>

<template>
    <div>
        <h1 class="text-center">Questions publiques</h1>
        <div class="border border-2 border-dark questions">
            <ul>
                <li name="questions" v-for="(question, index) of props.questions">
                    <div class="border-bottom border-dark border-1 p-2 d-flex" :class="{'super':question.isSuper}">
                        <h4 class="fw-bold">{{ index + 1}}</h4>
                        <div class="ms-2  text-break">
                            {{ question.question }}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.questions {
    height: 600px;
    width: 500px;
}
.super {
    background-color: gold;
}

.taille {
    max-width: 100px;
}

li {
    padding: 0;
}

ul {
    list-style: none;
    padding: 0;
}
</style>
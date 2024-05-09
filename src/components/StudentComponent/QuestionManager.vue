<script setup lang="ts">
import HandManager from './HandManager.vue';
import QuestionWriter from './QuestionWriter.vue';
</script>

<template>
    <div class="border border-2 border-dark">
        <HandManager/>
        <QuestionWriter/>
    </div>
</template>

<style scoped>
div {
    height: 600px;
    width: 800px;
}
</style>
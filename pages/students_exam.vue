<template>

<StudentNavigation/>
    <div>
        jajs
    </div>
</template>

<script setup>
import { StudentNavigation } from '@/components/layout';
definePageMeta({
  layout: 'student_exam',
  colorMode: 'light'
});

useSeoMeta({
  title: 'Login'
});
</script>
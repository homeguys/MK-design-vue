---
pageClass: h-nav-layout
outline: [2, 3, 4]
---

<script setup>
import NAV_DATA from './index'
</script>
<style src="./index.scss"></style>

# 概览

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

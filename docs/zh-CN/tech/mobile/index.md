---
pageClass: h-mobile-layout
outline: [2, 3, 4]
---

<script setup>
import NAV_DATA from './index'
</script>

# 概览

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

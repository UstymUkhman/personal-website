<template>
  <section itemtype="http://schema.org/ItemList" class="experiment-list" itemscope>
    <Preview
      itemtype="http://schema.org/ListItem"
      v-for="experiment in experiments"
      itemprop="itemListElement"
      :experiment="experiment"
      :key="experiment.title"
    />
  </section>
</template>

<script lang="ts">
import Preview from '@components/experiment/Preview.vue'
import { defineComponent, onMounted } from 'vue'
import { firePrerender } from '@/utils'

export default defineComponent({
  name: 'List',

  components: {
    Preview
  },

  props: {
    experiments: {
      type: Array,
      required: true
    }
  },

  setup () {
    onMounted(() =>
      firePrerender({ title: 'Experiments' })
    )
  }
})
</script>

<style lang="scss" scoped>
.experiment-list {
  -webkit-overflow-scrolling: touch;
  justify-content: space-evenly;
  @include vw(padding, 2.5, 0);

  overflow: hidden auto;
  align-items: center;
  position: relative;

  flex-wrap: wrap;
  display: flex;

  @include breakpoint($sm-down) {
    @include vw(padding, 7.5, 0);
  }
}
</style>

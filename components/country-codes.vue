<template>
  <select v-model="op"
    @change="$emit('update:option', op)"
  >
    <option value="">Select Code</option>
    <option 
      v-for="(option,o) in options"
      :key="`option${o}`"
      :value="option.code"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script type="text/javascript">
import 'vue-select/dist/vue-select.css';

export default {
  data: () => ({
    op: '',
    options: [
      {'label': "+91", 'code': "+91"},
      {'label': "+22", 'code': "+22"},
    ],
  }),
  props: ['option'],
  watch: {
    option: {
      immediate: true,
      handler(newVal, oldVal) {
        this.op = newVal
      },
    }
  }
}
</script>
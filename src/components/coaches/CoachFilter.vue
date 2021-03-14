<template>
  <base-card>
    <section class="filter-section">
      <h2>Find your Coach</h2>
      <span class="filter-option">
        <label for="frontend">Frontend</label>
        <input type="checkbox" id="frontend" checked @change="setFilter"/>
      </span>
      <span class="filter-option">
        <label for="backend">Backend</label>
        <input type="checkbox" id="backend" checked @change="setFilter"/>
      </span>
      <span class="filter-option">
        <label for="career">Career</label>
        <input type="checkbox" id="career" checked @change="setFilter"/>
      </span>
    </section>
  </base-card>
</template>

<script>
export default {
  emit: ['change-filter'],
  data () {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  methods: {
    setFilter (event) {
      const inputId = event.target.id
      const isActive = event.target.checked
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive
      }
      this.filters = updatedFilters
      this.$emit('change-filter', updatedFilters)
    }
  }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0 1rem 0;
  text-align: center;
}

.filter-section {
  width: 50%;
  margin: 0 auto;
}

.filter-option {
  display: flex;
  width: 80%;
  margin: 0 auto !important;
}

.filter-option label,
.filter-option input {
  width: 50%;
}

.filter-option label {
  margin-left: 2.5rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
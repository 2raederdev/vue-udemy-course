<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue'

export default {
  components: {
    CoachForm
  },
  methods: {
    saveData (data) {
      try {
        this.$store.dispatch('coaches/registerCoach', data)
        setTimeout(() => this.$router.replace({ path: '/coaches' }), 1000)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>

</style>
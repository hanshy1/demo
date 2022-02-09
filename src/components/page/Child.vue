<template>
  <div>
    <p>Hello World</p>
    <div class="input-group">
      <div class="input-item">
        <label>loan_total: </label>
        <input 
          v-model="loan_total"
          class="loan-input"
          type="text">
      </div>
      <div class="input-item">
        <label>loan_month: </label>
        <input
          v-model="loan_month"
          class="loan-input"
          type="text">
      </div>
      <button>calculate</button>
    </div>
    <div class="result-area">
      <span></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Child extends Vue {
  private loan_total = 0
  private loan_month = 0
  private per_year_rate = 0.05
  
  private result_arr = []

  created(): void {
    document.body.append(this.$el)
    this.calculate()
  }

  destroyed(): void {
    this.$el.remove()
  }

  calculate(): void {
    const total = 600000
    const per_year_rate = 0.05
    const per_month_rate = Math.round(per_year_rate * 100000 / 12) / 100000
    const months = 120
    let loan_total = 0
    let loan_overrage = total
    let loan_per_month = []
    for (let i = 0; i < months; i ++) {
      loan_overrage = total - (Math.round((total / months))* i)
      loan_total += loan_overrage * per_month_rate
      loan_per_month.push(Math.round((total / months)) + loan_overrage * per_month_rate)
    }
    console.log('loan_total: ', loan_total)
    console.log('loan_per_month: ', loan_per_month)
  }
}
</script>
<style scoped>
  .input-group {
    background-color: azure;
  }

  .loan-input {
    margin-left: 10px;
    width: 200px;
  }
</style>

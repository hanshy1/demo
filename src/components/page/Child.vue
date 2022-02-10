<template>
  <div>
    <p>Hello World</p>
    <div class="input-group">
      <div class="input-item">
        <label>loanTotal(W): </label>
        <input 
          v-model="loanTotal"
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
      <div>
        <button
          type="button"
          @click="calculate()">
          calculate
        </button>
        <button
          type="button"
          @click="clearResult()">
          clear
        </button>
      </div>
    </div>
    <div 
      v-if="isShowResultArea"
      class="result-area">
      <span>{{ result_loan }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Child extends Vue {
  private loanTotal = 0
  private loan_month = 0
  private per_year_rate = 0.05

  private result_arr: Array<number> = []
  private result_loan = 0
  private isShowResultArea = false

  mounted(): void {
    document.body.append(this.$el)
  }

  destroyed(): void {
    this.$el.remove()
    const ele = document.createElement('span')
    const innerText = 'destoryed'
    document.body.append(ele)
    let count = 5
    const interval = setInterval(() => {
      if (count < 0) {
        clearInterval(interval)
        ele.remove()
      }
      const suffix = ['·', '· ·', '· · ·', '· · · ·']
      ele.innerText = innerText + ' ' + (count--) + ' ' + (count >= 0 ?suffix[(suffix.length - 1) - count % suffix.length]: '')
    }, 1000)
  }

  calculate(): void {
    this.result_loan = 0
    const total = this.loanTotal * 10000
    const months = this.loan_month
    const per_year_rate = 0.05
    const per_month_rate = Math.round(per_year_rate * 100000 / 12) / 100000
    let loan_overrage = total
    for (let i = 0; i < months; i ++) {
      loan_overrage = total - (Math.round((total / months))* i)
      this.result_loan += loan_overrage * per_month_rate
      this.result_arr.push(Math.round((total / months)) + loan_overrage * per_month_rate)
    }
    this.isShowResultArea = true
    // console.log('loanTotal: ', this.result_loan)
    // console.log('loan_per_month: ', this.result_arr)
  }

  clearResult(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.assign(this.$data, this.$options.data.call(this))
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

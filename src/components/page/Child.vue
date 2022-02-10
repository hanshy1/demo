<template>
  <div>
    <p>Hello World</p>
    <div class="input-group">
      <div class="input-item">
        <label>loan_total(W): </label>
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
      <div>
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="calculate()">
          calculate
          <v-icon
            right
            dark>
            mdi-cloud-upload
          </v-icon>
        </v-btn>
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
  private loan_total = 0
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
    let count = 3
    const interval = setInterval(() => {
      if (count < 0) {
        clearInterval(interval)
        ele.remove()
      }
      ele.innerText = innerText + ' ' + (count--) + '...'
    }, 1000)
  }

  calculate(): void {
    this.result_loan = 0
    const total = this.loan_total * 10000
    const months = this.loan_month
    const per_year_rate = 0.05
    const per_month_rate = Math.round(per_year_rate * 100000 / 12) / 100000
    // let loan_total = 0
    let loan_overrage = total
    // let loan_per_month = []
    for (let i = 0; i < months; i ++) {
      loan_overrage = total - (Math.round((total / months))* i)
      this.result_loan += loan_overrage * per_month_rate
      this.result_arr.push(Math.round((total / months)) + loan_overrage * per_month_rate)
    }
    this.isShowResultArea = true
    // console.log('loan_total: ', loan_total)
    // console.log('loan_per_month: ', loan_per_month)
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

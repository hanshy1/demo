<template>
  <div>
    <div class="form-area">
      <v-form
        ref="calcForm"
        v-model="isFormValid"
        lazy-validation>
        <v-container>
          <v-row>
            <v-col
              v-for="textFieldItem in textFields"
              :key="textFieldItem.id"
              cols="12"
              sm="4">
              <v-text-field
                v-model="$data[textFieldItem.id]"
                :rules="textFieldItem.validate"
                :label="textFieldItem.id + ':'"
                :suffix="textFieldItem.suffix"
                required
                clearable />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="4">
              <div class="footer-button">
                <v-btn
                  outlined
                  color="indigo"
                  @click="calculate()">
                  <v-icon>mdi-calculator</v-icon>Calculate
                </v-btn>
                <v-btn
                  outlined
                  color="green"
                  @click="clearResult()">
                  <v-icon>mdi-cached</v-icon>Clear
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
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
  private loanTotal = ''
  private loanMonth = ''
  private annualInterestRate = '5'

  private result_arr: Array<number> = []
  private result_loan = 0
  private isShowResultArea = false
  private isFormValid = true

  private textFields = [
    { 
      id: 'loanTotal',
      validate: [
        (v: number) => !!v || v == 0 || 'loanTotal is required',
        (v: string) => (Number(v) && parseFloat(v) > 0) || 'loanTotal must be number and more than 0',
      ],
      suffix: 'W'
    },
    { 
      id: 'loanMonth',
      validate: [
        (v: number) => !!v || v == 0 || 'loanMonth is required',
        (v: string) => (Number(v) && parseFloat(v) > 0) || 'loanMonth must be number and more than 0',
      ],
      suffix: 'month'
    },
    { 
      id: 'annualInterestRate',
      validate: [
        (v: number) => !!v || 'annualInterestRate is required',
        (v: string) => (Number(v) && parseFloat(v) > 0 && parseFloat(v) < 100) || 'annualInterestRate must be number and more than 0 or less than 100',
      ],
      suffix: '%'
    }
  ]

  mounted(): void {
    // document.body.append(this.$el)
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!this.$refs.calcForm?.validate()) {
      return
    }
    this.result_loan = 0
    const total = parseFloat(this.loanTotal) * 10000
    const months = parseInt(this.loanMonth)
    const per_year_rate = parseFloat(this.annualInterestRate) / 100
    const per_month_rate = Math.round(per_year_rate * 100000 / 12) / 100000
    let loan_overrage = total
    for (let i = 0; i < months; i ++) {
      loan_overrage = total - (Math.round((total / months))* i)
      this.result_loan += loan_overrage * per_month_rate
      this.result_arr.push(Math.round((total / months)) + loan_overrage * per_month_rate)
    }
    this.isShowResultArea = true
  }

  clearResult(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$refs.calcForm?.resetValidation()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.assign(this.$data, this.$options.data.call(this))
  }
}
</script>
<style scoped>
  .form-area {
    width: 100%;
  }

  .footer-button button {
    margin-right: 10px;
  }
</style>

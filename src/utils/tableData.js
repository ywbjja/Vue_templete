import { initData } from '@/api/data'

export default {
  data() {
    return {
      loading: true,
      dataArr: [],
      curPageNum: 0,
      pageSize: 10,
      total: 0,
      url: '',
      params: {},
      query: {},
      time: 170
    }
  },

  methods: {
    async init() {
      if (!await this.beforeInit()) {
        return
      }
      return new Promise((resolve, reject) => {
        this.loading = true
        initData(this.url, this.data).then(res => {
          this.total = res.data.pageTotal
          this.dataArr = res.data.data
          console.log(this.dataArr)
          setTimeout(() => {
            this.loading = false
          }, this.time)
          resolve(res)
        }).catch(err => {
          this.loading = false
          reject(err)
        })
      })
    },
    beforeInit() {
      return true
    },
    pageChange(e) {
      this.page = e - 1
      this.init()
    },
    sizeChange(e) {
      this.page = 0
      this.size = e
      this.init()
    }
  }

}

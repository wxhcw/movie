export default {
    data() {
        return {
            timer: null,
            tableHeight: 380,
            wait: 200
        }
    },
    methods: {
        resize() {
            if (this.timer) {
                // 如果在指定时间间隔内又再次触发，则继续延时
                clearTimeout(this.timer);
            }
            // 重点：使用$nextTick函数
            this.$nextTick(() => {
                this.timer = setTimeout(() => {
                    const height = this.defaultHeight || 70
                        // console.log('height: ' + height);
                    const offsetTop = this.$refs.selection ? this.$refs.selection.$el.offsetTop : 0
                        // console.log('offsetTop: ' + offsetTop);
                        // console.log('window.innerHeight : ' + window.innerHeight);
                    this.tableHeight = window.innerHeight - offsetTop - height - 65;
                    // console.log('tableHeight : ' + this.tableHeight);
                    // console.log('----------------');
                }, this.wait);
            });
        },
    }
};
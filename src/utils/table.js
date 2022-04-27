import axios from "axios";

export default {
    /**
     * BUG列表获取接口
     * @method getBugList
     * @params {Object} params 传递给接口的参数对象，id
     * @returns {promise}
     */
    getFFList(params) {
        return axios({
            method: "get",
            url: "http://10.33.65.152:8280/firefly/component/allComVersion?name=web&serviceType=1&isAdmin=0",
            // url: 'http://10.33.65.152:8280/firefly/dict/1',
            data: params
        });
    },
};
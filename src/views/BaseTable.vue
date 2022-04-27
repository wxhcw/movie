<template>
  <div class="container">
    <div class="handle-box">
      <Select
        v-model="username"
        clearable
        class="handle-select mirr"
        placeholder="用户名"
        @on-change="changeData"
      >
        <Option v-for="item in nameArr" :value="item" :key="item">{{
          item
        }}</Option>
      </Select>
      <Input placeholder="输入地址搜索" class="handle-input mirr" />
      <Button type="primary" icon="ios-search">搜索</Button>
    </div>

    <div class="table">
      <Table
        ref="selection"
        border
        :columns="tableColumns"
        :data="currentData.results"
        :height="tableHeight"
      >
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 10px"
            @click="handleEdit(index, row)"
            >编辑</Button
          >
          <Button
            type="warning"
            size="small"
            style="margin-right: 10px"
            @click="buildTable(row)"
            >构建</Button
          >
          <Button type="error" size="small" @click="handleDelete(index)"
            >删除</Button
          >
        </template>
      </Table>
    </div>
    <div class="paging">
      <Page
        :current="pageNum"
        :page-size="pageSize"
        :total="currentData.totalCount"
        @on-change="changePage"
        show-total
      />
    </div>

    <!-- 编辑弹出框 -->
    <Modal v-model="editVisible" title="编辑">
      <Form
        ref="formCustom"
        :model="formCustom"
        :rules="ruleCustom"
        :label-width="80"
      >
        <FormItem label="用户名" prop="name">
          <Input v-model="formCustom.name"></Input>
        </FormItem>
        <FormItem label="年龄" prop="age">
          <Input v-model="formCustom.age" number></Input>
        </FormItem>
        <FormItem label="地址" prop="address">
          <Input v-model="formCustom.address"></Input>
        </FormItem>
        <FormItem label="日期" prop="date">
          <Input v-model="formCustom.date"></Input>
        </FormItem>
      </Form>
      <template #footer>
        <span class="dialog-footer">
          <Button @click="editVisible = false">取消</Button>
          <Button
            type="primary"
            @click="saveEdit('formCustom')"
            style="margin-left: 10px"
            >确定</Button
          >
        </span>
      </template>
    </Modal>
   
  </div>
</template>
<script>
// import tableServer from "../api/apis";
import mixins from "../utils/mixinxs";
export default {
  name: "basetable",
  mixins: [mixins],
  data() {
    
    const validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your name"));
      } else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Age cannot be empty"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("Please enter a numeric value"));
      } else {
        callback();
      }
    };
    const validateAddress = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your address"));
      } else {
        callback();
      }
    };
    const validateDate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your date"));
      } else {
        callback();
      }
    };
    return {
      buildData: {},
      editVisible: false,
      isShowCompile: false,
      idx: -1,
      nameArr: [],
      formCustom: {
        name: "",
        age: "",
        address: "",
        date: "",
      },
      ruleCustom: {
        name: [{ validator: validateName, trigger: "blur" }],
        age: [{ validator: validateAge, trigger: "blur" }],
        address: [{ validator: validateAddress, trigger: "blur" }],
        date: [{ validator: validateDate, trigger: "blur" }],
      },
      tableColumns: [
        {
          title: "用户名",
          slot: "name",
        },
        {
          title: "年龄",
          key: "age",
        },
        {
          title: "地址",
          key: "address",
        },
        {
          title: "操作",
          slot: "action",
          width: 300,
          align: "center",
        },
        {
          title: "日期",
          key: "date",
        },
        
      ],
      currentData: [],
      pageNum: 1,
      pageSize: 4,
      username: "wty",
      tableHeight: 500,
    };
  },
  methods: {
    buildTable(data) {
      this.buildData = data;
      this.isShowCompile = true;
    },
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.initdata();
    },
    changeData() {
      this.pageNum = 1;
      this.initdata();
    },
    //对选择器里的用户名进行去重操作
    removal() {
      let map = new Map();
      this.nameArr = []; //要初始化清空数据，因为数据是实时展示的
      for (const item of this.currentData.results) {
        if (!map.has(item.name)) {
          map.set(item.name, item);
          this.nameArr.push(item.name);
        }
      }
    },
    //编辑表格行数据并将表格行数据的值传给表单
    handleEdit(index, row) {
      this.idx = index;
      // console.log('handle'+this.idx)
      Object.keys(this.formCustom).forEach((item) => {
        this.formCustom[item] = row[item];
      });
      //显示对话框进行编辑
      this.editVisible = true;
    },
    //保存编辑的内容（包含校验）并将修改后的内容传给表格行数据
    saveEdit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.editVisible = false;
          this.$Message.success("修改成功");
          Object.keys(this.formCustom).forEach((item) => {
            this.currentData.results[this.idx][item] = this.formCustom[item];
          });
          // console.log("beforesave");
          this.removal();
          // console.log(this.nameArr.join());
        } else {
          this.$Message.error("修改失败");
        }
      });
      // console.log('save'+this.idx);
    },
    //二次确认是否删除
    handleDelete(index) {
      this.$Modal.confirm({
        title: "确定要删除吗？",
        // content: '<p>Content of dialog</p><p>Content of dialog</p>',
        onOk: () => {
          this.$Message.success("删除成功");
          this.currentData.results.splice(index, 1);
          this.removal(); //实时更新下拉框的数据
        },
      });
    },
    // 请求列表数据
    initdata() {
      // let params = {
      //   pageNum: this.pageNum,
      //   pageSize: this.pageSize,
      //   username: this.username,
      // };
      // tableServer.getList().then((res) => {
      //   this.currentData = res;
      //   this.removal();
      // });
    },
  },
  mounted() {
    window.onresize = this.resize;
    this.resize();
    this.initdata();
  },
  destroyed() {
    window.onresize = null;
  },
};
</script>
<style>
.container {
  margin: 0 auto;
  padding: 15px;
  height: 100%;
}
.handle-box {
  margin-bottom: 20px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.paging {
  margin-top: 20px;
  float: right;
}
.handle-select {
  width: 120px;
}
.mirr {
  margin-right: 10px;
}
</style>

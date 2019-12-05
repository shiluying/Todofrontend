<template>
  <div class="hello">
    <el-dialog title="添加待办信息" :visible.sync="TodoAdd.show">
      <el-form :model="FormData" ref="addForm" label-width="100px" :rules="formrules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="FormData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="FormData.content"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="time">
          <el-date-picker
            v-model="FormData.time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截止日期" prop="deadline">
          <el-date-picker
            v-model="FormData.deadline"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标记" prop="grade" @change="getGrade">
          <el-select v-model="FormData.grade">
            <el-option
              v-for="item in gradeList"
              :key="item.id"
              :label="item.value"
              :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="完成度" prop="progress" @change="getProgress">
          <el-select v-model="FormData.progress">
            <el-option
              v-for="item in progressList"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务情况描述" prop="note">
          <el-input v-model="FormData.note"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="TodoAdd.show = false">取 消</el-button>
        <el-button type="primary" @click="sendFormData('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddTodo',
  props: {
    TodoAdd: Object
  },
  data () {
    return {
      // 表单数据
      FormData: {
        title: '',
        content: '',
        grade: '',
        time: '',
        deadline: '',
        progress: '',
        note: ''
      },
      gradeList: [
        {
          id: '1',
          value: '普通任务'
        },
        {
          id: '2',
          value: '重要任务'
        },
        {
          id: '3',
          value: '特殊任务'
        }
      ],
      progressList: [
        {
          id: '1',
          value: '未开始'
        },
        {
          id: '2',
          value: '进行中'
        },
        {
          id: '3',
          value: '已结束'
        }
      ],
      // 表单规则
      formrules: {
        title: [{required: true, message: '标题不能为空', trigger: 'blur'}],
        content: [{required: true, message: '内容不能为空', trigger: 'blur'}],
        time: [{required: true, message: '开始时间不能为空', trigger: 'blur'}],
        deadline: [{required: true, message: '截止时间不能为空', trigger: 'blur'}],
        grade: [{required: true, message: '标记不能为空', trigger: 'blur'}],
        progress: [{required: true, message: '完成度不能为空', trigger: 'blur'}]
      }
    }
  },
  methods: {
    sendFormData (addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          this.TodoAdd.show = false
          this.$emit('update', this.FormData)
          this.FormData = ''
        } else {
          console.log('添加待办失败')
          return false
        }
      })
    },
    getGrade () {
      this.gradeList = FormData.data.gradeList
    },
    getProgress () {
      this.progressList = FormData.data.progressList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

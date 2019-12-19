<template>
    <div id="main">
      <br/>
    <div class="el-row">
      <el-form :inline="true">
        <el-form-item style="float: left" label="查询:">
          <el-input v-model="filter" @change="doFilter" placeholder="对标记or完成度进行查询"></el-input>
        </el-form-item>
      </el-form>
      <div><el-date-picker
        v-model="starttime"
        type="date"
        placeholder="开始日期"
        :picker-options="pickerOptions0">
      </el-date-picker>
        <el-date-picker
          v-model="endtime"
          type="date"
          placeholder="结束日期"
          :picker-options="pickerOptions1">
        </el-date-picker>
        <el-button type="primary" @click="doSearch()">查询</el-button>
        <el-button type="primary" @click="doGetAll()">查看全部</el-button>
        <el-button type="primary" @click="doAdd()">添加</el-button></div>
    </div>
      <el-row style="text-align: center;">
          <div class="table">
            <el-table
              :data="todoList"
              border
              style="width: 100%">
              <el-table-column
                label="标题"
                width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="内容"
                width="400">
                <template slot-scope="scope">
                  <span>{{ scope.row.content}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="开始日期"
                width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.time | moment}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="截止日期"
                width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.deadline | moment}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="标记"
                width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.grade }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="完成度"
                width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.progress }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="任务情况描述"
                width="250">
                <template slot-scope="scope">
                  <span>{{ scope.row.state }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                fixed="right"
                width="300">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="doEdit(scope.$index,scope.row)"
                    >编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="doDelete(scope.$index)"
                    >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
      </el-row>
      <br/>
      <p>提示信息：</p>
      <el-row>
        <div class="el-col-6">
          <el-table
            :data="tipList"
            border
            style="width: 100%">
            <el-table-column
              label="标题">
              <template slot-scope="scope">
                <span>{{ scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="提示信息">
              <template slot-scope="scope">
                <span>{{ scope.row.tip}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
      <EditTodo :TodoEdit="TodoEdit" :FormData="FormData" @update="receive"></EditTodo>
    </div>
</template>

<script>
import EditTodo from '@/components/EditTodo'
export default {
  components: {EditTodo},
  data () {
    return {
      index: -1,
      filter: '',
      starttime: new Date(),
      endtime: new Date(),
      tipList: [],
      todoList: [
        {
          title: '标题一',
          content: '完成交互设计实验一',
          grade: '普通任务',
          time: new Date(2019, 8, 1),
          deadline: new Date(2019, 9, 14),
          progress: '已开始',
          note: ''
        },
        {
          title: '标题二',
          content: '完成安卓实验一',
          grade: '重要任务',
          time: new Date(2019, 9, 25),
          deadline: new Date(2019, 10, 21),
          progress: '已完成',
          note: ''
        },
        {
          title: '标题三',
          content: '完成交互实验二',
          grade: '重要任务',
          time: new Date(2019, 10, 30),
          deadline: new Date(2019, 11, 8),
          progress: '进行中',
          note: ''
        },
        {
          title: '标题四',
          content: '完成操作系统实验一',
          grade: '普通任务',
          time: new Date(2019, 10, 8),
          deadline: new Date(2019, 10, 8),
          progress: '未开始',
          note: ''
        }
      ],
      tempList: [],
      FormData: {
        title: '',
        content: '',
        grade: '',
        time: '',
        deadline: '',
        progress: '',
        note: ''
      },
      TodoEdit: {
        show: false
      },
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.endtime !== '') {
            return time.getTime() > this.endtime
          } else {
            return time.getTime() > Date.now()
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < this.starttime
        }
      }
    }
  },
  methods: {
    doTip () {
      var temp = []
      var time = 0
      var now = new Date()
      this.tipList = []
      for (var num = 0; num < this.tempList.length; num++) {
        if (this.tempList[num].progress === '已完成') {
          continue
        }
        time = -this.getTime(now, this.tempList[num].deadline)
        if (time < 7) {
          temp.title = this.tempList[num].title
          if (time < 0) {
            temp.tip = '该任务已过期' + -time + '天'
          } else {
            temp.tip = '该任务还有' + time + '天截止'
          }
          this.tipList.push(temp)
        }
        temp = []
      }
    },
    doAdd () {
      this.TodoEdit.show = true
      this.index = -1
      this.FormData = {
        title: '',
        content: '',
        grade: '',
        time: '',
        deadline: '',
        progress: '',
        note: ''
      }
    },
    receive: function (data) {
      if (this.index !== -1) {
        var templist = []
        for (var num = 0; num < this.tempList.length; num++) {
          if (num === this.index) {
            templist.push(data)
          } else {
            templist.push(this.tempList[num])
          }
        }
        this.todoList = templist
        this.tempList = this.todoList
        this.index = -1
      } else {
        this.todoList.push(data)
        this.tempList = this.todoList
      }
      this.doTip()
    },
    doEdit (index, row) {
      this.TodoEdit.show = true
      this.index = index
      this.FormData = {
        title: row.title,
        content: row.content,
        grade: row.grade,
        time: row.time,
        deadline: row.deadline,
        progress: row.progress,
        note: row.note
      }
    },
    doDelete: function (index) {
      var temp = []
      for (var i = 0; i < this.tempList.length; i++) {
        if (this.todoList[index] === this.tempList[i]) {
          continue
        } else {
          temp.push(this.tempList[i])
        }
      }
      this.tempList = temp
      this.todoList = this.tempList
      this.doFilter(this.filter)
      this.doTip()
    },
    doSearch: function () {
      var templist = []
      for (var num = 0; num < this.tempList.length; num++) {
        if (this.getTime(this.starttime, this.tempList[num].time) <= 0 && this.getTime(this.endtime, this.tempList[num].deadline) >= 0) {
          templist.push(this.tempList[num])
        }
      }
      this.todoList = templist
    },
    doGetAll () {
      this.todoList = this.tempList
    },
    doFilter (filter) {
      var templist = []
      if (filter === '') {
        this.todoList = this.tempList
        return this.tempList
      }
      for (var num = 0; num < this.tempList.length; num++) {
        if (this.tempList[num].grade === filter || this.tempList[num].progress === filter) {
          templist.push(this.tempList[num])
        }
      }
      this.todoList = templist
    },
    getTime (time1, time2) {
      console.log(time1)
      console.log(time2)
      var sArr = []
      var eArr = []
      sArr.push(time1.getFullYear())
      sArr.push(time1.getMonth())
      sArr.push(time1.getDate())
      eArr.push(time2.getFullYear())
      eArr.push(time2.getMonth())
      eArr.push(time2.getDate())
      var sRDate = new Date(sArr[0], sArr[1], sArr[2])
      var eRDate = new Date(eArr[0], eArr[1], eArr[2])
      var days = (sRDate - eRDate) / (24 * 60 * 60 * 1000)
      return days
    }
  },
  created () {
    this.tempList = this.todoList
    this.doTip()
  }
}

</script>

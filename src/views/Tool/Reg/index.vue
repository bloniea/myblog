<template>
  <div class="reg">
    <h3><i class="iconfont iconshandian"></i> 正则表达式在线测试</h3>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">正则表达式</div>
      </el-col>
      <el-col :span="15">
        <div class="grid-content bg-purple-light">
          <el-input v-model="reg"></el-input>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple-light">
          <el-select v-model="fun" class="m-2" placeholder="Select">
            <el-option
              v-for="item in funs"
              :key="item.fun"
              :label="item.label"
              :value="item.fun"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light">
          <el-button @click="submit">执行</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content">字符串</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <el-input type="textarea" :rows="3" v-model="str"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content">输出</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <pre>{{ result == null ? 'null' : result }}</pre>
        </div>
      </el-col>
    </el-row>
    <span>元字符:</span>
    <ul class="tip">
      <li>\d 匹配任意一个数字 [0-9]</li>
      <li>\D 与除了数字以外的任何一个字符匹配 [^0-9]</li>
      <li>\w 与任意一个英文字母,数字或下划线匹配 [a-zA-Z_]</li>
      <li>\W 除了字母,数字或下划线外与任何字符匹配 [^a-zA-Z_]</li>
      <li>\s 任意一个空白字符匹配，如空格，制表符\t，换行符\n [\n\f\r\t\v]</li>
      <li>\S 除了空白符外任意一个字符匹配 [^\n\f\r\t\v]</li>
      <li>. 匹配除换行符外的任意字符</li>
    </ul>
    <span>修饰符:</span>
    <ul>
      <li>i 不区分大小写字母的匹配</li>
      <li>g 全局搜索所有匹配内容</li>
      <li>m 视为多行</li>
      <li>s 视为单行忽略换行符，使用. 可以匹配所有字符</li>
      <li>y 从 regexp.lastIndex 开始匹配</li>
      <li>u 正确处理四个字符的 UTF-16 编码</li>
    </ul>
    <span>原子表</span>
    <ul>
      <li>[] 只匹配其中的一个原子</li>
      <li>[^] 只匹配"除了"其中字符的任意一个原子</li>
      <li>[0-9] 匹配0-9任何一个数字</li>
      <li>[a-z] 匹配小写a-z任何一个字母</li>
      <li>[A-Z] 匹配大写A-Z任何一个字母</li>
    </ul>
    <span>重复匹配</span>
    <ul>
      <li>* 重复零次或更多次</li>
      <li>+ 重复一次或更多次</li>
      <li>? 重复零次或一次</li>
      <li>{n} 重复n次</li>
      <li>{n,} 重复n次或更多次</li>
      <li>{n,m} 重复n到m次</li>
    </ul>
    <span>禁止贪婪</span>
    <ul>
      <li>*? 重复任意次，但尽可能少重复</li>
      <li>+? 重复1次或更多次，但尽可能少重复</li>
      <li>?? 重复0次或1次，但尽可能少重复</li>
      <li>{n,m}? 重复n到m次，但尽可能少重复</li>
      <li>{n,}? 重复n次以上，但尽可能少重复</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'

const str = ref('')
const reg = ref('')
const result = ref('')
const fun = ref('match')
const funs = [
  { label: 'match', fun: 'match' },
  { label: 'search', fun: 'search' },
  { label: 'test ', fun: 'test' },
]
const submit = () => {
  console.log(fun.value)
  if (fun.value == 'test') {
    let r = eval(reg.value)
    result.value = r.test(str.value)
  } else {
    try {
      let r = eval(reg.value)
      result.value = str.value[fun.value](r)
    } catch (e) {
      result.value = '语法错误'
    }
  }
}
</script>

<style lang="stylus" scoped>
pre {
  height 100px
  overflow-y auto
}
</style>

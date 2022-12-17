<template>
  <div class="dashboard-editor-container">

    <!-- 图标 -->
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :lg="6" v-for="item in cardList" :key="item.id">
        <YuCard :end="item.end" :duration="item.duration" :title="item.title" :prefix="item.prefix">
          <template #icon>
            <i class="fr" :class="item.icon"></i>
          </template>
          <template #badge>
            <span class="badge" :class="item.badge.className">{{ item.badge.txt }}</span>
          </template>
          <template #info>{{ item.info }}</template>
        </YuCard>
      </el-col>
    </el-row>
    <div class="show-data">
      展示区
    </div>
    <!-- 表格 -->
    <el-row :gutter="20" class="chats-container">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <RaddarChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <PieChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <BarChart class-name="test" />
        </div>
      </el-col>
    </el-row>

  </div>

</template>

<script setup>
import YuCard from './components/Card/index.vue'
import RaddarChart from './components/Chart/RaddarChart.vue'
import PieChart from './components/Chart/PieChart.vue'
import BarChart from './components/Chart/BarChart.vue'
import { ref } from 'vue'

const cardList = ref([
  {
    id: 1,
    end: 6666,
    duration: 3000,
    prefix: '指数：',
    title: '智能化',
    icon: 'yu-icon-lifangti',
    badge: {
      className: 'bg-info',
      txt: '+56%'
    },
    info: 'From previous period'
  },
  {
    id: 2,
    end: 95270,
    duration: 3000,
    prefix: '指数：',
    title: '资源化',
    icon: 'yu-icon-chanpin1',
    badge: {
      className: 'bg-danger',
      txt: '+78%'
    },
    info: 'From previous period'
  },
  {
    id: 3,
    end: 666,
    duration: 1000,
    prefix: '指数：',
    title: '标签化',
    icon: 'yu-icon-jiagebiaoqian',
    badge: {
      className: 'bg-warning',
      txt: '-5.2%'
    },
    info: 'From previous period'
  },
  {
    id: 4,
    end: 9527,
    duration: 3000,
    prefix: '指数：',
    title: '开源化',
    icon: 'yu-icon-icon_xinyong_xianxing_jijin-129',
    badge: {
      className: 'bg-info',
      txt: '+22%'
    },
    info: 'From previous period'
  }
])


</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chats-container {
    .chart-wrapper {
      border-radius: 5px;
      background: #fff;
      padding: 20px;
      box-sizing: border-box;
      margin-bottom: 20px;
      box-shadow: 0 -3px 31px 0 rgb(0 0 0 / 5%), 0 6px 20px 0 rgb(0 0 0 / 2%);

      &:hover {
        transition: all 0.3s;
        transform: translateY(-6px);
      }
    }
  }
  .show-data{
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    background-color: pink;
  }

}
</style>

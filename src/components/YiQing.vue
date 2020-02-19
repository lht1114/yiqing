<template>
    <div class="main">
        <div class="content" ref="mapbox"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import jsonp from 'jsonp'
const option = {
    title: {
        text: '疫情实况',
        subtext: '坚持.'
    },
    series: [{
        name: '确诊人数',
        type: 'map',
        map: 'china',
        label: {
            //控制地区的汉字
            show: true,
            color: '#333',
            fontSize: 10
        },
        // roam: true, //地图缩放效果
        zoom: 1.2,
        itemStyle: {
            areaColor: '#eee',
            // borderCorlor: 'blue'
        },
        emphasis: {
            label: {
                color: '#fff',
                fontSize: 12
            },
            itemStyle: {
                areaColor: '#83b5e7'
            }
        },
        data: [] //展示数据
    }],
    visualMap: [{
        type: 'piecewise',
        show: true,
        splitNumber: 6,
        pieces: [
            //分段
            {min:10000},
            {min:1000,max:9999},
            {min:100,max:999},
            {min:10,max:99},
            {min:1,max:9},
            {max:0}
        ],
        inRange: {
            sysbol: 'rect',
            color: ['#ffc0b1','#9c0505']
        },
        itemWidth: 20,
        itemHeight: 10
    }],
    tooltip: {
        trigger: 'item'
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    }
}

export default {
  name: 'yiqing',
  mounted () { 
    this.getData()
    this.myecharts = echarts.init(this.$refs.mapbox)
    this.myecharts.setOption(option)
  },
  methods: {
    getData () {
        jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',{},( err, data) => {
            if (!err) {
                // console.log(data)
                let list = data.data.list.map(item => ({name:item.name,value:item.value}))
                option.series[0].data = list
                this.myecharts.setOption(option)
            }else {
                console('错误')
            }
        })
    }
  }
}
</script>
<style>
.main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    justify-items: center;
}
.content {
    height:50vh;
    width:55%;
}
@media screen and (max-width: 720px){
    .content {
        height:50vh;
        width:98%;
    }
}
</style>

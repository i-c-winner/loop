
const optionGauge = {
  series: [
    {
      type: 'gauge',
      progress: {
        show: true,
        width: 18,
        itemStyle: {
          color: '#3a3f4b' // красная полоска прогресса
        }
      },
      axisLine: {
        lineStyle: {
          width: 18
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        length: 15,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      axisLabel: {
        distance: 25,
        color: '#999',
        fontSize: 20,
        show: false
      },
      anchor: {
        show: true,
        showAbove: true,
        size: 25,
        itemStyle: {
          borderWidth: 10
        }
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        fontSize: 30,
        offsetCenter: [0, '70%'],
        formatter: '{value}%'
      },
      data: [
        {
          value: 83
        }
      ]
    }
  ]
};

export {optionGauge}

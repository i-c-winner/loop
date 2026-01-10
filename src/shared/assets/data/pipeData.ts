const option = {
  title: {
    text: 'Общая информация',
    subtext: 'исполнение всех разделов',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 85, name: 'Закончено' },
        { value: 15, name: 'Осталось' },
      ],
      label: {
        show: true,
        formatter: '{b}: {d}%'
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

const options = {
  legend: {
    selectedMode: false
  },
  xAxis: {
    type: 'value',
    max: 100
  },
  yAxis: {
    type: 'category',
    data: [
      'Общие данные',
      'Архитектурные решения',
      'Технологические решения',
      'Водоснабжение и канализация',
      'Отопление и вентиляция',
      'Электроснабжение',
      'Слаботочные сети',
      'Газоснабжение',
      'Наружные водопровод и канализация',
      'Генплан',
      'Противопожарные мероприятия'
    ]
  },
  series: (() => {
    const data = Array.from({ length: 11 }, () => {
      const first = Math.floor(Math.random() * 51) + 50; // 50–100
      return [first, 100 - first];
    });

    return [
      {
        name: 'Выполенно',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}%'
        },
        data: data.map(d => d[0])
      },
      {
        name: 'Осталось',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}%'
        },
        data: data.map(d => d[1])
      }
    ];
  })()
};

export {option, options}

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

const projects=['First Project', 'Second Project']

const options = {
  legend: {
    selectedMode: true
  },
  xAxis: {
    type: 'value',
    max: 100,
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
        barWidth: 20,
        stack: 'total',
        label: {
          show: true,
          position: 'inside',
          color: '#f4f6fa',
          fontSize: 20,
          formatter: '{c}%'
        },
        emphasis: {
          label: {
          color: '#ffd400'
          },
          itemStyle: {
            color: '#1f2a44'
          }
        },
        data: data.map(d => d[0]),
        itemStyle: {
          color: '#3a3f4b'
        }
      },
      {
        name: 'Осталось',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          color: '#3a3f4b',
          fontSize: 20,
          position: 'inside',
          formatter: '{c}%'
        },
        data: data.map(d => d[1]),
        itemStyle: {
          color: '#f4f6fa'
        }
      }
    ];
  })()
};

const lists = {
  legend: {
    selectedMode: true
  },
  xAxis: {
    type: 'value',
    max: 100
  },
  yAxis: {
    type: 'category',
    data: [
      'List_1',
      'List_2',
      'List_3',
      'List_4',
      'List_5',
      'List_6',
      'List_7',
      'List_8',
      'List_9',
      'List_10',
      'List_11',
      'List_12',
      'List_13',
      'List_14',
      'List_15',
      'List_16',
      'List_17',
      'List_18',
      'List_19',
      'List_20',
      'List_21',
      'List_22',
      'List_23',
      'List_24',
      'List_25'
    ]

  },
  series: (() => {
    const data = Array.from({ length: 25 }, () => {
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
          color: '#f4f6fa',
          formatter: '{c}%'
        },
        itemStyle: {
          color: '#3a3f4b'
        },
        emphasis: {
          label: {
            color: '#ffd400'
          },
          itemStyle: {
            color: '#1f2a44'
          }
        },
        data: data.map(d => d[0])
      },
      {
        name: 'Осталось',
        type: 'bar',
        stack: 'total',
        label: {
          color: '#3a3f4b',
          show: true,
          position: 'inside',
          formatter: '{c}%'
        },
        itemStyle: {
          color: '#f4f6fa'
        },
        data: data.map(d => d[1])
      }
    ];
  })()
};

const sections=   [
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
export {option, options, lists, sections, projects}

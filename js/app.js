// 使用Vue 3创建应用
const { createApp, ref, computed, onMounted, watch } = Vue;

// Element Plus组件
const { 
  ElContainer, ElHeader, ElMain, ElFooter, ElRow, ElCol, ElCard, ElForm, ElFormItem, 
  ElInput, ElSlider, ElButton, ElTable, ElTableColumn, ElTag, ElRadioGroup, ElRadioButton 
} = ElementPlus;

// 创建Vue应用
const app = createApp({
  components: {
    ElContainer, ElHeader, ElMain, ElFooter, ElRow, ElCol, ElCard, ElForm, ElFormItem, 
    ElInput, ElSlider, ElButton, ElTable, ElTableColumn, ElTag, ElRadioGroup, ElRadioButton
  },
  setup() {
    // 任务表单数据
    const taskForm = ref({
      name: '',
      description: '',
      strategicValue: 5,
      implementationCost: 5
    });

    // 任务列表
    const tasks = ref([]);
    
    // 当前选中的象限过滤器
    const currentQuadrant = ref('all');
    
    // 图表实例
    let chart = null;
    const chartContainer = ref(null);
    
    // 从本地存储加载任务
    const loadTasks = () => {
      const savedTasks = localStorage.getItem('priorityMatrixTasks');
      if (savedTasks) {
        tasks.value = JSON.parse(savedTasks);
      }
    };
    
    // 保存任务到本地存储
    const saveTasks = () => {
      localStorage.setItem('priorityMatrixTasks', JSON.stringify(tasks.value));
    };
    
    // 根据战略价值和实施成本确定象限
    const determineQuadrant = (strategicValue, implementationCost) => {
      // 象限划分基于中点5
      // 第一象限：高价值（>5）/低成本（<5）
      // 第二象限：高价值（>5）/高成本（>5）
      // 第三象限：低价值（<5）/低成本（<5）
      // 第四象限：低价值（<5）/高成本（>5）
      if (strategicValue > 5 && implementationCost < 5) {
        return 'q1';
      } else if (strategicValue > 5 && implementationCost >= 5) {
        return 'q2';
      } else if (strategicValue <= 5 && implementationCost < 5) {
        return 'q3';
      } else {
        return 'q4';
      }
    };
    
    // 添加新任务
    const addTask = () => {
      if (!taskForm.value.name) {
        ElementPlus.ElMessage.warning('请输入任务名称');
        return;
      }
      
      const quadrant = determineQuadrant(
        taskForm.value.strategicValue, 
        taskForm.value.implementationCost
      );
      
      tasks.value.push({
        ...taskForm.value,
        quadrant,
        id: Date.now()
      });
      
      saveTasks();
      updateChart();
      resetForm();
      
      ElementPlus.ElMessage.success('任务添加成功');
    };
    
    // 重置表单
    const resetForm = () => {
      taskForm.value = {
        name: '',
        description: '',
        strategicValue: 5,
        implementationCost: 5
      };
    };
    
    // 删除任务
    const removeTask = (index) => {
      ElementPlus.ElMessageBox.confirm(
        '确定要删除这个任务吗？',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          tasks.value.splice(index, 1);
          saveTasks();
          updateChart();
          ElementPlus.ElMessage.success('任务已删除');
        })
        .catch(() => {
          ElementPlus.ElMessage.info('已取消删除');
        });
    };
    
    // 获取象限名称
    const getQuadrantName = (quadrant) => {
      const names = {
        q1: '第一象限',
        q2: '第二象限',
        q3: '第三象限',
        q4: '第四象限'
      };
      return names[quadrant] || '未分类';
    };
    
    // 获取象限标签类型
    const getQuadrantTagType = (quadrant) => {
      const types = {
        q1: 'danger',  // 高价值/低成本 - 最重要
        q2: 'warning', // 高价值/高成本
        q3: 'info',    // 低价值/低成本
        q4: 'info'     // 低价值/高成本 - 最不重要
      };
      return types[quadrant] || '';
    };
    
    // 根据当前选择的象限过滤任务
    const filteredTasks = computed(() => {
      if (currentQuadrant.value === 'all') {
        return tasks.value;
      }
      return tasks.value.filter(task => task.quadrant === currentQuadrant.value);
    });
    
    // 初始化图表
    const initChart = () => {
      const ctx = document.createElement('canvas');
      chartContainer.value.appendChild(ctx);
      
      chart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: '第一象限',
              data: [],
              backgroundColor: '#F56C6C',
            },
            {
              label: '第二象限',
              data: [],
              backgroundColor: '#E6A23C',
            },
            {
              label: '第三象限',
              data: [],
              backgroundColor: '#909399',
            },
            {
              label: '第四象限',
              data: [],
              backgroundColor: '#909399',
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: '战略价值'
              },
              min: 0,
              max: 10,
              ticks: {
                stepSize: 1
              },
              grid: {
                color: (context) => {
                  if (context.tick.value === 5) {
                    return '#666';
                  }
                  return '#ddd';
                },
                lineWidth: (context) => {
                  if (context.tick.value === 5) {
                    return 2;
                  }
                  return 1;
                }
              }
            },
            y: {
              title: {
                display: true,
                text: '实施成本'
              },
              min: 0,
              max: 10,
              ticks: {
                stepSize: 1
              },
              grid: {
                color: (context) => {
                  if (context.tick.value === 5) {
                    return '#666';
                  }
                  return '#ddd';
                },
                lineWidth: (context) => {
                  if (context.tick.value === 5) {
                    return 2;
                  }
                  return 1;
                }
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const task = tasks.value.find(
                    t => t.strategicValue === context.parsed.x && 
                         t.implementationCost === context.parsed.y
                  );
                  return task ? task.name : '';
                }
              }
            },
            legend: {
              position: 'bottom'
            },
            annotation: {
              annotations: {
                quadrantLabels: [
                  {
                    type: 'label',
                    xValue: 7.5,
                    yValue: 2.5,
                    content: ['第一象限', '高价值/低成本'],
                    font: {
                      size: 12
                    }
                  },
                  {
                    type: 'label',
                    xValue: 7.5,
                    yValue: 7.5,
                    content: ['第二象限', '高价值/高成本'],
                    font: {
                      size: 12
                    }
                  },
                  {
                    type: 'label',
                    xValue: 2.5,
                    yValue: 2.5,
                    content: ['第三象限', '低价值/低成本'],
                    font: {
                      size: 12
                    }
                  },
                  {
                    type: 'label',
                    xValue: 2.5,
                    yValue: 7.5,
                    content: ['第四象限', '低价值/高成本'],
                    font: {
                      size: 12
                    }
                  }
                ]
              }
            }
          }
        }
      });
    };
    
    // 更新图表数据
    const updateChart = () => {
      if (!chart) return;
      
      // 按象限分组任务
      const q1 = tasks.value.filter(t => t.quadrant === 'q1').map(t => ({
        x: t.strategicValue,
        y: t.implementationCost
      }));
      
      const q2 = tasks.value.filter(t => t.quadrant === 'q2').map(t => ({
        x: t.strategicValue,
        y: t.implementationCost
      }));
      
      const q3 = tasks.value.filter(t => t.quadrant === 'q3').map(t => ({
        x: t.strategicValue,
        y: t.implementationCost
      }));
      
      const q4 = tasks.value.filter(t => t.quadrant === 'q4').map(t => ({
        x: t.strategicValue,
        y: t.implementationCost
      }));
      
      // 更新数据集
      chart.data.datasets[0].data = q1;
      chart.data.datasets[1].data = q2;
      chart.data.datasets[2].data = q3;
      chart.data.datasets[3].data = q4;
      
      chart.update();
    };
    
    // 添加示例数据
    const addExampleData = () => {
      const exampleData = [
        {
          name: '高管效能基线',
          description: '高管效能基线评估与改进',
          strategicValue: 9,
          implementationCost: 2,
          id: 1
        },
        {
          name: '季度OKR报表',
          description: '季度OKR完成情况报表生成',
          strategicValue: 7,
          implementationCost: 5,
          id: 2
        },
        {
          name: '临时数据提取',
          description: '临时性数据提取与分析需求',
          strategicValue: 3,
          implementationCost: 8,
          id: 3
        },
        {
          name: '模糊查询需求',
          description: '实现模糊查询功能需求',
          strategicValue: 1,
          implementationCost: 9,
          id: 4
        }
      ];
      
      // 为每个示例数据确定象限
      exampleData.forEach(task => {
        task.quadrant = determineQuadrant(task.strategicValue, task.implementationCost);
      });
      
      tasks.value = exampleData;
      saveTasks();
      updateChart();
    };
    
    // 组件挂载后初始化
    onMounted(() => {
      loadTasks();
      initChart();
      
      // 如果没有任务，添加示例数据
      if (tasks.value.length === 0) {
        addExampleData();
      } else {
        updateChart();
      }
    });
    
    // 监听任务变化，更新图表
    watch(tasks, () => {
      updateChart();
    }, { deep: true });
    
    return {
      taskForm,
      tasks,
      currentQuadrant,
      chartContainer,
      filteredTasks,
      addTask,
      resetForm,
      removeTask,
      getQuadrantName,
      getQuadrantTagType
    };
  }
});

// 挂载应用
app.mount('#app');

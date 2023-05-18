// All javascript code in this project for now is just for demo DON'T RELY ON IT

const random = (max = 100) => {
  return Math.round(Math.random() * max) + 20
}

const randomData = () => {
  return [
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
  ]
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const cssColors = (color) => {
  return getComputedStyle(document.documentElement).getPropertyValue(color)
}

const getColor = () => {
  return window.localStorage.getItem('color') ?? 'cyan'
}

const colors = {
  primary: cssColors(`--color-${getColor()}`),
  primaryLight: cssColors(`--color-${getColor()}-light`),
  primaryLighter: cssColors(`--color-${getColor()}-lighter`),
  primaryDark: cssColors(`--color-${getColor()}-dark`),
  primaryDarker: cssColors(`--color-${getColor()}-darker`),
}

const barChart = new Chart(document.getElementById('barChart'), {
  type: 'bar',
  data: {
    labels: months,
    datasets: [
      {
        data: randomData(),
        backgroundColor: colors.primary,
        hoverBackgroundColor: colors.primaryDark,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          gridLines: false,
          ticks: {
            beginAtZero: true,
            stepSize: 50,
            fontSize: 12,
            fontColor: '#97a4af',
            fontFamily: 'Open Sans, sans-serif',
            padding: 10,
          },
        },
      ],
      xAxes: [
        {
          gridLines: false,
          ticks: {
            fontSize: 12,
            fontColor: '#97a4af',
            fontFamily: 'Open Sans, sans-serif',
            padding: 5,
          },
          categoryPercentage: 0.5,
          maxBarThickness: '10',
        },
      ],
    },
    cornerRadius: 2,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
  },
})

const doughnutChart = new Chart(document.getElementById('doughnutChart'), {
  type: 'doughnut',
  data: {
    labels: ['Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [random(), random(), random()],
        backgroundColor: [colors.primary, colors.primaryLighter, colors.primaryLight],
        hoverBackgroundColor: colors.primaryDark,
        borderWidth: 0,
        weight: 0.5,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },

    title: {
      display: false,
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  },
})

//온도 변화 그래프
document.addEventListener('DOMContentLoaded', function() {
	  $(function () {
	    var request = $.ajax({
	      url: "/dashboardList",
	      method: "GET",
	      dataType: "json"
	    });

	    request.done(function(data) {
	      console.log(data); // log 로 데이터 찍어주기.

	      const labels = data.map(item => item.v_dateTime);
	      const values = data.map(item => item.v_temperature);

	      const tempCountChart = new Chart(document.getElementById('tempCountChart'), {
	        type: 'line',
	        data: {
	          labels: [],
	          datasets: [
	            {
	              data: [],
	              backgroundColor: colors.primary,
	              borderWidth: 0,
	              categoryPercentage: 1,
	            },
	          ],
	        },
	        options: {
	          scales: {
	            yAxes: [
	              {
	                display: false,
	                gridLines: false,
	              },
	            ],
	            xAxes: [
	              {
	                display: false,
	                gridLines: false,
	              },
	            ],
	            ticks: {
	              padding: 10,
	            },
	          },
	          cornerRadius: 2,
	          maintainAspectRatio: false,
	          legend: {
	            display: false,
	          },
	          tooltips: {
	            prefix: '온도',
	            bodySpacing: 4,
	            footerSpacing: 4,
	            hasIndicator: true,
	            mode: 'index',
	            intersect: true,
	          },
	          hover: {
	            mode: 'nearest',
	            intersect: true,
	          },
	        },
	      });

	      const dataLength = 10; // 최대 10개의 데이터만 유지

	      const showNextData = (currentIndex) => {
	        if (currentIndex < data.length) {
	          const newData = data[currentIndex];
	          tempCountChart.data.labels.push(newData.v_dateTime);
	          tempCountChart.data.datasets[0].data.push(newData.v_temperature);

	          if (tempCountChart.data.labels.length > dataLength) {
	            // 최대 데이터 개수를 유지하기 위해 가장 오래된 데이터 제거
	            tempCountChart.data.labels.shift();
	            tempCountChart.data.datasets[0].data.shift();
	          }

	          tempCountChart.update();

	          const tempCount = document.getElementById('tempCount');
	          tempCount.innerText = `${newData.v_temperature}`; // 실시간 온도를 표시

	          setTimeout(() => {
	            showNextData(currentIndex + 1);
	          }, 1000); // 1초마다 다음 데이터 보여주기
	        }
	      };

	      showNextData(0); 

	    });

	    request.fail(function(jqXHR, textStatus) {
	      console.log("Request failed: " + textStatus);
	    });
	  });
	});

/*//온도 변화 그래프
document.addEventListener('DOMContentLoaded', function() {
  $(function () {
    var request = $.ajax({
      url: "/dashboardList",
      method: "GET",
      dataType: "json"
    });

    request.done(function(data) {
    	console.log(data); // log 로 데이터 찍어주기.
    	
    	const labels = data.map(item => item.v_dateTime);
        const values = data.map(item => item.v_temperature);
    	
    	const tempCountChart = new Chart(document.getElementById('tempCountChart'), {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: colors.primary,
              borderWidth: 0,
              categoryPercentage: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                display: false,
                gridLines: false,
              },
            ],
            xAxes: [
              {
                display: false,
                gridLines: false,
              },
            ],
            ticks: {
              padding: 10,
            },
          },
          cornerRadius: 2,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          tooltips: {
            prefix: '온도',
            bodySpacing: 4,
            footerSpacing: 4,
            hasIndicator: true,
            mode: 'index',
            intersect: true,
          },
          hover: {
            mode: 'nearest',
            intersect: true,
          },
        },
      });
    	
    request.fail(function(jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    });
  });
});*/

/*
// 실시간 온도 찍어주기
let randomUserCount = 0

const tempCount = document.getElementById('tempCount')

const fakeTempCount = () => {
  randomTempCount = random()
  activeTempCount.data.datasets[0].data.push(randomUserCount)
  activeTempCount.data.datasets[0].data.splice(0, 1)
  activeTempCount.update()
  tempCount.innerText = randomTempCount
}

setInterval(() => {
  fakeUsersCount()
}, 1000)
*/

// 테이블 스크롤
//'.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

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

//온도 변화 그래프
		var ctx = document.getElementById("tempCountChart");
		var myLineChart2 = new Chart(ctx, {	
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
		  
//함수를 정의하여 데이터 값 업데이트 및 차트 업데이트를 호출하는 부분을 만듦
function updateChart2() {
	// 서버에 센서 데이터 요청을 보냄
	fetch('http://192.168.30.4:5000/update_sensor_data')
	  .then(response => response.json())
	  .then(data => {
  
		 // 데이터셋의 데이터 값을 업데이트
		 myLineChart2.data.datasets[0].data.push((data.temp - 23).toFixed(1));	// 측정값에서-23 해야 적정보관온도
		 myLineChart2.data.labels.push(new Date().toLocaleTimeString()); // 현재 시간 추가
   
		 // 데이터 길이를 5개로 유지하도록 제한
		 if (myLineChart2.data.datasets[0].data.length > 10) {
		   myLineChart2.data.datasets[0].data.shift();
		   myLineChart2.data.labels.shift();
		 }
  
		// 차트를 업데이트합니다.
		myLineChart2.update();

		// 실시간 온도를 표시
		const tempCount = document.getElementById('tempCount');
		tempCount.innerText = (data.temp - 23).toFixed(1);
	  });
  }
  
  // 일정한 간격으로 updateChart 함수를 호출하는 타이머를 설정 (5초마다)
  setInterval(updateChart2, 5000);




// 온도 변화 테이블
function updateTable() {
	// 서버에 센서 데이터 요청을 보냄
	fetch('http://192.168.30.4:5000/update_sensor_data')
	  .then(response => response.json())
	  .then(data => {
		// 측정값에서 -23을 해야 적정 보관 온도
		const adjustedTemp = (data.temp - 23).toFixed(1);
  
		// 테이블에 데이터를 추가
		const tableBody = document.querySelector("#tempTable tbody");
		const newRow = document.createElement("tr");
		newRow.innerHTML = `
		  <td>${new Date().toLocaleTimeString()}</td>
		  <td>아스트라제네카</td>
		  <td>${adjustedTemp}</td>
		`;
		tableBody.appendChild(newRow);
  
		// 테이블의 행 개수를 제한 (최대 20개 유지)
		if (tableBody.rows.length > 20) {
		  tableBody.removeChild(tableBody.firstChild);
		}

	  });
  }
  
  // 일정한 간격으로 updateTable 함수를 호출하는 타이머를 설정 (5초마다)
  setInterval(updateTable, 5000);


// 테이블 스크롤
//'.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

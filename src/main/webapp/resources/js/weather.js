$(document).ready(function(){
	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/weather?q=Ulsan&APPID=f38f26e7652ddacc9c5e888569cc5b6a',
		dataType: 'json',
		type: 'GET',
		success: function(data){
			var $Icon = (data.weather[0].icon);
			var $city = data.name;
			/*var $Temp = Math.floor(data.main.temp) +'℃';
			var $LowTemp = Math.floor(data.main.temp_min) +'℃';
			var $HighTemp = Math.floor(data.main.temp_max) +'℃';*/
			
			var $Temp = data.main.temp +'℃';
			var $LowTemp = data.main.temp_min +'℃';
			var $HighTemp = data.main.temp_max +'℃';
			
			
			/*var $Temp = k2c(data["main"]["temp"]) +'℃';
			var $LowTemp = data.main.temp_min +'℃';
			var $HighTemp = data.main.temp_max +'℃';*/
			
			
	
			//$('.CurrIcon').append('http://openweathermap.org/img/wn/'+ $Icon + '@2x.png');
			$('.City').append($city);
			$('.CurrTemp').append($Temp);
			$('.LowTemp').append($LowTemp);
			$('.HighTemp').append($HighTemp);
		}
	})
});

/* {"coord":{"lon":129.3167,"lat":35.5372},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],
 * "base":"stations","main":{"temp":302.27,"feels_like":302.17,"temp_min":302.27,"temp_max":302.27,"pressure":1010,
 * "humidity":43,"sea_level":1010,"grnd_level":1009},"visibility":10000,
 * "wind":{"speed":4.2,"deg":234,"gust":5.53},"clouds":{"all":0},"dt":1684218222,
 * "sys":{"country":"KR","sunrise":1684181877,"sunset":1684232425},"timezone":32400,"id":1833747,"name":"Ulsan","cod":200}
*/


/* var skycons = new Skycons({"color": "pink"}, {"resizeClear": true});
  // on Android, a nasty hack is needed: {"resizeClear": true}

  // you can add a canvas by it's ID...
  skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);

  // ...or by the canvas DOM element itself.
  skycons.add(document.getElementById("icon2"), Skycons.RAIN);

  // if you're using the Forecast API, you can also supply
  // strings: "partly-cloudy-day" or "rain".

  // start animation!
  skycons.play();

  // you can also halt animation with skycons.pause()

  // want to change the icon? no problem:
  skycons.set("icon1", Skycons.PARTLY_CLOUDY_NIGHT);

  // want to remove one altogether? no problem:
  skycons.remove("icon2");
*/

/*var apiURI = "https://api.openweathermap.org/data/2.5/weather?q=Ulsan&appid=f38f26e7652ddacc9c5e888569cc5b6a";
        $.ajax({
            url: apiURI,
            dataType: "json",
            type: "GET",
            async: "false",
            success: function(resp) {
                console.log(resp);
                console.log("현재온도 : "+ (resp.main.temp- 273.15) ); // 섭씨온도를 만들기 위해 273 빼주기
                console.log("현재습도 : "+ resp.main.humidity);
                console.log("날씨 : "+ resp.weather[0].main );
                console.log("상세날씨설명 : "+ resp.weather[0].description );
                console.log("날씨 이미지 : "+ resp.weather[0].icon );
                console.log("바람   : "+ resp.wind.speed );
                console.log("나라   : "+ resp.sys.country );
                console.log("도시이름  : "+ resp.name );
                console.log("구름  : "+ (resp.clouds.all) +"%" );                 
            }
        })
    };*/
        
      /*  var imgURL = "http://openweathermap.org/img/w/" + resp.weather[0].icon + ".png";
        $("#weatherAPI").attr("src", imgURL);*/
    
 // https://showyourself.tistory.com/6
    
        
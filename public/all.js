var map;
var marker;
var infoWindow;

function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lng: 120.5786888, lat: 22.9185024},
		zoom: 15,
	});
}

function drunk(){
	$.getJSON('/api/drunk', function(res){
		console.log(res)
		map.setCenter(new google.maps.LatLng(res.lat, res.lng));
		$('#map').fadeIn();
		if(marker) marker.setMap(null);
		marker = new google.maps.Marker({
			title: 'fuck you',
			position: {lat: res.lat, lng: res.lng},
			map: map,
		});
		if(infoWindow) infoWindow.close();
		res.mq3 = Number(res.mq3.split(' ')[0]);
		res.mq3 = (res.mq3 / 10) * (5.0/1024.0) * 0.67;
		res.mq3 = Math.round(res.mq3 * 100) / 100;
		infoWindow = new google.maps.InfoWindow({
			content: '海拔高度：' + res.alt + '<br>瞬時速度：' + res.speed + '<br>酒精濃度：' + res.mq3 + ' mg/L'
		});
		infoWindow.open(map, marker);

		$('.face').show();
		if(res.mq3 > 0.15){
			$('.face').html('<i class="fas fa-frown"></i> 喝醉惹');
		}else{
			$('.face').html('<i class="fas fa-smile"></i> 你很棒');
		}
	});
}

$('#measure').on('click', function(){
	drunk();
	setInterval(function(){
		drunk()
	}, 2000);
});

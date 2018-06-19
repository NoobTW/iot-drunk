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
		map.setCenter(new google.maps.LatLng(res.lat, res.lng));
		$('#map').fadeIn();
		marker = new google.maps.Marker({
			title: 'fuck you',
			position: {lat: res.lat, lng: res.lng},
			map: map,
		});
		if(infoWindow) infoWindow.close();
		infoWindow = new google.maps.InfoWindow({
			content: '海拔高度：' + res.alt + '<br>瞬時速度：' + res.speed + '<br>酒精濃度：' + res.mq3
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
	}, 1000);
});

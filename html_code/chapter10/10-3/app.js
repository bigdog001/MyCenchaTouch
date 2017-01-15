Ext.require('Ext.Map')
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {                
       var refresh=function(geo) {       
           var mapdemo=Ext.ComponentManager.get('mapdemo');
           var latlng =
           new google.maps.LatLng(geo.getLatitude(),geo.getLongitude());                    
           mapdemo.setMapCenter(latlng);  
           var infowindow = new google.maps.InfoWindow({
                content: '当前位置'
           });         
           marker = new google.maps.Marker({
               position:latlng,
               map: mapdemo.getMap()
           });
           infowindow.open(mapdemo.getMap(), marker);
           google.maps.event.addListener(marker, 'click', function() {
               infowindow.open(mapdemo.getMap(), marker);
           });
       };  
       var locationError=function (geo,
       bTimeout,bPermissionDenied,bLocationUnavailable,message) {
           if(bTimeout){
               Ext.Msg.alert('获取地图信息超时');
           }
           else{
               Ext.Msg.alert('获取地图信息失败'); 
           }
       };      
       var mapdemo = new Ext.Map({
           id:'mapdemo',
           useCurrentLocation:false,
           mapOptions : {
               zoom : 12,
               mapTypeId : google.maps.MapTypeId.ROADMAP,
               navigationControl: true,
               navigationControlOptions: {
                   style: google.maps.NavigationControlStyle.DEFAULT
               }
           }
       });
       toolbar=Ext.create('Ext.Toolbar',{
           docked:'top',
           items:[{
               iconMask:true,
               iconCls: 'locate',
               handler:function(){mapdemo.getGeo().updateLocation();}
           }]
       }),
       panel=Ext.create('Ext.Panel',{
           layout:'fit',
           items:[toolbar,mapdemo]
       });
       var geo =Ext.create('Ext.util.Geolocation',{
           autoUpdate:false,
           timeout:2000,
           listeners: {
               locationupdate: refresh,
               locationerror: locationError
           }
       });
       mapdemo.setGeo(geo);
       geo.updateLocation();
       Ext.Viewport.add(panel);
    }
});





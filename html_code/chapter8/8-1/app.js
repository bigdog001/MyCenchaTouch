Ext.require(['Ext.data.Store','Ext.dataview.DataView']);
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {   
        var calcData = function() {
            var data = [];
            var item = {};
            for (var i =0; i < 30; i++) {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                item = {
                    id:i,
                    rgb:Ext.util.Format.format('rgb({0},{1},{2})', r, g, b)
                };
                data[i] = item;
            }
            return data;
        };
  
        var initData = calcData();
        var store=Ext.create('Ext.data.Store', {
            data:initData,
            fields:['id','rgb']
        });

        var dataViewTpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="paul">',
            '<div>',
            '<div style="background:{rgb};width:100%;height:15px;color:#EEE; font-size:small;">',
            '<div>',
            '</div>',
            '</div>',
            '</tpl>'
        );
        var myToolbar = Ext.create('Ext.Toolbar', {
            docked : 'top',
            items: [
            {
                text:'改变颜色',
                handler:function(){
                    var newData  = calcData();
                    store.setData(newData);
                }
            }]
        });

        var myPanel = Ext.create('Ext.Panel', {
            id:'myPanel',
            items: [
                myToolbar,
                {
                    xtype:'dataview',
                    itemTpl:dataViewTpl,
                    store: store,
                    height:350
                }
            ]
        });
        Ext.Viewport.add(myPanel);
    }
});


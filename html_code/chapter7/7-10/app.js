Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {   
        var bcnt = 0;
        var acnt = 0;
        var bias = 3;
        var bchar = 'M';
        var achar = "W";

        var before = function() {
            Ext.DomHelper.insertBefore('insert-target',{
                cls:'add',
                html:Ext.util.Format.leftPad(bchar,bcnt * bias,bchar)
            });
            bcnt++;
        };
        var after = function() {
            Ext.DomHelper.insertAfter('insert-target',{
                cls:'add',
                html:Ext.util.Format.leftPad(achar,acnt * bias,achar)
            });
            acnt++;
        };
        var remove = function() {
            //使用DomQuery来寻找所有追加的元素。所有追加元素的CSS类均为add
            var elems = Ext.DomQuery.select('.add');
            Ext.each(elems,function(item,index,array){
                Ext.removeNode(item);
            });
            bcnt = acnt = 0;
        };
        var myToolbar = Ext.create('Ext.Toolbar', {
            docked : 'top',
            items:[{
                xtype:'button',
                text:'追加(Before)',
                handler:before
            },{
                xtype:'button',
                text:'追加(After)',
                handler:after
            },{
                xtype:'button',
                text:'删除',
                handler:remove
            }]
        });
        var html="<div class='body' style='padding:15px;'>";
        html+="<h1>在指定的元素前后追加元素</h1>";
        html+="<div id='insert-target'>";
        html+="<hr/>";
        html+="</div>";
        html+="</div>";   

        var myPanel = Ext.create('Ext.Panel', {
            id:'myPanel',
            title:'通过DomHelper组件追加元素',
            html:html,
            items: [myToolbar]
        });
        Ext.Viewport.add(myPanel);
    }
});


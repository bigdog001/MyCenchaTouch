Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {    
        var data = {
            string_value:'模板的初始文字'
        };
        var tpl= new Ext.XTemplate(
            '<table>',
            '<tr>',
            '<td>{string_value}</td>',
            '</tr>',
            '</table>'
        );
        var tplHtml = tpl.apply(data);
        var myToolbar =  Ext.create('Ext.Toolbar', {
            docked : 'top',
            items: [
            {
                text:'替换模板',
                handler:function(){
                    var newData = {
                        string_value:'替换后的文字'
                    };                    
                    tpl.overwrite(Ext.get('subPanel'),newData);
                }
            }]
        });
        var myPanel = Ext.create('Ext.Panel', {
            items: [myToolbar,{
                id:'subPanel',
                xtype:'panel',
                html:tplHtml            
            }]
        });  
        Ext.Viewport.add(myPanel);
    }
});


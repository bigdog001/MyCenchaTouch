Ext.define('MyApp.view.tablet.Author', {
    extend:'Ext.Container',
    xtype:'authorview',
    config:{
        layout:{
            type:'vbox',
            pack:'center',
            align:'center'
        },
        style:'background-image: url(images/gradation_r.jpg);background-repeat: repeat-x;font-size:21px;color:black;font-weight:bold',
        items:[
        {
            html:'<img src="images/world.gif">'
        },
        {
            html:'<img src="images/font.gif">书店'
        },
        {
            html:'作者:陆凌牛'
        },
        {
            html:'QQ:240824399'
        }]
    }
});
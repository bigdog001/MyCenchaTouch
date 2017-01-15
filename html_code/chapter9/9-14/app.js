Ext.require('Ext.data.TreeStore')
Ext.require('Ext.NestedList')
Ext.require('Ext.TitleBar')
Ext.application({
    name: 'myApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        Ext.define('Book', {
            extend: 'Ext.data.Model',
            config:{ 
                fields:[
                    {name: 'id',    type: 'string'},
                    {name: 'name', type: 'string'}
                ]
            }
        });
        var store=Ext.create('Ext.data.TreeStore',{ 
            model:'Book',
            proxy: {
                type: 'ajax',
                url : 'getBooks.php'
            }
        });
        var nestedList =Ext.create('Ext.NestedList',{
            title: '书籍种类',
            store: store,
            displayField:'name',
            emptyText:'该种类尚没有书籍',
            getTitleTextTpl: function(node) {
                return '{' + this.displayField + '}';
            }
        });    
        Ext.Viewport.add(nestedList);
    }
});



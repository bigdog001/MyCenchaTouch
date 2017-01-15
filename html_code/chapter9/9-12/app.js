Ext.require([
    'Ext.data.TreeStore',
    'Ext.NestedList',
    'Ext.TitleBar'
])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        Ext.define('File', {
            extend: 'Ext.data.Model',
            config:{ 
                fields:[
                    {name: 'id',       type: 'string'},
                    {name: 'fileName', type: 'string'}
                ]
            }
        });
        var store=Ext.create('Ext.data.TreeStore',{ 
            model:'File',
            proxy: {
                type: 'ajax',
                url : 'getFiles.php',
                reader: {
                    type: 'json'
                }
            }
        });
        var nestedList =Ext.create('Ext.NestedList',{
            title: 'SenchaTouch2',
            store: store,
            displayField:'fileName',
            masked: {
                xtype: 'loadmask',
                message: '正在获取文件信息...'
            },
            getTitleTextTpl: function() {
                return '{' + this.getDisplayField() + '}<tpl if="leaf !== true">/</tpl>';
            },
            getItemTextTpl: function() {
                return  '<tpl if="leaf ==  true">'+
                    '<div style="float:left;"><img width="30" height="30" src="images/file.jpg"/>{fileName}</div> '+
                    '</tpl>'+
                    '<tpl if="leaf != true"><img width="30" height="30" src="images/folder.jpg" />{fileName} /</tpl>';
            },
            detailCard:new Ext.Panel({id:'detailCard'})
        });
        nestedList.on('leafitemtap', function(nestedList,subList, subIdx, el,record, e) {
            var ds = subList.getStore(),
            r  = ds.getAt(subIdx),
            detailCard = nestedList.getDetailCard();  
            subList.setMasked({
                xtype:'loadmask',
                message:'正在读取文件...'
            });
            Ext.Ajax.request({
                url: '../' + r.get('id'),
                success: function(response) {
                    var value="<pre>"+
                    Ext.htmlEncode(response.responseText)+"</pre>";
                    Ext.DomHelper.overwrite('detailCard',{html:value});
                    subList.unmask();
                },
                failure: function() {
                    Ext.DomHelper.overwrite('detailCard',{html:'获取文件失败'});
                    subList.unmask();
                }
            });
        });
        Ext.Viewport.add(nestedList);
    }
});



Ext.require(['Ext.dataview.List','Ext.data.Store'])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        Ext.define('User', {
            extend: 'Ext.data.Model',
            config:{ 
                fields:['firstName','lastName','EnglishLastName']
            }
        });
        var store=Ext.create('Ext.data.Store',{  
            model:'User', 
            grouper:function(record){return record.get('EnglishLastName')[0]},  
            data:[
                {firstName:'江',lastName:'宋',EnglishLastName:'Song'},
                {firstName:'俊义',lastName:'卢',EnglishLastName:'Lu'},
                {firstName:'用',lastName:'吴',EnglishLastName:'Wu'},
                {firstName:'胜',lastName:'公孙',EnglishLastName:'Gongsun'},
                {firstName:'胜',lastName:'关',EnglishLastName:'Guan'},
                {firstName:'冲',lastName:'林',EnglishLastName:'Lin'},
                {firstName:'明',lastName:'秦',EnglishLastName:'Qin'},
                {firstName:'灼',lastName:'呼延',EnglishLastName:'Huyan'},
                {firstName:'荣',lastName:'花',EnglishLastName:'Hua'},
                {firstName:'进',lastName:'柴',EnglishLastName:'Chai'},
                {firstName:'应',lastName:'李',EnglishLastName:'Li'},
                {firstName:'仝',lastName:'朱',EnglishLastName:'Zhu'},
                {firstName:'智深',lastName:'鲁',EnglishLastName:'Lu'},
                {firstName:'松',lastName:'武',EnglishLastName:'Wu'},
                {firstName:'平',lastName:'董',EnglishLastName:'Dong'},
                {firstName:'清',lastName:'张',EnglishLastName:'Zhang'},
                {firstName:'志',lastName:'杨',EnglishLastName:'Yang'},
                {firstName:'宁',lastName:'徐',EnglishLastName:'Xu'},
                {firstName:'超',lastName:'索',EnglishLastName:'Suo'},
                {firstName:'宗',lastName:'戴',EnglishLastName:'Dai'}
            ]
        });        
        var myList=Ext.create('Ext.List',{
            store:store,
            itemTpl:'<div class="listItem">{lastName}{firstName}</div>',
            grouped:true,
            indexBar:true
        });
        Ext.Viewport.add(myList);
    }
});



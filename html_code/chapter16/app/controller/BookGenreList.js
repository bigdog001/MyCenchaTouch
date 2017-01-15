Ext.define('MyApp.controller.BookGenreList', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {  
            mainview:'mainview',
            bookgenrelistview:'bookgenrelistview',  
            titleButton:'#btn_title'                      
        },
        control:{
            bookgenrelistview:{
                select:'BookList_onselect'
            },
            titleButton:{
                tap:'titleButton_ontap'
            }
        },
        recordArray:new Array(),
        parentNameArray:new Array()
    },
    BookList_onselect:function(list,record){      
        if(record.get('childcount')>0)
        { 
            var titleButton=this.getTitleButton(),
            parentName=titleButton.getText();
            titleButton.setHidden(false);
            titleButton.setText(record.get('name'));
            titleButton.setId(record.get('id'));
            list.setStore(Ext.create('Ext.data.Store',{ 
                model:'MyApp.model.BookGenre',
                data:record.raw.children
            }));      
            list.deselectAll();
            list.refresh();
            this.getRecordArray().push(record);
            this.getParentNameArray().push(parentName);            
        }
        else{
            this.redirectTo('loadbooklist/'+record.get('id'));               
        }
    },
    titleButton_ontap:function()
    {
        var recordArray=this.getRecordArray(),
        parentNameArray=this.getParentNameArray(),
        record=recordArray[recordArray.length-1],
        parentName=parentNameArray[parentNameArray.length-1],
        titleButton=this.getTitleButton(),
        bookgenrelistview=this.getBookgenrelistview();
        if(parentName==undefined)
            titleButton.setHidden(true);
        bookgenrelistview.setStore(record.stores[0]); 
        titleButton.setText(parentName); 
        recordArray.pop();
        parentNameArray.pop();
    }
});
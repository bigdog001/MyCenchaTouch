Ext.define('MyApp.controller.BookList', {
    extend: 'Ext.app.Controller', 
    requires:['Ext.picker.Picker'],   
    config: {
        refs: {  
            mainview:'mainview',
            booklistview:'booklistview',
            selectPageBtn:'#btn_selectPage',
            pagePicker:'#picker',
            search_bookname:'#search_bookname',
            select_sort:'#select_sort',
            btn_add:'#btn_add',
            btn_edit:'#btn_edit',
            btn_delete:'#btn_delete'
        },
        routes: {
            'loadbooklist/:id': 'loadBookListView'
        },
        control:{
            pagePicker:{
                change:'pagePicker_onchange'
            },
            booklistview:{
                selectionchange:'booklistview_onselectionchange'
            },
            search_bookname:{
                change:'search_bookname_onchange'
            },
            select_sort:{
                change:'select_sort_onchange'
            },
            btn_add:{
                tap:'btn_add_ontap'
            },
            btn_edit:{
                tap:'btn_edit_ontap'
            },
            btn_delete:{
                tap:'btn_delete_ontap'
            },
            selectPageBtn:{
                tap:'showPicker'
            }
        },
        pagePicker:undefined,
        id:undefined
    },
    launch:function(){
        var  picker = new Ext.Picker({
            id:'picker',
            enter:'right',
            exit:'right',
            width:200,
            height:200,
            stretchX:false,
            stretchY:false, 
            doneButton:{
                text:'确定',
                ui:'decline'
            },
            cancelButton:{
                text:'取消',
                ui:'decline'
            },
            hidden:true
        });  
        this.setPagePicker(picker);
        var bookStore=Ext.getStore('BookStore');
        bookStore.addListener('load','setSlots',this);
    },  
    calcData:function(pageCount) {
        var data = [];
        var item = {};
        for (var i =1;i <=pageCount; i++) {
            item = {
                text:i,
                value:i
            };
            data[i-1] = item;
        }
        return data;
    },
    setSlots:function(){
        var bookStore=Ext.getStore('BookStore');
        var bookReader=bookStore.getProxy().getReader();
        var recordCount=
        bookReader.rawData[bookReader.getTotalProperty()];
        var pageSize=bookStore.getPageSize();
        pageCount=(recordCount-recordCount%pageSize)/pageSize;
        if(recordCount%pageSize>0)
            pageCount+=1;
        if(recordCount>0)
        {
            picker=this.getPagePicker();       
            picker.setSlots({
                title:'选择页数',
                name : 'pageIndex',
                align:'center',
                data:this.calcData(pageCount)
            });   
        }  
    },  
    showPicker:function(){
        var picker=this.getPagePicker();
        Ext.Viewport.add(picker); 
        picker.showBy(this.getSelectPageBtn());
    },
    pagePicker_onchange:function(){
        var picker=this.getPagePicker();
        var bookStore=Ext.getStore('BookStore');                               
        bookStore.loadPage(picker.getValue().pageIndex);
    },
    booklistview_onselectionchange:function(){
        this.getBtn_edit().setDisabled(false);
        this.getBtn_delete().setDisabled(false);
    },
    search_bookname_onchange:function(){
        var bookStore=Ext.getStore('BookStore');
        var value=this.getSearch_bookname().getValue();
        bookStore.clearFilter();
        bookStore.filter('genreid',this.getId());
        if(value!="")
            bookStore.filter('book_name',value);
        bookStore.loadPage(1);
    },
    select_sort_onchange:function(item,newValue,oldValue){
        var bookStore=Ext.getStore('BookStore');
        switch(newValue.getData().value)
        {
            case "book_name_asc":                              
                bookStore.sort({ 
                    property :'book_name', 
                    direction:'asc'
                });
                break;
            case "book_name_desc":
                bookStore.sort({ 
                    property :'book_name', 
                    direction:'desc'
                });
                break;
            case "author_asc":
                bookStore.sort({ 
                    property :'author', 
                    direction:'asc'
                });
                break;
            case "author_desc":
                bookStore.sort({ 
                    property :'author', 
                    direction:'desc'
                });
                break;                            
        }
        bookStore.loadPage(1);
    },
    btn_add_ontap:function(){
        this.redirectTo('loadbookform/-1/'+this.getId()); 
    },
    btn_edit_ontap:function(){
        var record=this.getBooklistview().getSelection()[0];
        this.redirectTo('loadbookform/'+record.get('id')+"/"+this.getId());
    },
    btn_delete_ontap:function(){
        var bookStore=Ext.getStore('BookStore');
        var booklistview=this.getBooklistview();
        if(booklistview.getSelectionCount()>0)
        {
            var record=booklistview.getSelection()[0];
            bookStore.remove(record); 
            booklistview.refresh();
        }
        else
        {
            Ext.Msg.alert("请选择需要删除的数据");
        }
    }
});
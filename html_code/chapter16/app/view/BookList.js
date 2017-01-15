Ext.define('MyApp.view.BookList', {
    extend:'Ext.List',
    xtype:'booklistview',
    requires: ['Ext.List','Ext.TitleBar','Ext.field.Select','Ext.field.Search'],
    config:{
        store:'BookStore',
        style:'font-size:12px',
        emptyText:'没有书籍',
        itemTpl:['<tpl for=".">',             
            '<div class="Book">',
            '<div class="Book_img"><img src="{image_url}"/></div>', 
            '<div class="Book_info">',
            '<h2>{book_name}</h2><br><h3>作者：{author}<h3>',
            '<p>{description:ellipsis(80)}</p>',
            '</div>',
            '</div>',
            '</tpl>'],
        items:[{
            xtype:'toolbar',
            id:'toolbar_top',
            docked:'top',         
            layout: {
                type: 'hbox',
                pack:'end'
            },          
            items: [           
            {
                xtype: 'searchfield',
                id:'search_bookname',
                name:'search_bookname',
                placeHolder:'请输入检索用书名'
            },     
            {xtype: 'spacer'},
            {
                xtype: 'selectfield',             
                id:'select_sort',   
                name:'sortfield',     
                width:130,    
                options:[{
                    text:'选择排序方式',
                    value:''
                },{
                    text:'按书名升序排列',
                    value:'book_name_asc'
                },{
                    text:'按书名降序排列',
                    value:'book_name_desc'
                },{
                    text:'按作者名升序排列',
                    value:'author_asc'
                },{
                    text:'按作者名降序排列',
                    value:'author_desc'
                }]
            }]
        },
        {
            xtype:'toolbar',
            id:'toolbar_bottom',
            docked:'bottom', 
            layout: {
                type: 'hbox',
                pack:'center',
            },          
            items: [
            {
                xtype:'button',
                id:'btn_add',
                iconMask:true,
                iconCls: 'add'
            },
            {
                xtype:'button',
                id:'btn_edit',
                iconMask:true,
                iconCls: 'compose',
                disabled: true
            },
            {
                xtype:'button',
                id:'btn_delete',
                iconMask:true,
                iconCls: 'delete',
                disabled: true
            },
            {
                xtype:'button',
                id:'btn_selectPage',
                iconMask:true,
                iconCls: 'action'
            }]
        }]
    }
});

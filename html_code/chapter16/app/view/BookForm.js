Ext.define('MyApp.view.BookForm', {
    extend:'Ext.form.FormPanel',
    xtype:'bookformview',
    requires:['Ext.form.Panel','Ext.form.FieldSet','Ext.field.Hidden'],
    config:{  
        style:'font-size:12px',
        items: [
        {
            xtype:'toolbar',
            docked : 'bottom', 
            layout: {
                type: 'hbox',
                pack:'end',
            },          
            items: [
            {
                id:'btnOK',
                iconMask:true,
                iconCls: 'check1',
                scope:this,
                style:'float:right'
            },
            {
                id:'btnReturn',
                iconMask:true,
                iconCls: 'reply',
                style:'float:right'
            }]
        },
        {
            xtype:'fieldset',
            title:'编辑书籍信息',
            defaults:{
                labelwidth:'20%',
                xtype: 'textfield',
                required:true,
                clearIcon: true
            },
            items: [
            {
                id:'txt_image',
                name : 'image_url',
                label: '图片地址',
                maxLength:50,
                placeHolder:'请输入书籍图片的URL地址'
            },
            {
                id:'txt_bookname',
                name : 'book_name',
                label: '书名',
                maxLength:50,
                placeHolder:'请输入书名'
            },
            {
                id:'txt_author',
                name : 'author',
                label: '作者',
                maxLength:50,
                placeHolder:'请输入作者名称'
            },
            {
                xtype:'textareafield',
                name:'description',
                maxLength:1000,
                maxRows:10,
                label:'书籍描述',
                required:false,
                clearIcon:false
            },
            {
                xtype:'hiddenfield',
                name:'id',
                id:'hidden_id'
            },
            {
                xtype:'hiddenfield',
                name:'genreid',
                id:'hidden_genreid'
            }]
        }]
    }
});
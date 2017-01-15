Ext.define('MyApp.view.Form', {
    extend:'Ext.form.Panel',
    xtype:'formview',
    fullScreen:true,
    requires: ['Ext.form.FieldSet','Ext.field.Search'],
    config:{
        id:'formview', 
        style:'font-size:12px',          
        items: [
        {
            xtype:'fieldset',
            title:'书籍信息',
            defaults:{
                labelwidth:'20%'
            },
            items: [
            {
                xtype: 'textfield',
                name : 'image_url',
                label: '图片地址',
                maxLength:50,
                placeHolder:'请输入书籍图片的URL地址',
                required:true,
                clearIcon: true
            },
            {
                xtype: 'textfield',
                name : 'book_name',
                label: '标题',
                maxLength:50,
                placeHolder:'请输入书籍标题',
                required:true,
                clearIcon: true
            },
            {
                xtype: 'textfield',
                id:'author',
                name : 'author',
                label: '作者',
                maxLength:50,
                placeHolder:'请输入作者名称',
                required:true,
                clearIcon: true
            },
            {
                xtype:'textareafield',
                name:'description',
                maxLength:1000,
                maxRows:10,
                label:'书籍描述'
            }]
        }]
    }
});

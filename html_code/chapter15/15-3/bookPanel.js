Ext.define('MyApp.panels.bookPanel',{
    extend:'Ext.Panel',    
    config:{
        data:{
            id:0,
            image_url: '',
            book_name: '',
            author: '',
            description: ''
        },
        tpl:[
            '<tpl for=".">',             
            '<div class="Book-item">',
            '<div class="Book_img"><img src="{image_url}"/></div>', 
            '<div class="Book_info">',
            '<h2>{book_name}</h2><br><h3>作者：{author}<h3>',
            '<p>{description}</p>',
            '</div>',
            '</div>',
            '</tpl>' 
        ],
        updateData: function(data) {
            this.tpl.overwrite(data);
        }
    }
});

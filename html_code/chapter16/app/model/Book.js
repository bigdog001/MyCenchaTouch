Ext.define('MyApp.model.Book', {
    extend: 'Ext.data.Model',
    config:{ 
        fields:['id','genreid','image_url','book_name','author','description'],
        validations: [                     
            {type: 'format',field:'image_url',matcher:/\.(jpg|gif|png|jpeg)+$/,message:'请输入有效的jpg格式、gif格式或png格式的图片地址'},
            {type: 'presence',field:'book_name',message:'请输入书名'},      
            {type: 'presence',field:'author',message:'请输入作者名'}                 
        ]
    }
});
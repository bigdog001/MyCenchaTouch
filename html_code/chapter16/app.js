﻿//<debug>
Ext.Loader.setPath({
    'Ext': 'sdk/src'
});
//</debug>
Ext.application({
    name: 'MyApp',
    requires: [
        'Ext.MessageBox'
    ],
    profiles:['Phone','Tablet'],
    models:['User','BookGenre','Book'],
    stores:['BookGenreStore','BookStore'],
    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },
    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',
    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
    },
    onUpdated: function() {
        Ext.Msg.confirm(
            "更新应用程序",
            "服务器端的应用程序已被更新到最新版本.是否立即加载最新版本的应用程序?",
            function() {
                window.location.reload();
            }
        );
    }
});
Ext.define('MyApp.profile.Phone', {
    extend: 'Ext.app.Profile',
    config: {
        views: ['Main'],
        controllers: ['Main']
   },
   isActive: function() {
        return Ext.os.is.Phone;
   },
   launch: function() {
        Ext.Viewport.add(Ext.create('MyApp.view.phone.Main'));
    }
});


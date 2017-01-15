Ext.define('MyApp.profile.Phone', {
    extend: 'Ext.app.Profile',
    config: {
        views: ['Main'],
        controllers:['MyApp.controller.User','BookGenreList','BookList','BookForm']
    },
    isActive: function() {
        return Ext.os.is.Phone||true;
    },
    launch: function() {
        Ext.Viewport.add(Ext.create('MyApp.view.phone.Main'));
    }
});

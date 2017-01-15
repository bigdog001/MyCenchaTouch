Ext.define('MyApp.profile.Tablet', {
    extend: 'Ext.app.Profile',
    config: {
        views: ['Main'],
        controllers:['MyApp.controller.User','BookMain','BookGenreList','BookList','BookForm']
    },
    isActive: function() {
        return Ext.os.is.Tablet;
    },
    launch: function() {
        Ext.Viewport.add(Ext.create('MyApp.view.tablet.Main'));
    }
});
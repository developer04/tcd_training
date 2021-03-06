Ti.API.info('seeded: ' + Ti.App.Properties.hasProperty('seeded'));
//determine if the database needs to be seeded
if (!Ti.App.Properties.hasProperty('seeded')) {

	var names = ["Jeff Haynie", "Nolan Wright", "Blain Hamon", "Aaron Saunders", "Anthony Decena"];

	// Define your collection instance, then loop through the names array
	// to create a model representing each and save it to the colleciton
	//var FugitiveCollection = Alloy.createCollection('Fugitives');
	for(var i=0,j=names.length;i<j;i++) {
		var criminal = Alloy.createModel('Fugitives', { name: names[i]});
		criminal.save();
	}
	
	// set our app property so this code doesn't run next time
    Ti.App.Properties.setString('seeded', 'yuppers');
    $.tabGroup.open();

} else {

    $.tabGroup.open();

}

// force tables to update
Alloy.Collections.Fugitives.fetch();


if(OS_ANDROID) {
    // Add the app's name to the Android action bar
    $.tabGroup.addEventListener('open', function(e) {
        var activity = $.tabGroup.getActivity(); 
        if (activity != undefined && activity.actionBar != undefined) {
            // set the title to the app name defined in tiapp.xml
            activity.actionBar.title = Ti.App.name; 
        }
    });
}

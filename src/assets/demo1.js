(function(){

	var button = document.getElementById('test'),
    wrapper = document.getElementById('cn-wrapper'),
    overlay = document.getElementById('cn-overlay');

	//open and close menu when the button is clicked
	var open = false;
	if(button)
	{
		button.addEventListener('click', handler, false);
	}
	if(wrapper)
	{
		wrapper.addEventListener('click', cnhandle, false);
	}

	function cnhandle(e){
		e.stopPropagation();
	}

	function handler(e){
		debugger;
		if (!e) var e = window.event;
	 	e.stopPropagation();//so that it doesn't trigger click event on document

	  	if(!open){
	    	openNav();
	  	}
	 	else{
	    	closeNav();
	  	}
	}
	function openNav(){
		open = true;
	    button.value = "-";
	    classie.add(overlay, 'on-overlay');
	    classie.add(wrapper, 'opened-nav');
	}
	function closeNav(){
		open = false;
		button.value = "+";
		classie.remove(overlay, 'on-overlay');
		classie.remove(wrapper, 'opened-nav');
	}
	document.addEventListener('click', closeNav);

})();


console.log("Hello JQSF - BG Script");


chrome.contextMenus.create({
	"id":"genjQS",
	"title":"Gen. jQuery Selector",
	"contexts":["all"]
});


chrome.contextMenus.onClicked.addListener(function (clickData){
	 
	
	if (clickData.menuItemId=="genjQS"){
		
		 
		chrome.tabs.query({active:true,currentWindow:true},function (tabs){
				chrome.tabs.sendMessage(tabs[0].id,{action:"GenjQS"});
				
	
		});
	}

 } ); 
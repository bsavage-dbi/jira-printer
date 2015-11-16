chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if  (request.action == 'window') {
			var url = chrome.extension.getURL('template.html');
			chrome.tabs.create({'url': url}, function(tab) {
				sendResponse({
					created: true
				})
			});
		}
		return true;
	}
);
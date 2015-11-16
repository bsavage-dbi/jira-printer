function __printJiraStories()
{

var stories = [];
$('.js-detailview').each(function(){
var cardElement = $(this);
var story = { 
  key: cardElement.attr("data-issue-key"),
  type: cardElement.find(".ghx-issue-content .ghx-type").attr("title"),
  summary: cardElement.find(".ghx-issue-content .ghx-summary").attr("title"),
  img: cardElement.find(".ghx-issue-content .ghx-type img").attr("src")
};
var epicElement = cardElement.find('.ghx-highlighted-field span')
if (epicElement.length > 0) {
 story.epic = epicElement.attr('title');
}
var estimationElement = cardElement.find('.ghx-end .aui-badge')
if (estimationElement.length > 0) {
 story.estimation = estimationElement.html();
}
stories.push(story);
})
window.stories = stories;

var stringified = JSON.stringify(stories).replace(/\\\\/g, '\\')
 
chrome.runtime.sendMessage({action: 'window'}, function(response) {
  console.log(response)
  if(response.created == true) {
    setTimeout(function(){
        chrome.runtime.sendMessage({action: 'fill', stories: window.stories}, function(response) {

    });
    }, 500)
  	
  }
});


}


function initJiraExtension() {

	var button = '<a class="aui-button aui-button-primary aui-style" id="print-tickets" style="margin-right: 20px" title="Print" accesskey="c">Print</a>';
	$("#ghx-view-modes").prepend(button);
	$("#print-tickets").click(function(){
		__printJiraStories();
	})
}


function waitForJquery(method) {
    if (window.jQuery)
        initJiraExtension();
    else
        setTimeout(function() { waitForJquery(method) }, 500);
}

waitForJquery(initJiraExtension);
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if  (request.action == 'fill') {
      console.log(request);
      window.storiesData = request.stories;
      fillStories(request.stories)
    }
  }
);

function fillStories(data) 
{
  chrome.storage.sync.get('storyTemplate', function(storedData) {
    var template = storedData.storyTemplate.length > 5 ? storedData.storyTemplate : $("#template").html();
    $("#container").html("");
    for(i in data) {
        $("#container").append(Mustache.render(template, data[i]))
    }
  });
}

$(function(){
  fillStories([{"key":"...","type":"...","summary":"Loading stories...","img":"https://jira.rocket-internet.de/images/icons/issuetypes/documentation.png","estimation":"..."}])
})
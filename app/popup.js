$(function () {
    //load template
    chrome.storage.sync.get('storyTemplate', function (data) {
        // Notify that we saved.
        if (data.storyTemplate.length > 5) {
            $("#storyTemplate").val(data.storyTemplate);
        }
    });

    $("#saveTemplate").click(function () {
        var content = $("#storyTemplate").val();

        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({'storyTemplate': content}, function () {
            // Notify that we saved.
            message('Template saved');
        });
        window.close();
    });
})

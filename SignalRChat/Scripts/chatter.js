var running = false;
var runningWhisper = false;
var myApp = $.Deferred();
// Reference the auto-generated proxy for the hub.
var chat = $.connection.chatHub;
$(function () {
    // Create a function that the hub can call back to display Alerts.
    chat.client.alertToPage = function (message) {

        $('#alertSection').queue("alertQueue", function () {
            var $self = $(this);
            running = true;
            $('#alertSectionAlertCopy').html("<ul><li>" + message + "</li></ul>");
            $self.fadeIn(1000).fadeOut(7000, function () {
                if ($self.queue("alertQueue").length == 0)
                    running = false;
                $self.dequeue("alertQueue");
            });
        });

        var n = $('#alertSection').queue("alertQueue");
        if (n.length == 1 && running == false) {
            $('#alertSection').dequeue("alertQueue");
        }
    };

    chat.client.whisperToOne = function (message) {

        $('#whisperSection').queue("whisperQueue", function () {
            var $self = $(this);
            running = true;
            $('#whisperSectionWhisperCopy').html("<ul><li>" + message + "</li></ul>");
            $self.fadeIn(1000).fadeOut(7000, function () {
                if ($self.queue("whisperQueue").length == 0)
                    running = false;
                $self.dequeue("whisperQueue");
            });
        });

        var n = $('#whisperSection').queue("whisperQueue");
        if (n.length == 1 && runningWhisper == false) {
            $('#whisperSection').dequeue("whisperQueue");
        }
    };

    myApp.started = $.connection.hub.start();
});

function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}
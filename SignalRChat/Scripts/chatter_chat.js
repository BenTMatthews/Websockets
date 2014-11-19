$(function () {
    // Get the user name and store it to prepend to messages.
    $('#displayname').val(prompt('Enter your name:', ''));

    chat.client.addNewMessageToPage = function (name, message) {
        // Html encode display name and message.
        var encodedName = $('<div />').text(name).html();
        var encodedMsg = $('<div />').text(message).html();
        // Add the message to the page.
        $('#discussion').append('<li><strong>' + encodedName
            + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
    };

    //myapp defined in chatter.js
    myApp.started.done(function () {
        $('#sendMessage').click(function () {
            // Call the Send method on the hub.
            chat.server.send($('#displayname').val(), $('#message').val());
            // Clear text box and reset focus for next comment.
            $('#message').val('').focus();
        });

        $('#sendAlert').click(function () {
            // Call the Send method on the hub.
            chat.server.alert($('#alert').val());
        });

        $('#sendWhisper').click(function () {
            // Call the Send method on the hub.
            chat.server.sendWhisper($('#displayname').val(), $('#whisper').val());
            // Clear text box and reset focus for next comment.
            $('#whisper').val('').focus();
        });
    });
});
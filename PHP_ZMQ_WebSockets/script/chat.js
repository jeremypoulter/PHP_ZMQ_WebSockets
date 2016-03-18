/// <reference path="jquery-1.9.1.js" />
/// <reference path="knockout-3.3.0.debug.js" />


function MessageViewModel(data)
{
    // Data
    var self = this;
    ko.mapping.fromJS(data, {}, self);
}

function ChatViewModel()
{
    var self = this;

    var messageMapping =
    {
        key: function (data) {
            return ko.utils.unwrapObservable(data.id);
        },
        create: function (options) {
            return new MessageViewModel(options.data);
        }
    };

    self.chat = ko.mapping.fromJS([{ id: 0, name: "Test", message: "A message" }, { id: 1, name: "Name", message: "Another message" }], messageMapping);

    self.name = ko.observable("User");
    self.message = ko.observable("");

    self.sendMessage = function ()
    {
        $.post('api.php', {
            name: self.name(),
            message: self.message()
        }, function (data) {
        });
        self.message("");
    }
}

// Activates knockout.js
var chatApp = new ChatViewModel();
ko.applyBindings(chatApp);

/*
 * Hugely simplified version of WAMP, just enough to connect and subscribe to the required topic.
 * 
 * Will probably only work with PHP Ratcher (http://socketo.me/) and probably full of security holes.
 * 
 * +--------------+----+------------------+
 * | Message Type | ID | DIRECTION        |
 * |--------------+----+------------------+
 * | WELCOME      | 0  | Server-to-Client |
 * | PREFIX       | 1  | Bi-Directional   |
 * | CALL         | 2  | Client-to-Server |
 * | CALL RESULT  | 3  | Server-to-Client |
 * | CALL ERROR   | 4  | Server-to-Client |
 * | SUBSCRIBE    | 5  | Client-to-Server |
 * | UNSUBSCRIBE  | 6  | Client-to-Server |
 * | PUBLISH      | 7  | Client-to-Server |
 * | EVENT        | 8  | Server-to-Client |
 * +--------------+----+------------------+
 */

function simpleWamp(server, onConnect)
{
    var WELCOME     = 0;
    var PREFIX      = 1;
    var CALL        = 2;
    var CALL_RESULT = 3;
    var CALL_ERROR  = 4;
    var SUBSCRIBE   = 5;
    var UNSUBSCRIBE = 6;
    var PUBLISH     = 7;
    var EVENT = 8;

    var topics = [];

    var serverSocket = new WebSocket(server);
    serverSocket.onmessage = function (event)
    {
        var msg = JSON.parse(event.data);
        switch(msg[0])
        {
            case WELCOME:
                onConnect();
                break;
            case EVENT:
                topics[msg[1]](msg[2]);
                break;
        }
    }

    this.subscribe = function (topic, onEvent)
    {
        serverSocket.send(JSON.stringify([SUBSCRIBE, topic]));
        topics[topic] = onEvent;
    }
}

var wamp = new simpleWamp('ws://' + window.location.hostname + ':9001', function ()
{
    wamp.subscribe("chat.bigjungle.net", function (data) {
        chatApp.chat.push(new MessageViewModel(data));
    });
});

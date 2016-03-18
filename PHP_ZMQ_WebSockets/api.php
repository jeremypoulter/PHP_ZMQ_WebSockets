<?php


Notify('chat.bigjungle.net', $_POST);

function Notify($topic, $data)
{
    $context = new ZMQContext();
    $socket = $context->getSocket(ZMQ::SOCKET_PUSH, 'my pusher');
    $socket->connect("tcp://localhost:5555");

    $socket->send(json_encode(array(
        'topic' => $topic,
        'data' => $data
    )));
}

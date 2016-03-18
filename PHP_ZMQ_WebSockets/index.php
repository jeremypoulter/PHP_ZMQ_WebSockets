<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="" />
    <meta name="author" content="" />

    <title>ZMQ/PHP/WebSockets Test</title>

    <!-- Bootstrap core CSS -->
    <link href="style/bootstrap.min.css" rel="stylesheet" />
</head>

<body>
    <div class="container">
        <div class="row">
            <div id="chat" class="col-sm-12 box-shadow" style="height: 90%" data-bind="foreach: chat">
                <div class="col-sm-2" data-bind="text: name"></div>
                <div class="col-sm-10" data-bind="text: message"></div>
            </div>
        </div>
        <div class="row">
            <form class="form-horizontal" data-bind="submit: sendMessage">
                <div class="form-group">
                    <div class="col-sm-2">
                        <input type="text" class="form-control col-sm-2" id="name" placeholder="User" data-bind="value: name">
                    </div>
                    <div class="col-sm-8">
                        <input type="email" class="form-control" id="name" placeholder="Message" data-bind="value: message">
                    </div>
                    <div class="col-sm-2">
                        <button type="submit" class="btn btn-default" data-bind="click: sendMessage">Send</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- JavaScript
        ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->

    <script src="script/jquery-1.9.1.min.js"></script>
    <script src="script/bootstrap.min.js"></script>
    <script src="script/knockout-3.3.0.js"></script>
    <script src="script/knockout.mapping-latest.js"></script>

    <script src="script/chat.js" charset="UTF-8"></script>

</body>
</html>

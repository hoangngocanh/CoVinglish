<!DOCTYPE html>
<html lang="en">

<head>
    <title>CoVinglish</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="style/theme-learn.css?ver=1">
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
<%--    <script src="js/ajax-learn-vocabulary.js?ver=1"></script>--%>
    <script src="js/ajax-practice.js?ver=1"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

</head>

<body>
<div class="container brand center">
    <h1 class="brand-name"> CoVinglish </h1>
</div>
<div class="container" style="background:white;">
    <div class="row sticky-top" style="margin-bottom: 50px">
        <div class="col-md-3"></div>
        <div class="col-md-6 sticky-top" style="background:white">
            <div class="content">
                <h2 id="word" style="text-align: center; margin: 20px;">SUBSCRIBE</h2>
                <p id="note" style="text-align: center;">Chose correct answer!</p>
                <div id="input-container">
                    <div class="input-group">
                        <input id="input-word" type="email" class="form-control">
                        <span class="input-group-btn">
                                <button id="btn-next" class="btn" type="submit">NEXT</button>
                        </span>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-md-3"></div>
    </div>
    <div id="choice">
        <hr style="width:50%;text-align:center">
        <div class="row">
            <div class="col-md-2"></div>
            <div id="card1" class="card col-md-4">
                <div class="container-card">
                    <h4 id="a">Answer</h4>
                </div>
            </div>
            <div id="card2" class="card col-md-4">
                <div class="container-card">
                    <h4 id="b">Answer</h4>
                </div>
            </div>
            <div class="col-md-2"></div>
        </div>
        <div class="row">
            <div class="col-md-2"></div>
            <div id="card3" class="card col-md-4">
                <div class="container-card">
                    <h4 id="c">Answer</h4>
                </div>
            </div>
            <div id="card4" class="card col-md-4">
                <div class="container-card">
                    <h4 id="d">Answer</h4>
                </div>
            </div>
        </div>
        <div class="col-md-2"></div>
    </div>
    <div class="row">
        <div class="col-md-2"></div>
        <div id="explain-word" class="col-md-8">
            <span id="line" style="background: #5da3c7; width: 10px; height: 20px; display: inline-block;"> </span><h3 id="english"></h3>
            <hr>
            <div id="detail-word">
                <span id="category"></span>
                <p id="vietnamese"></p>
                <p id="ex-english"></p>
                <p id="ex-vietnamese"></p>
            </div>

        </div>
        <div class="col-md-2"></div>
    </div>

</div>

</body>

</html>
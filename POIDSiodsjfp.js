<!DOCTYPE html>
<!--
Jentacular Gent
Code Editor

This is most likely violating the guidelines, as it's using <iframe>s, which is a security breach.
However, I thought it was cool enough to post here, even if it's hidden.
-->
<html>
    <head>
        <meta charset="utf-8">
        <title>New webpage</title>
        <style>
            ::-webkit-scrollbar {
              width: 15px;
              height: 15px;
            }
            ::-webkit-scrollbar-track {
              background: rgb(0, 0, 0);
            }
            ::-webkit-scrollbar-thumb {
              background: rgb(69, 69, 69);
            }
            ::-webkit-scrollbar-thumb:hover {
              background: rgb(60, 60, 60);
            }
            
            body {
                background-color: black;
            }
            
            .tab {
                display: inline-block;
                background: rgb(120, 120, 120);
                color: white;
                font-size: 14px;
                border: none;
                padding: 5px;
                border-radius: 5px 5px 0px 0px;
                outline: none;
            }
            .tab:hover {
                background: rgb(105, 105, 105);
                cursor: pointer;
            }
            .tab:active {
                background: rgb(90, 90, 90);
            }
            textarea {
                width: 98%;
                height: 400px;
                float: top;
                overflow: scroll;
                margin: auto;
                display: inline-block;
                background: rgb(26, 26, 26);
                color: white;
                outline: none;
                font-family: Monospace;
                font-size: 14px;
                resize: none;
            }
            
            iframe {
                position: relative;
                width: 400px;
                height: 400px;
                border: 1px solid grey;
                background-color: white;
            }
        </style>
    </head>
    <body>
        <button class="tab" onclick="switchTab(0);">HTML</button>
        <button class="tab" onclick="switchTab(1);">CSS</button>
        <button class="tab" onclick="switchTab(2);">JavaScript</button>
        <textarea id="code"><div>Hi!</div></textarea>
    </body>
    <script>
        var d = document;
        var f = d.getElementById("code");
        
        var tab = 0;
        var html = d.getElementById("code").value;
        var css = "div {\n    font-size: 10px;\n    color: blue;\n}";
        var js = "setInterval(function() {\n    document.getElementsByTagName('div')[0].innerHTML += ' Hi!';\n}, 100);";
        
        function compile() {
            
            var ph = "";
            var pc = "";
            var pj = "";
            function run() {
                if(ph === html && pc == css && pj === js) {
                    return;
                }
                ph = html;
                pc = css;
                pj = js;
                var j = d.getElementById("screen");
                if(j) { j.remove(); }
                var n = d.createElement("iframe");
                n.id = "screen";
                d.body.appendChild(n);
                var win = d.getElementById("screen").contentWindow.document;
                win.open();
                win.writeln(
                    html + "<style>" + css + "</style>" + "<script>" + js + "<" + "/script>"
                );
                win.close();
            }
            run();
            
            addEventListener("keyup", run);
        }
        compile();
        
        addEventListener("keydown", function(e) {
            if(e.keyCode === 9) {
                e.preventDefault();
                d.execCommand("insertHTML", false, "    ");
            }
            setTimeout(function() {
                var c = d.getElementById("code").value;
                switch(tab) {
                    case 0: html = c;
                    break;
                    case 1: css = c;
                    break;
                    case 2: js = c;
                    break;
                }
            }, 1);
        });
        
        function switchTab(i) {
            tab = i;
            switch(i) {
                case 0: f.value = html;
                break;
                case 1: f.value = css;
                break;
                case 2: f.value = js;
                break;
            }
        }
    </script>
</html>


// JGJS Functions
var background, noFill, fill, stroke, noStroke, strokeWeight, rect, ellipse, arc, line, point, createCanvas, color, rgba2hex, hsva2hex, lineCap, cursor, text, textFont, textSize, textAlign, textLeading, angleMode, frameRate, pushMatrix, translate, rotate, scale, popMatrix, get, image, getImage, triangle, quad, beginShape, vertex, endShape, colorMode, dist, sqDist, imageSmoothing, noImageSmoothing, rrCol, constrain, map, textWidth, cos, sin, tan, acos, asin, atan, atan2, rgb;
// JGJS Variables
var width, height, frameCount = 0, FPS = 1000/60, mouseX = 0, mouseY = 0, pmouseX = 0, pmouseY = 0, ROUND = "round", SQUARE = "butt", LEFT = "ArrowLeft", RIGHT = "ArrowRight", UP = "ArrowUp", DOWN = "ArrowDown", SHIFT = "Shift", CONTROL = "Control", BACKSPACE = "Backspace", ENTER = "Enter", RETURN = ENTER, TAB = "Tab", META = "Meta", ESCAPE = "Escape", CENTER = "center", TOP = "top", mouseIsPressed = false, keyIsPressed = false, keyCode, key, RGB = "rgb", HSB = "hsb", D2R = Math.PI/180;
// JGJS Custom Event Listeners
var mousePressed, mouseReleased, keyPressed, keyReleased, mouseMoved, mouseClicked, mouseOver, mouseOut, draw;
(function() {
    var version = "1.0.2";
    var JG = {
        fill: [255, 255, 255, 255],
        stroke: [0, 0, 0, 255],
        strokeWeight: 1,
        lineCap: ROUND,
        textSize: 20,
        textFont: "Arial",
        textAlign: "center",
        textBaseline: "top",
        textLeading: 20,
        angleMode: "degrees",
        colorMode: RGB,
        interpolated: true
    };
    var images = {};
    var fps = 60;
    var angleMult = Math.PI/180;
    sin = function(t) {
        return Math.sin(t * angleMult);
    };
    tan = function(t) {
        return Math.tan(t * angleMult);
    };
    acos = function(c) {
        return Math.acos(c) / angleMult;
    };
    asin = function(s) {
        return Math.asin(s) / angleMult;
    };
    atan = function(t) {
        return Math.atan(t) / angleMult;
    };
    atan2 = function(y, x) {
        return Math.atan2(y, x) / angleMult;
    };
    cos = function(t) {
        return Math.cos(t * angleMult);
    };
    textWidth = function(t) {
        JG.ctx.font = JG.textSize + "px " + JG.textFont;
        return JG.ctx.measureText(t).width;
    };
    console.log("M" + "a" + "de w" + "ith" + " JentGe" + "nt's " + "JG.2D.js" + " library v" + version + ".");
    map = function(a, b, c, d, e) {
        return d + (e - d) * (a - b)/(c - b);
    };
    constrain = function(a, b, c) {
        return Math.max(b, Math.min(a, c));
    };
    imageSmoothing = function() {
        JG.interpolated = true;
        JG.ctx.imageSmoothingEnabled = true;
    };
    noImageSmoothing = function() {
        JG.interpolated = false;
        JG.ctx.imageSmoothingEnabled = false;
    };
    rrCol = function(x, y, w, h, x2, y2, w2, h2) {
        return x > x2 - w && y > y2 - h && x < x2 + w2 && y < y2 + h2;
    };
    sqDist = function() {
        var s = arguments.length / 2;
        if(~~s !== s) {
            return 0;
        }
        var ps = 0;
        for(var j = 0; j < s; j += 1) {
            ps += (arguments[j] - arguments[j + s]) * (arguments[j] - arguments[j + s]);
        }
        return ps;
    };
    dist = function() {
        var s = arguments.length / 2;
        if(~~s !== s) {
            return 0;
        }
        var ps = 0;
        for(var j = 0; j < s; j += 1) {
            ps += (arguments[j] - arguments[j + s]) * (arguments[j] - arguments[j + s]);
        }
        return ~~Math.sqrt(ps);
    };
    colorMode = function(m) {
        if(!m) {
            return JG.colorMode;
        }
        if(m !== "rgb" && m !== "hsb") {
            throw new Error("Color mode must be either RGB or HSB");
        }
        JG.colorMode = m;
    };
    frameRate = function(r) {
        if(typeof r !== "number") {
            return fps;
        }
        FPS = 1000/r;
    };
    angleMode = function(a) {
        if(a !== "degrees" && a !== "radians") {
            throw new Error("Angle mode must be either \"degrees\" or \"radians\"");
            return;
        }
        angleMode = a;
        angleMult = a === "degrees" ? Math.PI/180 : 1;
    };
    rgba2hex = function(r, g, b, a) {
        if(r.toString() === r) {
            return r;
        }
        if(Array.isArray(r)) {
            g = r[1];
            b = r[2];
            a = r[3];
            r = r[0];
        }
        if(!g && g !== 0) {
            b = r;
            g = r;
            a = 255;
        }
        else if(!b && b !== 0) {
            a = g;
            b = r;
            g = r;
        }
        else if(!a && a !== 0) {
            a = 255;
        }
        r = ~~r;
        g = ~~g;
        b = ~~b;
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);
        a = a.toString(16);
        if(r.length == 1) {
            r = "0" + r;
        }
        if(g.length == 1) {
            g = "0" + g;
        }
        if(b.length == 1) {
            b = "0" + b;
        }
        if(a.length == 1) {
            a = "0" + a;
        }
        return "#" + r + g + b + a;
    };
    function gc(n, h, s, b) {
        var k = (n + h / 60) % 6;
        var a = (b - b * s * Math.max(Math.min(k, 4 - k, 1), 0)) * 255;
        return a;
    };
    hsba2hex = function(h, s, b, a) {
        if(h.toString() === h) {
            return h;
        }
        if(Array.isArray(h)) {
            s = h[1];
            b = h[2];
            a = h[3];
            h = h[0];
        }
        if(!s && s !== 0) {
            return rgba2hex(h, h, h, 255);
        }
        if(!b && b !== 0) {
            return rgba2hex(h, h, h, s);
        }
        h *= 360/255;
        s /= 255;
        b /= 255;
        return rgba2hex(gc(5, h, s, b), gc(3, h, s, b), gc(1, h, s, b), a || 255);
    };
    lineCap = function(c) {
        if(c !== ROUND && c !== SQUARE) {
            throw new Error("Line cap must either be ROUND or SQUARE");
        }
        JG.lineCap = c;
    };
    fill = function(r, g, b, a) {
        if(r.toString() === r) {
            JG.fill = r;
            return;
        }
        r = constrain(Math.round(r), 0, 255);
        g = constrain(Math.round(g), 0, 255);
        b = constrain(Math.round(b), 0, 255);
        a = constrain(Math.round(a), 0, 255);
        if(!g && g !== 0) {
            JG.fill = [r, 255];
            return;
        }
        if(!b && b !== 0) {
            JG.fill = [r, g];
            return;
        }
        if(!a && a !== 0) {
            JG.fill = [r, g, b];
            return;
        }
        else {
            JG.fill = [r, g, b, a];
            return;
        }
    };
    noFill = function() {
        JG.fill = false;
    };
    stroke = function(r, g, b, a) {
        if(r.toString() === r) {
            JG.stroke = r;
        }
        r = constrain(Math.round(r), 0, 255);
        g = constrain(Math.round(g), 0, 255);
        b = constrain(Math.round(b), 0, 255);
        a = constrain(Math.round(a), 0, 255);
        if(!g && g !== 0) {
            JG.stroke = [r, r, r, 255];
            return;
        }
        if(!b && b !== 0) {
            JG.stroke = [r, r, r, g];
            return;
        }
        if(!a && a !== 0) {
            JG.stroke = [r, g, b, 255];
            return;
        }
        else {
            JG.stroke = [r, g, b, a];
            return;
        }
        throw new Error("Error setting stroke color");
    };
    cursor = function(c) {
        JG.can.style.cursor = c;
    };
    noStroke = function() {
        JG.stroke = false;
    };
    strokeWeight = function(w) {
        if(!w || typeof w !== "number") {
            throw new Error("No stroke weight specified");
            return;
        }
        JG.strokeWeight = w;
    };
    rect = function(x, y, w, h) {
        if(JG.fill) {
            JG.ctx.fillStyle = JG.colorMode === "rgb" ? rgba2hex(JG.fill) : hsba2hex(JG.fill);
            JG.ctx.fillRect(x, y, w, h);
        }
        if(JG.stroke) {
            JG.ctx.strokeStyle = JG.colorMode === "rgb" ? rgba2hex(JG.stroke) : hsba2hex(JG.stroke);
            JG.ctx.lineWidth = JG.strokeWeight;
            JG.ctx.strokeRect(x, y, w, h);
        }
    };
    line = function(x, y, x2, y2) {
        if(JG.stroke) {
            JG.ctx.strokeStyle = JG.colorMode === "rgb" ? rgba2hex(JG.stroke) : hsba2hex(JG.stroke);
            JG.ctx.lineCap = JG.lineCap;
            JG.ctx.lineWidth = JG.strokeWeight;
            JG.ctx.beginPath();
            JG.ctx.moveTo(x, y);
            JG.ctx.lineTo(x2, y2);
            JG.ctx.stroke();
        }
    };
    triangle = function(x, y, x2, y2, x3, y3) {
        JG.ctx.beginPath();
        JG.ctx.moveTo(x, y);
        JG.ctx.lineTo(x2, y2);
        JG.ctx.lineTo(x3, y3);
        JG.ctx.closePath();
        if(JG.fill) {
            JG.ctx.fillStyle = JG.colorMode === "rgb" ? rgba2hex(JG.fill) : hsba2hex(JG.fill);
            JG.ctx.fill();
        }
        if(JG.stroke) {
            JG.ctx.strokeStyle = JG.colorMode === "rgb" ? rgba2hex(JG.stroke) : hsba2hex(JG.stroke);
            JG.ctx.lineWidth = JG.strokeWeight;
            JG.ctx.stroke();
        }
    };
    quad = function(x, y, x2, y2, x3, y3, x4, y4) {
        JG.ctx.beginPath();
        JG.ctx.moveTo(x, y);
        JG.ctx.lineTo(x2, y2);
        JG.ctx.lineTo(x3, y3);
        JG.ctx.lineTo(x4, y4);
        JG.ctx.closePath();
        if(JG.fill) {
            JG.ctx.fillStyle = JG.colorMode === "rgb" ? rgba2hex(JG.fill) : hsba2hex(JG.fill);
            JG.ctx.fill();
        }
        if(JG.stroke) {
            JG.ctx.strokeStyle = JG.colorMode === "rgb" ? rgba2hex(JG.stroke) : hsba2hex(JG.stroke);
            JG.ctx.lineWidth = JG.strokeWeight;
            JG.ctx.stroke();
        }
    };
    var sh = 0;
    beginShape = function() {
        JG.ctx.beginPath();
        sh = 1;
    };
    vertex = function(x, y) {
        if(sh === 1) {
            JG.ctx.moveTo(x, y);
            sh = 2;
            return;
        }
        JG.ctx.lineTo(x, y);
    };
    endShape = function() {
        JG.ctx.closePath();
        if(JG.fill) {
            JG.ctx.fillStyle = JG.colorMode === "rgb" ? rgba2hex(JG.fill) : hsba2hex(JG.fill);
            JG.ctx.fill();
        }
        if(JG.stroke) {
            JG.ctx.strokeStyle = JG.colorMode === "rgb" ? rgba2hex(JG.stroke) : hsba2hex(JG.stroke);
            JG.ctx.lineWidth = JG.strokeWeight;
            JG.ctx.stroke();
        }
        sh = 0;
    };
    arc = function(x, y, w, h, a, b) {
        JG.ctx.save();
        JG.ctx.translate(x, y);
        JG.ctx.scale(w, h);
        JG.ctx.beginPath();
        JG.ctx.arc(0, 0, 0.5, a * angleMult, b * angleMult, false);
        JG.ctx.lineTo(0, 0);
        JG.ctx.closePath();
        JG.ctx.restore();
        JG.ctx.fillStyle = JG.colorMode === "rgb" ? rgba2hex(JG.fill) : hsba2hex(JG.fill);
        JG.ctx.fill();
        if(JG.stroke) {
            JG.ctx.lineWidth = JG.strokeWeight;
            JG.ctx.strokeStyle = JG.colorMode === "rgb" ? rgba2hex(JG.stroke) : hsba2hex(JG.stroke);
            JG.ctx.stroke();
        }
    };
    arcToEnd = function(x, y, w, h, a, b) {
        JG.ctx.save();
        JG.ctx.translate(x, y);
        JG.ctx.scale(w, h);
        JG.ctx.beginPath();
        JG.ctx.arc(0, 0, 0.5, a * angleMult, b * angleMult, false);
        JG.ctx.closePath();
        JG.ctx.restore();
        JG.ctx.fillStyle = JG.colorMode === "rgb" ? rgba2hex(JG.fill) : hsba2hex(JG.fill);
        JG.ctx.fill();
        if(JG.stroke) {
            JG.ctx.lineWidth = JG.strokeWeight;
            JG.ctx.strokeStyle = JG.colorMode === "rgb" ? rgba2hex(JG.stroke) : hsba2hex(JG.stroke);
            JG.ctx.stroke();
        }
    };
    ellipse = function(x, y, w, h) {
        JG.ctx.save();
        JG.ctx.translate(x, y);
        JG.ctx.scale(w, h);
        JG.ctx.beginPath();
        JG.ctx.arc(0, 0, 0.5, 0, 2 * Math.PI, false);
        JG.ctx.closePath();
        JG.ctx.restore();
        JG.ctx.fillStyle = JG.colorMode === "rgb" ? rgba2hex(JG.fill) : hsba2hex(JG.fill);
        JG.ctx.fill();
        if(JG.stroke) {
            JG.ctx.lineWidth = JG.strokeWeight;
            JG.ctx.strokeStyle = JG.colorMode === "rgb" ? rgba2hex(JG.stroke) : hsba2hex(JG.stroke);
            JG.ctx.stroke();
        }
    };
    point = function(x, y) {
        ctx.beginPath();
        ctx.arc(2, 1, 1, 0, 2 * Math.PI, true);
        ctx.stroke();
    };
    textSize = function(s) {
        if(typeof s !== "number") {
            throw new Error("No text size specified");
        }
        JG.textSize = s;
        JG.textLeading = s;
    };
    textFont = function(f) {
        if(typeof f !== "string") {
            throw new Error("Text font must be a string");
            return;
        }
        JG.textFont = f;
    };
    textAlign = function(a, y) {
        if(typeof a !== "string") {
            throw new Error("Text align must be a string");
            return;
        }
        if(a === LEFT) {
            a = "left";
        }
        JG.textAlign = a;
        if(y) {
            if(y === CENTER) {
                y = "middle";
            }
            JG.textBaseline = y;
        }
    }
    textLeading = function(l) {
        if(!l && l !== 0) {
            return JG.textLeading;
        }
        JG.textLeading = l;
    };
    text = function(t, x, y) {
        if(!t) {
            return;
        }
        t = t.toString().split("\n");
        JG.ctx.font = JG.textSize + "px " + JG.textFont;
        JG.ctx.fillStyle = JG.colorMode === "rgb" ? rgba2hex(JG.fill) : hsba2hex(JG.fill);
        JG.ctx.textAlign = JG.textAlign;
        JG.ctx.textBaseline = JG.textBaseline;
        for(var i = 0; i < t.length; i += 1) {
            JG.ctx.fillText(t[i], x, y + i * JG.textLeading - (JG.textBaseline === "bottom" ? t.length * JG.textLeading - JG.textLeading : 0));
        }
    };
    get = function(x, y, w, h) {
        if(typeof x !== "number" || typeof y !== "number") {
            throw new Error("get must have an x and y");
            return;
        }
        if(!w) {
            var data = JG.ctx.getImageData(x, y, 1, 1).data;
            return rgba2hex(data[0], data[1], data[2], data[3]);
        }
        return getImage(JG.ctx.getImageData(x, y, w, h));
    };
    getImage = function(s) {
        if(s.toString() === s) {
            if(images[s]) {
                var i = images[s];
                return i;
            }
            var i = document.createElement("img");
            // var i = new Image();
            i.setAttribute("src", s + "?" + new Date().getTime());
            i.setAttribute("crossOrigin", "");
            images[s] = i;
            return i;
        }
        var dummyCanvas = document.createElement("canvas");
        dummyCanvas.width = s.width;
        dummyCanvas.height = s.height;
        var ctx = dummyCanvas.getContext("2d");
        ctx.putImageData(s, 0, 0);
        return dummyCanvas;
    };
    image = function(s, x, y, w, h) {
        return JG.ctx.drawImage(s, x, y, w || s.width, w && !h ? w * s.height / s.width : h || s.height);
    };
    color = function(r, g, b, a) {
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);
        a = Math.round(a);
        if(JG.colorMode === "hsb") {
            return !g && g !== 0 ? rgba2hex(r, r, r, 255)
                : !b && b !== 0 ? rgba2hex(r, r, r, b)
                : !a && a !== 0 ? hsba2hex(r, g, b, 255)
                : hsba2hex(r, g, b, a);
        }
        return !g && g !== 0 ? rgba2hex(r, r, r, 255)
            : !b && b !== 0 ? rgba2hex(r, r, r, b)
            : !a && a !== 0 ? rgba2hex(r, g, b, 255)
            : rgba2hex(r, g, b, a);
    };
    rgb = color;
    var p = [[]];
    pushMatrix = function() {
        p.push([]);
    };
    translate = function(x, y) {
        JG.ctx.translate(x, y);
        p[p.length - 1].push({ tx: x, ty: y });
    };
    rotate = function(r) {
        JG.ctx.rotate(r * angleMult);
        p[p.length - 1].push(r * angleMult);
    };
    scale = function(s, b) {
        JG.ctx.scale(s, b || s);
        p[p.length - 1].push({ sx: s, sy: b || s });
    };
    popMatrix = function() {
        var ms = p[p.length - 1];
        for(var i = ms.length - 1; i >= 0; i -= 1) {
            var m = ms[i];
            if(typeof m === "number") {
                JG.ctx.rotate(-m);
                continue;
            }
            if(!m.tx && m.tx !== 0 && !m.ty && m.ty !== 0 && (m.sx || m.sx === 0) && (m.sy || m.sy === 0)) {
                JG.ctx.scale(1/m.sx, 1/m.sy);
                continue;
            }
            JG.ctx.translate(-m.tx, -m.ty);
        }
        if(p.length > 0) {
            p.splice(p.length - 1, 1);
        }
    };
    background = function(r, g, b, a) {
        JG.ctx.clearRect(0, 0, width, height);
        if(!g && g !== 0) {
            g = r;
            b = r;
            a = 255;
            JG.ctx.fillStyle = rgba2hex(r, g, b, a);
        }
        else if(!b && b !== 0) {
            a = g;
            g = r;
            b = r;
            JG.ctx.fillStyle = rgba2hex(r, g, b, a);
        }
        else {
            JG.ctx.fillStyle = JG.colorMode === "rgb" ? rgba2hex(r, g, b, a) : hsba2hex(r, g, b, a);
        }
        JG.ctx.fillRect(0, 0, width, height);
    };
    createCanvas = function(w, h) {
        frameCount = 0;
        console.log("Thi" + "s" + " p" + "ro" + "gram" + " us" + "es" + " JentGent's" + " J" + "G" + ".2D." + "j" + "s " + "library v" + version + ".");
        try {
            var existed = JG.can;
            JG.can = document.createElement("canvas");
            JG.can.setAttribute("id", "jgcanvas");
            JG.can.width = w + "";
            JG.can.height = h + "";
            JG.can.setAttribute("oncontextmenu", "return false");
            JG.can.innerHTML = "Your browser does not support HTML canvas";
            if(!existed) {
                document.body.appendChild(JG.can);
                JG.can.setAttribute("tabindex", 0);
                JG.can.addEventListener("mousemove", function(e) {
                    var rCan = JG.can.getBoundingClientRect();
                    var x = e.clientX || e.x || e.offsetX;
                    var y = e.clientY || e.y || e.offsetY;
                    mouseX = x - rCan.left;
                    mouseY = y - rCan.top;
                }, false);
                JG.can.addEventListener("mousedown", function(e) {
                    mouseIsPressed = true;
                }, false);
                JG.can.addEventListener("mouseup", function(e) {
                    mouseIsPressed = false;
                }, false);
                JG.can.addEventListener("keydown", function(e) {
                    keyCode = e.code;
                    key = e.key;
                    keyIsPressed = true;
                    if([" ", LEFT, RIGHT, UP, DOWN].indexOf(e.key) > -1) {
                        e.preventDefault();
                    }
                }, false);
                JG.can.addEventListener("keyup", function(e) {
                    keyCode = e.code;
                    key = e.key;
                    keyIsPressed = false;
                }, false);
                JG.can.addEventListener("keypress", function(e) {
                    
                });
                var recorded = {};
                function checkCustomEventListeners() {
                    if(mousePressed && !recorded.mousePressed) {
                        recorded.mousePressed = true;
                        JG.can.addEventListener("mousedown", mousePressed);
                    }
                    if(mouseReleased && !recorded.mouseReleased) {
                        recorded.mouseReleased = true;
                        JG.can.addEventListener("mouseup", mouseReleased);
                    }
                    if(keyPressed && !recorded.keyPressed) {
                        recorded.keyPressed = true;
                        JG.can.addEventListener("keydown", keyPressed);
                    }
                    if(keyReleased && !recorded.keyReleased) {
                        recorded.keyReleased = true;
                        JG.can.addEventListener("keyup", keyReleased);
                    }
                    if(recorded.mousePressed && recorded.mouseReleased && recorded.keyPressed && recorded.keyReleased) {
                        return;
                    }
                    setTimeout(checkCustomEventListeners, 1000/60);
                };
                checkCustomEventListeners();
            }
            width = w;
            height = h;
            JG.ctx = JG.can.getContext("2d");
        }
        catch(e) {
            throw new Error("Error creating canvas");
        }
    };
    function checkDraw() {
        if(draw) {
            console.log("JG.2D.js v" + version + " by JentGent @JentacularGent");
            var drawString = draw.toString();
            drawString = (drawString.substring(0, drawString.length - 1) + "    setTimeout(draw, FPS);\n    frameCount += 1;\n    pmouseX = mouseX;\n    pmouseY = mouseY;}").replace(/KAInfiniteLoopProtect\(\);/g, "");
            draw = new Function("return " + drawString)();
            setTimeout(draw, FPS);
            return;
        }
        setTimeout(checkDraw, 1000/60);
    };
    checkDraw();
})();

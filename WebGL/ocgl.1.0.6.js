
var OCGL;

(function() {
var version = "1.0.5";
console.log("Made with Octory GL v" + version);
var JG = {
    
};
var gl, uniforms = [], activeProgram;

var initShader = function(sourceCode, shaderType) {
    var base = gl.createShader(shaderType);
    console.log("Attempting to initiate " + ((shaderType === gl.FRAGMENT_SHADER) ? "fragment" : "vertex") + " shader ...");
    gl.shaderSource(base, sourceCode);
    gl.compileShader(base);
    if(!gl.getShaderParameter(base, gl.COMPILE_STATUS)) {
        throw new Error("Could not compile shader because code has error.\n" + gl.getShaderInfoLog(base));
        return;
    }
    console.log("Success compiling shader!");
    return base;
};
var initProgram = function(s) {
    var glProgram = gl.createProgram();
    console.log("Attempting to initiate WebGL program with " + s.length + " shaders ...");
    for(var i = 0; i < s.length; i += 1) {
        console.log("Attaching shader #" + (i + 1) + " to program ...");
        gl.attachShader(glProgram, s[i]);
    }
    console.log("Linking WebGL program for GPU usage ...");
    gl.linkProgram(glProgram);
    if(!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
        throw new Error("Could not compile WebGL program because code has error:\n" + gl.getProgramInfoLog(glProgram));
        return;
    }
    gl.validateProgram(glProgram);
    if (!gl.getProgramParameter(glProgram, gl.VALIDATE_STATUS)) {
        throw new Error("Could not validate WebGL program.\n" + gl.getProgramInfoLog(glProgram));
        return;
    }
    console.log("Success initiating WebGL program!");
    return glProgram;
};
var createProgram = function(v, f) {
    return initProgram([
        initShader(v, gl.VERTEX_SHADER),
        initShader(f, gl.FRAGMENT_SHADER)
    ]);
};

var Program = function(v, f) {
    this.vert = v;
    this.frag = f;
    this.program = createProgram(v, f);
};
Program.prototype.setAttribute = function(n, s, t, no, j, o) {
    var l = gl.getAttribLocation(this.program, n);
    gl.vertexAttribPointer(l, s, t, no, j, o);
    gl.enableVertexAttribArray(l);
}; // [Program].setAttribute(String name, Number sizePerItem, GLenum type, Boolean normalized, Number size, Number offset)
Program.prototype.setUniform = function(n, t, v) {
    t = "uniform" + t;
    if(gl[t]) {
        try {
            gl.useProgram(this.program);
            gl[t](gl.getUniformLocation(this.program, n), v);
            gl.useProgram(activeProgram);
            return;
        }
        catch(e) {
            throw new Error("Wrong arguments for uniform type " + t);
            gl.useProgram(activeProgram);
            return;
        }
    }
    throw new Error("No such uniform type exists as " + t);
}; // [Program].setUniform(String name, String uniformType, String values)
Program.prototype.injectTexture = function(n, i, w, h, a, ws, wt, mf, Mf) {
    gl.activeTexture(gl.TEXTURE0 + i);
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, a);
    this.setUniform(n, "1iv", [i]);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, ws || gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wt || gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mf || gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, Mf || gl.NEAREST);
    return tex;
}; // [Program].injectTexture(String name, Number index, Number width, number height, UInt8ClampedArray image, *GLfloat/GLint param1, *GLfloat/GLint param2, *GLfloat/GLint param3, *GLfloat/GLint param4)
// Inject a texture [image] named [name] into texture index [index] with width [width] and height [height], with optional horizontal texture wrap [param1], vertical texture wrap [param2], minification filter [param3], and magnification filter [param4]
// NOTE: There IS a limit to how many texture indices there are!
Program.prototype.fullscreen = function() {
    var verts = new Float32Array([
        -1, -1,
        1, -1,
        1, 1,
        -1, -1,
        -1, 1,
        1, 1,
    ]);
    oc.setupBuffer(oc.ARRAY_BUFFER, verts, oc.STATIC_DRAW);
    this.setAttribute("vertPos", 2, oc.FLOAT, false, 2 * verts.BYTES_PER_ELEMENT, 0);
    oc.renderArrays(6);
}; // [Program].fullscreen()
var applyGL = function(id) {
    var c = document.getElementById(id) || id;
    if(!c) {
        throw new Error("No element with id " + id + " found");
        return;
    }
    if(c.tagName !== "CANVAS") {
        throw new Error("Element to apply GL to must be of tag canvas");
        return;
    }
    JG.can = c;
    JG.width = c.width;
    JG.height = c.height;
    JG.gl = JG.can.getContext("webgl2");
    console.log("Attempting to initiate WebGL2 context ...");
    if(!JG.gl) {
        JG.gl = JG.can.getContext("experimental-webgl2");
        console.log("WebGL2 not supported, attempting to initiate experimental WebGL2 ...");
    }
    else {
        gl = JG.gl;
        return console.log("Success!");
    }
    if(!JG.gl) {
        JG.gl = JG.can.getContext("webgl");
        console.log("Experimental WebGL2 not supported, attempting to initiate WebGL ...");
    }
    else {
        gl = JG.gl;
        return console.log("Success!");
    }
    if(!JG.gl) {
        JG.gl = JG.can.getContext("experimental-webgl");
        console.log("WebGL not supported, attempting to initiate experimental WebGL ...");
    }
    else {
        gl = JG.gl;
        return console.log("Success!");
    }
    alert("Your browser does not support WebGL.");
    throw new Error("No WebGL supported on this browser");
};
var createCanvas = function(w, h) {
    console.log("\n=====Octory GL v" + version + "=====");
    var c = JG.can;
    if(!c) {
        c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        c.id = "jgocglcanvas";
        c.setAttribute("oncontextmenu", "return false");
        c.innerHTML = "Your browser does not support HTML5 or canvas graphics.";
        document.body.appendChild(c);
        applyGL("jgocglcanvas");
        return;
    }
    throw new Error("There can only be one active OCGL canvas");
};
var use = function(p) {
    gl.useProgram(p.program);
    activeProgram = p.program;
    for(var i = 0; i < uniforms.length; i += 1) {
        var u = uniforms[i];
        p.setUniform(u[0], u[1], u[2]);
    }
};
var depthTest = function(e) {
    return e === true ? gl.enable(gl.DEPTH_TEST) : gl.disable(gl.DEPTH_TEST);
};
var clearColor = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
};
var clearDepth = function() {
    gl.clear(gl.DEPTH_BUFFER_BIT);
};
var setupBuffer = function(t, a, o) {
    var b = gl.createBuffer();
    gl.bindBuffer(t, b);
    gl.bufferData(t, a, o);
    return b;
};
var renderArrays = function(n) {
    gl.drawArrays(gl.TRIANGLES, 0, n);
};
var renderElements = function(n) {
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_SHORT, 0);
};
var universalUniform = function(n, t, v) {
    for(var i = 0; i < uniforms.length; i += 1) {
        var u = uniforms[i];
        if(u[0] !== n) {
            continue;
        }
        uniforms[i][1] = t;
        uniforms[i][2] = v;
        return;
    }
    uniforms.push([n, t, v]);
};

var OC = {
    /**METHODS**/
    get createCanvas() {
        return createCanvas;
    }, // (Number width, Number height) Automatically create a canvas with a WebGL context
    get applyGL() {
        return applyGL;
    }, // (String elementID) Inject Octory WebGL into an existing canvas
    get use() {
        return use;
    }, // (Program program) Activate a certain Program for use
    get depthTest() {
        return depthTest;
    }, // (Boolean enabled) If true, enable depth test, if false, disable it
    get clearColor() {
        return clearColor;
    }, // () Clear the color buffer
    get clearDepth() {
        return clearDepth;
    }, // () Clear the depth buffer
    get setupBuffer() {
        return setupBuffer;
    }, // (GLenum target, Array array, GLenum usage) Creates buffer of [array], binds buffer to [target], and uses data in [usage]
    get renderArrays() {
        return renderArrays;
    }, // (Number index) Renders [index] triangles
    get renderElements() {
        return renderElements;
    }, // (Number index) Renders [index] triangle indices
    get universalUniform() {
        return universalUniform;
    },
    
    /**"Classes"**/
    get Program() {
        return Program;
    }, // (String vertexShaderCode, String fragmentShaderCode) See "Program" prototype
    
    /**READ-ONLY VARIABLES**/
    get can() {
        return JG.can;
    }, // HTMLElement; Canvas element
    get ctx() {
        return JG.gl;
    }, // RenderingContext; WebGL context
    get gl() {
        return JG.gl;
    }, // RenderingContext; WebGL context (same as ctx)
    get width() {
        return JG.width;
    }, // Number; Canvas width
    get height() {
        return JG.height;
    }, // Number; Canvas height
    
    /**CONSTANTS**/
    get BYTE() {
        return gl.BYTE;
    }, // GLenum; signed 8-bit integer, values within [-128, 127]
    get SHORT() {
        return gl.SHORT;
    }, // GLenum; signed 16-bit integer, values within [-32768, 32767]
    get UNSIGNED_BYTE() {
        return gl.UNSIGNED_SHORT;
    }, // GLenum; unsigned 8-bit integer, values within [0, 255]
    get UNSIGNED_SHORT() {
        return gl.UNSIGNED_SHORT;
    }, // GLenum; unsigned 16-bit integer, values within [0, 65535]
    get FLOAT() {
        return gl.FLOAT;
    }, // GLenum; 32-bit IEEE floating point number
    get NEAREST() {
        return gl.NEAREST;
    }, // GLint; round texture coordinate
    get CLAMP_TO_EDGE() {
        return gl.CLAMP_TO_EDGE;
    }, // GLint; clamp texture coordinates
    get REPEAT() {
        return gl.REPEAT;
    }, // GLint; loop texture coordinates
    get MIRRORED_REPEAT() {
        return gl.MIRRORED_REPEAT;
    }, // GLint; loop texture coordinates but reverse them every loop
    get NEAREST_MIPMAP_NEAREST() {
        return gl.NEAREST_MIPMAP_NEAREST;
    },
    get LINEAR_MIPMAP_NEAREST() {
        return gl.LINEAR_MIPMAP_NEAREST;
    },
    get NEAREST_MIPMAP_LINEAR() {
        return gl.NEAREST_MIPMAP_LINEAR;
    },
    get LINEAR_MIPMAP_LINEAR() {
        return gl.LINEAR_MIPMAP_LINEAR;
    },
    get ARRAY_BUFFER() {
        return gl.ARRAY_BUFFER;
    },
    get STATIC_DRAW() {
        return gl.STATIC_DRAW;
    },
};
OCGL = OC;
})();

// ==UserScript==
// @name         Bilibili 旧播放页
// @namespace    MotooriKashin
// @version      10.0.0
// @description  恢复Bilibili旧版页面，为了那些念旧的人。
// @author       MotooriKashin, wly5556
// @homepage     https://github.com/MotooriKashin/Bilibili-Old
// @supportURL   https://github.com/MotooriKashin/Bilibili-Old/issues
// @icon         https://www.bilibili.com/favicon.ico
// @match        *://*.bilibili.com/*
// @connect      *
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM.cookie
// @run-at       document-start
// @license      MIT
// @resource     bilibiliPlayer.js https://fastly.jsdelivr.net/gh/MotooriKashin/Bilibili-Old@3ae20f30de5ad37882b474aa886ea06f9641886b/src/bilibili/bilibiliPlayer.min.js
// ==/UserScript==

const modules =`
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS({
  "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
    "use strict";
    module2.exports = asPromise;
    function asPromise(fn, ctx) {
      var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
      while (index < arguments.length)
        params[offset++] = arguments[index++];
      return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err) {
          if (pending) {
            pending = false;
            if (err)
              reject(err);
            else {
              var params2 = new Array(arguments.length - 1), offset2 = 0;
              while (offset2 < params2.length)
                params2[offset2++] = arguments[offset2];
              resolve.apply(null, params2);
            }
          }
        };
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      });
    }
  }
});

// node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    var base64 = exports2;
    base64.length = function length(string) {
      var p = string.length;
      if (!p)
        return 0;
      var n = 0;
      while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
      return Math.ceil(string.length * 3) / 4 - n;
    };
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
    base64.encode = function encode(buffer2, start, end) {
      var parts = null, chunk = [];
      var i2 = 0, j = 0, t;
      while (start < end) {
        var b = buffer2[start++];
        switch (j) {
          case 0:
            chunk[i2++] = b64[b >> 2];
            t = (b & 3) << 4;
            j = 1;
            break;
          case 1:
            chunk[i2++] = b64[t | b >> 4];
            t = (b & 15) << 2;
            j = 2;
            break;
          case 2:
            chunk[i2++] = b64[t | b >> 6];
            chunk[i2++] = b64[b & 63];
            j = 0;
            break;
        }
        if (i2 > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i2 = 0;
        }
      }
      if (j) {
        chunk[i2++] = b64[t];
        chunk[i2++] = 61;
        if (j === 1)
          chunk[i2++] = 61;
      }
      if (parts) {
        if (i2)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i2));
    };
    var invalidEncoding = "invalid encoding";
    base64.decode = function decode(string, buffer2, offset) {
      var start = offset;
      var j = 0, t;
      for (var i2 = 0; i2 < string.length; ) {
        var c = string.charCodeAt(i2++);
        if (c === 61 && j > 1)
          break;
        if ((c = s64[c]) === void 0)
          throw Error(invalidEncoding);
        switch (j) {
          case 0:
            t = c;
            j = 1;
            break;
          case 1:
            buffer2[offset++] = t << 2 | (c & 48) >> 4;
            t = c;
            j = 2;
            break;
          case 2:
            buffer2[offset++] = (t & 15) << 4 | (c & 60) >> 2;
            t = c;
            j = 3;
            break;
          case 3:
            buffer2[offset++] = (t & 3) << 6 | c;
            j = 0;
            break;
        }
      }
      if (j === 1)
        throw Error(invalidEncoding);
      return offset - start;
    };
    base64.test = function test(string) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?\$/.test(string);
    };
  }
});

// node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS({
  "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
    "use strict";
    module2.exports = EventEmitter;
    function EventEmitter() {
      this._listeners = {};
    }
    EventEmitter.prototype.on = function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this
      });
      return this;
    };
    EventEmitter.prototype.off = function off(evt, fn) {
      if (evt === void 0)
        this._listeners = {};
      else {
        if (fn === void 0)
          this._listeners[evt] = [];
        else {
          var listeners = this._listeners[evt];
          for (var i = 0; i < listeners.length; )
            if (listeners[i].fn === fn)
              listeners.splice(i, 1);
            else
              ++i;
        }
      }
      return this;
    };
    EventEmitter.prototype.emit = function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args = [], i = 1;
        for (; i < arguments.length; )
          args.push(arguments[i++]);
        for (i = 0; i < listeners.length; )
          listeners[i].fn.apply(listeners[i++].ctx, args);
      }
      return this;
    };
  }
});

// node_modules/@protobufjs/float/index.js
var require_float = __commonJS({
  "node_modules/@protobufjs/float/index.js"(exports2, module2) {
    "use strict";
    module2.exports = factory(factory);
    function factory(exports3) {
      if (typeof Float32Array !== "undefined")
        (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
      else
        (function() {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
      if (typeof Float64Array !== "undefined")
        (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
      else
        (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
      return exports3;
    }
    function writeUintLE(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    function writeUintBE(val, buf, pos) {
      buf[pos] = val >>> 24;
      buf[pos + 1] = val >>> 16 & 255;
      buf[pos + 2] = val >>> 8 & 255;
      buf[pos + 3] = val & 255;
    }
    function readUintLE(buf, pos) {
      return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
    }
    function readUintBE(buf, pos) {
      return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
    }
  }
});

// node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS({
  "node_modules/@protobufjs/inquire/index.js"(exports, module) {
    "use strict";
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
          return mod;
      } catch (e) {
      }
      return null;
    }
  }
});

// node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    var utf8 = exports2;
    utf8.length = function utf8_length(string) {
      var len = 0, c = 0;
      for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
          len += 1;
        else if (c < 2048)
          len += 2;
        else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
          ++i;
          len += 4;
        } else
          len += 3;
      }
      return len;
    };
    utf8.read = function utf8_read(buffer2, start, end) {
      var len = end - start;
      if (len < 1)
        return "";
      var parts = null, chunk = [], i = 0, t;
      while (start < end) {
        t = buffer2[start++];
        if (t < 128)
          chunk[i++] = t;
        else if (t > 191 && t < 224)
          chunk[i++] = (t & 31) << 6 | buffer2[start++] & 63;
        else if (t > 239 && t < 365) {
          t = ((t & 7) << 18 | (buffer2[start++] & 63) << 12 | (buffer2[start++] & 63) << 6 | buffer2[start++] & 63) - 65536;
          chunk[i++] = 55296 + (t >> 10);
          chunk[i++] = 56320 + (t & 1023);
        } else
          chunk[i++] = (t & 15) << 12 | (buffer2[start++] & 63) << 6 | buffer2[start++] & 63;
        if (i > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i = 0;
        }
      }
      if (parts) {
        if (i)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i));
    };
    utf8.write = function utf8_write(string, buffer2, offset) {
      var start = offset, c1, c2;
      for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
          buffer2[offset++] = c1;
        } else if (c1 < 2048) {
          buffer2[offset++] = c1 >> 6 | 192;
          buffer2[offset++] = c1 & 63 | 128;
        } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer2[offset++] = c1 >> 18 | 240;
          buffer2[offset++] = c1 >> 12 & 63 | 128;
          buffer2[offset++] = c1 >> 6 & 63 | 128;
          buffer2[offset++] = c1 & 63 | 128;
        } else {
          buffer2[offset++] = c1 >> 12 | 224;
          buffer2[offset++] = c1 >> 6 & 63 | 128;
          buffer2[offset++] = c1 & 63 | 128;
        }
      }
      return offset - start;
    };
  }
});

// node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS({
  "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
    "use strict";
    module2.exports = pool;
    function pool(alloc, slice, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return function pool_alloc(size2) {
        if (size2 < 1 || size2 > MAX)
          return alloc(size2);
        if (offset + size2 > SIZE) {
          slab = alloc(SIZE);
          offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size2);
        if (offset & 7)
          offset = (offset | 7) + 1;
        return buf;
      };
    }
  }
});

// node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    module2.exports = LongBits;
    var util = require_minimal();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    var zero = LongBits.zero = new LongBits(0, 0);
    zero.toNumber = function() {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function() {
      return this;
    };
    zero.length = function() {
      return 1;
    };
    var zeroHash = LongBits.zeroHash = "\\0\\0\\0\\0\\0\\0\\0\\0";
    LongBits.fromNumber = function fromNumber(value) {
      if (value === 0)
        return zero;
      var sign = value < 0;
      if (sign)
        value = -value;
      var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
      if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295)
            hi = 0;
        }
      }
      return new LongBits(lo, hi);
    };
    LongBits.from = function from(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util.isString(value)) {
        if (util.Long)
          value = util.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    };
    LongBits.prototype.toNumber = function toNumber(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash)
        return zero;
      return new LongBits(
        (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
        (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
      );
    };
    LongBits.prototype.toHash = function toHash() {
      return String.fromCharCode(
        this.lo & 255,
        this.lo >>> 8 & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24,
        this.hi & 255,
        this.hi >>> 8 & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
      );
    };
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    };
  }
});

// node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    var util = exports2;
    util.asPromise = require_aspromise();
    util.base64 = require_base64();
    util.EventEmitter = require_eventemitter();
    util.float = require_float();
    util.inquire = require_inquire();
    util.utf8 = require_utf8();
    util.pool = require_pool();
    util.LongBits = require_longbits();
    util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
    util.emptyArray = Object.freeze ? Object.freeze([]) : [];
    util.emptyObject = Object.freeze ? Object.freeze({}) : {};
    util.isInteger = Number.isInteger || function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util.isObject = function isObject2(value) {
      return value && typeof value === "object";
    };
    util.isset = util.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util.Buffer = function() {
      try {
        var Buffer2 = util.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : null;
      } catch (e) {
        return null;
      }
    }();
    util._Buffer_from = null;
    util._Buffer_allocUnsafe = null;
    util.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util.Long = util.global.dcodeIO && util.global.dcodeIO.Long || util.global.Long || util.inquire("long");
    util.key2Re = /^true|false|0|1\$/;
    util.key32Re = /^-?(?:0|[1-9][0-9]*)\$/;
    util.key64Re = /^(?:[\\\\x00-\\\\xff]{8}|-?(?:0|[1-9][0-9]*))\$/;
    util.longToHash = function longToHash(value) {
      return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
    };
    util.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util.LongBits.fromHash(hash);
      if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge(dst, src, ifNotSet) {
      for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src[keys[i]];
      return dst;
    }
    util.merge = merge;
    util.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name) {
      function CustomError(message2, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message2, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message2;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge(this, properties);
      }
      (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
      Object.defineProperty(CustomError.prototype, "name", { get: function() {
        return name;
      } });
      CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
      };
      return CustomError;
    }
    util.newError = newError;
    util.ProtocolError = newError("ProtocolError");
    util.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util.oneOfSetter = function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    };
    util.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util._configure = function() {
      var Buffer2 = util.Buffer;
      if (!Buffer2) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
      }
      util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util._Buffer_allocUnsafe = Buffer2.allocUnsafe || function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  }
});

// node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    module2.exports = Writer;
    var util = require_minimal();
    var BufferWriter;
    var LongBits = util.LongBits;
    var base64 = util.base64;
    var utf8 = util.utf8;
    function Op(fn, len, val) {
      this.fn = fn;
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    function noop() {
    }
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    function Writer() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer();
      };
    };
    Writer.create = create();
    Writer.alloc = function alloc(size) {
      return new util.Array(size);
    };
    if (util.Array !== Array)
      Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
    Writer.prototype._push = function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    };
    function writeByte(val, buf, pos) {
      buf[pos] = val & 255;
    }
    function writeVarint32(val, buf, pos) {
      while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
      }
      buf[pos] = val;
    }
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
        value
      )).len;
      return this;
    };
    Writer.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer.prototype.sint32 = function write_sint32(value) {
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    };
    function writeVarint64(val, buf, pos) {
      while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
      }
      while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
      }
      buf[pos++] = val.lo;
    }
    Writer.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.int64 = Writer.prototype.uint64;
    Writer.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    Writer.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    Writer.prototype.float = function write_float(value) {
      return this._push(util.float.writeFloatLE, 4, value);
    };
    Writer.prototype.double = function write_double(value) {
      return this._push(util.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    };
    Writer.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer.prototype.reset = function reset() {
      if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
      } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
      }
      return this;
    };
    Writer.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer.prototype.finish = function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    };
    Writer._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer.create = create();
      BufferWriter._configure();
    };
  }
});

// node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferWriter;
    var Writer = require_writer();
    (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
    var util = require_minimal();
    function BufferWriter() {
      Writer.call(this);
    }
    BufferWriter._configure = function() {
      BufferWriter.alloc = util._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy)
          val.copy(buf, pos, 0, val.length);
        else
          for (var i = 0; i < val.length; )
            buf[pos++] = val[i++];
      };
    };
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
      if (util.isString(value))
        value = util._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  }
});

// node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    module2.exports = Reader;
    var util = require_minimal();
    var BufferReader;
    var LongBits = util.LongBits;
    var utf8 = util.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    function Reader(buffer2) {
      this.buf = buffer2;
      this.pos = 0;
      this.len = buffer2.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer2) {
      if (buffer2 instanceof Uint8Array || Array.isArray(buffer2))
        return new Reader(buffer2);
      throw Error("illegal buffer");
    } : function create_array2(buffer2) {
      if (Array.isArray(buffer2))
        return new Reader(buffer2);
      throw Error("illegal buffer");
    };
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup(buffer2) {
        return (Reader.create = function create_buffer(buffer3) {
          return util.Buffer.isBuffer(buffer3) ? new BufferReader(buffer3) : create_array(buffer3);
        })(buffer2);
      } : create_array;
    };
    Reader.create = create();
    Reader.prototype._slice = util.Array.prototype.subarray || util.Array.prototype.slice;
    Reader.prototype.uint32 = function read_uint32_setup() {
      var value = 4294967295;
      return function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        if ((this.pos += 5) > this.len) {
          this.pos = this.len;
          throw indexOutOfRange(this, 10);
        }
        return value;
      };
    }();
    Reader.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader.prototype.sint32 = function read_sint32() {
      var value = this.uint32();
      return value >>> 1 ^ -(value & 1) | 0;
    };
    function readLongVarint() {
      var bits = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
        i = 0;
      } else {
        for (; i < 3; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
      }
      if (this.len - this.pos > 4) {
        for (; i < 5; ++i) {
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      } else {
        for (; i < 5; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      }
      throw Error("invalid varint encoding");
    }
    Reader.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    Reader.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader.prototype.bytes = function read_bytes() {
      var length = this.uint32(), start = this.pos, end = this.pos + length;
      if (end > this.len)
        throw indexOutOfRange(this, length);
      this.pos += length;
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      return start === end ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
    };
    Reader.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    };
    Reader.prototype.skip = function skip(length) {
      if (typeof length === "number") {
        if (this.pos + length > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
      } else {
        do {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
      }
      return this;
    };
    Reader.prototype.skipType = function(wireType) {
      switch (wireType) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          while ((wireType = this.uint32() & 7) !== 4) {
            this.skipType(wireType);
          }
          break;
        case 5:
          this.skip(4);
          break;
        default:
          throw Error("invalid wire type " + wireType + " at offset " + this.pos);
      }
      return this;
    };
    Reader._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader.create = create();
      BufferReader._configure();
      var fn = util.Long ? "toLong" : "toNumber";
      util.merge(Reader.prototype, {
        int64: function read_int64() {
          return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        }
      });
    };
  }
});

// node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferReader;
    var Reader = require_reader();
    (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
    var util = require_minimal();
    function BufferReader(buffer2) {
      Reader.call(this, buffer2);
    }
    BufferReader._configure = function() {
      if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    BufferReader._configure();
  }
});

// node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS({
  "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var util = require_minimal();
    (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
      if (!request)
        throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
      if (!self2.rpcImpl) {
        setTimeout(function() {
          callback(Error("already ended"));
        }, 0);
        return void 0;
      }
      try {
        return self2.rpcImpl(
          method,
          requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
          function rpcCallback(err, response) {
            if (err) {
              self2.emit("error", err, method);
              return callback(err);
            }
            if (response === null) {
              self2.end(true);
              return void 0;
            }
            if (!(response instanceof responseCtor)) {
              try {
                response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
              } catch (err2) {
                self2.emit("error", err2, method);
                return callback(err2);
              }
            }
            self2.emit("data", response, method);
            return callback(null, response);
          }
        );
      } catch (err) {
        self2.emit("error", err, method);
        setTimeout(function() {
          callback(err);
        }, 0);
        return void 0;
      }
    };
    Service.prototype.end = function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC)
          this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    };
  }
});

// node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    var rpc = exports2;
    rpc.Service = require_service();
  }
});

// node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS({
  "node_modules/protobufjs/src/index-minimal.js"(exports2) {
    "use strict";
    var protobuf3 = exports2;
    protobuf3.build = "minimal";
    protobuf3.Writer = require_writer();
    protobuf3.BufferWriter = require_writer_buffer();
    protobuf3.Reader = require_reader();
    protobuf3.BufferReader = require_reader_buffer();
    protobuf3.util = require_minimal();
    protobuf3.rpc = require_rpc();
    protobuf3.roots = require_roots();
    protobuf3.configure = configure;
    function configure() {
      protobuf3.util._configure();
      protobuf3.Writer._configure(protobuf3.BufferWriter);
      protobuf3.Reader._configure(protobuf3.BufferReader);
    }
    configure();
  }
});

// node_modules/@protobufjs/codegen/index.js
var require_codegen = __commonJS({
  "node_modules/@protobufjs/codegen/index.js"(exports2, module2) {
    "use strict";
    module2.exports = codegen;
    function codegen(functionParams, functionName) {
      if (typeof functionParams === "string") {
        functionName = functionParams;
        functionParams = void 0;
      }
      var body = [];
      function Codegen(formatStringOrScope) {
        if (typeof formatStringOrScope !== "string") {
          var source = toString();
          if (codegen.verbose)
            console.log("codegen: " + source);
          source = "return " + source;
          if (formatStringOrScope) {
            var scopeKeys = Object.keys(formatStringOrScope), scopeParams = new Array(scopeKeys.length + 1), scopeValues = new Array(scopeKeys.length), scopeOffset = 0;
            while (scopeOffset < scopeKeys.length) {
              scopeParams[scopeOffset] = scopeKeys[scopeOffset];
              scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
            }
            scopeParams[scopeOffset] = source;
            return Function.apply(null, scopeParams).apply(null, scopeValues);
          }
          return Function(source)();
        }
        var formatParams = new Array(arguments.length - 1), formatOffset = 0;
        while (formatOffset < formatParams.length)
          formatParams[formatOffset] = arguments[++formatOffset];
        formatOffset = 0;
        formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace(\$0, \$1) {
          var value = formatParams[formatOffset++];
          switch (\$1) {
            case "d":
            case "f":
              return String(Number(value));
            case "i":
              return String(Math.floor(value));
            case "j":
              return JSON.stringify(value);
            case "s":
              return String(value);
          }
          return "%";
        });
        if (formatOffset !== formatParams.length)
          throw Error("parameter count mismatch");
        body.push(formatStringOrScope);
        return Codegen;
      }
      function toString(functionNameOverride) {
        return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\\n  " + body.join("\\n  ") + "\\n}";
      }
      Codegen.toString = toString;
      return Codegen;
    }
    codegen.verbose = false;
  }
});

// node_modules/@protobufjs/fetch/index.js
var require_fetch = __commonJS({
  "node_modules/@protobufjs/fetch/index.js"(exports2, module2) {
    "use strict";
    module2.exports = fetch2;
    var asPromise = require_aspromise();
    var inquire2 = require_inquire();
    var fs = inquire2("fs");
    function fetch2(filename, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else if (!options)
        options = {};
      if (!callback)
        return asPromise(fetch2, this, filename, options);
      if (!options.xhr && fs && fs.readFile)
        return fs.readFile(filename, function fetchReadFileCallback(err, contents) {
          return err && typeof XMLHttpRequest !== "undefined" ? fetch2.xhr(filename, options, callback) : err ? callback(err) : callback(null, options.binary ? contents : contents.toString("utf8"));
        });
      return fetch2.xhr(filename, options, callback);
    }
    fetch2.xhr = function fetch_xhr(filename, options, callback) {
      var xhr2 = new XMLHttpRequest();
      xhr2.onreadystatechange = function fetchOnReadyStateChange() {
        if (xhr2.readyState !== 4)
          return void 0;
        if (xhr2.status !== 0 && xhr2.status !== 200)
          return callback(Error("status " + xhr2.status));
        if (options.binary) {
          var buffer2 = xhr2.response;
          if (!buffer2) {
            buffer2 = [];
            for (var i = 0; i < xhr2.responseText.length; ++i)
              buffer2.push(xhr2.responseText.charCodeAt(i) & 255);
          }
          return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer2) : buffer2);
        }
        return callback(null, xhr2.responseText);
      };
      if (options.binary) {
        if ("overrideMimeType" in xhr2)
          xhr2.overrideMimeType("text/plain; charset=x-user-defined");
        xhr2.responseType = "arraybuffer";
      }
      xhr2.open("GET", filename);
      xhr2.send();
    };
  }
});

// node_modules/@protobufjs/path/index.js
var require_path = __commonJS({
  "node_modules/@protobufjs/path/index.js"(exports2) {
    "use strict";
    var path2 = exports2;
    var isAbsolute = path2.isAbsolute = function isAbsolute2(path3) {
      return /^(?:\\/|\\w+:)/.test(path3);
    };
    var normalize = path2.normalize = function normalize2(path3) {
      path3 = path3.replace(/\\\\/g, "/").replace(/\\/{2,}/g, "/");
      var parts = path3.split("/"), absolute = isAbsolute(path3), prefix = "";
      if (absolute)
        prefix = parts.shift() + "/";
      for (var i = 0; i < parts.length; ) {
        if (parts[i] === "..") {
          if (i > 0 && parts[i - 1] !== "..")
            parts.splice(--i, 2);
          else if (absolute)
            parts.splice(i, 1);
          else
            ++i;
        } else if (parts[i] === ".")
          parts.splice(i, 1);
        else
          ++i;
      }
      return prefix + parts.join("/");
    };
    path2.resolve = function resolve(originPath, includePath, alreadyNormalized) {
      if (!alreadyNormalized)
        includePath = normalize(includePath);
      if (isAbsolute(includePath))
        return includePath;
      if (!alreadyNormalized)
        originPath = normalize(originPath);
      return (originPath = originPath.replace(/(?:\\/|^)[^/]+\$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
    };
  }
});

// node_modules/protobufjs/src/types.js
var require_types = __commonJS({
  "node_modules/protobufjs/src/types.js"(exports2) {
    "use strict";
    var types = exports2;
    var util = require_util();
    var s = [
      "double",
      "float",
      "int32",
      "uint32",
      "sint32",
      "fixed32",
      "sfixed32",
      "int64",
      "uint64",
      "sint64",
      "fixed64",
      "sfixed64",
      "bool",
      "string",
      "bytes"
    ];
    function bake(values, offset) {
      var i = 0, o = {};
      offset |= 0;
      while (i < values.length)
        o[s[i + offset]] = values[i++];
      return o;
    }
    types.basic = bake([
      1,
      5,
      0,
      0,
      0,
      5,
      5,
      0,
      0,
      0,
      1,
      1,
      0,
      2,
      2
    ]);
    types.defaults = bake([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      false,
      "",
      util.emptyArray,
      null
    ]);
    types.long = bake([
      0,
      0,
      0,
      1,
      1
    ], 7);
    types.mapKey = bake([
      0,
      0,
      0,
      5,
      5,
      0,
      0,
      0,
      1,
      1,
      0,
      2
    ], 2);
    types.packed = bake([
      1,
      5,
      0,
      0,
      0,
      5,
      5,
      0,
      0,
      0,
      1,
      1,
      0
    ]);
  }
});

// node_modules/protobufjs/src/field.js
var require_field = __commonJS({
  "node_modules/protobufjs/src/field.js"(exports2, module2) {
    "use strict";
    module2.exports = Field;
    var ReflectionObject = require_object();
    ((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";
    var Enum = require_enum();
    var types = require_types();
    var util = require_util();
    var Type;
    var ruleRe = /^required|optional|repeated\$/;
    Field.fromJSON = function fromJSON(name, json) {
      return new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
    };
    function Field(name, id, type, rule, extend, options, comment) {
      if (util.isObject(rule)) {
        comment = extend;
        options = rule;
        rule = extend = void 0;
      } else if (util.isObject(extend)) {
        comment = options;
        options = extend;
        extend = void 0;
      }
      ReflectionObject.call(this, name, options);
      if (!util.isInteger(id) || id < 0)
        throw TypeError("id must be a non-negative integer");
      if (!util.isString(type))
        throw TypeError("type must be a string");
      if (rule !== void 0 && !ruleRe.test(rule = rule.toString().toLowerCase()))
        throw TypeError("rule must be a string rule");
      if (extend !== void 0 && !util.isString(extend))
        throw TypeError("extend must be a string");
      if (rule === "proto3_optional") {
        rule = "optional";
      }
      this.rule = rule && rule !== "optional" ? rule : void 0;
      this.type = type;
      this.id = id;
      this.extend = extend || void 0;
      this.required = rule === "required";
      this.optional = !this.required;
      this.repeated = rule === "repeated";
      this.map = false;
      this.message = null;
      this.partOf = null;
      this.typeDefault = null;
      this.defaultValue = null;
      this.long = util.Long ? types.long[type] !== void 0 : false;
      this.bytes = type === "bytes";
      this.resolvedType = null;
      this.extensionField = null;
      this.declaringField = null;
      this._packed = null;
      this.comment = comment;
    }
    Object.defineProperty(Field.prototype, "packed", {
      get: function() {
        if (this._packed === null)
          this._packed = this.getOption("packed") !== false;
        return this._packed;
      }
    });
    Field.prototype.setOption = function setOption(name, value, ifNotSet) {
      if (name === "packed")
        this._packed = null;
      return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
    };
    Field.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "rule",
        this.rule !== "optional" && this.rule || void 0,
        "type",
        this.type,
        "id",
        this.id,
        "extend",
        this.extend,
        "options",
        this.options,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    Field.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      if ((this.typeDefault = types.defaults[this.type]) === void 0) {
        this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
        if (this.resolvedType instanceof Type)
          this.typeDefault = null;
        else
          this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]];
      }
      if (this.options && this.options["default"] != null) {
        this.typeDefault = this.options["default"];
        if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string")
          this.typeDefault = this.resolvedType.values[this.typeDefault];
      }
      if (this.options) {
        if (this.options.packed === true || this.options.packed !== void 0 && this.resolvedType && !(this.resolvedType instanceof Enum))
          delete this.options.packed;
        if (!Object.keys(this.options).length)
          this.options = void 0;
      }
      if (this.long) {
        this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");
        if (Object.freeze)
          Object.freeze(this.typeDefault);
      } else if (this.bytes && typeof this.typeDefault === "string") {
        var buf;
        if (util.base64.test(this.typeDefault))
          util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);
        else
          util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
        this.typeDefault = buf;
      }
      if (this.map)
        this.defaultValue = util.emptyObject;
      else if (this.repeated)
        this.defaultValue = util.emptyArray;
      else
        this.defaultValue = this.typeDefault;
      if (this.parent instanceof Type)
        this.parent.ctor.prototype[this.name] = this.defaultValue;
      return ReflectionObject.prototype.resolve.call(this);
    };
    Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {
      if (typeof fieldType === "function")
        fieldType = util.decorateType(fieldType).name;
      else if (fieldType && typeof fieldType === "object")
        fieldType = util.decorateEnum(fieldType).name;
      return function fieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor).add(new Field(fieldName, fieldId, fieldType, fieldRule, { "default": defaultValue }));
      };
    };
    Field._configure = function configure(Type_) {
      Type = Type_;
    };
  }
});

// node_modules/protobufjs/src/oneof.js
var require_oneof = __commonJS({
  "node_modules/protobufjs/src/oneof.js"(exports2, module2) {
    "use strict";
    module2.exports = OneOf;
    var ReflectionObject = require_object();
    ((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";
    var Field = require_field();
    var util = require_util();
    function OneOf(name, fieldNames, options, comment) {
      if (!Array.isArray(fieldNames)) {
        options = fieldNames;
        fieldNames = void 0;
      }
      ReflectionObject.call(this, name, options);
      if (!(fieldNames === void 0 || Array.isArray(fieldNames)))
        throw TypeError("fieldNames must be an Array");
      this.oneof = fieldNames || [];
      this.fieldsArray = [];
      this.comment = comment;
    }
    OneOf.fromJSON = function fromJSON(name, json) {
      return new OneOf(name, json.oneof, json.options, json.comment);
    };
    OneOf.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        this.options,
        "oneof",
        this.oneof,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    function addFieldsToParent(oneof) {
      if (oneof.parent) {
        for (var i = 0; i < oneof.fieldsArray.length; ++i)
          if (!oneof.fieldsArray[i].parent)
            oneof.parent.add(oneof.fieldsArray[i]);
      }
    }
    OneOf.prototype.add = function add(field) {
      if (!(field instanceof Field))
        throw TypeError("field must be a Field");
      if (field.parent && field.parent !== this.parent)
        field.parent.remove(field);
      this.oneof.push(field.name);
      this.fieldsArray.push(field);
      field.partOf = this;
      addFieldsToParent(this);
      return this;
    };
    OneOf.prototype.remove = function remove(field) {
      if (!(field instanceof Field))
        throw TypeError("field must be a Field");
      var index = this.fieldsArray.indexOf(field);
      if (index < 0)
        throw Error(field + " is not a member of " + this);
      this.fieldsArray.splice(index, 1);
      index = this.oneof.indexOf(field.name);
      if (index > -1)
        this.oneof.splice(index, 1);
      field.partOf = null;
      return this;
    };
    OneOf.prototype.onAdd = function onAdd(parent) {
      ReflectionObject.prototype.onAdd.call(this, parent);
      var self2 = this;
      for (var i = 0; i < this.oneof.length; ++i) {
        var field = parent.get(this.oneof[i]);
        if (field && !field.partOf) {
          field.partOf = self2;
          self2.fieldsArray.push(field);
        }
      }
      addFieldsToParent(this);
    };
    OneOf.prototype.onRemove = function onRemove(parent) {
      for (var i = 0, field; i < this.fieldsArray.length; ++i)
        if ((field = this.fieldsArray[i]).parent)
          field.parent.remove(field);
      ReflectionObject.prototype.onRemove.call(this, parent);
    };
    OneOf.d = function decorateOneOf() {
      var fieldNames = new Array(arguments.length), index = 0;
      while (index < arguments.length)
        fieldNames[index] = arguments[index++];
      return function oneOfDecorator(prototype, oneofName) {
        util.decorateType(prototype.constructor).add(new OneOf(oneofName, fieldNames));
        Object.defineProperty(prototype, oneofName, {
          get: util.oneOfGetter(fieldNames),
          set: util.oneOfSetter(fieldNames)
        });
      };
    };
  }
});

// node_modules/protobufjs/src/namespace.js
var require_namespace = __commonJS({
  "node_modules/protobufjs/src/namespace.js"(exports2, module2) {
    "use strict";
    module2.exports = Namespace;
    var ReflectionObject = require_object();
    ((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";
    var Field = require_field();
    var OneOf = require_oneof();
    var util = require_util();
    var Type;
    var Service;
    var Enum;
    Namespace.fromJSON = function fromJSON(name, json) {
      return new Namespace(name, json.options).addJSON(json.nested);
    };
    function arrayToJSON(array, toJSONOptions) {
      if (!(array && array.length))
        return void 0;
      var obj = {};
      for (var i = 0; i < array.length; ++i)
        obj[array[i].name] = array[i].toJSON(toJSONOptions);
      return obj;
    }
    Namespace.arrayToJSON = arrayToJSON;
    Namespace.isReservedId = function isReservedId(reserved, id) {
      if (reserved) {
        for (var i = 0; i < reserved.length; ++i)
          if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] > id)
            return true;
      }
      return false;
    };
    Namespace.isReservedName = function isReservedName(reserved, name) {
      if (reserved) {
        for (var i = 0; i < reserved.length; ++i)
          if (reserved[i] === name)
            return true;
      }
      return false;
    };
    function Namespace(name, options) {
      ReflectionObject.call(this, name, options);
      this.nested = void 0;
      this._nestedArray = null;
    }
    function clearCache(namespace) {
      namespace._nestedArray = null;
      return namespace;
    }
    Object.defineProperty(Namespace.prototype, "nestedArray", {
      get: function() {
        return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
      }
    });
    Namespace.prototype.toJSON = function toJSON(toJSONOptions) {
      return util.toObject([
        "options",
        this.options,
        "nested",
        arrayToJSON(this.nestedArray, toJSONOptions)
      ]);
    };
    Namespace.prototype.addJSON = function addJSON(nestedJson) {
      var ns = this;
      if (nestedJson) {
        for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
          nested = nestedJson[names[i]];
          ns.add(
            (nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : nested.id !== void 0 ? Field.fromJSON : Namespace.fromJSON)(names[i], nested)
          );
        }
      }
      return this;
    };
    Namespace.prototype.get = function get3(name) {
      return this.nested && this.nested[name] || null;
    };
    Namespace.prototype.getEnum = function getEnum(name) {
      if (this.nested && this.nested[name] instanceof Enum)
        return this.nested[name].values;
      throw Error("no such enum: " + name);
    };
    Namespace.prototype.add = function add(object) {
      if (!(object instanceof Field && object.extend !== void 0 || object instanceof Type || object instanceof Enum || object instanceof Service || object instanceof Namespace || object instanceof OneOf))
        throw TypeError("object must be a valid nested object");
      if (!this.nested)
        this.nested = {};
      else {
        var prev = this.get(object.name);
        if (prev) {
          if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
            var nested = prev.nestedArray;
            for (var i = 0; i < nested.length; ++i)
              object.add(nested[i]);
            this.remove(prev);
            if (!this.nested)
              this.nested = {};
            object.setOptions(prev.options, true);
          } else
            throw Error("duplicate name '" + object.name + "' in " + this);
        }
      }
      this.nested[object.name] = object;
      object.onAdd(this);
      return clearCache(this);
    };
    Namespace.prototype.remove = function remove(object) {
      if (!(object instanceof ReflectionObject))
        throw TypeError("object must be a ReflectionObject");
      if (object.parent !== this)
        throw Error(object + " is not a member of " + this);
      delete this.nested[object.name];
      if (!Object.keys(this.nested).length)
        this.nested = void 0;
      object.onRemove(this);
      return clearCache(this);
    };
    Namespace.prototype.define = function define(path2, json) {
      if (util.isString(path2))
        path2 = path2.split(".");
      else if (!Array.isArray(path2))
        throw TypeError("illegal path");
      if (path2 && path2.length && path2[0] === "")
        throw Error("path must be relative");
      var ptr = this;
      while (path2.length > 0) {
        var part = path2.shift();
        if (ptr.nested && ptr.nested[part]) {
          ptr = ptr.nested[part];
          if (!(ptr instanceof Namespace))
            throw Error("path conflicts with non-namespace objects");
        } else
          ptr.add(ptr = new Namespace(part));
      }
      if (json)
        ptr.addJSON(json);
      return ptr;
    };
    Namespace.prototype.resolveAll = function resolveAll() {
      var nested = this.nestedArray, i = 0;
      while (i < nested.length)
        if (nested[i] instanceof Namespace)
          nested[i++].resolveAll();
        else
          nested[i++].resolve();
      return this.resolve();
    };
    Namespace.prototype.lookup = function lookup(path2, filterTypes, parentAlreadyChecked) {
      if (typeof filterTypes === "boolean") {
        parentAlreadyChecked = filterTypes;
        filterTypes = void 0;
      } else if (filterTypes && !Array.isArray(filterTypes))
        filterTypes = [filterTypes];
      if (util.isString(path2) && path2.length) {
        if (path2 === ".")
          return this.root;
        path2 = path2.split(".");
      } else if (!path2.length)
        return this;
      if (path2[0] === "")
        return this.root.lookup(path2.slice(1), filterTypes);
      var found = this.get(path2[0]);
      if (found) {
        if (path2.length === 1) {
          if (!filterTypes || filterTypes.indexOf(found.constructor) > -1)
            return found;
        } else if (found instanceof Namespace && (found = found.lookup(path2.slice(1), filterTypes, true)))
          return found;
      } else
        for (var i = 0; i < this.nestedArray.length; ++i)
          if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i].lookup(path2, filterTypes, true)))
            return found;
      if (this.parent === null || parentAlreadyChecked)
        return null;
      return this.parent.lookup(path2, filterTypes);
    };
    Namespace.prototype.lookupType = function lookupType(path2) {
      var found = this.lookup(path2, [Type]);
      if (!found)
        throw Error("no such type: " + path2);
      return found;
    };
    Namespace.prototype.lookupEnum = function lookupEnum(path2) {
      var found = this.lookup(path2, [Enum]);
      if (!found)
        throw Error("no such Enum '" + path2 + "' in " + this);
      return found;
    };
    Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path2) {
      var found = this.lookup(path2, [Type, Enum]);
      if (!found)
        throw Error("no such Type or Enum '" + path2 + "' in " + this);
      return found;
    };
    Namespace.prototype.lookupService = function lookupService(path2) {
      var found = this.lookup(path2, [Service]);
      if (!found)
        throw Error("no such Service '" + path2 + "' in " + this);
      return found;
    };
    Namespace._configure = function(Type_, Service_, Enum_) {
      Type = Type_;
      Service = Service_;
      Enum = Enum_;
    };
  }
});

// node_modules/protobufjs/src/mapfield.js
var require_mapfield = __commonJS({
  "node_modules/protobufjs/src/mapfield.js"(exports2, module2) {
    "use strict";
    module2.exports = MapField;
    var Field = require_field();
    ((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";
    var types = require_types();
    var util = require_util();
    function MapField(name, id, keyType, type, options, comment) {
      Field.call(this, name, id, type, void 0, void 0, options, comment);
      if (!util.isString(keyType))
        throw TypeError("keyType must be a string");
      this.keyType = keyType;
      this.resolvedKeyType = null;
      this.map = true;
    }
    MapField.fromJSON = function fromJSON(name, json) {
      return new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
    };
    MapField.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "keyType",
        this.keyType,
        "type",
        this.type,
        "id",
        this.id,
        "extend",
        this.extend,
        "options",
        this.options,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    MapField.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      if (types.mapKey[this.keyType] === void 0)
        throw Error("invalid key type: " + this.keyType);
      return Field.prototype.resolve.call(this);
    };
    MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {
      if (typeof fieldValueType === "function")
        fieldValueType = util.decorateType(fieldValueType).name;
      else if (fieldValueType && typeof fieldValueType === "object")
        fieldValueType = util.decorateEnum(fieldValueType).name;
      return function mapFieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor).add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
      };
    };
  }
});

// node_modules/protobufjs/src/method.js
var require_method = __commonJS({
  "node_modules/protobufjs/src/method.js"(exports2, module2) {
    "use strict";
    module2.exports = Method;
    var ReflectionObject = require_object();
    ((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";
    var util = require_util();
    function Method(name, type, requestType, responseType, requestStream, responseStream, options, comment, parsedOptions) {
      if (util.isObject(requestStream)) {
        options = requestStream;
        requestStream = responseStream = void 0;
      } else if (util.isObject(responseStream)) {
        options = responseStream;
        responseStream = void 0;
      }
      if (!(type === void 0 || util.isString(type)))
        throw TypeError("type must be a string");
      if (!util.isString(requestType))
        throw TypeError("requestType must be a string");
      if (!util.isString(responseType))
        throw TypeError("responseType must be a string");
      ReflectionObject.call(this, name, options);
      this.type = type || "rpc";
      this.requestType = requestType;
      this.requestStream = requestStream ? true : void 0;
      this.responseType = responseType;
      this.responseStream = responseStream ? true : void 0;
      this.resolvedRequestType = null;
      this.resolvedResponseType = null;
      this.comment = comment;
      this.parsedOptions = parsedOptions;
    }
    Method.fromJSON = function fromJSON(name, json) {
      return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment, json.parsedOptions);
    };
    Method.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "type",
        this.type !== "rpc" && this.type || void 0,
        "requestType",
        this.requestType,
        "requestStream",
        this.requestStream,
        "responseType",
        this.responseType,
        "responseStream",
        this.responseStream,
        "options",
        this.options,
        "comment",
        keepComments ? this.comment : void 0,
        "parsedOptions",
        this.parsedOptions
      ]);
    };
    Method.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      this.resolvedRequestType = this.parent.lookupType(this.requestType);
      this.resolvedResponseType = this.parent.lookupType(this.responseType);
      return ReflectionObject.prototype.resolve.call(this);
    };
  }
});

// node_modules/protobufjs/src/service.js
var require_service2 = __commonJS({
  "node_modules/protobufjs/src/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var Namespace = require_namespace();
    ((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";
    var Method = require_method();
    var util = require_util();
    var rpc = require_rpc();
    function Service(name, options) {
      Namespace.call(this, name, options);
      this.methods = {};
      this._methodsArray = null;
    }
    Service.fromJSON = function fromJSON(name, json) {
      var service = new Service(name, json.options);
      if (json.methods)
        for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i)
          service.add(Method.fromJSON(names[i], json.methods[names[i]]));
      if (json.nested)
        service.addJSON(json.nested);
      service.comment = json.comment;
      return service;
    };
    Service.prototype.toJSON = function toJSON(toJSONOptions) {
      var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        inherited && inherited.options || void 0,
        "methods",
        Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || {},
        "nested",
        inherited && inherited.nested || void 0,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    Object.defineProperty(Service.prototype, "methodsArray", {
      get: function() {
        return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
      }
    });
    function clearCache(service) {
      service._methodsArray = null;
      return service;
    }
    Service.prototype.get = function get3(name) {
      return this.methods[name] || Namespace.prototype.get.call(this, name);
    };
    Service.prototype.resolveAll = function resolveAll() {
      var methods = this.methodsArray;
      for (var i = 0; i < methods.length; ++i)
        methods[i].resolve();
      return Namespace.prototype.resolve.call(this);
    };
    Service.prototype.add = function add(object) {
      if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);
      if (object instanceof Method) {
        this.methods[object.name] = object;
        object.parent = this;
        return clearCache(this);
      }
      return Namespace.prototype.add.call(this, object);
    };
    Service.prototype.remove = function remove(object) {
      if (object instanceof Method) {
        if (this.methods[object.name] !== object)
          throw Error(object + " is not a member of " + this);
        delete this.methods[object.name];
        object.parent = null;
        return clearCache(this);
      }
      return Namespace.prototype.remove.call(this, object);
    };
    Service.prototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
      var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
      for (var i = 0, method; i < this.methodsArray.length; ++i) {
        var methodName = util.lcFirst((method = this._methodsArray[i]).resolve().name).replace(/[^\$\\w_]/g, "");
        rpcService[methodName] = util.codegen(["r", "c"], util.isReserved(methodName) ? methodName + "_" : methodName)("return this.rpcCall(m,q,s,r,c)")({
          m: method,
          q: method.resolvedRequestType.ctor,
          s: method.resolvedResponseType.ctor
        });
      }
      return rpcService;
    };
  }
});

// node_modules/protobufjs/src/message.js
var require_message = __commonJS({
  "node_modules/protobufjs/src/message.js"(exports2, module2) {
    "use strict";
    module2.exports = Message;
    var util = require_minimal();
    function Message(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          this[keys[i]] = properties[keys[i]];
    }
    Message.create = function create(properties) {
      return this.\$type.create(properties);
    };
    Message.encode = function encode(message2, writer) {
      return this.\$type.encode(message2, writer);
    };
    Message.encodeDelimited = function encodeDelimited(message2, writer) {
      return this.\$type.encodeDelimited(message2, writer);
    };
    Message.decode = function decode(reader) {
      return this.\$type.decode(reader);
    };
    Message.decodeDelimited = function decodeDelimited(reader) {
      return this.\$type.decodeDelimited(reader);
    };
    Message.verify = function verify(message2) {
      return this.\$type.verify(message2);
    };
    Message.fromObject = function fromObject(object) {
      return this.\$type.fromObject(object);
    };
    Message.toObject = function toObject(message2, options) {
      return this.\$type.toObject(message2, options);
    };
    Message.prototype.toJSON = function toJSON() {
      return this.\$type.toObject(this, util.toJSONOptions);
    };
  }
});

// node_modules/protobufjs/src/decoder.js
var require_decoder = __commonJS({
  "node_modules/protobufjs/src/decoder.js"(exports2, module2) {
    "use strict";
    module2.exports = decoder;
    var Enum = require_enum();
    var types = require_types();
    var util = require_util();
    function missing(field) {
      return "missing required '" + field.name + "'";
    }
    function decoder(mtype) {
      var gen = util.codegen(["r", "l"], mtype.name + "\$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function(field2) {
        return field2.map;
      }).length ? ",k,value" : ""))("while(r.pos<c){")("var t=r.uint32()");
      if (mtype.group)
        gen("if((t&7)===4)")("break");
      gen("switch(t>>>3){");
      var i = 0;
      for (; i < mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(), type = field.resolvedType instanceof Enum ? "int32" : field.type, ref = "m" + util.safeProp(field.name);
        gen("case %i:", field.id);
        if (field.map) {
          gen("if(%s===util.emptyObject)", ref)("%s={}", ref)("var c2 = r.uint32()+r.pos");
          if (types.defaults[field.keyType] !== void 0)
            gen("k=%j", types.defaults[field.keyType]);
          else
            gen("k=null");
          if (types.defaults[type] !== void 0)
            gen("value=%j", types.defaults[type]);
          else
            gen("value=null");
          gen("while(r.pos<c2){")("var tag2=r.uint32()")("switch(tag2>>>3){")("case 1: k=r.%s(); break", field.keyType)("case 2:");
          if (types.basic[type] === void 0)
            gen("value=types[%i].decode(r,r.uint32())", i);
          else
            gen("value=r.%s()", type);
          gen("break")("default:")("r.skipType(tag2&7)")("break")("}")("}");
          if (types.long[field.keyType] !== void 0)
            gen('%s[typeof k==="object"?util.longToHash(k):k]=value', ref);
          else
            gen("%s[k]=value", ref);
        } else if (field.repeated) {
          gen("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref);
          if (types.packed[type] !== void 0)
            gen("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", ref, type)("}else");
          if (types.basic[type] === void 0)
            gen(field.resolvedType.group ? "%s.push(types[%i].decode(r))" : "%s.push(types[%i].decode(r,r.uint32()))", ref, i);
          else
            gen("%s.push(r.%s())", ref, type);
        } else if (types.basic[type] === void 0)
          gen(field.resolvedType.group ? "%s=types[%i].decode(r)" : "%s=types[%i].decode(r,r.uint32())", ref, i);
        else
          gen("%s=r.%s()", ref, type);
        gen("break");
      }
      gen("default:")("r.skipType(t&7)")("break")("}")("}");
      for (i = 0; i < mtype._fieldsArray.length; ++i) {
        var rfield = mtype._fieldsArray[i];
        if (rfield.required)
          gen("if(!m.hasOwnProperty(%j))", rfield.name)("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
      }
      return gen("return m");
    }
  }
});

// node_modules/protobufjs/src/verifier.js
var require_verifier = __commonJS({
  "node_modules/protobufjs/src/verifier.js"(exports2, module2) {
    "use strict";
    module2.exports = verifier;
    var Enum = require_enum();
    var util = require_util();
    function invalid(field, expected) {
      return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:" + field.keyType + "}" : "") + " expected";
    }
    function genVerifyValue(gen, field, fieldIndex, ref) {
      if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) {
          gen("switch(%s){", ref)("default:")("return%j", invalid(field, "enum value"));
          for (var keys = Object.keys(field.resolvedType.values), j = 0; j < keys.length; ++j)
            gen("case %i:", field.resolvedType.values[keys[j]]);
          gen("break")("}");
        } else {
          gen("{")("var e=types[%i].verify(%s);", fieldIndex, ref)("if(e)")("return%j+e", field.name + ".")("}");
        }
      } else {
        switch (field.type) {
          case "int32":
          case "uint32":
          case "sint32":
          case "fixed32":
          case "sfixed32":
            gen("if(!util.isInteger(%s))", ref)("return%j", invalid(field, "integer"));
            break;
          case "int64":
          case "uint64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)("return%j", invalid(field, "integer|Long"));
            break;
          case "float":
          case "double":
            gen('if(typeof %s!=="number")', ref)("return%j", invalid(field, "number"));
            break;
          case "bool":
            gen('if(typeof %s!=="boolean")', ref)("return%j", invalid(field, "boolean"));
            break;
          case "string":
            gen("if(!util.isString(%s))", ref)("return%j", invalid(field, "string"));
            break;
          case "bytes":
            gen('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))', ref, ref, ref)("return%j", invalid(field, "buffer"));
            break;
        }
      }
      return gen;
    }
    function genVerifyKey(gen, field, ref) {
      switch (field.keyType) {
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
          gen("if(!util.key32Re.test(%s))", ref)("return%j", invalid(field, "integer key"));
          break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
          gen("if(!util.key64Re.test(%s))", ref)("return%j", invalid(field, "integer|Long key"));
          break;
        case "bool":
          gen("if(!util.key2Re.test(%s))", ref)("return%j", invalid(field, "boolean key"));
          break;
      }
      return gen;
    }
    function verifier(mtype) {
      var gen = util.codegen(["m"], mtype.name + "\$verify")('if(typeof m!=="object"||m===null)')("return%j", "object expected");
      var oneofs = mtype.oneofsArray, seenFirstField = {};
      if (oneofs.length)
        gen("var p={}");
      for (var i = 0; i < mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(), ref = "m" + util.safeProp(field.name);
        if (field.optional)
          gen("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name);
        if (field.map) {
          gen("if(!util.isObject(%s))", ref)("return%j", invalid(field, "object"))("var k=Object.keys(%s)", ref)("for(var i=0;i<k.length;++i){");
          genVerifyKey(gen, field, "k[i]");
          genVerifyValue(gen, field, i, ref + "[k[i]]")("}");
        } else if (field.repeated) {
          gen("if(!Array.isArray(%s))", ref)("return%j", invalid(field, "array"))("for(var i=0;i<%s.length;++i){", ref);
          genVerifyValue(gen, field, i, ref + "[i]")("}");
        } else {
          if (field.partOf) {
            var oneofProp = util.safeProp(field.partOf.name);
            if (seenFirstField[field.partOf.name] === 1)
              gen("if(p%s===1)", oneofProp)("return%j", field.partOf.name + ": multiple values");
            seenFirstField[field.partOf.name] = 1;
            gen("p%s=1", oneofProp);
          }
          genVerifyValue(gen, field, i, ref);
        }
        if (field.optional)
          gen("}");
      }
      return gen("return null");
    }
  }
});

// node_modules/protobufjs/src/converter.js
var require_converter = __commonJS({
  "node_modules/protobufjs/src/converter.js"(exports2) {
    "use strict";
    var converter = exports2;
    var Enum = require_enum();
    var util = require_util();
    function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
      if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) {
          gen("switch(d%s){", prop);
          for (var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
            if (field.repeated && values[keys[i]] === field.typeDefault)
              gen("default:");
            gen("case%j:", keys[i])("case %i:", values[keys[i]])("m%s=%j", prop, values[keys[i]])("break");
          }
          gen("}");
        } else
          gen('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", prop, fieldIndex, prop);
      } else {
        var isUnsigned = false;
        switch (field.type) {
          case "double":
          case "float":
            gen("m%s=Number(d%s)", prop, prop);
            break;
          case "uint32":
          case "fixed32":
            gen("m%s=d%s>>>0", prop, prop);
            break;
          case "int32":
          case "sint32":
          case "sfixed32":
            gen("m%s=d%s|0", prop, prop);
            break;
          case "uint64":
            isUnsigned = true;
          case "int64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)('else if(typeof d%s==="string")', prop)("m%s=parseInt(d%s,10)", prop, prop)('else if(typeof d%s==="number")', prop)("m%s=d%s", prop, prop)('else if(typeof d%s==="object")', prop)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
            break;
          case "bytes":
            gen('if(typeof d%s==="string")', prop)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)("else if(d%s.length)", prop)("m%s=d%s", prop, prop);
            break;
          case "string":
            gen("m%s=String(d%s)", prop, prop);
            break;
          case "bool":
            gen("m%s=Boolean(d%s)", prop, prop);
            break;
        }
      }
      return gen;
    }
    converter.fromObject = function fromObject(mtype) {
      var fields = mtype.fieldsArray;
      var gen = util.codegen(["d"], mtype.name + "\$fromObject")("if(d instanceof this.ctor)")("return d");
      if (!fields.length)
        return gen("return new this.ctor");
      gen("var m=new this.ctor");
      for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(), prop = util.safeProp(field.name);
        if (field.map) {
          gen("if(d%s){", prop)('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s={}", prop)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
          genValuePartial_fromObject(gen, field, i, prop + "[ks[i]]")("}")("}");
        } else if (field.repeated) {
          gen("if(d%s){", prop)("if(!Array.isArray(d%s))", prop)("throw TypeError(%j)", field.fullName + ": array expected")("m%s=[]", prop)("for(var i=0;i<d%s.length;++i){", prop);
          genValuePartial_fromObject(gen, field, i, prop + "[i]")("}")("}");
        } else {
          if (!(field.resolvedType instanceof Enum))
            gen("if(d%s!=null){", prop);
          genValuePartial_fromObject(gen, field, i, prop);
          if (!(field.resolvedType instanceof Enum))
            gen("}");
        }
      }
      return gen("return m");
    };
    function genValuePartial_toObject(gen, field, fieldIndex, prop) {
      if (field.resolvedType) {
        if (field.resolvedType instanceof Enum)
          gen("d%s=o.enums===String?types[%i].values[m%s]:m%s", prop, fieldIndex, prop, prop);
        else
          gen("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
      } else {
        var isUnsigned = false;
        switch (field.type) {
          case "double":
          case "float":
            gen("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", prop, prop, prop, prop);
            break;
          case "uint64":
            isUnsigned = true;
          case "int64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen('if(typeof m%s==="number")', prop)("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)("else")("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true" : "", prop);
            break;
          case "bytes":
            gen("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
            break;
          default:
            gen("d%s=m%s", prop, prop);
            break;
        }
      }
      return gen;
    }
    converter.toObject = function toObject(mtype) {
      var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
      if (!fields.length)
        return util.codegen()("return {}");
      var gen = util.codegen(["m", "o"], mtype.name + "\$toObject")("if(!o)")("o={}")("var d={}");
      var repeatedFields = [], mapFields = [], normalFields = [], i = 0;
      for (; i < fields.length; ++i)
        if (!fields[i].partOf)
          (fields[i].resolve().repeated ? repeatedFields : fields[i].map ? mapFields : normalFields).push(fields[i]);
      if (repeatedFields.length) {
        gen("if(o.arrays||o.defaults){");
        for (i = 0; i < repeatedFields.length; ++i)
          gen("d%s=[]", util.safeProp(repeatedFields[i].name));
        gen("}");
      }
      if (mapFields.length) {
        gen("if(o.objects||o.defaults){");
        for (i = 0; i < mapFields.length; ++i)
          gen("d%s={}", util.safeProp(mapFields[i].name));
        gen("}");
      }
      if (normalFields.length) {
        gen("if(o.defaults){");
        for (i = 0; i < normalFields.length; ++i) {
          var field = normalFields[i], prop = util.safeProp(field.name);
          if (field.resolvedType instanceof Enum)
            gen("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);
          else if (field.long)
            gen("if(util.Long){")("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)("}else")("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());
          else if (field.bytes) {
            var arrayDefault = "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]";
            gen("if(o.bytes===String)d%s=%j", prop, String.fromCharCode.apply(String, field.typeDefault))("else{")("d%s=%s", prop, arrayDefault)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", prop, prop)("}");
          } else
            gen("d%s=%j", prop, field.typeDefault);
        }
        gen("}");
      }
      var hasKs2 = false;
      for (i = 0; i < fields.length; ++i) {
        var field = fields[i], index = mtype._fieldsArray.indexOf(field), prop = util.safeProp(field.name);
        if (field.map) {
          if (!hasKs2) {
            hasKs2 = true;
            gen("var ks2");
          }
          gen("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)("d%s={}", prop)("for(var j=0;j<ks2.length;++j){");
          genValuePartial_toObject(gen, field, index, prop + "[ks2[j]]")("}");
        } else if (field.repeated) {
          gen("if(m%s&&m%s.length){", prop, prop)("d%s=[]", prop)("for(var j=0;j<m%s.length;++j){", prop);
          genValuePartial_toObject(gen, field, index, prop + "[j]")("}");
        } else {
          gen("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field.name);
          genValuePartial_toObject(gen, field, index, prop);
          if (field.partOf)
            gen("if(o.oneofs)")("d%s=%j", util.safeProp(field.partOf.name), field.name);
        }
        gen("}");
      }
      return gen("return d");
    };
  }
});

// node_modules/protobufjs/src/wrappers.js
var require_wrappers = __commonJS({
  "node_modules/protobufjs/src/wrappers.js"(exports2) {
    "use strict";
    var wrappers = exports2;
    var Message = require_message();
    wrappers[".google.protobuf.Any"] = {
      fromObject: function(object) {
        if (object && object["@type"]) {
          var name = object["@type"].substring(object["@type"].lastIndexOf("/") + 1);
          var type = this.lookup(name);
          if (type) {
            var type_url = object["@type"].charAt(0) === "." ? object["@type"].substr(1) : object["@type"];
            if (type_url.indexOf("/") === -1) {
              type_url = "/" + type_url;
            }
            return this.create({
              type_url,
              value: type.encode(type.fromObject(object)).finish()
            });
          }
        }
        return this.fromObject(object);
      },
      toObject: function(message2, options) {
        var googleApi = "type.googleapis.com/";
        var prefix = "";
        var name = "";
        if (options && options.json && message2.type_url && message2.value) {
          name = message2.type_url.substring(message2.type_url.lastIndexOf("/") + 1);
          prefix = message2.type_url.substring(0, message2.type_url.lastIndexOf("/") + 1);
          var type = this.lookup(name);
          if (type)
            message2 = type.decode(message2.value);
        }
        if (!(message2 instanceof this.ctor) && message2 instanceof Message) {
          var object = message2.\$type.toObject(message2, options);
          var messageName = message2.\$type.fullName[0] === "." ? message2.\$type.fullName.substr(1) : message2.\$type.fullName;
          if (prefix === "") {
            prefix = googleApi;
          }
          name = prefix + messageName;
          object["@type"] = name;
          return object;
        }
        return this.toObject(message2, options);
      }
    };
  }
});

// node_modules/protobufjs/src/type.js
var require_type = __commonJS({
  "node_modules/protobufjs/src/type.js"(exports2, module2) {
    "use strict";
    module2.exports = Type;
    var Namespace = require_namespace();
    ((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";
    var Enum = require_enum();
    var OneOf = require_oneof();
    var Field = require_field();
    var MapField = require_mapfield();
    var Service = require_service2();
    var Message = require_message();
    var Reader = require_reader();
    var Writer = require_writer();
    var util = require_util();
    var encoder2 = require_encoder();
    var decoder = require_decoder();
    var verifier = require_verifier();
    var converter = require_converter();
    var wrappers = require_wrappers();
    function Type(name, options) {
      Namespace.call(this, name, options);
      this.fields = {};
      this.oneofs = void 0;
      this.extensions = void 0;
      this.reserved = void 0;
      this.group = void 0;
      this._fieldsById = null;
      this._fieldsArray = null;
      this._oneofsArray = null;
      this._ctor = null;
    }
    Object.defineProperties(Type.prototype, {
      fieldsById: {
        get: function() {
          if (this._fieldsById)
            return this._fieldsById;
          this._fieldsById = {};
          for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
            var field = this.fields[names[i]], id = field.id;
            if (this._fieldsById[id])
              throw Error("duplicate id " + id + " in " + this);
            this._fieldsById[id] = field;
          }
          return this._fieldsById;
        }
      },
      fieldsArray: {
        get: function() {
          return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
        }
      },
      oneofsArray: {
        get: function() {
          return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
        }
      },
      ctor: {
        get: function() {
          return this._ctor || (this.ctor = Type.generateConstructor(this)());
        },
        set: function(ctor) {
          var prototype = ctor.prototype;
          if (!(prototype instanceof Message)) {
            (ctor.prototype = new Message()).constructor = ctor;
            util.merge(ctor.prototype, prototype);
          }
          ctor.\$type = ctor.prototype.\$type = this;
          util.merge(ctor, Message, true);
          this._ctor = ctor;
          var i = 0;
          for (; i < this.fieldsArray.length; ++i)
            this._fieldsArray[i].resolve();
          var ctorProperties = {};
          for (i = 0; i < this.oneofsArray.length; ++i)
            ctorProperties[this._oneofsArray[i].resolve().name] = {
              get: util.oneOfGetter(this._oneofsArray[i].oneof),
              set: util.oneOfSetter(this._oneofsArray[i].oneof)
            };
          if (i)
            Object.defineProperties(ctor.prototype, ctorProperties);
        }
      }
    });
    Type.generateConstructor = function generateConstructor(mtype) {
      var gen = util.codegen(["p"], mtype.name);
      for (var i = 0, field; i < mtype.fieldsArray.length; ++i)
        if ((field = mtype._fieldsArray[i]).map)
          gen("this%s={}", util.safeProp(field.name));
        else if (field.repeated)
          gen("this%s=[]", util.safeProp(field.name));
      return gen("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)")("this[ks[i]]=p[ks[i]]");
    };
    function clearCache(type) {
      type._fieldsById = type._fieldsArray = type._oneofsArray = null;
      delete type.encode;
      delete type.decode;
      delete type.verify;
      return type;
    }
    Type.fromJSON = function fromJSON(name, json) {
      var type = new Type(name, json.options);
      type.extensions = json.extensions;
      type.reserved = json.reserved;
      var names = Object.keys(json.fields), i = 0;
      for (; i < names.length; ++i)
        type.add(
          (typeof json.fields[names[i]].keyType !== "undefined" ? MapField.fromJSON : Field.fromJSON)(names[i], json.fields[names[i]])
        );
      if (json.oneofs)
        for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i)
          type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
      if (json.nested)
        for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
          var nested = json.nested[names[i]];
          type.add(
            (nested.id !== void 0 ? Field.fromJSON : nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : Namespace.fromJSON)(names[i], nested)
          );
        }
      if (json.extensions && json.extensions.length)
        type.extensions = json.extensions;
      if (json.reserved && json.reserved.length)
        type.reserved = json.reserved;
      if (json.group)
        type.group = true;
      if (json.comment)
        type.comment = json.comment;
      return type;
    };
    Type.prototype.toJSON = function toJSON(toJSONOptions) {
      var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        inherited && inherited.options || void 0,
        "oneofs",
        Namespace.arrayToJSON(this.oneofsArray, toJSONOptions),
        "fields",
        Namespace.arrayToJSON(this.fieldsArray.filter(function(obj) {
          return !obj.declaringField;
        }), toJSONOptions) || {},
        "extensions",
        this.extensions && this.extensions.length ? this.extensions : void 0,
        "reserved",
        this.reserved && this.reserved.length ? this.reserved : void 0,
        "group",
        this.group || void 0,
        "nested",
        inherited && inherited.nested || void 0,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    Type.prototype.resolveAll = function resolveAll() {
      var fields = this.fieldsArray, i = 0;
      while (i < fields.length)
        fields[i++].resolve();
      var oneofs = this.oneofsArray;
      i = 0;
      while (i < oneofs.length)
        oneofs[i++].resolve();
      return Namespace.prototype.resolveAll.call(this);
    };
    Type.prototype.get = function get3(name) {
      return this.fields[name] || this.oneofs && this.oneofs[name] || this.nested && this.nested[name] || null;
    };
    Type.prototype.add = function add(object) {
      if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);
      if (object instanceof Field && object.extend === void 0) {
        if (this._fieldsById ? this._fieldsById[object.id] : this.fieldsById[object.id])
          throw Error("duplicate id " + object.id + " in " + this);
        if (this.isReservedId(object.id))
          throw Error("id " + object.id + " is reserved in " + this);
        if (this.isReservedName(object.name))
          throw Error("name '" + object.name + "' is reserved in " + this);
        if (object.parent)
          object.parent.remove(object);
        this.fields[object.name] = object;
        object.message = this;
        object.onAdd(this);
        return clearCache(this);
      }
      if (object instanceof OneOf) {
        if (!this.oneofs)
          this.oneofs = {};
        this.oneofs[object.name] = object;
        object.onAdd(this);
        return clearCache(this);
      }
      return Namespace.prototype.add.call(this, object);
    };
    Type.prototype.remove = function remove(object) {
      if (object instanceof Field && object.extend === void 0) {
        if (!this.fields || this.fields[object.name] !== object)
          throw Error(object + " is not a member of " + this);
        delete this.fields[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
      }
      if (object instanceof OneOf) {
        if (!this.oneofs || this.oneofs[object.name] !== object)
          throw Error(object + " is not a member of " + this);
        delete this.oneofs[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
      }
      return Namespace.prototype.remove.call(this, object);
    };
    Type.prototype.isReservedId = function isReservedId(id) {
      return Namespace.isReservedId(this.reserved, id);
    };
    Type.prototype.isReservedName = function isReservedName(name) {
      return Namespace.isReservedName(this.reserved, name);
    };
    Type.prototype.create = function create(properties) {
      return new this.ctor(properties);
    };
    Type.prototype.setup = function setup() {
      var fullName = this.fullName, types = [];
      for (var i = 0; i < this.fieldsArray.length; ++i)
        types.push(this._fieldsArray[i].resolve().resolvedType);
      this.encode = encoder2(this)({
        Writer,
        types,
        util
      });
      this.decode = decoder(this)({
        Reader,
        types,
        util
      });
      this.verify = verifier(this)({
        types,
        util
      });
      this.fromObject = converter.fromObject(this)({
        types,
        util
      });
      this.toObject = converter.toObject(this)({
        types,
        util
      });
      var wrapper = wrappers[fullName];
      if (wrapper) {
        var originalThis = Object.create(this);
        originalThis.fromObject = this.fromObject;
        this.fromObject = wrapper.fromObject.bind(originalThis);
        originalThis.toObject = this.toObject;
        this.toObject = wrapper.toObject.bind(originalThis);
      }
      return this;
    };
    Type.prototype.encode = function encode_setup(message2, writer) {
      return this.setup().encode(message2, writer);
    };
    Type.prototype.encodeDelimited = function encodeDelimited(message2, writer) {
      return this.encode(message2, writer && writer.len ? writer.fork() : writer).ldelim();
    };
    Type.prototype.decode = function decode_setup(reader, length) {
      return this.setup().decode(reader, length);
    };
    Type.prototype.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof Reader))
        reader = Reader.create(reader);
      return this.decode(reader, reader.uint32());
    };
    Type.prototype.verify = function verify_setup(message2) {
      return this.setup().verify(message2);
    };
    Type.prototype.fromObject = function fromObject(object) {
      return this.setup().fromObject(object);
    };
    Type.prototype.toObject = function toObject(message2, options) {
      return this.setup().toObject(message2, options);
    };
    Type.d = function decorateType(typeName) {
      return function typeDecorator(target) {
        util.decorateType(target, typeName);
      };
    };
  }
});

// node_modules/protobufjs/src/root.js
var require_root = __commonJS({
  "node_modules/protobufjs/src/root.js"(exports2, module2) {
    "use strict";
    module2.exports = Root;
    var Namespace = require_namespace();
    ((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";
    var Field = require_field();
    var Enum = require_enum();
    var OneOf = require_oneof();
    var util = require_util();
    var Type;
    var parse;
    var common;
    function Root(options) {
      Namespace.call(this, "", options);
      this.deferred = [];
      this.files = [];
    }
    Root.fromJSON = function fromJSON(json, root3) {
      if (!root3)
        root3 = new Root();
      if (json.options)
        root3.setOptions(json.options);
      return root3.addJSON(json.nested);
    };
    Root.prototype.resolvePath = util.path.resolve;
    Root.prototype.fetch = util.fetch;
    function SYNC() {
    }
    Root.prototype.load = function load3(filename, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = void 0;
      }
      var self2 = this;
      if (!callback)
        return util.asPromise(load3, self2, filename, options);
      var sync = callback === SYNC;
      function finish(err, root3) {
        if (!callback)
          return;
        var cb = callback;
        callback = null;
        if (sync)
          throw err;
        cb(err, root3);
      }
      function getBundledFileName(filename2) {
        var idx = filename2.lastIndexOf("google/protobuf/");
        if (idx > -1) {
          var altname = filename2.substring(idx);
          if (altname in common)
            return altname;
        }
        return null;
      }
      function process(filename2, source) {
        try {
          if (util.isString(source) && source.charAt(0) === "{")
            source = JSON.parse(source);
          if (!util.isString(source))
            self2.setOptions(source.options).addJSON(source.nested);
          else {
            parse.filename = filename2;
            var parsed = parse(source, self2, options), resolved2, i2 = 0;
            if (parsed.imports) {
              for (; i2 < parsed.imports.length; ++i2)
                if (resolved2 = getBundledFileName(parsed.imports[i2]) || self2.resolvePath(filename2, parsed.imports[i2]))
                  fetch2(resolved2);
            }
            if (parsed.weakImports) {
              for (i2 = 0; i2 < parsed.weakImports.length; ++i2)
                if (resolved2 = getBundledFileName(parsed.weakImports[i2]) || self2.resolvePath(filename2, parsed.weakImports[i2]))
                  fetch2(resolved2, true);
            }
          }
        } catch (err) {
          finish(err);
        }
        if (!sync && !queued)
          finish(null, self2);
      }
      function fetch2(filename2, weak) {
        if (self2.files.indexOf(filename2) > -1)
          return;
        self2.files.push(filename2);
        if (filename2 in common) {
          if (sync)
            process(filename2, common[filename2]);
          else {
            ++queued;
            setTimeout(function() {
              --queued;
              process(filename2, common[filename2]);
            });
          }
          return;
        }
        if (sync) {
          var source;
          try {
            source = util.fs.readFileSync(filename2).toString("utf8");
          } catch (err) {
            if (!weak)
              finish(err);
            return;
          }
          process(filename2, source);
        } else {
          ++queued;
          self2.fetch(filename2, function(err, source2) {
            --queued;
            if (!callback)
              return;
            if (err) {
              if (!weak)
                finish(err);
              else if (!queued)
                finish(null, self2);
              return;
            }
            process(filename2, source2);
          });
        }
      }
      var queued = 0;
      if (util.isString(filename))
        filename = [filename];
      for (var i = 0, resolved; i < filename.length; ++i)
        if (resolved = self2.resolvePath("", filename[i]))
          fetch2(resolved);
      if (sync)
        return self2;
      if (!queued)
        finish(null, self2);
      return void 0;
    };
    Root.prototype.loadSync = function loadSync(filename, options) {
      if (!util.isNode)
        throw Error("not supported");
      return this.load(filename, options, SYNC);
    };
    Root.prototype.resolveAll = function resolveAll() {
      if (this.deferred.length)
        throw Error("unresolvable extensions: " + this.deferred.map(function(field) {
          return "'extend " + field.extend + "' in " + field.parent.fullName;
        }).join(", "));
      return Namespace.prototype.resolveAll.call(this);
    };
    var exposeRe = /^[A-Z]/;
    function tryHandleExtension(root3, field) {
      var extendedType = field.parent.lookup(field.extend);
      if (extendedType) {
        var sisterField = new Field(field.fullName, field.id, field.type, field.rule, void 0, field.options);
        sisterField.declaringField = field;
        field.extensionField = sisterField;
        extendedType.add(sisterField);
        return true;
      }
      return false;
    }
    Root.prototype._handleAdd = function _handleAdd(object) {
      if (object instanceof Field) {
        if (object.extend !== void 0 && !object.extensionField) {
          if (!tryHandleExtension(this, object))
            this.deferred.push(object);
        }
      } else if (object instanceof Enum) {
        if (exposeRe.test(object.name))
          object.parent[object.name] = object.values;
      } else if (!(object instanceof OneOf)) {
        if (object instanceof Type)
          for (var i = 0; i < this.deferred.length; )
            if (tryHandleExtension(this, this.deferred[i]))
              this.deferred.splice(i, 1);
            else
              ++i;
        for (var j = 0; j < object.nestedArray.length; ++j)
          this._handleAdd(object._nestedArray[j]);
        if (exposeRe.test(object.name))
          object.parent[object.name] = object;
      }
    };
    Root.prototype._handleRemove = function _handleRemove(object) {
      if (object instanceof Field) {
        if (object.extend !== void 0) {
          if (object.extensionField) {
            object.extensionField.parent.remove(object.extensionField);
            object.extensionField = null;
          } else {
            var index = this.deferred.indexOf(object);
            if (index > -1)
              this.deferred.splice(index, 1);
          }
        }
      } else if (object instanceof Enum) {
        if (exposeRe.test(object.name))
          delete object.parent[object.name];
      } else if (object instanceof Namespace) {
        for (var i = 0; i < object.nestedArray.length; ++i)
          this._handleRemove(object._nestedArray[i]);
        if (exposeRe.test(object.name))
          delete object.parent[object.name];
      }
    };
    Root._configure = function(Type_, parse_, common_) {
      Type = Type_;
      parse = parse_;
      common = common_;
    };
  }
});

// node_modules/protobufjs/src/util.js
var require_util = __commonJS({
  "node_modules/protobufjs/src/util.js"(exports2, module2) {
    "use strict";
    var util = module2.exports = require_minimal();
    var roots = require_roots();
    var Type;
    var Enum;
    util.codegen = require_codegen();
    util.fetch = require_fetch();
    util.path = require_path();
    util.fs = util.inquire("fs");
    util.toArray = function toArray(object) {
      if (object) {
        var keys = Object.keys(object), array = new Array(keys.length), index = 0;
        while (index < keys.length)
          array[index] = object[keys[index++]];
        return array;
      }
      return [];
    };
    util.toObject = function toObject(array) {
      var object = {}, index = 0;
      while (index < array.length) {
        var key = array[index++], val = array[index++];
        if (val !== void 0)
          object[key] = val;
      }
      return object;
    };
    var safePropBackslashRe = /\\\\/g;
    var safePropQuoteRe = /"/g;
    util.isReserved = function isReserved(name) {
      return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)\$/.test(name);
    };
    util.safeProp = function safeProp(prop) {
      if (!/^[\$\\w_]+\$/.test(prop) || util.isReserved(prop))
        return '["' + prop.replace(safePropBackslashRe, "\\\\\\\\").replace(safePropQuoteRe, '\\\\"') + '"]';
      return "." + prop;
    };
    util.ucFirst = function ucFirst(str) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    };
    var camelCaseRe = /_([a-z])/g;
    util.camelCase = function camelCase(str) {
      return str.substring(0, 1) + str.substring(1).replace(camelCaseRe, function(\$0, \$1) {
        return \$1.toUpperCase();
      });
    };
    util.compareFieldsById = function compareFieldsById(a, b) {
      return a.id - b.id;
    };
    util.decorateType = function decorateType(ctor, typeName) {
      if (ctor.\$type) {
        if (typeName && ctor.\$type.name !== typeName) {
          util.decorateRoot.remove(ctor.\$type);
          ctor.\$type.name = typeName;
          util.decorateRoot.add(ctor.\$type);
        }
        return ctor.\$type;
      }
      if (!Type)
        Type = require_type();
      var type = new Type(typeName || ctor.name);
      util.decorateRoot.add(type);
      type.ctor = ctor;
      Object.defineProperty(ctor, "\$type", { value: type, enumerable: false });
      Object.defineProperty(ctor.prototype, "\$type", { value: type, enumerable: false });
      return type;
    };
    var decorateEnumIndex = 0;
    util.decorateEnum = function decorateEnum(object) {
      if (object.\$type)
        return object.\$type;
      if (!Enum)
        Enum = require_enum();
      var enm = new Enum("Enum" + decorateEnumIndex++, object);
      util.decorateRoot.add(enm);
      Object.defineProperty(object, "\$type", { value: enm, enumerable: false });
      return enm;
    };
    util.setProperty = function setProperty(dst, path2, value) {
      function setProp(dst2, path3, value2) {
        var part = path3.shift();
        if (part === "__proto__") {
          return dst2;
        }
        if (path3.length > 0) {
          dst2[part] = setProp(dst2[part] || {}, path3, value2);
        } else {
          var prevValue = dst2[part];
          if (prevValue)
            value2 = [].concat(prevValue).concat(value2);
          dst2[part] = value2;
        }
        return dst2;
      }
      if (typeof dst !== "object")
        throw TypeError("dst must be an object");
      if (!path2)
        throw TypeError("path must be specified");
      path2 = path2.split(".");
      return setProp(dst, path2, value);
    };
    Object.defineProperty(util, "decorateRoot", {
      get: function() {
        return roots["decorated"] || (roots["decorated"] = new (require_root())());
      }
    });
  }
});

// node_modules/protobufjs/src/object.js
var require_object = __commonJS({
  "node_modules/protobufjs/src/object.js"(exports2, module2) {
    "use strict";
    module2.exports = ReflectionObject;
    ReflectionObject.className = "ReflectionObject";
    var util = require_util();
    var Root;
    function ReflectionObject(name, options) {
      if (!util.isString(name))
        throw TypeError("name must be a string");
      if (options && !util.isObject(options))
        throw TypeError("options must be an object");
      this.options = options;
      this.parsedOptions = null;
      this.name = name;
      this.parent = null;
      this.resolved = false;
      this.comment = null;
      this.filename = null;
    }
    Object.defineProperties(ReflectionObject.prototype, {
      root: {
        get: function() {
          var ptr = this;
          while (ptr.parent !== null)
            ptr = ptr.parent;
          return ptr;
        }
      },
      fullName: {
        get: function() {
          var path2 = [this.name], ptr = this.parent;
          while (ptr) {
            path2.unshift(ptr.name);
            ptr = ptr.parent;
          }
          return path2.join(".");
        }
      }
    });
    ReflectionObject.prototype.toJSON = function toJSON() {
      throw Error();
    };
    ReflectionObject.prototype.onAdd = function onAdd(parent) {
      if (this.parent && this.parent !== parent)
        this.parent.remove(this);
      this.parent = parent;
      this.resolved = false;
      var root3 = parent.root;
      if (root3 instanceof Root)
        root3._handleAdd(this);
    };
    ReflectionObject.prototype.onRemove = function onRemove(parent) {
      var root3 = parent.root;
      if (root3 instanceof Root)
        root3._handleRemove(this);
      this.parent = null;
      this.resolved = false;
    };
    ReflectionObject.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      if (this.root instanceof Root)
        this.resolved = true;
      return this;
    };
    ReflectionObject.prototype.getOption = function getOption(name) {
      if (this.options)
        return this.options[name];
      return void 0;
    };
    ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
      if (!ifNotSet || !this.options || this.options[name] === void 0)
        (this.options || (this.options = {}))[name] = value;
      return this;
    };
    ReflectionObject.prototype.setParsedOption = function setParsedOption(name, value, propName) {
      if (!this.parsedOptions) {
        this.parsedOptions = [];
      }
      var parsedOptions = this.parsedOptions;
      if (propName) {
        var opt = parsedOptions.find(function(opt2) {
          return Object.prototype.hasOwnProperty.call(opt2, name);
        });
        if (opt) {
          var newValue = opt[name];
          util.setProperty(newValue, propName, value);
        } else {
          opt = {};
          opt[name] = util.setProperty({}, propName, value);
          parsedOptions.push(opt);
        }
      } else {
        var newOpt = {};
        newOpt[name] = value;
        parsedOptions.push(newOpt);
      }
      return this;
    };
    ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
      if (options)
        for (var keys = Object.keys(options), i = 0; i < keys.length; ++i)
          this.setOption(keys[i], options[keys[i]], ifNotSet);
      return this;
    };
    ReflectionObject.prototype.toString = function toString() {
      var className = this.constructor.className, fullName = this.fullName;
      if (fullName.length)
        return className + " " + fullName;
      return className;
    };
    ReflectionObject._configure = function(Root_) {
      Root = Root_;
    };
  }
});

// node_modules/protobufjs/src/enum.js
var require_enum = __commonJS({
  "node_modules/protobufjs/src/enum.js"(exports2, module2) {
    "use strict";
    module2.exports = Enum;
    var ReflectionObject = require_object();
    ((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";
    var Namespace = require_namespace();
    var util = require_util();
    function Enum(name, values, options, comment, comments) {
      ReflectionObject.call(this, name, options);
      if (values && typeof values !== "object")
        throw TypeError("values must be an object");
      this.valuesById = {};
      this.values = Object.create(this.valuesById);
      this.comment = comment;
      this.comments = comments || {};
      this.reserved = void 0;
      if (values) {
        for (var keys = Object.keys(values), i = 0; i < keys.length; ++i)
          if (typeof values[keys[i]] === "number")
            this.valuesById[this.values[keys[i]] = values[keys[i]]] = keys[i];
      }
    }
    Enum.fromJSON = function fromJSON(name, json) {
      var enm = new Enum(name, json.values, json.options, json.comment, json.comments);
      enm.reserved = json.reserved;
      return enm;
    };
    Enum.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        this.options,
        "values",
        this.values,
        "reserved",
        this.reserved && this.reserved.length ? this.reserved : void 0,
        "comment",
        keepComments ? this.comment : void 0,
        "comments",
        keepComments ? this.comments : void 0
      ]);
    };
    Enum.prototype.add = function add(name, id, comment) {
      if (!util.isString(name))
        throw TypeError("name must be a string");
      if (!util.isInteger(id))
        throw TypeError("id must be an integer");
      if (this.values[name] !== void 0)
        throw Error("duplicate name '" + name + "' in " + this);
      if (this.isReservedId(id))
        throw Error("id " + id + " is reserved in " + this);
      if (this.isReservedName(name))
        throw Error("name '" + name + "' is reserved in " + this);
      if (this.valuesById[id] !== void 0) {
        if (!(this.options && this.options.allow_alias))
          throw Error("duplicate id " + id + " in " + this);
        this.values[name] = id;
      } else
        this.valuesById[this.values[name] = id] = name;
      this.comments[name] = comment || null;
      return this;
    };
    Enum.prototype.remove = function remove(name) {
      if (!util.isString(name))
        throw TypeError("name must be a string");
      var val = this.values[name];
      if (val == null)
        throw Error("name '" + name + "' does not exist in " + this);
      delete this.valuesById[val];
      delete this.values[name];
      delete this.comments[name];
      return this;
    };
    Enum.prototype.isReservedId = function isReservedId(id) {
      return Namespace.isReservedId(this.reserved, id);
    };
    Enum.prototype.isReservedName = function isReservedName(name) {
      return Namespace.isReservedName(this.reserved, name);
    };
  }
});

// node_modules/protobufjs/src/encoder.js
var require_encoder = __commonJS({
  "node_modules/protobufjs/src/encoder.js"(exports2, module2) {
    "use strict";
    module2.exports = encoder2;
    var Enum = require_enum();
    var types = require_types();
    var util = require_util();
    function genTypePartial(gen, field, fieldIndex, ref) {
      return field.resolvedType.group ? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0) : gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
    }
    function encoder2(mtype) {
      var gen = util.codegen(["m", "w"], mtype.name + "\$encode")("if(!w)")("w=Writer.create()");
      var i, ref;
      var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
      for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(), index = mtype._fieldsArray.indexOf(field), type = field.resolvedType instanceof Enum ? "int32" : field.type, wireType = types.basic[type];
        ref = "m" + util.safeProp(field.name);
        if (field.map) {
          gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j)){", ref, field.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
          if (wireType === void 0)
            gen("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index, ref);
          else
            gen(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
          gen("}")("}");
        } else if (field.repeated) {
          gen("if(%s!=null&&%s.length){", ref, ref);
          if (field.packed && types.packed[type] !== void 0) {
            gen("w.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", ref)("w.%s(%s[i])", type, ref)("w.ldelim()");
          } else {
            gen("for(var i=0;i<%s.length;++i)", ref);
            if (wireType === void 0)
              genTypePartial(gen, field, index, ref + "[i]");
            else
              gen("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);
          }
          gen("}");
        } else {
          if (field.optional)
            gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j))", ref, field.name);
          if (wireType === void 0)
            genTypePartial(gen, field, index, ref);
          else
            gen("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);
        }
      }
      return gen("return w");
    }
  }
});

// node_modules/protobufjs/src/index-light.js
var require_index_light = __commonJS({
  "node_modules/protobufjs/src/index-light.js"(exports2, module2) {
    "use strict";
    var protobuf3 = module2.exports = require_index_minimal();
    protobuf3.build = "light";
    function load3(filename, root3, callback) {
      if (typeof root3 === "function") {
        callback = root3;
        root3 = new protobuf3.Root();
      } else if (!root3)
        root3 = new protobuf3.Root();
      return root3.load(filename, callback);
    }
    protobuf3.load = load3;
    function loadSync(filename, root3) {
      if (!root3)
        root3 = new protobuf3.Root();
      return root3.loadSync(filename);
    }
    protobuf3.loadSync = loadSync;
    protobuf3.encoder = require_encoder();
    protobuf3.decoder = require_decoder();
    protobuf3.verifier = require_verifier();
    protobuf3.converter = require_converter();
    protobuf3.ReflectionObject = require_object();
    protobuf3.Namespace = require_namespace();
    protobuf3.Root = require_root();
    protobuf3.Enum = require_enum();
    protobuf3.Type = require_type();
    protobuf3.Field = require_field();
    protobuf3.OneOf = require_oneof();
    protobuf3.MapField = require_mapfield();
    protobuf3.Service = require_service2();
    protobuf3.Method = require_method();
    protobuf3.Message = require_message();
    protobuf3.wrappers = require_wrappers();
    protobuf3.types = require_types();
    protobuf3.util = require_util();
    protobuf3.ReflectionObject._configure(protobuf3.Root);
    protobuf3.Namespace._configure(protobuf3.Type, protobuf3.Service, protobuf3.Enum);
    protobuf3.Root._configure(protobuf3.Type);
    protobuf3.Field._configure(protobuf3.Type);
  }
});

// node_modules/protobufjs/light.js
var require_light = __commonJS({
  "node_modules/protobufjs/light.js"(exports2, module2) {
    "use strict";
    module2.exports = require_index_light();
  }
});

// src/runtime/element/create_element.ts
function createSVG(element) {
  const node2 = document.createElementNS("http://www.w3.org/2000/svg", element.tagName);
  element.props && Object.entries(element.props).forEach((d) => {
    node2.setAttribute(d[0], d[1]);
  });
  element.children && element.children.forEach((d) => {
    node2.appendChild(createSVG(d));
  });
  return node2;
}
function createElement(element) {
  if (element.tagName === "text") {
    return document.createTextNode(element.text);
  }
  if (element.tagName === "svg") {
    return createSVG(element);
  }
  const node2 = document.createElement(element.tagName);
  element.props && Object.entries(element.props).forEach((d) => {
    node2.setAttribute(d[0], d[1]);
  });
  element.text && node2.appendChild(document.createTextNode(element.text));
  element.event && Object.entries(element.event).forEach((d) => {
    node2.addEventListener(...d);
  });
  element.children && element.children.forEach((d) => {
    node2.appendChild(createElement(d));
  });
  return node2;
}
function createElements(elements) {
  const fragment = document.createDocumentFragment();
  elements.forEach((d) => {
    fragment.appendChild(createElement(d));
  });
  return fragment;
}

// src/runtime/element/html_vnode.ts
var Vnode = class {
  tagName;
  props = {};
  children = [];
  text;
  constructor(tagName) {
    this.tagName = tagName;
  }
};
var Scanner = class {
  html;
  pos = 0;
  vnode = [];
  tagNames = [];
  targets = [];
  text = "";
  quote = "";
  constructor(html) {
    this.html = html;
    this.targets.push({ children: this.vnode });
    while (this.html) {
      this.organizeTag();
    }
    this.textContent();
  }
  organizeTag() {
    if (!this.quote && this.html[0] === "<") {
      if (this.html.startsWith(\`</\${this.tagNames.reduce((s, d) => s = d, void 0)}\`)) {
        this.textContent();
        this.html = this.html.replace(new RegExp(\`^</\${this.tagNames.reduce((s, d) => s = d, void 0)}>\`), "");
        this.popNode();
      } else {
        this.removeScanned();
        if (this.html.startsWith("!-- ")) {
          this.html = this.html.replace(/^!--[\\S\\s]+?-->/, "");
        }
        if (/^[a-zA-Z]/.test(this.html)) {
          this.textContent();
          const func = [];
          let stop = false;
          for (this.pos = 0; this.pos < this.html.length; this.pos++) {
            if (stop) {
              this.pos--;
              break;
            }
            switch (this.html[this.pos]) {
              case " ":
              case "\\r":
              case "\\n":
                func.push(() => this.organizeProp());
                stop = true;
                break;
              case ">":
                this.html[this.pos - 1] === "/" ? func.push(() => this.popNode()) : func.push(() => this.tagSingle());
                stop = true;
                break;
            }
          }
          const tagName = this.html.substring(0, this.pos);
          const tag = new Vnode(tagName);
          this.tagNames.push(tagName);
          this.targets.reduce((s, d) => s = d, void 0).children.push(tag);
          this.targets.push(tag);
          this.removeScanned(this.pos + 1);
          func.forEach((d) => d());
        }
      }
    } else {
      switch (this.html[0]) {
        case "'":
          !this.quote ? this.quote = "'" : this.quote === "'" && (this.quote = "");
          break;
        case '"':
          !this.quote ? this.quote = '"' : this.quote === '"' && (this.quote = "");
          break;
        case "\`":
          !this.quote ? this.quote = "\`" : this.quote === "\`" && (this.quote = "");
          break;
      }
      this.text += this.html[0];
      this.removeScanned();
    }
  }
  organizeProp() {
    let value = false;
    let stop = false;
    let start = 0;
    let popd = false;
    for (this.pos = 0; this.pos < this.html.length; this.pos++) {
      if (stop)
        break;
      switch (this.html[this.pos]) {
        case '"':
          value = !value;
          break;
        case " ":
          if (!value) {
            const str = this.html.substring(start, this.pos).replace(/\\r|\\n|"/g, "").replace(/^ +/, "");
            const prop = str.split("=");
            const key = prop.shift();
            key && key !== "/" && (this.targets.reduce((s, d) => s = d, void 0).props[key] = prop.join("=") || key);
            start = this.pos;
          }
          break;
        case ">":
          if (!value) {
            stop = true;
            const str = this.html.substring(start, this.pos).replace(/\\r|\\n|"/g, "").replace(/^ +/, "");
            const prop = str.split("=");
            const key = prop.shift();
            key && key !== "/" && (this.targets.reduce((s, d) => s = d, void 0).props[key] = prop.join("=") || key);
            if (this.html[this.pos - 1] === "/") {
              this.popNode();
              popd = true;
            }
          }
          break;
      }
    }
    if (!popd)
      this.tagSingle();
    this.removeScanned(this.pos--);
  }
  tagSingle() {
    switch (this.tagNames.reduce((s, d) => s = d, void 0)) {
      case "area":
      case "base":
      case "br":
      case "col":
      case "colgroup":
      case "command":
      case "embed":
      case "hr":
      case "img":
      case "input":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "path":
      case "source":
      case "track":
      case "wbr":
        this.popNode();
        break;
    }
  }
  popNode() {
    this.tagNames.splice(this.tagNames.length - 1, 1);
    this.targets.splice(this.targets.length - 1, 1);
    this.text = "";
  }
  removeScanned(length = 1) {
    this.html = this.html.slice(length);
  }
  textContent() {
    const text = this.text.replace(/\\r|\\n| /g, "");
    if (text) {
      const tag = new Vnode("text");
      tag.text = this.text;
      this.targets.reduce((s, d) => s = d, void 0).children.push(tag);
    }
    this.text = "";
  }
};
function htmlVnode(html) {
  return new Scanner(html).vnode;
}

// src/runtime/format/integer.ts
function integerFormat(num, byte = 2) {
  return num < 10 ** byte ? (Array(byte).join("0") + num).slice(-1 * byte) : num;
}

// src/runtime/format/time.ts
function timeFormat(time = new Date().getTime(), type) {
  const date = new Date(time);
  const arr2 = date.toLocaleString().split(" ");
  const day = arr2[0].split("/");
  day[1] = integerFormat(day[1], 2);
  day[2] = integerFormat(day[2], 2);
  return type ? day.join("-") + " " + arr2[1] : arr2[1];
}

// src/runtime/debug.ts
var group = {
  i: 0,
  call: []
};
function debug(...data) {
  group.call.push(console.log.bind(console, \`%c[\${timeFormat()}]\`, "color: blue;", ...arguments));
  !group.i && setTimeout(group.call.shift());
  return debug;
}
debug.assert = function(condition, ...data) {
  group.call.push(console.assert.bind(console, \`[\${timeFormat()}]\`, ...arguments));
  !group.i && setTimeout(group.call.shift());
  return debug;
};
debug.clear = function() {
  group.i = 0;
  group.call = [];
  setTimeout(console.clear.bind(console));
  return debug;
};
debug.debug = function(...data) {
  group.call.push(console.debug.bind(console, \`[\${timeFormat()}]\`, ...arguments));
  !group.i && setTimeout(group.call.shift());
  return debug;
};
debug.error = function(...data) {
  group.call.push(console.error.bind(console, \`[\${timeFormat()}]\`, ...arguments));
  !group.i && setTimeout(group.call.shift());
  return debug;
};
debug.group = function(...data) {
  group.i++;
  group.call.push(console.group.bind(console, \`[\${timeFormat()}]\`, ...arguments));
  return debug;
};
debug.groupCollapsed = function(...data) {
  group.i++;
  group.call.push(console.groupCollapsed.bind(console, \`[\${timeFormat()}]\`, ...arguments));
  return debug;
};
debug.groupEnd = function() {
  if (group.i) {
    group.i--;
    group.call.push(console.groupEnd.bind(console));
    !group.i && (group.call.push(() => group.call = []), group.call.forEach((d) => setTimeout(d)));
  }
  return debug;
};
debug.info = function(...data) {
  group.call.push(console.info.bind(console, \`%c[\${timeFormat()}]\`, "color: blue;", ...arguments));
  !group.i && setTimeout(group.call.shift());
  return debug;
};
debug.log = function(...data) {
  group.call.push(console.log.bind(console, \`%c[\${timeFormat()}]\`, "color: blue;", ...arguments));
  !group.i && setTimeout(group.call.shift());
  return debug;
};
debug.table = function(tabularData, properties) {
  group.call.push(console.table.bind(console, ...arguments));
  !group.i && setTimeout(group.call.shift());
  return debug;
};
debug.time = function(label) {
  console.time(label);
  return debug;
};
debug.timeEnd = function(label) {
  console.timeEnd(label);
  return debug;
};
debug.timeLog = function(label, ...data) {
  console.timeLog(label, \`[\${timeFormat()}]\`, ...data);
  return debug;
};
debug.trace = function(...data) {
  group.call.push(console.trace.bind(console, ...arguments));
  !group.i && setTimeout(group.call.shift());
  return debug;
};
debug.warn = function(...data) {
  group.call.push(console.warn.bind(console, \`[\${timeFormat()}]\`, ...arguments));
  !group.i && setTimeout(group.call.shift());
  return debug;
};

// src/runtime/format/url.ts
var URLEs = class extends URL {
  constructor(url, base) {
    if (!base && typeof url === "string" && !/^[a-z]+:/.test(url)) {
      if (url.includes("=") && !url.includes("?") || !/^[A-Za-z0-9]/.test(url)) {
        base = location.origin;
      } else {
        const str = url.startsWith("//") ? "" : "//";
        url = location.protocol + str + url;
      }
    }
    super(url, base);
  }
};
function objUrl(url, obj) {
  const res = new URLEs(url);
  Object.entries(obj).forEach((d) => {
    if (d[1] || d[1] === "") {
      res.searchParams.set(d[0], d[1]);
    }
  });
  return res.toJSON();
}
function urlObj(url) {
  const res = new URLEs(url);
  const result = {};
  res.searchParams.forEach((v, k) => {
    result[k] = v;
  });
  return result;
}

// src/runtime/hook/node.ts
var appendChildHead = HTMLHeadElement.prototype.appendChild;
var appendChildBody = HTMLBodyElement.prototype.appendChild;
var insertBeforeHead = HTMLHeadElement.prototype.insertBefore;
var insertBeforeBody = HTMLBodyElement.prototype.insertBefore;
var jsonp = [];
HTMLHeadElement.prototype.appendChild = function(newChild) {
  newChild.nodeName == "SCRIPT" && newChild.src && jsonp.forEach((d) => {
    d[0].every((d2) => newChild.src.includes(d2)) && d[1].call(newChild);
  });
  return appendChildHead.call(this, newChild);
};
HTMLBodyElement.prototype.appendChild = function(newChild) {
  newChild.nodeName == "SCRIPT" && newChild.src && jsonp.forEach((d) => {
    d[0].every((d2) => newChild.src.includes(d2)) && d[1].call(newChild);
  });
  return appendChildBody.call(this, newChild);
};
HTMLHeadElement.prototype.insertBefore = function(newChild, refChild) {
  newChild.nodeName == "SCRIPT" && newChild.src && jsonp.forEach((d) => {
    d[0].every((d2) => newChild.src.includes(d2)) && d[1].call(newChild);
  });
  return insertBeforeHead.call(this, newChild, refChild);
};
HTMLBodyElement.prototype.insertBefore = function(newChild, refChild) {
  newChild.nodeName == "SCRIPT" && newChild.src && jsonp.forEach((d) => {
    d[0].every((d2) => newChild.src.includes(d2)) && d[1].call(newChild);
  });
  return insertBeforeBody.call(this, newChild, refChild);
};
function jsonphook(url, redirect, modifyResponse, once = true) {
  let id;
  const one = Array.isArray(url) ? url : [url];
  const two = function() {
    once && id && delete jsonp[id - 1];
    if (redirect)
      try {
        this.src = redirect(this.src) || this.src;
      } catch (e) {
        debug.error("redirect of jsonphook", one, e);
      }
    if (modifyResponse) {
      const obj = urlObj(this.src);
      if (obj) {
        const callback = obj.callback;
        const call = window[callback];
        const url2 = this.src;
        if (call) {
          window[callback] = function(v) {
            try {
              v = modifyResponse(v, url2, call) || v;
            } catch (e) {
              debug.error("modifyResponse of jsonphook", one, e);
            }
            return v !== true && call(v);
          };
        }
      }
    }
  };
  return id = jsonp.push([one, two]);
}
function jsonphookasync(url, condition, modifyResponse, once = true) {
  let id;
  const one = Array.isArray(url) ? url : [url];
  const two = function() {
    try {
      once && id && delete jsonp[id - 1];
      if (!condition || condition(this.src)) {
        const obj = urlObj(this.src);
        if (obj) {
          const callback = obj.callback;
          const call = window[callback];
          if (call) {
            modifyResponse && modifyResponse(this.src).then((d) => {
              window[callback](d);
              this.dispatchEvent(new ProgressEvent("load"));
            }).catch((e) => {
              this.dispatchEvent(new ProgressEvent("error"));
              debug.error("modifyResponse of xhrhookasync", one, e);
            });
          }
          this.removeAttribute("src");
        }
      }
    } catch (e) {
      debug.error("jsonphook", one, e);
    }
  };
  return id = jsonp.push([one, two]);
}

// src/runtime/lib/typeof.ts
var isArray = Array.isArray;
var isObject = (val) => val !== null && typeof val === "object";

// src/runtime/hook/webpack_jsonp.ts
var hook;
var arr = [];
var param = [];
Object.defineProperty(window, "webpackJsonp", {
  set: (v) => hook = v,
  get: () => {
    if (hook) {
      if (isArray(hook))
        return hook;
      return (chunkIds, moreModules, executeModules) => {
        if (arr[moreModules.length]) {
          const obj = arr[moreModules.length];
          const pam = param[moreModules.length];
          Object.entries(obj).forEach((d) => {
            let code = moreModules[d[0]];
            if (code) {
              code = code.toString();
              d[1].forEach((e) => code = e(code));
              moreModules[d[0]] = new Function(pam[0], pam[1], pam[2], \`(\${code})(\${pam[0]},\${pam[1]},\${pam[2]})\`);
            }
          });
        }
        return hook(chunkIds, moreModules, executeModules);
      };
    }
  },
  configurable: true
});
function webpackhook(len, pos, rpc, params = ["t", "e", "i"]) {
  if (!arr[len]) {
    arr[len] = {};
    param[len] = params;
  }
  arr[len][pos] = arr[len][pos] || [];
  arr[len][pos].push((code) => rpc(code));
}

// src/runtime/lib/crc32.ts
var Midcrc = class {
  CRCPOLYNOMIAL = 3988292384;
  crctable = new Array(256);
  index = new Array(4);
  constructor() {
    this.create_table();
  }
  run(input) {
    let ht = parseInt("0x" + input) ^ 4294967295, snum, i, lastindex, deepCheckData;
    for (i = 3; i >= 0; i--) {
      this.index[3 - i] = this.getcrcindex(ht >>> i * 8);
      snum = this.crctable[this.index[3 - i]];
      ht ^= snum >>> (3 - i) * 8;
    }
    for (i = 0; i < 1e7; i++) {
      lastindex = this.crc32lastindex(i);
      if (lastindex == this.index[3]) {
        deepCheckData = this.deepCheck(i, this.index);
        if (deepCheckData[0])
          break;
      }
    }
    if (i == 1e7)
      return -1;
    return Number(i + "" + deepCheckData[1]);
  }
  create_table() {
    let crcreg, i, j;
    for (i = 0; i < 256; ++i) {
      crcreg = i;
      for (j = 0; j < 8; ++j) {
        if ((crcreg & 1) !== 0) {
          crcreg = this.CRCPOLYNOMIAL ^ crcreg >>> 1;
        } else {
          crcreg >>>= 1;
        }
      }
      this.crctable[i] = crcreg;
    }
  }
  crc32(input) {
    if (typeof input != "string")
      input = input.toString();
    let crcstart = 4294967295, len = input.length, index;
    for (let i = 0; i < len; ++i) {
      index = (crcstart ^ input.charCodeAt(i)) & 255;
      crcstart = crcstart >>> 8 ^ this.crctable[index];
    }
    return crcstart;
  }
  crc32lastindex(input) {
    if (typeof input != "string")
      input = input.toString();
    let crcstart = 4294967295, len = input.length, index;
    for (let i = 0; i < len; ++i) {
      index = (crcstart ^ input.charCodeAt(i)) & 255;
      crcstart = crcstart >>> 8 ^ this.crctable[index];
    }
    return index;
  }
  getcrcindex(t) {
    for (let i = 0; i < 256; i++)
      if (this.crctable[i] >>> 24 == t)
        return i;
    return -1;
  }
  deepCheck(i, index) {
    let tc = 0, str = "", hash = this.crc32(i);
    tc = hash & 255 ^ index[2];
    if (!(tc <= 57 && tc >= 48))
      return [0];
    str += tc - 48;
    hash = this.crctable[index[2]] ^ hash >>> 8;
    tc = hash & 255 ^ index[1];
    if (!(tc <= 57 && tc >= 48))
      return [0];
    str += tc - 48;
    hash = this.crctable[index[1]] ^ hash >>> 8;
    tc = hash & 255 ^ index[0];
    if (!(tc <= 57 && tc >= 48))
      return [0];
    str += tc - 48;
    hash = this.crctable[index[0]] ^ hash >>> 8;
    return [1, str];
  }
};
var crc = new Midcrc();
function midcrc(input) {
  return crc.run(input);
}
function crc32(input) {
  return ((crc.crc32(input) + 1) * -1 >>> 0).toString(16);
}

// src/runtime/do_while.ts
function doWhile(check2, callback, delay = 100, stop = 180) {
  let timer2 = setInterval(() => {
    const d = check2();
    if (d) {
      clearInterval(timer2);
      callback(d);
    }
  }, delay);
  stop && setTimeout(() => clearInterval(timer2), stop * 1e3);
}

// src/runtime/element/add_element.ts
function addElement(tag, attribute, parrent, innerHTML, top, replaced) {
  let element = document.createElement(tag);
  attribute && Object.entries(attribute).forEach((d) => element.setAttribute(d[0], d[1]));
  parrent = parrent || document.body;
  innerHTML && (element.innerHTML = innerHTML);
  replaced ? replaced.replaceWith(element) : top ? parrent.insertBefore(element, parrent.firstChild) : parrent.appendChild(element);
  return element;
}
async function addCss(txt, id, parrent) {
  if (!parrent && !document.head) {
    await new Promise((r) => doWhile(() => document.body, r));
  }
  parrent = parrent || document.head;
  const style = document.createElement("style");
  style.setAttribute("type", "text/css");
  id && !parrent.querySelector(\`#\${id}\`) && style.setAttribute("id", id);
  style.appendChild(document.createTextNode(txt));
  parrent.appendChild(style);
}
function loadScript(src, onload) {
  return new Promise((r, j) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    script.addEventListener("load", () => {
      script.remove();
      onload && onload();
      r(true);
    });
    script.addEventListener("error", () => {
      script.remove();
      j();
    });
    (document.body || document.head || document.documentElement || document).appendChild(script);
  });
}

// src/images/svg/fork.svg
var fork_default = '<svg viewBox="0 0 100 100"><path d="M2 2 L98 98 M 98 2 L2 98Z" stroke-width="10px" stroke="#212121" stroke-linecap="round"></path></svg>';

// src/runtime/lib/proxy_handler.ts
function get(t, p, r) {
  try {
    return Reflect.get(t, p, r);
  } catch (e) {
    return t[p];
  }
}
var ProxyHandler = class {
  constructor(callback) {
    return {
      deleteProperty: (target, key) => {
        Promise.resolve().then(() => callback());
        return Reflect.deleteProperty(target, key);
      },
      get: (target, key, receiver) => {
        const res = get(target, key, receiver);
        const targetIsArray = isArray(res);
        if (isObject(res) || targetIsArray) {
          return new Proxy(res, new ProxyHandler(callback));
        }
        return res;
      },
      set: (target, key, value, receiver) => {
        value !== get(target, key, receiver) && Promise.resolve().then(() => callback());
        return Reflect.set(target, key, value, receiver);
      }
    };
  }
};

// src/runtime/toast/toast.html
var toast_default = '<div id="toast-container"></div>\\r\\n<style type="text/css">\\r\\n    .toast-close-button>svg {\\r\\n        width: 12px;\\r\\n        height: 12px;\\r\\n    }\\r\\n\\r\\n    .toast {\\r\\n        transition: height 1s ease 0s, padding 1s ease 0s;\\r\\n    }\\r\\n\\r\\n    #toast-container {\\r\\n        font: 12px Helvetica Neue, Helvetica, Arial, Microsoft Yahei, Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, sans-serif;\\r\\n    }\\r\\n</style>\\r\\n<style type="text/css">\\r\\n    /*\\r\\n     * Note that this is toastr v2.1.3, the "latest" version in url has no more maintenance,\\r\\n     * please go to https://cdnjs.com/libraries/toastr.js and pick a certain version you want to use,\\r\\n     * make sure you copy the url from the website since the url may change between versions.\\r\\n     */\\r\\n    .toast-title {\\r\\n        font-weight: bold;\\r\\n    }\\r\\n\\r\\n    .toast-message {\\r\\n        -ms-word-wrap: break-word;\\r\\n        word-wrap: break-word;\\r\\n    }\\r\\n\\r\\n    .toast-message a,\\r\\n    .toast-message label {\\r\\n        color: #FFFFFF;\\r\\n    }\\r\\n\\r\\n    .toast-message a:hover {\\r\\n        color: #CCCCCC;\\r\\n        text-decoration: none;\\r\\n    }\\r\\n\\r\\n    .toast-close-button {\\r\\n        position: relative;\\r\\n        right: -0.3em;\\r\\n        top: -0.3em;\\r\\n        float: right;\\r\\n        font-size: 20px;\\r\\n        font-weight: bold;\\r\\n        color: #FFFFFF;\\r\\n        -webkit-text-shadow: 0 1px 0 #ffffff;\\r\\n        text-shadow: 0 1px 0 #ffffff;\\r\\n        opacity: 0.8;\\r\\n        -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);\\r\\n        filter: alpha(opacity=80);\\r\\n        line-height: 1;\\r\\n    }\\r\\n\\r\\n    .toast-close-button:hover,\\r\\n    .toast-close-button:focus {\\r\\n        color: #000000;\\r\\n        text-decoration: none;\\r\\n        cursor: pointer;\\r\\n        opacity: 0.4;\\r\\n        -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);\\r\\n        filter: alpha(opacity=40);\\r\\n    }\\r\\n\\r\\n    .rtl .toast-close-button {\\r\\n        left: -0.3em;\\r\\n        float: left;\\r\\n        right: 0.3em;\\r\\n    }\\r\\n\\r\\n    /*Additional properties for button version\\r\\n     iOS requires the button element instead of an anchor tag.\\r\\n     If you want the anchor version, it requires \`href="#"\`.*/\\r\\n    button.toast-close-button {\\r\\n        padding: 0;\\r\\n        cursor: pointer;\\r\\n        background: transparent;\\r\\n        border: 0;\\r\\n        -webkit-appearance: none;\\r\\n    }\\r\\n\\r\\n    .toast-top-center {\\r\\n        top: 0;\\r\\n        right: 0;\\r\\n        width: 100%;\\r\\n    }\\r\\n\\r\\n    .toast-bottom-center {\\r\\n        bottom: 0;\\r\\n        right: 0;\\r\\n        width: 100%;\\r\\n    }\\r\\n\\r\\n    .toast-top-full-width {\\r\\n        top: 0;\\r\\n        right: 0;\\r\\n        width: 100%;\\r\\n    }\\r\\n\\r\\n    .toast-bottom-full-width {\\r\\n        bottom: 0;\\r\\n        right: 0;\\r\\n        width: 100%;\\r\\n    }\\r\\n\\r\\n    .toast-top-left {\\r\\n        top: 12px;\\r\\n        left: 12px;\\r\\n    }\\r\\n\\r\\n    .toast-top-right {\\r\\n        top: 12px;\\r\\n        right: 12px;\\r\\n    }\\r\\n\\r\\n    .toast-bottom-right {\\r\\n        right: 12px;\\r\\n        bottom: 12px;\\r\\n    }\\r\\n\\r\\n    .toast-bottom-left {\\r\\n        bottom: 12px;\\r\\n        left: 12px;\\r\\n    }\\r\\n\\r\\n    #toast-container {\\r\\n        position: fixed;\\r\\n        z-index: 999999;\\r\\n        pointer-events: none;\\r\\n        /*overrides*/\\r\\n    }\\r\\n\\r\\n    #toast-container * {\\r\\n        -moz-box-sizing: border-box;\\r\\n        -webkit-box-sizing: border-box;\\r\\n        box-sizing: border-box;\\r\\n    }\\r\\n\\r\\n    #toast-container>div {\\r\\n        position: relative;\\r\\n        pointer-events: auto;\\r\\n        overflow: hidden;\\r\\n        margin: 0 0 6px;\\r\\n        padding: 15px 15px 15px 50px;\\r\\n        width: 300px;\\r\\n        -moz-border-radius: 3px 3px 3px 3px;\\r\\n        -webkit-border-radius: 3px 3px 3px 3px;\\r\\n        border-radius: 3px 3px 3px 3px;\\r\\n        background-position: 15px center;\\r\\n        background-repeat: no-repeat;\\r\\n        -moz-box-shadow: 0 0 12px #999999;\\r\\n        -webkit-box-shadow: 0 0 12px #999999;\\r\\n        box-shadow: 0 0 12px #999999;\\r\\n        color: #FFFFFF;\\r\\n        opacity: 0.8;\\r\\n        -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);\\r\\n        filter: alpha(opacity=80);\\r\\n    }\\r\\n\\r\\n    #toast-container>div.rtl {\\r\\n        direction: rtl;\\r\\n        padding: 15px 50px 15px 15px;\\r\\n        background-position: right 15px center;\\r\\n    }\\r\\n\\r\\n    #toast-container>div:hover {\\r\\n        -moz-box-shadow: 0 0 12px #000000;\\r\\n        -webkit-box-shadow: 0 0 12px #000000;\\r\\n        box-shadow: 0 0 12px #000000;\\r\\n        opacity: 1;\\r\\n        -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\\r\\n        filter: alpha(opacity=100);\\r\\n        cursor: pointer;\\r\\n    }\\r\\n\\r\\n    #toast-container>.toast-info {\\r\\n        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVEhLtZa9SgNBEMc9sUxxRcoUKSzSWIhXpFMhhYWFhaBg4yPYiWCXZxBLERsLRS3EQkEfwCKdjWJAwSKCgoKCcudv4O5YLrt7EzgXhiU3/4+b2ckmwVjJSpKkQ6wAi4gwhT+z3wRBcEz0yjSseUTrcRyfsHsXmD0AmbHOC9Ii8VImnuXBPglHpQ5wwSVM7sNnTG7Za4JwDdCjxyAiH3nyA2mtaTJufiDZ5dCaqlItILh1NHatfN5skvjx9Z38m69CgzuXmZgVrPIGE763Jx9qKsRozWYw6xOHdER+nn2KkO+Bb+UV5CBN6WC6QtBgbRVozrahAbmm6HtUsgtPC19tFdxXZYBOfkbmFJ1VaHA1VAHjd0pp70oTZzvR+EVrx2Ygfdsq6eu55BHYR8hlcki+n+kERUFG8BrA0BwjeAv2M8WLQBtcy+SD6fNsmnB3AlBLrgTtVW1c2QN4bVWLATaIS60J2Du5y1TiJgjSBvFVZgTmwCU+dAZFoPxGEEs8nyHC9Bwe2GvEJv2WXZb0vjdyFT4Cxk3e/kIqlOGoVLwwPevpYHT+00T+hWwXDf4AJAOUqWcDhbwAAAAASUVORK5CYII=") !important;\\r\\n    }\\r\\n\\r\\n    #toast-container>.toast-error {\\r\\n        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII=") !important;\\r\\n    }\\r\\n\\r\\n    #toast-container>.toast-success {\\r\\n        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg==") !important;\\r\\n    }\\r\\n\\r\\n    #toast-container>.toast-warning {\\r\\n        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII=") !important;\\r\\n    }\\r\\n\\r\\n    #toast-container.toast-top-center>div,\\r\\n    #toast-container.toast-bottom-center>div {\\r\\n        width: 300px;\\r\\n        margin-left: auto;\\r\\n        margin-right: auto;\\r\\n    }\\r\\n\\r\\n    #toast-container.toast-top-full-width>div,\\r\\n    #toast-container.toast-bottom-full-width>div {\\r\\n        width: 96%;\\r\\n        margin-left: auto;\\r\\n        margin-right: auto;\\r\\n    }\\r\\n\\r\\n    .toast {\\r\\n        background-color: #030303;\\r\\n    }\\r\\n\\r\\n    .toast-success {\\r\\n        background-color: #51A351;\\r\\n    }\\r\\n\\r\\n    .toast-error {\\r\\n        background-color: #BD362F;\\r\\n    }\\r\\n\\r\\n    .toast-info {\\r\\n        background-color: #2F96B4;\\r\\n    }\\r\\n\\r\\n    .toast-warning {\\r\\n        background-color: #F89406;\\r\\n    }\\r\\n\\r\\n    .toast-progress {\\r\\n        position: absolute;\\r\\n        left: 0;\\r\\n        bottom: 0;\\r\\n        height: 4px;\\r\\n        background-color: #000000;\\r\\n        opacity: 0.4;\\r\\n        -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);\\r\\n        filter: alpha(opacity=40);\\r\\n    }\\r\\n\\r\\n    /*Responsive Design*/\\r\\n    @media all and (max-width: 240px) {\\r\\n        #toast-container>div {\\r\\n            padding: 8px 8px 8px 50px;\\r\\n            width: 11em;\\r\\n        }\\r\\n\\r\\n        #toast-container>div.rtl {\\r\\n            padding: 8px 50px 8px 8px;\\r\\n        }\\r\\n\\r\\n        #toast-container .toast-close-button {\\r\\n            right: -0.2em;\\r\\n            top: -0.2em;\\r\\n        }\\r\\n\\r\\n        #toast-container .rtl .toast-close-button {\\r\\n            left: -0.2em;\\r\\n            right: 0.2em;\\r\\n        }\\r\\n    }\\r\\n\\r\\n    @media all and (min-width: 241px) and (max-width: 480px) {\\r\\n        #toast-container>div {\\r\\n            padding: 8px 8px 8px 50px;\\r\\n            width: 18em;\\r\\n        }\\r\\n\\r\\n        #toast-container>div.rtl {\\r\\n            padding: 8px 50px 8px 8px;\\r\\n        }\\r\\n\\r\\n        #toast-container .toast-close-button {\\r\\n            right: -0.2em;\\r\\n            top: -0.2em;\\r\\n        }\\r\\n\\r\\n        #toast-container .rtl .toast-close-button {\\r\\n            left: -0.2em;\\r\\n            right: 0.2em;\\r\\n        }\\r\\n    }\\r\\n\\r\\n    @media all and (min-width: 481px) and (max-width: 768px) {\\r\\n        #toast-container>div {\\r\\n            padding: 15px 15px 15px 50px;\\r\\n            width: 25em;\\r\\n        }\\r\\n\\r\\n        #toast-container>div.rtl {\\r\\n            padding: 15px 50px 15px 15px;\\r\\n        }\\r\\n    }\\r\\n</style>';

// src/runtime/variable/mutex.ts
var mutex = Math.random().toString(36).substring(2);

// src/runtime/gm.ts
var xhrGM = [];
var getValue = [];
var cookiesEs = [];
window.addEventListener("message", (ev) => {
  if (GM_getValue)
    return GM_getValue("config");
  if (typeof ev.data === "object" && ev.data.flag === mutex) {
    switch (ev.data.\$type) {
      case "xhrGMResponse":
        if (xhrGM[ev.data.index]) {
          Reflect.has(ev.data, "resolve") && xhrGM[ev.data.index][0](ev.data.resolve);
          Reflect.has(ev.data, "reject") && xhrGM[ev.data.index][1](ev.data.reject);
          delete xhrGM[ev.data.index];
        }
        break;
      case "getValueResponse":
        if (getValue[ev.data.index]) {
          Reflect.has(ev.data, "resolve") && getValue[ev.data.index][0](ev.data.resolve);
          Reflect.has(ev.data, "reject") && getValue[ev.data.index][1](ev.data.reject);
          delete getValue[ev.data.index];
        }
        break;
      case "cookiesResponse":
        if (cookiesEs[ev.data.index]) {
          Reflect.has(ev.data, "resolve") && cookiesEs[ev.data.index][0](ev.data.resolve);
          Reflect.has(ev.data, "reject") && cookiesEs[ev.data.index][1](ev.data.reject);
          delete cookiesEs[ev.data.index];
        }
        break;
    }
  }
});
var GM = {
  xhr(details) {
    return new Promise((resolve, reject) => {
      details.method = details.method || "GET";
      details.onload = details.onload || ((xhr2) => {
        resolve(xhr2.response);
      });
      details.onerror = details.onerror || ((xhr2) => {
        reject(xhr2.response);
      });
      GM_xmlhttpRequest(details);
    });
  },
  xmlHttpRequest(input, init2) {
    if (GM_xmlhttpRequest) {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest;
      });
    }
    return new Promise((resolve, reject) => {
      window.postMessage({
        \$type: "xhrGM",
        data: {
          index: xhrGM.push([resolve, reject]) - 1,
          input,
          init: init2,
          flag: mutex
        }
      });
    });
  },
  getValue(key, def) {
    return new Promise((resolve, reject) => {
      window.postMessage({
        \$type: "getValue",
        data: {
          index: getValue.push([resolve, reject]) - 1,
          key,
          def,
          flag: mutex
        }
      });
    });
  },
  setValue(key, value) {
    if (GM_setValue) {
      GM_setValue(key, value);
    } else {
      const obj = {};
      obj[key] = value;
      window.postMessage({
        \$type: "setValue",
        data: obj
      });
    }
  },
  deleteValue(...key) {
    if (GM_deleteValue) {
      key.forEach((d) => GM_deleteValue(d));
    } else {
      window.postMessage({
        \$type: "setValue",
        data: key
      });
    }
  },
  cookie() {
    return new Promise((resolve, reject) => {
      const host = location.host;
      const arr2 = host.split(".");
      arr2.length > 2 && arr2.shift();
      window.postMessage({
        \$type: "getCookies",
        data: {
          url: arr2.join("."),
          index: cookiesEs.push([resolve, reject]) - 1,
          flag: mutex
        }
      });
    });
  }
};

// src/runtime/chrome/setting.json
var setting_default = {
  logReport: false,
  toast: {
    status: true,
    rtl: false,
    position: "top-right",
    delay: 4,
    type: "warning"
  },
  av: true,
  videoLimit: {
    switch: false,
    server: "内置",
    cn: "",
    hk: "",
    tw: "",
    th: ""
  },
  protobufDanmaku: true,
  section: true,
  danmakuHashId: false,
  flash: false,
  enlike: false,
  upList: false,
  commandDm: false,
  bangumi: true,
  watchlater: true,
  player: true,
  index: true,
  ranking: true,
  read: true,
  playlist: true,
  automate: {
    danmakuFirst: false,
    showBofqi: false,
    screenWide: false,
    noDanmaku: false,
    autoPlay: false,
    webFullScreen: false,
    videospeed: false,
    electric: false
  },
  heartbeat: false,
  bangumiEplist: false,
  history: false,
  searchHistory: false,
  liveP2p: true,
  sleepCheck: true,
  errands: true,
  album: false,
  jointime: false,
  restore: false,
  codecType: "AVC",
  collection: true,
  search: true,
  liveRecord: false,
  closedCaption: true,
  segProgress: false,
  videoDisableAA: false,
  commentLinkDetail: false,
  downlaodType: [
    "mp4"
  ],
  TVresource: false,
  downloadQn: 127,
  downloadOther: false,
  danmakuSaveType: "xml",
  downloadMethod: "默认",
  userAgent: "Bilibili Freedoooooom/MarkII",
  referer: "https://www.bilibili.com",
  filepath: "",
  aria2: {
    token: "",
    server: "http://localhost",
    port: 6800
  },
  animatedBanner: false,
  accessKey: {
    key: "",
    date: ""
  },
  timeline: false,
  privateRecommend: false,
  episodeData: false,
  comment: false,
  lostVideo: false,
  uposReplace: {
    nor: "不替换",
    gat: "不替换",
    th: "ks3（金山）",
    dl: "不替换"
  },
  danmakuContact: false,
  allDanmaku: 3,
  IDM: {
    wait: false,
    silence: false
  },
  development: false
};

// src/runtime/storage.ts
var LocalStorage = class {
  clear() {
    self.localStorage.clear();
  }
  getItem(key) {
    let str = self.localStorage.getItem(key);
    try {
      str = JSON.parse(str);
    } catch (e) {
    }
    return str;
  }
  keys() {
    return Object.keys(self.localStorage);
  }
  removeItem(key) {
    self.localStorage.removeItem(key);
  }
  setItem(key, value) {
    switch (typeof value) {
      case "object":
        self.localStorage.setItem(key, JSON.stringify(value));
        break;
      case "function":
        console.warn("函数类型并不适合这样存储！", key, value);
        break;
      default:
        self.localStorage.setItem(key, String(value));
    }
  }
  get length() {
    return self.localStorage.length;
  }
};
var SessionStorage = class {
  clear() {
    self.sessionStorage.clear();
  }
  getItem(key) {
    let str = self.sessionStorage.getItem(key);
    try {
      str = JSON.parse(str);
    } catch (e) {
    }
    return str;
  }
  keys() {
    return Object.keys(self.sessionStorage);
  }
  removeItem(key) {
    self.sessionStorage.removeItem(key);
  }
  setItem(key, value) {
    switch (typeof value) {
      case "object":
        self.sessionStorage.setItem(key, JSON.stringify(value));
        break;
      case "function":
        console.warn("函数类型并不适合这样存储！", key, value);
        break;
      default:
        self.sessionStorage.setItem(key, String(value));
    }
  }
  get length() {
    return self.sessionStorage.length;
  }
};
var localStorage = new LocalStorage();
var sessionStorage2 = new SessionStorage();

// src/runtime/setting.ts
var setting = setting_default;
function getSetting() {
  if (GM_getValue) {
    let save2 = function() {
      GM_setValue("config", newSetting);
    };
    var save = save2;
    const newSetting = GM_getValue("config", setting_default);
    setting = new Proxy(newSetting, new ProxyHandler(save2));
  } else {
    let save2 = function() {
      GM.setValue("setting", newSetting);
      sessionStorage2.setItem("setting", newSetting);
    };
    var save = save2;
    const newSetting = sessionStorage2.getItem("setting");
    newSetting ? setting = new Proxy(newSetting, new ProxyHandler(save2)) : setTimeout(getSetting);
  }
}
chrome?.storage ? chrome.storage.local.get().then((d) => setting = d.setting) : getSetting();

// src/runtime/toast/toast.ts
var ToastContainer = class extends HTMLElement {
  positionList = ["top-right", "top-left", "bottom-right", "bottom-left"];
  typeList = ["success", "error", "info", "warning", ""];
  container;
  status = true;
  rtl = false;
  position = "top-right";
  delay = 4;
  constructor() {
    super();
    const root3 = this.attachShadow({ mode: "closed" });
    root3.appendChild(createElements(htmlVnode(toast_default)));
    this.container = root3.children[0];
    Object.defineProperties(this, {
      status: {
        get: () => setting.toast.status,
        set: (v) => {
          if (v === setting.toast.status)
            return;
          setting.toast.status = v;
        }
      },
      rtl: {
        get: () => setting.toast.rtl,
        set: (v) => {
          if (v === setting.toast.rtl)
            return;
          setting.toast.rtl = v;
          v ? this.container.childNodes.forEach((d) => {
            d.classList.add("rtl");
          }) : this.container.childNodes.forEach((d) => {
            d.classList.remove("rtl");
          });
        }
      },
      position: {
        get: () => setting.toast.position,
        set: (v) => {
          if (v === setting.toast.position)
            return;
          if (!this.positionList.includes(v))
            return;
          setting.toast.position = v;
          this.container.className = \`toast-\${v}\`;
        }
      },
      delay: {
        get: () => setting.toast.delay,
        set: (v) => {
          if (v === setting.toast.delay)
            return;
          setting.toast.delay = v;
        }
      }
    });
  }
  toast(delay, type, ...data) {
    if (!this.status)
      return;
    document.body.contains(this) || document.body.appendChild(this);
    this.container.className = \`toast-\${this.position}\`;
    let html = \`<div class="toast\${type ? " toast-" + type : ""}\${this.rtl ? " rtl" : ""}" aria-live="assertive" style="padding-top: 0px;padding-bottom: 0px;height: 0px;"><div class="toast-message">\`;
    !delay && (html += \`<div class="toast-close-button">\${fork_default}</div>\`);
    data.forEach((d, i) => {
      if (isObject(d)) {
        try {
          d = JSON.stringify(d, void 0, "<br>");
        } catch (e) {
        }
      }
      html += i ? \`<br>\${d}\` : \`<label>\${d}</label>\`;
    });
    html += "</div></div>";
    const node2 = createElements(htmlVnode(html));
    const toast2 = node2.children[0];
    this.container.insertBefore(node2, this.container.firstChild);
    toast2.setAttribute("style", \`height: \${toast2.scrollHeight + 30}px;\`);
    let hovering = false;
    toast2.addEventListener("mouseover", () => hovering = true);
    toast2.addEventListener("mouseout", () => hovering = false);
    Object.defineProperties(toast2, {
      "type": {
        get: () => type,
        set: (v) => {
          if (v === type)
            return;
          if (!this.typeList.includes(v))
            return;
          type && toast2.classList.remove(\`toast-\${type}\`);
          v && toast2.classList.add(\`toast-\${v}\`);
          toast2.classList;
          type = v;
        }
      },
      "data": {
        get: () => new Proxy(data, new ProxyHandler(ToastContainer.organizeDate.bind(ToastContainer, toast2))),
        set: (v) => {
          if (v === data)
            return;
          data = v;
          ToastContainer.organizeDate(toast2);
        }
      },
      "delay": {
        get: () => delay,
        set: (v) => {
          if (v === delay)
            return;
          if (isNaN(v))
            return;
          if (delay === 0)
            delay = v, ToastContainer.countDown(toast2);
          delay = v;
          if (v === 0) {
            hovering ? toast2.addEventListener("mouseout", () => ToastContainer.remove(toast2)) : ToastContainer.remove(toast2);
          }
        }
      }
    });
    !delay ? toast2.children[0].children[0].addEventListener("click", () => ToastContainer.remove(toast2)) : ToastContainer.countDown(toast2);
    return toast2;
  }
  static countDown(node2) {
    node2.delay && setTimeout(() => {
      node2.delay--;
      this.countDown(node2);
    }, 1e3);
  }
  static remove(node2) {
    node2.setAttribute("style", "padding-top: 0px;padding-bottom: 0px;height: 0px;");
    setTimeout(() => node2.remove(), 1e3);
  }
  static organizeDate(node2) {
    let html = !node2.delay ? \`<div class="toast-close-button">\${fork_default}</div>\` : "";
    node2.data.forEach((d, i) => {
      if (isObject(d)) {
        try {
          d = JSON.stringify(d, void 0, "<br>");
        } catch (e) {
        }
      }
      html += i ? \`<br>\${d}\` : \`<label>\${d}</label>\`;
    });
    node2.children[0].replaceChildren(createElements(htmlVnode(html)));
    node2.setAttribute("style", \`height: \${node2.firstChild.clientHeight + 30}px;\`);
    !node2.delay && node2.children[0].children[0].addEventListener("click", () => ToastContainer.remove(node2));
  }
};
customElements.get(\`toast-container\${mutex}\`) || customElements.define(\`toast-container\${mutex}\`, ToastContainer);
var node = customElements ? new ToastContainer() : { toast: () => {
} };
function Toast(type, ...data) {
  return node.toast(node.delay, type, ...data);
}
function toast(...data) {
  return Toast.bind(node, "")(...data);
}
toast.success = Toast.bind(node, "success");
toast.error = Toast.bind(node, "error");
toast.info = Toast.bind(node, "info");
toast.warning = Toast.bind(node, "warning");
toast.custom = node.toast.bind(node);

// src/runtime/unit.ts
function jsonCheck(data) {
  let result = typeof data === "string" ? JSON.parse(data) : data;
  if ("code" in result && result.code !== 0) {
    let msg = result.msg || result.message || "";
    throw [result.code, msg];
  }
  return result;
}
function getTotalTop(node2) {
  var sum = 0;
  do {
    sum += node2.offsetTop;
    node2 = node2.offsetParent;
  } while (node2);
  return sum;
}
function biliQuickLogin() {
  window.biliQuickLogin ? window.biliQuickLogin() : loadScript("//static.hdslb.com/account/bili_quick_login.js", () => biliQuickLogin());
}
function getUrlValue(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|\$)", "i");
  const r = window.location.search.substr(1).match(reg);
  if (r != null)
    return decodeURIComponent(r[2]);
  return null;
}
function statusCheck(status) {
  return status >= 200 && status < 300 || status === 304;
}

// src/runtime/xhr.ts
var Record = {
  default: {},
  arraybuffer: {},
  blob: {},
  document: {},
  json: {},
  text: {}
};
function xhr(details, cache = false) {
  details.method == "POST" && (details.headers = details.headers || {}, !details.headers["Content-Type"] && Reflect.set(details.headers, "Content-Type", "application/x-www-form-urlencoded"));
  if (details.async === false) {
    if (cache && Record[details.responseType || "default"][details.url])
      return Record[details.responseType || "default"][details.url];
    let xhr2 = new XMLHttpRequest();
    xhr2.open(details.method || "GET", details.url, false);
    details.responseType && (xhr2.responseType = details.responseType);
    details.credentials && (xhr2.withCredentials = true);
    details.headers && Object.entries(details.headers).forEach((d) => xhr2.setRequestHeader(d[0], d[1]));
    details.timeout && (xhr2.timeout = details.timeout);
    xhr2.send(details.data);
    Promise.resolve().then(() => Record[details.responseType || "default"][details.url] = xhr2.response);
    return xhr2.response;
  } else
    return new Promise((resolve, reject) => {
      if (cache && Record[details.responseType || "default"][details.url])
        return resolve(Record[details.responseType || "default"][details.url]);
      let xhr2 = new XMLHttpRequest();
      xhr2.open(details.method || "GET", details.url);
      details.responseType && (xhr2.responseType = details.responseType);
      details.headers && Object.entries(details.headers).forEach((d) => xhr2.setRequestHeader(d[0], d[1]));
      details.credentials && (xhr2.withCredentials = true);
      details.timeout && (xhr2.timeout = details.timeout);
      xhr2.onabort = details.onabort || reject;
      xhr2.onerror = details.onerror || reject;
      details.onloadstart && (xhr2.onloadstart = details.onloadstart);
      details.onprogress && (xhr2.onprogress = details.onprogress);
      details.onreadystatechange && (xhr2.onreadystatechange = details.onreadystatechange);
      xhr2.ontimeout = details.ontimeout || reject;
      xhr2.onload = details.onload || (() => resolve(xhr2.response));
      xhr2.addEventListener("load", () => {
        Promise.resolve().then(() => Record[details.responseType || "default"][details.url] = xhr2.response);
      });
      xhr2.send(details.data);
    });
}
function get2(url, details = {}, cache = false) {
  !Reflect.has(details, "credentials") && (details.credentials = true);
  return xhr({ url, ...details }, cache);
}
xhr.get = get2;
function post(url, data, contentType = "application/x-www-form-urlencoded", details = {}, cache = false) {
  !Reflect.has(details, "credentials") && (details.credentials = true);
  details.headers = { "Content-Type": contentType, ...details.headers };
  return xhr({ url, method: "POST", data, ...details }, cache);
}
xhr.port = post;

// src/runtime/danmaku/danmaku_hash_id.css
var _default = {};

// src/runtime/danmaku/danmaku_hash_id.ts
function danmakuHashId() {
  addCss(_default);
  class DanmakuHashId {
    static count = 0;
    static catch = {};
    count = 0;
    hash;
    mid;
    node;
    dm;
    constructor(crc2) {
      DanmakuHashId.count = DanmakuHashId.count ? DanmakuHashId.count + 1 : 1;
      this.count = DanmakuHashId.count;
      DanmakuHashId.catch = DanmakuHashId.catch || {};
      this.hash = crc2;
      this.mid = midcrc(this.hash);
      this.getInfo();
    }
    async getInfo() {
      try {
        this.node = document.querySelector(".bilibili-player-context-menu-container.active");
        if (!this.node)
          return setTimeout(() => {
            this.getInfo();
          }, 100);
        this.node = this.node.children[0];
        let j = 0;
        for (let i = this.node.children.length - 1; i >= 0; i--) {
          if (this.node.children[i].textContent.includes("mid")) {
            this.dm = this.node.children[i];
            j++;
            if (this.count === j)
              break;
          }
        }
        if (!this.dm)
          return setTimeout(() => {
            this.getInfo();
          }, 100);
        if (this.dm.tagName != "LI")
          return;
        DanmakuHashId.catch[this.mid] = DanmakuHashId.catch[this.mid] || jsonCheck(await xhr({ url: objUrl("https://api.bilibili.com/x/web-interface/card", { mid: this.mid }) }, true));
        this.dm.innerHTML = '<div style="min-height:0px;z-index:-5;background-color: unset;" class="bb-comment"><div style="padding-top: 0;" class="comment-list"><div class="list-item"><div class="reply-box"><div style="padding:0px" class="reply-item reply-wrap"><div style="margin-left: 15px;vertical-align: middle;" data-usercard-mid="' + this.mid + '" class="reply-face"><img src="' + DanmakuHashId.catch[this.mid].data.card.face + '@52w_52h.webp" alt=""></div><div class="reply-con"><div class="user" style="padding-bottom: 0;top: 3px;"><a style="display:initial;padding: 0px;" data-usercard-mid="' + this.mid + '" href="//space.bilibili.com/' + this.mid + '" target="_blank" class="' + (DanmakuHashId.catch[this.mid].data.card.vip.vipType > 1 ? "name vip-red-name" : "name") + '">' + DanmakuHashId.catch[this.mid].data.card.name + "</a> " + DanmakuHashId.catch[this.mid].data.card.sex + '<a style="display:initial;padding: 0px;" href="//www.bilibili.com/blackboard/help.html#%E4%BC%9A%E5%91%98%E7%AD%89%E7%BA%A7%E7%9B%B8%E5%85%B3" target="_blank"><i class="level l' + (DanmakuHashId.catch[this.mid].data.card.is_senior_member ? 7 : DanmakuHashId.catch[this.mid].data.card.level_info.current_level) + '"></i></a></div></div></div></div></div></div></div>';
        DanmakuHashId.count--;
      } catch (e) {
        DanmakuHashId.count--;
        toast.error("反差弹幕发送者信息失败 ಥ_ಥ");
        debug.error(e);
      }
    }
  }
  window.danmakuHashId = (crc2) => {
    try {
      const check2 = new DanmakuHashId(crc2);
      return \`hash: \${check2.hash} mid: \${check2.mid}\`;
    } catch (e) {
      debug.error(e);
    }
  };
}

// src/runtime/lib/file.ts
function readAs(file, type = "string", encoding = "utf-8") {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    switch (type) {
      case "ArrayBuffer":
        reader.readAsArrayBuffer(file);
        break;
      case "DataURL":
        reader.readAsDataURL(file);
        break;
      case "string":
        reader.readAsText(file, encoding);
        break;
    }
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
  });
}
async function saveAs(content, fileName, contentType = "text/plain") {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.addEventListener("load", () => URL.revokeObjectURL(a.href));
  a.click();
}
function fileRead(accept, multiple) {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    accept && (input.accept = accept);
    multiple && (input.multiple = multiple);
    input.style.opacity = "0";
    input.addEventListener("change", () => resolve(input.files));
    document.body.appendChild(input);
    input.click();
  });
}

// src/runtime/variable/fnval.ts
var Fnval = class {
  MP4 = 1;
  DASH_H265 = 16;
  HDR = 64;
  DASH_4K = 128;
  DOLBYAUDIO = 256;
  DOLBYVIDEO = 512;
  DASH_8K = 1024;
  DASH_AV1 = 2048;
};
var _ = new Fnval();
var fnval = Reflect.ownKeys(_).reduce((s, d) => {
  s += _[d];
  return s;
}, -1);

// src/runtime/lib/md5.ts
var ERROR = "input is invalid type";
var ARRAY_BUFFER = true;
var HEX_CHARS = "0123456789abcdef".split("");
var EXTRA = [128, 32768, 8388608, -2147483648];
var SHIFT = [0, 8, 16, 24];
var OUTPUT_TYPES = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"];
var BASE64_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
var buffer = new ArrayBuffer(68);
var blocks = new Uint32Array(buffer);
var buffer8 = new Uint8Array(buffer);
var createOutputMethod = function(outputType) {
  return function(message2) {
    return new Md5(true).update(message2)[outputType]();
  };
};
var createMethod = function() {
  let method = createOutputMethod("hex");
  method.create = function() {
    return new Md5();
  };
  method.update = function(message2) {
    return method.create().update(message2);
  };
  for (let i = 0; i < OUTPUT_TYPES.length; ++i) {
    let type = OUTPUT_TYPES[i];
    method[type] = createOutputMethod(type);
  }
  return method;
};
var Md5 = class {
  blocks;
  buffer8 = new Uint8Array();
  h0 = 0;
  h1 = 0;
  h2 = 0;
  h3 = 0;
  start = 0;
  bytes = 0;
  hBytes = 0;
  finalized = false;
  hashed = false;
  first = true;
  array;
  buffer;
  lastByteIndex = 0;
  constructor(sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
      this.buffer8 = buffer8;
    } else {
      if (ARRAY_BUFFER) {
        let buffer2 = new ArrayBuffer(68);
        this.buffer8 = new Uint8Array(buffer2);
        this.blocks = new Uint32Array(buffer2);
      } else {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    }
    this.toString = this.hex;
    this.array = this.digest;
    this.buffer = this.arrayBuffer;
  }
  update(message2) {
    if (this.finalized) {
      return;
    }
    message2 = typeof message2 === "number" ? message2 + "" : message2;
    let notString, type = typeof message2;
    if (type !== "string") {
      if (type === "object") {
        if (message2 === null) {
          throw ERROR;
        } else if (ARRAY_BUFFER && message2.constructor === ArrayBuffer) {
          message2 = new Uint8Array(message2);
        } else if (!Array.isArray(message2)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message2)) {
            throw ERROR;
          }
        }
      } else {
        throw ERROR;
      }
      notString = true;
    }
    let code, index = 0, i, length = message2.length, blocks2 = this.blocks;
    let buffer82 = this.buffer8;
    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks2[0] = blocks2[16];
        blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
      }
      if (notString) {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            buffer82[i++] = message2[index];
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            blocks2[i >> 2] |= message2[index] << SHIFT[i++ & 3];
          }
        }
      } else {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message2.charCodeAt(index);
            if (code < 128) {
              buffer82[i++] = code;
            } else if (code < 2048) {
              buffer82[i++] = 192 | code >> 6;
              buffer82[i++] = 128 | code & 63;
            } else if (code < 55296 || code >= 57344) {
              buffer82[i++] = 224 | code >> 12;
              buffer82[i++] = 128 | code >> 6 & 63;
              buffer82[i++] = 128 | code & 63;
            } else {
              code = 65536 + ((code & 1023) << 10 | message2.charCodeAt(++index) & 1023);
              buffer82[i++] = 240 | code >> 18;
              buffer82[i++] = 128 | code >> 12 & 63;
              buffer82[i++] = 128 | code >> 6 & 63;
              buffer82[i++] = 128 | code & 63;
            }
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message2.charCodeAt(index);
            if (code < 128) {
              blocks2[i >> 2] |= code << SHIFT[i++ & 3];
            } else if (code < 2048) {
              blocks2[i >> 2] |= (192 | code >> 6) << SHIFT[i++ & 3];
              blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
            } else if (code < 55296 || code >= 57344) {
              blocks2[i >> 2] |= (224 | code >> 12) << SHIFT[i++ & 3];
              blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
              blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
            } else {
              code = 65536 + ((code & 1023) << 10 | message2.charCodeAt(++index) & 1023);
              blocks2[i >> 2] |= (240 | code >> 18) << SHIFT[i++ & 3];
              blocks2[i >> 2] |= (128 | code >> 12 & 63) << SHIFT[i++ & 3];
              blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
              blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
            }
          }
        }
      }
      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  }
  finalize() {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    let blocks2 = this.blocks, i = this.lastByteIndex;
    blocks2[i >> 2] |= EXTRA[i & 3];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks2[0] = blocks2[16];
      blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
    }
    blocks2[14] = this.bytes << 3;
    blocks2[15] = this.hBytes << 3 | this.bytes >>> 29;
    this.hash();
  }
  hash() {
    let a, b, c, d, bc, da, blocks2 = this.blocks;
    if (this.first) {
      a = blocks2[0] - 680876937;
      a = (a << 7 | a >>> 25) - 271733879 << 0;
      d = (-1732584194 ^ a & 2004318071) + blocks2[1] - 117830708;
      d = (d << 12 | d >>> 20) + a << 0;
      c = (-271733879 ^ d & (a ^ -271733879)) + blocks2[2] - 1126478375;
      c = (c << 17 | c >>> 15) + d << 0;
      b = (a ^ c & (d ^ a)) + blocks2[3] - 1316259209;
      b = (b << 22 | b >>> 10) + c << 0;
    } else {
      a = this.h0;
      b = this.h1;
      c = this.h2;
      d = this.h3;
      a += (d ^ b & (c ^ d)) + blocks2[0] - 680876936;
      a = (a << 7 | a >>> 25) + b << 0;
      d += (c ^ a & (b ^ c)) + blocks2[1] - 389564586;
      d = (d << 12 | d >>> 20) + a << 0;
      c += (b ^ d & (a ^ b)) + blocks2[2] + 606105819;
      c = (c << 17 | c >>> 15) + d << 0;
      b += (a ^ c & (d ^ a)) + blocks2[3] - 1044525330;
      b = (b << 22 | b >>> 10) + c << 0;
    }
    a += (d ^ b & (c ^ d)) + blocks2[4] - 176418897;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks2[5] + 1200080426;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks2[6] - 1473231341;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks2[7] - 45705983;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ b & (c ^ d)) + blocks2[8] + 1770035416;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks2[9] - 1958414417;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks2[10] - 42063;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks2[11] - 1990404162;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ b & (c ^ d)) + blocks2[12] + 1804603682;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks2[13] - 40341101;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks2[14] - 1502002290;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks2[15] + 1236535329;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks2[1] - 165796510;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks2[6] - 1069501632;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks2[11] + 643717713;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks2[0] - 373897302;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks2[5] - 701558691;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks2[10] + 38016083;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks2[15] - 660478335;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks2[4] - 405537848;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks2[9] + 568446438;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks2[14] - 1019803690;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks2[3] - 187363961;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks2[8] + 1163531501;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks2[13] - 1444681467;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks2[2] - 51403784;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks2[7] + 1735328473;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks2[12] - 1926607734;
    b = (b << 20 | b >>> 12) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks2[5] - 378558;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks2[8] - 2022574463;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks2[11] + 1839030562;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks2[14] - 35309556;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks2[1] - 1530992060;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks2[4] + 1272893353;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks2[7] - 155497632;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks2[10] - 1094730640;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks2[13] + 681279174;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks2[0] - 358537222;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks2[3] - 722521979;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks2[6] + 76029189;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks2[9] - 640364487;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks2[12] - 421815835;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks2[15] + 530742520;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks2[2] - 995338651;
    b = (b << 23 | b >>> 9) + c << 0;
    a += (c ^ (b | ~d)) + blocks2[0] - 198630844;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks2[7] + 1126891415;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks2[14] - 1416354905;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks2[5] - 57434055;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks2[12] + 1700485571;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks2[3] - 1894986606;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks2[10] - 1051523;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks2[1] - 2054922799;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks2[8] + 1873313359;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks2[15] - 30611744;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks2[6] - 1560198380;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks2[13] + 1309151649;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks2[4] - 145523070;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks2[11] - 1120210379;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks2[2] + 718787259;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks2[9] - 343485551;
    b = (b << 21 | b >>> 11) + c << 0;
    if (this.first) {
      this.h0 = a + 1732584193 << 0;
      this.h1 = b - 271733879 << 0;
      this.h2 = c - 1732584194 << 0;
      this.h3 = d + 271733878 << 0;
      this.first = false;
    } else {
      this.h0 = this.h0 + a << 0;
      this.h1 = this.h1 + b << 0;
      this.h2 = this.h2 + c << 0;
      this.h3 = this.h3 + d << 0;
    }
  }
  hex() {
    this.finalize();
    let h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
    return HEX_CHARS[h0 >> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h0 >> 12 & 15] + HEX_CHARS[h0 >> 8 & 15] + HEX_CHARS[h0 >> 20 & 15] + HEX_CHARS[h0 >> 16 & 15] + HEX_CHARS[h0 >> 28 & 15] + HEX_CHARS[h0 >> 24 & 15] + HEX_CHARS[h1 >> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h1 >> 12 & 15] + HEX_CHARS[h1 >> 8 & 15] + HEX_CHARS[h1 >> 20 & 15] + HEX_CHARS[h1 >> 16 & 15] + HEX_CHARS[h1 >> 28 & 15] + HEX_CHARS[h1 >> 24 & 15] + HEX_CHARS[h2 >> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h2 >> 12 & 15] + HEX_CHARS[h2 >> 8 & 15] + HEX_CHARS[h2 >> 20 & 15] + HEX_CHARS[h2 >> 16 & 15] + HEX_CHARS[h2 >> 28 & 15] + HEX_CHARS[h2 >> 24 & 15] + HEX_CHARS[h3 >> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h3 >> 12 & 15] + HEX_CHARS[h3 >> 8 & 15] + HEX_CHARS[h3 >> 20 & 15] + HEX_CHARS[h3 >> 16 & 15] + HEX_CHARS[h3 >> 28 & 15] + HEX_CHARS[h3 >> 24 & 15];
  }
  digest() {
    this.finalize();
    let h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
    return [
      h0 & 255,
      h0 >> 8 & 255,
      h0 >> 16 & 255,
      h0 >> 24 & 255,
      h1 & 255,
      h1 >> 8 & 255,
      h1 >> 16 & 255,
      h1 >> 24 & 255,
      h2 & 255,
      h2 >> 8 & 255,
      h2 >> 16 & 255,
      h2 >> 24 & 255,
      h3 & 255,
      h3 >> 8 & 255,
      h3 >> 16 & 255,
      h3 >> 24 & 255
    ];
  }
  arrayBuffer() {
    this.finalize();
    let buffer2 = new ArrayBuffer(16);
    let blocks2 = new Uint32Array(buffer2);
    blocks2[0] = this.h0;
    blocks2[1] = this.h1;
    blocks2[2] = this.h2;
    blocks2[3] = this.h3;
    return buffer2;
  }
  base64() {
    let i, v1, v2, v3, base64Str = "", bytes = this.array();
    for (i = 0; i < 15; ) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i++];
      base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] + BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] + BASE64_ENCODE_CHAR[v3 & 63];
    }
    v1 = bytes[i];
    base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[v1 << 4 & 63] + "==";
    return base64Str;
  }
};
var md5 = createMethod();

// src/runtime/lib/sign.ts
var Sign = class {
  static sign(url, obj = {}, id = 0) {
    this.keySecret = this.decode(id);
    const urlobj = new URLEs(url);
    const params = url ? urlobj.searchParams : new URLSearchParams();
    Object.entries(obj).forEach((d) => {
      if (d[1] || d[1] === "") {
        params.set(d[0], d[1]);
      }
    });
    params.delete("sign");
    params.set("appkey", this.keySecret[0]);
    params.sort();
    params.set("sign", md5(id === 3 && params.has("api") ? new URLSearchParams({ api: decodeURIComponent(params.get("api")) }).toString() : params.toString() + this.keySecret[1]));
    return urlobj ? urlobj.toString() : params.toString();
  }
  static decode(id) {
    if (typeof id === "number") {
      id = id < this.table.length ? id : 0;
      return this.table[id].split("").reverse().reduce((s, d) => {
        s = s + String.fromCharCode(d.charCodeAt(0) + 2);
        return s;
      }, "").split(":");
    } else {
      return [id, this.list()[id]];
    }
  }
  static encode(key, secret) {
    return (key + ":" + secret).split("").reverse().reduce((s, d) => {
      s = s + String.fromCharCode(d.charCodeAt(0) - 2);
      return s;
    }, "");
  }
  static list() {
    return this.table.reduce((s, d, i) => {
      let keySecret = this.decode(i);
      s[keySecret[0]] = keySecret[1];
      return s;
    }, {});
  }
};
__publicField(Sign, "table", [
  "rbMCKn@KuamXWlPMoJGsKcbiJKUfkPF_8dABscJntvqhRSETg",
  "/a_206b\`_.61.bca6117.175bcdadc41850c010c..././1\`\`",
  "157bdd\`6/bc73632.bcd660baa03a.43841211032b5c4\`6b/",
  "351a7a6b/.b\`d77da1cdccc25_13bc0a81a6d63.7ad13\`c50",
  "4_/54d\`3_4_73..2c42\`d4.a3__31b358d706d\`._7a.3_b5.",
  "12a.7c4b76c.a\`12bb4\`2b2b275c667c85b6d\`c_c\`0d5.051",
  "bb16d652\`04.7/121d3474b_2.c12\`7386\`0/bdd6ca0c7.22",
  "244_530/7/.ab\`7.//22a15572502b_08c21./_.\`3164\`c36",
  "16_d52_d/d22_2c0a.6573355/b\`./bd8a\`bc6114a30_4.\`d",
  "c02ba/d6.33d05cb/5d34.7d_23_\`_2785\`c60.a\`.4343726",
  "2aa2\`.1_\`_1.73\`.70.67d.bc671c16382a3d\`71a4.bcb3c7",
  "c4_a.7562_15\`_a416a/63/c2cbcb\`308d706d\`._7a.3_b5.",
  "40/171b046c/bcc0a603ac620\`372ba_8a/\`//41b30376.b5"
]);
__publicField(Sign, "keySecret");
var urlsign = (url, obj = {}, id = 0) => Sign.sign(url, obj, id);
urlsign.getKeyById = (id) => Sign.decode(id);
urlsign.encode = (key, secret) => Sign.encode(key, secret);
urlsign.list = () => Sign.list();

// src/runtime/lib/url.ts
var UrlPack = class {
  get ts() {
    return new Date().getTime();
  }
  access_key = setting.accessKey?.key || void 0;
  jsonUrlDefault = {
    "api.bilibili.com/pgc/player/web/playurl": { qn: 127, otype: "json", fourk: 1 },
    "api.bilibili.com/x/player/playurl": { qn: 127, otype: "json", fourk: 1 },
    "interface.bilibili.com/v2/playurl": { appkey: 9, otype: "json", quality: 127, type: "" },
    "bangumi.bilibili.com/player/web_api/v2/playurl": { appkey: 9, module: "bangumi", otype: "json", quality: 127, type: "" },
    "api.bilibili.com/pgc/player/api/playurlproj": { access_key: this.access_key, appkey: 1, build: "2040100", device: "android", expire: "0", mid: "0", mobi_app: "android_i", module: "bangumi", otype: "json", platform: "android_i", qn: 127, ts: this.ts },
    "app.bilibili.com/v2/playurlproj": { access_key: this.access_key, appkey: 1, build: "2040100", device: "android", expire: "0", mid: "0", mobi_app: "android_i", otype: "json", platform: "android_i", qn: 127, ts: this.ts },
    "api.bilibili.com/pgc/player/api/playurltv": { appkey: 6, qn: 127, fourk: 1, otype: "json", platform: "android", mobi_app: "android_tv_yst", build: 102801 },
    "api.bilibili.com/x/tv/ugc/playurl": { appkey: 6, qn: 127, fourk: 1, otype: "json", platform: "android", mobi_app: "android_tv_yst", build: 102801 },
    "app.bilibili.com/x/intl/playurl": { access_key: this.access_key, mobi_app: "android_i", fnver: 0, fnval, qn: 127, platform: "android", fourk: 1, build: 2100110, appkey: 0, otype: "json", ts: this.ts },
    "apiintl.biliapi.net/intl/gateway/ogv/player/api/playurl": { access_key: this.access_key, mobi_app: "android_i", fnver: 0, fnval, qn: 127, platform: "android", fourk: 1, build: 2100110, appkey: 0, otype: "json", ts: this.ts },
    "api.bilibili.com/view": { type: "json", appkey: "8e9fc618fbd41e28" },
    "api.bilibili.com/x/v2/reply/detail": { build: "6042000", channel: "master", mobi_app: "android", platform: "android", prev: "0", ps: "20" },
    "app.bilibili.com/x/v2/activity/index": { appkey: 1, build: 303e4, c_locale: "zh_CN", channel: "master", fnval, fnver: 0, force_host: 0, fourk: 1, https_url_req: 0, mobi_app: "android_i", offset: 0, platform: "android", player_net: 1, qn: 32, s_locale: "zh_CN", tab_id: 0, tab_module_id: 0, ts: this.ts },
    "app.bilibili.com/x/v2/activity/inline": { appkey: 1, build: 303e4, c_locale: "zh_CN", channel: "master", fnval, fnver: 0, force_host: 0, fourk: 1, https_url_req: 0, mobi_app: "android_i", platform: "android", player_net: 1, qn: 32, s_locale: "zh_CN", ts: this.ts },
    "bangumi.bilibili.com/api/season_v5": { appkey: 2, build: "2040100", platform: "android" }
  };
  getJson(url, detail, gm) {
    const str = objUrl(url, Object.assign(this.jsonUrlDefault[url], detail));
    return gm ? GM_xmlhttpRequest ? GM.xhr({ url: this.jsonUrlDefault[url].appkey > 0 ? urlsign(str, void 0, this.jsonUrlDefault[url].appkey) : str, responseType: "json" }) : GM.xmlHttpRequest(this.jsonUrlDefault[url].appkey > 0 ? urlsign(str, void 0, this.jsonUrlDefault[url].appkey) : str, { credentials: "include" }).then((d) => JSON.parse(d)) : xhr({
      url: this.jsonUrlDefault[url].appkey > 0 ? urlsign(str, void 0, this.jsonUrlDefault[url].appkey) : str,
      responseType: "json",
      credentials: true
    });
  }
};
var urlPack = new UrlPack();

// src/runtime/player/upos_replace.ts
var UPOS = {
  "ks3（金山）": "upos-sz-mirrorks3.bilivideo.com",
  "ks3b（金山）": "upos-sz-mirrorks3b.bilivideo.com",
  "ks3c（金山）": "upos-sz-mirrorks3c.bilivideo.com",
  "ks32（金山）": "upos-sz-mirrorks32.bilivideo.com",
  "kodo（七牛）": "upos-sz-mirrorkodo.bilivideo.com",
  "kodob（七牛）": "upos-sz-mirrorkodob.bilivideo.com",
  "cos（腾讯）": "upos-sz-mirrorcos.bilivideo.com",
  "cosb（腾讯）": "upos-sz-mirrorcosb.bilivideo.com",
  "coso1（腾讯）": "upos-sz-mirrorcoso1.bilivideo.com",
  "coso2（腾讯）": "upos-sz-mirrorcoso2.bilivideo.com",
  "bos（腾讯）": "upos-sz-mirrorbos.bilivideo.com",
  "hw（华为）": "upos-sz-mirrorhw.bilivideo.com",
  "hwb（华为）": "upos-sz-mirrorhwb.bilivideo.com",
  "uphw（华为）": "upos-sz-upcdnhw.bilivideo.com",
  "js（华为）": "upos-tf-all-js.bilivideo.com",
  "hk（香港）": "cn-hk-eq-bcache-01.bilivideo.com",
  "akamai（海外）": "upos-hz-mirrorakam.akamaized.net"
};
var dis = false;
var timer = 0;
function uposReplace(str, uposName) {
  if (uposName === "不替换")
    return str;
  !dis && toast.custom(10, "warning", "已替换UPOS服务器，卡加载时请到设置中更换服务器或者禁用！", \`CDN：\${uposName}\`, \`UPOS：\${UPOS[uposName]}\`);
  dis = true;
  clearTimeout(timer);
  timer = setTimeout(() => dis = false, 1e3);
  return str.replace(/:\\\\?\\/\\\\?\\/[^\\/]+\\\\?\\//g, () => \`://\${UPOS[uposName]}/\`);
}

// src/runtime/node_observer.ts
var nodelist = [];
function observerAddedNodes(callback) {
  try {
    if (typeof callback === "function")
      nodelist.push(callback);
    return nodelist.length - 1;
  } catch (e) {
    debug.error(e);
  }
}
var observe = new MutationObserver((d) => d.forEach((d2) => {
  d2.addedNodes[0] && nodelist.forEach(async (f) => {
    try {
      f(d2.addedNodes[0]);
    } catch (e) {
      debug.error(d2).error(e);
    }
  });
}));
observe.observe(document, { childList: true, subtree: true });

// src/runtime/switch_video.ts
var switchlist = [];
function switchVideo(callback) {
  try {
    if (typeof callback === "function")
      switchlist.push(callback);
  } catch (e) {
    debug.error("switchVideo.js", e);
  }
}
observerAddedNodes((node2) => {
  if (/bilibili-player-area video-state-pause/.test(node2.className)) {
    switchlist.forEach(async (d) => {
      try {
        d();
      } catch (e) {
        debug.error(d);
        debug.error(e);
      }
    });
  }
});

// src/runtime/lib/abv.ts
var Abv = class {
  base58Table = "fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF";
  digitMap = [11, 10, 3, 8, 4, 6];
  xor = 177451812;
  add = 8728348608;
  bvidTemplate = ["B", "V", 1, "", "", 4, "", 1, "", 7, "", ""];
  table = {};
  constructor() {
    for (let i = 0; i < 58; i++)
      this.table[this.base58Table[i]] = i;
  }
  check(input) {
    if (/^[aA][vV][0-9]+\$/.test(String(input)) || /^\\d+\$/.test(String(input)))
      return this.avToBv(Number(/[0-9]+/.exec(String(input))[0]));
    if (/^1[fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF]{9}\$/.test(String(input)))
      return this.bvToAv("BV" + input);
    if (/^[bB][vV]1[fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF]{9}\$/.test(String(input)))
      return this.bvToAv(String(input));
    throw input;
  }
  bvToAv(BV) {
    let r = 0;
    for (let i = 0; i < 6; i++)
      r += this.table[BV[this.digitMap[i]]] * 58 ** i;
    return r - this.add ^ this.xor;
  }
  avToBv(av) {
    let bv = Array.from(this.bvidTemplate);
    av = (av ^ this.xor) + this.add;
    for (let i = 0; i < 6; i++)
      bv[this.digitMap[i]] = this.base58Table[parseInt(String(av / 58 ** i)) % 58];
    return bv.join("");
  }
};
function abv(input) {
  return new Abv().check(input);
}

// src/runtime/url_param.ts
var catchs = { aid: {}, ssid: {}, epid: {} };
async function urlParam(url = location.href, redirect = true) {
  url && !url.includes("?") && (url = "?" + url);
  const obj = urlObj(url);
  let { aid, cid, ssid, epid, p } = obj;
  let pgc = false;
  !aid && (aid = obj.avid);
  !aid && url.replace(/[aA][vV]\\d+/, (d) => aid = d.substring(2));
  !aid && url.replace(/[bB][vV]1[fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF]{9}/, (d) => aid = abv(d));
  !aid && obj.bvid && (aid = abv(obj.bvid));
  aid && !Number(aid) && (aid = abv(aid));
  p = p || 1;
  !ssid && (ssid = obj.seasonId);
  !ssid && (ssid = obj.season_id);
  !ssid && url.replace(/[sS][sS]\\d+/, (d) => ssid = d.substring(2));
  !epid && (epid = obj.episodeId);
  !epid && (epid = obj.ep_id);
  !epid && url.replace(/[eE][pP]\\d+/, (d) => epid = d.substring(2));
  if (!ssid && !epid && aid) {
    if (catchs.aid[aid])
      return catchs.aid[aid][p - 1] || catchs.aid[aid][0];
    if (!cid) {
      try {
        let data = jsonCheck(await xhr({ url: objUrl("https://api.bilibili.com/x/web-interface/view", { "aid": aid }) }, true)).data;
        if (data.redirect_url)
          return urlParam(objUrl(data.redirect_url, { aid, cid, ssid, epid, p }));
        catchs.aid[aid] = data.pages;
        catchs.aid[aid].forEach((d) => d.aid = aid);
        return catchs.aid[aid][p - 1] || catchs.aid[aid][0];
      } catch (e) {
        debug.error("view", e);
        try {
          catchs.aid[aid] = jsonCheck(await xhr({ url: objUrl("https://api.bilibili.com/x/player/pagelist", { "aid": aid }) }, true)).data;
          catchs.aid[aid].forEach((d) => d.aid = aid);
          return catchs.aid[aid][p - 1] || catchs.aid[aid][0];
        } catch (e2) {
          debug.error("pagelist", e2);
          try {
            catchs.aid[aid] = jsonCheck(await xhr({ url: \`//api.bilibili.com/view?appkey=8e9fc618fbd41e28&id=\${aid}&type=json\` }, true)).list;
            catchs.aid[aid].forEach((d) => d.aid = aid);
            return catchs.aid[aid][p - 1] || catchs.aid[aid][0];
          } catch (e3) {
            debug.error("appkey", e3);
            try {
              let data = jsonCheck(await xhr({ url: objUrl("https://www.biliplus.com/api/view", { "id": aid }) }, true));
              catchs.aid[aid] = data.list || data.v2_app_api && data.v2_app_api.pages;
              catchs.aid[aid].forEach((d) => d.aid = aid);
              if (redirect && data.v2_app_api && data.v2_app_api.redirect_url)
                return urlParam(objUrl(data.v2_app_api.redirect_url, { aid, cid, ssid, epid, p }));
              return catchs.aid[aid][p - 1] || catchs.aid[aid][0];
            } catch (e4) {
              debug.error("biliplus", e4);
            }
          }
        }
      }
    }
  }
  if (ssid || epid) {
    if (ssid && catchs.ssid[ssid])
      return catchs.ssid[ssid][p - 1] || catchs.ssid[ssid][0];
    if (epid && catchs.epid[epid])
      return catchs.epid[epid];
    pgc = true;
    const param2 = { ep_id: epid, season_id: ssid };
    let data = jsonCheck(await xhr({ url: objUrl("https://bangumi.bilibili.com/view/web_api/season", param2) }, true)).result;
    ssid = data.season_id;
    catchs.ssid[ssid] = [];
    data.episodes.forEach((d) => {
      Object.assign(d, { ssid, pgc, epid: d.ep_id });
      catchs.aid[d.aid] = catchs.aid[d.aid] || [];
      catchs.aid[d.aid].push(d);
      catchs.ssid[ssid].push(catchs.epid[d.ep_id] = d);
    });
    if (epid)
      return catchs.epid[epid];
    return catchs.ssid[ssid][p - 1] || catchs.ssid[ssid][0];
  }
  return { aid, cid, ssid, epid, p, pgc };
}

// src/runtime/variable/variable.ts
var API = {
  get aid() {
    return window.aid;
  },
  set aid(v) {
    window.aid = v;
  },
  get cid() {
    return window.cid;
  },
  set cid(v) {
    window.cid = v;
  },
  get ssid() {
    return window.ssid;
  },
  set ssid(v) {
    window.ssid = v;
  },
  get epid() {
    return window.epid;
  },
  set epid(v) {
    window.epid = v;
  },
  get __INITIAL_STATE__() {
    return window.__INITIAL_STATE__;
  },
  set __INITIAL_STATE__(v) {
    window.__INITIAL_STATE__ = v;
  },
  __playinfo__: void 0,
  limit: void 0,
  bkg_cover: void 0,
  cover: void 0,
  title: void 0,
  th: void 0,
  pgc: void 0,
  playerParam: void 0,
  GM,
  urlParam,
  xhr,
  urlsign,
  objUrl,
  urlObj,
  URLEs
};
setting.development && Reflect.set(window, "API", API);

// src/runtime/element/popupbox.html
var popupbox_default = '<div class="box">\\r\\n    <div class="contain"></div>\\r\\n    <div class="fork"></div>\\r\\n</div>\\r\\n<style type="text/css">\\r\\n    .box {\\r\\n        top: 50%;\\r\\n        left: 50%;\\r\\n        transform: translateX(-50%) translateY(-50%);\\r\\n        transition: 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);\\r\\n        padding: 12px;\\r\\n        background-color: #fff;\\r\\n        color: black;\\r\\n        border-radius: 8px;\\r\\n        box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);\\r\\n        border: 1px solid rgba(136, 136, 136, 0.13333);\\r\\n        box-sizing: border-box;\\r\\n        position: fixed;\\r\\n        font-size: 13px;\\r\\n        z-index: 11115;\\r\\n        line-height: 14px;\\r\\n    }\\r\\n\\r\\n    .contain {\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        height: 100%;\\r\\n    }\\r\\n\\r\\n    .fork {\\r\\n        position: absolute;\\r\\n        transform: scale(0.8);\\r\\n        right: 10px;\\r\\n        top: 10px;\\r\\n        height: 20px;\\r\\n        width: 20px;\\r\\n        pointer-events: visible;\\r\\n    }\\r\\n\\r\\n    .fork:hover {\\r\\n        border-radius: 50%;\\r\\n        background-color: rgba(0, 0, 0, 10%);\\r\\n    }\\r\\n</style>';

// src/runtime/element/popupbox.ts
var ClickRemove = class {
  cancel;
  observe;
  constructor(node2) {
    node2.addEventListener("click", (e) => e.stopPropagation());
    function remove() {
      node2.remove();
      document.removeEventListener("click", remove);
    }
    this.cancel = () => document.removeEventListener("click", remove);
    this.observe = () => {
      setTimeout(() => {
        document.addEventListener("click", remove);
      }, 100);
    };
  }
};
var PopupBox = class extends HTMLElement {
  _children;
  _style;
  _fork;
  _observe;
  __contain;
  __fork;
  constructor(obj) {
    super();
    const { children, style, fork } = obj;
    const root3 = this.attachShadow({ mode: "closed" });
    root3.appendChild(createElements(htmlVnode(popupbox_default.replace('<div class="fork"></div>', \`<div class="fork">\${fork_default}</div>\`))));
    this.__contain = root3.children[0].children[0];
    this.__fork = root3.children[0].children[1];
    this._observe = new ClickRemove(this);
    Object.defineProperties(obj, {
      children: {
        get: () => this._children,
        set: (v) => {
          if (this._children === v)
            return;
          this._children = v;
          this.\$children();
        }
      },
      style: {
        get: () => this._style,
        set: (v) => {
          if (this._style === v)
            return;
          this._style = v;
          this.\$style();
        }
      },
      fork: {
        get: () => this._fork,
        set: (v) => {
          if (this._fork === v)
            return;
          this._fork = v;
          this.\$fork();
        }
      }
    });
    this._children = obj.children = children || document.createDocumentFragment();
    this._style = obj.style = style || "";
    this._fork = obj.fork = fork || false;
    this.__fork.addEventListener("click", () => this.remove());
    document.body.appendChild(this);
  }
  timer = 0;
  \$children() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.__contain.replaceChildren(this._children);
    }, 250);
  }
  \$style() {
    this.__contain.setAttribute("style", this._style);
  }
  \$fork() {
    if (this._fork) {
      this._observe.cancel();
      this.__fork.style.display = "";
    } else {
      this._observe.observe();
      this.__fork.style.display = "none";
    }
  }
};
customElements.get(\`popup-box\${mutex}\`) || customElements.define(\`popup-box\${mutex}\`, PopupBox);

// src/runtime/download/download_ui.html
var download_ui_default = '<div class="table"></div>\\r\\n<style type="text/css">\\r\\n    .table {\\r\\n        position: fixed;\\r\\n        z-index: 11113;\\r\\n        bottom: 0;\\r\\n        width: 100%;\\r\\n        min-height: 50px;\\r\\n        display: flex;\\r\\n        box-sizing: border-box;\\r\\n        background: #fff;\\r\\n        border-radius: 8px;\\r\\n        box-shadow: 0 6px 12px 0 rgba(106, 115, 133, 22%);\\r\\n        transition: transform 0.3s ease-in;\\r\\n        flex-wrap: wrap;\\r\\n        align-content: center;\\r\\n        justify-content: center;\\r\\n        align-items: center;\\r\\n    }\\r\\n\\r\\n    .cell {\\r\\n        background-color: #fff;\\r\\n        color: #000 !important;\\r\\n        border: #ccc 1px solid;\\r\\n        border-radius: 3px;\\r\\n        display: flex;\\r\\n        margin: 3px;\\r\\n        flex-wrap: wrap;\\r\\n        align-content: center;\\r\\n        justify-content: center;\\r\\n        align-items: center;\\r\\n        flex-direction: row;\\r\\n    }\\r\\n\\r\\n    .type {\\r\\n        color: #000 !important;\\r\\n        display: table-cell;\\r\\n        min-width: 1.5em;\\r\\n        text-align: center;\\r\\n        vertical-align: middle;\\r\\n        padding: 10px 3px;\\r\\n    }\\r\\n\\r\\n    .type.mp4 {\\r\\n        background-color: #e0e;\\r\\n    }\\r\\n\\r\\n    .type.av1 {\\r\\n        background-color: #feb;\\r\\n    }\\r\\n\\r\\n    .type.avc {\\r\\n        background-color: #07e;\\r\\n    }\\r\\n\\r\\n    .type.hev {\\r\\n        background-color: #7ba;\\r\\n    }\\r\\n\\r\\n    .type.aac {\\r\\n        background-color: #0d0;\\r\\n    }\\r\\n\\r\\n    .type.flv {\\r\\n        background-color: #0dd;\\r\\n    }\\r\\n\\r\\n    .item {\\r\\n        display: table-cell;\\r\\n        text-decoration: none;\\r\\n        padding: 3px;\\r\\n        cursor: pointer;\\r\\n        color: #1184B4;\\r\\n    }\\r\\n\\r\\n    .item:hover {\\r\\n        color: #FE3676;\\r\\n    }\\r\\n\\r\\n    .up {\\r\\n        color: #fff !important;\\r\\n        text-align: center;\\r\\n        padding: 1px 3px;\\r\\n        background-color: #777;\\r\\n    }\\r\\n\\r\\n    .up.yellow {\\r\\n        background-color: #ffe42b;\\r\\n        background-image: linear-gradient(to right, #ffe42b, #dfb200);\\r\\n    }\\r\\n\\r\\n    .up.pink {\\r\\n        background-color: #ffafc9;\\r\\n        background-image: linear-gradient(to right, #ffafc9, #dfada7);\\r\\n    }\\r\\n\\r\\n    .up.purple {\\r\\n        background-color: #c0f;\\r\\n        background-image: linear-gradient(to right, #c0f, #90f);\\r\\n    }\\r\\n\\r\\n    .up.red {\\r\\n        background-color: #f00;\\r\\n        background-image: linear-gradient(to right, #f00, #c00);\\r\\n    }\\r\\n\\r\\n    .up.orange {\\r\\n        background-color: #f90;\\r\\n        background-image: linear-gradient(to right, #f90, #d70);\\r\\n    }\\r\\n\\r\\n    .up.blue {\\r\\n        background-color: #00d;\\r\\n        background-image: linear-gradient(to right, #00d, #00b);\\r\\n    }\\r\\n\\r\\n    .up.green {\\r\\n        background-color: #0d0;\\r\\n        background-image: linear-gradient(to right, #0d0, #0b0);\\r\\n    }\\r\\n\\r\\n    .up.lv9 {\\r\\n        background-color: #151515;\\r\\n        background-image: linear-gradient(to right, #151515, #030303);\\r\\n    }\\r\\n\\r\\n    .up.lv8 {\\r\\n        background-color: #841cf9;\\r\\n        background-image: linear-gradient(to right, #841cf9, #620ad7);\\r\\n    }\\r\\n\\r\\n    .up.lv7 {\\r\\n        background-color: #e52fec;\\r\\n        background-image: linear-gradient(to right, #e52fec, #c30dca);\\r\\n    }\\r\\n\\r\\n    .up.lv6 {\\r\\n        background-color: #ff0000;\\r\\n        background-image: linear-gradient(to right, #ff0000, #dd0000);\\r\\n    }\\r\\n\\r\\n    .up.lv5 {\\r\\n        background-color: #ff6c00;\\r\\n        background-image: linear-gradient(to right, #ff6c00, #dd4a00);\\r\\n    }\\r\\n\\r\\n    .up.lv4 {\\r\\n        background-color: #ffb37c;\\r\\n        background-image: linear-gradient(to right, #ffb37c, #dd915a);\\r\\n    }\\r\\n\\r\\n    .up.lv3 {\\r\\n        background-color: #92d1e5;\\r\\n        background-image: linear-gradient(to right, #92d1e5, #70b0c3);\\r\\n    }\\r\\n\\r\\n    .up.lv2 {\\r\\n        background-color: #95ddb2;\\r\\n        background-image: linear-gradient(to right, #95ddb2, #73bb90);\\r\\n    }\\r\\n\\r\\n    .up.lv1 {\\r\\n        background-color: #bfbfbf;\\r\\n        background-image: linear-gradient(to right, #bfbfbf, #9d9d9d);\\r\\n    }\\r\\n\\r\\n    .down {\\r\\n        font-size: 90%;\\r\\n        margin-top: 2px;\\r\\n        text-align: center;\\r\\n        padding: 1px 3px;\\r\\n    }\\r\\n</style>';

// src/runtime/download/download_ui.ts
var BiliOldDownload = class extends HTMLElement {
  _data;
  obj;
  _table;
  observer = new ClickRemove(this);
  constructor(obj) {
    super();
    const { data } = obj;
    const root3 = this.attachShadow({ mode: "closed" });
    root3.appendChild(createElements(htmlVnode(download_ui_default)));
    this._table = root3.children[0];
    this.obj = obj;
    Object.defineProperty(obj, "data", {
      configurable: true,
      get: () => new Proxy(this._data, new ProxyHandler(() => this.\$data())),
      set: (v) => {
        if (v === this._data)
          return;
        this._data = v;
        this.\$data();
      }
    });
    this._data = obj.data = data;
  }
  \$data() {
    const vdoms = Object.entries(this._data).reduce((s, d) => {
      const vdom = {
        tagName: "div",
        props: { class: "cell" },
        children: [
          {
            tagName: "div",
            props: { class: \`type \${d[0]}\` },
            children: [
              {
                tagName: "text",
                text: d[0]
              }
            ]
          }
        ]
      };
      d[1].forEach((d2) => {
        const a = { class: "item", target: "_blank" };
        d2.href && (a.href = d2.href);
        d2.fileName && (a.download = d2.fileName);
        vdom.children?.push({
          tagName: "a",
          props: a,
          children: [
            {
              tagName: "div",
              props: { class: \`up\${d2.color ? \` \${d2.color}\` : ""}\` },
              children: [
                {
                  tagName: "text",
                  text: d2.up
                }
              ]
            },
            {
              tagName: "div",
              props: { class: \`down\` },
              children: [
                {
                  tagName: "text",
                  text: d2.down
                }
              ]
            }
          ],
          event: {
            click: () => {
              d2.onclick && d2.onclick();
            }
          }
        });
      });
      s.push(vdom);
      return s;
    }, []);
    vdoms.length || vdoms.push({
      tagName: "div",
      children: [
        {
          tagName: "text",
          text: "正在获取下载数据~"
        }
      ]
    });
    this._table.replaceChildren(createElements(vdoms));
  }
  show() {
    document.body.contains(this) || document.body.appendChild(this);
    this.observer.observe();
  }
};
customElements.get(\`biliold-download\${mutex}\`) || customElements.define(\`biliold-download\${mutex}\`, BiliOldDownload);
var downloadUI = new BiliOldDownload({ data: {} });

// src/runtime/format/size.ts
function sizeFormat(size = 0) {
  let unit = ["B", "K", "M", "G"], i = unit.length - 1, dex = 1024 ** i, vor = 1e3 ** i;
  while (dex > 1) {
    if (size >= vor) {
      size = Number((size / dex).toFixed(2));
      break;
    }
    dex = dex / 1024;
    vor = vor / 1e3;
    i--;
  }
  return size ? size + unit[i] : "N/A";
}

// src/runtime/format/sub_array.ts
function subArray(res, num = 1) {
  const arr2 = [...res];
  const out = [];
  num = num || 1;
  num = num < arr2.length ? num : arr2.length;
  while (out.length < num) {
    var temp2 = Math.random() * arr2.length >> 0;
    out.push(arr2.splice(temp2, 1)[0]);
  }
  return num === 1 ? out[0] : out;
}

// src/runtime/lib/base64.ts
var Base64 = class {
  static encode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode("0x" + p1);
    }));
  }
  static decode(str) {
    return decodeURIComponent(atob(str).split("").map(function(c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
  }
};

// src/runtime/download/aria2.ts
var Aria2 = class {
  setting = {};
  constructor() {
    if (!setting)
      return;
    setting.userAgent && (this.setting.userAgent = setting.userAgent);
    setting.referer && (this.setting.referer = setting.referer);
    setting.filepath && (this.setting.directory = setting.filepath);
    setting.aria2.token && (this.setting.token = setting.aria2.token);
  }
  shell(obj) {
    return new Promise((r, j) => {
      let result = "aria2c";
      obj = { ...this.setting, ...obj };
      obj.urls.forEach((d) => result += \` "\${d}"\`);
      obj.out && (result += \` --out="\${obj.out}"\`);
      obj.userAgent && (result += \` --user-agent="\${obj.userAgent}"\`);
      obj.referer && (result += \` --referer="\${obj.referer}"\`);
      obj.directory && (result += \` --dir="\${obj.directory}"\`);
      obj.split && (result += \` --split="\${obj.split}"\`);
      obj.header && Object.entries(obj.header).forEach((d) => result += \` --header="\${d[0]}: \${d[1]}"\`);
      navigator.clipboard.writeText(result).then(r, (e) => j(e));
    });
  }
  rpc(obj) {
    obj = { ...this.setting, ...obj };
    const options = {};
    obj.out && (options.out = obj.out);
    obj.userAgent && (options["user-agent"] = obj.userAgent);
    obj.referer && (options["referer"] = obj.referer);
    obj.directory && (options["dir"] = obj.directory);
    obj.split && (options["split"] = obj.split);
    obj.header && (options["header"] = obj.header);
    return this.postMessage("aria2.addUri", obj.id || new Date().getTime(), [obj.urls, options]);
  }
  postMessage(method, id, params = []) {
    const url = \`\${setting.aria2.server}:\${setting.aria2.port}/jsonrpc\`;
    setting.aria2.token && params.unshift(\`token:\${setting.aria2.token}\`);
    return new Promise((r, j) => {
      xhr({
        url,
        method: "POST",
        responseType: "json",
        data: JSON.stringify({ method, id, params })
      }).then((d) => {
        d.error && j(d.error);
        d.result && r(d.result);
      }).catch((e) => {
        xhr({
          url: objUrl(url, { method, id, params: Base64.encode(JSON.stringify(params)) }),
          method: "GET",
          responseType: "json"
        }).then((d) => {
          d.error && j(d.error);
          d.result && r(d.result);
        }).catch(() => j(e));
      });
    });
  }
  getVersion() {
    return this.postMessage("aria2.getVersion", new Date().getTime());
  }
};
var aria2 = new Aria2();

// src/runtime/download/ef2.ts
var Ef2 = class {
  setting = {};
  constructor() {
    if (!setting)
      return;
    setting.IDM.wait && (this.setting.sendToList = setting.IDM.wait);
    setting.IDM.silence && (this.setting.toastDisabled = setting.IDM.silence);
    setting.userAgent && (this.setting.userAgent = setting.userAgent);
    setting.referer && (this.setting.referer = setting.referer);
    setting.filepath && (this.setting.directory = setting.filepath);
  }
  sendLinkToIDM(data) {
    data = { ...this.setting, ...data };
    const a = document.createElement("a");
    a.href = this.encode(data);
    a.click();
  }
  encode(data) {
    let result = "";
    Object.keys(data).forEach((d) => {
      switch (d) {
        case "cookies":
          result += \` -c "\${data.cookies}"\`;
          break;
        case "directory":
          data.directory = data.directory.replace(/\\//, "\\\\");
          data.directory && data.directory[data.directory.length - 1] == "\\\\" && (data.directory = data.directory.substr(0, data.directory.length - 1));
          result += \` -o "\${data.directory}"\`;
          break;
        case "out":
          result += \` -s "\${data.out}"\`;
          break;
        case "password":
          result += \` -P "\${data.password}"\`;
          break;
        case "postDate":
          result += \` -d "\${data.postDate}"\`;
          break;
        case "referer":
          result += \` -r "\${data.referer}"\`;
          break;
        case "sendToList":
          result += \` -q\`;
          break;
        case "toastDisabled":
          result += \` -f\`;
          break;
        case "url":
          data.url.startsWith("//") && (data.url = "https:" + data.url);
          result += \` -u "\${data.url}"\`;
          break;
        case "userAgent":
          result += \` -a "\${data.userAgent}"\`;
          break;
        case "userName":
          result += \` -U "\${data.userName}"\`;
          break;
      }
    });
    result && result.startsWith(" ") && (result = result.substr(1, result.length));
    return "ef2://" + Base64.encode(result);
  }
  decode(ef2ptl) {
    ef2ptl = ef2ptl.replace("ef2://", "");
    ef2ptl = Base64.decode(ef2ptl) + " ";
    const key = ef2ptl.match(/-\\w /g);
    const value = ef2ptl.split(/-\\w /);
    value.shift();
    return Array.from(key).reduce((s, d, i) => {
      value[i] && value[i].endsWith(" ") && (value[i] = value[i].substr(0, value[i].length - 1));
      value[i] && value[i].endsWith('"') && (value[i] = value[i].substr(1, value[i].length - 2));
      switch (d) {
        case "-c ":
          s.cookies = value[i];
          break;
        case "-o ":
          s.directory = value[i];
          break;
        case "-s ":
          s.out = value[i];
          break;
        case "-P ":
          s.password = value[i];
          break;
        case "-d ":
          s.postDate = value[i];
          break;
        case "-r ":
          s.referer = value[i];
          break;
        case "-q ":
          s.sendToList = true;
          break;
        case "-f ":
          s.toastDisabled = true;
          break;
        case "-u ":
          s.url = value[i];
          break;
        case "-a ":
          s.userAgent = value[i];
          break;
        case "-U ":
          s.userName = value[i];
          break;
      }
      return s;
    }, {});
  }
};
var ef2 = new Ef2();

// src/runtime/download/playinfo_filter.ts
var PlayinfoFiter = class {
  quality = {
    100032: "8K",
    100029: "4K",
    100028: "1080P60",
    100027: "1080P+",
    100026: "1080P",
    100024: "720P",
    100023: "480P",
    100022: "360P",
    30280: "320Kbps",
    30260: "320Kbps",
    30259: "128Kbps",
    30257: "64Kbps",
    30255: "AUDIO",
    30251: "FLAC",
    30250: "ATMOS",
    30232: "128Kbps",
    30216: "64Kbps",
    30127: "8K",
    30126: "Dolby",
    30125: "HDR",
    30121: "4K",
    30120: "4K",
    30116: "1080P60",
    30112: "1080P+",
    30106: "1080P60",
    30102: "1080P+",
    30080: "1080P",
    30077: "1080P",
    30076: "720P",
    30074: "720P",
    30066: "720P",
    30064: "720P",
    30048: "720P",
    30033: "480P",
    30032: "480P",
    30016: "360P",
    30015: "360P",
    30011: "360P",
    464: "预览",
    336: "1080P",
    320: "720P",
    288: "480P",
    272: "360P",
    208: "1080P",
    192: "720P",
    160: "480P",
    127: "8K",
    126: "Dolby",
    125: "HDR",
    120: "4K",
    116: "1080P60",
    112: "1080P+",
    80: "1080P",
    74: "720P60",
    64: "720P",
    48: "720P",
    32: "480P",
    16: "360P",
    15: "360P",
    6: "240P",
    5: "144P"
  };
  codec = {
    hev: [30127, 30126, 30125, 30121, 30106, 30102, 30077, 30066, 30033, 30011],
    avc: [30120, 30112, 30080, 30064, 30032, 30016],
    av1: [100029, 100028, 100027, 100026, 100024, 100023, 100022]
  };
  color = {
    "8K": "yellow",
    "Dolby": "pink",
    "FLAC": "pink",
    "ATMOS": "pink",
    "AUDIO": "pink",
    "HDR": "purple",
    "4K": "purple",
    "1080P60": "red",
    "1080P+": "red",
    "1080P": "red",
    "720P60": "orange",
    "720P": "orange",
    "480P": "blue",
    "360P": "green",
    "320Kbps": "red",
    "128Kbps": "blue",
    "64Kbps": "green"
  };
  record = [];
  fileName;
  constructor(fileName) {
    this.fileName = fileName;
  }
  filter(playinfo) {
    if (playinfo) {
      playinfo.data && this.filter(playinfo.data);
      playinfo.result && this.filter(playinfo.result);
      playinfo.durl && this.durl(playinfo.durl);
      playinfo.dash && this.dash(playinfo.dash);
    }
    return this.record;
  }
  durl(durl) {
    let index = 0;
    durl.forEach((d) => {
      const url = d.backupUrl || d.backup_url || [];
      url.unshift(d.url);
      const qua = this.getQuality(url[0], d.id);
      const link = {
        type: "",
        url,
        quality: qua,
        size: sizeFormat(d.size),
        color: this.color[qua] || ""
      };
      switch (d.url.includes("mp4?")) {
        case true:
          link.type = "mp4";
          break;
        case false:
          link.type = "flv";
          index++;
          link.flv = index;
          break;
      }
      this.fileName && (link.fileName = \`\${this.fileName}\${qua}.\${link.type}\`);
      this.record.push(link);
    });
  }
  dash(dash) {
    dash.video && this.dashVideo(dash.video, dash.duration);
    dash.audio && this.dashAudio(dash.audio, dash.duration);
    dash.dolby && dash.dolby.audio && Array.isArray(dash.dolby.audio) && this.dashAudio(dash.dolby.audio, dash.duration);
    dash.flac && dash.flac.audio && this.dashAudio([dash.flac.audio], dash.duration, ".flac");
  }
  dashVideo(video, duration) {
    video.forEach((d) => {
      const url = d.backupUrl || d.backup_url || [];
      (d.baseUrl || d.base_url) && url.unshift(d.baseUrl || d.base_url);
      if (!url.length)
        return;
      let type = "";
      if (d.codecs) {
        type = d.codecs.includes("avc") ? "avc" : d.codecs.includes("av01") ? "av1" : "hev";
      } else {
        const id = this.getID(url[0]);
        type = this.codec.hev.find((d2) => d2 === id) ? "hev" : "avc";
      }
      const qua = this.getQuality(url[0], d.id);
      this.record.push({
        type,
        url,
        quality: qua,
        size: sizeFormat(d.bandwidth * duration / 8),
        color: this.color[qua] || "",
        fileName: \`\${this.fileName}\${qua}.m4v\`
      });
    });
  }
  dashAudio(audio, duration, fmt = ".m4a") {
    audio.forEach((d) => {
      const url = d.backupUrl || d.backup_url || [];
      (d.baseUrl || d.base_url) && url.unshift(d.baseUrl || d.base_url);
      const qua = this.getQuality(url[0], d.id);
      url.length && this.record.push({
        type: "aac",
        url,
        quality: qua,
        size: sizeFormat(d.bandwidth * duration / 8),
        color: this.color[qua] || "",
        fileName: \`\${this.fileName}\${qua}.\${fmt}\`
      });
    });
  }
  getQuality(url, id) {
    return this.quality[this.getID(url)] || id && this.quality[id] || "N/A";
  }
  getID(url) {
    let id = 0;
    url.replace(/\\d+\\.((flv)|(mp4)|(m4s))/, (d) => id = Number(d.split(".")[0]));
    return id;
  }
};
function playinfoFiter(playinfo, prev = {}, fileName = API.title) {
  return new PlayinfoFiter(fileName).filter(playinfo).reduce((s, d) => {
    s[d.type] || (s[d.type] = []);
    const obj = {
      up: Reflect.has(d, "flv") ? \`\${d.quality}*\${d.flv}\` : d.quality,
      down: d.size,
      href: subArray(d.url),
      color: d.color
    };
    if (setting.downloadMethod !== "默认") {
      delete obj.href;
      obj.onclick = () => {
        postData(d);
      };
    }
    s[d.type].push(obj);
    return s;
  }, prev);
}
function postData(data) {
  switch (setting.downloadMethod) {
    case "IDM+ef2":
      ef2.sendLinkToIDM({ url: data.url[0], out: data.fileName });
      break;
    case "aria2":
      aria2.shell({ urls: data.url, out: data.fileName }).then(() => toast.success(\`已复制aria2命令行到剪切板，在cmd等shell中使用即可下载~\`)).catch((e) => {
        toast.error(\`复制aria2命令行失败！\`);
        debug.error(\`复制aria2命令行失败！\`, e);
      });
      break;
    case "aria2+rpc":
      aria2.rpc({ urls: data.url, out: data.fileName }).then((GID) => toast.success(\`已添加下载任务到aria2 RPC主机，任务GID：\${GID}\`)).catch((e) => {
        toast.error(\`添加下载任务到aria2 RPC主机出错！\`);
        debug.error(\`添加下载任务到aria2 RPC主机出错！\`, e);
      });
      break;
  }
}

// src/runtime/download/download.ts
var Record2 = {};
var downloading = false;
var isCover = false;
switchVideo(() => {
  isCover = false;
  Object.keys(Record2).forEach((d) => delete Record2[d]);
});
function pushDownload(obj) {
  Reflect.has(Record2, obj.group) || (Record2[obj.group] = []);
  const data = { up: obj.up, down: obj.down };
  obj.color && (data.color = obj.color);
  obj.fileName && (data.fileName = obj.fileName);
  if (obj.url) {
    data.href = obj.url;
  } else {
    data.onclick = () => {
      if (obj.callback) {
        return obj.callback();
      }
      isObject(obj.data) ? saveAs(JSON.stringify(obj.data), obj.fileName || "") : saveAs(obj.data, obj.fileName || "");
    };
  }
  Record2[obj.group].push(data);
}
function contactDownloadDate(target, source) {
  Object.entries(source).forEach((d) => {
    Reflect.has(target, d[0]) || (target[d[0]] = []);
    target[d[0]] = target[d[0]].concat(d[1]);
  });
}
function getCover() {
  if (!setting.downloadOther || isCover)
    return;
  isCover = true;
  const cover = API.cover, bkg_cover = API.bkg_cover, title = API.title;
  cover && pushDownload({
    group: "封面",
    url: cover,
    up: "封面",
    down: "N/A",
    fileName: \`\${title || \`av\${API.aid}\`}.\${cover.split(".").reduce((s, d) => s = d, void 0) || "jpg"}\`
  });
  bkg_cover && pushDownload({
    group: "封面",
    url: bkg_cover,
    up: "封面",
    down: "N/A",
    fileName: \`\${title || \`av\${API.aid}\`}.\${bkg_cover.split(".").reduce((s, d) => s = d, void 0) || "jpg"}\`
  });
}
async function downloadDefault() {
  if (downloading)
    return;
  downloading = true;
  if (!API.cid)
    return toast.warning("请在视频页使用本功能~");
  if (API.th)
    toast.warning("泰区视频！", "请将【referer】置空，【UserAgent】设为默认值，并选用【默认】以外的方式进行下载~");
  const data = playinfoFiter(API.__playinfo__);
  const request = [];
  const type = setting.downlaodType.join(" ").toLowerCase();
  downloadUI.obj.data = data;
  downloadUI.show();
  /mp4/g.test(type) && request.push(getContent("mp4"));
  data.flv || /flv/g.test(type) && request.push(getContent("flv"));
  data.aac || /dash/g.test(type) && request.push(getContent("dash"));
  (await Promise.all(request)).forEach((d) => {
    playinfoFiter(d, downloadUI.obj.data);
  });
  getCover();
  contactDownloadDate(downloadUI.obj.data, Record2);
  downloading = false;
}
async function getContent(d) {
  d = d.toLowerCase();
  let result;
  const pgc = API.pgc;
  try {
    switch (d) {
      case "dash":
        result = pgc ? await urlPack.getJson(setting.TVresource ? "api.bilibili.com/pgc/player/api/playurltv" : "api.bilibili.com/pgc/player/web/playurl", { avid: API.aid, cid: API.cid, fnver: 0, fnval }) : await urlPack.getJson(setting.TVresource ? "api.bilibili.com/x/tv/ugc/playurl" : "api.bilibili.com/x/player/playurl", { avid: API.aid, cid: API.cid, fnver: 0, fnval });
        break;
      case "flv":
        result = pgc ? await urlPack.getJson(setting.TVresource ? "api.bilibili.com/pgc/player/api/playurltv" : "api.bilibili.com/pgc/player/web/playurl", { avid: API.aid, cid: API.cid, qn: setting.downloadQn }) : await urlPack.getJson(setting.TVresource ? "api.bilibili.com/x/tv/ugc/playurl" : "api.bilibili.com/x/player/playurl", { avid: API.aid, cid: API.cid, qn: setting.downloadQn });
        break;
      case "mp4":
        result = pgc ? await urlPack.getJson("api.bilibili.com/pgc/player/api/playurlproj", { cid: API.cid }) : await urlPack.getJson("app.bilibili.com/v2/playurlproj", { cid: API.cid });
        break;
    }
  } catch (e) {
  }
  return JSON.parse(uposReplace(JSON.stringify(result), setting.uposReplace.dl));
}
window.addEventListener("message", (ev) => {
  if (typeof ev.data === "object") {
    if (ev.data.\$type == "downloadDefault") {
      downloadDefault();
    }
  }
});

// src/runtime/danmaku/danmaku.ts
var import_light = __toESM(require_light());

// src/runtime/cookies.ts
function getCookies() {
  return document.cookie.split("; ").reduce((s, d) => {
    let key = d.split("=")[0];
    let val = d.split("=")[1];
    s[key] = unescape(val);
    return s;
  }, {});
}

// src/runtime/variable/uid.ts
var uid = Number(getCookies().DedeUserID);

// src/runtime/danmaku/bilibili_danmaku.json
var bilibili_danmaku_default = {
  nested: {
    bilibili: {
      nested: {
        DmWebViewReply: {
          fields: {
            state: {
              type: "int32",
              id: 1
            },
            text: {
              type: "string",
              id: 2
            },
            textSide: {
              type: "string",
              id: 3
            },
            dmSge: {
              type: "DmSegConfig",
              id: 4
            },
            flag: {
              type: "DanmakuFlagConfig",
              id: 5
            },
            specialDms: {
              rule: "repeated",
              type: "string",
              id: 6
            },
            checkBox: {
              type: "bool",
              id: 7
            },
            count: {
              type: "int64",
              id: 8
            },
            commandDms: {
              rule: "repeated",
              type: "CommandDm",
              id: 9
            },
            dmSetting: {
              type: "DanmuWebPlayerConfig",
              id: 10
            }
          }
        },
        CommandDm: {
          fields: {
            id: {
              type: "int64",
              id: 1
            },
            oid: {
              type: "int64",
              id: 2
            },
            mid: {
              type: "int64",
              id: 3
            },
            command: {
              type: "string",
              id: 4
            },
            content: {
              type: "string",
              id: 5
            },
            progress: {
              type: "int32",
              id: 6
            },
            ctime: {
              type: "string",
              id: 7
            },
            mtime: {
              type: "string",
              id: 8
            },
            extra: {
              type: "string",
              id: 9
            },
            idStr: {
              type: "string",
              id: 10
            }
          }
        },
        DmSegConfig: {
          fields: {
            pageSize: {
              type: "int64",
              id: 1
            },
            total: {
              type: "int64",
              id: 2
            }
          }
        },
        DanmakuFlagConfig: {
          fields: {
            recFlag: {
              type: "int32",
              id: 1
            },
            recText: {
              type: "string",
              id: 2
            },
            recSwitch: {
              type: "int32",
              id: 3
            }
          }
        },
        DmSegMobileReply: {
          fields: {
            elems: {
              rule: "repeated",
              type: "DanmakuElem",
              id: 1
            }
          }
        },
        DanmakuElem: {
          fields: {
            id: {
              type: "int64",
              id: 1
            },
            progress: {
              type: "int32",
              id: 2
            },
            mode: {
              type: "int32",
              id: 3
            },
            fontsize: {
              type: "int32",
              id: 4
            },
            color: {
              type: "uint32",
              id: 5
            },
            midHash: {
              type: "string",
              id: 6
            },
            content: {
              type: "string",
              id: 7
            },
            ctime: {
              type: "int64",
              id: 8
            },
            weight: {
              type: "int32",
              id: 9
            },
            action: {
              type: "string",
              id: 10
            },
            pool: {
              type: "int32",
              id: 11
            },
            idStr: {
              type: "string",
              id: 12
            },
            attr: {
              type: "int32",
              id: 13
            }
          }
        },
        DanmuWebPlayerConfig: {
          fields: {
            dmSwitch: {
              type: "bool",
              id: 1
            },
            aiSwitch: {
              type: "bool",
              id: 2
            },
            aiLevel: {
              type: "int32",
              id: 3
            },
            blocktop: {
              type: "bool",
              id: 4
            },
            blockscroll: {
              type: "bool",
              id: 5
            },
            blockbottom: {
              type: "bool",
              id: 6
            },
            blockcolor: {
              type: "bool",
              id: 7
            },
            blockspecial: {
              type: "bool",
              id: 8
            },
            preventshade: {
              type: "bool",
              id: 9
            },
            dmask: {
              type: "bool",
              id: 10
            },
            opacity: {
              type: "float",
              id: 11
            },
            dmarea: {
              type: "int32",
              id: 12
            },
            speedplus: {
              type: "float",
              id: 13
            },
            fontsize: {
              type: "float",
              id: 14
            },
            screensync: {
              type: "bool",
              id: 15
            },
            speedsync: {
              type: "bool",
              id: 16
            },
            fontfamily: {
              type: "string",
              id: 17
            },
            bold: {
              type: "bool",
              id: 18
            },
            fontborder: {
              type: "int32",
              id: 19
            },
            drawType: {
              type: "string",
              id: 20
            }
          }
        }
      }
    }
  }
};

// src/runtime/danmaku/command_dm.css
var _default2 = {};

// src/runtime/danmaku/command_dm.ts
addCss(_default2);
var player;
var widgetContainer;
var playing = false;
var visible = true;
var commandDm = {
  visible: [],
  hidden: []
};
function init(cdm) {
  if (window.player) {
    if (widgetContainer === void 0)
      widgetContainer = initContainer();
    player = window.player;
    bindEvents();
    load(cdm);
  } else
    throw "获取window.player失败";
}
function load(commandDmRaw) {
  commandDm.hidden = parseDm(commandDmRaw);
  resize();
}
function initContainer() {
  let videoWrap = document.getElementsByClassName("bilibili-player-video-wrap")[0];
  if (!videoWrap)
    throw "未能获取播放器div";
  let widgetContainer2 = document.createElement("div");
  widgetContainer2.className = "bilibili-player-video-popup";
  videoWrap.appendChild(widgetContainer2);
  return widgetContainer2;
}
function bindEvents() {
  const EVENT = {
    VIDEO_MEDIA_PLAYING: "video_media_playing",
    VIDEO_MEDIA_PAUSE: "video_media_pause",
    VIDEO_MEDIA_SEEK: "video_media_seek",
    VIDEO_MEDIA_SEEKED: "video_media_seeked",
    VIDEO_MEDIA_ENDED: "video_media_ended",
    VIDEO_RESIZE: "video_resize",
    VIDEO_PLAYER_RESIZE: "video_player_resize",
    VIDEO_DESTROY: "video_destroy"
  };
  player.addEventListener(EVENT.VIDEO_MEDIA_PLAYING, play);
  player.addEventListener(EVENT.VIDEO_MEDIA_PAUSE, pause);
  player.addEventListener(EVENT.VIDEO_MEDIA_SEEK, pause);
  player.addEventListener(EVENT.VIDEO_MEDIA_SEEKED, play);
  player.addEventListener(EVENT.VIDEO_MEDIA_ENDED, pause);
  player.addEventListener(EVENT.VIDEO_PLAYER_RESIZE, resize);
  player.addEventListener(EVENT.VIDEO_DESTROY, destroy);
  document.querySelector("div.bilibili-player-video-control > div.bilibili-player-video-btn.bilibili-player-video-btn-danmaku").addEventListener(
    "click",
    (event) => {
      let option = event.target.getAttribute("name");
      if (option == "ctlbar_danmuku_close") {
        visible = false;
        pause();
        widgetContainer.style.display = "none";
      } else if (option == "ctlbar_danmuku_on") {
        visible = true;
        play();
        widgetContainer.style.display = "";
      }
    }
  );
}
function parseDm(commandDmRaw) {
  let popupWindow = [];
  for (let i = 0, cdm, extra, from; i < commandDmRaw.length; i++) {
    cdm = commandDmRaw[i];
    extra = JSON.parse(cdm.extra);
    from = cdm.progress / 1e3;
    switch (cdm.command) {
      case "#ATTENTION#":
      case "#ACTORFOLLOW#":
      case "#MANAGERFOLLOW#":
        debug.warn("未被支持的互动弹幕类型：" + cdm.command);
        debug.warn(cdm);
        break;
      case "#VOTE#":
        popupWindow.push(new Vote(cdm, extra, from));
        break;
      case "#GRADE#":
        popupWindow.push(new Grade(cdm, extra, from));
        break;
      case "#LINK#":
        popupWindow.push(new Link(cdm, extra, from));
        break;
      case "#RESERVE#":
      case "#ACTOR#":
      case "#ACTIVITYCOMBO#":
        debug.warn("未被支持的互动弹幕类型：" + cdm.command);
        debug.warn(cdm);
        break;
    }
  }
  return popupWindow;
}
function play() {
  if (visible) {
    playing = true;
    loop();
  }
}
function pause() {
  playing = false;
  loop();
}
function resize() {
  let scaleX = widgetContainer.clientWidth / 680;
  let scaleY = widgetContainer.clientHeight / 504;
  for (let i = 0; i < commandDm.visible.length; i++) {
    commandDm.visible[i].resize(scaleX, scaleY, widgetContainer.clientWidth, widgetContainer.clientHeight);
  }
  for (let i = 0; i < commandDm.hidden.length; i++) {
    commandDm.hidden[i].resize(scaleX, scaleY, widgetContainer.clientWidth, widgetContainer.clientHeight);
  }
}
function loop() {
  let time = player.getCurrentTime();
  if (playing) {
    requestAnimationFrame(loop);
  }
  for (let i = 0, cdm; i < commandDm.hidden.length; i++) {
    cdm = commandDm.hidden[i];
    if (cdm.from < time && cdm.to > time) {
      commandDm.visible.push(cdm);
      commandDm.hidden.splice(i, 1);
      cdm.show();
      resize();
    }
  }
  for (let i = 0, cdm; i < commandDm.visible.length; i++) {
    cdm = commandDm.visible[i];
    if (cdm.to < time || cdm.from > time) {
      commandDm.hidden.push(cdm);
      commandDm.visible.splice(i, 1);
      cdm.hide();
    }
  }
}
function destroy() {
  playing = false;
  for (let i = 0; i < commandDm.visible.length; i++) {
    commandDm.visible[i].destroy();
  }
  for (let i = 0; i < commandDm.hidden.length; i++) {
    commandDm.hidden[i].destroy();
  }
  commandDm.visible.splice(0, commandDm.visible.length);
  commandDm.hidden.splice(0, commandDm.hidden.length);
}
function divClass(className) {
  let div = document.createElement("div");
  div.className = className;
  return div;
}
function isLoggedin() {
  if (uid)
    return true;
  player.pause();
  toast.warning("请先登录！");
  biliQuickLogin();
}
function post2(url, data, contentType = "application/x-www-form-urlencoded;charset=UTF-8") {
  data.csrf = getCookies().bili_jct;
  return xhr({
    url,
    data: objUrl("", data),
    headers: { "Content-Type": contentType },
    method: "POST",
    credentials: true
  });
}
var PopupWindow = class {
  popup;
  duration;
  from;
  to;
  pos_x;
  pos_y;
  constructor(cdm, extra, from) {
    this.duration = extra.duration / 1e3 || 5;
    this.from = from || 0;
    this.to = from + (extra.duration / 1e3 || 5);
    this.pos_x = extra.posX || 200;
    this.pos_y = extra.posY || 200;
    this.popup = divClass("commandDm-popup");
    this.popup.style.display = "none";
    widgetContainer.appendChild(this.popup);
  }
  show() {
    this.popup.style.display = "";
    requestAnimationFrame(() => this.popup.className = "commandDm-popup on");
  }
  hide() {
    this.popup.className = "commandDm-popup";
    setTimeout(() => this.popup.style.display = "none", 200);
  }
  destroy() {
  }
  resize(scaleX, scaleY, containerWidth, containerHeight) {
    this.popup.style.transform = "translateX(-50%) translateY(-50%) scale(" + Math.min((scaleX + scaleY) / 2, 1.5) + ")";
    let left = this.pos_x * scaleX;
    let top = this.pos_y * scaleY;
    left = Math.max(left, this.popup.clientWidth / 2);
    top = Math.max(top, this.popup.clientHeight / 2);
    left = Math.min(left, containerWidth - this.popup.clientWidth / 2);
    top = Math.min(top, containerHeight - this.popup.clientHeight / 2);
    this.popup.style.left = left + "px";
    this.popup.style.top = top + "px";
  }
};
var Vote = class extends PopupWindow {
  total;
  voteId;
  options;
  question;
  myVote;
  dialog;
  result;
  button;
  count;
  progress;
  constructor(cdm, extra, from) {
    super(cdm, extra, from);
    this.popup.style.width = "150px";
    this.total = extra.cnt;
    this.voteId = extra.vote_id;
    this.options = extra.options;
    this.question = extra.question;
    this.myVote = extra.my_vote;
    let dialog = divClass("vote-dialog");
    let panel = divClass("vote-panel");
    let title = divClass("vote-title");
    title.innerHTML = this.question;
    let optionDiv = divClass("vote-option");
    let button = [];
    for (let i = 0, btn, opt; i < this.options.length; i++) {
      opt = this.options[i];
      btn = divClass("vote-button");
      btn.innerHTML = opt.desc;
      btn.setAttribute("idx", opt.idx);
      btn.onclick = () => this.goVote(opt.idx, i);
      button[i] = btn;
      optionDiv.appendChild(btn);
    }
    panel.appendChild(optionDiv);
    dialog.appendChild(title);
    dialog.appendChild(panel);
    this.popup.appendChild(dialog);
    this.dialog = dialog;
    this.button = button;
    this.progress = [];
    if (this.myVote !== 0) {
      this.showResult();
      this.progress[this.myVote - 1].className = "vote-progress vote-progress-blue";
    }
    ;
  }
  goVote(idx, i) {
    if (isLoggedin()) {
      this.total += 1;
      this.options[i].cnt += 1;
      let url = "//api.bilibili.com/x/web-interface/view/dm/vote";
      post2(url, {
        aid: API.aid,
        cid: API.cid,
        progress: Math.max(Math.round(1e3 * player.getCurrentTime()), 1),
        vote: idx,
        vote_id: this.voteId
      }).then((resp) => {
        resp = JSON.parse(resp);
        biliAPI.verify(resp, "投票");
        this.progress[i].className = "vote-progress vote-progress-blue";
      });
      this.myVote = idx;
      this.showResult();
      this.to += 5;
    }
  }
  showResult() {
    this.count = [];
    for (let i = 0, progress, desc; i < this.button.length; i++) {
      this.button[i].onclick = null;
      this.button[i].innerHTML = "";
      this.button[i].className = "vote-progress-bg";
      progress = divClass("vote-progress");
      desc = divClass("vote-progress-desc");
      desc.innerHTML = this.options[i].desc;
      progress.appendChild(desc);
      this.button[i].appendChild(progress);
      this.progress[i] = progress;
      let cnt = divClass("vote-count");
      cnt.innerHTML = this.options[i].cnt;
      this.count[i] = cnt;
      this.button[i].appendChild(cnt);
    }
    this.resultAnimation();
  }
  resultAnimation() {
    for (let i = 0; i < this.progress.length; i++) {
      this.progress[i].style.width = "0";
      requestAnimationFrame(() => this.progress[i].style.width = this.options[i].cnt / this.total * 100 + "%");
    }
    let start = performance.now();
    let frame = (t) => {
      let percentage = (t - start) * 125e-5;
      if (percentage < 1)
        requestAnimationFrame(frame);
      else
        percentage = 1;
      for (let i = 0; i < this.count.length; i++) {
        this.count[i].innerHTML = Math.floor(this.options[i].cnt * percentage);
      }
    };
    requestAnimationFrame(frame);
  }
  show() {
    super.show();
    if (this.myVote !== 0) {
      this.resultAnimation();
    }
  }
  hide() {
    super.hide();
    this.to = this.from + this.duration;
  }
};
var Grade = class extends PopupWindow {
  gradeInfo;
  scoreInfo;
  scoreButton;
  constructor(cdm, info, from) {
    super(cdm, info, from);
    this.popup.style.width = "184px";
    this.gradeInfo = info;
    this.popup.innerHTML = \`
            <div style="display:block" class="grade-title">\${info.msg}</div>
            <div class="grade-score-area pointer"></div>
            <div class="grade-score-info" style="display:none">
                <div style="color:#6f6f6f;display:inline-block;">平均</div><span style="color:\${info.skin_font_color};font-size:27px" class="grade-avg-score">\${info.avg_score}</span>
            </div>
            <span style="position:absolute;right:1rem;top:0.8rem;font-size:12px;color:#6f6f6f" class="grade-score-count">\${info.count}人参与</span>
            \`;
    this.scoreInfo = this.popup.getElementsByClassName("grade-score-info")[0];
    let scoreArea = this.popup.getElementsByClassName("grade-score-area")[0];
    let scoreButton = [];
    function highlightScores(i) {
      for (let m = 0; m < 5; m++) {
        if (m <= i && !scoreButton[m].highlight) {
          scoreButton[m].highlight = true;
          scoreButton[m].className = "highlight";
        } else if (m > i && scoreButton[m].highlight) {
          scoreButton[m].highlight = false;
          scoreButton[m].className = "";
        }
      }
    }
    for (let i = 0; i < 5; i++) {
      let score = document.createElement("div");
      scoreButton[i] = score;
      score.innerHTML = \`
                <img width=20 hegiht=20 src="\${info.skin_selected}" class="bg"></img>
                <img width=20 hegiht=20 src="\${info.skin_selected}" class="score-button"></img>\`;
      scoreArea.appendChild(score);
      if (info.mid_score === 0) {
        score.onmouseenter = () => highlightScores(i);
        score.onclick = () => {
          if (isLoggedin()) {
            this.gradeInfo.avg_score = (this.gradeInfo.count * this.gradeInfo.avg_score + (i + 1) * 2) / (this.gradeInfo.count + 1);
            this.gradeInfo.avg_score = this.gradeInfo.avg_score.toPrecision(2);
            this.gradeInfo.count += 1;
            this.popup.getElementsByClassName("grade-avg-score")[0].innerHTML = this.gradeInfo.avg_score;
            this.popup.getElementsByClassName("grade-score-count")[0].innerHTML = this.gradeInfo.count + "人参与";
            this.showResult();
            for (let index = 0; index < 5; index++) {
              if (index <= i) {
                scoreButton[index].style.animation = "grade-score-hit 0.7s ease forwards";
                setTimeout(() => scoreButton[index].style.animation = "", 1e3);
              }
              scoreButton[index].onclick = null;
              scoreButton[index].onmouseenter = null;
            }
            scoreArea.onmouseleave = null;
            scoreArea.classList.remove("pointer");
            this.goGrade((i + 1) * 2);
          }
        };
      }
    }
    ;
    if (info.mid_score === 0)
      scoreArea.onmouseleave = () => highlightScores(-1);
    this.scoreButton = scoreButton;
    if (info.mid_score != 0) {
      this.showResult();
      highlightScores(info.mid_score / 2 - 1);
      scoreArea.classList.remove("pointer");
    }
  }
  goGrade(score) {
    post2("https://api.bilibili.com/x/v2/dm/command/grade/post", {
      aid: API.aid,
      cid: API.cid,
      progress: parseInt(player.getCurrentTime()) * 1e3,
      grade_id: this.gradeInfo.grade_id,
      grade_score: score
    });
    this.to += 3;
  }
  showResult() {
    this.scoreInfo.style.display = "";
    this.scoreInfo.style.animation = "grade-score-showup 0.3s ease 0.2s forwards";
    for (let i = 0; i < 4; i++) {
      setTimeout(() => this.scoreButton[i].style.width = "24px", i * 50);
    }
  }
  hide() {
    super.hide();
    this.to = this.from + this.duration;
  }
};
var favList = class {
  static get() {
    if (this.list.length > 0)
      return Promise.resolve(this.list);
    return xhr({
      url: objUrl("//api.bilibili.com/x/v3/fav/folder/created/list-all", {
        type: 2,
        rid: API.aid,
        up_mid: uid
      }),
      credentials: true
    }).then((resp) => {
      resp = JSON.parse(resp);
      biliAPI.verify(resp, "获取收藏列表");
      this.list = resp.data.list;
      this.list.forEach((v) => v.attr === 1 && (this.defaultFolderId = v.id));
      return this.list;
    });
  }
  static getDefaultFolder() {
    if (this.defaultFolderId !== 0)
      return Promise.resolve(this.defaultFolderId);
    return this.get().then(() => {
      return this.defaultFolderId;
    });
  }
};
__publicField(favList, "list", []);
__publicField(favList, "defaultFolderId", 0);
var biliAPI = class {
  static verify(resp, msg) {
    if (resp.code !== 0) {
      toast.error(msg + "失败", resp.code, resp.message);
      throw msg + "失败";
    }
    return resp;
  }
  static like(bool) {
    bool = bool ? 1 : 2;
    return post2("//api.bilibili.com/x/web-interface/archive/like", {
      aid: API.aid,
      like: bool
    }, "application/json; charset=utf-8").then((resp) => biliAPI.verify(resp, "点赞"));
  }
  static follow() {
    return post2("//api.bilibili.com/x/relation/modify", {
      aid: API.aid,
      fid: window.getAuthorInfo().mid,
      act: 1,
      re_src: 14
    }).then((resp) => {
      resp = JSON.parse(resp);
      return biliAPI.verify(resp, "关注");
    });
  }
  static coin() {
  }
  static fav() {
    return post2("//api.bilibili.com/x/v3/fav/resource/deal", {
      rid: API.aid,
      type: 2,
      add_media_ids: favList.defaultFolderId
    }).then((resp) => {
      resp = JSON.parse(resp);
      return biliAPI.verify(resp, "收藏");
    });
  }
  static triple() {
    return post2("//api.bilibili.com/x/web-interface/archive/like/triple", {
      aid: API.aid
    }, "application/json; charset=utf-8").then((resp) => {
      biliAPI.verify(resp, "三连");
      let d = resp.data;
      if (d.coin && d.like && d.fav)
        return;
      if (!d.coin)
        toast.error("投币失败");
      if (!d.like)
        toast.error("点赞失败");
      if (!d.fav)
        toast.error("收藏失败");
      return d;
    });
  }
};
var Link = class {
  content;
  aid;
  from;
  to;
  pos_x;
  pos_y;
  button;
  constructor(cdm, extra, from) {
    this.content = cdm.content;
    this.aid = extra.aid;
    this.from = from || 0;
    this.to = from + 5;
    this.pos_x = extra.posX || 200;
    this.pos_y = extra.posY || 200;
    let button = divClass("link-button");
    let img = document.createElement("img");
    img.src = "https://static.hdslb.com/images/favicon.ico";
    let span = document.createElement("span");
    span.innerHTML = this.content;
    button.appendChild(img);
    button.appendChild(span);
    button.style.display = "none";
    button.onclick = () => {
      player.pause();
      window.open("https://www.bilibili.com/video/av" + this.aid);
    };
    widgetContainer.appendChild(button);
    this.button = button;
  }
  show() {
    this.button.style.display = "block";
  }
  hide() {
    this.button.style.display = "none";
  }
  resize(scaleX, scaleY) {
    this.button.style.left = this.pos_x * scaleX + "px";
    this.button.style.top = this.pos_y * scaleY + "px";
    this.button.style.transform = "translateX(-50%) translateY(-50%) scale(" + Math.min(1.5, (scaleX + scaleY) / 2) + ")";
  }
  destroy() {
  }
};
async function loadCommandDm(cdm, aid, cid) {
  try {
    if (aid != aid || cid != cid || widgetContainer !== void 0 && document.getElementById("bilibiliPlayer").contains(widgetContainer)) {
      return;
    }
    init(cdm);
  } catch (e) {
    toast.error("互动弹幕组件出错~");
    debug.error("互动弹幕组件出错~", e);
  }
}

// src/runtime/player/video_float.ts
function videoFloat(data, hint, callback, time = 5) {
  const node2 = document.querySelector(".bilibili-player-video-toast-wrp");
  if (node2 && data) {
    const flt = node2.appendChild(createElement(htmlVnode(
      \`<div class="bilibili-player-video-toast-bottom">
                    <div class="bilibili-player-video-toast-item bilibili-player-video-toast-pay">
                        <span class="video-float-hint-text">\${data}</span>
                        \${hint ? \`<span class="video-float-hint-btn\${callback ? " hint-red" : ""}">\${hint}</span>\` : ""}
                    </div>
                </div>\`
    )[0]));
    if (callback && hint) {
      flt.children[0].children[1].addEventListener("click", callback);
    }
    if (time && !isNaN(time)) {
      setTimeout(() => flt.remove(), time * 1e3);
    }
  }
}

// src/runtime/danmaku/local_danmaku.ts
var LocalMedia = class {
  data = { xml: [], json: [], mp4: [] };
  offset = 0;
  keyboard = false;
  constructor(files) {
    this.change(files);
  }
  change(files) {
    if (!window.player) {
      return toast.warning("请在播放页使用本功能 →_→");
    }
    const file = files;
    if (file.length === 0) {
      return toast.warning("请选择本地视频或弹幕文件！", "视频：.mp4（且符合浏览器支持的编码）", "弹幕：.xml, .json");
    }
    this.data = { xml: [], json: [], mp4: [] };
    this.data = Array.from(file).reduce((d, i) => {
      /\\.xml\$/.test(i.name) && d.xml.push(i);
      /\\.json\$/.test(i.name) && d.json.push(i);
      /\\.mp4\$/.test(i.name) && d.mp4.push(i);
      return d;
    }, this.data);
    if (!this.data.xml[0] && !this.data.json[0] && !this.data.mp4[0]) {
      return toast.warning("未能识别到任何有效文件信息 →_→");
    }
    this.video();
    this.danmaku();
  }
  async danmaku() {
    if (!danmaku.loadLocalDm) {
      return toast.error("载入本地弹幕失败：本地弹幕组件丢失！", "本功能只能在旧版播放器使用~");
      ;
    }
    if (!this.data.xml[0] && !this.data.json[0])
      return;
    this.data.xml.forEach(async (d, i) => {
      let data = await readAs(d);
      toast("本地弹幕：" + d.name, "载入模式：" + (i || setting.danmakuContact ? "与当前弹幕合并" : "替换当前弹幕"));
      danmaku.loadLocalDm(data, Boolean(i) || setting.danmakuContact);
    });
    this.data.json.forEach(async (d, i) => {
      let data = JSON.parse(await readAs(d)) || [];
      toast("本地弹幕：" + d.name, "载入模式：" + (this.data.xml[0] || i || setting.danmakuContact ? "与当前弹幕合并" : "替换当前弹幕"));
      window.player?.setDanmaku(data, this.data.xml[0] || Boolean(i) || setting.danmakuContact);
    });
    this.offset = 0;
    if (!window.player?.offsetDanmaku)
      return toast.error("绑定键盘事件失败：弹幕偏移组件丢失！");
    else {
      toast("已绑定键盘事件", "可以通过键盘 , 和 . 两个键（即上标为 < 和 > 的两个键）提前或延后弹幕偏移，频度1秒/次");
      if (!this.keyboard) {
        this.keyboard = true;
        document.addEventListener("keydown", (ev) => {
          switch (ev.key) {
            case ",":
              window.player.offsetDanmaku(-1);
              this.offset--;
              videoFloat("弹幕偏移：", \`\${this.offset} 秒\`);
              break;
            case ".":
              window.player.offsetDanmaku(1);
              this.offset++;
              videoFloat("弹幕偏移：", \`\${this.offset} 秒\`);
              break;
            default:
              break;
          }
        });
      }
    }
  }
  video() {
    if (this.data.mp4[0]) {
      toast.warning("载入本地视频中...", "请无视控制台大量报错！");
      let video = document.querySelector("#bilibiliPlayer > div.bilibili-player-area.video-state-pause > div.bilibili-player-video-wrap > div.bilibili-player-video > video");
      video.src = URL.createObjectURL(this.data.mp4[0]);
      toast.success("本地视频：" + this.data.mp4[0].name);
      document.querySelector(".bilibili-player-video-time-total").textContent = this.time(video.duration);
    }
  }
  time(time) {
    time = Number(time) || 0;
    let s = time % 60;
    let m = (time - s) / 60;
    s = (Array(2).join("0") + s).slice(-2);
    m = m < 10 ? (Array(2).join("0") + m).slice(-2) : m;
    return \`\${m}:\${s}\`;
  }
};

// src/runtime/format/unit.ts
function unitFormat(num = 0) {
  num = 1 * num || 0;
  let unit = ["", "万", "亿"], i = unit.length - 1, dex = 1e4 ** i;
  while (dex > 1) {
    if (num >= dex) {
      num = Number((num / dex).toFixed(1));
      break;
    }
    dex = dex / 1e4;
    i--;
  }
  return num + unit[i];
}

// src/runtime/danmaku/all_danmaku.ts
var AllDanmaku = class {
  pubdate;
  today;
  time;
  arrP;
  danmaku = [];
  arrT;
  timeT;
  float;
  note;
  constructor() {
    this.note = toast.custom(0, "info", "冷却延时请尽量调大，以免短时间内大量请求被临时封端口！");
    this.float = toast.custom(0, "info", "正在尝试获取全部弹幕请耐心等待。。。");
    xhr({
      url: \`https://api.bilibili.com/x/web-interface/view?aid=\${API.aid}\`,
      responseType: "json",
      credentials: true
    }, true).then((d) => {
      this.pubdate = d.data.pubdate;
      this.pubdate = timeFormat(this.pubdate * 1e3, true).split(" ")[0];
      this.today = timeFormat(void 0, true).split(" ")[0];
      this.time = this.today;
      this.arrP = this.pubdate.split("-");
      this.danmaku = [];
      if (this.pubdate) {
        this.arrT = this.time.split("-");
        this.check();
      } else {
        return Promise.reject("获取视频上传日期数据失败，已停止~");
      }
    }).catch((e) => {
      this.floatChange("error", ["获取全弹幕失败，已停止~"], 3);
      this.noteChange("error", ["ಥ_ಥ"], 3);
      debug.error("全弹幕装填", e);
    });
    this.pubdate = new Date(2009, 0);
  }
  floatChange(type, data, delay) {
    if (this.float) {
      this.float.type = type;
      this.float.data = data;
      delay !== void 0 && (this.float.delay = delay);
    }
    switch (type) {
      case "error":
        debug.error(...data);
        break;
      case "success":
        debug.log(...data);
        break;
      case "info":
        debug.log(...data);
        break;
      case "warning":
        debug.warn(...data);
        break;
    }
  }
  noteChange(type, data, delay) {
    if (this.note) {
      this.note.type = type;
      data.forEach((d) => {
        if (this.note.data.length >= 20)
          this.note?.data.shift();
        this.note?.data.push(d);
      });
      delay !== void 0 && (this.note.delay = delay);
    }
    switch (type) {
      case "error":
        debug.error(...data);
        break;
      case "success":
        debug.log(...data);
        break;
      case "info":
        debug.log(...data);
        break;
      case "warning":
        debug.warn(...data);
        break;
    }
  }
  async init() {
    try {
      this.arrT = this.time.split("-");
      if (this.arrT[0] < this.arrP[0])
        return this.done(1);
      if (this.arrT[0] == this.arrP[0] && this.arrT[1] < this.arrP[1])
        return this.done(1);
      if (this.arrT[0] == this.arrP[0] && this.arrT[1] == this.arrP[1] && this.arrT[2] < this.arrP[2])
        return this.done(1);
      this.noteChange("info", ["正在获取 " + this.time + " 日的弹幕。。。"]);
      let Dm = await danmaku.getHistoryDanmaku(this.time);
      danmaku.sortDmById(Dm, "idStr");
      Dm.reverse();
      this.time = timeFormat(Dm[Dm.length - 1].ctime * 1e3, true).split(" ")[0];
      this.danmaku = this.danmaku.concat(Dm);
      this.floatChange("success", ["数据返回！已获取弹幕数：" + unitFormat(this.danmaku.length)]);
      this.arrT = this.time.split("-");
      if (this.pubdate != this.today)
        return this.check();
      this.done(1);
    } catch (e) {
      debug.error("全弹幕装填", e);
      if (this.danmaku[0]) {
        this.floatChange("warning", ["弹幕获取出错！", "保留并载入已获取的弹幕"]);
        this.done();
      } else {
        this.floatChange("error", ["弹幕获取出错！", "已退出！"], 3);
        this.noteChange("error", ["ಥ_ಥ"], 3);
      }
    }
  }
  async check() {
    try {
      if (this.arrT[0] < this.arrP[0])
        return this.done(1);
      if (this.arrT[0] == this.arrP[0] && this.arrT[1] < this.arrP[1])
        return this.done(1);
      if (this.arrT[0] == this.arrP[0] && this.arrT[1] == this.arrP[1] && this.arrT[2] < this.arrP[2])
        return this.done(1);
      let data = await xhr({
        url: objUrl("https://api.bilibili.com/x/v2/dm/history/index", {
          type: 1,
          oid: API.cid,
          month: this.arrT.slice(0, 2).join("-")
        }),
        credentials: true
      });
      data = jsonCheck(data).data;
      if (data && data[0]) {
        for (let i = data.length - 1; i >= 0; i--) {
          let date = data[i].split("-");
          if (date[2] < this.arrT[2]) {
            this.timeT = data[i];
            break;
          }
        }
        if (this.timeT) {
          this.time = this.timeT;
          this.timeT = void 0;
          this.noteChange("info", [\`技能冷却中。。。请稍待 \${setting.allDanmaku} 秒钟\`]);
          return setTimeout(() => this.init(), setting.allDanmaku * 1e3);
        } else {
          if (this.arrT[1] > 1) {
            this.arrT[1]--;
            this.arrT[1] = integerFormat(this.arrT[1], 2);
          } else
            this.arrT = [this.arrT[0] - 1, 12, 31];
          this.noteChange("info", [\`获取前一个月数据 \${this.arrT.slice(0, 2).join("-")} 请稍待 \${setting.allDanmaku} 秒钟\`]);
          return setTimeout(() => this.check(), setting.allDanmaku * 1e3);
        }
      } else {
        if (this.arrT[1] > 1) {
          this.arrT[1]--;
          if (this.arrT[1] < 10)
            this.arrT[1] = integerFormat(this.arrT[1], 2);
        } else
          this.arrT = [this.arrT[0] - 1, 12, 31];
        this.noteChange("info", [\`获取前一个月数据 \${this.arrT.slice(0, 2).join("-")} 请稍待 \${setting.allDanmaku} 秒钟\`]);
        return setTimeout(() => this.check(), setting.allDanmaku * 1e3);
      }
    } catch (e) {
      e = Array.isArray(e) ? e : [e];
      debug.error("全弹幕装填", e);
      if (this.danmaku[0]) {
        this.floatChange("warning", ["弹幕获取出错！", "保留并载入已获取的弹幕"]);
        this.done();
      } else {
        this.floatChange("error", ["弹幕获取出错！", "已退出！"]);
        this.noteChange("error", ["ಥ_ಥ"], 3);
      }
    }
  }
  async done(boolean) {
    try {
      this.noteChange("info", ["正在获取BAS/代码弹幕专包。。。"]);
      this.danmaku = this.danmaku.concat(await danmaku.specialDms());
    } catch (e) {
    }
    let Dm = danmaku.danmakuFormat(this.danmaku);
    if (boolean) {
      this.floatChange("success", ["全弹幕获取成功，正在装填。。。", "总弹幕量：" + unitFormat(this.danmaku.length), "同时推送至下载面板，可右键保存 π_π"], 3);
    }
    this.noteChange("info", ["执行结束~"], 3);
    window.player?.setDanmaku(Dm);
    setting.downloadOther && pushDownload({
      group: "弹幕",
      data: Dm,
      up: "全弹幕",
      down: \`N/A\`,
      callback: () => danmaku.saveDanmaku(Dm, \`[全弹幕]\${API.title || API.cid}\`)
    });
  }
};
function allDanmaku() {
  if (!uid)
    return toast.warning("请登录后使用 ಥ_ಥ");
  if (!window.player)
    return toast.warning("请在播放页面使用本功能 →_→");
  if (!window.player.setDanmaku)
    return toast.warning("内部组件丢失！", "请检查【托管原生脚本】功能是否开启！");
  new AllDanmaku();
}

// src/runtime/danmaku/danmaku.ts
var root = import_light.default.Root.fromJSON(bilibili_danmaku_default);
var danmakuType = new Proxy({}, {
  get: (t, p, r) => {
    if (!t[p]) {
      t[p] = root.lookupType(\`bilibili.\${p}\`);
    }
    return t[p];
  },
  set: (t, p, v, r) => true
});
var loadProgress = {
  get root() {
    return document.querySelector(".bilibili-player-danmaku-load-status");
  },
  _pos: 0,
  _total: 0,
  _error: 0,
  set total(v) {
    this._total = v;
    this.root && (this.root.innerHTML = \`载入弹幕数据（\${this._pos || "--"}\${this._error ? this._error : ""}/\${parseInt(this._total) || "--"}）\`);
  },
  get total() {
    return this._total;
  },
  set pos(v) {
    this._pos = v;
    this.root && (this.root.innerHTML = \`载入弹幕数据（\${this._pos || "--"}\${this._error ? this._error : ""}/\${parseInt(this._total) || "--"}）\`);
  },
  get pos() {
    return this._pos;
  },
  set error(v) {
    this._error = v;
    this.root && (this.root.innerHTML = \`载入弹幕数据（\${this._pos || "--"}\${this._error ? this._error : ""}/\${parseInt(this._total) || "--"}）\`);
  },
  get error() {
    return this._error;
  },
  clear() {
    if (this._error) {
      toast.warning("部分弹幕包丢失~", \`\${this._error}/\${parseInt(this._total)}\`);
      debug.error(\`弹幕分包：\${parseInt(this._total)}\`, \`成功：\${this._pos}\`, \`失败：\${this._error}\`);
    } else
      debug("加载弹幕成功~", \`分包总数：\${parseInt(this._total)}\`);
    this._pos = 0;
    this._total = 0;
    this._error = 0;
  }
};
var Danmaku = class {
  dmView = {};
  toXml(danmaku2) {
    let DM = Reflect.has(danmaku2[0], "idStr") ? this.danmakuFormat(danmaku2) : danmaku2;
    this.sortDmById(DM, "dmid");
    let xml = DM.reduce((s, d) => {
      s += \`<d p="\${d.stime},\${d.mode},\${d.size},\${d.color},\${d.date},\${d.class},\${d.uid},\${d.dmid}">\${d.text.replace(/[<">'&]/g, (a) => {
        return { "<": "&lt;", '"': "&quot;", ">": "&gt;", "'": "&#39;", "&": "&amp;" }[a];
      }).replace(/(\\n|\\r\\n)/g, "/n")}</d>\\r
\`;
      return s;
    }, '<?xml version="1.0" encoding="UTF-8"?><i><chatserver>chat.api.bilibili.com</chatserver><chatid>' + API.cid + "</chatid><mission>0</mission><maxlimit>99999</maxlimit><state>0</state><real_name>0</real_name><source>e-r</source>\\r\\n");
    xml += "</i>";
    var regex = /((?:[\\0-\\x08\\x0B\\f\\x0E-\\x1F\\uFFFD\\uFFFE\\uFFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))/g;
    return xml.replace(regex, "");
  }
  sortDmById(danmaku2, key) {
    let egx = /^\\d+\$/;
    for (let i = 0, d; i < danmaku2.length; i++) {
      d = danmaku2[i];
      if (!egx.test(d[key]))
        throw "请输入数字字符串";
      if (typeof d[key] !== "string")
        d[key] = String(d[key]);
      d[key] = d[key].replace(/^0+/, "");
    }
    danmaku2.sort((a, b) => this.bigInt(a[key], b[key]) ? 1 : -1);
  }
  danmakuFormat(dm) {
    if (!dm)
      return [];
    let danmaku2 = dm.map(function(v) {
      let result = {
        class: v.pool,
        color: v.color,
        date: v.ctime,
        dmid: v.idStr,
        mode: v.mode,
        size: v.fontsize,
        stime: v.progress / 1e3,
        text: v.mode != 8 && v.mode != 9 ? v.content.replace(/(\\/n|\\\\n|\\n|\\r\\n)/g, "\\n") : v.content,
        uid: v.midHash,
        weight: v.weight
      };
      if (v.action && v.action.startsWith("picture:"))
        result.html = \`<img src="//\${v.action.split(":")[1]}" style="width:auto;height:56.25px;">\`;
      if (v.styleClass !== void 0)
        result.AH = v.styleClass;
      return result;
    });
    this.sortDmById(danmaku2, "dmid");
    return danmaku2;
  }
  bigInt(num1, num2) {
    if (num1.length > num2.length)
      return true;
    else if (num1.length < num2.length)
      return false;
    else {
      for (let i = 0; i < num1.length; i++) {
        if (num1[i] > num2[i])
          return true;
        if (num1[i] < num2[i])
          return false;
      }
      return false;
    }
  }
  segDmDecode(response) {
    return danmakuType.DmSegMobileReply.decode(new Uint8Array(response)).elems;
  }
  async getSegDanmaku(aid = API.aid, cid = API.cid) {
    try {
      if (!aid || !cid)
        throw \`无法获取弹幕 aid：\${aid} cid：\${cid}\`;
      const dmMeta = await this.dmWebView(aid, cid);
      const pageSize = dmMeta.dmSge.pageSize ? dmMeta.dmSge.pageSize / 1e3 : 360;
      loadProgress.total = window.player && window.player.getDuration && window.player.getDuration() / pageSize + 1 || dmMeta.dmSge.total;
      if (aid && aid != API.aid)
        loadProgress.total = dmMeta.dmSge.total;
      let result = [];
      const req = [];
      for (let index = 1; index <= loadProgress.total; index++) {
        req.push(this.dmWebSeg(index, aid, cid));
      }
      (await Promise.all(req)).forEach((d) => result = result.concat(d));
      result = result.concat(await this.specialDms(aid, cid, dmMeta));
      dmMeta.commandDms.length > 0 && (result = result.concat(this.upHighlightDm(dmMeta.commandDms)));
      setting.commandDm && dmMeta.commandDms && Promise.resolve().then(() => {
        loadCommandDm(dmMeta.commandDms, aid, cid);
      });
      return result;
    } catch (e) {
      toast.error("加载弹幕出错~");
      debug.error("加载弹幕出错~", e);
    }
  }
  async dmWebView(aid = API.aid, cid = API.cid) {
    try {
      if (this.dmView[cid])
        return this.dmView[cid];
      const data = await xhr({
        url: objUrl("https://api.bilibili.com/x/v2/dm/web/view", {
          type: 1,
          oid: cid,
          pid: aid
        }),
        credentials: true,
        responseType: "arraybuffer"
      }, true);
      return this.dmView[cid] = danmakuType.DmWebViewReply.decode(new Uint8Array(data));
    } catch (e) {
      toast.error("加载弹幕元数据出错！");
      throw e;
    }
  }
  async dmWebSeg(i, aid = API.aid, cid = API.cid) {
    try {
      const data = await xhr({
        url: objUrl("https://api.bilibili.com/x/v2/dm/web/seg.so", {
          type: 1,
          oid: cid,
          pid: aid,
          segment_index: i
        }),
        credentials: true,
        responseType: "arraybuffer"
      });
      loadProgress.pos++;
      return this.segDmDecode(data);
    } catch (e) {
      loadProgress.error++;
      debug.error(\`加载弹幕分包 \${i} 出错\`);
      return [];
    }
  }
  async specialDms(aid = API.aid, cid = API.cid, config) {
    let result = [];
    try {
      config = config || await this.dmWebView(aid, cid);
      if (config.specialDms.length > 0) {
        loadProgress.total += config.specialDms.length;
        const data = await Promise.all(config.specialDms.reduce((s, d) => {
          s.push(this.dmSpSeg(d.replace("http:", "https:")));
          return s;
        }, []));
        data.forEach((d) => result = result.concat(d));
      }
    } catch (e) {
      debug.error("获取特殊弹幕出错~", e);
    }
    loadProgress.clear();
    return result;
  }
  async dmSpSeg(url) {
    try {
      const data = await xhr({
        url,
        responseType: "arraybuffer"
      });
      loadProgress.pos++;
      return this.segDmDecode(data);
    } catch (e) {
      loadProgress.error++;
      debug("获取特殊弹幕出错~", url, e);
      return [];
    }
  }
  upHighlightDm(dms) {
    try {
      return dms.reduce((s, d) => {
        if (d.command == "#UP#") {
          d.styleClass = "danmaku-up-icon";
          d.color = 16777215;
          d.pool = 0;
          d.fontsize = 25;
          d.ctime = new Date(d.mtime).getTime() / 1e3;
          d.mode = 1;
          d.midHash = crc32(d.mid);
        }
        return s;
      }, []);
    } catch (e) {
      debug.error("UP主高亮弹幕", e);
      return [];
    }
  }
  loadLocalDm(xml, append) {
    let doc = new DOMParser().parseFromString(xml, "application/xml");
    let dm = doc.querySelectorAll("d");
    if (dm.length == 0) {
      toast.warning("从弹幕文件中没有获取到任何弹幕！");
      return;
    }
    let danmaku2 = [];
    let attr, v, mode;
    for (let i = 0; i < dm.length; i++) {
      v = dm[i];
      attr = v.getAttribute("p").split(",");
      mode = parseInt(attr[1]);
      danmaku2[i] = {
        class: parseInt(attr[5]),
        color: parseInt(attr[3]),
        date: parseInt(attr[4]),
        dmid: attr[7],
        mode,
        size: parseInt(attr[2]),
        stime: parseFloat(attr[0]),
        text: mode != 8 && mode != 9 ? v.textContent.replace(/(\\/n|\\\\n|\\n|\\r\\n)/g, "\\n") : v.textContent,
        uid: attr[6]
      };
    }
    this.sortDmById(danmaku2, "dmid");
    if (!window.player?.setDanmaku)
      return toast.error("刷新弹幕列表失败：播放器内部调用丢失！");
    window.player?.setDanmaku(danmaku2, append);
  }
  async getHistoryDanmaku(date, cid = API.cid) {
    if (!date || !uid)
      return;
    let dm = await xhr({
      url: objUrl("https://api.bilibili.com/x/v2/dm/web/history/seg.so", {
        type: String(1),
        oid: String(cid),
        date
      }),
      responseType: "arraybuffer",
      credentials: true
    });
    return this.segDmDecode(dm);
  }
  saveDanmaku(dm, fileName) {
    let data = setting.danmakuSaveType === "xml" ? this.toXml(dm) : JSON.stringify(dm, void 0, "	");
    saveAs(data, \`\${fileName || API.title || API.cid}\${setting.danmakuSaveType === "xml" ? ".xml" : ".json"}\`);
  }
};
var danmaku = new Danmaku();
window.addEventListener("message", async (ev) => {
  if (typeof ev.data === "object") {
    if (ev.data.\$type == "onlineDanmaku") {
      if (!window.player)
        return toast.warning("请在播放页面使用本功能 →_→");
      if (!window.player.setDanmaku)
        return toast.warning("内部组件丢失！", "请检查【托管原生脚本】功能是否开启！");
      if (!ev.data.url)
        return toast.warning("请输入视频链接或参数~");
      toast.info(\`正在解析url：\${ev.data.url}\`);
      try {
        const d = await urlParam(ev.data.url, false);
        if (d.aid && d.cid) {
          toast.info("参数解析成功，正在获取弹幕数据~", d);
          debug(ev.data.url, d);
          let dm = await danmaku.getSegDanmaku(d.aid, d.cid);
          if (dm) {
            const dat = danmaku.danmakuFormat(dm);
            toast.success("获取弹幕成功~");
            window.player?.setDanmaku(dat, setting.danmakuContact);
            setting.downloadOther && pushDownload({
              group: "弹幕",
              data: dat,
              up: "在线",
              down: \`N/A\`,
              callback: () => danmaku.saveDanmaku(dat, ev.data.url)
            });
          } else {
            toast.error("获取弹幕失败，请在控制台检查原因~");
          }
        } else {
          toast.warning("提取弹幕参数失败，请检查输入~");
        }
      } catch (e) {
        toast.error("在线弹幕", e);
        debug.error("在线弹幕", e);
      }
    }
    if (typeof ev.data === "object") {
      if (ev.data.\$type == "localMedia") {
        fileRead(".mp4,.json", true).then((d) => {
          d && new LocalMedia(d);
        });
      }
    }
    if (ev.data.\$type == "allDanmaku") {
      allDanmaku();
    }
  }
});

// src/runtime/hook/xhr.ts
var rules = [];
var open = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(...rest) {
  const args = [...rest];
  args[1] && rules.forEach((d) => {
    d && d[0].every((d2) => args[1].includes(d2)) && d[1].call(this, args);
  });
  return open.call(this, ...args);
};
function xhrhook(url, modifyOpen, modifyResponse, once = true) {
  let id;
  const one = Array.isArray(url) ? url : [url];
  const two = function(args) {
    once && id && delete rules[id - 1];
    if (modifyOpen)
      try {
        modifyOpen(args);
      } catch (e) {
        debug.error("modifyOpen of xhrhook", one, e);
      }
    if (modifyResponse)
      try {
        this.addEventListener("readystatechange", () => {
          try {
            if (this.readyState === 4) {
              const response = { response: this.response, responseType: this.responseType, status: this.status, statusText: this.statusText };
              (this.responseType === "" || this.responseType === "text") && (response.responseText = this.responseText);
              (this.responseType === "" || this.responseType === "document") && (response.responseXML = this.responseXML);
              modifyResponse(response);
              Object.defineProperty(this, "response", { configurable: true, value: response.response });
              response.responseText && Object.defineProperty(this, "responseText", { configurable: true, value: response.responseText });
              response.responseXML && Object.defineProperty(this, "responseXML", { configurable: true, value: response.responseXML });
            }
          } catch (e) {
            debug.error("modifyResponse of xhrhook", one, e);
          }
        });
      } catch (e) {
        debug.error("modifyResponse of xhrhook", one, e);
      }
  };
  return id = rules.push([one, two]);
}
function xhrhookAsync(url, condition, modifyResponse, once = true) {
  let id, temp2;
  const one = Array.isArray(url) ? url : [url];
  const two = function(args) {
    try {
      if (!condition || condition(args)) {
        this.xhrhookTimes = this.xhrhookTimes ? this.xhrhookTimes++ : 1;
        id && (temp2 = rules[id - 1]);
        delete rules[id - 1];
        this.send = () => true;
        (!args[2] || args[2] === true) && (this.timeout = 0);
        const et = setInterval(() => {
          this.dispatchEvent(new ProgressEvent("progress"));
        }, 50);
        Object.defineProperty(this, "status", { configurable: true, value: 200 });
        Object.defineProperty(this, "readyState", { configurable: true, value: 2 });
        this.dispatchEvent(new ProgressEvent("readystatechange"));
        modifyResponse ? modifyResponse(args, this.responseType).then((d) => {
          clearInterval(et);
          if (d) {
            Object.defineProperty(this, "response", { configurable: true, value: d.response });
            d.responseType && Object.defineProperty(this, "responseType", { configurable: true, value: d.responseType });
            d.responseText && Object.defineProperty(this, "responseText", { configurable: true, value: d.responseText });
            d.responseXML && Object.defineProperty(this, "responseXML", { configurable: true, value: d.responseXML });
            !this.responseURL && Object.defineProperty(this, "responseURL", { configurable: true, value: args[1] });
            Object.defineProperty(this, "readyState", { configurable: true, value: 4 });
            this.dispatchEvent(new ProgressEvent("readystatechange"));
            this.dispatchEvent(new ProgressEvent("load"));
            this.dispatchEvent(new ProgressEvent("loadend"));
          }
        }).catch((d) => {
          if (this.xhrhookTimes === 1) {
            if (d && d.response) {
              Object.defineProperty(this, "response", { configurable: true, value: d.response });
              d.responseType && Object.defineProperty(this, "responseType", { configurable: true, value: d.responseType });
              d.responseText && Object.defineProperty(this, "responseText", { configurable: true, value: d.responseText });
              d.responseXML && Object.defineProperty(this, "responseXML", { configurable: true, value: d.responseXML });
              !this.responseURL && Object.defineProperty(this, "responseURL", { configurable: true, value: args[1] });
              Object.defineProperty(this, "readyState", { configurable: true, value: 4 });
              this.dispatchEvent(new ProgressEvent("readystatechange"));
              this.dispatchEvent(new ProgressEvent("load"));
              this.dispatchEvent(new ProgressEvent("loadend"));
            } else {
              this.dispatchEvent(new ProgressEvent("error"));
            }
          } else {
            this.xhrhookTimes--;
          }
          debug.error("modifyResponse of xhrhookasync", one, d);
        }).finally(() => {
          clearInterval(et);
          !once && (id = rules.push(temp2));
        }) : (this.abort(), !once && (id = rules.push(temp2)));
        clearInterval(et);
      }
    } catch (e) {
      debug.error("condition of xhrhook", one, e);
    }
  };
  return id = rules.push([one, two]);
}
function removeXhrhook(id) {
  id >= 0 && delete rules[id - 1];
}

// src/runtime/danmaku/history_danmaku.ts
function historyDanmaku() {
  const id = xhrhookAsync("history?type=", (args) => {
    const param2 = urlObj(args[1]);
    if (!window.player?.setDanmaku) {
      removeXhrhook(id);
      return false;
    } else if (!param2.date)
      return false;
    xhr({
      url: \`https://api.bilibili.com/x/v2/dm/web/history/seg.so?type=1&oid=\${API.cid}&date=\${param2.date}\`,
      responseType: "arraybuffer",
      credentials: true
    }).then((seg) => {
      let dm = danmaku.danmakuFormat(danmaku.segDmDecode(seg));
      window.player?.setDanmaku(dm);
      setting.downloadOther && pushDownload({
        group: "弹幕",
        data: dm,
        up: "历史",
        down: \`N/A\`,
        callback: () => danmaku.saveDanmaku(dm, \`\${API.title || API.cid}\`)
      });
    }).catch((e) => {
      toast.error("载入历史弹幕失败", "请尝试刷新页面");
      toast.error(e);
    });
    return true;
  }, void 0, false);
}

// src/runtime/danmaku/bilibili_broadcast.json
var bilibili_broadcast_default = {
  nested: {
    bilibili: {
      nested: {
        broadcast: {
          nested: {
            v1: {
              nested: {
                AuthReq: {
                  fields: {
                    guid: {
                      type: "string",
                      id: 1
                    },
                    connId: {
                      type: "string",
                      id: 2
                    },
                    lastMsgId: {
                      type: "int64",
                      id: 3
                    }
                  }
                },
                AuthResp: {
                  fields: {}
                },
                HeartbeatReq: {
                  fields: {}
                },
                HeartbeatResp: {
                  fields: {}
                },
                TargetPath: {
                  fields: {
                    targetPaths: {
                      rule: "repeated",
                      type: "string",
                      id: 1
                    }
                  }
                },
                MessageAckReq: {
                  fields: {
                    ackId: {
                      type: "int64",
                      id: 1
                    },
                    ackOrigin: {
                      type: "string",
                      id: 2
                    },
                    targetPath: {
                      type: "string",
                      id: 3
                    }
                  }
                },
                Subscribe: {
                  fields: {
                    type: {
                      type: "string",
                      id: 1
                    },
                    targetPaths: {
                      rule: "repeated",
                      type: "string",
                      id: 2
                    }
                  }
                },
                Status: {
                  fields: {
                    code: {
                      type: "int32",
                      id: 1
                    },
                    message: {
                      type: "string",
                      id: 2
                    },
                    details: {
                      rule: "repeated",
                      type: "google.protobuf.Any",
                      id: 3
                    }
                  }
                },
                FrameOption: {
                  fields: {
                    messageId: {
                      type: "int64",
                      id: 1
                    },
                    sequence: {
                      type: "int64",
                      id: 2
                    },
                    isAck: {
                      type: "bool",
                      id: 3
                    },
                    status: {
                      type: "Status",
                      id: 4
                    },
                    ackOrigin: {
                      type: "string",
                      id: 5
                    }
                  }
                },
                BroadcastFrame: {
                  fields: {
                    options: {
                      type: "FrameOption",
                      id: 1
                    },
                    targetPath: {
                      type: "string",
                      id: 2
                    },
                    body: {
                      type: "google.protobuf.Any",
                      id: 3
                    }
                  }
                },
                RoomJoinEvent: {
                  fields: {}
                },
                RoomLeaveEvent: {
                  fields: {}
                },
                RoomOnlineEvent: {
                  fields: {
                    online: {
                      type: "int32",
                      id: 1
                    },
                    allOnline: {
                      type: "int32",
                      id: 2
                    }
                  }
                },
                RoomMessageEvent: {
                  fields: {
                    targetPath: {
                      type: "string",
                      id: 1
                    },
                    body: {
                      type: "google.protobuf.Any",
                      id: 2
                    }
                  }
                },
                RoomErrorEvent: {
                  fields: {
                    status: {
                      type: "Status",
                      id: 1
                    }
                  }
                },
                RoomReq: {
                  oneofs: {
                    event: {
                      oneof: [
                        "join",
                        "leave",
                        "online",
                        "msg"
                      ]
                    }
                  },
                  fields: {
                    id: {
                      type: "string",
                      id: 1
                    },
                    join: {
                      type: "RoomJoinEvent",
                      id: 2
                    },
                    leave: {
                      type: "RoomLeaveEvent",
                      id: 3
                    },
                    online: {
                      type: "RoomOnlineEvent",
                      id: 4
                    },
                    msg: {
                      type: "RoomMessageEvent",
                      id: 5
                    }
                  }
                },
                RoomResp: {
                  oneofs: {
                    event: {
                      oneof: [
                        "join",
                        "leave",
                        "online",
                        "msg",
                        "err"
                      ]
                    }
                  },
                  fields: {
                    id: {
                      type: "string",
                      id: 1
                    },
                    join: {
                      type: "RoomJoinEvent",
                      id: 2
                    },
                    leave: {
                      type: "RoomLeaveEvent",
                      id: 3
                    },
                    online: {
                      type: "RoomOnlineEvent",
                      id: 4
                    },
                    msg: {
                      type: "RoomMessageEvent",
                      id: 5
                    },
                    err: {
                      type: "RoomErrorEvent",
                      id: 6
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    google: {
      nested: {
        protobuf: {
          nested: {
            Any: {
              fields: {
                type_url: {
                  type: "string",
                  id: 1
                },
                value: {
                  type: "bytes",
                  id: 2
                }
              }
            },
            Empty: {
              fields: {}
            }
          }
        }
      }
    }
  }
};

// src/runtime/danmaku/bilibili_broadcast_danmaku.json
var bilibili_broadcast_danmaku_default = {
  nested: {
    bilibili: {
      nested: {
        broadcast: {
          nested: {
            message: {
              nested: {
                main: {
                  nested: {
                    DanmakuElem: {
                      fields: {
                        id: {
                          type: "int64",
                          id: 1
                        },
                        progress: {
                          type: "int32",
                          id: 2
                        },
                        mode: {
                          type: "int32",
                          id: 3
                        },
                        fontsize: {
                          type: "int32",
                          id: 4
                        },
                        color: {
                          type: "uint32",
                          id: 5
                        },
                        midHash: {
                          type: "string",
                          id: 6
                        },
                        content: {
                          type: "string",
                          id: 7
                        },
                        ctime: {
                          type: "int64",
                          id: 8
                        },
                        action: {
                          type: "string",
                          id: 9
                        },
                        pool: {
                          type: "int32",
                          id: 10
                        },
                        idStr: {
                          type: "string",
                          id: 11
                        }
                      }
                    },
                    DanmukuEvent: {
                      fields: {
                        elems: {
                          rule: "repeated",
                          type: "DanmakuElem",
                          id: 1
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

// src/runtime/danmaku/live_danmaku.ts
var import_light2 = __toESM(require_light());
var root2 = import_light2.default.Root.fromJSON(bilibili_broadcast_default);
var danmakuElem = import_light2.default.Root.fromJSON(bilibili_broadcast_danmaku_default).lookupType("bilibili.broadcast.message.main.DanmukuEvent");
var sequence = 1;
var message = {
  msgType: root2.lookupType("BroadcastFrame"),
  targetPathType: root2.lookupType("TargetPath"),
  beatReqType: root2.lookupType("HeartbeatReq"),
  ackReqType: root2.lookupType("MessageAckReq"),
  anyType: root2.lookupType("google.protobuf.Any"),
  roomRequest: root2.lookupType("RoomReq"),
  roomResp: root2.lookupType("RoomResp"),
  roomEvents: {
    join: root2.lookupType("RoomJoinEvent"),
    leave: root2.lookupType("RoomLeaveEvent"),
    online: root2.lookupType("RoomOnlineEvent")
  }
};
var targetPath = {
  "AUTH": "/bilibili.broadcast.v1.Broadcast/Auth",
  "HEARTBEAT": "/bilibili.broadcast.v1.Broadcast/Heartbeat",
  "SUBSCRIBE": "/bilibili.broadcast.v1.Broadcast/Subscribe",
  "UNSUBSCRIBE": "/bilibili.broadcast.v1.Broadcast/Unsubscribe",
  "MSG_ACK": "/bilibili.broadcast.v1.Broadcast/MessageAck",
  "ENTER": "/bilibili.broadcast.v1.BroadcastRoom/Enter",
  "ROOMREQ": "/bilibili.broadcast.v1.RoomReq",
  "ROOMRES": "/bilibili.broadcast.v1.RoomResp",
  "AUTHREQ": "/bilibili.broadcast.v1.AuthReq",
  "TARGETPATH": "/bilibili.broadcast.v1.TargetPath",
  "HEARTBEATRES": "/bilibili.broadcast.v1.HeartbeatResp",
  "MSG_ACK_REQ": "/bilibili.broadcast.v1.MessageAckReq"
};
var utils = {
  encodeAny: function(body, encoder2, url) {
    return url = "type.googleapis.com" + url, message.anyType.create({
      type_url: url,
      value: encoder2.encode(body).finish()
    });
  },
  toBuffer: function(body, encoder2) {
    if (encoder2.verify(body))
      return "";
    let t = encoder2.create(body);
    return encoder2.encode(t).finish();
  },
  toMsg: function(body, decoder) {
    let t;
    try {
      t = decoder.toObject(decoder.decode(new Uint8Array(body)));
    } catch (i) {
      debug.error(i);
    }
    return t;
  }
};
var encoder = new TextEncoder();
var liveChatOld;
var liveChat;
var wsHookRunOnce = true;
var wssend = WebSocket.prototype.send;
function initLiveChat() {
  liveChat = new WebSocket("wss://broadcast.chat.bilibili.com:7826/sub?platform=web", "proto");
  liveChat.binaryType = "arraybuffer";
  liveChat.beatTimer = 0;
  liveChat.msgFlag = {};
  liveChat.socketKey = "video://" + API.aid + "/" + API.cid;
  API.pgc && (liveChat.socketKey += "?sid=" + API.__INITIAL_STATE__.ssId + "&epid=" + API.__INITIAL_STATE__.epId);
  liveChat.sendMsg = function(body, encoder2) {
    void 0 === encoder2 && (encoder2 = message.msgType);
    this.send(utils.toBuffer(body, encoder2));
  };
  liveChat.auth = function() {
    this.sendMsg({
      options: {
        sequence: ++sequence
      },
      targetPath: targetPath.AUTH,
      body: utils.encodeAny(message.anyType.create({}), message.anyType, targetPath.AUTHREQ)
    });
  };
  liveChat.onAuthed = function(t) {
    this.authed = true;
    this.subscribeBase(["bilibili.broadcast.message.main.DanmukuEvent"]);
    this.roomBase(liveChat.socketKey);
  };
  liveChat.subscribeBase = function(t, e) {
    if (void 0 === e && (e = true), t && t.length) {
      var i = ++sequence;
      this.msgFlag[i] = t, this.sendMsg({
        options: {
          sequence: i
        },
        targetPath: e ? targetPath.SUBSCRIBE : targetPath.UNSUBSCRIBE,
        body: utils.encodeAny(message.targetPathType.create({
          targetPaths: t
        }), message.targetPathType, targetPath.TARGETPATH)
      });
    }
  };
  liveChat.roomBase = function(t) {
    let event = {
      id: t,
      join: message.roomEvents.join.create({})
    };
    var i = ++sequence;
    this.msgFlag[i] = t, this.sendMsg({
      options: {
        sequence: i
      },
      targetPath: targetPath.ENTER,
      body: utils.encodeAny(message.roomRequest.create(event), message.roomRequest, targetPath.ROOMREQ)
    });
  };
  liveChat.onRoomMsg = function(t) {
    var e, i;
    if (null === (e = t.body) || void 0 === e ? void 0 : e.value) {
      var o = utils.toMsg(t.body.value, message.roomResp);
      if (null === (i = o.msg) || void 0 === i ? void 0 : i.targetPath) {
        var r = utils.toMsg(o.msg.body.value, danmakuElem);
        r.elems.forEach(function(v) {
          liveChatOld.onmessage({
            data: liveChatOld.convertToArrayBuffer({
              cmd: "DM",
              info: [[v.progress / 1e3, v.mode, v.fontsize, v.color, v.ctime, "", v.pool, v.midHash, v.idStr].join(","), v.content]
            }, 5)
          });
        });
      }
    }
  };
  liveChat.heartBeat = function() {
    var i = this;
    this.beatTimer && clearTimeout(this.beatTimer);
    this.beatTimer = window.setTimeout(function() {
      if (i.readyState === 1) {
        i.sendMsg({
          options: {
            sequence: ++sequence
          },
          targetPath: targetPath.HEARTBEAT,
          body: utils.encodeAny(message.beatReqType.create({}), message.beatReqType, targetPath.HEARTBEATRES)
        });
        i.heartBeat();
      }
    }, 1e3 * 20);
  };
  liveChat.onopen = function() {
    this.auth();
  };
  liveChat.onclose = function() {
    if (liveChatOld.readyState === 1) {
      initLiveChat();
    } else {
      this.beatTimer && clearTimeout(this.beatTimer);
    }
  };
  liveChat.onmessage = function(i) {
    var t, a = utils.toMsg(i.data, message.msgType);
    if (this.heartBeat(), a) {
      if (null == a ? void 0 : a.targetPath)
        switch (a.targetPath) {
          case targetPath.AUTH:
            this.onAuthed(a);
            break;
          case targetPath.SUBSCRIBE:
            break;
          case targetPath.UNSUBSCRIBE:
            break;
          case targetPath.HEARTBEAT:
            break;
          case targetPath.ENTER:
            this.onRoomMsg(a);
            break;
          default:
        }
      delete this.msgFlag[null === (t = a.options) || void 0 === t ? void 0 : t.sequence];
    }
  };
}
function liveDanmaku() {
  WebSocket.prototype.send = function(...arg) {
    if (wsHookRunOnce && this.url == "wss://broadcast.chat.bilibili.com:4095/sub") {
      liveChatOld = this;
      liveChatOld.convertToArrayBuffer = function(body, option) {
        let header2 = [{ "name": "Header Length", "key": "headerLen", "qg": 2, "offset": 4, "value": 16 }, { "name": "Protocol Version", "key": "ver", "qg": 2, "offset": 6, "value": 1 }, { "name": "Operation", "key": "op", "qg": 4, "offset": 8, "value": option }, { "name": "Sequence Id", "key": "seq", "qg": 4, "offset": 12, "value": 1 }];
        let headerBuf = new ArrayBuffer(16);
        let viewer = new DataView(headerBuf, 0);
        let bodyBuf = encoder.encode(JSON.stringify(body));
        viewer.setInt32(0, 16 + bodyBuf.byteLength);
        header2.forEach(function(b) {
          4 === b.qg ? viewer.setInt32(b.offset, b.value) : 2 === b.qg && viewer.setInt16(b.offset, b.value);
        });
        function mergeArrayBuffer(headerBuf2, bodyBuf2) {
          headerBuf2 = new Uint8Array(headerBuf2);
          bodyBuf2 = new Uint8Array(bodyBuf2);
          var d = new Uint8Array(headerBuf2.byteLength + bodyBuf2.byteLength);
          d.set(headerBuf2, 0);
          d.set(bodyBuf2, headerBuf2.byteLength);
          return d.buffer;
        }
        return mergeArrayBuffer(headerBuf, bodyBuf);
      };
      let onclose = liveChatOld.onclose;
      liveChatOld.onclose = function() {
        wsHookRunOnce = true;
        clearTimeout(liveChat.beatTimer);
        liveChat.close();
        onclose.call(this);
      };
      wsHookRunOnce = false;
      initLiveChat();
    }
    wssend.call(this, ...arg);
  };
}

// src/runtime/danmaku/protobuf_danmaku.ts
function loadDanmakuEngine() {
  if (setting.protobufDanmaku) {
    let workerPostMsg = Worker.prototype.postMessage;
    let list_so;
    Worker.prototype.postMessage = function(aMessage, transferList) {
      if (aMessage.url && aMessage.url.includes("list.so")) {
        const obj = urlObj(aMessage.url);
        list_so = this;
        let triggerOnMsg = (danmaku2, loadTime, parseTime) => list_so.onmessage({
          data: {
            code: 0,
            danmakuArray: danmaku2,
            loadTime,
            parseTime,
            sendTip: "",
            state: 0,
            textSide: "",
            total: danmaku2.length.toString()
          }
        });
        let loadDanmaku = (loadTime) => danmaku.getSegDanmaku(void 0, obj.oid).then((Segments) => {
          loadTime = new Date() - loadTime;
          let parseTime = new Date();
          let Dm = danmaku.danmakuFormat(Segments);
          parseTime = new Date() - parseTime;
          triggerOnMsg(Dm, loadTime, parseTime);
          setting.downloadOther && pushDownload({
            group: "弹幕",
            data: Dm,
            up: "当前",
            down: \`N/A\`,
            callback: () => danmaku.saveDanmaku(Dm, \`\${API.title || API.cid}\`)
          });
        });
        loadDanmaku(new Date());
      } else {
        workerPostMsg.call(this, aMessage, transferList);
      }
    };
  }
  historyDanmaku();
  liveDanmaku();
}

// src/runtime/hook/keymap.ts
var bindMap = {};
var isTyping = () => {
  const { activeElement } = document;
  if (!activeElement) {
    return false;
  }
  if (activeElement.hasAttribute("contenteditable")) {
    return true;
  }
  return ["input", "textarea"].includes(activeElement.nodeName.toLowerCase());
};
doWhile(() => document.body, (d) => {
  d.addEventListener("keydown", (e) => {
    if (isTyping())
      return;
    const key = e.key.toLowerCase();
    e.key && bindMap[key] && bindMap[key].forEach((d2) => {
      let disable = d2.disable;
      Number(d2.altKey) ^ Number(e.altKey) && (disable = true);
      Number(d2.ctrlKey) ^ Number(e.ctrlKey) && (disable = true);
      Number(d2.metaKey) ^ Number(e.metaKey) && (disable = true);
      Number(d2.repeat) ^ Number(e.repeat) && (disable = true);
      Number(d2.shiftKey) ^ Number(e.shiftKey) && (disable = true);
      try {
        !disable && d2.callback();
      } catch (e2) {
        debug.error("keymap.js", e2);
      }
    });
  });
});
function bindKeyMap(key, callback, special = {}) {
  const keyl = key.toLowerCase();
  const map = Object.assign(special, { callback, disable: false });
  bindMap[keyl] ? bindMap[keyl].push(map) : bindMap[keyl] = [map];
  return function changeKeyMap(disable) {
    if (arguments.length) {
      map.disable = disable;
    } else {
      map.disable = !map.disable;
    }
  };
}

// src/runtime/player/player_key_map.ts
function playerKeyMap() {
  bindKeyMap("F", () => {
    document.querySelector(".icon-24fullscreen")?.click();
  });
  bindKeyMap("D", () => {
    document.querySelector(".bilibili-player-video-btn-danmaku")?.click();
  });
  bindKeyMap("[", () => {
    window.player.prev();
  });
  bindKeyMap("]", () => {
    window.player.next();
  });
  bindKeyMap("enter", () => {
    document.querySelector(".bilibili-player-video-danmaku-input")?.select();
  });
  bindKeyMap("V", () => {
    let video = document.querySelector("#bilibiliPlayer .bilibili-player-video video");
    if (video) {
      let filter = video.style.filter;
      if (filter.includes("contrast")) {
        filter = filter.replace("contrast(1)", "");
        setting.videoDisableAA = false;
      } else {
        filter += "contrast(1)";
        setting.videoDisableAA = true;
      }
      video.style.filter = filter;
    }
  });
}

// src/runtime/player/media_meta.ts
var temp;
function mediaSession(data) {
  Promise.resolve().then(() => window.GrayManager.setActionHandler());
  const check2 = JSON.stringify(data);
  if (temp === check2)
    return;
  temp = check2;
  if (!navigator.mediaSession.metadata)
    navigator.mediaSession.metadata = new MediaMetadata({ ...data });
  else {
    navigator.mediaSession.metadata.title = data.title;
    navigator.mediaSession.metadata.artist = data.artist;
    navigator.mediaSession.metadata.album = data.album;
    navigator.mediaSession.metadata.artwork = data.artwork;
  }
}
function setMediaSession() {
  const epid = API.epid;
  const aid = API.aid;
  xhr({
    url: \`https://api.bilibili.com/x/article/cards?ids=av\${aid}\`,
    responseType: "json"
  }, true).then((d) => {
    if (d.data[\`av\${aid}\`]) {
      mediaSession({
        title: d.data[\`av\${aid}\`].title,
        artist: d.data[\`av\${aid}\`].owner.name,
        album: epid ? \`ep\${epid}\` : \`av\${aid}\`,
        artwork: [
          { src: d.data[\`av\${aid}\`].pic }
        ]
      });
      API.cover = d.data[\`av\${aid}\`].pic;
      API.title = d.data[\`av\${aid}\`].title;
    }
  }).catch((e) => {
    debug.error("MediaSession", e);
  });
}

// src/runtime/player/automate.ts
function bofqiToView() {
  let str = [".bangumi_player", "#bofqi", "#bilibiliPlayer"];
  let node2 = str.reduce((s, d) => {
    s = s || document.querySelector(d);
    return s;
  }, document.querySelector("#__bofqi"));
  node2 && node2.scrollIntoView({ behavior: "smooth", block: "center" });
}
function automate() {
  switchVideo(() => {
    setting.automate.webFullScreen && doWhile(() => document.querySelector(".bilibili-player-iconfont.bilibili-player-iconfont-web-fullscreen.icon-24webfull.player-tooltips-trigger"), () => document.querySelector(".bilibili-player-video-web-fullscreen").click());
    setting.automate.noDanmaku && doWhile(() => document.querySelector(".bilibili-player-video-btn.bilibili-player-video-btn-danmaku"), (d) => {
      !document.querySelector(".bilibili-player-video-btn.bilibili-player-video-btn-danmaku.video-state-danmaku-off") && d.click();
    });
    setting.videoDisableAA && doWhile(() => document.querySelector("#bilibiliPlayer .bilibili-player-video video"), (d) => d.style.filter += "contrast(1)");
    setTimeout(() => {
      setting.automate.showBofqi && bofqiToView();
    }, 500);
    setMediaSession();
  });
  setting.automate.danmakuFirst && sessionStorage2.setItem("player_last_filter_tab_info", 4);
  let bilibili_player_settings = localStorage.getItem("bilibili_player_settings");
  if (bilibili_player_settings) {
    if (bilibili_player_settings.video_status?.autopart !== "") {
      GM.setValue("bilibili_player_settings", bilibili_player_settings);
    }
  } else {
    if (GM_getValue) {
      const d = GM_getValue("bilibili_player_settings");
      d && localStorage.setItem("bilibili_player_settings", d);
    } else {
      GM.getValue("bilibili_player_settings").then((d) => {
        d && localStorage.setItem("bilibili_player_settings", d);
      });
    }
  }
  if (setting.automate.videospeed) {
    if (GM_getValue) {
      const videospeed = GM_getValue("videospeed");
      if (videospeed) {
        let setting2 = sessionStorage2.getItem("bilibili_player_settings");
        setting2 ? setting2.video_status ? setting2.video_status.videospeed = videospeed : setting2.video_status = { videospeed } : setting2 = { video_status: { videospeed } };
        sessionStorage2.setItem("bilibili_player_settings", setting2);
      }
    } else {
      GM.getValue("videospeed").then((videospeed) => {
        if (videospeed) {
          let setting2 = sessionStorage2.getItem("bilibili_player_settings");
          setting2 ? setting2.video_status ? setting2.video_status.videospeed = videospeed : setting2.video_status = { videospeed } : setting2 = { video_status: { videospeed } };
          sessionStorage2.setItem("bilibili_player_settings", setting2);
        }
      });
    }
    switchVideo(() => {
      doWhile(() => document.querySelector("#bofqi")?.querySelector("video"), (d) => {
        d.addEventListener("ratechange", (e) => {
          GM.setValue("videospeed", e.target.playbackRate || 1);
        });
      });
    });
  }
}

// src/runtime/player/bgray_btn.html
var bgray_btn_default = '<style type="text/css">\\r\\n    .movie_play {\\r\\n        overflow: visible;\\r\\n    }\\r\\n\\r\\n    .movie_play .bgray-btn-wrap {\\r\\n        top: -10px;\\r\\n    }\\r\\n\\r\\n    #bofqi {\\r\\n        box-shadow: 0 0 0;\\r\\n    }\\r\\n\\r\\n    .player-wrapper {\\r\\n        position: relative;\\r\\n    }\\r\\n\\r\\n    .player-fullscreen-fix {\\r\\n        position: fixed;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        margin: 0;\\r\\n        padding: 0;\\r\\n        width: 100%;\\r\\n        height: 100%;\\r\\n    }\\r\\n\\r\\n    .player-fullscreen-fix #bofqi .player {\\r\\n        position: fixed !important;\\r\\n        border-radius: 0;\\r\\n        z-index: 100000 !important;\\r\\n        left: 0;\\r\\n        top: 0;\\r\\n        width: 100% !important;\\r\\n        height: 100% !important;\\r\\n    }\\r\\n\\r\\n    .bgray-btn-wrap {\\r\\n        position: absolute;\\r\\n        top: 10px;\\r\\n        left: 50%;\\r\\n        margin-left: 490px;\\r\\n        width: 70px;\\r\\n        height: 200px;\\r\\n    }\\r\\n\\r\\n    .widescreen .bgray-btn-wrap {\\r\\n        margin-left: 580px;\\r\\n    }\\r\\n\\r\\n    .bgray-btn {\\r\\n        transition: all 0.3s;\\r\\n        cursor: pointer;\\r\\n        margin: 10px 0;\\r\\n        background-color: #fff;\\r\\n        text-align: center;\\r\\n        padding: 7px 5px;\\r\\n        display: block;\\r\\n        left: 100%;\\r\\n        font-size: 12px;\\r\\n        line-height: 12px;\\r\\n        margin-left: 10px;\\r\\n        width: 20px;\\r\\n        border-radius: 4px;\\r\\n        border: 1px solid #e5e9ef;\\r\\n        color: #99a2aa;\\r\\n    }\\r\\n\\r\\n    .bgray-btn-feedback {\\r\\n        height: 72px;\\r\\n        margin-bottom: 5px;\\r\\n    }\\r\\n\\r\\n    .bgray-btn-help {\\r\\n        height: 24px;\\r\\n        margin-top: 5px;\\r\\n    }\\r\\n\\r\\n    .bgray-btn:hover {\\r\\n        color: #6d757a;\\r\\n        border-color: #6d757a;\\r\\n    }\\r\\n\\r\\n    .bgray-btn.player-feedback-disable {\\r\\n        color: #ccd0d7\\r\\n    }\\r\\n\\r\\n    .bgray-btn.player-feedback-disable:hover {\\r\\n        color: #ccd0d7;\\r\\n        border-color: #ccd0d7;\\r\\n    }\\r\\n\\r\\n    .bgray-btn.player-feedback-disable {\\r\\n        color: #ccd0d7\\r\\n    }\\r\\n\\r\\n    .bgray-btn.player-feedback-disable:hover {\\r\\n        color: #ccd0d7;\\r\\n        border-color: #ccd0d7;\\r\\n    }\\r\\n\\r\\n    .bgray-btn.active {\\r\\n        cursor: default;\\r\\n        color: #00a1d6;\\r\\n        border-color: #00a1d6;\\r\\n    }\\r\\n\\r\\n    .bgray-line {\\r\\n        display: none;\\r\\n        width: 42px;\\r\\n        margin: 0 auto;\\r\\n        border-bottom: 1px solid #e5e9ef;\\r\\n    }\\r\\n\\r\\n    .bgray-btn {\\r\\n        display: none;\\r\\n    }\\r\\n\\r\\n    .bgray-btn.show {\\r\\n        display: block;\\r\\n    }\\r\\n\\r\\n    @media screen and (min-width: 1400px) {\\r\\n        .bgray-btn-wrap {\\r\\n            margin-left: 580px;\\r\\n        }\\r\\n    }\\r\\n\\r\\n    .bgray-btn.happyfoolsday {\\r\\n        line-height: 13px;\\r\\n        background-color: #00a1d6;\\r\\n        border-color: #00a1d6;\\r\\n        color: #fff;\\r\\n    }\\r\\n\\r\\n    .bgray-btn.happyfoolsday:hover {\\r\\n        background-color: #00b5e5;\\r\\n        border-color: #00b5e5;\\r\\n        color: #fff;\\r\\n    }\\r\\n</style>';

// src/runtime/format/cht_2_chs.ts
var aTC2SC = {
  "以功覆過": "以功复过",
  "侔德覆載": "侔德复载",
  "傷亡枕藉": "伤亡枕借",
  "出醜狼藉": "出丑狼借",
  "反反覆覆": "反反复复",
  "名覆金甌": "名复金瓯",
  "情有獨鍾": "情有独锺",
  "文錦覆阱": "文锦复阱",
  "於呼哀哉": "於呼哀哉",
  "旋乾轉坤": "旋乾转坤",
  "朝乾夕惕": "朝乾夕惕",
  "狐藉虎威": "狐借虎威",
  "瞭若指掌": "了若指掌",
  "老態龍鍾": "老态龙锺",
  "藉箸代籌": "借箸代筹",
  "藉草枕塊": "借草枕块",
  "藉藉无名": "藉藉无名",
  "衹見樹木": "只见树木",
  "覆蕉尋鹿": "复蕉寻鹿",
  "覆鹿尋蕉": "复鹿寻蕉",
  "覆鹿遺蕉": "复鹿遗蕉",
  "買臣覆水": "买臣复水",
  "踅門瞭戶": "踅门了户",
  "雁杳魚沈": "雁杳鱼沉",
  "顛乾倒坤": "颠乾倒坤",
  "乾清宮": "乾清宫",
  "乾盛世": "乾盛世",
  "八濛山": "八濛山",
  "千鍾粟": "千锺粟",
  "尼乾陀": "尼乾陀",
  "張法乾": "张法乾",
  "於世成": "於世成",
  "於仲完": "於仲完",
  "於其一": "於其一",
  "於勇明": "於勇明",
  "於崇文": "於崇文",
  "於忠祥": "於忠祥",
  "於惟一": "於惟一",
  "於梨華": "於梨华",
  "於清言": "於清言",
  "於竹屋": "於竹屋",
  "於陵子": "於陵子",
  "李乾德": "李乾德",
  "李澤鉅": "李泽钜",
  "李鍊福": "李链福",
  "李鍾郁": "李锺郁",
  "樊於期": "樊於期",
  "藉寇兵": "借寇兵",
  "覆醬瓿": "复酱瓿",
  "角徵羽": "角徵羽",
  "貂覆額": "貂复额",
  "郭子乾": "郭子乾",
  "錢鍾書": "钱锺书",
  "鍾萬梅": "锺万梅",
  "鍾重發": "锺重发",
  "麼些族": "麽些族",
  "黄鍾公": "黄锺公",
  "上鍊": "上链",
  "么麼": "幺麽",
  "么麽": "幺麽",
  "乾元": "乾元",
  "乾卦": "乾卦",
  "乾嘉": "乾嘉",
  "乾圖": "乾图",
  "乾坤": "乾坤",
  "乾宅": "乾宅",
  "乾斷": "乾断",
  "乾旦": "乾旦",
  "乾曜": "乾曜",
  "乾紅": "乾红",
  "乾綱": "乾纲",
  "乾縣": "乾县",
  "乾象": "乾象",
  "乾造": "乾造",
  "乾道": "乾道",
  "乾陵": "乾陵",
  "乾隆": "乾隆",
  "家俱": "家具",
  "傢具": "家具",
  "傢俱": "家具",
  "凌藉": "凌借",
  "函覆": "函复",
  "反覆": "反复",
  "哪吒": "哪吒",
  "哪咤": "哪吒",
  "回覆": "回复",
  "射覆": "射复",
  "幺麼": "幺麽",
  "康乾": "康乾",
  "彷彿": "仿佛",
  "徵弦": "徵弦",
  "徵絃": "徵弦",
  "徵聲": "徵声",
  "徵調": "徵调",
  "徵音": "徵音",
  "憑藉": "凭借",
  "手鍊": "手链",
  "拉鍊": "拉链",
  "拜覆": "拜复",
  "於乎": "於乎",
  "於倫": "於伦",
  "於則": "於则",
  "於單": "於单",
  "於坦": "於坦",
  "於戲": "於戏",
  "於敖": "於敖",
  "於琳": "於琳",
  "於穆": "於穆",
  "於菟": "於菟",
  "於邑": "於邑",
  "明瞭": "明了",
  "明覆": "明复",
  "木吒": "木吒",
  "木咤": "木吒",
  "沈沒": "沉没",
  "沈積": "沉积",
  "沈船": "沉船",
  "沈默": "沉默",
  "流徵": "流徵",
  "滑藉": "滑借",
  "牴牾": "抵牾",
  "牴觸": "抵触",
  "甚鉅": "甚钜",
  "申覆": "申复",
  "畢昇": "毕昇",
  "發覆": "发复",
  "瞭如": "了如",
  "瞭然": "了然",
  "瞭解": "了解",
  "示覆": "示复",
  "禀覆": "禀复",
  "答覆": "答复",
  "篤麼": "笃麽",
  "籌畫": "筹划",
  "素藉": "素借",
  "茵藉": "茵借",
  "萬鍾": "万锺",
  "蒜薹": "蒜薹",
  "蕓薹": "芸薹",
  "蕩覆": "荡复",
  "蕭乾": "萧乾",
  "藉代": "借代",
  "藉以": "借以",
  "藉助": "借助",
  "藉卉": "借卉",
  "藉口": "借口",
  "藉喻": "借喻",
  "藉手": "借手",
  "藉據": "借据",
  "藉故": "借故",
  "藉方": "借方",
  "藉條": "借条",
  "藉槁": "借槁",
  "藉機": "借机",
  "藉此": "借此",
  "藉甚": "借甚",
  "藉由": "借由",
  "藉著": "借着",
  "藉端": "借端",
  "藉藉": "借借",
  "藉詞": "借词",
  "藉讀": "借读",
  "藉資": "借资",
  "衹得": "只得",
  "覆上": "复上",
  "覆住": "复住",
  "覆信": "复信",
  "覆冒": "复冒",
  "覆呈": "复呈",
  "覆命": "复命",
  "覆墓": "复墓",
  "覆宗": "复宗",
  "覆帳": "复帐",
  "覆幬": "复帱",
  "覆成": "复成",
  "覆按": "复按",
  "覆文": "复文",
  "覆杯": "复杯",
  "覆校": "复校",
  "覆瓿": "复瓿",
  "覆盂": "复盂",
  "覆育": "复育",
  "覆逆": "复逆",
  "覆醢": "复醢",
  "覆電": "复电",
  "覆露": "复露",
  "覆鼎": "复鼎",
  "見覆": "见复",
  "角徵": "角徵",
  "計畫": "计划",
  "變徵": "变徵",
  "躪藉": "躏借",
  "酝藉": "酝借",
  "重覆": "重复",
  "金吒": "金吒",
  "金咤": "金吒",
  "金鍊": "金链",
  "鈕釦": "纽扣",
  "鈞覆": "钧复",
  "鉅子": "钜子",
  "鉅萬": "钜万",
  "鉅防": "钜防",
  "鉸鍊": "铰链",
  "銀鍊": "银链",
  "鍊墜": "链坠",
  "鍊子": "链子",
  "鍊形": "链形",
  "鍊條": "链条",
  "鍊錘": "链锤",
  "鍊鎖": "链锁",
  "鍛鍾": "锻锺",
  "鍾鍛": "锺锻",
  "鍾馗": "锺馗",
  "鎖鍊": "锁链",
  "鐵鍊": "铁链",
  "電覆": "电复",
  "露覆": "露复",
  "項鍊": "项链",
  "頗覆": "颇复",
  "頸鍊": "颈链",
  "顧藉": "顾借",
  "煞車": "刹车",
  "著": "着",
  "乾": "干",
  "儘": "尽",
  "劃": "划",
  "徵": "征",
  "於": "于",
  "瀋": "沈",
  "瀰": "弥",
  "畫": "画",
  "睪": "睾",
  "綵": "彩",
  "線": "线",
  "薹": "苔",
  "蘋": "苹",
  "襬": "摆",
  "託": "托",
  "諮": "咨",
  "鈕": "钮",
  "鉅": "巨",
  "鍾": "钟",
  "钁": "镢",
  "靦": "腼",
  "餘": "余",
  "麪": "面",
  "麴": "曲",
  "麵": "面",
  "麼": "么",
  "麽": "么",
  "開": "开",
  "噹": "当",
  "崙": "仑",
  "擣": "捣",
  "牴": "抵",
  "衹": "只",
  "諫": "谏",
  "譾": "谫",
  "買": "买",
  "閒": "闲",
  "願": "愿",
  "餬": "糊",
  "餱": "糇",
  "餵": "喂",
  "驄": "骢",
  "鵰": "雕",
  "齧": "啮",
  "鍊": "炼",
  "㑯": "㑔",
  "㑳": "㑇",
  "㑶": "㐹",
  "㓨": "刾",
  "㘚": "㘎",
  "㜄": "㚯",
  "㜏": "㛣",
  "㠏": "㟆",
  "㥮": "㤘",
  "㩜": "㨫",
  "㩳": "㧐",
  "䁻": "䀥",
  "䊷": "䌶",
  "䋙": "䌺",
  "䋚": "䌻",
  "䋹": "䌿",
  "䋻": "䌾",
  "䎱": "䎬",
  "䙡": "䙌",
  "䜀": "䜧",
  "䝼": "䞍",
  "䥇": "䦂",
  "䥱": "䥾",
  "䦛": "䦶",
  "䦟": "䦷",
  "䯀": "䯅",
  "䰾": "鲃",
  "䱷": "䲣",
  "䱽": "䲝",
  "䲁": "鳚",
  "䲘": "鳤",
  "䴉": "鹮",
  "丟": "丢",
  "並": "并",
  "亂": "乱",
  "亙": "亘",
  "亞": "亚",
  "佇": "伫",
  "佈": "布",
  "佔": "占",
  "併": "并",
  "來": "来",
  "侖": "仑",
  "侶": "侣",
  "侷": "局",
  "俁": "俣",
  "係": "系",
  "俔": "伣",
  "俠": "侠",
  "俥": "伡",
  "俬": "私",
  "倀": "伥",
  "倆": "俩",
  "倈": "俫",
  "倉": "仓",
  "個": "个",
  "們": "们",
  "倖": "幸",
  "倫": "伦",
  "倲": "㑈",
  "偉": "伟",
  "偑": "㐽",
  "側": "侧",
  "偵": "侦",
  "偽": "伪",
  "傌": "㐷",
  "傑": "杰",
  "傖": "伧",
  "傘": "伞",
  "備": "备",
  "傢": "家",
  "傭": "佣",
  "傯": "偬",
  "傳": "传",
  "傴": "伛",
  "債": "债",
  "傷": "伤",
  "傾": "倾",
  "僂": "偻",
  "僅": "仅",
  "僉": "佥",
  "僑": "侨",
  "僕": "仆",
  "僞": "伪",
  "僥": "侥",
  "僨": "偾",
  "僱": "雇",
  "價": "价",
  "儀": "仪",
  "儁": "俊",
  "儂": "侬",
  "億": "亿",
  "儈": "侩",
  "儉": "俭",
  "儐": "傧",
  "儔": "俦",
  "儕": "侪",
  "償": "偿",
  "優": "优",
  "儲": "储",
  "儷": "俪",
  "儸": "㑩",
  "儺": "傩",
  "儻": "傥",
  "儼": "俨",
  "兇": "凶",
  "兌": "兑",
  "兒": "儿",
  "兗": "兖",
  "內": "内",
  "兩": "两",
  "冊": "册",
  "冑": "胄",
  "冪": "幂",
  "凈": "净",
  "凍": "冻",
  "凜": "凛",
  "凱": "凯",
  "別": "别",
  "刪": "删",
  "剄": "刭",
  "則": "则",
  "剋": "克",
  "剎": "刹",
  "剗": "刬",
  "剛": "刚",
  "剝": "剥",
  "剮": "剐",
  "剴": "剀",
  "創": "创",
  "剷": "铲",
  "劇": "剧",
  "劉": "刘",
  "劊": "刽",
  "劌": "刿",
  "劍": "剑",
  "劏": "㓥",
  "劑": "剂",
  "劚": "㔉",
  "勁": "劲",
  "動": "动",
  "務": "务",
  "勛": "勋",
  "勝": "胜",
  "勞": "劳",
  "勢": "势",
  "勩": "勚",
  "勱": "劢",
  "勳": "勋",
  "勵": "励",
  "勸": "劝",
  "勻": "匀",
  "匭": "匦",
  "匯": "汇",
  "匱": "匮",
  "區": "区",
  "協": "协",
  "卹": "恤",
  "卻": "却",
  "卽": "即",
  "厙": "厍",
  "厠": "厕",
  "厤": "历",
  "厭": "厌",
  "厲": "厉",
  "厴": "厣",
  "參": "参",
  "叄": "叁",
  "叢": "丛",
  "吒": "咤",
  "吳": "吴",
  "吶": "呐",
  "呂": "吕",
  "咼": "呙",
  "員": "员",
  "唄": "呗",
  "唚": "吣",
  "唸": "念",
  "問": "问",
  "啓": "启",
  "啞": "哑",
  "啟": "启",
  "啢": "唡",
  "喎": "㖞",
  "喚": "唤",
  "喪": "丧",
  "喫": "吃",
  "喬": "乔",
  "單": "单",
  "喲": "哟",
  "嗆": "呛",
  "嗇": "啬",
  "嗊": "唝",
  "嗎": "吗",
  "嗚": "呜",
  "嗩": "唢",
  "嗶": "哔",
  "嘆": "叹",
  "嘍": "喽",
  "嘓": "啯",
  "嘔": "呕",
  "嘖": "啧",
  "嘗": "尝",
  "嘜": "唛",
  "嘩": "哗",
  "嘮": "唠",
  "嘯": "啸",
  "嘰": "叽",
  "嘵": "哓",
  "嘸": "呒",
  "嘽": "啴",
  "噁": "恶",
  "噓": "嘘",
  "噚": "㖊",
  "噝": "咝",
  "噠": "哒",
  "噥": "哝",
  "噦": "哕",
  "噯": "嗳",
  "噲": "哙",
  "噴": "喷",
  "噸": "吨",
  "嚀": "咛",
  "嚇": "吓",
  "嚌": "哜",
  "嚐": "尝",
  "嚕": "噜",
  "嚙": "啮",
  "嚥": "咽",
  "嚦": "呖",
  "嚨": "咙",
  "嚮": "向",
  "嚲": "亸",
  "嚳": "喾",
  "嚴": "严",
  "嚶": "嘤",
  "囀": "啭",
  "囁": "嗫",
  "囂": "嚣",
  "囅": "冁",
  "囈": "呓",
  "囉": "啰",
  "囌": "苏",
  "囑": "嘱",
  "囪": "囱",
  "圇": "囵",
  "國": "国",
  "圍": "围",
  "園": "园",
  "圓": "圆",
  "圖": "图",
  "團": "团",
  "垵": "埯",
  "埡": "垭",
  "埰": "采",
  "執": "执",
  "堅": "坚",
  "堊": "垩",
  "堖": "垴",
  "堝": "埚",
  "堯": "尧",
  "報": "报",
  "場": "场",
  "塊": "块",
  "塋": "茔",
  "塏": "垲",
  "塒": "埘",
  "塗": "涂",
  "塚": "冢",
  "塢": "坞",
  "塤": "埙",
  "塵": "尘",
  "塹": "堑",
  "墊": "垫",
  "墜": "坠",
  "墮": "堕",
  "墰": "坛",
  "墳": "坟",
  "墶": "垯",
  "墻": "墙",
  "墾": "垦",
  "壇": "坛",
  "壋": "垱",
  "壎": "埙",
  "壓": "压",
  "壘": "垒",
  "壙": "圹",
  "壚": "垆",
  "壜": "坛",
  "壞": "坏",
  "壟": "垄",
  "壠": "垅",
  "壢": "坜",
  "壩": "坝",
  "壯": "壮",
  "壺": "壶",
  "壼": "壸",
  "壽": "寿",
  "夠": "够",
  "夢": "梦",
  "夥": "伙",
  "夾": "夹",
  "奐": "奂",
  "奧": "奥",
  "奩": "奁",
  "奪": "夺",
  "奬": "奖",
  "奮": "奋",
  "奼": "姹",
  "妝": "妆",
  "姍": "姗",
  "姦": "奸",
  "娛": "娱",
  "婁": "娄",
  "婦": "妇",
  "婭": "娅",
  "媧": "娲",
  "媯": "妫",
  "媰": "㛀",
  "媼": "媪",
  "媽": "妈",
  "嫋": "袅",
  "嫗": "妪",
  "嫵": "妩",
  "嫺": "娴",
  "嫻": "娴",
  "嫿": "婳",
  "嬀": "妫",
  "嬃": "媭",
  "嬈": "娆",
  "嬋": "婵",
  "嬌": "娇",
  "嬙": "嫱",
  "嬡": "嫒",
  "嬤": "嬷",
  "嬪": "嫔",
  "嬰": "婴",
  "嬸": "婶",
  "孃": "娘",
  "孋": "㛤",
  "孌": "娈",
  "孫": "孙",
  "學": "学",
  "孿": "孪",
  "宮": "宫",
  "寀": "采",
  "寢": "寝",
  "實": "实",
  "寧": "宁",
  "審": "审",
  "寫": "写",
  "寬": "宽",
  "寵": "宠",
  "寶": "宝",
  "將": "将",
  "專": "专",
  "尋": "寻",
  "對": "对",
  "導": "导",
  "尷": "尴",
  "屆": "届",
  "屍": "尸",
  "屓": "屃",
  "屜": "屉",
  "屢": "屡",
  "層": "层",
  "屨": "屦",
  "屬": "属",
  "岡": "冈",
  "峯": "峰",
  "峴": "岘",
  "島": "岛",
  "峽": "峡",
  "崍": "崃",
  "崑": "昆",
  "崗": "岗",
  "崢": "峥",
  "崬": "岽",
  "嵐": "岚",
  "嵗": "岁",
  "嶁": "嵝",
  "嶄": "崭",
  "嶇": "岖",
  "嶔": "嵚",
  "嶗": "崂",
  "嶠": "峤",
  "嶢": "峣",
  "嶧": "峄",
  "嶨": "峃",
  "嶮": "崄",
  "嶴": "岙",
  "嶸": "嵘",
  "嶺": "岭",
  "嶼": "屿",
  "嶽": "岳",
  "巋": "岿",
  "巒": "峦",
  "巔": "巅",
  "巖": "岩",
  "巰": "巯",
  "巹": "卺",
  "帥": "帅",
  "師": "师",
  "帳": "帐",
  "帶": "带",
  "幀": "帧",
  "幃": "帏",
  "幗": "帼",
  "幘": "帻",
  "幟": "帜",
  "幣": "币",
  "幫": "帮",
  "幬": "帱",
  "幹": "干",
  "幾": "几",
  "庫": "库",
  "廁": "厕",
  "廂": "厢",
  "廄": "厩",
  "廈": "厦",
  "廎": "庼",
  "廕": "荫",
  "廚": "厨",
  "廝": "厮",
  "廟": "庙",
  "廠": "厂",
  "廡": "庑",
  "廢": "废",
  "廣": "广",
  "廩": "廪",
  "廬": "庐",
  "廳": "厅",
  "弒": "弑",
  "弔": "吊",
  "弳": "弪",
  "張": "张",
  "強": "强",
  "彆": "别",
  "彈": "弹",
  "彌": "弥",
  "彎": "弯",
  "彔": "录",
  "彙": "汇",
  "彞": "彝",
  "彠": "彟",
  "彥": "彦",
  "彫": "雕",
  "彲": "彨",
  "彿": "佛",
  "後": "后",
  "徑": "径",
  "從": "从",
  "徠": "徕",
  "復": "复",
  "徹": "彻",
  "恆": "恒",
  "恥": "耻",
  "悅": "悦",
  "悞": "悮",
  "悵": "怅",
  "悶": "闷",
  "悽": "凄",
  "惡": "恶",
  "惱": "恼",
  "惲": "恽",
  "惻": "恻",
  "愛": "爱",
  "愜": "惬",
  "愨": "悫",
  "愴": "怆",
  "愷": "恺",
  "愾": "忾",
  "慄": "栗",
  "態": "态",
  "慍": "愠",
  "慘": "惨",
  "慚": "惭",
  "慟": "恸",
  "慣": "惯",
  "慤": "悫",
  "慪": "怄",
  "慫": "怂",
  "慮": "虑",
  "慳": "悭",
  "慶": "庆",
  "慼": "戚",
  "慾": "欲",
  "憂": "忧",
  "憊": "惫",
  "憐": "怜",
  "憑": "凭",
  "憒": "愦",
  "憚": "惮",
  "憤": "愤",
  "憫": "悯",
  "憮": "怃",
  "憲": "宪",
  "憶": "忆",
  "懇": "恳",
  "應": "应",
  "懌": "怿",
  "懍": "懔",
  "懞": "蒙",
  "懟": "怼",
  "懣": "懑",
  "懨": "恹",
  "懲": "惩",
  "懶": "懒",
  "懷": "怀",
  "懸": "悬",
  "懺": "忏",
  "懼": "惧",
  "懾": "慑",
  "戀": "恋",
  "戇": "戆",
  "戔": "戋",
  "戧": "戗",
  "戩": "戬",
  "戰": "战",
  "戱": "戯",
  "戲": "戏",
  "戶": "户",
  "拋": "抛",
  "挩": "捝",
  "挱": "挲",
  "挾": "挟",
  "捨": "舍",
  "捫": "扪",
  "捱": "挨",
  "捲": "卷",
  "掃": "扫",
  "掄": "抡",
  "掆": "㧏",
  "掗": "挜",
  "掙": "挣",
  "掛": "挂",
  "採": "采",
  "揀": "拣",
  "揚": "扬",
  "換": "换",
  "揮": "挥",
  "損": "损",
  "搖": "摇",
  "搗": "捣",
  "搵": "揾",
  "搶": "抢",
  "摑": "掴",
  "摜": "掼",
  "摟": "搂",
  "摯": "挚",
  "摳": "抠",
  "摶": "抟",
  "摺": "折",
  "摻": "掺",
  "撈": "捞",
  "撏": "挦",
  "撐": "撑",
  "撓": "挠",
  "撝": "㧑",
  "撟": "挢",
  "撣": "掸",
  "撥": "拨",
  "撫": "抚",
  "撲": "扑",
  "撳": "揿",
  "撻": "挞",
  "撾": "挝",
  "撿": "捡",
  "擁": "拥",
  "擄": "掳",
  "擇": "择",
  "擊": "击",
  "擋": "挡",
  "擓": "㧟",
  "擔": "担",
  "據": "据",
  "擠": "挤",
  "擡": "抬",
  "擬": "拟",
  "擯": "摈",
  "擰": "拧",
  "擱": "搁",
  "擲": "掷",
  "擴": "扩",
  "擷": "撷",
  "擺": "摆",
  "擻": "擞",
  "擼": "撸",
  "擽": "㧰",
  "擾": "扰",
  "攄": "摅",
  "攆": "撵",
  "攏": "拢",
  "攔": "拦",
  "攖": "撄",
  "攙": "搀",
  "攛": "撺",
  "攜": "携",
  "攝": "摄",
  "攢": "攒",
  "攣": "挛",
  "攤": "摊",
  "攪": "搅",
  "攬": "揽",
  "敎": "教",
  "敓": "敚",
  "敗": "败",
  "敘": "叙",
  "敵": "敌",
  "數": "数",
  "斂": "敛",
  "斃": "毙",
  "斆": "敩",
  "斕": "斓",
  "斬": "斩",
  "斷": "断",
  "旂": "旗",
  "旣": "既",
  "昇": "升",
  "時": "时",
  "晉": "晋",
  "晝": "昼",
  "暈": "晕",
  "暉": "晖",
  "暘": "旸",
  "暢": "畅",
  "暫": "暂",
  "曄": "晔",
  "曆": "历",
  "曇": "昙",
  "曉": "晓",
  "曏": "向",
  "曖": "暧",
  "曠": "旷",
  "曨": "昽",
  "曬": "晒",
  "書": "书",
  "會": "会",
  "朧": "胧",
  "朮": "术",
  "東": "东",
  "杴": "锨",
  "枴": "拐",
  "柵": "栅",
  "柺": "拐",
  "査": "查",
  "桿": "杆",
  "梔": "栀",
  "梘": "枧",
  "條": "条",
  "梟": "枭",
  "梲": "棁",
  "棄": "弃",
  "棊": "棋",
  "棖": "枨",
  "棗": "枣",
  "棟": "栋",
  "棡": "㭎",
  "棧": "栈",
  "棲": "栖",
  "棶": "梾",
  "椏": "桠",
  "椲": "㭏",
  "楊": "杨",
  "楓": "枫",
  "楨": "桢",
  "業": "业",
  "極": "极",
  "榘": "矩",
  "榦": "干",
  "榪": "杩",
  "榮": "荣",
  "榲": "榅",
  "榿": "桤",
  "構": "构",
  "槍": "枪",
  "槓": "杠",
  "槤": "梿",
  "槧": "椠",
  "槨": "椁",
  "槮": "椮",
  "槳": "桨",
  "槶": "椢",
  "槼": "椝",
  "樁": "桩",
  "樂": "乐",
  "樅": "枞",
  "樑": "梁",
  "樓": "楼",
  "標": "标",
  "樞": "枢",
  "樢": "㭤",
  "樣": "样",
  "樫": "㭴",
  "樳": "桪",
  "樸": "朴",
  "樹": "树",
  "樺": "桦",
  "樿": "椫",
  "橈": "桡",
  "橋": "桥",
  "機": "机",
  "橢": "椭",
  "橫": "横",
  "檁": "檩",
  "檉": "柽",
  "檔": "档",
  "檜": "桧",
  "檟": "槚",
  "檢": "检",
  "檣": "樯",
  "檮": "梼",
  "檯": "台",
  "檳": "槟",
  "檸": "柠",
  "檻": "槛",
  "櫃": "柜",
  "櫓": "橹",
  "櫚": "榈",
  "櫛": "栉",
  "櫝": "椟",
  "櫞": "橼",
  "櫟": "栎",
  "櫥": "橱",
  "櫧": "槠",
  "櫨": "栌",
  "櫪": "枥",
  "櫫": "橥",
  "櫬": "榇",
  "櫱": "蘖",
  "櫳": "栊",
  "櫸": "榉",
  "櫺": "棂",
  "櫻": "樱",
  "欄": "栏",
  "欅": "榉",
  "權": "权",
  "欏": "椤",
  "欒": "栾",
  "欖": "榄",
  "欞": "棂",
  "欽": "钦",
  "歎": "叹",
  "歐": "欧",
  "歟": "欤",
  "歡": "欢",
  "歲": "岁",
  "歷": "历",
  "歸": "归",
  "歿": "殁",
  "殘": "残",
  "殞": "殒",
  "殤": "殇",
  "殨": "㱮",
  "殫": "殚",
  "殭": "僵",
  "殮": "殓",
  "殯": "殡",
  "殰": "㱩",
  "殲": "歼",
  "殺": "杀",
  "殻": "壳",
  "殼": "壳",
  "毀": "毁",
  "毆": "殴",
  "毿": "毵",
  "氂": "牦",
  "氈": "毡",
  "氌": "氇",
  "氣": "气",
  "氫": "氢",
  "氬": "氩",
  "氳": "氲",
  "氾": "泛",
  "汎": "泛",
  "汙": "污",
  "決": "决",
  "沒": "没",
  "沖": "冲",
  "況": "况",
  "泝": "溯",
  "洩": "泄",
  "洶": "汹",
  "浹": "浃",
  "涇": "泾",
  "涗": "涚",
  "涼": "凉",
  "淒": "凄",
  "淚": "泪",
  "淥": "渌",
  "淨": "净",
  "淩": "凌",
  "淪": "沦",
  "淵": "渊",
  "淶": "涞",
  "淺": "浅",
  "渙": "涣",
  "減": "减",
  "渢": "沨",
  "渦": "涡",
  "測": "测",
  "渾": "浑",
  "湊": "凑",
  "湞": "浈",
  "湧": "涌",
  "湯": "汤",
  "溈": "沩",
  "準": "准",
  "溝": "沟",
  "溫": "温",
  "溮": "浉",
  "溳": "涢",
  "溼": "湿",
  "滄": "沧",
  "滅": "灭",
  "滌": "涤",
  "滎": "荥",
  "滙": "汇",
  "滬": "沪",
  "滯": "滞",
  "滲": "渗",
  "滷": "卤",
  "滸": "浒",
  "滻": "浐",
  "滾": "滚",
  "滿": "满",
  "漁": "渔",
  "漊": "溇",
  "漚": "沤",
  "漢": "汉",
  "漣": "涟",
  "漬": "渍",
  "漲": "涨",
  "漵": "溆",
  "漸": "渐",
  "漿": "浆",
  "潁": "颍",
  "潑": "泼",
  "潔": "洁",
  "潙": "沩",
  "潛": "潜",
  "潤": "润",
  "潯": "浔",
  "潰": "溃",
  "潷": "滗",
  "潿": "涠",
  "澀": "涩",
  "澆": "浇",
  "澇": "涝",
  "澐": "沄",
  "澗": "涧",
  "澠": "渑",
  "澤": "泽",
  "澦": "滪",
  "澩": "泶",
  "澮": "浍",
  "澱": "淀",
  "澾": "㳠",
  "濁": "浊",
  "濃": "浓",
  "濄": "㳡",
  "濕": "湿",
  "濘": "泞",
  "濛": "蒙",
  "濜": "浕",
  "濟": "济",
  "濤": "涛",
  "濧": "㳔",
  "濫": "滥",
  "濰": "潍",
  "濱": "滨",
  "濺": "溅",
  "濼": "泺",
  "濾": "滤",
  "瀂": "澛",
  "瀅": "滢",
  "瀆": "渎",
  "瀇": "㲿",
  "瀉": "泻",
  "瀏": "浏",
  "瀕": "濒",
  "瀘": "泸",
  "瀝": "沥",
  "瀟": "潇",
  "瀠": "潆",
  "瀦": "潴",
  "瀧": "泷",
  "瀨": "濑",
  "瀲": "潋",
  "瀾": "澜",
  "灃": "沣",
  "灄": "滠",
  "灑": "洒",
  "灕": "漓",
  "灘": "滩",
  "灝": "灏",
  "灠": "漤",
  "灡": "㳕",
  "灣": "湾",
  "灤": "滦",
  "灧": "滟",
  "灩": "滟",
  "災": "灾",
  "為": "为",
  "烏": "乌",
  "烴": "烃",
  "無": "无",
  "煉": "炼",
  "煒": "炜",
  "煙": "烟",
  "煢": "茕",
  "煥": "焕",
  "煩": "烦",
  "煬": "炀",
  "煱": "㶽",
  "熅": "煴",
  "熒": "荧",
  "熗": "炝",
  "熱": "热",
  "熲": "颎",
  "熾": "炽",
  "燁": "烨",
  "燈": "灯",
  "燉": "炖",
  "燒": "烧",
  "燙": "烫",
  "燜": "焖",
  "營": "营",
  "燦": "灿",
  "燬": "毁",
  "燭": "烛",
  "燴": "烩",
  "燶": "㶶",
  "燻": "熏",
  "燼": "烬",
  "燾": "焘",
  "爍": "烁",
  "爐": "炉",
  "爛": "烂",
  "爭": "争",
  "爲": "为",
  "爺": "爷",
  "爾": "尔",
  "牀": "床",
  "牆": "墙",
  "牘": "牍",
  "牽": "牵",
  "犖": "荦",
  "犛": "牦",
  "犢": "犊",
  "犧": "牺",
  "狀": "状",
  "狹": "狭",
  "狽": "狈",
  "猙": "狰",
  "猶": "犹",
  "猻": "狲",
  "獁": "犸",
  "獃": "呆",
  "獄": "狱",
  "獅": "狮",
  "獎": "奖",
  "獨": "独",
  "獪": "狯",
  "獫": "猃",
  "獮": "狝",
  "獰": "狞",
  "獱": "㺍",
  "獲": "获",
  "獵": "猎",
  "獷": "犷",
  "獸": "兽",
  "獺": "獭",
  "獻": "献",
  "獼": "猕",
  "玀": "猡",
  "現": "现",
  "琱": "雕",
  "琺": "珐",
  "琿": "珲",
  "瑋": "玮",
  "瑒": "玚",
  "瑣": "琐",
  "瑤": "瑶",
  "瑩": "莹",
  "瑪": "玛",
  "瑲": "玱",
  "璉": "琏",
  "璡": "琎",
  "璣": "玑",
  "璦": "瑷",
  "璫": "珰",
  "璯": "㻅",
  "環": "环",
  "璵": "玙",
  "璸": "瑸",
  "璽": "玺",
  "瓊": "琼",
  "瓏": "珑",
  "瓔": "璎",
  "瓚": "瓒",
  "甌": "瓯",
  "甕": "瓮",
  "產": "产",
  "産": "产",
  "甦": "苏",
  "甯": "宁",
  "畝": "亩",
  "畢": "毕",
  "異": "异",
  "畵": "画",
  "當": "当",
  "疇": "畴",
  "疊": "叠",
  "痙": "痉",
  "痠": "酸",
  "痾": "疴",
  "瘂": "痖",
  "瘋": "疯",
  "瘍": "疡",
  "瘓": "痪",
  "瘞": "瘗",
  "瘡": "疮",
  "瘧": "疟",
  "瘮": "瘆",
  "瘲": "疭",
  "瘺": "瘘",
  "瘻": "瘘",
  "療": "疗",
  "癆": "痨",
  "癇": "痫",
  "癉": "瘅",
  "癒": "愈",
  "癘": "疠",
  "癟": "瘪",
  "癡": "痴",
  "癢": "痒",
  "癤": "疖",
  "癥": "症",
  "癧": "疬",
  "癩": "癞",
  "癬": "癣",
  "癭": "瘿",
  "癮": "瘾",
  "癰": "痈",
  "癱": "瘫",
  "癲": "癫",
  "發": "发",
  "皁": "皂",
  "皚": "皑",
  "皰": "疱",
  "皸": "皲",
  "皺": "皱",
  "盃": "杯",
  "盜": "盗",
  "盞": "盏",
  "盡": "尽",
  "監": "监",
  "盤": "盘",
  "盧": "卢",
  "盪": "荡",
  "眞": "真",
  "眥": "眦",
  "眾": "众",
  "睏": "困",
  "睜": "睁",
  "睞": "睐",
  "瞘": "眍",
  "瞜": "䁖",
  "瞞": "瞒",
  "瞶": "瞆",
  "瞼": "睑",
  "矇": "蒙",
  "矓": "眬",
  "矚": "瞩",
  "矯": "矫",
  "硃": "朱",
  "硜": "硁",
  "硤": "硖",
  "硨": "砗",
  "硯": "砚",
  "碕": "埼",
  "碩": "硕",
  "碭": "砀",
  "碸": "砜",
  "確": "确",
  "碼": "码",
  "碽": "䂵",
  "磑": "硙",
  "磚": "砖",
  "磠": "硵",
  "磣": "碜",
  "磧": "碛",
  "磯": "矶",
  "磽": "硗",
  "礄": "硚",
  "礆": "硷",
  "礎": "础",
  "礙": "碍",
  "礦": "矿",
  "礪": "砺",
  "礫": "砾",
  "礬": "矾",
  "礱": "砻",
  "祕": "秘",
  "祿": "禄",
  "禍": "祸",
  "禎": "祯",
  "禕": "祎",
  "禡": "祃",
  "禦": "御",
  "禪": "禅",
  "禮": "礼",
  "禰": "祢",
  "禱": "祷",
  "禿": "秃",
  "秈": "籼",
  "稅": "税",
  "稈": "秆",
  "稏": "䅉",
  "稜": "棱",
  "稟": "禀",
  "種": "种",
  "稱": "称",
  "穀": "谷",
  "穇": "䅟",
  "穌": "稣",
  "積": "积",
  "穎": "颖",
  "穠": "秾",
  "穡": "穑",
  "穢": "秽",
  "穩": "稳",
  "穫": "获",
  "穭": "稆",
  "窩": "窝",
  "窪": "洼",
  "窮": "穷",
  "窯": "窑",
  "窵": "窎",
  "窶": "窭",
  "窺": "窥",
  "竄": "窜",
  "竅": "窍",
  "竇": "窦",
  "竈": "灶",
  "竊": "窃",
  "竪": "竖",
  "競": "竞",
  "筆": "笔",
  "筍": "笋",
  "筧": "笕",
  "筴": "䇲",
  "箇": "个",
  "箋": "笺",
  "箏": "筝",
  "節": "节",
  "範": "范",
  "築": "筑",
  "篋": "箧",
  "篔": "筼",
  "篤": "笃",
  "篩": "筛",
  "篳": "筚",
  "簀": "箦",
  "簍": "篓",
  "簑": "蓑",
  "簞": "箪",
  "簡": "简",
  "簣": "篑",
  "簫": "箫",
  "簹": "筜",
  "簽": "签",
  "簾": "帘",
  "籃": "篮",
  "籌": "筹",
  "籔": "䉤",
  "籙": "箓",
  "籛": "篯",
  "籜": "箨",
  "籟": "籁",
  "籠": "笼",
  "籤": "签",
  "籩": "笾",
  "籪": "簖",
  "籬": "篱",
  "籮": "箩",
  "籲": "吁",
  "粵": "粤",
  "糉": "粽",
  "糝": "糁",
  "糞": "粪",
  "糧": "粮",
  "糰": "团",
  "糲": "粝",
  "糴": "籴",
  "糶": "粜",
  "糹": "纟",
  "糾": "纠",
  "紀": "纪",
  "紂": "纣",
  "約": "约",
  "紅": "红",
  "紆": "纡",
  "紇": "纥",
  "紈": "纨",
  "紉": "纫",
  "紋": "纹",
  "納": "纳",
  "紐": "纽",
  "紓": "纾",
  "純": "纯",
  "紕": "纰",
  "紖": "纼",
  "紗": "纱",
  "紘": "纮",
  "紙": "纸",
  "級": "级",
  "紛": "纷",
  "紜": "纭",
  "紝": "纴",
  "紡": "纺",
  "紬": "䌷",
  "紮": "扎",
  "細": "细",
  "紱": "绂",
  "紲": "绁",
  "紳": "绅",
  "紵": "纻",
  "紹": "绍",
  "紺": "绀",
  "紼": "绋",
  "紿": "绐",
  "絀": "绌",
  "終": "终",
  "絃": "弦",
  "組": "组",
  "絅": "䌹",
  "絆": "绊",
  "絎": "绗",
  "結": "结",
  "絕": "绝",
  "絛": "绦",
  "絝": "绔",
  "絞": "绞",
  "絡": "络",
  "絢": "绚",
  "給": "给",
  "絨": "绒",
  "絰": "绖",
  "統": "统",
  "絲": "丝",
  "絳": "绛",
  "絶": "绝",
  "絹": "绢",
  "綁": "绑",
  "綃": "绡",
  "綆": "绠",
  "綈": "绨",
  "綉": "绣",
  "綌": "绤",
  "綏": "绥",
  "綐": "䌼",
  "綑": "捆",
  "經": "经",
  "綜": "综",
  "綞": "缍",
  "綠": "绿",
  "綢": "绸",
  "綣": "绻",
  "綫": "线",
  "綬": "绶",
  "維": "维",
  "綯": "绹",
  "綰": "绾",
  "綱": "纲",
  "網": "网",
  "綳": "绷",
  "綴": "缀",
  "綸": "纶",
  "綹": "绺",
  "綺": "绮",
  "綻": "绽",
  "綽": "绰",
  "綾": "绫",
  "綿": "绵",
  "緄": "绲",
  "緇": "缁",
  "緊": "紧",
  "緋": "绯",
  "緑": "绿",
  "緒": "绪",
  "緓": "绬",
  "緔": "绱",
  "緗": "缃",
  "緘": "缄",
  "緙": "缂",
  "緝": "缉",
  "緞": "缎",
  "締": "缔",
  "緡": "缗",
  "緣": "缘",
  "緦": "缌",
  "編": "编",
  "緩": "缓",
  "緬": "缅",
  "緯": "纬",
  "緱": "缑",
  "緲": "缈",
  "練": "练",
  "緶": "缏",
  "緹": "缇",
  "緻": "致",
  "緼": "缊",
  "縈": "萦",
  "縉": "缙",
  "縊": "缢",
  "縋": "缒",
  "縐": "绉",
  "縑": "缣",
  "縕": "缊",
  "縗": "缞",
  "縛": "缚",
  "縝": "缜",
  "縞": "缟",
  "縟": "缛",
  "縣": "县",
  "縧": "绦",
  "縫": "缝",
  "縭": "缡",
  "縮": "缩",
  "縱": "纵",
  "縲": "缧",
  "縳": "䌸",
  "縴": "纤",
  "縵": "缦",
  "縶": "絷",
  "縷": "缕",
  "縹": "缥",
  "總": "总",
  "績": "绩",
  "繃": "绷",
  "繅": "缫",
  "繆": "缪",
  "繐": "穗",
  "繒": "缯",
  "織": "织",
  "繕": "缮",
  "繚": "缭",
  "繞": "绕",
  "繡": "绣",
  "繢": "缋",
  "繩": "绳",
  "繪": "绘",
  "繫": "系",
  "繭": "茧",
  "繮": "缰",
  "繯": "缳",
  "繰": "缲",
  "繳": "缴",
  "繸": "䍁",
  "繹": "绎",
  "繼": "继",
  "繽": "缤",
  "繾": "缱",
  "繿": "䍀",
  "纇": "颣",
  "纈": "缬",
  "纊": "纩",
  "續": "续",
  "纍": "累",
  "纏": "缠",
  "纓": "缨",
  "纔": "才",
  "纖": "纤",
  "纘": "缵",
  "纜": "缆",
  "缽": "钵",
  "罈": "坛",
  "罌": "罂",
  "罎": "坛",
  "罰": "罚",
  "罵": "骂",
  "罷": "罢",
  "羅": "罗",
  "羆": "罴",
  "羈": "羁",
  "羋": "芈",
  "羣": "群",
  "羥": "羟",
  "羨": "羡",
  "義": "义",
  "羶": "膻",
  "習": "习",
  "翬": "翚",
  "翹": "翘",
  "翽": "翙",
  "耬": "耧",
  "耮": "耢",
  "聖": "圣",
  "聞": "闻",
  "聯": "联",
  "聰": "聪",
  "聲": "声",
  "聳": "耸",
  "聵": "聩",
  "聶": "聂",
  "職": "职",
  "聹": "聍",
  "聽": "听",
  "聾": "聋",
  "肅": "肃",
  "脅": "胁",
  "脈": "脉",
  "脛": "胫",
  "脣": "唇",
  "脩": "修",
  "脫": "脱",
  "脹": "胀",
  "腎": "肾",
  "腖": "胨",
  "腡": "脶",
  "腦": "脑",
  "腫": "肿",
  "腳": "脚",
  "腸": "肠",
  "膃": "腽",
  "膕": "腘",
  "膚": "肤",
  "膞": "䏝",
  "膠": "胶",
  "膩": "腻",
  "膽": "胆",
  "膾": "脍",
  "膿": "脓",
  "臉": "脸",
  "臍": "脐",
  "臏": "膑",
  "臘": "腊",
  "臚": "胪",
  "臟": "脏",
  "臠": "脔",
  "臢": "臜",
  "臥": "卧",
  "臨": "临",
  "臺": "台",
  "與": "与",
  "興": "兴",
  "舉": "举",
  "舊": "旧",
  "舘": "馆",
  "艙": "舱",
  "艤": "舣",
  "艦": "舰",
  "艫": "舻",
  "艱": "艰",
  "艷": "艳",
  "芻": "刍",
  "苧": "苎",
  "茲": "兹",
  "荊": "荆",
  "莊": "庄",
  "莖": "茎",
  "莢": "荚",
  "莧": "苋",
  "華": "华",
  "菴": "庵",
  "菸": "烟",
  "萇": "苌",
  "萊": "莱",
  "萬": "万",
  "萴": "荝",
  "萵": "莴",
  "葉": "叶",
  "葒": "荭",
  "葤": "荮",
  "葦": "苇",
  "葯": "药",
  "葷": "荤",
  "蒐": "搜",
  "蒓": "莼",
  "蒔": "莳",
  "蒕": "蒀",
  "蒞": "莅",
  "蒼": "苍",
  "蓀": "荪",
  "蓆": "席",
  "蓋": "盖",
  "蓮": "莲",
  "蓯": "苁",
  "蓴": "莼",
  "蓽": "荜",
  "蔔": "卜",
  "蔘": "参",
  "蔞": "蒌",
  "蔣": "蒋",
  "蔥": "葱",
  "蔦": "茑",
  "蔭": "荫",
  "蕁": "荨",
  "蕆": "蒇",
  "蕎": "荞",
  "蕒": "荬",
  "蕓": "芸",
  "蕕": "莸",
  "蕘": "荛",
  "蕢": "蒉",
  "蕩": "荡",
  "蕪": "芜",
  "蕭": "萧",
  "蕷": "蓣",
  "薀": "蕰",
  "薈": "荟",
  "薊": "蓟",
  "薌": "芗",
  "薑": "姜",
  "薔": "蔷",
  "薘": "荙",
  "薟": "莶",
  "薦": "荐",
  "薩": "萨",
  "薳": "䓕",
  "薴": "苧",
  "薺": "荠",
  "藍": "蓝",
  "藎": "荩",
  "藝": "艺",
  "藥": "药",
  "藪": "薮",
  "藭": "䓖",
  "藴": "蕴",
  "藶": "苈",
  "藹": "蔼",
  "藺": "蔺",
  "蘀": "萚",
  "蘄": "蕲",
  "蘆": "芦",
  "蘇": "苏",
  "蘊": "蕴",
  "蘚": "藓",
  "蘞": "蔹",
  "蘢": "茏",
  "蘭": "兰",
  "蘺": "蓠",
  "蘿": "萝",
  "虆": "蔂",
  "處": "处",
  "虛": "虚",
  "虜": "虏",
  "號": "号",
  "虧": "亏",
  "虯": "虬",
  "蛺": "蛱",
  "蛻": "蜕",
  "蜆": "蚬",
  "蝕": "蚀",
  "蝟": "猬",
  "蝦": "虾",
  "蝨": "虱",
  "蝸": "蜗",
  "螄": "蛳",
  "螞": "蚂",
  "螢": "萤",
  "螮": "䗖",
  "螻": "蝼",
  "螿": "螀",
  "蟄": "蛰",
  "蟈": "蝈",
  "蟎": "螨",
  "蟣": "虮",
  "蟬": "蝉",
  "蟯": "蛲",
  "蟲": "虫",
  "蟶": "蛏",
  "蟻": "蚁",
  "蠁": "蚃",
  "蠅": "蝇",
  "蠆": "虿",
  "蠍": "蝎",
  "蠐": "蛴",
  "蠑": "蝾",
  "蠔": "蚝",
  "蠟": "蜡",
  "蠣": "蛎",
  "蠨": "蟏",
  "蠱": "蛊",
  "蠶": "蚕",
  "蠻": "蛮",
  "衆": "众",
  "衊": "蔑",
  "術": "术",
  "衕": "同",
  "衚": "胡",
  "衛": "卫",
  "衝": "冲",
  "袞": "衮",
  "裊": "袅",
  "裏": "里",
  "補": "补",
  "裝": "装",
  "裡": "里",
  "製": "制",
  "複": "复",
  "褌": "裈",
  "褘": "袆",
  "褲": "裤",
  "褳": "裢",
  "褸": "褛",
  "褻": "亵",
  "襆": "幞",
  "襇": "裥",
  "襉": "裥",
  "襏": "袯",
  "襖": "袄",
  "襝": "裣",
  "襠": "裆",
  "襤": "褴",
  "襪": "袜",
  "襯": "衬",
  "襲": "袭",
  "襴": "襕",
  "覈": "核",
  "見": "见",
  "覎": "觃",
  "規": "规",
  "覓": "觅",
  "視": "视",
  "覘": "觇",
  "覡": "觋",
  "覥": "觍",
  "覦": "觎",
  "親": "亲",
  "覬": "觊",
  "覯": "觏",
  "覲": "觐",
  "覷": "觑",
  "覺": "觉",
  "覽": "览",
  "覿": "觌",
  "觀": "观",
  "觴": "觞",
  "觶": "觯",
  "觸": "触",
  "訁": "讠",
  "訂": "订",
  "訃": "讣",
  "計": "计",
  "訊": "讯",
  "訌": "讧",
  "討": "讨",
  "訐": "讦",
  "訒": "讱",
  "訓": "训",
  "訕": "讪",
  "訖": "讫",
  "記": "记",
  "訛": "讹",
  "訝": "讶",
  "訟": "讼",
  "訢": "䜣",
  "訣": "诀",
  "訥": "讷",
  "訩": "讻",
  "訪": "访",
  "設": "设",
  "許": "许",
  "訴": "诉",
  "訶": "诃",
  "診": "诊",
  "註": "注",
  "証": "证",
  "詁": "诂",
  "詆": "诋",
  "詎": "讵",
  "詐": "诈",
  "詒": "诒",
  "詔": "诏",
  "評": "评",
  "詖": "诐",
  "詗": "诇",
  "詘": "诎",
  "詛": "诅",
  "詞": "词",
  "詠": "咏",
  "詡": "诩",
  "詢": "询",
  "詣": "诣",
  "試": "试",
  "詩": "诗",
  "詫": "诧",
  "詬": "诟",
  "詭": "诡",
  "詮": "诠",
  "詰": "诘",
  "話": "话",
  "該": "该",
  "詳": "详",
  "詵": "诜",
  "詼": "诙",
  "詿": "诖",
  "誄": "诔",
  "誅": "诛",
  "誆": "诓",
  "誇": "夸",
  "誌": "志",
  "認": "认",
  "誑": "诳",
  "誒": "诶",
  "誕": "诞",
  "誘": "诱",
  "誚": "诮",
  "語": "语",
  "誠": "诚",
  "誡": "诫",
  "誣": "诬",
  "誤": "误",
  "誥": "诰",
  "誦": "诵",
  "誨": "诲",
  "說": "说",
  "説": "说",
  "誰": "谁",
  "課": "课",
  "誶": "谇",
  "誹": "诽",
  "誼": "谊",
  "誾": "訚",
  "調": "调",
  "諂": "谄",
  "諄": "谆",
  "談": "谈",
  "諉": "诿",
  "請": "请",
  "諍": "诤",
  "諏": "诹",
  "諑": "诼",
  "諒": "谅",
  "論": "论",
  "諗": "谂",
  "諛": "谀",
  "諜": "谍",
  "諝": "谞",
  "諞": "谝",
  "諡": "谥",
  "諢": "诨",
  "諤": "谔",
  "諦": "谛",
  "諧": "谐",
  "諭": "谕",
  "諱": "讳",
  "諳": "谙",
  "諶": "谌",
  "諷": "讽",
  "諸": "诸",
  "諺": "谚",
  "諼": "谖",
  "諾": "诺",
  "謀": "谋",
  "謁": "谒",
  "謂": "谓",
  "謄": "誊",
  "謅": "诌",
  "謊": "谎",
  "謎": "谜",
  "謐": "谧",
  "謔": "谑",
  "謖": "谡",
  "謗": "谤",
  "謙": "谦",
  "謚": "谥",
  "講": "讲",
  "謝": "谢",
  "謠": "谣",
  "謡": "谣",
  "謨": "谟",
  "謫": "谪",
  "謬": "谬",
  "謭": "谫",
  "謳": "讴",
  "謹": "谨",
  "謾": "谩",
  "譁": "哗",
  "譅": "䜧",
  "證": "证",
  "譎": "谲",
  "譏": "讥",
  "譖": "谮",
  "識": "识",
  "譙": "谯",
  "譚": "谭",
  "譜": "谱",
  "譟": "噪",
  "譫": "谵",
  "譭": "毁",
  "譯": "译",
  "議": "议",
  "譴": "谴",
  "護": "护",
  "譸": "诪",
  "譽": "誉",
  "讀": "读",
  "讅": "谉",
  "變": "变",
  "讋": "詟",
  "讌": "䜩",
  "讎": "雠",
  "讒": "谗",
  "讓": "让",
  "讕": "谰",
  "讖": "谶",
  "讚": "赞",
  "讜": "谠",
  "讞": "谳",
  "豈": "岂",
  "豎": "竖",
  "豐": "丰",
  "豔": "艳",
  "豬": "猪",
  "豶": "豮",
  "貓": "猫",
  "貙": "䝙",
  "貝": "贝",
  "貞": "贞",
  "貟": "贠",
  "負": "负",
  "財": "财",
  "貢": "贡",
  "貧": "贫",
  "貨": "货",
  "販": "贩",
  "貪": "贪",
  "貫": "贯",
  "責": "责",
  "貯": "贮",
  "貰": "贳",
  "貲": "赀",
  "貳": "贰",
  "貴": "贵",
  "貶": "贬",
  "貸": "贷",
  "貺": "贶",
  "費": "费",
  "貼": "贴",
  "貽": "贻",
  "貿": "贸",
  "賀": "贺",
  "賁": "贲",
  "賂": "赂",
  "賃": "赁",
  "賄": "贿",
  "賅": "赅",
  "資": "资",
  "賈": "贾",
  "賊": "贼",
  "賑": "赈",
  "賒": "赊",
  "賓": "宾",
  "賕": "赇",
  "賙": "赒",
  "賚": "赉",
  "賜": "赐",
  "賞": "赏",
  "賠": "赔",
  "賡": "赓",
  "賢": "贤",
  "賣": "卖",
  "賤": "贱",
  "賦": "赋",
  "賧": "赕",
  "質": "质",
  "賫": "赍",
  "賬": "账",
  "賭": "赌",
  "賰": "䞐",
  "賴": "赖",
  "賵": "赗",
  "賺": "赚",
  "賻": "赙",
  "購": "购",
  "賽": "赛",
  "賾": "赜",
  "贄": "贽",
  "贅": "赘",
  "贇": "赟",
  "贈": "赠",
  "贊": "赞",
  "贋": "赝",
  "贍": "赡",
  "贏": "赢",
  "贐": "赆",
  "贓": "赃",
  "贔": "赑",
  "贖": "赎",
  "贗": "赝",
  "贛": "赣",
  "贜": "赃",
  "赬": "赪",
  "趕": "赶",
  "趙": "赵",
  "趨": "趋",
  "趲": "趱",
  "跡": "迹",
  "踐": "践",
  "踰": "逾",
  "踴": "踊",
  "蹌": "跄",
  "蹕": "跸",
  "蹟": "迹",
  "蹣": "蹒",
  "蹤": "踪",
  "蹺": "跷",
  "躂": "跶",
  "躉": "趸",
  "躊": "踌",
  "躋": "跻",
  "躍": "跃",
  "躎": "䟢",
  "躑": "踯",
  "躒": "跞",
  "躓": "踬",
  "躕": "蹰",
  "躚": "跹",
  "躡": "蹑",
  "躥": "蹿",
  "躦": "躜",
  "躪": "躏",
  "軀": "躯",
  "車": "车",
  "軋": "轧",
  "軌": "轨",
  "軍": "军",
  "軑": "轪",
  "軒": "轩",
  "軔": "轫",
  "軛": "轭",
  "軟": "软",
  "軤": "轷",
  "軫": "轸",
  "軲": "轱",
  "軸": "轴",
  "軹": "轵",
  "軺": "轺",
  "軻": "轲",
  "軼": "轶",
  "軾": "轼",
  "較": "较",
  "輅": "辂",
  "輇": "辁",
  "輈": "辀",
  "載": "载",
  "輊": "轾",
  "輒": "辄",
  "輓": "挽",
  "輔": "辅",
  "輕": "轻",
  "輛": "辆",
  "輜": "辎",
  "輝": "辉",
  "輞": "辋",
  "輟": "辍",
  "輥": "辊",
  "輦": "辇",
  "輩": "辈",
  "輪": "轮",
  "輬": "辌",
  "輯": "辑",
  "輳": "辏",
  "輸": "输",
  "輻": "辐",
  "輼": "辒",
  "輾": "辗",
  "輿": "舆",
  "轀": "辒",
  "轂": "毂",
  "轄": "辖",
  "轅": "辕",
  "轆": "辘",
  "轉": "转",
  "轍": "辙",
  "轎": "轿",
  "轔": "辚",
  "轟": "轰",
  "轡": "辔",
  "轢": "轹",
  "轤": "轳",
  "辦": "办",
  "辭": "辞",
  "辮": "辫",
  "辯": "辩",
  "農": "农",
  "迴": "回",
  "逕": "迳",
  "這": "这",
  "連": "连",
  "週": "周",
  "進": "进",
  "遊": "游",
  "運": "运",
  "過": "过",
  "達": "达",
  "違": "违",
  "遙": "遥",
  "遜": "逊",
  "遞": "递",
  "遠": "远",
  "遡": "溯",
  "適": "适",
  "遲": "迟",
  "遷": "迁",
  "選": "选",
  "遺": "遗",
  "遼": "辽",
  "邁": "迈",
  "還": "还",
  "邇": "迩",
  "邊": "边",
  "邏": "逻",
  "邐": "逦",
  "郟": "郏",
  "郵": "邮",
  "鄆": "郓",
  "鄉": "乡",
  "鄒": "邹",
  "鄔": "邬",
  "鄖": "郧",
  "鄧": "邓",
  "鄭": "郑",
  "鄰": "邻",
  "鄲": "郸",
  "鄴": "邺",
  "鄶": "郐",
  "鄺": "邝",
  "酇": "酂",
  "酈": "郦",
  "醃": "腌",
  "醖": "酝",
  "醜": "丑",
  "醞": "酝",
  "醣": "糖",
  "醫": "医",
  "醬": "酱",
  "醱": "酦",
  "釀": "酿",
  "釁": "衅",
  "釃": "酾",
  "釅": "酽",
  "釋": "释",
  "釐": "厘",
  "釒": "钅",
  "釓": "钆",
  "釔": "钇",
  "釕": "钌",
  "釗": "钊",
  "釘": "钉",
  "釙": "钋",
  "針": "针",
  "釣": "钓",
  "釤": "钐",
  "釦": "扣",
  "釧": "钏",
  "釩": "钒",
  "釵": "钗",
  "釷": "钍",
  "釹": "钕",
  "釺": "钎",
  "釾": "䥺",
  "鈀": "钯",
  "鈁": "钫",
  "鈃": "钘",
  "鈄": "钭",
  "鈅": "钥",
  "鈈": "钚",
  "鈉": "钠",
  "鈍": "钝",
  "鈎": "钩",
  "鈐": "钤",
  "鈑": "钣",
  "鈒": "钑",
  "鈔": "钞",
  "鈞": "钧",
  "鈡": "钟",
  "鈣": "钙",
  "鈥": "钬",
  "鈦": "钛",
  "鈧": "钪",
  "鈮": "铌",
  "鈰": "铈",
  "鈳": "钶",
  "鈴": "铃",
  "鈷": "钴",
  "鈸": "钹",
  "鈹": "铍",
  "鈺": "钰",
  "鈽": "钸",
  "鈾": "铀",
  "鈿": "钿",
  "鉀": "钾",
  "鉆": "钻",
  "鉈": "铊",
  "鉉": "铉",
  "鉋": "铇",
  "鉍": "铋",
  "鉑": "铂",
  "鉕": "钷",
  "鉗": "钳",
  "鉚": "铆",
  "鉛": "铅",
  "鉞": "钺",
  "鉢": "钵",
  "鉤": "钩",
  "鉦": "钲",
  "鉬": "钼",
  "鉭": "钽",
  "鉶": "铏",
  "鉸": "铰",
  "鉺": "铒",
  "鉻": "铬",
  "鉿": "铪",
  "銀": "银",
  "銃": "铳",
  "銅": "铜",
  "銍": "铚",
  "銑": "铣",
  "銓": "铨",
  "銖": "铢",
  "銘": "铭",
  "銚": "铫",
  "銛": "铦",
  "銜": "衔",
  "銠": "铑",
  "銣": "铷",
  "銥": "铱",
  "銦": "铟",
  "銨": "铵",
  "銩": "铥",
  "銪": "铕",
  "銫": "铯",
  "銬": "铐",
  "銱": "铞",
  "銳": "锐",
  "銷": "销",
  "銹": "锈",
  "銻": "锑",
  "銼": "锉",
  "鋁": "铝",
  "鋃": "锒",
  "鋅": "锌",
  "鋇": "钡",
  "鋌": "铤",
  "鋏": "铗",
  "鋒": "锋",
  "鋙": "铻",
  "鋝": "锊",
  "鋟": "锓",
  "鋣": "铘",
  "鋤": "锄",
  "鋥": "锃",
  "鋦": "锔",
  "鋨": "锇",
  "鋩": "铓",
  "鋪": "铺",
  "鋭": "锐",
  "鋮": "铖",
  "鋯": "锆",
  "鋰": "锂",
  "鋱": "铽",
  "鋶": "锍",
  "鋸": "锯",
  "鋼": "钢",
  "錁": "锞",
  "錄": "录",
  "錆": "锖",
  "錇": "锫",
  "錈": "锩",
  "錏": "铔",
  "錐": "锥",
  "錒": "锕",
  "錕": "锟",
  "錘": "锤",
  "錙": "锱",
  "錚": "铮",
  "錛": "锛",
  "錟": "锬",
  "錠": "锭",
  "錡": "锜",
  "錢": "钱",
  "錦": "锦",
  "錨": "锚",
  "錩": "锠",
  "錫": "锡",
  "錮": "锢",
  "錯": "错",
  "録": "录",
  "錳": "锰",
  "錶": "表",
  "錸": "铼",
  "鍀": "锝",
  "鍁": "锨",
  "鍃": "锪",
  "鍆": "钔",
  "鍇": "锴",
  "鍈": "锳",
  "鍋": "锅",
  "鍍": "镀",
  "鍔": "锷",
  "鍘": "铡",
  "鍚": "钖",
  "鍛": "锻",
  "鍠": "锽",
  "鍤": "锸",
  "鍥": "锲",
  "鍩": "锘",
  "鍬": "锹",
  "鍰": "锾",
  "鍵": "键",
  "鍶": "锶",
  "鍺": "锗",
  "鍼": "针",
  "鎂": "镁",
  "鎄": "锿",
  "鎇": "镅",
  "鎊": "镑",
  "鎌": "镰",
  "鎔": "镕",
  "鎖": "锁",
  "鎘": "镉",
  "鎚": "锤",
  "鎛": "镈",
  "鎡": "镃",
  "鎢": "钨",
  "鎣": "蓥",
  "鎦": "镏",
  "鎧": "铠",
  "鎩": "铩",
  "鎪": "锼",
  "鎬": "镐",
  "鎭": "镇",
  "鎮": "镇",
  "鎰": "镒",
  "鎲": "镋",
  "鎳": "镍",
  "鎵": "镓",
  "鎸": "镌",
  "鎿": "镎",
  "鏃": "镞",
  "鏇": "镟",
  "鏈": "链",
  "鏌": "镆",
  "鏍": "镙",
  "鏐": "镠",
  "鏑": "镝",
  "鏗": "铿",
  "鏘": "锵",
  "鏚": "戚",
  "鏜": "镗",
  "鏝": "镘",
  "鏞": "镛",
  "鏟": "铲",
  "鏡": "镜",
  "鏢": "镖",
  "鏤": "镂",
  "鏨": "錾",
  "鏰": "镚",
  "鏵": "铧",
  "鏷": "镤",
  "鏹": "镪",
  "鏺": "䥽",
  "鏽": "锈",
  "鐃": "铙",
  "鐋": "铴",
  "鐐": "镣",
  "鐒": "铹",
  "鐓": "镦",
  "鐔": "镡",
  "鐗": "锏",
  "鐘": "钟",
  "鐙": "镫",
  "鐝": "镢",
  "鐠": "镨",
  "鐥": "䦅",
  "鐦": "锎",
  "鐧": "锏",
  "鐨": "镄",
  "鐫": "镌",
  "鐮": "镰",
  "鐯": "䦃",
  "鐲": "镯",
  "鐳": "镭",
  "鐵": "铁",
  "鐶": "镮",
  "鐸": "铎",
  "鐺": "铛",
  "鐿": "镱",
  "鑄": "铸",
  "鑊": "镬",
  "鑌": "镔",
  "鑑": "鉴",
  "鑒": "鉴",
  "鑔": "镲",
  "鑕": "锧",
  "鑞": "镴",
  "鑠": "铄",
  "鑣": "镳",
  "鑥": "镥",
  "鑭": "镧",
  "鑰": "钥",
  "鑱": "镵",
  "鑲": "镶",
  "鑷": "镊",
  "鑹": "镩",
  "鑼": "锣",
  "鑽": "钻",
  "鑾": "銮",
  "鑿": "凿",
  "钂": "镋",
  "镟": "旋",
  "長": "长",
  "門": "门",
  "閂": "闩",
  "閃": "闪",
  "閆": "闫",
  "閈": "闬",
  "閉": "闭",
  "閌": "闶",
  "閎": "闳",
  "閏": "闰",
  "閑": "闲",
  "間": "间",
  "閔": "闵",
  "閘": "闸",
  "閡": "阂",
  "閣": "阁",
  "閤": "合",
  "閥": "阀",
  "閨": "闺",
  "閩": "闽",
  "閫": "阃",
  "閬": "阆",
  "閭": "闾",
  "閱": "阅",
  "閲": "阅",
  "閶": "阊",
  "閹": "阉",
  "閻": "阎",
  "閼": "阏",
  "閽": "阍",
  "閾": "阈",
  "閿": "阌",
  "闃": "阒",
  "闆": "板",
  "闇": "暗",
  "闈": "闱",
  "闊": "阔",
  "闋": "阕",
  "闌": "阑",
  "闍": "阇",
  "闐": "阗",
  "闒": "阘",
  "闓": "闿",
  "闔": "阖",
  "闕": "阙",
  "闖": "闯",
  "關": "关",
  "闞": "阚",
  "闠": "阓",
  "闡": "阐",
  "闢": "辟",
  "闤": "阛",
  "闥": "闼",
  "陘": "陉",
  "陝": "陕",
  "陞": "升",
  "陣": "阵",
  "陰": "阴",
  "陳": "陈",
  "陸": "陆",
  "陽": "阳",
  "隉": "陧",
  "隊": "队",
  "階": "阶",
  "隕": "陨",
  "際": "际",
  "隨": "随",
  "險": "险",
  "隱": "隐",
  "隴": "陇",
  "隸": "隶",
  "隻": "只",
  "雋": "隽",
  "雖": "虽",
  "雙": "双",
  "雛": "雏",
  "雜": "杂",
  "雞": "鸡",
  "離": "离",
  "難": "难",
  "雲": "云",
  "電": "电",
  "霢": "霡",
  "霧": "雾",
  "霽": "霁",
  "靂": "雳",
  "靄": "霭",
  "靆": "叇",
  "靈": "灵",
  "靉": "叆",
  "靚": "靓",
  "靜": "静",
  "靨": "靥",
  "鞀": "鼗",
  "鞏": "巩",
  "鞝": "绱",
  "鞦": "秋",
  "鞽": "鞒",
  "韁": "缰",
  "韃": "鞑",
  "韆": "千",
  "韉": "鞯",
  "韋": "韦",
  "韌": "韧",
  "韍": "韨",
  "韓": "韩",
  "韙": "韪",
  "韜": "韬",
  "韞": "韫",
  "韻": "韵",
  "響": "响",
  "頁": "页",
  "頂": "顶",
  "頃": "顷",
  "項": "项",
  "順": "顺",
  "頇": "顸",
  "須": "须",
  "頊": "顼",
  "頌": "颂",
  "頎": "颀",
  "頏": "颃",
  "預": "预",
  "頑": "顽",
  "頒": "颁",
  "頓": "顿",
  "頗": "颇",
  "領": "领",
  "頜": "颌",
  "頡": "颉",
  "頤": "颐",
  "頦": "颏",
  "頭": "头",
  "頮": "颒",
  "頰": "颊",
  "頲": "颋",
  "頴": "颕",
  "頷": "颔",
  "頸": "颈",
  "頹": "颓",
  "頻": "频",
  "頽": "颓",
  "顆": "颗",
  "題": "题",
  "額": "额",
  "顎": "颚",
  "顏": "颜",
  "顒": "颙",
  "顓": "颛",
  "顔": "颜",
  "顙": "颡",
  "顛": "颠",
  "類": "类",
  "顢": "颟",
  "顥": "颢",
  "顧": "顾",
  "顫": "颤",
  "顬": "颥",
  "顯": "显",
  "顰": "颦",
  "顱": "颅",
  "顳": "颞",
  "顴": "颧",
  "風": "风",
  "颭": "飐",
  "颮": "飑",
  "颯": "飒",
  "颱": "台",
  "颳": "刮",
  "颶": "飓",
  "颸": "飔",
  "颺": "飏",
  "颻": "飖",
  "颼": "飕",
  "飀": "飗",
  "飄": "飘",
  "飆": "飙",
  "飈": "飚",
  "飛": "飞",
  "飠": "饣",
  "飢": "饥",
  "飣": "饤",
  "飥": "饦",
  "飩": "饨",
  "飪": "饪",
  "飫": "饫",
  "飭": "饬",
  "飯": "饭",
  "飱": "飧",
  "飲": "饮",
  "飴": "饴",
  "飼": "饲",
  "飽": "饱",
  "飾": "饰",
  "飿": "饳",
  "餃": "饺",
  "餄": "饸",
  "餅": "饼",
  "餉": "饷",
  "養": "养",
  "餌": "饵",
  "餎": "饹",
  "餏": "饻",
  "餑": "饽",
  "餒": "馁",
  "餓": "饿",
  "餕": "馂",
  "餖": "饾",
  "餚": "肴",
  "餛": "馄",
  "餜": "馃",
  "餞": "饯",
  "餡": "馅",
  "館": "馆",
  "餳": "饧",
  "餶": "馉",
  "餷": "馇",
  "餺": "馎",
  "餼": "饩",
  "餾": "馏",
  "餿": "馊",
  "饁": "馌",
  "饃": "馍",
  "饅": "馒",
  "饈": "馐",
  "饉": "馑",
  "饊": "馓",
  "饋": "馈",
  "饌": "馔",
  "饑": "饥",
  "饒": "饶",
  "饗": "飨",
  "饜": "餍",
  "饞": "馋",
  "饢": "馕",
  "馬": "马",
  "馭": "驭",
  "馮": "冯",
  "馱": "驮",
  "馳": "驰",
  "馴": "驯",
  "馹": "驲",
  "駁": "驳",
  "駐": "驻",
  "駑": "驽",
  "駒": "驹",
  "駔": "驵",
  "駕": "驾",
  "駘": "骀",
  "駙": "驸",
  "駛": "驶",
  "駝": "驼",
  "駟": "驷",
  "駡": "骂",
  "駢": "骈",
  "駭": "骇",
  "駰": "骃",
  "駱": "骆",
  "駸": "骎",
  "駿": "骏",
  "騁": "骋",
  "騂": "骍",
  "騅": "骓",
  "騌": "骔",
  "騍": "骒",
  "騎": "骑",
  "騏": "骐",
  "騖": "骛",
  "騙": "骗",
  "騤": "骙",
  "騧": "䯄",
  "騫": "骞",
  "騭": "骘",
  "騮": "骝",
  "騰": "腾",
  "騶": "驺",
  "騷": "骚",
  "騸": "骟",
  "騾": "骡",
  "驀": "蓦",
  "驁": "骜",
  "驂": "骖",
  "驃": "骠",
  "驅": "驱",
  "驊": "骅",
  "驌": "骕",
  "驍": "骁",
  "驏": "骣",
  "驕": "骄",
  "驗": "验",
  "驚": "惊",
  "驛": "驿",
  "驟": "骤",
  "驢": "驴",
  "驤": "骧",
  "驥": "骥",
  "驦": "骦",
  "驪": "骊",
  "驫": "骉",
  "骯": "肮",
  "髏": "髅",
  "髒": "脏",
  "體": "体",
  "髕": "髌",
  "髖": "髋",
  "髮": "发",
  "鬆": "松",
  "鬍": "胡",
  "鬚": "须",
  "鬢": "鬓",
  "鬥": "斗",
  "鬧": "闹",
  "鬨": "哄",
  "鬩": "阋",
  "鬮": "阄",
  "鬱": "郁",
  "鬹": "鬶",
  "魎": "魉",
  "魘": "魇",
  "魚": "鱼",
  "魛": "鱽",
  "魢": "鱾",
  "魨": "鲀",
  "魯": "鲁",
  "魴": "鲂",
  "魷": "鱿",
  "魺": "鲄",
  "鮁": "鲅",
  "鮃": "鲆",
  "鮊": "鲌",
  "鮋": "鲉",
  "鮍": "鲏",
  "鮎": "鲇",
  "鮐": "鲐",
  "鮑": "鲍",
  "鮒": "鲋",
  "鮓": "鲊",
  "鮚": "鲒",
  "鮜": "鲘",
  "鮝": "鲞",
  "鮞": "鲕",
  "鮣": "䲟",
  "鮦": "鲖",
  "鮪": "鲔",
  "鮫": "鲛",
  "鮭": "鲑",
  "鮮": "鲜",
  "鮳": "鲓",
  "鮶": "鲪",
  "鮺": "鲝",
  "鯀": "鲧",
  "鯁": "鲠",
  "鯇": "鲩",
  "鯉": "鲤",
  "鯊": "鲨",
  "鯒": "鲬",
  "鯔": "鲻",
  "鯕": "鲯",
  "鯖": "鲭",
  "鯗": "鲞",
  "鯛": "鲷",
  "鯝": "鲴",
  "鯡": "鲱",
  "鯢": "鲵",
  "鯤": "鲲",
  "鯧": "鲳",
  "鯨": "鲸",
  "鯪": "鲮",
  "鯫": "鲰",
  "鯰": "鲶",
  "鯴": "鲺",
  "鯷": "鳀",
  "鯽": "鲫",
  "鯿": "鳊",
  "鰁": "鳈",
  "鰂": "鲗",
  "鰃": "鳂",
  "鰆": "䲠",
  "鰈": "鲽",
  "鰉": "鳇",
  "鰌": "䲡",
  "鰍": "鳅",
  "鰏": "鲾",
  "鰐": "鳄",
  "鰒": "鳆",
  "鰓": "鳃",
  "鰛": "鳁",
  "鰜": "鳒",
  "鰟": "鳑",
  "鰠": "鳋",
  "鰣": "鲥",
  "鰥": "鳏",
  "鰧": "䲢",
  "鰨": "鳎",
  "鰩": "鳐",
  "鰭": "鳍",
  "鰮": "鳁",
  "鰱": "鲢",
  "鰲": "鳌",
  "鰳": "鳓",
  "鰵": "鳘",
  "鰷": "鲦",
  "鰹": "鲣",
  "鰺": "鲹",
  "鰻": "鳗",
  "鰼": "鳛",
  "鰾": "鳔",
  "鱂": "鳉",
  "鱅": "鳙",
  "鱈": "鳕",
  "鱉": "鳖",
  "鱒": "鳟",
  "鱔": "鳝",
  "鱖": "鳜",
  "鱗": "鳞",
  "鱘": "鲟",
  "鱝": "鲼",
  "鱟": "鲎",
  "鱠": "鲙",
  "鱣": "鳣",
  "鱤": "鳡",
  "鱧": "鳢",
  "鱨": "鲿",
  "鱭": "鲚",
  "鱯": "鳠",
  "鱷": "鳄",
  "鱸": "鲈",
  "鱺": "鲡",
  "鳥": "鸟",
  "鳧": "凫",
  "鳩": "鸠",
  "鳬": "凫",
  "鳲": "鸤",
  "鳳": "凤",
  "鳴": "鸣",
  "鳶": "鸢",
  "鳾": "䴓",
  "鴆": "鸩",
  "鴇": "鸨",
  "鴉": "鸦",
  "鴒": "鸰",
  "鴕": "鸵",
  "鴛": "鸳",
  "鴝": "鸲",
  "鴞": "鸮",
  "鴟": "鸱",
  "鴣": "鸪",
  "鴦": "鸯",
  "鴨": "鸭",
  "鴯": "鸸",
  "鴰": "鸹",
  "鴴": "鸻",
  "鴷": "䴕",
  "鴻": "鸿",
  "鴿": "鸽",
  "鵁": "䴔",
  "鵂": "鸺",
  "鵃": "鸼",
  "鵐": "鹀",
  "鵑": "鹃",
  "鵒": "鹆",
  "鵓": "鹁",
  "鵜": "鹈",
  "鵝": "鹅",
  "鵠": "鹄",
  "鵡": "鹉",
  "鵪": "鹌",
  "鵬": "鹏",
  "鵮": "鹐",
  "鵯": "鹎",
  "鵲": "鹊",
  "鵷": "鹓",
  "鵾": "鹍",
  "鶄": "䴖",
  "鶇": "鸫",
  "鶉": "鹑",
  "鶊": "鹒",
  "鶓": "鹋",
  "鶖": "鹙",
  "鶘": "鹕",
  "鶚": "鹗",
  "鶡": "鹖",
  "鶥": "鹛",
  "鶩": "鹜",
  "鶪": "䴗",
  "鶬": "鸧",
  "鶯": "莺",
  "鶲": "鹟",
  "鶴": "鹤",
  "鶹": "鹠",
  "鶺": "鹡",
  "鶻": "鹘",
  "鶼": "鹣",
  "鶿": "鹚",
  "鷀": "鹚",
  "鷁": "鹢",
  "鷂": "鹞",
  "鷄": "鸡",
  "鷈": "䴘",
  "鷉": "䴘",
  "鷊": "鹝",
  "鷓": "鹧",
  "鷖": "鹥",
  "鷗": "鸥",
  "鷙": "鸷",
  "鷚": "鹨",
  "鷥": "鸶",
  "鷦": "鹪",
  "鷫": "鹔",
  "鷯": "鹩",
  "鷲": "鹫",
  "鷳": "鹇",
  "鷴": "鹇",
  "鷸": "鹬",
  "鷹": "鹰",
  "鷺": "鹭",
  "鷽": "鸴",
  "鷿": "䴙",
  "鸂": "㶉",
  "鸇": "鹯",
  "鸊": "䴙",
  "鸌": "鹱",
  "鸏": "鹲",
  "鸕": "鸬",
  "鸘": "鹴",
  "鸚": "鹦",
  "鸛": "鹳",
  "鸝": "鹂",
  "鸞": "鸾",
  "鹵": "卤",
  "鹹": "咸",
  "鹺": "鹾",
  "鹼": "碱",
  "鹽": "盐",
  "麗": "丽",
  "麥": "麦",
  "麩": "麸",
  "麫": "面",
  "麯": "曲",
  "黃": "黄",
  "黌": "黉",
  "點": "点",
  "黨": "党",
  "黲": "黪",
  "黴": "霉",
  "黶": "黡",
  "黷": "黩",
  "黽": "黾",
  "黿": "鼋",
  "鼉": "鼍",
  "鼕": "冬",
  "鼴": "鼹",
  "齇": "齄",
  "齊": "齐",
  "齋": "斋",
  "齎": "赍",
  "齏": "齑",
  "齒": "齿",
  "齔": "龀",
  "齕": "龁",
  "齗": "龂",
  "齙": "龅",
  "齜": "龇",
  "齟": "龃",
  "齠": "龆",
  "齡": "龄",
  "齣": "出",
  "齦": "龈",
  "齪": "龊",
  "齬": "龉",
  "齲": "龋",
  "齶": "腭",
  "齷": "龌",
  "龍": "龙",
  "龎": "厐",
  "龐": "庞",
  "龑": "䶮",
  "龔": "龚",
  "龕": "龛",
  "龜": "龟",
  "鿁": "䜤",
  "妳": "你"
};
var regexp = new RegExp(Object.keys(aTC2SC).join("|"), "g");
function cht2chs(text) {
  return text.replace(regexp, (d) => aTC2SC[d]);
}

// src/runtime/player/closed_caption.css
var _default3 = {};

// src/runtime/player/closed_caption.ts
var ClosedCaption = class {
  element = {};
  data = {};
  resizeRate = 100;
  subtitle = [];
  ON = \`<svg width="22" height="28" viewbox="0 0 22 30" xmlns="http://www.w3.org/2000/svg"><path id="svg_1" fill-rule="evenodd" fill="#99a2aa" d="m4.07787,6.88102l14,0a2,2 0 0 1 2,2l0,10a2,2 0 0 1 -2,2l-14,0a2,2 0 0 1 -2,-2l0,-10a2,2 0 0 1 2,-2zm5,5.5a1,1 0 1 0 0,-2l-3,0a2,2 0 0 0 -2,2l0,3a2,2 0 0 0 2,2l3,0a1,1 0 0 0 0,-2l-2,0a1,1 0 0 1 -1,-1l0,-1a1,1 0 0 1 1,-1l2,0zm8,0a1,1 0 0 0 0,-2l-3,0a2,2 0 0 0 -2,2l0,3a2,2 0 0 0 2,2l3,0a1,1 0 0 0 0,-2l-2,0a1,1 0 0 1 -1,-1l0,-1a1,1 0 0 1 1,-1l2,0z"/></svg>\`;
  OFF = \`<svg width="22" height="28" viewBox="0 0 22 32" xmlns="http://www.w3.org/2000/svg"><path id="svg_1" fill-rule="evenodd" fill="#99a2aa" d="m15.172,21.87103l-11.172,0a2,2 0 0 1 -2,-2l0,-10c0,-0.34 0.084,-0.658 0.233,-0.938l-0.425,-0.426a1,1 0 1 1 1.414,-1.414l15.556,15.556a1,1 0 0 1 -1.414,1.414l-2.192,-2.192zm-10.21,-10.21c-0.577,0.351 -0.962,0.986 -0.962,1.71l0,3a2,2 0 0 0 2,2l3,0a1,1 0 0 0 0,-2l-2,0a1,1 0 0 1 -1,-1l0,-1a1,1 0 0 1 0.713,-0.958l-1.751,-1.752zm1.866,-3.79l11.172,0a2,2 0 0 1 2,2l0,10c0,0.34 -0.084,0.658 -0.233,0.938l-2.48,-2.48a1,1 0 0 0 -0.287,-1.958l-1.672,0l-1.328,-1.328l0,-0.672a1,1 0 0 1 1,-1l2,0a1,1 0 0 0 0,-2l-3,0a2,2 0 0 0 -1.977,1.695l-5.195,-5.195z"/></svg>\`;
  color = [
    { value: "16777215", content: '<span style="color:#FFF;text-shadow: #000 0px 0px 1px">白色</span>' },
    { value: "16007990", content: '<b style="color:#F44336;text-shadow: #000 0px 0px 1px">红色</b>' },
    { value: "10233776", content: '<b style="color:#9C27B0;text-shadow: #000 0px 0px 1px">紫色</b>' },
    { value: "6765239", content: '<b style="color:#673AB7;text-shadow: #000 0px 0px 1px">深紫色</b>' },
    { value: "4149685", content: '<b style="color:#3F51B5;text-shadow: #000 0px 0px 1px">靛青色</b>' },
    { value: "2201331", content: '<b style="color:#2196F3;text-shadow: #000 0px 0px 1px">蓝色</b>' },
    { value: "240116", content: '<b style="color:#03A9F4;text-shadow: #000 0px 0px 1px">亮蓝色</b>' }
  ];
  position = [
    { value: "bl", content: "左下角" },
    { value: "bc", content: "底部居中" },
    { value: "br", content: "右下角" },
    { value: "tl", content: "左上角" },
    { value: "tc", content: "顶部居中" },
    { value: "tr", content: "右上角" }
  ];
  shadow = [
    { value: "0", content: "无描边", style: "" },
    { value: "1", content: "重墨", style: \`text-shadow: #000 1px 0px 1px, #000 0px 1px 1px, #000 0px -1px 1px,#000 -1px 0px 1px;\` },
    { value: "2", content: "描边", style: \`text-shadow: #000 0px 0px 1px, #000 0px 0px 1px, #000 0px 0px 1px;\` },
    { value: "3", content: "45°投影", style: \`text-shadow: #000 1px 1px 2px, #000 0px 0px 1px;\` }
  ];
  setting;
  subtitlePrefer;
  isON = false;
  caption;
  contain;
  captions = [];
  text;
  constructor() {
    this.setting = { backgroundopacity: 0.5, color: 16777215, fontsize: 1, isclosed: false, scale: true, shadow: "0", position: "bc" };
    if (GM_getValue) {
      const d = GM_getValue("subtitle", this.setting);
      d && (this.setting = d);
    } else {
      GM.getValue("subtitle").then((d) => {
        d && (this.setting = d);
      });
    }
    if (GM_getValue) {
      const d = GM_getValue("subtitlePrefer", void 0);
      this.subtitlePrefer = d;
    } else {
      GM.getValue("subtitlePrefer").then((d) => {
        this.subtitlePrefer = d;
      });
    }
  }
  initUI() {
    this.element.node = document.createElement("div");
    this.element.node.setAttribute("class", "bilibili-player-video-btn");
    this.element.node.setAttribute("id", "bilibili-player-subtitle-btn");
    this.element.node.setAttribute("style", "display: block;");
    this.element.span = addElement("span", {}, this.element.node);
    this.element.span.innerHTML = this.ON;
    this.isON = true;
    this.element.span.onclick = () => {
      if (this.isON)
        this.iconSwitch();
      else
        this.iconSwitch(this.caption);
    };
    this.element.table = addElement("div", { id: "subtitle-setting-panel", style: "position: absolute; bottom: 28px; right: 30px; background: white; border-radius: 4px; text-align: left; padding: 13px; display: none; cursor: default;" }, this.element.node);
    this.language();
    this.fontsize();
    this.fontcolor();
    this.fontshadow();
    this.fontposition();
    this.fontopacrity();
    addCss(_default3);
    this.changeResize();
    this.changePosition();
  }
  changeStyle() {
    document.querySelector("#caption-style")?.remove();
    addCss(\`span.subtitle-item-background{opacity: \${this.setting.backgroundopacity};}
            span.subtitle-item-text {color:#\${("000000" + this.setting.color.toString(16)).slice(-6)};}
            span.subtitle-item {font-size: \${this.setting.fontsize * this.resizeRate}%;line-height: 110%;}
            span.subtitle-item {\${this.shadow[this.setting.shadow].style}}\`, "caption-style");
    GM.setValue("subtitle", JSON.parse(JSON.stringify(this.setting)));
  }
  changeResize() {
    this.resizeRate = this.setting.scale ? window.player.getWidth() / 1280 * 100 : 100;
    this.changeStyle();
  }
  changePosition() {
    this.contain = document.querySelector(".bilibili-player-video-subtitle>div");
    this.contain.className = "subtitle-position subtitle-position-" + (this.setting.position || "bc");
    this.contain.style = "";
    GM.setValue("subtitle", JSON.parse(JSON.stringify(this.setting)));
  }
  iconSwitch(caption) {
    if (caption) {
      this.isON = true;
      this.element.span.innerHTML = this.ON;
      this.setCaption(caption);
      this.text.innerHTML = caption.lan_doc;
      this.element.language.children[2].disabled = false;
    } else {
      this.isON = false;
      this.element.span.innerHTML = this.OFF;
      this.setCaption();
      this.text.innerHTML = "关闭";
      this.element.language.children[2].disabled = true;
    }
  }
  language() {
    this.element.language = addElement("div", {}, this.element.table);
    this.element.language.innerHTML = \`<div>字幕</div>
            <div class="bilibili-player-block-string-type bpui-component bpui-selectmenu selectmenu-mode-absolute" style="width: 100px;">
            <div class="bpui-selectmenu-txt">关闭</div>
            <div class="bpui-selectmenu-arrow bpui-icon bpui-icon-arrow-down"></div>
            <ul class="bpui-selectmenu-list bpui-selectmenu-list-left" style="max-height: 180px; overflow: hidden auto; white-space: nowrap;">
            <li class="bpui-selectmenu-list-row" data-value="close">关闭</li>
            </ul></div>
            <button class="bpui-button" style="padding: 0px 8px;">下载</button>
            <a class="bpui-button" href="https://member.bilibili.com/v2#/zimu/my-zimu/zimu-editor?cid=\${API.cid}&aid=\${API.aid}" target="_blank" title="" style="margin-right: 0px; height: 24px; padding: 0px 6px;">添加字幕</a>\`;
    let list = this.element.language.children[1].children[2];
    this.text = this.element.language.children[1].children[0];
    this.element.language.children[2].onclick = () => {
      this.caption.subtitle_url && fetch(this.caption.subtitle_url).then((d) => {
        d.blob().then((d2) => {
          saveAs(d2, \`\${sessionStorage.getItem("title")}-\${this.caption.lan_doc}.json\`);
        });
      });
    };
    list.children[0].onclick = () => {
      this.text.innerHTML = "关闭";
      this.setCaption();
    };
    this.text.innerHTML = this.caption.lan_doc;
    this.captions = this.captions.reverse();
    this.captions.forEach((d) => {
      let temp2 = addElement("div", { class: "bpui-selectmenu-list-row", "data-value": d.lan }, list, d.lan_doc, true);
      temp2.onclick = () => {
        this.text.innerHTML = d.lan_doc;
        this.iconSwitch(d);
        GM.setValue("subtitlePrefer", JSON.parse(JSON.stringify(this.subtitlePrefer = d.lan)));
      };
    });
  }
  fontsize() {
    this.element.fontsize = addElement("div", {}, this.element.table);
    this.element.fontsize.innerHTML = \`<div>字体大小</div>
            <input type="range" step="25" style="width: 70%;">
            <input id="subtitle-auto-resize" type="checkbox">
            <label for="subtitle-auto-resize" style="cursor: pointer;">自动缩放</label>\`;
    this.element.fontsize.children[1].value = this.setting.fontsize == 0.6 ? 0 : this.setting.fontsize == 0.8 ? 25 : this.setting.fontsize == 1.3 ? 75 : this.setting.fontsize == 1.6 ? 100 : 50;
    this.element.fontsize.children[1].oninput = (e) => {
      const v = e.target.value / 25;
      this.setting.fontsize = v > 2 ? (v - 2) * 0.3 + 1 : v * 0.2 + 0.6;
      this.changeStyle();
    };
    this.element.fontsize.children[2].checked = this.setting.scale;
    this.element.fontsize.children[2].onchange = (e) => this.changeResize(this.setting.scale = e.target.checked);
  }
  fontcolor() {
    this.element.fontcolor = addElement("div", {}, this.element.table);
    this.element.fontcolor.innerHTML = \`<span>字幕颜色</span>
            <div class="bilibili-player-block-string-type bpui-component bpui-selectmenu selectmenu-mode-absolute" style="width: 74%;">
            <div class="bpui-selectmenu-txt"><span style="color:#FFF;text-shadow: #000 0px 0px 1px">白色</span></div>
            <div class="bpui-selectmenu-arrow bpui-icon bpui-icon-arrow-down"></div>
            <ul class="bpui-selectmenu-list bpui-selectmenu-list-left" style="max-height: 120px; overflow: hidden auto; white-space: nowrap;"></ul>
            </div>\`;
    this.color.forEach((d) => {
      if (d.value == this.setting.color)
        this.element.fontcolor.children[1].children[0].innerHTML = d.content;
      let temp2 = addElement("li", { class: "bpui-selectmenu-list-row", "data-value": d.value }, this.element.fontcolor.children[1].children[2]);
      temp2.innerHTML = d.content;
      temp2.onclick = () => {
        this.element.fontcolor.children[1].children[0].innerHTML = d.content;
        this.changeStyle(this.setting.color = parseInt(d.value));
      };
    });
  }
  fontshadow() {
    this.element.fontshadow = addElement("div", {}, this.element.table);
    this.element.fontshadow.innerHTML = \`<span>字幕描边</span>
            <div class="bilibili-player-block-string-type bpui-component bpui-selectmenu selectmenu-mode-absolute" style="width: 74%;">
            <div class="bpui-selectmenu-txt">无描边</div>
            <div class="bpui-selectmenu-arrow bpui-icon bpui-icon-arrow-down"></div>
            <ul class="bpui-selectmenu-list bpui-selectmenu-list-left" style="max-height: 120px; overflow: hidden auto; white-space: nowrap;"></ul>
            </div>\`;
    this.shadow.forEach((d) => {
      if (d.value == this.setting.shadow)
        this.element.fontshadow.children[1].children[0].innerHTML = d.content;
      let temp2 = addElement("li", { class: "bpui-selectmenu-list-row", "data-value": d.value }, this.element.fontshadow.children[1].children[2]);
      temp2.innerHTML = d.content;
      temp2.onclick = () => {
        this.element.fontshadow.children[1].children[0].innerHTML = d.content;
        this.changeStyle(this.setting.shadow = d.value);
      };
    });
  }
  fontposition() {
    this.element.fontposition = addElement("div", {}, this.element.table);
    this.element.fontposition.innerHTML = \`<span>字幕位置</span>
            <div class="bilibili-player-block-string-type bpui-component bpui-selectmenu selectmenu-mode-absolute" style="width: 74%;">
            <div class="bpui-selectmenu-txt">底部居中</div>
            <div class="bpui-selectmenu-arrow bpui-icon bpui-icon-arrow-down"></div>
            <ul class="bpui-selectmenu-list bpui-selectmenu-list-left" style="max-height: 100px; overflow: hidden auto; white-space: nowrap;"></ul>
            </div>\`;
    this.position.forEach((d) => {
      if (d.value == this.setting.position)
        this.element.fontposition.children[1].children[0].innerHTML = d.content;
      let temp2 = addElement("li", { class: "bpui-selectmenu-list-row", "data-value": d.value }, this.element.fontposition.children[1].children[2]);
      temp2.innerHTML = d.content;
      temp2.onclick = () => {
        this.element.fontposition.children[1].children[0].innerHTML = d.content;
        this.changePosition(this.setting.position = d.value);
      };
    });
  }
  fontopacrity() {
    this.element.fontopacrity = addElement("div", {}, this.element.table);
    this.element.fontopacrity.innerHTML = \`<div>背景不透明度</div><input type="range" style="width: 100%;">\`;
    this.element.fontopacrity.children[1].value = this.setting.backgroundopacity * 100;
    this.element.fontopacrity.children[1].oninput = (e) => {
      this.changeStyle(this.setting.backgroundopacity = e.target.value / 100);
    };
  }
  async getCaption(data) {
    try {
      this.data = [];
      this.subtitle = this.captions = data || [];
      this.convertion(this.captions);
      let i = this.captions.findIndex((d) => d.lan == this.subtitlePrefer);
      i = i < 0 ? 0 : i;
      if (this.captions[i])
        await this.setCaption(this.captions[i]);
      if (this.caption) {
        window.player.addEventListener("video_resize", (event) => {
          this.changeResize(event);
        });
        let anchor = document.querySelector(".bilibili-player-video-btn-quality");
        this.initUI();
        if (!document.querySelector("#bilibili-player-subtitle-btn"))
          anchor.insertAdjacentElement("afterend", this.element.node);
      }
    } catch (e) {
      debug.error("closedCaption.js", e);
    }
  }
  convertion(arr2) {
    let chs = false, base = void 0;
    arr2.forEach((d) => {
      d.lan && (d.lan === "zh-CN" && (chs = true), d.lan === "zh-Hans" && (chs = true), d.lan.includes("zh") && (base = { ...d }));
      setting.downloadOther && pushDownload({
        group: "CC字幕",
        url: d.subtitle_url,
        up: d.lan,
        down: d.lan_doc,
        fileName: \`\${sessionStorage.getItem("title") || \`av\${API.aid}\`}-\${d.lan_doc}.json\`
      });
    });
    if (chs || !base)
      return;
    base.lan = "zh-CN";
    base.lan_doc = "中文（繁=>简）";
    base.convert = true;
    arr2.push(base);
  }
  async setCaption(caption) {
    let data = { body: [] };
    if (caption && caption.subtitle_url) {
      this.data[caption.lan] = this.data[caption.lan] || await (await fetch(caption.subtitle_url.replace("http:", "https:"))).json();
      if (caption.convert) {
        this.data[caption.lan] = JSON.parse(cht2chs(JSON.stringify(this.data[caption.lan])));
        caption.convert = void 0;
      }
      data = this.data[caption.lan] || data;
    }
    window.player.updateSubtitle(data);
    setTimeout(() => {
      if (window.player.getState() == "PLAYING") {
        window.player.pause();
        window.player.play();
      }
    }, 1e3);
    if (caption && caption.subtitle_url) {
      this.caption = caption;
      videoFloat("载入字幕：", this.caption.lan_doc, () => {
      });
    } else
      videoFloat("关闭弹幕");
  }
};
var closedCaption = new ClosedCaption();

// src/runtime/player/seg_progress.ts
var _SegProgress = class {
  constructor(resp) {
    if (!resp || resp.length == 0)
      return;
    this.init(resp);
  }
  async init(view_points) {
    if (!_SegProgress.cssInited) {
      _SegProgress.cssInited = true;
      addCss(\`
                            .bilibili-progress-segmentation-logo{display:inline-block;position:absolute;top:-12px;height:30px;width:1px; transition: opacity .1s}
                            .bilibili-progress-segmentation-logo>img{position: absolute;top:-14px;transform:translate(-50%,-50%) scale(0.7);left:50%;transition:top 0.1s}
                            .bilibili-progress-segmentation-logo>svg{position: absolute;top: -19px;width: 32px;height: 36px;transform: translate(-50%, -50%)}
                            .bilibili-player.mode-widescreen .bilibili-progress-segmentation-logo>img,
                            .bilibili-player.mode-webfullscreen .bilibili-progress-segmentation-logo>img,
                            .bilibili-player.mode-fullscreen .bilibili-progress-segmentation-logo>img{top:-18px;left:50%;transform:translate(-50%,-50%) scale(1)}
                            .bilibili-progress-segmentation{height:29px;position:absolute;top:-12px}
                            .bilibili-progress-segmentation:hover > div > div{border-color:#fb7299;border-style:solid;border-width:0 2px;width:100%;height:3px;top:6px;left:-2px;position:relative;background:#fb7299}
                            .bilibili-progress-segmentation > div{box-sizing:border-box;border-style:solid;border-color:#fb7299;border-left-width:2px;position:absolute;width:100%;height:6px;top:12px}
                            .bilibili-progress-detail-chapter{top:-96px;position:absolute;width:100%;font-size:17px;font-weight:bold;color:#fff;text-shadow:0 0 5px #000}
                            .bilibili-progress-segmentation:last-child > div{border-right-width:2px}
                            .bilibili-player-filter-chapter:hover{color:#00a1d6}
                            .bilibili-player-chapterList{position:relative;height:100%;width:100%;overflow:auto}
                            .bilibili-player-chapterList::-webkit-scrollbar{width:6px}
                            .bilibili-player-chapterList::-webkit-scrollbar-track{border-radius:4px;background-color:#fff}
                            .bilibili-player-chapterList::-webkit-scrollbar-thumb{border-radius:4px;background-color:#fff}
                            .bilibili-player-chapterList:hover::-webkit-scrollbar-track{background-color:#edf2f9}
                            .bilibili-player-chapterList:hover::-webkit-scrollbar-thumb{background-color:#a2a2a2}
                            .bilibili-player-chapter-info{width:100%;height:72px;margin-top:5px;white-space:normal;font-size:14px;position:relative;cursor:pointer}
                            .bilibili-player-chapter-info > img{position:absolute;left:15px;top:4px;border-radius:2px}
                            .bilibili-player-chapter-info > p{padding-top:5px;margin:0 5px 5px 138px;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;height:43px}
                            .bilibili-player-chapter-info:hover > p{color:#00a1d6}
                            .bilibili-player-chapter-info > span{color:#99a2aa}
                            .bilibili-player-chapter-info.active{background-color:#f3f3f3}\`);
    }
    let sliderTracker = document.querySelector(".bilibili-player-video-progress .bpui-slider-tracker");
    let sliderBar = document.getElementsByClassName("bilibili-player-video-progress-bar")[0];
    let handleWidth = document.getElementsByClassName("bpui-slider-handle")[0].clientWidth;
    let trackerWrp = document.getElementsByClassName("bpui-slider-tracker-wrp")[0];
    let videoDuration = window.player.getDuration();
    let chptName = document.createElement("div");
    chptName.className = "bilibili-progress-detail-chapter";
    document.querySelector(".bilibili-player-video-progress-detail").appendChild(chptName);
    let type = view_points[0].type;
    let segDivs = [];
    for (let v of view_points) {
      let seg = document.createElement("div");
      if (type == "1") {
        seg.className = "bilibili-progress-segmentation-logo";
        let title = document.createElement("div");
        title.innerHTML = "-> " + v.content;
        title.className = "bilibili-progress-detail-chapter";
        title.style.cssText = "width: auto; transform: translateX(-50%); display: none";
        let img;
        if (v.logoUrl) {
          img = document.createElement("img");
          img.id = "segmentation-logo";
          img.width = 32;
          img.height = 36;
          img.src = v.logoUrl;
        } else {
          img = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          img.setAttribute("viewBox", "0 -3 32 36");
          img.innerHTML = \`
                    <defs>
                    <radialGradient id="gradient">
                            <stop offset="10%" stop-color="#ffe78f"></stop>
                            <stop offset="40%" stop-color="#ffe996"></stop>
                            <stop offset="95%" stop-color="#fcecae"></stop>
                        </radialGradient>
                    </defs>
                    <path style="fill: rgb(252, 236, 174); stroke: rgb(252, 236, 174);" d="M 16 32.097 C 13.312 32.106 10.608 30.145 11 25.897 C 11.265 22.744 16 17.097 16 17.097 C 16 17.097 20.822 22.697 21.022 25.897 C 21.322 30.097 18.801 32.088 16 32.097 Z" transform="matrix(-1, 0, 0, -1, 32.021761, 49.196602)"></path>
                    <circle cx="16" cy="22" r="5" fill="url(#gradient)"/>\`;
        }
        img.addEventListener("mousemove", (e) => e.stopPropagation());
        img.addEventListener("mouseenter", () => {
          title.style.display = "";
          img.style.zIndex = "1000";
        });
        img.addEventListener("mouseleave", () => {
          title.style.display = "none";
          img.style.zIndex = "";
        });
        img.addEventListener("click", () => window.player.seek(v.from));
        seg.appendChild(title);
        seg.appendChild(img);
      } else if (type == "2") {
        seg.className = "bilibili-progress-segmentation";
        let duration = view_points[view_points.length - 1].to;
        let ratio = videoDuration / duration / duration;
        seg.style.width = (v.to - v.from) * ratio * 100 + "%";
        seg.style.left = v.from * ratio * 100 + "%";
        seg.innerHTML = "<div><div></div></div>";
        seg.onmouseenter = () => chptName.innerHTML = v.content;
      }
      segDivs.push(seg);
      sliderTracker.appendChild(seg);
    }
    if (type == "1") {
      let update2 = function() {
        for (let i = 0; i < segDivs.length; i++) {
          segDivs[i].style.left = view_points[i].to / videoDuration * (trackerWrp.clientWidth - handleWidth) + handleWidth / 2 + "px";
        }
      }, hide2 = function() {
        if (!visibility)
          return;
        visibility = false;
        for (let i = 0; i < segDivs.length; i++)
          segDivs[i].style.opacity = "0";
        setTimeout(() => {
          for (let i = 0; i < segDivs.length; i++)
            segDivs[i].style.visibility = "hidden";
        }, 100);
      };
      var update = update2, hide = hide2;
      addCss(\`#app #bilibiliPlayer .bilibili-player-video-progress-detail > .bilibili-player-video-progress-detail-img {top:-120px}
                            .bilibili-player-video-progress-detail > .bilibili-player-video-progress-detail-time {top:-48px}\`);
      setTimeout(() => update2(), 500);
      chptName.style.top = "-150px";
      let playerArea = document.getElementsByClassName("bilibili-player-area")[0], visibility = true;
      playerArea.addEventListener("mouseleave", (e) => {
        hide2();
      });
      playerArea.addEventListener("mousemove", (e) => {
        let clientRect = playerArea.getBoundingClientRect();
        if (e.pageY < clientRect.top + window.scrollY + clientRect.height * 0.65) {
          hide2();
        } else {
          visibility = true;
          for (let i = 0; i < segDivs.length; i++) {
            segDivs[i].style.visibility = "";
            segDivs[i].style.opacity = "1";
          }
        }
      });
      trackerWrp.addEventListener("mousemove", (e) => {
        let closestPoint = 1e6;
        let box = sliderBar.getBoundingClientRect();
        let pos = (e.pageX - (box.left + window.scrollX - document.body.clientLeft) - handleWidth / 2) / (trackerWrp.clientWidth - handleWidth) * videoDuration;
        0 > pos && (pos = 0);
        pos > videoDuration && (pos = videoDuration);
        let thumbnailArea = 80 / (trackerWrp.clientWidth - handleWidth) * videoDuration;
        let hitArea = trackerWrp.clientWidth > 400 ? thumbnailArea / 10 : thumbnailArea / 20;
        for (let i = 0; i < view_points.length; i++) {
          segDivs[i].style.zIndex = "";
          if (view_points[i].to >= pos - hitArea && view_points[i].to <= pos + hitArea && Math.abs(view_points[i].to - pos) < closestPoint) {
            chptName.innerHTML = view_points[i].content;
            closestPoint = Math.abs(view_points[i].to - pos);
            segDivs[i].style.zIndex = "1000";
          }
        }
        if (closestPoint == 1e6)
          chptName.innerHTML = "";
      });
      window.player.addEventListener("video_player_resize", () => update2());
      trackerWrp.addEventListener("mouseleave", () => {
        for (let i = 0; i < segDivs.length; i++) {
          segDivs[i].className = "bilibili-progress-segmentation-logo";
        }
      });
    }
    let wrapList = document.querySelector("div.bilibili-player-wraplist");
    let panels = wrapList.children;
    let chptInfo = null;
    let chptPanel = document.createElement("div");
    chptPanel.style.display = "none";
    chptPanel.className = "bilibili-player-filter-wrap bilibili-player-chapterList";
    wrapList.appendChild(chptPanel);
    let chptBtn = document.createElement("div");
    chptBtn.className = "bilibili-player-filter-btn bilibili-player-filter-chapter bpui-component bpui-button bpui-button-type-small button";
    chptBtn.innerHTML = '<span class="bpui-button-text"><span>视频看点</span></span>';
    document.querySelector("div.bilibili-player-filter").appendChild(chptBtn);
    function refreshState() {
      if (!chptInfo)
        return;
      let progress = window.player.getCurrentTime();
      for (let i = 0, v; i < view_points.length; i++) {
        v = view_points[i];
        if (progress < v.to) {
          let active = document.querySelector(".bilibili-player-chapter-info.active");
          active && active.classList.remove("active");
          chptInfo[i].classList.add("active");
          break;
        }
      }
    }
    let timeFormat2 = (t) => t < 10 ? "0" + t : t;
    chptBtn.onclick = () => {
      let activePanel = document.querySelector("div.bilibili-player-filter-btn.active");
      if (activePanel == chptBtn)
        return;
      activePanel.classList.remove("active");
      chptBtn.classList.add("active");
      for (let i = 0; i < panels.length; i++) {
        const element = panels[i];
        if (element.style.display == "block") {
          element.style.display = "none";
          break;
        }
      }
      if (!chptInfo) {
        chptInfo = [];
        for (let i = 0, v; i < view_points.length; i++) {
          v = view_points[i];
          let dura = v.to - v.from;
          let div = document.createElement("div");
          div.className = "bilibili-player-chapter-info";
          div.innerHTML = \`<img width="112" height="63" src="\${v.imgUrl}"/>
                                        <p class="chapter-name">\${v.content}</p>
                                        <span style="margin-left: 138px">\${timeFormat2(Math.floor(v.from / 60))}:\${timeFormat2(v.from % 60)}</span>
                                        <span style="margin-right: 5px; float: right;">\${dura >= 60 ? \`\${Math.floor(dura / 60)}分\` : ""}\${dura > 0 ? \`\${dura % 60}秒\` : ""}</span>\`;
          div.onclick = ((jumpto) => () => {
            window.player.seek(jumpto);
            let active = document.querySelector(".bilibili-player-chapter-info.active");
            active && active.classList.remove("active");
            div.classList.add("active");
          })(v.from);
          chptInfo[i] = div;
          chptPanel.appendChild(div);
        }
      }
      ;
      chptPanel.style.display = "block";
      refreshState();
    };
    window.player.addEventListener("video_media_seeked", refreshState);
    chptPanel.onmouseenter = refreshState;
    class timer2 {
      static handle;
      static start() {
        if (!timer2.handle)
          timer2.handle = setInterval(refreshState, 3e3);
      }
      static stop() {
        if (timer2.handle) {
          clearInterval(timer2.handle);
          timer2.handle = null;
        }
      }
    }
    window.player.addEventListener("video_media_playing", timer2.start);
    window.player.addEventListener("video_media_pause", timer2.stop);
    if (window.player.getState() == "PLAYING")
      timer2.start();
  }
};
var SegProgress = _SegProgress;
__publicField(SegProgress, "cssInited", false);

// src/runtime/player/playinfo.ts
function dealwithPlayinfo() {
  xhrhook("/playurl?", (args) => {
    const param2 = urlObj(args[1]);
    args[1].includes("84956560bc028eb7") && (args[1] = urlsign(args[1], {}, 8));
    args[1].includes("pgc") && (API.pgc = true);
    param2.aid && (API.aid = Number(param2.aid)) && (API.aid = param2.aid);
    param2.avid && (API.aid = Number(param2.avid)) && (API.aid = param2.avid);
    param2.cid && (API.cid = Number(param2.cid)) && (API.cid = param2.cid);
    param2.seasonId && (API.ssid = param2.seasonId);
    param2.episodeId && (API.epid = param2.episodeId);
    param2.ep_id && (API.epid = param2.ep_id);
  }, (obj) => {
    try {
      const data = uposReplace(obj.responseType === "json" ? JSON.stringify(obj.response) : obj.response, setting.uposReplace.nor);
      obj.responseType === "json" ? obj.response = JSON.parse(data) : obj.response = obj.responseText = data;
      API.__playinfo__ = data;
      Promise.resolve().then(() => {
        try {
          const d = JSON.parse(data);
          if (d.code === 87005)
            toast.warning(d.message, "请到新版页面付费后继续！");
        } catch (e) {
        }
      });
    } catch (e) {
    }
  }, false);
  let timer2, tag = false;
  xhrhook("api.bilibili.com/x/player.so", () => {
    if (!tag && API.th && API.__INITIAL_STATE__?.epInfo?.subtitles) {
      if (API.__INITIAL_STATE__.epInfo.subtitles[0]) {
        setting.closedCaption && closedCaption.getCaption(API.__INITIAL_STATE__.epInfo.subtitles.reduce((s, d) => {
          s.push({
            ai_type: 0,
            id: d.id,
            id_str: d.id,
            is_lock: false,
            lan: d.key,
            lan_doc: d.title,
            subtitle_url: d.url,
            type: 0
          });
          return s;
        }, []));
        tag = true;
        clearTimeout(timer2);
        timer2 = setTimeout(() => {
          tag = false;
        }, 1e3);
      }
    }
    return true;
  }, (res) => {
    try {
      if (statusCheck(res.status)) {
        let subtitle = "", view_points;
        res.response.replace(/<subtitle>.+?<\\/subtitle>/, (d) => {
          subtitle = d.replace("<subtitle>", "").replace("</subtitle>", "");
        });
        res.response.replace(/<view_points>.+?<\\/view_points>/, (d) => {
          view_points = d.replace("<view_points>", "").replace("</view_points>", "");
        });
        subtitle && setting.closedCaption && closedCaption.getCaption(JSON.parse(subtitle).subtitles);
        view_points && setting.segProgress && new SegProgress(JSON.parse(view_points));
      } else {
        !tag && xhr({
          url: objUrl("https://api.bilibili.com/x/v2/dm/view", { oid: API.cid, aid: API.aid, type: 1 }),
          responseType: "json",
          credentials: true
        }, true).then((data) => {
          setting.closedCaption && data?.data?.subtitle?.subtitles && closedCaption.getCaption(data.data.subtitle.subtitles);
          setting.segProgress && data.data.view_points && data.data.view_points[1] && new SegProgress(data.data.view_points);
        });
        tag = true;
        clearTimeout(timer2);
        timer2 = setTimeout(() => {
          tag = false;
        }, 1e3);
      }
    } catch (e) {
    }
  }, false);
  xhrhookAsync("api.bilibili.com/x/player/carousel.so", void 0, async () => {
    let str = \`<msg><item bgcolor="#000000" catalog="news"><![CDATA[<a href="//app.bilibili.com/?from=bfq" target="_blank"><font color="#ffffff">客户端下载</font></a>]]></item><item bgcolor="#000000" catalog="news"><![CDATA[<a href="http://link.acg.tv/forum.php" target="_blank"><font color="#ffffff">bug反馈传送门</font></a>]]></item></msg>'\`;
    try {
      const arr2 = await Promise.all([
        xhr.get("//api.bilibili.com/pgc/operation/api/slideshow?position_id=531", { responseType: "json" }).then((d) => {
          return d.result.reduce((s, d2, i) => {
            s += \`<item tooltip="" bgcolor="#000000" catalog="bangumi" resourceid="2319" srcid="\${2320 + i}" id="\${314825 + i}"><![CDATA[<a href="\${d2.blink}" target="_blank"><font color="#FFFFFF">\${d2.title}</font></a>]]></item>\`;
            return s;
          }, "");
        }).catch((e) => {
          debug.error("播放器消息", "bangumi", e);
          return "";
        }),
        xhr.get("https://api.bilibili.com/x/web-show/res/loc?pf=0&id=4694", { responseType: "json" }).then((d) => {
          return d.data.reduce((s, d2, i) => {
            d2.name && (s += \`<item tooltip="" bgcolor="#000000" catalog="system" resourceid="2319" srcid="\${2320 + i}" id="\${314825 + i}"><![CDATA[<a href="\${d2.url}" target="_blank"><font color="#FFFFFF">\${d2.name}</font></a>]]></item>\`);
            return s;
          }, "");
        }).catch((e) => {
          debug.error("播放器消息", "system", e);
          return "";
        }),
        xhr.get("https://api.bilibili.com/x/web-interface/search/square?limit=10", { responseType: "json" }).then((d) => {
          return d.data.trending.list.reduce((s, d2, i) => {
            s += \`<item tooltip="" bgcolor="#000000" catalog="news" resourceid="2319" srcid="\${2320 + i}" id="\${314825 + i}"><![CDATA[<a href="https://search.bilibili.com/all?keyword=\${encodeURIComponent(d2.keyword)}" target="_blank"><font color="#FFFFFF">\${d2.keyword}</font></a>]]></item>\`;
            return s;
          }, "<msg>");
        }).catch((e) => {
          debug.error("播放器消息", "news", e);
          return "";
        })
      ]);
      str = arr2.sort(() => 0.5 - Math.random()).reduce((s, d) => {
        s += d;
        return s;
      }, "<msg>") + "</msg>";
    } catch (e) {
      debug.error("播放器消息", e);
    }
    const dom = new DOMParser().parseFromString(str, "text/xml");
    return {
      response: dom,
      responseXML: dom
    };
  }, false);
}

// src/runtime/player/bstar_playurl.ts
var descriptionMap = {
  127: "超高清 8K",
  126: "杜比视界",
  125: "HDR",
  121: "超清 4K",
  120: "超清 4K",
  116: "高清 1080P60",
  112: "高清 1080P+",
  80: "高清 1080P",
  74: "高清 720P60",
  64: "高清 720P",
  48: "高清 720P",
  32: "清晰 480P",
  16: "流畅 360P",
  15: "流畅 360P",
  6: "流畅 240P",
  5: "流畅 144P"
};
var formatMap = {
  127: "hdflv2",
  126: "hdflv2",
  125: "hdflv2",
  121: "hdflv2",
  120: "hdflv2",
  116: "flv_p60",
  112: "hdflv2",
  80: "flv",
  74: "flv720_p60",
  64: "flv720",
  48: "flv720",
  32: "flv480",
  16: "mp4",
  15: "mp4",
  6: "mp4",
  5: "mp4"
};
var qualityMap = {
  127: "8K",
  126: "Dolby",
  125: "HDR",
  121: "4K",
  120: "4K",
  116: "1080P60",
  112: "1080P+",
  80: "1080P",
  74: "720P60",
  64: "720P",
  48: "720P",
  32: "480P",
  16: "360P",
  15: "360P",
  6: "240P",
  5: "144P"
};
var Playurl = class {
  accept_description = [];
  accept_format = "";
  accept_quality = [];
  bp = 0;
  code = 0;
  dash = {
    audio: [],
    dolby: { audio: [], type: "NONE" },
    duration: 0,
    min_buffer_time: 1.5,
    minBufferTime: 1.5,
    video: []
  };
  fnval = 0;
  fnver = 0;
  format = "flv480";
  from = "local";
  has_paid = false;
  is_preview = 0;
  message = "";
  no_rexcode = 1;
  quality = 32;
  result = "suee";
  seek_param = "start";
  seek_type = "offset";
  status = 2;
  support_formats = [];
  timelength = 0;
  type = "DASH";
  video_codecid = 7;
  video_project = true;
};
var codecs = {
  default: {
    30121: "hev1.1.6.L156.90",
    121: "hev1.1.6.L156.90",
    30120: "avc1.64003C",
    120: "avc1.64003C",
    30112: "avc1.640028",
    112: "avc1.640028",
    30102: "hev1.1.6.L120.90",
    102: "hev1.1.6.L120.90",
    30080: "avc1.640028",
    80: "avc1.640028",
    30077: "hev1.1.6.L120.90",
    77: "hev1.1.6.L120.90",
    30064: "avc1.64001F",
    64: "avc1.64001F",
    30066: "hev1.1.6.L120.90",
    66: "hev1.1.6.L120.90",
    30032: "avc1.64001E",
    32: "avc1.64001E",
    30033: "hev1.1.6.L120.90",
    33: "hev1.1.6.L120.90",
    30011: "hev1.1.6.L120.90",
    11: "hev1.1.6.L120.90",
    30016: "avc1.64001E",
    16: "avc1.64001E",
    30006: "avc1.64001E",
    6: "avc1.64001E",
    30005: "avc1.64001E",
    5: "avc1.64001E",
    30280: "mp4a.40.2",
    30232: "mp4a.40.2",
    30216: "mp4a.40.2"
  },
  app: {
    30016: "avc1.64001E",
    16: "avc1.64001E",
    30032: "avc1.64001F",
    32: "avc1.64001F",
    30064: "avc1.640028",
    64: "avc1.640028",
    30080: "avc1.640032",
    80: "avc1.640032",
    30216: "mp4a.40.2",
    30232: "mp4a.40.2",
    30280: "mp4a.40.2"
  }
};
var frameRate = {
  30121: "16000/672",
  121: "16000/672",
  30120: "16000/672",
  120: "16000/672",
  30112: "16000/672",
  112: "16000/672",
  30102: "16000/672",
  102: "16000/672",
  30080: "16000/672",
  80: "16000/672",
  30077: "16000/656",
  77: "16000/656",
  30064: "16000/672",
  64: "16000/672",
  30066: "16000/656",
  66: "16000/656",
  30032: "16000/672",
  32: "16000/672",
  30033: "16000/656",
  33: "16000/656",
  30011: "16000/656",
  11: "16000/656",
  30016: "16000/672",
  16: "16000/672",
  30006: "16000/672",
  6: "16000/672",
  30005: "16000/672",
  5: "16000/672"
};
var resolution = {
  30121: [3840, 2160],
  121: [3840, 2160],
  30120: [3840, 2160],
  120: [3840, 2160],
  30112: [1920, 1080],
  112: [1920, 1080],
  30102: [1920, 1080],
  102: [1920, 1080],
  30080: [1920, 1080],
  80: [1920, 1080],
  30077: [1920, 1080],
  77: [1920, 1080],
  30064: [1280, 720],
  64: [1280, 720],
  30066: [1280, 720],
  66: [1280, 720],
  30032: [852, 480],
  32: [852, 480],
  30033: [852, 480],
  33: [852, 480],
  30011: [640, 360],
  11: [640, 360],
  30016: [640, 360],
  16: [640, 360],
  30006: [426, 240],
  6: [426, 240],
  30005: [256, 144],
  5: [256, 144]
};
function getIdxs(url, duration) {
  let range = Math.round(duration * 3.5);
  range = range < 6e3 ? 6e3 : range;
  return xhr({
    url: url.replace("http:", "https:"),
    responseType: "arraybuffer",
    headers: { "Range": \`bytes=0-\${range}\` }
  });
}
var OBJ = {};
async function bstarPlayurl(ogv) {
  const playurl = new Playurl();
  const set = [];
  playurl.quality = ogv.data.video_info.stream_list[0].stream_info.quality || ogv.data.video_info.quality;
  playurl.format = formatMap[playurl.quality];
  playurl.timelength = ogv.data.video_info.timelength;
  playurl.dash.duration = Math.ceil(playurl.timelength / 1e3);
  playurl.dash.minBufferTime = playurl.dash.min_buffer_time = 1.5;
  await Promise.all(ogv.data.video_info.stream_list.reduce((s, d, i) => {
    if (d.dash_video && d.dash_video.base_url) {
      s.push((async (d2) => {
        OBJ[\`sidx\${API.cid}\`] || (OBJ[\`sidx\${API.cid}\`] = {});
        const id = d2.stream_info.quality || d2.dash_video.base_url.match(/[0-9]+\\.m4s/)[0].split(".")[0];
        playurl.accept_description.push(descriptionMap[id]);
        set.push(formatMap[id]);
        playurl.accept_quality.push(id);
        playurl.support_formats.push({
          description: descriptionMap[id],
          display_desc: qualityMap[id],
          format: formatMap[id],
          new_description: descriptionMap[id],
          quality: id,
          superscript: ""
        });
        if (!OBJ[\`sidx\${API.cid}\`][id]) {
          let data = new Uint8Array(await getIdxs(d2.dash_video.base_url, playurl.dash.duration));
          let hex_data = Array.prototype.map.call(data, (x) => ("00" + x.toString(16)).slice(-2)).join("");
          let indexRangeStart = hex_data.indexOf("73696478") / 2 - 4;
          let indexRagneEnd = hex_data.indexOf("6d6f6f66") / 2 - 5;
          OBJ[\`sidx\${API.cid}\`][id] = ["0-" + String(indexRangeStart - 1), String(indexRangeStart) + "-" + String(indexRagneEnd)];
          debug("DASH-video：", id, OBJ[\`sidx\${API.cid}\`][id]);
        }
        playurl.dash.video.push({
          SegmentBase: {
            Initialization: OBJ[\`sidx\${API.cid}\`][id][0],
            indexRange: OBJ[\`sidx\${API.cid}\`][id][1]
          },
          segment_base: {
            initialization: OBJ[\`sidx\${API.cid}\`][id][0],
            index_range: OBJ[\`sidx\${API.cid}\`][id][1]
          },
          backupUrl: [],
          backup_url: [],
          bandwidth: d2.dash_video.bandwidth,
          baseUrl: d2.dash_video.base_url,
          base_url: d2.dash_video.base_url,
          codecid: d2.dash_video.codecid,
          codecs: codecs.app[id] || codecs.default[id],
          frameRate: frameRate[id],
          frame_rate: frameRate[id],
          height: resolution[id] && resolution[id][1],
          id: d2.stream_info.quality,
          md5: d2.dash_video.md5,
          mimeType: "video/mp4",
          mime_type: "video/mp4",
          sar: "1:1",
          size: d2.dash_video.size,
          startWithSAP: 1,
          start_with_sap: 1,
          width: resolution[id] && resolution[id][0]
        });
      })(d));
    }
    !i && ogv.data.video_info.dash_audio.forEach((d2) => {
      s.push((async (d3) => {
        OBJ[\`sidx\${API.cid}\`] || (OBJ[\`sidx\${API.cid}\`] = {});
        const id = d3.id || d3.base_url.match(/[0-9]+\\.m4s/)[0].split(".")[0];
        if (!OBJ[\`sidx\${API.cid}\`][id]) {
          let data = new Uint8Array(await getIdxs(d3.base_url, playurl.dash.duration));
          let hex_data = Array.prototype.map.call(data, (x) => ("00" + x.toString(16)).slice(-2)).join("");
          let indexRangeStart = hex_data.indexOf("73696478") / 2 - 4;
          let indexRagneEnd = hex_data.indexOf("6d6f6f66") / 2 - 5;
          OBJ[\`sidx\${API.cid}\`][id] = ["0-" + String(indexRangeStart - 1), String(indexRangeStart) + "-" + String(indexRagneEnd)];
          debug("DASH-video：", id, OBJ[\`sidx\${API.cid}\`][id]);
        }
        playurl.dash.audio.push({
          SegmentBase: {
            Initialization: OBJ[\`sidx\${API.cid}\`][id][0],
            indexRange: OBJ[\`sidx\${API.cid}\`][id][1]
          },
          segment_base: {
            initialization: OBJ[\`sidx\${API.cid}\`][id][0],
            index_range: OBJ[\`sidx\${API.cid}\`][id][1]
          },
          backupUrl: [],
          backup_url: [],
          bandwidth: d3.bandwidth,
          baseUrl: d3.base_url,
          base_url: d3.base_url,
          codecid: d3.codecid,
          codecs: codecs.app[id] || codecs.default[id],
          frameRate: "",
          frame_rate: "",
          height: 0,
          id,
          md5: d3.md5,
          mimeType: "audio/mp4",
          mime_type: "audio/mp4",
          sar: "",
          size: d3.size,
          startWithSAP: 0,
          start_with_sap: 0,
          width: 0
        });
      })(d2));
    });
    return s;
  }, []));
  const avc = [], hev = [], video = [];
  playurl.dash.video.forEach((d) => {
    if (d.codecid == 7)
      avc.push(d);
    else
      hev.push(d);
  });
  let length = avc.length > hev.length ? avc.length : hev.length;
  for (let i = length - 1; i >= 0; i--) {
    if (avc[i])
      video.push(avc[i]);
    if (hev[i])
      video.push(hev[i]);
  }
  playurl.dash.video = video;
  playurl.accept_format = set.join(",");
  playurl.quality > 80 && (playurl.quality = 80);
  return playurl;
}

// src/runtime/player/video_limit.ts
var Backup = {};
var HookTimeOut = class {
  hook;
  constructor() {
    this.hook = setTimeout;
    window.setTimeout = (...args) => {
      if (args[1] && args[1] == 1500 && args[0] && args[0].toString() == "function(){f.cz()}") {
        toast.warning("禁用播放器强制初始化！", ...args);
        return Number.MIN_VALUE;
      }
      return this.hook.call(window, ...args);
    };
  }
  relese() {
    window.setTimeout = this.hook;
  }
};
async function customServer(obj, area) {
  if (area === "tw" && !setting.videoLimit.tw)
    return customServer(obj, "hk");
  if (area === "hk" && !setting.videoLimit.hk)
    return customServer(obj, "cn");
  if (area === "cn" && !setting.videoLimit.cn)
    throw "无有效代理服务器地址";
  try {
    Object.assign(obj, {
      area,
      build: 6720300,
      device: "android",
      force_host: 2,
      mobi_app: "android",
      platform: "android",
      ts: new Date().getTime()
    });
    const result = jsonCheck(await xhr({
      url: urlsign(\`https://\${setting.videoLimit[area]}/pgc/player/api/playurl\`, obj, 2)
    }));
    if (result.code !== 0)
      throw result;
    return result;
  } catch (e) {
    debug.error("代理服务器", setting.videoLimit[area], e);
    if (area === "tw")
      return customServer(obj, "hk");
    if (area === "hk")
      return customServer(obj, "cn");
    toast.error("代理服务器", setting.videoLimit[area], e);
    throw "所有代理服务器都已失败！";
  }
}
function videoLimit() {
  xhrhookAsync("/playurl?", () => API.limit || API.th, async (args, type) => {
    let response;
    const obj = urlObj(args[1]);
    obj.seasonId && (API.ssid = obj.seasonId);
    obj.episodeId && (API.epid = obj.episodeId);
    obj.ep_id && (API.epid = obj.ep_id);
    obj.aid && (API.aid = Number(obj.aid)) && (API.aid = obj.aid);
    obj.avid && (API.aid = Number(obj.avid)) && (API.aid = obj.avid);
    obj.cid && (API.cid = Number(obj.cid)) && (API.cid = obj.cid);
    const hookTimeout = new HookTimeOut();
    const epid = obj.ep_id || obj.episodeId || API.epid;
    const accesskey = setting.accessKey.key || void 0;
    obj.access_key = accesskey;
    Backup[epid] && (response = Backup[epid]);
    if (!response) {
      if (API.th) {
        Object.assign(obj, {
          area: "th",
          build: 1001310,
          device: "android",
          force_host: 2,
          download: 1,
          mobi_app: "bstar_a",
          platform: "android",
          ts: new Date().getTime()
        });
        try {
          toast.info("尝试解除区域限制... 访问代理服务器");
          response = jsonCheck(uposReplace(await xhr({
            url: urlsign(\`https://\${setting.videoLimit.th || "api.global.bilibili.com"}/intl/gateway/v2/ogv/playurl\`, obj, 12)
          }), setting.uposReplace.th));
          response = { "code": 0, "message": "success", "result": await bstarPlayurl(response) };
          toast.success(\`解除区域限制！aid=\${API.aid}, cid=\${API.cid}\`);
        } catch (e) {
          toast.error("解除限制失败 ಥ_ಥ");
          debug.error("解除限制失败 ಥ_ಥ", e);
          if (!accesskey) {
            toast.warning("这似乎是一个泰区限制视频，需要授权解析服务器使用您的账户才能尝试解析，请到设置里进行【账户授权】。<strong>但这意味着解析服务器会获得您账户的部分权限，请务必确认对反的可靠性然后操作！</strong>");
          }
          response = { "code": -404, "message": e, "data": null };
        }
      } else if (API.limit) {
        obj.module = window.__INITIAL_STATE__?.upInfo?.mid == 1988098633 || window.__INITIAL_STATE__?.upInfo?.mid == 2042149112 ? "movie" : "bangumi";
        obj.fnval && (obj.fnval = String(fnval));
        try {
          toast.info("尝试解除区域限制... 访问代理服务器");
          setting.uposReplace.gat !== "不替换" && window.postMessage({ \$type: "th" });
          response = setting.videoLimit.server === "内置" ? jsonCheck(await xhr({
            url: objUrl("https://www.biliplus.com/BPplayurl.php", obj)
          })) : (delete obj.module, await customServer(obj, "tw"));
          response = JSON.parse(uposReplace(JSON.stringify(response), setting.uposReplace.gat));
          response = { "code": 0, "message": "success", "result": response };
          toast.success(\`解除区域限制！aid=\${API.aid}, cid=\${API.cid}\`);
        } catch (e) {
          toast.error("解除限制失败 ಥ_ಥ");
          debug.error("解除限制失败 ಥ_ಥ", e);
          if (setting.videoLimit.server === "自定义") {
            toast.warning("您将代理服务器设置为【自定义】，服务器返回出错，这可能是您由于未进行【账户授权】或者授权过期，请到设置里进行【账户授权】。");
          }
          response = { "code": -404, "message": e, "data": null };
        }
      }
    }
    hookTimeout.relese();
    if (response.code === -404)
      throw type === "json" ? { response } : {
        response: JSON.stringify(response),
        responseText: JSON.stringify(response)
      };
    Backup[epid] = response;
    API.__playinfo__ = response;
    return type === "json" ? { response } : {
      response: JSON.stringify(response),
      responseText: JSON.stringify(response)
    };
  }, false);
}

// src/runtime/player/embed_player.ts
async function loadBilibiliPlayer() {
  if (!window.jQuery)
    await loadScript("//static.hdslb.com/js/jquery.min.js");
  if (GM_getValue)
    return new Function(GM_getResourceText("bilibiliPlayer.js"))();
  return await loadScript(\`chrome-extension://\${sessionStorage2.getItem("bilibili-old")}/bilibili/bilibiliPlayer.js\`);
}
loadBilibiliPlayer();
var _EmbedPlayer = class {
  playerParam;
  playerType;
  upgrade;
  callbackFn;
  flashAddEvents = [];
  flashRemoveEvents = [];
  pageno = void 0;
  bofqi = document.querySelector("#bofqi");
  get gray_html5() {
    return !setting.flash;
  }
  set gray_html5(v) {
    setting.flash = !v;
  }
  constructor(player2, swf, playerParams, playerType, upgrade, callbackFn, bofqi) {
    this.playerParam = urlObj(\`?\${playerParams}\`);
    this.playerParam.dashSymbol = true;
    this.playerType = playerType;
    this.upgrade = upgrade;
    this.callbackFn = callbackFn;
    Object.entries(this.playerParam).forEach((d) => {
      Reflect.set(window, ...d);
    });
    this.playerParam.seasonId && (API.ssid = this.playerParam.seasonId);
    this.playerParam.episodeId && (API.epid = this.playerParam.episodeId);
    (_EmbedPlayer.asWide || setting.automate.screenWide) && (this.playerParam.as_wide = 1);
    setting.automate.autoPlay && (this.playerParam.autoplay = 1);
    this.gray_loader();
    API.playerParam = this.playerParam;
  }
  loadScript(src, onload) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    script.addEventListener("load", () => {
      script.remove();
      onload && onload();
    });
    script.addEventListener("error", (e) => {
      script.remove();
      toast.error("加载播放器脚本失败！", e.message);
    });
    document.body.appendChild(script);
  }
  loadHtml5Player() {
    if (!this.bofqi)
      return debug.warn("页面中并不存在播放器节点！", this.playerParam);
    if (!window.bilibiliPlayer) {
      loadBilibiliPlayer().then(() => {
        this.bofqi.innerHTML = '<div class="player"><div id="bilibiliPlayer"></div></div><div id="player_placeholder"></div>';
        window.player = new window.bilibiliPlayer(this.playerParam);
        this.gray_html5_compatible();
      });
    } else {
      this.bofqi.innerHTML = '<div class="player"><div id="bilibiliPlayer"></div></div><div id="player_placeholder"></div>';
      window.player = new window.bilibiliPlayer(this.playerParam);
      this.gray_html5_compatible();
    }
  }
  eventMaps = {
    "jwplayerMediaBuffer": "video_media_buffer",
    "jwplayerMediaBufferFull": "video_media_buffer_full",
    "jwplayerMediaComplete": "video_media_ended",
    "jwplayerMediaError": "video_media_error",
    "jwplayerMediaLoaded": "video_media_loaded",
    "jwplayerMediaMute": "video_media_mute",
    "jwplayerMediaSeek": "video_media_seek",
    "jwplayerMediaTime": "video_media_time",
    "jwplayerMediaVolume": "video_media_volume"
  };
  apiMaps = {
    "mukio_reloadAccess": "reloadAccess",
    "jwPlay": "play",
    "jwPause": "pause",
    "jwStop": "stop",
    "jwSeek": "seek",
    "jwPlaylistPrev": "prev",
    "jwPlaylistNext": "next",
    "jwGetBuffer": "getBufferRate",
    "jwGetDuration": "getDuration",
    "jwGetFullscreen": "isFullScreen",
    "jwGetWidth": "getWidth",
    "jwGetHeight": "getHeight",
    "jwGetMute": "isMute",
    "jwSetMute": "setMute",
    "jwGetPlaylist": "getPlaylist",
    "jwGetPlaylistIndex": "getPlaylistIndex",
    "jwGetPosition": "getCurrentTime",
    "jwGetState": "getState",
    "jwGetVersion": "getVersion",
    "jwGetVolume": "volume",
    "jwSetVolume": "volume"
  };
  cElement = void 0;
  gray_html5_compatible() {
    this.setActionHandler();
    this.cElement = this.bofqi.querySelector("#player_placeholder");
    Object.entries(this.apiMaps).forEach((d) => {
      this.cElement[d[0]] = function() {
        if (window.player && "function" == typeof window.player[d[1]]) {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return window.player[d[1]].apply(window.player, t);
        }
        return false;
      };
    });
    Reflect.set(this.cElement, "jwAddEventListener", (type, callback) => {
      var callbackString = "", _callback;
      try {
        "function" != typeof callback && (callbackString = new Function(callback));
      } catch (e) {
        callbackString = function() {
        };
      }
      this.eventMaps[type] && (_callback = callbackString || callback, window.player && window.player.addEventListener && window.player.addEventListener(this.eventMaps[type], _callback));
    });
    Reflect.set(this.cElement, "jwRemoveEventListener", (e) => {
      this.eventMaps[e] && window.player && window.player.removeEventListener && window.player.removeEventListener(this.eventMaps[e]);
    });
    "function" == typeof this.callbackFn && this.cElement.jwAddEventListener("jwplayerMediaLoaded", () => this.callbackFn());
    "function" == typeof window.PlayerMediaLoaded && window.PlayerMediaLoaded();
  }
  setActionHandler() {
    navigator.mediaSession.setActionHandler("play", () => window.player.play());
    navigator.mediaSession.setActionHandler("pause", () => window.player.pause());
    navigator.mediaSession.setActionHandler("seekbackward", () => window.player.seek(window.player.getCurrentTime() - 10));
    navigator.mediaSession.setActionHandler("seekforward", () => window.player.seek(window.player.getCurrentTime() + 10));
    navigator.mediaSession.setActionHandler("previoustrack", () => window.player.prev());
    navigator.mediaSession.setActionHandler("nexttrack", () => window.player.next());
  }
  flashChecker() {
    let e = false, t = 0;
    if (!!/msie [\\w.]+/.exec(navigator.userAgent.toLowerCase()) && !/Edge/i.test(navigator.userAgent) || /Trident/i.test(navigator.userAgent)) {
      try {
        var n = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash");
        if (n) {
          e = true;
          var r = n.GetVariable("\$version");
          t = parseInt(r.split(" ")[1].split(",")[0], 10);
        }
      } catch (e2) {
        console.error(e2);
      }
    } else if (navigator.plugins && 0 < navigator.plugins.length) {
      var i = navigator.plugins["Shockwave Flash"];
      if (i) {
        e = true;
        for (var a = i.description.split(" "), o = 0; o < a.length; ++o)
          isNaN(parseInt(a[o], 10)) || (t = parseInt(a[o], 10));
      }
    }
    return {
      hasFlash: e,
      flashVersion: t
    };
  }
  gray_loader_flash() {
    this.playerParam.aid && (window.aid = this.playerParam.aid);
    this.playerParam.cid && (window.cid = this.playerParam.cid);
    this.flashChecker().hasFlash ? window.swfobject && window.swfobject.embedSWF ? this.loadFlashPlayer() : this.loadScript("//static.hdslb.com/js/swfobject.js", () => this.loadFlashPlayer()) : this.getNoFlashTips();
  }
  getNoFlashTips() {
    window.NoFlashTips ? this.createNoFlashTipsInstance() : this.loadScript("//static.hdslb.com/player/noflashtips/no-flash-tips.min.js", () => this.createNoFlashTipsInstance());
  }
  createNoFlashTipsInstance() {
    const msg = {
      backgroundColor: "white",
      msg: "主人，未安装Flash插件，暂时无法观看视频，您可以…",
      msgColor: "#000",
      msgSize: 14,
      btnList: [
        {
          title: "下载Flash插件",
          width: 166,
          height: 40,
          type: "flash",
          theme: "white"
        },
        {
          title: "使用HTML5播放器",
          width: 166,
          height: 40,
          type: "html5",
          theme: "blue",
          onClick: (e) => {
            this.gray_html5 = true, this.loadHtml5Player(), "function" == typeof e && e();
          }
        }
      ],
      hasOrText: false
    };
    new window.NoFlashTips(this.bofqi, msg);
    this.bofqi.style.removeProperty("position");
  }
  loadFlashPlayer() {
    this.bofqi.innerHTML = '<div id="player_placeholder" class="player"></div>';
    window.swfobject.embedSWF(this.upgrade ? "//static.hdslb.com/play_recommend.swf" : "//static.hdslb.com/play.swf", "player_placeholder", "950", "482", "0", "", this.playerParam, {
      bgcolor: "#ffffff",
      allowfullscreeninteractive: "true",
      allowfullscreen: "true",
      quality: "high",
      allowscriptaccess: "always",
      wmode: /Firefox/.test(navigator.userAgent) ? "opaque" : "direct"
    }, {
      class: "player"
    }, () => {
      "function" == typeof this.callbackFn && this.callbackFn();
      "function" == typeof window.PlayerMediaLoaded && window.PlayerMediaLoaded();
      this.gray_flash_compatible();
    });
  }
  gray_flash_compatible() {
    this.cElement = this.bofqi.querySelector("#player_placeholder");
    window.player = {};
    Object.entries(this.apiMaps).forEach((d) => {
      this.cElement[d[0]] = function() {
        if (window.player && "function" == typeof window.player[d[1]]) {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return window.player[d[1]].apply(window.player, t);
        }
        return false;
      };
      window.player[d[1]] = () => {
        if (typeof this.cElement[d[0]] === "function") {
          return this.cElement[d[0]].apply(this.cElement, arguments);
        }
      };
    });
    Reflect.set(this.cElement, "jwAddEventListener", () => {
      this.cElement["jwAddEventListener"].apply(this, arguments);
    });
    Reflect.set(this.cElement, "jwRemoveEventListener", () => {
      this.cElement["jwRemoveEventListener"].apply(this, arguments);
    });
    const eventMaps = {
      "video_media_buffer": "jwplayerMediaBuffer",
      "video_media_buffer_full": "jwplayerMediaBufferFull",
      "video_media_ended": "jwplayerMediaComplete",
      "video_media_error": "jwplayerMediaError",
      "video_media_loaded": "jwplayerMediaLoaded",
      "video_media_mute": "jwplayerMediaMute",
      "video_media_seek": "jwplayerMediaSeek",
      "video_media_time": "jwplayerMediaTime",
      "video_media_volume": "jwplayerMediaVolume"
    };
    window.player["addEventListener"] = (type, callback) => {
      try {
        if (typeof callback !== "function") {
          callback = new Function(callback);
        }
      } catch (e) {
        callback = function() {
        };
      }
      if (eventMaps[type]) {
        this.flashAddEvents.push([type, callback]);
      }
    };
    window.player["removeEventListener"] = (type) => {
      if (eventMaps[type]) {
        for (var i = this.flashAddEvents.length - 1; i > 0; i--) {
          if (this.flashAddEvents[i][0] == type) {
            this.flashAddEvents.splice(i, 1);
          }
        }
      }
    };
    Object.entries(eventMaps).forEach((d) => {
      this.cElement["jwAddEventListener"](d[1], () => {
        this.callFunction(d[0]);
      });
    });
  }
  callFunction(type) {
    const eventMaps = {
      "video_media_buffer": "jwplayerMediaBuffer",
      "video_media_buffer_full": "jwplayerMediaBufferFull",
      "video_media_ended": "jwplayerMediaComplete",
      "video_media_error": "jwplayerMediaError",
      "video_media_loaded": "jwplayerMediaLoaded",
      "video_media_mute": "jwplayerMediaMute",
      "video_media_seek": "jwplayerMediaSeek",
      "video_media_time": "jwplayerMediaTime",
      "video_media_volume": "jwplayerMediaVolume"
    };
    if (eventMaps[type]) {
      for (var i = 0; i < this.flashAddEvents.length; i++) {
        this.flashAddEvents[i] && this.flashAddEvents[i][0] == type && this.flashAddEvents[i][1]();
      }
    }
  }
  loadExtraMenuConfig(type) {
    let v = "20161115", exconfig = [];
    if (type === "flash" || type === "flash_gray") {
      if (this.gray_html5) {
        exconfig.push({ label: "HTML5播放器", id: "change_h5" });
        exconfig.push({ label: "Flash播放器", id: "change_flash", active: true });
      }
    } else {
      exconfig.push({ label: "HTML5播放器", id: "change_h5", active: true });
      exconfig.push({ label: "Flash播放器", id: "change_flash" });
    }
    return { "ver": v, "menuItems": exconfig };
  }
  clickMenu(id) {
    setTimeout(() => {
      if (id === "change_h5") {
        this.gray_html5 = true;
        this.gray_loader();
      } else if (id === "change_flash") {
        this.gray_html5 = false;
        window.player && window.player.destroy && window.player.destroy();
        this.gray_loader();
      }
    });
  }
  gray_loader() {
    this.init_bgray_btn();
    "html5" === this.playerType || this.gray_html5 ? this.loadHtml5Player() : this.gray_loader_flash();
  }
  feedback = void 0;
  bgray_btn = [
    {
      tagName: "div",
      props: { class: "bgray-btn show bgray-btn-feedback" },
      children: [
        {
          tagName: "text",
          text: "播放"
        },
        {
          tagName: "br"
        },
        {
          tagName: "text",
          text: "问题"
        },
        {
          tagName: "br"
        },
        {
          tagName: "text",
          text: "反馈"
        }
      ],
      event: {
        click: (e) => {
          const gray = e.target;
          this.feedback ? this.feedback.show() : window.FeedBackInstance ? (this.feedback = new window.FeedBackInstance(), this.feedback.show()) : (gray.classList.add("player-feedback-disable"), this.loadScript("//static.hdslb.com/player/feedback/feedback.min.js", () => {
            gray.classList.remove("player-feedback-disable");
            this.feedback = window.FeedBackInstance && new window.FeedBackInstance();
            this.feedback && this.feedback.show();
          }));
        }
      }
    },
    {
      tagName: "div",
      props: { class: "bgray-btn show bgray-btn-help" },
      children: [{ tagName: "text", text: "帮助" }],
      event: {
        click: () => {
          window.open("//www.bilibili.com/blackboard/help.html#常见播放问题自救方法");
        }
      }
    }
  ];
  append_bgray_btn(title, callback, className) {
    const vdom = {
      tagName: "div",
      props: { class: \`bgray-btn show bgray-btn-\${className || "any"}\` },
      children: [],
      event: {
        click: () => {
          callback();
        }
      }
    };
    const arr2 = title.split("");
    while (arr2.length) {
      let str = arr2.shift() || "";
      str += arr2.shift() || "";
      if (str) {
        vdom.children?.length && vdom.children?.push({ tagName: "br" });
        vdom.children?.push({
          tagName: "text",
          text: str
        });
      }
    }
    this.bgray_btn.push(vdom);
    this.init_bgray_btn();
  }
  init_bgray_btn() {
    const prt = this.bofqi.parentElement;
    prt.appendChild(createElement({
      tagName: "div",
      props: { class: "bgray-btn-wrap" },
      children: this.bgray_btn
    }));
    document.head.appendChild(createElements(htmlVnode(bgray_btn_default)));
  }
};
var EmbedPlayer = _EmbedPlayer;
__publicField(EmbedPlayer, "asWide", false);
var GrayManager = class extends EmbedPlayer {
  codec;
  constructor(player2, swf, playerParams, playerType, upgrade, callbackFn) {
    super(player2, swf, playerParams, playerType, upgrade, callbackFn);
    let codecId = {
      "AVC": 7,
      "HEVC": 12,
      "AV1": 13
    };
    this.codec = {
      preference: codecId[setting.codecType],
      support: {}
    };
    let mime = {
      "AVC": 'video/mp4;codecs="avc1.640028"',
      "HEVC": 'video/mp4;codecs="hev1.1.6.L120.90"',
      "AV1": 'video/mp4;codecs="av01.0.01M.08.0.110.01.01.01.0"'
    };
    for (let i in mime) {
      this.codec.support[codecId[i]] = MediaSource.isTypeSupported(mime[i]);
    }
    location.href.includes("t=") && (this.playerParam.p = this.GetUrlValue("t"));
    location.href.includes("d=") && (this.playerParam.d = this.GetUrlValue("d"));
    location.href.includes("lastplaytime=") && (this.playerParam.lastplaytime = this.GetUrlValue("lastplaytime"));
  }
  reload(playerParams) {
    if (this.playerParam) {
      try {
        window.swfobject && window.swfobject.removeSWF("player_placeholder"), window.player && window.player.pause(), window.player && window.player.destroy && window.player.destroy(), (this.HashManage.get("page") || this.GetUrlValue("p")) && (window.pageno = this.HashManage.get("page") || this.GetUrlValue("p") || 1, this.pageno = window.pageno);
      } catch (e) {
        console.log(e);
      }
      this.playerParam = urlObj(\`?\${playerParams}\`) || this.playerParam;
      this.playerParam.dashSymbol = true;
      this.playerParam && (Reflect.set(window, "aid", this.playerParam.aid), Reflect.set(window, "cid", this.playerParam.cid));
      this.gray_loader();
    } else
      window.location.reload();
  }
  HashManage = {
    p: function(e) {
      return (this.p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e2) {
        return typeof e2;
      } : function(e2) {
        return e2 && "function" == typeof Symbol && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
      })(e);
    },
    prependHash: "!",
    _change: function(e, t) {
      var n, r = location.hash, i = [], a = "", o = 0, s = {};
      r && (r = r.substring(1), this.prependHash && (r = r.replace(new RegExp("^".concat(this.prependHash.replace(/[-[\\]{}()*+?.,\\\\^\$|#\\s]/g, "\\\\\$&"))), ""))), i = r.split("&");
      for (var u = 0; u < i.length; u++) {
        var l = i[u].split("=")[0], d = i[u].split("=")[1];
        l && (s[l] = decodeURIComponent(d));
      }
      if ("object" === this.p(e)) {
        n = Object.keys(e).length;
        for (var f = 0; f < n; f++) {
          var c = e[n[f]];
          c ? s[n[f]] = encodeURIComponent(c) : false === c && delete s[n[f]];
        }
      } else if (t)
        s[e] = encodeURIComponent(t);
      else {
        if (false !== t)
          return void 0 === e ? s : s[e] || null;
        delete s[e];
      }
      n = Object.keys(s);
      for (var h = 0; h < n.length; h++)
        a += 0 !== o ? "&" : this.prependHash, a += "".concat(n[h], "=").concat(s[n[h]]), o += 1;
      return location.hash = a, s;
    },
    get: function(e) {
      return this._change(e, null);
    },
    set: function(e, t) {
      return this._change(e, t);
    },
    clear: function() {
      location.hash = "";
    }
  };
  GetUrlValue(e) {
    var t = new RegExp("(^|&)".concat(e, "=([^&]*)(&|\$)"), "i"), n = window.location.search.substr(1).match(t);
    if (null != n)
      try {
        return decodeURIComponent(n[2]);
      } catch (e2) {
        return null;
      }
    return null;
  }
};
function loadVideoScript(bofqi, asWide = false) {
  Object.defineProperty(window, "EmbedPlayer", {
    configurable: true,
    get: () => (player2, swf, playerParams, playerType, upgrade, callbackFn) => {
      try {
        delete window.__playinfo__;
        asWide && (EmbedPlayer.asWide = true);
        bofqi && (document.querySelector(bofqi).id = "bofqi");
        window.GrayManager = new GrayManager(player2, swf, playerParams, playerType, upgrade, callbackFn);
      } catch (e) {
        toast.error("EmbedPlayer 启动播放器出错~");
        debug.error("EmbedPlayer 启动播放器出错~", e);
      }
    },
    set: () => true
  });
  playerKeyMap();
}
setting.danmakuHashId && danmakuHashId();
setting.heartbeat && xhrhook(["api.bilibili.com/x/report/web/heartbeat"], function(args) {
  args[1] = args[1].replace("api.bilibili.com/x/report/web/heartbeat", "api.bilibili.com/x/click-interface/web/heartbeat");
}, void 0, false);
setting.videoLimit.switch && videoLimit();
loadDanmakuEngine();
dealwithPlayinfo();
automate();

// src/content/comment.ts
var Feedback;
var loading = false;
var load2 = false;
function loadComment() {
  Object.defineProperty(window, "bbComment", {
    configurable: true,
    set: (v) => {
      Feedback = v;
      bbCommentModify();
      Object.defineProperty(window, "bbComment", { configurable: true, value: Feedback });
    },
    get: () => Feedback
  });
  Object.defineProperty(window, "initComment", {
    configurable: true,
    set: (v) => true,
    get: () => {
      if (load2) {
        let initComment2 = function(tar, init2) {
          new Feedback(tar, init2.oid, init2.pageType, init2.userStatus);
        };
        var initComment = initComment2;
        Object.defineProperty(window, "initComment", { configurable: true, value: initComment2 });
        return initComment2;
      }
      return function() {
        if (!loading) {
          loadScript(\`//s1.hdslb.com/bfs/seed/jinkela/commentpc/comment.min.js\`).then(() => {
            load2 = true;
          });
        }
        loading = true;
        setTimeout(() => window.initComment(...arguments), 100);
      };
    }
  });
}
function bbCommentModify() {
  Feedback.prototype.initAbtest = function() {
    this.abtest = {};
    this.abtest.optimize = false;
    if (this.jumpId || this.noPage) {
      this.abtest.optimize = false;
    }
    if (this.appMode === "comic") {
      this.abtest.optimize = false;
    }
    this._registerEvent();
    this.init();
  };
  Feedback.prototype._renderBottomPagination = function(pageInfo) {
    if (this.noPage) {
      var isLastPage = pageInfo.count <= this.pageSize;
      var html = "";
      if (isLastPage) {
        html = "没有更多了～";
      } else {
        html = '<a class="more-link" href="javascript:">查看更多评论</a>';
      }
      this.\$root.find(".bottom-page").addClass("center").html(html);
      return;
    }
    const count = Math.ceil(pageInfo.count / pageInfo.size);
    if (count > 1) {
      this.\$root.find(".header-interaction").addClass("paging-box").paging({
        pageCount: count,
        current: pageInfo.num,
        backFn: (p) => {
          this.\$root.trigger("replyPageChange", {
            p,
            isBottom: true
          });
          this.trigger("replyPageChange", {
            p,
            isBottom: true
          });
          this.currentPage = p;
        }
      });
      this.\$root.find(".bottom-page").paging({
        pageCount: count,
        current: pageInfo.num,
        jump: true,
        smallSize: this.smallPager,
        backFn: (p) => {
          this.\$root.trigger("replyPageChange", {
            p,
            isBottom: true
          });
          this.trigger("replyPageChange", {
            p,
            isBottom: true
          });
          this.currentPage = p;
        }
      });
    } else {
      this.\$root.find(".header-page").html("");
      this.\$root.find(".bottom-page").html("");
    }
  };
  Feedback.prototype._createListCon = function(item, i, pos) {
    const blCon = this._parentBlacklistDom(item, i, pos);
    const con = [
      '<div class="con ' + (pos == i ? "no-border" : "") + '">',
      '<div class="user">' + this._createNickNameDom(item),
      this._createLevelLink(item),
      this._identity(item.mid, item.assist, item.member.fans_detail),
      this._createNameplate(item.member.nameplate) + this._createUserSailing(item) + "</div>",
      this._createMsgContent(item),
      this._createPerfectReply(item),
      '<div class="info">',
      item.floor ? '<span class="floor">#' + item.floor + "</span>" : "",
      this._createPlatformDom(item.content.plat),
      '<span class="time-location">',
      '<span class="reply-time">'.concat(this._formateTime(item.ctime), "</span>"),
      item?.reply_control?.location ? \`<span class="reply-location">\${item?.reply_control?.location || ""}</span>\` : "",
      "</span>",
      item.lottery_id ? "" : '<span class="like ' + (item.action == 1 ? "liked" : "") + '"><i></i><span>' + (item.like ? item.like : "") + "</span></span>",
      item.lottery_id ? "" : '<span class="hate ' + (item.action == 2 ? "hated" : "") + '"><i></i></span>',
      item.lottery_id ? "" : this._createReplyBtn(item.rcount),
      item.lottery_id && item.mid !== this.userStatus.mid ? "" : '<div class="operation more-operation"><div class="spot"></div><div class="opera-list"><ul>' + (this._canSetTop(item) ? '<li class="set-top">' + (item.isUpTop ? "取消置顶" : "设为置顶") + "</li>" : "") + (this._canBlackList(item.mid) ? '<li class="blacklist">加入黑名单</li>' : "") + (this._canReport(item.mid) ? '<li class="report">举报</li>' : "") + (this._canDel(item.mid) && !item.isTop ? '<li class="del" data-mid="' + item.mid + '">删除</li>' : "") + "</ul></div></div>",
      this._createLotteryContent(item.content),
      this._createVoteContent(item.content),
      this._createTags(item),
      "</div>",
      '<div class="reply-box">',
      this._createSubReplyList(item.replies, item.rcount, false, item.rpid, item.folder && item.folder.has_folded, item.reply_control),
      "</div>",
      '<div class="paging-box">',
      "</div>",
      "</div>"
    ].join("");
    return item.state === this.blacklistCode ? blCon : con;
  };
  Feedback.prototype._createSubReplyItem = function(item, i) {
    if (item.invisible) {
      return "";
    }
    return [
      '<div class="reply-item reply-wrap" data-id="' + item.rpid + '" data-index="' + i + '">',
      this._createSubReplyUserFace(item),
      '<div class="reply-con">',
      '<div class="user">',
      this._createNickNameDom(item),
      this._createLevelLink(item),
      this._identity(item.mid, item.assist, item.member.fans_detail),
      this._createSubMsgContent(item),
      "</div>",
      "</div>",
      '<div class="info">',
      item.floor ? '<span class="floor">#' + item.floor + "</span>" : "",
      this._createPlatformDom(item.content.plat),
      '<span class="time-location">',
      '<span class="reply-time">'.concat(this._formateTime(item.ctime), "</span>"),
      item?.reply_control?.location ? \`<span class="reply-location">\${item?.reply_control?.location || ""}</span>\` : "",
      "</span>",
      '<span class="like ' + (item.action == 1 ? "liked" : "") + '"><i></i><span>' + (item.like ? item.like : "") + "</span></span>",
      '<span class="hate ' + (item.action == 2 ? "hated" : "") + '"><i></i></span>',
      '<span class="reply btn-hover">回复</span>',
      '<div class="operation btn-hover btn-hide-re"><div class="spot"></div><div class="opera-list"><ul>' + (this._canBlackList(item.mid) ? '<li class="blacklist">加入黑名单</li>' : "") + (this._canReport(item.mid) ? '<li class="report">举报</li>' : "") + (this._canDel(item.mid) ? '<li class="del" data-mid="' + item.mid + '">删除</li>' : "") + "</ul></div></div>",
      "</div>",
      "</div>"
    ].join("");
  };
}

// src/content/av/av.html
var av_default = '<!-- <!DOCTYPE html> -->\\r\\n<html lang="zh-CN">\\r\\n\\r\\n<head>\\r\\n    <meta charset="utf-8" />\\r\\n    <title>哔哩哔哩 (゜-゜)つロ 干杯~-bilibili</title>\\r\\n    <meta name="description" content="bilibili是国内知名的视频弹幕网站，这里有最及时的动漫新番，最棒的ACG氛围，最有创意的Up主。大家可以在这里找到许多欢乐。" />\\r\\n    <meta name="keywords"\\r\\n        content="Bilibili,哔哩哔哩,哔哩哔哩动画,哔哩哔哩弹幕网,弹幕视频,B站,弹幕,字幕,AMV,MAD,MTV,ANIME,动漫,动漫音乐,游戏,游戏解说,二次元,游戏视频,ACG,galgame,动画,番组,新番,初音,洛天依,vocaloid,日本动漫,国产动漫,手机游戏,网络游戏,电子竞技,ACG燃曲,ACG神曲,追新番,新番动漫,新番吐槽,巡音,镜音双子,千本樱,初音MIKU,舞蹈MMD,MIKUMIKUDANCE,洛天依原创曲,洛天依翻唱曲,洛天依投食歌,洛天依MMD,vocaloid家族,OST,BGM,动漫歌曲,日本动漫音乐,宫崎骏动漫音乐,动漫音乐推荐,燃系mad,治愈系mad,MAD MOVIE,MAD高燃" />\\r\\n    <meta name="renderer" content="webkit" />\\r\\n    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\\r\\n    <link rel="search" type="application/opensearchdescription+xml" href="//static.hdslb.com/opensearch.xml"\\r\\n        title="哔哩哔哩" />\\r\\n    <link rel="stylesheet"\\r\\n        href="//s1.hdslb.com/bfs/static/jinkela/videoplay/css/video.0.406cee7878545872b8dfbe73071d665dfb287c67.css" />\\r\\n    <style type="text/css">\\r\\n        #bofqi .player {\\r\\n            width: 980px;\\r\\n            height: 620px;\\r\\n            display: block;\\r\\n        }\\r\\n\\r\\n        @media screen and (min-width:1400px) {\\r\\n\\r\\n            #bofqi .player {\\r\\n                width: 1160px;\\r\\n                height: 720px\\r\\n            }\\r\\n        }\\r\\n    </style>\\r\\n</head>\\r\\n\\r\\n<body>\\r\\n    <div class="z-top-container has-menu"></div>\\r\\n    <div id="video-page-app"></div>\\r\\n    <div id="app" data-server-rendered="true"></div>\\r\\n    <div class="footer bili-footer report-wrap-module"></div>\\r\\n</body>\\r\\n\\r\\n</html>';

// src/content/av/script.html
var script_default = '<script type="text/javascript">\\r\\n    window.getInternetExplorerVersion = function () {\\r\\n        var e = -1; if ("Microsoft Internet Explorer" == navigator.appName) {\\r\\n            var r = navigator.userAgent;\\r\\n            null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(r) && (e = parseFloat(RegExp.\$1))\\r\\n        }\\r\\n        return e\\r\\n    };\\r\\n    function getQueryString(e) {\\r\\n        var r = new RegExp("(^|&)" + e + "=([^&]*)(&|\$)"),\\r\\n            i = window.location.search.substr(1).match(r);\\r\\n        return null != i ? unescape(i[2]) : null\\r\\n    }\\r\\n    window.commentAgent = { seek: t => window.player && window.player.seek(t) };\\r\\n<\\/script>\\r\\n<script type="text/javascript" src="//static.hdslb.com/js/jquery.min.js"><\\/script>\\r\\n<script type="text/javascript" src="//static.hdslb.com/js/jquery.qrcode.min.js"><\\/script>\\r\\n<script type="text/javascript" src="//s1.hdslb.com/bfs/seed/jinkela/header/header.js"><\\/script>\\r\\n<script type="text/javascript" src="//s1.hdslb.com/bfs/seed/jinkela/commentpc/comment.min.js"><\\/script>\\r\\n<script src="//s1.hdslb.com/bfs/static/jinkela/videoplay/manifest.b1b7706abd590dd295794f540f7669a5d8d978b3.js"\\r\\n    crossorigin=""><\\/script>\\r\\n<script src="//s1.hdslb.com/bfs/static/jinkela/videoplay/vendor.b1b7706abd590dd295794f540f7669a5d8d978b3.js"\\r\\n    crossorigin=""><\\/script>\\r\\n<script src="//s1.hdslb.com/bfs/static/jinkela/videoplay/video.b1b7706abd590dd295794f540f7669a5d8d978b3.js"\\r\\n    crossorigin=""><\\/script>\\r\\n<script type="text/javascript" charset="utf-8" src="//static.hdslb.com/common/js/footer.js"><\\/script>';

// src/content/av/menu_config.txt
var menu_config_default = '[{name:"首页",route:"/",tid:"",locid:23,sub:[]},{name:"动画",route:"douga",tid:1,locid:52,count:"",subMenuSize:162,slider:{width:620,height:220},viewTag:!1,customComponent:{name:"Energy",titleId:2507,leftId:2452,rightId:2453},sub:[{name:"MAD·AMV",route:"mad",tid:24,ps:15,rps:10,ad:{active:!0,dataLocId:151},desc:"具有一定制作程度的动画或静画的二次创作视频",url:"//www.bilibili.com/video/douga-mad-1.html"},{name:"MMD·3D",route:"mmd",tid:25,ps:15,rps:10,ad:{active:!0,dataLocId:152},desc:"使用MMD（MikuMikuDance）和其他3D建模类软件制作的视频",url:"//www.bilibili.com/video/douga-mmd-1.html"},{name:"短片·手书·配音",route:"voice",tid:47,ps:15,rps:10,desc:"追求创新并具有强烈特色的短片、手书（绘）及ACG相关配音",url:"//www.bilibili.com/video/douga-voice-1.html"},{name:"手办·模玩",route:"garage_kit",tid:210,ps:15,rps:10,desc:"手办模玩的测评、改造或其他衍生内容",url:""},{name:"特摄",route:"tokusatsu",tid:86,ps:15,rps:10,desc:"特摄相关衍生视频",url:"//www.bilibili.com/video/cinephile-tokusatsu.html"},{name:"综合",route:"other",tid:27,ps:15,rps:10,ad:{active:!0,dataLocId:153},desc:"以动画及动画相关内容为素材，包括但不仅限于音频替换、杂谈、排行榜等内容",url:"//www.bilibili.com/video/douga-else-1.html"}]},{name:"番剧",route:"anime",tid:13,url:"//www.bilibili.com/anime/",takeOvered:!0,count:"",subMenuSize:172,combination:!0,sub:[{name:"连载动画",tid:33,route:"serial",desc:"当季连载的动画番剧",url:"//www.bilibili.com/video/bangumi-two-1.html"},{name:"完结动画",tid:32,route:"finish",desc:"已完结的动画番剧合集",url:"//www.bilibili.com/video/part-twoelement-1.html"},{name:"资讯",tid:51,route:"information",desc:"动画番剧相关资讯视频",url:"//www.bilibili.com/video/douga-else-information-1.html"},{name:"官方延伸",tid:152,route:"offical",desc:"动画番剧为主题的宣传节目、采访视频，及声优相关视频",url:"//www.bilibili.com/video/bagumi_offical_1.html"},{name:"新番时间表",url:"//www.bilibili.com/anime/timeline/",desc:""},{name:"番剧索引",url:"//www.bilibili.com/anime/index/",desc:""}]},{name:"国创",tid:167,route:"guochuang",url:"//www.bilibili.com/guochuang/",takeOvered:!0,count:"",subMenuSize:214,combination:!0,sub:[{name:"国产动画",tid:153,route:"chinese",desc:"我国出品的PGC动画",url:"//www.bilibili.com/video/bangumi_chinese_1.html"},{name:"国产原创相关",tid:168,route:"original",desc:"",url:"//www.bilibili.com/video/guochuang-fanvid-1.html"},{name:"布袋戏",tid:169,route:"puppetry",desc:"",url:"//www.bilibili.com/video/glove-puppetry-1.html"},{name:"动态漫·广播剧",tid:195,route:"motioncomic",desc:"",url:""},{name:"资讯",tid:170,route:"information",desc:"",url:"//www.bilibili.com/video/guochuang-offical-1.html"},{name:"新番时间表",url:"//www.bilibili.com/guochuang/timeline/",desc:""},{name:"国产动画索引",url:"//www.bilibili.com/guochuang/index/",desc:""}]},{name:"音乐",route:"music",tid:3,locid:58,count:"",subMenuSize:268,slider:{width:620,height:220},viewTag:!0,customComponent:{name:"Energy",titleId:2511,leftId:2462,rightId:3131,rightType:"slide"},sub:[{name:"原创音乐",route:"original",tid:28,ps:15,rps:10,viewHotTag:!0,ad:{active:!0,dataLocId:243},dpConfig:[{name:"一日",value:1},{name:"三日",value:3}],desc:"原创歌曲及纯音乐，包括改编、重编曲及remix",url:"//www.bilibili.com/video/music-original-1.html"},{name:"翻唱",route:"cover",tid:31,ps:15,rps:10,ad:{active:!0,dataLocId:245},viewHotTag:!0,dpConfig:[{name:"一日",value:1},{name:"三日",value:3}],desc:"对曲目的人声再演绎视频",url:"//www.bilibili.com/video/music-Cover-1.html"},{name:"演奏",route:"perform",tid:59,ps:15,rps:10,viewHotTag:!0,dpConfig:[{name:"一日",value:1},{name:"三日",value:3}],desc:"乐器和非传统乐器器材的演奏作品",url:"//www.bilibili.com/video/music-perform-1.html"},{name:"VOCALOID·UTAU",route:"vocaloid",tid:30,ps:15,rps:10,viewHotTag:!0,ad:{active:!0,dataLocId:247},dpConfig:[{name:"一日",value:1},{name:"三日",value:3}],desc:"以VOCALOID等歌声合成引擎为基础，运用各类音源进行的创作",url:"//www.bilibili.com/video/music-vocaloid-1.html"},{name:"音乐现场",route:"live",tid:29,ps:15,rps:10,viewHotTag:!0,dpConfig:[{name:"一日",value:1},{name:"三日",value:3}],desc:"音乐表演的实况视频，包括官方/个人拍摄的综艺节目、音乐剧、音乐节、演唱会等",url:"//www.bilibili.com/video/music-oped-1.html"},{name:"MV",route:"mv",tid:193,ps:15,rps:10,viewHotTag:!0,dpConfig:[{name:"一日",value:1},{name:"三日",value:3}],desc:"为音乐作品配合拍摄或制作的音乐录影带（Music Video），以及自制拍摄、剪辑、翻拍MV",url:"//www.bilibili.com/video/music-coordinate-1.html"},{name:"乐评盘点",route:"commentary",tid:243,ps:15,rps:10,viewHotTag:!0,dpConfig:[{name:"一日",value:1},{name:"三日",value:3}],desc:"音乐类新闻、盘点、点评、reaction、榜单、采访、幕后故事、唱片开箱等",url:"//www.bilibili.com/video/music-collection-1.html"},{name:"音乐教学",route:"tutorial",tid:244,ps:15,rps:10,viewHotTag:!0,dpConfig:[{name:"一日",value:1},{name:"三日",value:3}],desc:"以音乐教学为目的的内容",url:"//www.bilibili.com/video/music-collection-1.html"},{name:"音乐综合",route:"other",tid:130,ps:15,rps:10,viewHotTag:!0,dpConfig:[{name:"一日",value:1},{name:"三日",value:3}],desc:"所有无法被收纳到其他音乐二级分区的音乐类视频",url:"//www.bilibili.com/video/music-collection-1.html"},{name:"音频",customZone:"Audio",route:"audio",url:"//www.bilibili.com/audio/home?musicType=music"},{name:"说唱",url:"//www.bilibili.com/v/rap"}]},{name:"舞蹈",route:"dance",tid:129,locid:64,count:"",subMenuSize:172,slider:{width:620,height:220},viewTag:!1,customComponent:{name:"Energy",titleId:2513,leftId:2472,rightId:2473},sub:[{name:"宅舞",route:"otaku",tid:20,ps:15,rps:10,ad:{active:!0,dataLocId:249},desc:"与ACG相关的翻跳、原创舞蹈",url:"//www.bilibili.com/video/dance-1.html"},{name:"街舞",route:"hiphop",tid:198,ps:15,rps:10,ad:{active:!0,dataLocId:251},desc:"收录街舞相关内容，包括赛事现场、舞室作品、个人翻跳、FREESTYLE等",url:""},{name:"明星舞蹈",route:"star",tid:199,ps:15,rps:10,desc:"国内外明星发布的官方舞蹈及其翻跳内容",url:""},{name:"中国舞",route:"china",tid:200,ps:15,rps:10,ad:{active:!0,dataLocId:253},desc:"传承中国艺术文化的舞蹈内容，包括古典舞、民族民间舞、汉唐舞、古风舞等",url:""},{name:"舞蹈综合",route:"three_d",tid:154,ps:15,rps:10,desc:"收录无法定义到其他舞蹈子分区的舞蹈视频",url:""},{name:"舞蹈教程",route:"demo",tid:156,ps:10,rps:6,desc:"镜面慢速，动作分解，基础教程等具有教学意义的舞蹈视频",url:"//www.bilibili.com/video/dance-demo-1.html"}]},{name:"游戏",route:"game",tid:4,locid:70,count:"",subMenuSize:240,slider:{width:470,height:216},viewTag:!0,customComponent:{name:"Energy",titleId:3761,leftId:3765,rightId:3775,rightType:"slide"},recommendCardType:"GameGroomBox",sub:[{name:"单机游戏",route:"stand_alone",tid:17,ps:10,rps:7,rankshow:1,viewHotTag:!0,ad:{active:!0,dataLocId:255},dpConfig:[{name:"三日",value:3},{name:"一日",value:1},{name:"一周",value:7}],desc:"以所有平台（PC、主机、移动端）的单机或联机游戏为主的视频内容，包括游戏预告、CG、实况解说及相关的评测、杂谈与视频剪辑等",url:"//www.bilibili.com/video/videogame-1.html"},{name:"电子竞技",route:"esports",tid:171,ps:10,rps:7,rankshow:1,viewHotTag:!0,ad:{active:!0,dataLocId:257},desc:"具有高对抗性的电子竞技游戏项目，其相关的赛事、实况、攻略、解说、短剧等视频。",url:"//www.bilibili.com/video/esports-1.html"},{name:"手机游戏",route:"mobile",tid:172,ps:10,rps:7,rankshow:1,viewHotTag:!0,desc:"以手机及平板设备为主要平台的游戏，其相关的实况、攻略、解说、短剧、演示等视频。",url:"//www.bilibili.com/video/mobilegame-1.html"},{name:"网络游戏",route:"online",tid:65,ps:10,rps:7,rankshow:1,viewHotTag:!0,ad:{active:!0,dataLocId:259},dpConfig:[{name:"三日",value:3},{name:"一日",value:1},{name:"一周",value:7}],desc:"由网络运营商运营的多人在线游戏，以及电子竞技的相关游戏内容。包括赛事、攻略、实况、解说等相关视频",url:"//www.bilibili.com/video/onlinegame-1.html"},{name:"桌游棋牌",route:"board",tid:173,ps:5,rps:3,rankshow:1,viewHotTag:!0,desc:"桌游、棋牌、卡牌对战等及其相关电子版游戏的实况、攻略、解说、演示等视频。",url:"//www.bilibili.com/video/boardgame-1.html"},{name:"GMV",route:"gmv",tid:121,ps:5,rps:3,rankshow:1,viewHotTag:!0,dpConfig:[{name:"三日",value:3},{name:"一日",value:1},{name:"一周",value:7}],desc:"由游戏素材制作的MV视频。以游戏内容或CG为主制作的，具有一定创作程度的MV类型的视频",url:"//www.bilibili.com/video/gmv-1.html"},{name:"音游",route:"music",tid:136,ps:5,rps:3,rankshow:1,viewHotTag:!0,dpConfig:[{name:"三日",value:3},{name:"一日",value:1},{name:"一周",value:7}],desc:"各个平台上，通过配合音乐与节奏而进行的音乐类游戏视频",url:"//www.bilibili.com/video/music-game-1.html"},{name:"Mugen",route:"mugen",tid:19,ps:5,rps:3,rankshow:1,viewHotTag:!0,dpConfig:[{name:"三日",value:3},{name:"一日",value:1},{name:"一周",value:7}],desc:"以Mugen引擎为平台制作、或与Mugen相关的游戏视频",url:"//www.bilibili.com/video/game-mugen-1.html"},{name:"游戏赛事",url:"//www.bilibili.com/v/game/match/",newIcon:!0}]},{name:"知识",route:"knowledge",tid:36,locid:76,count:"",subMenuSize:172,slider:{width:620,height:220},viewTag:!1,customComponent:{name:"Energy",titleId:2058,leftId:2047,rightId:2048},sub:[{name:"科学科普",route:"science",tid:201,ps:15,rps:10,ad:{active:!0,dataLocId:261},desc:"回答你的十万个为什么"},{name:"社科·法律·心理",route:"social_science",tid:124,ps:15,rps:10,ad:{active:!0,dataLocId:263},desc:"基于社会科学、法学、心理学展开或个人观点输出的知识视频"},{name:"人文历史",route:"humanity_history",tid:228,ps:15,rps:10,desc:"看看古今人物，聊聊历史过往，品品文学典籍"},{name:"财经商业",route:"business",tid:207,ps:15,rps:10,desc:"说金融市场，谈宏观经济，一起畅聊商业故事"},{name:"校园学习",route:"campus",tid:208,ps:15,rps:10,ad:{active:!0,dataLocId:265},desc:"老师很有趣，学生也有才，我们一起搞学习"},{name:"职业职场",route:"career",tid:209,ps:15,rps:10,desc:"职业分享、升级指南，一起成为最有料的职场人"},{name:"设计·创意",route:"design",tid:229,ps:15,rps:10,desc:"天马行空，创意设计，都在这里"},{name:"野生技能协会",route:"skill",tid:122,ps:15,rps:10,desc:"技能党集合，是时候展示真正的技术了"}]},{name:"科技",route:"tech",tid:188,locid:2977,count:"",subMenuSize:80,slider:{width:620,height:220},viewTag:!1,customComponent:{name:"Energy",titleId:2980,leftId:2978,rightId:2979},sub:[{name:"数码",route:"digital",tid:95,ps:15,rps:10,viewHotTag:!0,desc:"科技数码产品大全，一起来做发烧友",url:"#"},{name:"软件应用",route:"application",tid:230,ps:15,rps:10,viewHotTag:!0,desc:"超全软件应用指南",url:"#"},{name:"计算机技术",route:"computer_tech",tid:231,ps:15,rps:10,viewHotTag:!0,desc:"研究分析、教学演示、经验分享......有关计算机技术的都在这里",url:"#"},{name:"科工机械",route:"industry",tid:232,ps:15,rps:10,viewHotTag:!0,desc:"从小芯片到大工程，一起见证科工力量",url:"#"},{name:"极客DIY",route:"diy",tid:233,ps:15,rps:10,viewHotTag:!0,desc:"炫酷技能，极客文化，硬核技巧，准备好你的惊讶",url:"#"}]},{name:"运动",route:"sports",tid:234,locid:4639,isHide:!0,subMenuSize:164,slider:{width:620,height:220},viewTag:!1,customComponent:{name:"Energy",leftId:4646,rightId:4652,rightType:"slide"},sub:[{name:"篮球·足球",route:"basketballfootball",tid:235,ps:15,rps:10,ad:{active:!0,dataLocId:4656},desc:"与篮球、足球相关的视频，包括但不限于篮足球赛事、教学、评述、剪辑、剧情等相关内容",url:"#"},{name:"健身",route:"aerobics",tid:164,ps:15,rps:10,desc:"与健身相关的视频，包括但不限于瑜伽、CrossFit、健美、力量举、普拉提、街健等相关内容",url:"//www.bilibili.com/video/fashion-body-1.html"},{name:"竞技体育",route:"athletic",tid:236,ps:15,rps:10,desc:"与竞技体育相关的视频，包括但不限于乒乓、羽毛球、排球、赛车等竞技项目的赛事、评述、剪辑、剧情等相关内容",url:"#"},{name:"运动文化",route:"culture",tid:237,ps:15,rps:10,desc:"与运动文化相关的视频，包络但不限于球鞋、球衣、球星卡等运动衍生品的分享、解读，体育产业的分析、科普等相关内容",url:"#"},{name:"运动综合",route:"comprehensive",tid:238,ps:15,rps:10,desc:"与运动综合相关的视频，包括但不限于钓鱼、骑行、滑板等日常运动分享、教学、Vlog等相关内容",url:"#"}]},{name:"汽车",route:"car",tid:223,locid:4428,isHide:!0,subMenuSize:164,slider:{width:620,height:220},viewTag:!1,customComponent:{name:"Energy",leftId:4435,rightId:4441,rightType:"slide"},sub:[{name:"汽车生活",route:"life",tid:176,ps:15,rps:10,ad:{active:!0,dataLocId:4445},desc:"分享汽车及出行相关的生活体验类视频",url:"#"},{name:"汽车文化",route:"culture",tid:224,ps:15,rps:10,desc:"汽车改装、品牌历史、汽车设计、老爷车、汽车模型等",url:"#"},{name:"赛车",route:"racing",tid:245,ps:15,rps:10,desc:"F1等汽车运动相关",url:"#"},{name:"汽车极客",route:"geek",tid:225,ps:15,rps:10,desc:"汽车硬核达人聚集地，包括DIY造车、专业评测和技术知识分享",url:"#"},{name:"摩托车",route:"motorcycle",tid:240,ps:15,rps:10,desc:"骑士们集合啦",url:"#"},{name:"智能出行",route:"smart",tid:226,ps:15,rps:10,desc:"探索新能源汽车和未来智能出行的前沿阵地",url:"#"},{name:"购车攻略",route:"strategy",tid:227,ps:15,rps:10,desc:"丰富详实的购车建议和新车体验",url:"#"}]},{name:"生活",route:"life",tid:160,locid:88,count:"",subMenuSize:164,slider:{width:620,height:220},viewTag:!1,customComponent:{name:"Energy",titleId:2062,leftId:1674,rightId:1670},sub:[{name:"搞笑",route:"funny",tid:138,ps:15,rps:10,ad:{active:!0,dataLocId:273},desc:"各种沙雕有趣的搞笑剪辑，挑战，表演，配音等视频",url:"//www.bilibili.com/video/ent_funny_1.html",locid:4204,recommendId:4210,slider:{width:620,height:220},customComponent:{name:"Energy",leftId:4212,rightId:4218,rightType:"slide"}},{name:"家居房产",route:"home",tid:239,ps:15,rps:10,ad:{active:!0,dataLocId:275},desc:"与买房、装修、居家生活相关的分享",url:"#"},{name:"手工",route:"handmake",tid:161,ps:15,rps:10,desc:"手工制品的制作过程或成品展示、教程、测评类视频",url:"//www.bilibili.com/video/ent-handmake-1.html"},{name:"绘画",route:"painting",tid:162,ps:15,rps:10,desc:"绘画过程或绘画教程，以及绘画相关的所有视频",url:"//www.bilibili.com/video/ent-painting-1.html"},{name:"日常",route:"daily",tid:21,ps:15,rps:10,desc:"记录日常生活，分享生活故事",url:"//www.bilibili.com/video/ent-life-1.html"}]},{name:"美食",route:"food",tid:211,locid:4243,count:"",isHide:!0,subMenuSize:164,slider:{width:620,height:220},viewTag:!1,customComponent:{name:"Energy",leftId:4258,rightId:4264},sub:[{name:"美食制作",route:"make",tid:76,ps:15,rps:10,ad:{active:!0,dataLocId:4268},desc:"学做人间美味，展示精湛厨艺",url:"#"},{name:"美食侦探",route:"detective",tid:212,ps:15,rps:10,desc:"寻找美味餐厅，发现街头美食",url:"#"},{name:"美食测评",route:"measurement",tid:213,ps:15,rps:10,desc:"吃货世界，品尝世间美味",url:"#"},{name:"田园美食",route:"rural",tid:214,ps:15,rps:10,desc:"品味乡野美食，寻找山与海的味道",url:"#"},{name:"美食记录",route:"record",tid:215,ps:15,rps:10,desc:"记录一日三餐，给生活添一点幸福感",url:"#"}]},{name:"动物圈",route:"animal",tid:217,locid:4365,count:"",isHide:!0,subMenuSize:164,slider:{width:620,height:220},viewTag:!1,customComponent:{name:"Energy",leftId:4376,rightId:4381,rightType:"slide"},sub:[{name:"喵星人",route:"cat",tid:218,ps:15,rps:10,desc:"喵喵喵喵喵",url:"#",ad:{active:!0,dataLocId:4385}},{name:"汪星人",route:"dog",tid:219,ps:15,rps:10,desc:"汪汪汪汪汪",url:"#"},{name:"大熊猫",route:"panda",tid:220,ps:15,rps:10,desc:"芝麻汤圆营业中",url:"#"},{name:"野生动物",route:"wild_animal",tid:221,ps:15,rps:10,desc:"内有“猛兽”出没",url:"#"},{name:"爬宠",route:"reptiles",tid:222,ps:15,rps:10,desc:"鳞甲有灵",url:"#"},{name:"动物综合",route:"animal_composite",tid:75,ps:15,rps:10,desc:"收录除上述子分区外，其余动物相关视频以及非动物主体或多个动物主体的动物相关延伸内容",url:"#"}]},{name:"鬼畜",route:"kichiku",tid:119,locid:100,count:"",subMenuSize:182,slider:{width:620,height:220},viewTag:!1,customComponent:{name:"Energy",titleId:2509,leftId:2482,rightId:2483},sub:[{name:"鬼畜调教",route:"guide",tid:22,ps:15,rps:10,ad:{active:!0,dataLocId:285},desc:"使用素材在音频、画面上做一定处理，达到与BGM一定的同步感",url:"//www.bilibili.com/video/ent-Kichiku-1.html"},{name:"音MAD",route:"mad",tid:26,ps:15,rps:10,ad:{active:!0,dataLocId:287},desc:"使用素材音频进行一定的二次创作来达到还原原曲的非商业性质稿件",url:"//www.bilibili.com/video/douga-kichiku-1.html"},{name:"人力VOCALOID",route:"manual_vocaloid",tid:126,ps:15,rps:10,desc:"将人物或者角色的无伴奏素材进行人工调音，使其就像VOCALOID一样歌唱的技术",url:"//www.bilibili.com/video/kichiku-manual_vocaloid-1.html"},{name:"鬼畜剧场",route:"theatre",tid:216,ps:15,rps:10,desc:"使用素材进行人工剪辑编排的有剧情的作品"},{name:"教程演示",route:"course",tid:127,ps:10,rps:6,rightComponent:{name:"CmImgList",id:148},ad:{active:!0,dataLocId:289},hideDropdown:!1,desc:"鬼畜相关的教程演示",url:"//www.bilibili.com/video/kichiku-course-1.html"}]},{name:"时尚",route:"fashion",tid:155,locid:94,count:"",subMenuSize:124,slider:{width:620,height:220},viewTag:!1,customComponent:{name:"Energy",titleId:2515,leftId:2492,rightId:2493},sub:[{name:"美妆护肤",route:"makeup",tid:157,ps:15,rps:10,ad:{active:!0,dataLocId:279},desc:"彩妆护肤、美甲美发、仿妆、医美相关内容分享或产品测评",url:"//www.bilibili.com/video/fashion-makeup-fitness-1.html"},{name:"穿搭",route:"clothing",tid:158,ps:15,rps:10,ad:{active:!0,dataLocId:281},desc:"穿搭风格、穿搭技巧的展示分享，涵盖衣服、鞋靴、箱包配件、配饰（帽子、钟表、珠宝首饰）等",url:"//www.bilibili.com/video/fashion-clothing-1.html"},{name:"时尚潮流",route:"trend",tid:159,ps:15,rps:10,desc:"时尚街拍、时装周、时尚大片，时尚品牌、潮流等行业相关记录及知识科普",url:"#"}]},{name:"资讯",route:"information",tid:202,locid:4076,count:"",subMenuSize:60,slider:{width:620,height:220},viewTag:!1,sub:[{name:"热点",route:"hotspot",tid:203,ps:18,rps:10,desc:"全民关注的时政热门资讯"},{name:"环球",route:"global",tid:204,ps:18,rps:10,desc:"全球范围内发生的具有重大影响力的事件动态"},{name:"社会",route:"social",tid:205,ps:18,rps:10,desc:"日常生活的社会事件、社会问题、社会风貌的报道"},{name:"综合",route:"multiple",tid:206,ps:18,rps:10,desc:"除上述领域外其它垂直领域的综合资讯"}]},{name:"娱乐",route:"ent",tid:5,locid:82,count:"",subMenuSize:62,slider:{width:620,height:220},viewTag:!1,customComponent:{name:"Energy",titleId:2067,leftId:2065,rightId:2066},sub:[{name:"综艺",route:"variety",tid:71,ps:15,rps:10,ad:{active:!0,dataLocId:267},desc:"所有综艺相关，全部一手掌握！",url:"//www.bilibili.com/video/ent-variety-1.html"},{name:"娱乐杂谈",route:"talker",tid:241,ps:15,rps:10,ad:{active:!0,dataLocId:269},desc:"娱乐人物解读、娱乐热点点评、娱乐行业分析"},{name:"粉丝创作",route:"fans",tid:242,ps:15,rps:10,desc:"粉丝向创作视频"},{name:"明星综合",route:"celebrity",tid:137,ps:15,rps:10,desc:"娱乐圈动态、明星资讯相关"}]},{name:"影视",route:"cinephile",tid:181,locid:2211,count:"",subMenuSize:84,slider:{width:620,height:220},viewTag:!1,customComponent:{name:"Energy",titleId:2309,leftId:2307,rightId:2308},sub:[{name:"影视杂谈",route:"cinecism",tid:182,ps:15,rps:10,ad:{active:!0,dataLocId:2212},desc:"影视评论、解说、吐槽、科普等",url:"//www.bilibili.com/video/cinephile-cinecism.html"},{name:"影视剪辑",route:"montage",tid:183,ps:15,rps:10,ad:{active:!0,dataLocId:2213},desc:"对影视素材进行剪辑再创作的视频",url:"//www.bilibili.com/video/cinephile-montage.html"},{name:"短片",route:"shortfilm",tid:85,ps:15,rps:10,desc:"追求自我表达且具有特色的短片",url:"//www.bilibili.com/video/cinephile-shortfilm.html"},{name:"预告·资讯",route:"trailer_info",tid:184,ps:15,rps:10,ad:{active:!0,dataLocId:2214},desc:"影视类相关资讯，预告，花絮等视频",url:"//www.bilibili.com/video/cinephile-trailer-info.html"}]},{name:"纪录片",route:"documentary",tid:177,url:"//www.bilibili.com/documentary/",count:"",takeOvered:!0,hasParent:!0,combination:!0,sub:[{name:"人文·历史",tid:37,route:"history",dise:"",url:"//www.bilibili.com/video/doco-history.html"},{name:"科学·探索·自然",tid:178,route:"science",dise:"",url:"//www.bilibili.com/video/doco-science.html"},{name:"军事",tid:179,route:"military",dise:"",url:"//www.bilibili.com/video/doco-military.html"},{name:"社会·美食·旅行",tid:180,route:"travel",dise:"",url:"//www.bilibili.com/video/doco-travel.html"},{name:"纪录片索引",url:"//www.bilibili.com/documentary/index/"}]},{name:"电影",route:"movie",tid:23,url:"//www.bilibili.com/movie/",count:"",takeOvered:!0,hasParent:!0,combination:!0,sub:[{name:"华语电影",tid:147,route:"chinese",desc:"",url:"//www.bilibili.com/video/movie_chinese_1.html"},{name:"欧美电影",tid:145,route:"west",desc:"",url:"//www.bilibili.com/video/movie_west_1.html"},{name:"日本电影",tid:146,route:"japan",desc:"",url:"//www.bilibili.com/video/movie_japan_1.html"},{name:"其他国家",tid:83,route:"movie",desc:"",url:"//www.bilibili.com/video/movie-movie-1.html"},{name:"电影索引",url:"//www.bilibili.com/movie/index/"}]},{name:"电视剧",route:"tv",tid:11,url:"//www.bilibili.com/tv/",count:"",takeOvered:!0,hasParent:!0,combination:!0,sub:[{name:"国产剧",tid:185,route:"mainland",desc:"",url:"//www.bilibili.com/video/tv-mainland.html"},{name:"海外剧",tid:187,route:"overseas",desc:"",url:"//www.bilibili.com/video/tv-overseas.html"},{name:"电视剧索引",url:"//www.bilibili.com/tv/index/"}]},{name:"虚拟UP主",route:"virtual",locid:4735,count:"",isHide:!0,subMenuSize:60,slider:{width:620,height:220},viewTag:!1,customComponent:{name:"Energy",titleId:4754,leftId:4756},sub:[{name:"游戏",route:"game",tid:4,ps:18,rps:10,url:"//www.bilibili.com/v/virtual/game"},{name:"音乐",route:"music",tid:3,ps:18,rps:10,url:"//www.bilibili.com/v/virtual/music"},{name:"动画",route:"douga",tid:1,ps:18,rps:10,url:"//www.bilibili.com/v/virtual/douga"},{name:"其他",route:"other",tid:0,ps:18,rps:10,url:"//www.bilibili.com/v/virtual/other"}]}]';

// src/runtime/element/create_scripts.ts
function createScripts(elements) {
  return elements.reduce((s, d) => {
    s.push(createElement(d));
    return s;
  }, []);
}
function loopScript(scripts) {
  return new Promise((r, j) => {
    const prev = scripts.shift();
    if (prev) {
      if (prev.src) {
        prev.addEventListener("load", () => r(loopScript(scripts)));
        prev.addEventListener("abort", () => r(loopScript(scripts)));
        prev.addEventListener("error", () => r(loopScript(scripts)));
        return document.body.appendChild(prev);
      }
      document.body.appendChild(prev);
      r(loopScript(scripts));
    } else
      r(void 0);
  });
}
function appendScripts(elements) {
  return loopScript(createScripts(htmlVnode(elements)));
}
function loadScriptEs(path2) {
  const files = isArray(path2) ? path2 : [path2];
  window.postMessage({
    \$type: "executeScript",
    data: files
  });
}

// src/images/svg/dislike.svg
var dislike_default = '<svg viewBox="0 0 38.89 34.47" width="22px"><defs><style>.cls-1 {fill: #f36392;}</style></defs><g><path class="cls-1" d="M10.28,32.77h2.5V13.19h-2.5ZM25,10.55H35.42a4.15,4.15,0,0,1,3.33,1.67,4.38,4.38,0,0,1,.56,3.47L34.86,30.41a6.37,6.37,0,0,1-6,4.86H5.56a4.52,4.52,0,0,1-4.31-2.36,5.61,5.61,0,0,1-.69-2.5V15.55a4.93,4.93,0,0,1,2.5-4.31,8.38,8.38,0,0,1,2.5-.69h6.25l6.8-8.49A3.83,3.83,0,0,1,25.25,5Zm10.14,2.51H22.22l.28-2.92L22.92,5a1.26,1.26,0,0,0-.18-1,1.28,1.28,0,0,0-.82-.56,1.11,1.11,0,0,0-1.25.42l-6.36,8.2-.83,1.11H5.14a2,2,0,0,0-.83.28,2.28,2.28,0,0,0-1.25,2.08V30.41a2,2,0,0,0,.42,1.25,2,2,0,0,0,2.08,1.11H28.89a2.38,2.38,0,0,0,1.39-.41,3.61,3.61,0,0,0,2.08-2.78L36.8,15l2.5.56L36.8,15a2.45,2.45,0,0,0-.14-1.39,2.89,2.89,0,0,0-1.52-.54l.28-2.5Z" transform="translate(-0.56 -0.82)" /></g></svg>';

// src/images/svg/like.svg
var like_default = '<svg viewBox="0 0 38.89 34.47" width="22px"><defs><style>.cls-1 {fill: #f36392;}</style></defs><g><path class="cls-1" d="M12.06,35.27V10.43h-.15l6.7-8.37A3.83,3.83,0,0,1,25.25,5L25,10.55H35.42a4.15,4.15,0,0,1,3.33,1.67,4.38,4.38,0,0,1,.56,3.47L34.86,30.41a6.37,6.37,0,0,1-6,4.86Zm-2.5,0h-4a4.52,4.52,0,0,1-4.31-2.36,5.61,5.61,0,0,1-.69-2.5V15.55a4.93,4.93,0,0,1,2.5-4.31,8.38,8.38,0,0,1,2.5-.69h4Z" transform="translate(-0.56 -0.82)" /></g></svg>';

// src/content/av/en_like.ts
var enLike = class {
  aid = void 0;
  coin = void 0;
  span = void 0;
  liked = false;
  number = 0;
  type;
  svgLike = dislike_default;
  svgEnLike = like_default;
  constructor(type, num = 0) {
    this.type = type;
    this.number = num;
    doWhile(() => {
      this.coin = type === "watchlater" ? document.querySelector(".u.coin") : document.querySelector("[report-id*=coin]");
      return this.coin && API.aid;
    }, () => this.init());
  }
  init() {
    this.style();
    this.aid = API.aid;
    this.span = document.createElement("span");
    this.span.classList.add("ulike");
    this.coin.parentElement.insertBefore(this.span, this.coin);
    this.changeLiked();
    this.span.addEventListener("click", () => this.setLike());
    switchVideo(() => this.switch());
    try {
      !this.number && xhr({
        url: \`https://api.bilibili.com/x/web-interface/view?aid=\${API.aid}\`,
        credentials: true,
        responseType: "json"
      }, true).then((d) => {
        this.number = jsonCheck(d).data.stat.like;
        this.changeLiked();
      });
      uid && xhr({
        url: \`https://api.bilibili.com/x/web-interface/archive/has/like?aid=\${API.aid}\`,
        credentials: true,
        responseType: "json"
      }).then((d) => {
        d = jsonCheck(d).data;
        d === 1 && (this.liked = true, this.changeLiked());
      });
    } catch (e) {
      toast.error("点赞失败！");
      debug.error("点赞失败！", e);
    }
  }
  style() {
    let style = \`.ulike {cursor: pointer;}.ulike svg{vertical-align: middle;margin-right: 10px;}\`;
    switch (this.type) {
      case "bangumi":
        style += \`.ulike {margin-left: 15px;position: relative;float: left;height: 100%;line-height: 18px;font-size: 12px;color: #222;}\`;
        break;
      case "watchlater":
        style += \`.video-info-module .number .ulike {margin-left: 15px;margin-right: 5px;}\`;
        break;
      default:
        style += \`.video-info-m .number .ulike {margin-left: 15px;margin-right: 5px;}\`;
    }
    addCss(style);
  }
  setLike() {
    if (uid) {
      const like = this.liked ? 2 : 1;
      xhr({
        url: "https://api.bilibili.com/x/web-interface/archive/like",
        method: "POST",
        data: \`aid=\${API.aid}&like=\${like}&csrf=\${getCookies().bili_jct}\`,
        credentials: true,
        responseType: "json"
      }).then((d) => {
        jsonCheck(d).ttl;
        this.liked = !this.liked;
        this.number = this.liked ? this.number + 1 : this.number - 1;
        this.changeLiked();
      });
    } else {
      toast.warning("请先登录 щ(ʘ╻ʘ)щ");
      biliQuickLogin();
    }
  }
  changeLiked() {
    this.span.innerHTML = \`\${this.liked ? this.svgEnLike : this.svgLike}</i>点赞 \${unitFormat(this.number) || "--"}\`;
  }
  switch() {
    if (this.aid != API.aid) {
      this.aid = API.aid;
      xhr({
        url: \`https://api.bilibili.com/x/web-interface/view?aid=\${API.aid}\`,
        credentials: true,
        responseType: "json"
      }).then((d) => {
        this.number = jsonCheck(d).data.stat.like;
        this.changeLiked();
      });
    }
  }
};

// src/content/av/collection.ts
function calcDivWidth(text) {
  let elem = document.createElement("div");
  elem.setAttribute("style", "display: inline-block");
  elem.innerText = text;
  document.body.append(elem);
  let w = elem.clientWidth;
  document.body.removeChild(elem);
  return w;
}
function calcOffsetPos(elem) {
  let result = { x: 0, y: 0 };
  for (let e = elem; e != null; e = e.offsetParent) {
    result.x += e.offsetLeft;
    result.y += e.offsetTop;
  }
  return result;
}
function getAid() {
  return window.history.state?.aid;
}
var CollectionElement = class {
  container;
  clearfix;
  items = [];
  spread = null;
  constructor(onSpread) {
    this.container = document.createElement("div");
    this.clearfix = document.createElement("ul");
    this.clearfix.className = "clearfix";
    this.container.appendChild(this.clearfix);
    if (onSpread) {
      this.spread = document.createElement("a");
      this.spread.className = "item v-part-toggle";
      this.spread.addEventListener("click", (e) => {
        onSpread();
        e.preventDefault();
      });
      this.clearfix.appendChild(this.spread);
    }
  }
  setContainerAttr(attr) {
    let staticClass = "multi-page bili-wrapper report-wrap-module report-scroll-module";
    this.container.className = [staticClass, attr.class].join(" ").trim();
  }
  setItemAttrs(attrs) {
    while (this.items.length > attrs.length)
      this.clearfix.removeChild(this.items.pop().node);
    while (this.items.length < attrs.length) {
      let i = { click: null, node: document.createElement("a") };
      i.node.addEventListener("mouseenter", (e) => this.showFloatTxt(e));
      i.node.addEventListener("mouseleave", () => this.hideFloatText());
      i.node.addEventListener("click", (e) => {
        if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.defaultPrevented || e.button != 0)
          return;
        e.preventDefault();
        i.click && i.click(e);
      });
      this.clearfix.insertBefore(i.node, this.spread);
      this.items.push(i);
    }
    const staticClass = "item";
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].node.className = [staticClass, attrs[i].class].join(" ").trim();
      this.items[i].node.innerText = attrs[i].text;
      this.items[i].node.href = attrs[i].href;
      this.items[i].click = attrs[i].click;
    }
  }
  setSpreadAttr(attr) {
    if (this.spread) {
      this.spread.style.top = attr.top + "px";
      attr.text && (this.spread.innerText = attr.text);
    }
  }
  showFloatTxt(e) {
    let item = e.target;
    let treshold = calcDivWidth(item.innerText) + 14;
    if (item.offsetWidth >= treshold)
      return;
    let floatTxt = document.createElement("div");
    floatTxt.className = "p-float-txt";
    floatTxt.innerText = item.innerText;
    document.body.appendChild(floatTxt);
    let pos = calcOffsetPos(item);
    floatTxt.style.left = pos.x + "px";
    floatTxt.style.top = pos.y - 8 - floatTxt.clientHeight + "px";
    floatTxt.style.transition = "opacity 0.4s, top 0.4s cubic-bezier(0.37, 0, 0.63, 1)";
    floatTxt.style.top = pos.y - 3 - floatTxt.clientHeight + "px";
    floatTxt.style.opacity = "1";
  }
  hideFloatText() {
    let e = document.querySelector(".p-float-txt");
    e && document.body.removeChild(e);
  }
};
var CollectionData = class {
  notify = null;
  _viewEpisodes = [];
  _ep = 0;
  _spread = false;
  _spreadBtnTop = 0;
  _colCount = 4;
  episodes = [];
  get viewEpisodes() {
    return this._viewEpisodes;
  }
  get ep() {
    if (this.episodes[this._ep].aid != getAid())
      this._ep = this.episodes.findIndex((ep) => ep.aid == getAid());
    return this._ep;
  }
  get spreadBtnTop() {
    return this._spreadBtnTop;
  }
  set spreadBtnTop(n) {
    if (this._spreadBtnTop != n) {
      this._spreadBtnTop = n;
      this.notify?.spreadBtnTop(this._spreadBtnTop);
    }
  }
  get spread() {
    return this._spread;
  }
  get colCount() {
    return this._colCount;
  }
  get pageList() {
    return this.episodes.reduce((s, ep, i) => {
      s.push({
        aid: ep.aid,
        cid: ep.cid,
        page: i + 1,
        part: ep.title,
        duration: ep.page.duration,
        dimension: ep.page.dimension,
        from: ep.page.from,
        vid: "",
        weblink: ""
      });
      return s;
    }, []);
  }
  constructor(season) {
    this.initEpisodes(season);
    this.calcColCount();
    this._viewEpisodes = !this.needSpread() ? this.episodes : this.calcViewEpisodesOnCollapsed(this.ep);
  }
  initEpisodes(season) {
    season.sections.forEach((section2) => {
      Array.prototype.push.apply(this.episodes, section2.episodes);
    });
  }
  calcColCount() {
    let w = calcDivWidth(this.episodes[this.ep].title);
    this._colCount = w >= 241 ? 3 : w >= 186 ? 4 : w >= 149 ? 5 : w >= 123 ? 6 : window.innerWidth > 1440 ? 7 : 6;
  }
  calcViewEpisodesOnCollapsed(ep) {
    let begin = ep == 0 ? 0 : ep - 1 + this._colCount <= this.episodes.length ? ep - 1 : Math.max(this.episodes.length - this._colCount, 0);
    return this.episodes.slice(begin, begin + this._colCount);
  }
  needSpread() {
    return this._colCount < this.episodes.length || this.spread;
  }
  toggleSpread() {
    this._spread = !this._spread;
    this._viewEpisodes = this._spread ? this.episodes : this.calcViewEpisodesOnCollapsed(this.ep);
    this._spreadBtnTop = 0;
    this.calcColCount();
    this.notify?.spread(this._spread);
  }
  updateEp() {
    let ep = this._ep;
    if (ep == this.ep)
      return;
    this._viewEpisodes = this._spread ? this.episodes : this.calcViewEpisodesOnCollapsed(this.ep);
    this.notify?.ep();
  }
};
var CollectionComponent = class {
  data;
  elem;
  constructor(season, player2) {
    this.data = new CollectionData(season);
    this.elem = new CollectionElement(this.data.needSpread() ? () => this.data.toggleSpread() : null);
    window.callAppointPart = (_p, video) => {
      let state = { aid: video.aid, cid: video.cid };
      window.history.pushState(state, "", "/video/av" + video.aid);
      this.onRouteChanged(state);
    };
    window.addEventListener("popstate", (e) => {
      this.reloadPlayer(e.state);
      this.onRouteChanged(e.state);
    });
    window.addEventListener("scroll", () => this.onWindowScroll());
    this.render();
    player2.parentNode.insertBefore(this.elem.container, player2);
    this.data.notify = {
      spread: (spread) => {
        this.render();
        !spread && window.scroll({ top: calcOffsetPos(document.getElementById("viewbox_report")).y });
      },
      spreadBtnTop: (top) => {
        this.elem.setSpreadAttr({ top });
      },
      ep: () => this.render()
    };
    xhrhook("/x/player/pagelist", void 0, (r) => {
      r.response = JSON.stringify({
        code: 0,
        message: 0,
        ttl: 1,
        data: this.data.pageList
      });
      r.responseText = r.response;
    }, false);
  }
  render() {
    this.elem.setContainerAttr({ class: "col-" + this.data.colCount });
    this.elem.setItemAttrs(this.data.viewEpisodes.map((p) => {
      return {
        class: p.aid == getAid() ? "on" : "",
        href: "/video/av" + p.aid,
        text: p.title,
        click: (_e) => {
          let video = { aid: p.aid, cid: p.cid };
          this.reloadPlayer(video);
          window.callAppointPart(1, video);
        }
      };
    }, this));
    this.elem.setSpreadAttr({
      top: this.data.spreadBtnTop,
      text: this.data.spread ? "收起" : "展开"
    });
  }
  reloadPlayer(v) {
    window.GrayManager.reload(\`aid=\${v.aid}&cid=\${v.cid}&has_next=1\`);
  }
  onWindowScroll() {
    if (!this.data.spread)
      return;
    let div = this.elem.container;
    let btn = this.elem.spread;
    let divY = calcOffsetPos(div).y;
    let maxTop = div.clientHeight - btn.clientHeight - 20;
    this.data.spreadBtnTop = window.scrollY <= divY - 20 ? 0 : Math.min(window.scrollY - divY + 20, maxTop);
  }
  onRouteChanged(state) {
    this.data.updateEp();
    let avComponent = window.biliUIcomponents;
    avComponent.\$store.state.aid = state.aid;
    xhr({
      url: objUrl("https://api.bilibili.com/x/web-interface/view/detail", { aid: state.aid }),
      responseType: "json",
      credentials: true
    }).then((d) => {
      avComponent?.setVideoData(d.data?.View);
    });
    xhr({
      url: objUrl("https://api.bilibili.com/x/web-interface/archive/related", { aid: state.aid }),
      responseType: "json",
      credentials: true
    }).then((d) => avComponent.related = d.data);
    avComponent.initPage();
  }
};
var Collection = class {
  component = void 0;
  constructor(videoData) {
    xhrhook("/x/player.so", void 0, (r) => {
      r.response = r.response.replace(/<has_next>\\s*0/, "<has_next>1");
      r.responseText = r.response;
    }, false);
    doWhile(() => document.getElementById("__bofqi"), (player2) => {
      try {
        window.history.replaceState({ aid: videoData.aid, cid: videoData.cid }, "");
        this.component = new CollectionComponent(videoData.ugc_season, player2);
        this.component.render();
      } catch (e) {
        toast.error("collection.js", e);
      }
    });
    toast.warning("视频合集，现以分P样式呈现！", "如需关闭，请访问设置-重构-合集选项。");
  }
  static needDisplay(videoData) {
    return videoData.videos <= 1 && videoData.ugc_season && videoData.is_season_display;
  }
  static run(videoData) {
    this.needDisplay(videoData) && new Collection(videoData);
  }
};
function collection(v) {
  Collection.run(v);
}

// src/content/av/up_list.css
var _default4 = {};

// src/content/av/up_list.ts
function upList(staff) {
  doWhile(() => document.querySelector("#v_upinfo"), (node2) => {
    let fl = '<span class="title">UP主列表</span><div class="up-card-box">';
    fl = staff.reduce((s, d) => {
      s = s + \`<div class="up-card">
                <a href="//space.bilibili.com/\${d.mid}" data-usercard-mid="\${d.mid}" target="_blank" class="avatar">
                <img src="\${d.face}@48w_48h.webp" /><!---->
                <span class="info-tag">\${d.title}</span><!----></a>
                <div class="avatar">
                <a href="//space.bilibili.com/\${d.mid}" data-usercard-mid="\${d.mid}" target="_blank" class="\${d.vip && d.vip.status ? "name-text is-vip" : "name-text"}">\${d.name}</a>
                </div></div>\`;
      return s;
    }, fl) + \`</div>\`;
    node2.innerHTML = fl;
    addCss(_default4);
  });
}

// src/runtime/variable/clean.ts
var dushs = [
  "__INITIAL_STATE__",
  "__PGC_USERSTATE__",
  "__BILI_CONFIG__",
  "Sentry",
  "__mobxGlobals",
  "__mobxInstanceCount",
  "_babelPolyfill",
  "BilibiliPlayer",
  "BiliJsBridge",
  "LazyLoad",
  "lazyload",
  "regeneratorRuntime",
  "ownKeys",
  "asyncGeneratorStep",
  "Bjax",
  "BPlayer",
  "BwpElement",
  "BwpMediaSource",
  "bPlayer",
  "EmbedPlayer",
  "GrayManager",
  "PlayerAgent",
  "PlayerSetOnline",
  "abtest",
  "ad_rp",
  "ad_url",
  "bPlayer",
  "bsourceFrom",
  "dashjs",
  "deltaFilter",
  "directiveDispatcher",
  "ep",
  "flashChecker",
  "flvjs",
  "getAuthorInfo",
  "getCookie",
  "getIEVersion",
  "gqs",
  "heimu",
  "insertLink",
  "insertScript",
  "iris",
  "isBiliPlayer",
  "isEmbedPlayer",
  "isInit",
  "jsurl",
  "jsUrls",
  "loadLink",
  "loadScript",
  "loginInfoCallbacks",
  "md",
  "nano",
  "nanoWidgetsJsonp",
  "player",
  "playerInfo",
  "player_fullwin",
  "player_widewin",
  "rec_rp",
  "regeneratorRuntime",
  "reportConfig",
  "reportFistAdFs",
  "reportObserver",
  "setSize",
  "setSizeStyle",
  "spmReportData",
  "vd",
  "videoWidgetsJsonP",
  "webAbTest",
  "webpackJsonp",
  "__getClientLogo",
  "_arrayLikeToArray",
  "_arrayWithHoles",
  "_arrayWithoutHoles",
  "_asyncToGenerator2",
  "_classCallCheck",
  "_createClass",
  "_createForOfIteratorHelper",
  "_defineProperties",
  "_defineProperty",
  "_iterableToArray",
  "_iterableToArrayLimit",
  "_nonIterableRest",
  "_nonIterableSpread",
  "_objectSpread",
  "_slicedToArray",
  "_toConsumableArray",
  "_typeof",
  "_unsupportedIterableToArray",
  "el",
  "BiliCm",
  "BiliHeader",
  "webpackJsonpwebpackLogReporter",
  "webpackLogReporter",
  "core",
  "__getClientLogo",
  "_arrayLikeToArray",
  "_arrayWithoutHoles",
  "_iterableToArray",
  "_nonIterableSpread",
  "_toConsumableArray",
  "_unsupportedIterableToArray",
  "AttentionList",
  "UserStatus",
  "biliQuickLogin",
  "clearImmediate",
  "jvsCert",
  "loadLoginStatus",
  "mOxie",
  "moxie",
  "o",
  "onLoginInfoLoaded",
  "plupload",
  "recaptcha",
  "setImmediate",
  "setTid",
  "show1080p",
  "showCoopModal",
  "showPay",
  "swfobject",
  "tabSocket",
  "__BiliUser__",
  "___grecaptcha_cfg",
  "__core-js_shared__"
];
function variableCleaner() {
  dushs.forEach((d) => {
    try {
      Reflect.deleteProperty(window, d);
    } catch (e) {
      window[d] = void 0;
    }
  });
}

// src/content/av/av_lost_check.ts
var Detail = class {
  code = 0;
  data = {
    Card: { archive_count: -1, article_count: -1, card: {}, follower: -1, following: false, like_num: -1, space: {} },
    Related: [],
    Reply: { page: {}, replies: [] },
    Spec: null,
    Tags: [],
    View: {},
    elec: null,
    hot_share: {},
    recommend: null,
    view_addit: {}
  };
  message = "0";
  ttl = 1;
};
function view2Detail(data) {
  const result = new Detail();
  if (data.v2_app_api) {
    delete data.v2_app_api.redirect_url;
    result.data.Card.follower = data.v2_app_api.owner_ext?.fans;
    result.data.Card.card = { ...data.v2_app_api.owner, ...data.v2_app_api.owner_ext };
    result.data.Tags = data.v2_app_api.tag;
    result.data.View = data.v2_app_api;
    xhrhook(\`api.bilibili.com/x/web-interface/view?aid=\${API.aid}\`, void 0, (res) => {
      const t = \`{"code": 0,"message":"0","ttl":1,"data":\${JSON.stringify(result.data.View)}}\`;
      res.responseType === "json" ? res.response = JSON.parse(t) : res.response = res.responseText = t;
    }, false);
    xhrhook(\`api.bilibili.com/x/web-interface/archive/stat?aid=\${API.aid}\`, void 0, (res) => {
      const t = \`{"code": 0,"message":"0","ttl":1,"data":\${JSON.stringify({ ...result.data.View.stat, aid: API.aid })}}\`;
      res.responseType === "json" ? res.response = JSON.parse(t) : res.response = res.responseText = t;
    }, false);
    return JSON.parse(JSON.stringify(result));
  } else
    return v1api(data);
}
function v1api(data) {
  const result = new Detail();
  const p = Number(getUrlValue("p"));
  result.data.Card.card = {
    face: "//static.hdslb.com/images/akari.jpg",
    mid: data.mid,
    name: data.author,
    vip: {}
  };
  result.data.View = {
    aid: data.aid || data.id || API.aid,
    cid: data.list[p ? p - 1 : 0].cid,
    copyright: 1,
    ctime: data.created,
    dimension: { width: 1920, height: 1080, rotate: 0 },
    duration: -1,
    owner: result.data.Card.card,
    pages: data.list,
    pic: data.pic,
    pubdate: data.lastupdatets,
    rights: {},
    stat: {
      aid: data.aid || data.id || API.aid,
      coin: data.coins,
      danmaku: data.video_review,
      dislike: 0,
      evaluation: "",
      favorite: data.favorites,
      his_rank: 0,
      like: -1,
      now_rank: 0,
      reply: -1,
      share: -1,
      view: data.play
    },
    state: 0,
    subtitle: { allow_submit: false, list: [] },
    tid: data.tid,
    title: data.title,
    tname: data.typename,
    videos: data.list.length
  };
  data.bangumi && (result.data.View.season = data.bangumi);
  xhrhook(\`api.bilibili.com/x/web-interface/view?aid=\${API.aid}\`, void 0, (res) => {
    const t = \`{"code": 0,"message":"0","ttl":1,"data":\${JSON.stringify(result.data.View)}}\`;
    res.responseType === "json" ? res.response = JSON.parse(t) : res.response = res.responseText = t;
  }, false);
  xhrhook(\`api.bilibili.com/x/web-interface/archive/stat?aid=\${API.aid}\`, void 0, (res) => {
    const t = \`{"code": 0,"message":"0","ttl":1,"data":\${JSON.stringify({ ...result.data.View.stat, aid: API.aid })}}\`;
    res.responseType === "json" ? res.response = JSON.parse(t) : res.response = res.responseText = t;
  }, false);
  return JSON.parse(JSON.stringify(result));
}
async function check(call) {
  try {
    toast.info(\`正在进一步查询 av\${API.aid} 的信息~\`);
    const card = await xhr({
      url: \`https://api.bilibili.com/x/article/cards?ids=av\${API.aid}\`,
      responseType: "json"
    });
    if (card.data[\`av\${API.aid}\`]) {
      if (card.data[\`av\${API.aid}\`].redirect_url) {
        sessionStorage2.setItem("redirect", card.data[\`av\${API.aid}\`].redirect_url);
        call(new Detail());
        variableCleaner();
        return loadScriptEs("content/bangumi/bangumi.js");
      }
    }
    const data = await xhr({
      url: \`https://www.biliplus.com/api/view?id=\${API.aid}\`,
      responseType: "json"
    }, true);
    const res = view2Detail(data);
    if (res.data.View.season) {
      sessionStorage2.setItem("redirect", res.data.View.season.ogv_play_url);
      res.data.View.season = void 0;
      call(res);
      variableCleaner();
      return loadScriptEs("content/bangumi/bangumi.js");
    }
    call(res);
    setTimeout(() => {
      toast.custom(0, "warning", "这大概是一个无效av号~", "本页面使用缓存数据生成，并无法播放！", "部分上古视频还存在评论区哦~");
    }, 1e3);
  } catch (e) {
    debug.error(e);
  }
}
function avLostCheck() {
  jsonphook("api.bilibili.com/x/web-interface/view/detail", void 0, (res, r, call) => {
    if (0 !== res.code) {
      const obj = urlObj(r);
      if (obj.aid) {
        API.aid = obj.aid;
        check(call);
        return true;
      }
    } else {
      if (res.data && res.data.View) {
        if (res.data.View.stein_guide_cid) {
          sessionStorage2.setItem("keepNew", "旧版页面不支持互动视频！已重定向回新版页面🤣");
          location.reload();
        }
        Promise.resolve().then(() => {
          setting.upList && res.data.View.staff && upList(res.data.View.staff);
          setting.collection && res.data.View.is_season_display && res.data.View.ugc_season && collection(res.data.View);
        });
      }
    }
  }, false);
}

// src/runtime/lib/cubic_bezier.ts
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 1e-3;
var SUBDIVISION_PRECISION = 1e-7;
var SUBDIVISION_MAX_ITERATIONS = 10;
var kSplineTableSize = 11;
var kSampleStepSize = 1 / (kSplineTableSize - 1);
var float32ArraySupported = typeof Float32Array === "function";
function A(aA1, aA2) {
  return 1 - 3 * aA2 + 3 * aA1;
}
function B(aA1, aA2) {
  return 3 * aA2 - 6 * aA1;
}
function C(aA1) {
  return 3 * aA1;
}
function calcBezier(aT, aA1, aA2) {
  return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
}
function getSlope(aT, aA1, aA2) {
  return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
}
function binarySubdivide(aX, aA, aB, mX1, mX2) {
  let currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (let i = 0; i < NEWTON_ITERATIONS; ++i) {
    const currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0) {
      return aGuessT;
    }
    const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
}
function LinearEasing(x) {
  return x;
}
function bezier(mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error("bezier x values must be in [0, 1] range");
  }
  if (mX1 === mY1 && mX2 === mY2) {
    return LinearEasing;
  }
  const sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  for (let i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }
  function getTForX(aX) {
    let intervalStart = 0;
    let currentSample = 1;
    const lastSample = kSplineTableSize - 1;
    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;
    const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    const guessForT = intervalStart + dist * kSampleStepSize;
    const initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }
  return function BezierEasing(x) {
    if (x === 0 || x === 1) {
      return x;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
}

// src/content/animated_banner.html
var animated_banner_default = '<style type="text/css">\\r\\n    .animated-banner {\\r\\n        position: absolute;\\r\\n        top: 0;\\r\\n        bottom: 0;\\r\\n        left: 0;\\r\\n        right: 0;\\r\\n    }\\r\\n\\r\\n    .animated-banner>.layer {\\r\\n        position: absolute;\\r\\n        left: 0;\\r\\n        top: 0;\\r\\n        height: 100%;\\r\\n        width: 100%;\\r\\n        display: flex;\\r\\n        align-items: center;\\r\\n        justify-content: center;\\r\\n        overflow: hidden;\\r\\n    }\\r\\n\\r\\n    @keyframes banner-fade-in {\\r\\n        0% {\\r\\n            opacity: 0;\\r\\n        }\\r\\n\\r\\n        100% {\\r\\n            opacity: 1;\\r\\n        }\\r\\n    }\\r\\n\\r\\n    .animated-banner .layer {\\r\\n        animation: banner-fade-in 0.7s;\\r\\n    }\\r\\n</style>';

// src/content/banner.ts
var primaryMenu = () => {
  doWhile(() => document.querySelector("#primary_menu"), () => {
    const vue = document.querySelector("#primary_menu").__vue__;
    vue.menuList.forEach((d, i, s) => {
      switch (d.name) {
        case "动画":
          s[i].sub = [{ "name": "MAD·AMV", "route": "mad", "tid": 24, "ps": 15, "rps": 10, "ad": { "active": true, "dataLocId": 151 }, "desc": "具有一定制作程度的动画或静画的二次创作视频", "url": "//www.bilibili.com/video/douga-mad-1.html" }, { "name": "MMD·3D", "route": "mmd", "tid": 25, "ps": 15, "rps": 10, "ad": { "active": true, "dataLocId": 152 }, "desc": "使用MMD（MikuMikuDance）和其他3D建模类软件制作的视频", "url": "//www.bilibili.com/video/douga-mmd-1.html" }, { "name": "短片·手书·配音", "route": "voice", "tid": 47, "ps": 15, "rps": 10, "desc": "追求创新并具有强烈特色的短片、手书（绘）及ACG相关配音", "url": "//www.bilibili.com/video/douga-voice-1.html" }, { "name": "手办·模玩", "route": "garage_kit", "tid": 210, "ps": 15, "rps": 10, "desc": "手办模玩的测评、改造或其他衍生内容", "url": "" }, { "name": "特摄", "route": "tokusatsu", "tid": 86, "ps": 15, "rps": 10, "desc": "特摄相关衍生视频", "url": "//www.bilibili.com/video/cinephile-tokusatsu.html" }, { "name": "综合", "route": "other", "tid": 27, "ps": 15, "rps": 10, "ad": { "active": true, "dataLocId": 153 }, "desc": "以动画及动画相关内容为素材，包括但不仅限于音频替换、杂谈、排行榜等内容", "url": "//www.bilibili.com/video/douga-else-1.html" }];
          break;
        case "音乐":
          s[i].sub = [{ "name": "原创音乐", "route": "original", "tid": 28, "ps": 15, "rps": 10, "viewHotTag": true, "ad": { "active": true, "dataLocId": 243 }, "dpConfig": [{ "name": "一日", "value": 1 }, { "name": "三日", "value": 3 }], "desc": "原创歌曲及纯音乐，包括改编、重编曲及remix", "url": "//www.bilibili.com/video/music-original-1.html" }, { "name": "翻唱", "route": "cover", "tid": 31, "ps": 15, "rps": 10, "ad": { "active": true, "dataLocId": 245 }, "viewHotTag": true, "dpConfig": [{ "name": "一日", "value": 1 }, { "name": "三日", "value": 3 }], "desc": "对曲目的人声再演绎视频", "url": "//www.bilibili.com/video/music-Cover-1.html" }, { "name": "演奏", "route": "perform", "tid": 59, "ps": 15, "rps": 10, "viewHotTag": true, "dpConfig": [{ "name": "一日", "value": 1 }, { "name": "三日", "value": 3 }], "desc": "乐器和非传统乐器器材的演奏作品", "url": "//www.bilibili.com/video/music-perform-1.html" }, { "name": "VOCALOID·UTAU", "route": "vocaloid", "tid": 30, "ps": 15, "rps": 10, "viewHotTag": true, "ad": { "active": true, "dataLocId": 247 }, "dpConfig": [{ "name": "一日", "value": 1 }, { "name": "三日", "value": 3 }], "desc": "以VOCALOID等歌声合成引擎为基础，运用各类音源进行的创作", "url": "//www.bilibili.com/video/music-vocaloid-1.html" }, { "name": "音乐现场", "route": "live", "tid": 29, "ps": 15, "rps": 10, "viewHotTag": true, "dpConfig": [{ "name": "一日", "value": 1 }, { "name": "三日", "value": 3 }], "desc": "音乐表演的实况视频，包括官方/个人拍摄的综艺节目、音乐剧、音乐节、演唱会等", "url": "//www.bilibili.com/video/music-oped-1.html" }, { "name": "MV", "route": "mv", "tid": 193, "ps": 15, "rps": 10, "viewHotTag": true, "dpConfig": [{ "name": "一日", "value": 1 }, { "name": "三日", "value": 3 }], "desc": "为音乐作品配合拍摄或制作的音乐录影带（Music Video），以及自制拍摄、剪辑、翻拍MV", "url": "//www.bilibili.com/video/music-coordinate-1.html" }, { "name": "乐评盘点", "route": "commentary", "tid": 243, "ps": 15, "rps": 10, "viewHotTag": true, "dpConfig": [{ "name": "一日", "value": 1 }, { "name": "三日", "value": 3 }], "desc": "音乐类新闻、盘点、点评、reaction、榜单、采访、幕后故事、唱片开箱等", "url": "//www.bilibili.com/video/music-collection-1.html" }, { "name": "音乐教学", "route": "tutorial", "tid": 244, "ps": 15, "rps": 10, "viewHotTag": true, "dpConfig": [{ "name": "一日", "value": 1 }, { "name": "三日", "value": 3 }], "desc": "以音乐教学为目的的内容", "url": "//www.bilibili.com/video/music-collection-1.html" }, { "name": "音乐综合", "route": "other", "tid": 130, "ps": 15, "rps": 10, "viewHotTag": true, "dpConfig": [{ "name": "一日", "value": 1 }, { "name": "三日", "value": 3 }], "desc": "所有无法被收纳到其他音乐二级分区的音乐类视频", "url": "//www.bilibili.com/video/music-collection-1.html" }, { "name": "音频", "customZone": "Audio", "route": "audio", "url": "//www.bilibili.com/audio/home?musicType=music" }, { "name": "说唱", "url": "//www.bilibili.com/v/rap" }];
          break;
        case "科技":
          s[i].name = "知识";
          s[i].route = "knowledge";
          s[i].sub = [{ "name": "科学科普", "route": "science", "tid": 201, "ps": 15, "rps": 10, "ad": { "active": true, "dataLocId": 261 }, "desc": "回答你的十万个为什么" }, { "name": "社科·法律·心理", "route": "social_science", "tid": 124, "ps": 15, "rps": 10, "ad": { "active": true, "dataLocId": 263 }, "desc": "基于社会科学、法学、心理学展开或个人观点输出的知识视频" }, { "name": "人文历史", "route": "humanity_history", "tid": 228, "ps": 15, "rps": 10, "desc": "看看古今人物，聊聊历史过往，品品文学典籍" }, { "name": "财经商业", "route": "business", "tid": 207, "ps": 15, "rps": 10, "desc": "说金融市场，谈宏观经济，一起畅聊商业故事" }, { "name": "校园学习", "route": "campus", "tid": 208, "ps": 15, "rps": 10, "ad": { "active": true, "dataLocId": 265 }, "desc": "老师很有趣，学生也有才，我们一起搞学习" }, { "name": "职业职场", "route": "career", "tid": 209, "ps": 15, "rps": 10, "desc": "职业分享、升级指南，一起成为最有料的职场人" }, { "name": "设计·创意", "route": "design", "tid": 229, "ps": 15, "rps": 10, "desc": "天马行空，创意设计，都在这里" }, { "name": "野生技能协会", "route": "skill", "tid": 122, "ps": 15, "rps": 10, "desc": "技能党集合，是时候展示真正的技术了" }];
          break;
        case "数码":
          s[i].name = "科技";
          s[i].route = "tech";
          s[i].sub = [{ "name": "数码", "route": "digital", "tid": 95, "ps": 15, "rps": 10, "viewHotTag": true, "desc": "科技数码产品大全，一起来做发烧友", "url": "#" }, { "name": "软件应用", "route": "application", "tid": 230, "ps": 15, "rps": 10, "viewHotTag": true, "desc": "超全软件应用指南", "url": "#" }, { "name": "计算机技术", "route": "computer_tech", "tid": 231, "ps": 15, "rps": 10, "viewHotTag": true, "desc": "研究分析、教学演示、经验分享......有关计算机技术的都在这里", "url": "#" }, { "name": "科工机械", "route": "industry", "tid": 232, "ps": 15, "rps": 10, "viewHotTag": true, "desc": "从小芯片到大工程，一起见证科工力量", "url": "#" }, { "name": "极客DIY", "route": "diy", "tid": 233, "ps": 15, "rps": 10, "viewHotTag": true, "desc": "炫酷技能，极客文化，硬核技巧，准备好你的惊讶", "url": "#" }];
          break;
        case "生活":
          s[i].sub = [{ "name": "搞笑", "route": "funny", "tid": 138, "ps": 15, "rps": 10, "ad": { "active": true, "dataLocId": 273 }, "desc": "各种沙雕有趣的搞笑剪辑，挑战，表演，配音等视频", "url": "//www.bilibili.com/video/ent_funny_1.html", "locid": 4204, "recommendId": 4210, "slider": { "width": 620, "height": 220 }, "customComponent": { "name": "Energy", "leftId": 4212, "rightId": 4218, "rightType": "slide" } }, { "name": "家居房产", "route": "home", "tid": 239, "ps": 15, "rps": 10, "ad": { "active": true, "dataLocId": 275 }, "desc": "与买房、装修、居家生活相关的分享", "url": "#" }, { "name": "手工", "route": "handmake", "tid": 161, "ps": 15, "rps": 10, "desc": "手工制品的制作过程或成品展示、教程、测评类视频", "url": "//www.bilibili.com/video/ent-handmake-1.html" }, { "name": "绘画", "route": "painting", "tid": 162, "ps": 15, "rps": 10, "desc": "绘画过程或绘画教程，以及绘画相关的所有视频", "url": "//www.bilibili.com/video/ent-painting-1.html" }, { "name": "日常", "route": "daily", "tid": 21, "ps": 15, "rps": 10, "desc": "记录日常生活，分享生活故事", "url": "//www.bilibili.com/video/ent-life-1.html" }];
          break;
        case "鬼畜":
          s[i].sub = [{ "name": "鬼畜调教", "route": "guide", "tid": 22, "ps": 15, "rps": 10, "ad": { "active": true, "dataLocId": 285 }, "desc": "使用素材在音频、画面上做一定处理，达到与BGM一定的同步感", "url": "//www.bilibili.com/video/ent-Kichiku-1.html" }, { "name": "音MAD", "route": "mad", "tid": 26, "ps": 15, "rps": 10, "ad": { "active": true, "dataLocId": 287 }, "desc": "使用素材音频进行一定的二次创作来达到还原原曲的非商业性质稿件", "url": "//www.bilibili.com/video/douga-kichiku-1.html" }, { "name": "人力VOCALOID", "route": "manual_vocaloid", "tid": 126, "ps": 15, "rps": 10, "desc": "将人物或者角色的无伴奏素材进行人工调音，使其就像VOCALOID一样歌唱的技术", "url": "//www.bilibili.com/video/kichiku-manual_vocaloid-1.html" }, { "name": "鬼畜剧场", "route": "theatre", "tid": 216, "ps": 15, "rps": 10, "desc": "使用素材进行人工剪辑编排的有剧情的作品" }, { "name": "教程演示", "route": "course", "tid": 127, "ps": 10, "rps": 6, "rightComponent": { "name": "CmImgList", "id": 148 }, "ad": { "active": true, "dataLocId": 289 }, "hideDropdown": false, "desc": "鬼畜相关的教程演示", "url": "//www.bilibili.com/video/kichiku-course-1.html" }];
          break;
        case "时尚":
          s[i].sub = [{ "name": "美妆护肤", "route": "makeup", "tid": 157, "ps": 15, "rps": 10, "ad": { "active": true, "dataLocId": 279 }, "desc": "彩妆护肤、美甲美发、仿妆、医美相关内容分享或产品测评", "url": "//www.bilibili.com/video/fashion-makeup-fitness-1.html" }, { "name": "穿搭", "route": "clothing", "tid": 158, "ps": 15, "rps": 10, "ad": { "active": true, "dataLocId": 281 }, "desc": "穿搭风格、穿搭技巧的展示分享，涵盖衣服、鞋靴、箱包配件、配饰（帽子、钟表、珠宝首饰）等", "url": "//www.bilibili.com/video/fashion-clothing-1.html" }, { "name": "时尚潮流", "route": "trend", "tid": 159, "ps": 15, "rps": 10, "desc": "时尚街拍、时装周、时尚大片，时尚品牌、潮流等行业相关记录及知识科普", "url": "#" }];
          break;
        case "广告":
          s[i].name = "资讯";
          s[i].route = "information";
          s[i].tid = 202;
          s[i].sub = [{ "name": "热点", "route": "hotspot", "tid": 203, "ps": 18, "rps": 10, "desc": "全民关注的时政热门资讯" }, { "name": "环球", "route": "global", "tid": 204, "ps": 18, "rps": 10, "desc": "全球范围内发生的具有重大影响力的事件动态" }, { "name": "社会", "route": "social", "tid": 205, "ps": 18, "rps": 10, "desc": "日常生活的社会事件、社会问题、社会风貌的报道" }, { "name": "综合", "route": "multiple", "tid": 206, "ps": 18, "rps": 10, "desc": "除上述领域外其它垂直领域的综合资讯" }];
          break;
        case "娱乐":
          s[i].sub = [{ "name": "综艺", "route": "variety", "tid": 71, "ps": 15, "rps": 10, "ad": { "active": true, "dataLocId": 267 }, "desc": "所有综艺相关，全部一手掌握！", "url": "//www.bilibili.com/video/ent-variety-1.html" }, { "name": "娱乐杂谈", "route": "talker", "tid": 241, "ps": 15, "rps": 10, "ad": { "active": true, "dataLocId": 269 }, "desc": "娱乐人物解读、娱乐热点点评、娱乐行业分析" }, { "name": "粉丝创作", "route": "fans", "tid": 242, "ps": 15, "rps": 10, "desc": "粉丝向创作视频" }, { "name": "明星综合", "route": "celebrity", "tid": 137, "ps": 15, "rps": 10, "desc": "娱乐圈动态、明星资讯相关" }];
          break;
      }
    });
  });
  jsonphookasync("api.bilibili.com/plaza/banner", () => true, async () => {
    return { "code": 0, "result": [{ "link": "https://www.bilibili.com/blackboard/x/act_list", "end": 1640966407, "begin": 1456709887, "title": "bilibili 活动", "cover": "http://i0.hdslb.com/bfs/square/6830d0e479eee8cc9a42c3e375ca99a5147390cd.jpg", "id": 9, "created_ts": 1491386053 }, { "link": "http://www.bilibili.com/blackboard/topic_list.html", "end": 1640966418, "begin": 1544258598, "title": "话题列表", "cover": "http://i0.hdslb.com/bfs/square/b1b00a0c3ce8570b48277ae07a2e55603a4a4ddf.jpg", "id": 17, "created_ts": 1491386030 }] };
  }, false);
  jsonphookasync("api.bilibili.com/x/web-interface/index/icon", void 0, async () => {
    const data = await fetch("https://www.bilibili.com/index/index-icon.json").then((d) => d.json());
    return {
      code: 0,
      data: subArray(data.fix),
      message: "0",
      ttl: 1
    };
  }, false);
};
var banner = () => {
  document.head.appendChild(createElements(htmlVnode(animated_banner_default)));
  class Animate {
    static once = false;
    static record = {};
    static rid = this.resourceId();
    static locs = [1576, 1612, 1580, 1920, 1584, 1588, 1592, 3129, 1600, 1608, 1604, 1596, 2210, 1634, 142];
    animatedBannerSupport = typeof CSS !== "undefined" && CSS.supports && CSS.supports("filter: blur(1px)") && !/^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    layerConfig = {};
    resources = [];
    entered = false;
    extensions = [];
    handleMouseLeave = void 0;
    handleMouseMove = void 0;
    handleResize = void 0;
    constructor(v) {
      if (this.animatedBannerSupport)
        this.mounted(v);
      if (v.is_split_layer !== 0) {
        addCss(".blur-bg {display:none}");
      } else
        addCss(".blur-bg {background:none !important;-webkit-backdrop-filter: blur(4px);backdrop-filter: blur(4px)}");
    }
    static resourceId() {
      if (location.href.includes("v/douga"))
        return 1576;
      if (location.href.includes("/anime"))
        return 1612;
      if (location.href.includes("v/music"))
        return 1580;
      if (location.href.includes("/guochuang"))
        return 1920;
      if (location.href.includes("v/dance"))
        return 1584;
      if (location.href.includes("v/game"))
        return 1588;
      if (location.href.includes("v/knowledge"))
        return 1592;
      if (location.href.includes("v/tech"))
        return 3129;
      if (location.href.includes("v/life"))
        return 1600;
      if (location.href.includes("v/kichiku"))
        return 1608;
      if (location.href.includes("v/fashion"))
        return 1604;
      if (location.href.includes("v/ent"))
        return 1596;
      if (location.href.includes("v/cinephile"))
        return 2210;
      if (location.href.includes("/cinema"))
        return 1634;
      return 142;
    }
    async mounted(v) {
      this.layerConfig = JSON.parse(v.split_layer);
      if (!this.layerConfig.layers)
        return;
      try {
        if ("extensions" in this.layerConfig && "time" in this.layerConfig.extensions) {
          let time = void 0, now = (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1e3;
          let timeCode = Object.keys(this.layerConfig.extensions.time).sort((a, b) => parseInt(a) - parseInt(b));
          for (let t of timeCode) {
            if (parseInt(t) < now)
              time = parseInt(t);
            else
              break;
          }
          let timelayers = this.layerConfig.extensions.time[time];
          this.layerConfig.layers = timelayers[Math.floor(Math.random() * timelayers.length)].layers;
        }
        await Promise.all(this.layerConfig.layers.map(async (v2, index) => {
          return Promise.all(v2.resources.map(async (i) => {
            if (/\\.(webm|mp4)\$/.test(i.src)) {
              const res = await fetch(i.src).then((d) => d.blob());
              const url = URL.createObjectURL(res);
              const video = document.createElement("video");
              video.muted = true;
              video.loop = true;
              video.src = url;
              video.playsInline = true;
              video.style.objectFit = "cover";
              this.resources[index] = video;
              video.width = 0;
              video.height = 0;
              document.body.appendChild(video);
              await new Promise((resolve) => {
                const onMetaLoad = () => {
                  resolve(true);
                  video.removeEventListener("loadedmetadata", onMetaLoad);
                };
                video.addEventListener("loadedmetadata", onMetaLoad);
              });
            } else {
              const img = document.createElement("img");
              img.src = i.src;
              await new Promise((resolve) => img.onload = resolve);
              this.resources[index] = img;
            }
          }));
        }));
      } catch (e) {
        debug.error("load animated banner images error", e);
        return;
      }
      let container = document.querySelector("#banner_link");
      if (!container) {
        container = document.querySelector(".h-center");
        if (!container)
          return this.resources.forEach((d) => d.remove());
        container.parentElement.removeAttribute("style");
        container.style.width = "100%";
        container.style.top = "-42px";
        container.style.marginBottom = "-42px";
        container.innerHTML = "";
        document.querySelector(".b-header-mask-wrp")?.remove();
      }
      ;
      container.classList.add("animated-banner");
      let containerHeight = container.clientHeight;
      let containerWidth = container.clientWidth;
      let containerScale = 180 / 155;
      this.layerConfig.layers.forEach((v2) => {
        v2._initState = {
          scale: 1,
          rotate: v2.rotate?.initial || 0,
          translate: v2.translate?.initial || [0, 0],
          blur: v2.blur?.initial || 0,
          opacity: v2.opacity?.initial === void 0 ? 1 : v2.opacity.initial
        };
        v2.resources.forEach((i, index) => {
          const el = this.resources[index];
          if (el.tagName === "VIDEO") {
            if (el.parentNode) {
              el.parentNode.removeChild(el);
            }
            el.dataset.height = el.videoHeight;
            el.dataset.width = el.videoWidth;
          } else {
            el.dataset.height = el.naturalHeight;
            el.dataset.width = el.naturalWidth;
          }
          const initial = v2.scale?.initial === void 0 ? 1 : v2.scale?.initial;
          el.height = el.dataset.height * containerScale * initial;
          el.width = el.dataset.width * containerScale * initial;
        });
      });
      const layers = this.layerConfig.layers.map((v2) => {
        const layer = document.createElement("div");
        layer.classList.add("layer");
        container.appendChild(layer);
        return layer;
      });
      let displace = 0;
      let enterX = 0;
      let raf = 0;
      const curveParameterToFunc = (param2) => {
        const o = bezier(...param2);
        return (v2) => v2 > 0 ? o(v2) : -o(-v2);
      };
      let lastDisplace = NaN;
      const af = (t) => {
        try {
          if (lastDisplace === displace) {
            return;
          }
          lastDisplace = displace;
          layers.map((layer, i) => {
            const v2 = this.layerConfig.layers[i];
            const a = layer.firstChild;
            if (!a) {
              return;
            }
            const transform = {
              scale: v2._initState.scale,
              rotate: v2._initState.rotate,
              translate: v2._initState.translate
            };
            if (v2.scale) {
              const x = v2.scale.offset || 0;
              const itp = v2.scale.offsetCurve ? curveParameterToFunc(v2.scale.offsetCurve) : (x2) => x2;
              const offset = x * itp(displace);
              transform.scale = v2._initState.scale + offset;
            }
            if (v2.rotate) {
              const x = v2.rotate.offset || 0;
              const itp = v2.rotate.offsetCurve ? curveParameterToFunc(v2.rotate.offsetCurve) : (x2) => x2;
              const offset = x * itp(displace);
              transform.rotate = v2._initState.rotate + offset;
            }
            if (v2.translate) {
              const x = v2.translate.offset || [0, 0];
              const itp = v2.translate.offsetCurve ? curveParameterToFunc(v2.translate.offsetCurve) : (x2) => x2;
              const offset = x.map((v3) => itp(displace) * v3);
              const translate = v2._initState.translate.map((x2, i2) => (x2 + offset[i2]) * containerScale * (v2.scale?.initial || 1));
              transform.translate = translate;
            }
            a.style.transform = \`scale(\${transform.scale})translate(\${transform.translate[0]}px, \${transform.translate[1]}px)rotate(\${transform.rotate}deg)\`;
            if (v2.blur) {
              const x = v2.blur.offset || 0;
              const itp = v2.blur.offsetCurve ? curveParameterToFunc(v2.blur.offsetCurve) : (x2) => x2;
              const blurOffset = x * itp(displace);
              let res = 0;
              if (!v2.blur.wrap || v2.blur.wrap === "clamp") {
                res = Math.max(0, v2._initState.blur + blurOffset);
              } else if (v2.blur.wrap === "alternate") {
                res = Math.abs(v2._initState.blur + blurOffset);
              }
              a.style.filter = res < 1e-4 ? "" : \`blur(\${res}px)\`;
            }
            if (v2.opacity) {
              const x = v2.opacity.offset || 0;
              const itp = v2.opacity.offsetCurve ? curveParameterToFunc(v2.opacity.offsetCurve) : (x2) => x2;
              const opacityOffset = x * itp(displace);
              const initial = v2._initState.opacity;
              if (!v2.opacity.wrap || v2.opacity.wrap === "clamp") {
                a.style.opacity = Math.max(0, Math.min(1, initial + opacityOffset));
              } else if (v2.opacity.wrap === "alternate") {
                const x2 = initial + opacityOffset;
                let y = Math.abs(x2 % 1);
                if (Math.abs(x2 % 2) >= 1) {
                  y = 1 - y;
                }
                a.style.opacity = y;
              }
            }
          });
        } catch (e) {
          debug.error(e);
        }
      };
      this.layerConfig.layers.map((v2, i) => {
        const a = this.resources[i];
        layers[i].appendChild(a);
        if (a.tagName === "VIDEO") {
          a.play();
        }
        requestAnimationFrame(af);
      });
      const handleLeave = () => {
        const now = performance.now();
        const timeout = 200;
        const tempDisplace = displace;
        cancelAnimationFrame(raf);
        const leaveAF = (t) => {
          if (t - now < timeout) {
            displace = tempDisplace * (1 - (t - now) / 200);
            af(t);
            requestAnimationFrame(leaveAF);
          } else {
            displace = 0;
            af(t);
          }
        };
        raf = requestAnimationFrame(leaveAF);
      };
      this.handleMouseLeave = (e) => {
        this.entered = false;
        handleLeave();
      };
      this.handleMouseMove = (e) => {
        const offsetY = document.documentElement.scrollTop + e.clientY;
        if (offsetY < containerHeight) {
          if (!this.entered) {
            this.entered = true;
            enterX = e.clientX;
          }
          displace = (e.clientX - enterX) / containerWidth;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(af);
        } else {
          if (this.entered) {
            this.entered = false;
            handleLeave();
          }
        }
        this.extensions.map((v2) => v2.handleMouseMove?.({ e, displace }));
      };
      this.handleResize = (e) => {
        containerHeight = container.clientHeight;
        containerWidth = container.clientWidth;
        containerScale = 180 / 155;
        this.layerConfig.layers.forEach((lc) => {
          lc.resources.forEach((d, i) => {
            const el = this.resources[i];
            el.height = el.dataset.height * containerScale * (lc.scale?.initial || 1);
            el.width = el.dataset.width * containerScale * (lc.scale?.initial || 1);
          });
        });
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame((t) => {
          af(t);
        });
        this.extensions.map((v2) => v2.handleResize?.(e));
      };
      document.addEventListener("mouseleave", this.handleMouseLeave);
      window.addEventListener("mousemove", this.handleMouseMove);
      window.addEventListener("resize", this.handleResize);
    }
  }
  jsonphookasync("api.bilibili.com/x/web-show/res/loc", void 0, async (url) => {
    const obj = new URL(url);
    obj.searchParams.delete("callback");
    let loc = Animate.record[url];
    let header2 = Animate.record[Animate.rid];
    let rqs;
    if (!loc || !header2) {
      rqs = await Promise.all([
        fetch(obj.toJSON()).then((d) => d.json()),
        fetch(\`https://api.bilibili.com/x/web-show/page/header?resource_id=\${Animate.rid}\`).then((d) => d.json())
      ]);
      loc = Animate.record[url] = rqs[0];
      header2 = Animate.record[Animate.rid] = rqs[1];
    }
    loc.data && Animate.locs.forEach((d) => {
      loc.data[d] && (loc.data[d][0].pic = header2 && header2.data.pic || "//i0.hdslb.com/bfs/activity-plat/static/20171220/68a052f664e8414bb594f9b00b176599/images/90w1lpp6ry.png", loc.data[d][0].litpic = header2 && header2.data.litpic, loc.data[d][0].url = header2 && header2.data.url || "", loc.data[d][0].title = header2 && header2.data.name || "");
      if (url.includes("loc?") && obj.searchParams.get("id") == String(d)) {
        loc.data[0].pic = header2 && header2.data.pic || "//i0.hdslb.com/bfs/activity-plat/static/20171220/68a052f664e8414bb594f9b00b176599/images/90w1lpp6ry.png";
        loc.data[0].litpic = header2 && header2.data.litpic || "";
        loc.data[0].url = header2 && header2.data.url || "";
        loc.data[0].title = header2 && header2.data.name || "";
      }
    });
    setting.animatedBanner && !Animate.once && (Animate.once = true, setTimeout(() => new Animate(header2.data)));
    return loc;
  }, false);
};

// src/content/av/load_by_dm_id.ts
function loadByDmId() {
  const dmid = urlObj(location.href).dmid;
  let progress = Number(urlObj(location.href).dm_progress);
  let first = 0;
  switchVideo(async () => {
    if (!window.player?.seek) {
      await new Promise((r) => {
        doWhile(() => window.player?.seek, r);
      });
    }
    if (first)
      return;
    first++;
    if (progress)
      return window.player.seek(progress);
    if (dmid) {
      progress = await xhr({
        url: \`https://api.bilibili.com/x/v2/dm/thumbup/detail?oid=\${API.cid}&dmid=\${dmid}\`,
        credentials: true
      }, true);
      progress = jsonCheck(progress).data.progress;
      progress && window.player.seek(progress / 1e3 - 0.2);
    }
  });
}

// src/runtime/url_clean.ts
var paramsSet = /* @__PURE__ */ new Set([
  "spm_id_from",
  "from_source",
  "msource",
  "bsource",
  "seid",
  "source",
  "session_id",
  "visit_id",
  "sourceFrom",
  "from_spmid",
  "share_source",
  "share_medium",
  "share_plat",
  "share_session_id",
  "share_tag",
  "unique_k",
  "vd_source",
  "csource"
]);
var paramArr = Object.entries({
  from: ["search"]
});
function replaceUrl(url) {
  window.history.replaceState(window.history.state, "", url);
}
function urlClean(str) {
  const base = str.split("#")[0].split("?")[0];
  const url = new URLEs(str);
  if (url) {
    const params = url.searchParams;
    if (params.has("bvid")) {
      params.set("aid", abv(params.get("bvid")));
      params.delete("bvid");
    }
    if (params.has("aid") && !Number(params.get("aid"))) {
      params.set("aid", abv(params.get("aid")));
    }
    paramsSet.forEach((d) => {
      params.delete(d);
    });
    paramArr.forEach((d) => {
      if (params.has(d[0])) {
        if (d[1].includes(params.get(d[0]))) {
          params.delete(d[0]);
        }
      }
    });
    return (base + url.search + url.hash).replace(/[bB][vV]1[fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF]{9}/g, (s) => "av" + abv(s));
  } else
    return str;
}
function anchorClean(list) {
  list.forEach((d) => {
    if (!d.href)
      return;
    d.href = urlClean(d.href);
  });
}
function AnchorClick(e) {
  var f = e.target;
  for (; f && "A" !== f.tagName; ) {
    f = f.parentNode;
  }
  if ("A" !== (null == f ? void 0 : f.tagName)) {
    return;
  }
  anchorClean([f]);
}
window.navigation?.addEventListener("navigate", (e) => {
  const newURL = urlClean(e.destination.url);
  if (e.destination.url != newURL) {
    e.preventDefault();
    if (newURL == window.location.href)
      return;
    window.history.replaceState(window.history.state, "", newURL);
  }
});
window.addEventListener("click", AnchorClick, false);
window.addEventListener("contextmenu", AnchorClick, false);
document.addEventListener("DOMContentLoaded", () => anchorClean(document.querySelectorAll("a")));

// src/runtime/variable/path.ts
var path = location.href.split("/");

// src/content/dynamic.ts
function dynamicPage() {
  xhrhook("api.bilibili.com/x/polymer/web-dynamic/v1/feed/all", void 0, (r) => {
    try {
      const response = jsonCheck(r.response);
      response.data.items = response.data.items.filter((d) => d.modules?.module_dynamic?.major?.archive?.badge?.text != "直播回放");
      r.responseType === "json" ? r.response = response : r.response = r.responseText = JSON.stringify(response);
    } catch (e) {
    }
  }, false);
}

// src/content/history.ts
function historyPage() {
  setting.history && xhrhook(["api.bilibili.com/x/web-interface/history/cursor", "business"], function(args) {
    let obj = new URL(args[1]), max = obj.searchParams.get("max") || "", view_at = obj.searchParams.get("view_at") || "";
    args[1] = objUrl("//api.bilibili.com/x/web-interface/history/cursor", { max, view_at, type: "archive", ps: "20" });
  }, void 0, false);
  setting.searchHistory && doWhile(() => document.querySelector(".b-head-search"), () => document.querySelector(".b-head-search")?.remove());
}

// src/content/index/timeline.ts
var inline = [];
function getDate(ctx) {
  let result = "";
  ctx.replace(/\\d{2}:\\d{2}/, (d) => result = d);
  return result;
}
function decodeInline(title, item) {
  let i = 0;
  switch (title) {
    case "周一":
      i = 1;
      break;
    case "周二":
      i = 2;
      break;
    case "周三":
      i = 3;
      break;
    case "周四":
      i = 4;
      break;
    case "周五":
      i = 5;
      break;
    case "周六":
      i = 6;
      break;
    case "周日":
      i = 7;
      break;
  }
  inline[i] || (inline[i] = {});
  item.forEach((d) => {
    let time = getDate(d.content);
    if (time) {
      inline[i][time] || (inline[i][time] = []);
      inline[i][time].push({
        cover: "",
        delay: 0,
        delay_id: 0,
        delay_index: "",
        delay_reason: "",
        ep_cover: "",
        episode_id: -1,
        follows: d.positions.position3,
        plays: d.positions.position2,
        pub_index: d.positions.position4,
        pub_time: time,
        pub_ts: -1,
        published: 1,
        season_id: d.item_id,
        square_cover: d.image,
        title: d.title
      });
    }
  });
}
var timeline = () => {
  doWhile(() => document.querySelector("#bili_bangumi > .bangumi-module")?.__vue__ || window?.__INITIAL_STATE__, async (d) => {
    try {
      const index = await urlPack.getJson("app.bilibili.com/x/v2/activity/index", { page_id: 167998 });
      const item = index.data.cards[0].item[0].item;
      await Promise.all(item.reduce((s, d2) => {
        s.push(urlPack.getJson("app.bilibili.com/x/v2/activity/inline", { page_id: d2.item_id }).then((t) => {
          const item2 = t.data.cards[0].item;
          decodeInline(d2.title, item2);
        }));
        return s;
      }, []));
      const source = JSON.parse(JSON.stringify(d.timeline || d.timingData));
      source.forEach((d2) => {
        const i = d2.day_of_week;
        Object.entries(inline[i]).forEach((t) => {
          if (d2.episodes) {
            d2.episodes.push(...t[1]);
          } else {
            d2.seasonMap[t[0]] || (d2.seasonMap[t[0]] = []);
            d2.seasonMap[t[0]].push(...t[1]);
          }
        });
      });
      d.timeline ? d.timeline = source : d.timingData = source;
    } catch (e) {
      debug.error("获取港澳台番剧时间线出错 ಥ_ಥ");
      toast.error("港澳台番剧时间线", e);
    }
  });
};

// src/content/live/sleep_check.ts
function sleepCheck() {
  const fun = setInterval;
  let flag = 0;
  window.setInterval = (...args) => {
    if (args[1] && args[1] == 3e5 && args[0] && args[0].toString() == "function(){e.triggerSleepCallback()}") {
      if (!flag) {
        toast.warning("成功阻止直播间挂机检测！");
        flag++;
      }
      return Number.MIN_VALUE;
    }
    return fun.call(window, ...args);
  };
}

// src/content/live/live.ts
function livePage() {
  setting.sleepCheck && sleepCheck();
  doWhile(() => document.querySelector(".web-player-icon-roomStatus"), (d) => d.remove());
}

// src/content/log_report.ts
function blockReport() {
  Object.defineProperty(window, "reportObserver", {
    get: () => new Proxy(() => true, { get: (t, p, r) => r }),
    set: () => true,
    configurable: true
  });
  Object.defineProperty(window, "rec_rp", {
    get: () => new Proxy(() => true, { get: (t, p, r) => r }),
    set: () => true,
    configurable: true
  });
  Object.defineProperty(window, "reportMsgObj", {
    get: () => new Proxy(() => true, { get: (t, p, r) => r }),
    set: () => true,
    configurable: true
  });
}

// src/content/media.ts
function mediaPage() {
  xhrhook("user/status", void 0, (res) => {
    try {
      const result = jsonCheck(res.response);
      result.result.area_limit = 0;
      result.result.ban_area_show = 0;
      res.responseType === "json" ? res.response = result : res.response = res.responseText = JSON.stringify(result);
    } catch (e) {
    }
  }, false);
}

// src/content/message/message.css
var _default5 = {};

// src/content/message/message.ts
function messagePage() {
  addCss(_default5);
}

// src/content/player/bnj.css
var _default6 = {};

// src/content/player/bnj.ts
function bnj() {
  addCss(_default6);
  window.bnj = false;
  const arr2 = [];
  doWhile(() => window.__INITIAL_STATE__, () => {
    const node2 = document.querySelector("#bilibili-player").parentElement;
    const root3 = node2.attachShadow({ mode: "closed" });
    const iframe = document.createElement("iframe");
    iframe.src = \`https://www.bilibili.com/blackboard/html5player.html?aid=\${window.__INITIAL_STATE__.videoInfo.aid}&cid=\${window.__INITIAL_STATE__.videoInfo.cid}&enable_ssl=1&crossDomain=1&as_wide=1&bnj=1\`;
    iframe.setAttribute("style", "width: 906px; height: 556px;border:none;");
    root3.appendChild(iframe);
  });
  Object.defineProperty(window, "EmbedPlayer", {
    configurable: true,
    set: (v) => {
      if (!window.bnj) {
        arr2.unshift(v);
      }
    },
    get: () => {
      if (window.bnj) {
        Object.defineProperty(window, "EmbedPlayer", { configurable: true, value: arr2[0] });
        return arr2[0];
      } else {
        return function() {
          setTimeout(() => window.EmbedPlayer(...arguments), 100);
        };
      }
    }
  });
}

// src/content/avatar_animation.css
var _default7 = {};

// src/content/section.ts
async function header(menu = false) {
  if (menu) {
    primaryMenu();
    banner();
  }
  if (window.loginInfoCallbacks && window.onLoginInfoLoaded) {
    let fun = window.onLoginInfoLoaded;
    Object.defineProperty(window, "onLoginInfoLoaded", {
      configurable: true,
      get: () => fun,
      set: (t) => {
        fun = t;
        window.loginInfoCallbacks.forEach((d) => {
          fun(...d);
        });
      }
    });
  }
  if (!window.jQuery)
    await loadScript("//static.hdslb.com/js/jquery.min.js");
  loadScript("//s1.hdslb.com/bfs/seed/jinkela/header/header.js");
}
async function footer() {
  if (!window.jQuery)
    await loadScript("//static.hdslb.com/js/jquery.min.js");
  loadScript("//static.hdslb.com/common/js/footer.js");
}
function styleClear() {
  const d = document.styleSheets;
  for (let i = 0; i < d.length; i++) {
    (d[i].href?.includes("laputa-footer") || d[i].href?.includes("laputa-header")) && (d[i].disabled = true);
  }
}
function replaceHeader(t) {
  let menu = false;
  if (document.querySelector(".mini-type") || /festival/.test(location.href)) {
    menu = false;
  }
  if (location.href.includes("blackboard/topic_list") || location.href.includes("blackboard/x/act_list") || document.querySelector(".large-header") || document.querySelector(".bili-banner") || t.getAttribute("type") == "all") {
    menu = true;
  }
  if (t.parentElement?.id === "app") {
    addElement("div", { class: \`z-top-container\${menu ? " has-menu" : ""}\` }, void 0, void 0, true);
    t.setAttribute("hidden", "hidden");
  } else {
    t.setAttribute("class", \`z-top-container\${menu ? " has-menu" : ""}\`);
    t.removeAttribute("id");
  }
  debug(t);
  header(menu);
  styleClear();
}
function section() {
  addCss(".nav-item.live {width: auto;}.lt-row {display: none !important;}");
  doWhile(() => document.querySelector("#internationalHeader"), replaceHeader);
  doWhile(() => document.querySelector("#biliMainHeader"), replaceHeader);
  doWhile(() => document.querySelector(".z-top-container"), replaceHeader);
  doWhile(() => document.querySelector(".z_top_container"), (t) => {
    t.setAttribute("class", "z-top-container has-menu");
    document.querySelector(".header")?.remove();
    header(true);
  });
  doWhile(() => document.querySelector(".international-footer") || document.querySelector("#biliMainFooter"), (t) => {
    t.setAttribute("class", "footer bili-footer report-wrap-module");
    t.setAttribute("id", "home_footer");
    footer();
    styleClear();
  });
  doWhile(() => document.querySelector("#bili-header-m"), () => {
    addCss(_default7);
  });
  doWhile(() => document.body && document.body.classList.contains("header-v3") || document.querySelector("#bili-header-container"), () => {
    document.body.classList.remove("header-v3");
    header(true);
  });
}

// src/content/space/album.ts
function album() {
  xhrhook("api.bilibili.com/x/dynamic/feed/draw/doc_list", void 0, (obj) => {
    const response = JSON.parse(obj.responseText);
    let data = response.data.items.reduce((s, d) => {
      s.push(d.doc_id);
      return s;
    }, []);
    setTimeout(() => {
      document.querySelectorAll(".album-card").forEach((d, i) => {
        d.firstChild.href = \`//h.bilibili.com/\${data[i]}\`;
        d.children[1].href = \`//h.bilibili.com/\${data[i]}\`;
      });
    }, 1e3);
  }, false);
  xhrhook("api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/get_dynamic_detail", void 0, (res) => {
    const result = res.responseType === "json" ? res.response : JSON.parse(res.response);
    if (result.code === 0) {
      if (result.data?.card?.desc?.type === 2)
        location.replace(\`https://h.bilibili.com/\${result.data.card.desc.rid_str}\`);
    }
  }, false);
}

// src/content/space/jointime.ts
function jointime(mid) {
  doWhile(() => document.querySelector(".section.user-info"), (t) => {
    (GM_xmlhttpRequest ? GM.xhr({ url: \`https://account.bilibili.com/api/member/getCardByMid"?mid=\${mid}\` }) : GM.xmlHttpRequest(\`https://account.bilibili.com/api/member/getCardByMid"?mid=\${mid}\`)).then((d) => {
      const data = jsonCheck(d);
      const jointime2 = timeFormat(data.card.regtime * 1e3, true);
      const node2 = t.lastChild;
      node2.appendChild(createElement({
        tagName: "div",
        props: { class: "info-regtime", style: "display: inline-block;word-break: break-all;" },
        children: [
          {
            tagName: "span",
            props: { class: "info-command", style: "display: inline-block;font-size: 12px;font-family: Microsoft YaHei;line-height: 16px;color: #9499a0;margin-right: 16px;" },
            children: [
              {
                tagName: "text",
                text: "注册"
              }
            ]
          },
          {
            tagName: "span",
            props: { class: "info-value", style: "color: #6d757a;font-family: Microsoft YaHei;font-size: 12px;line-height: 16px;padding-right: 15px;" },
            children: [
              {
                tagName: "text",
                text: jointime2
              }
            ]
          }
        ]
      }));
    });
  });
}

// src/content/space/lost_video.ts
async function getLostVideo(aid) {
  let result = [];
  try {
    let data = await (GM_xmlhttpRequest ? GM.xhr({ url: \`https://www.biliplus.com/video/av\${aid}\` }) : GM.xmlHttpRequest(\`https://www.biliplus.com/video/av\${aid}\`));
    if (data.match(/\\<title\\>.+?\\ \\-\\ AV/)) {
      result[0] = data.match(/\\<title\\>.+?\\ \\-\\ AV/)[0].replace(/<title>/, "").replace(/ - AV/, "");
      result[1] = data.match(/\\<img style=\\"display:none\\"\\ src=\\".+?\\"\\ alt/)[0].replace(/<img style="display:none" src="/, "").replace(/" alt/, "");
    }
  } catch (e) {
    debug.error("lostVideo.js", e);
  }
  if (!result[0] || !result[1]) {
    try {
      let data = await (GM_xmlhttpRequest ? GM.xhr({ url: \`https://www.biliplus.com/all/video/av\${aid}\` }) : GM.xmlHttpRequest(\`https://www.biliplus.com/all/video/av\${aid}/\`));
      if (data.match("/api/view_all?")) {
        data = data.match(/\\/api\\/view_all\\?.+?\\',cloudmoe/)[0].replace(/\\',cloudmoe/, "");
        data = await (GM_xmlhttpRequest ? GM.xhr({ url: \`//www.biliplus.com\${aid}\` }) : GM.xmlHttpRequest(\`//www.biliplus.com\${data}\`));
        data = jsonCheck(data).data;
        result[0] = result[0] || data.info.title;
        result[1] = result[1] || data.info.pic;
      }
    } catch (e) {
      debug.error("lostVideo.js", e);
    }
  }
  if (!result[0] || !result[1]) {
    try {
      let data = await (GM_xmlhttpRequest ? GM.xhr({ url: \`https://www.jijidown.com/video/\${aid}\` }) : GM.xmlHttpRequest(\`https://www.jijidown.com/video/\${aid}\`));
      if (data.match("window._INIT")) {
        result[0] = result[0] || data.match(/\\<title\\>.+?\\-哔哩哔哩唧唧/)[0].replace(/<title>/, "").replace(/-哔哩哔哩唧唧/, "");
        result[1] = result[1] || data.match(/\\"img\\":\\ \\".+?\\",/)[0].match(/http.+?\\",/)[0].replace(/",/, "");
      }
    } catch (e) {
      debug.error("lostVideo.js", e);
    }
  }
  result[0] = result[0] || \`av\${aid}\`;
  result[1] = result[1] ? result[1].replace("http:", "") : "//i0.hdslb.com/bfs/archive/be27fd62c99036dce67efface486fb0a88ffed06.jpg";
  return result;
}
function lostVideo() {
  observerAddedNodes((node2) => {
    if (/section channel guest/.test(node2.className)) {
      let items = node2.querySelectorAll(".small-item.disabled");
      items.forEach((d) => {
        let aid = d.getAttribute("data-aid");
        aid = Number(aid) || abv(aid);
        d.setAttribute("class", "small-item fakeDanmu-item");
        d.setAttribute("data-aid", aid);
        d.children[0].href = \`//www.bilibili.com/video/av\${aid}\`;
        d.children[1].href = \`//www.bilibili.com/video/av\${aid}\`;
        d.children[0].setAttribute("target", "_blank");
        d.children[1].setAttribute("target", "_blank");
        d.children[0].setAttribute("class", "cover cover-normal");
        d.children[1].setAttribute("style", "text-decoration : line-through;color : #ff0000;");
        getLostVideo(aid).then((data) => {
          d.children[1].setAttribute("title", data[0]);
          d.children[1].text = data[0];
          d.children[0].children[0].alt = data[0];
          d.children[0].children[0].src = data[1];
        });
      });
    }
    if (/small-item disabled/.test(node2.className)) {
      let aid = node2.getAttribute("data-aid");
      aid = Number(aid) || abv(aid);
      node2.setAttribute("class", "small-item fakeDanmu-item");
      node2.setAttribute("data-aid", aid);
      node2.children[0].href = \`//www.bilibili.com/video/av\${aid}\`;
      node2.children[1].href = \`//www.bilibili.com/video/av\${aid}\`;
      node2.children[0].setAttribute("target", "_blank");
      node2.children[1].setAttribute("target", "_blank");
      node2.children[0].setAttribute("class", "cover cover-normal");
      node2.children[1].setAttribute("style", "text-decoration : line-through;color : #ff0000;");
      getLostVideo(aid).then((data) => {
        node2.children[1].setAttribute("title", data[0]);
        node2.children[1].text = data[0];
        node2.children[0].children[0].alt = data[0];
        node2.children[0].children[0].src = data[1];
      });
    }
  });
}

// src/content/space/mid.json
var mid_default = {
  code: 0,
  data: {
    birthday: "1980-01-01",
    coins: 0,
    face: "http://i2.hdslb.com/bfs/face/9f10323503739e676857f06f5e4f5eb323e9f3f2.jpg",
    fans_badge: false,
    is_followed: true,
    jointime: 1436351229,
    level: 6,
    mid: 11783021,
    moral: 0,
    name: "哔哩哔哩番剧出差",
    official: {
      type: 1,
      desc: "哔哩哔哩番剧出差 官方账号"
    },
    pendant: {
      pid: 0,
      name: "",
      image: "",
      expire: 0
    },
    rank: "10000",
    sex: "保密",
    sign: "",
    silence: 0,
    sys_notice: {},
    theme: {},
    user_honour_info: {
      colour: null,
      mid: 0,
      tags: null
    },
    vip: {
      avatar_subscript: 1,
      avatar_subscript_url: "http://i0.hdslb.com/bfs/vip/icon_Certification_big_member_22_3x.png",
      due_date: 16557408e5,
      label: {
        bg_color: "#FB7299",
        bg_style: 1,
        border_color: "",
        label_theme: "annual_vip",
        path: "",
        text: "年度大会员",
        text_color: "#FFFFFF"
      },
      nickname_color: "#FB7299",
      role: 3,
      status: 1,
      theme_type: 0,
      type: 2,
      vip_pay_type: 1
    }
  },
  message: "0",
  ttl: 1
};

// src/content/space/midInfo.ts
function midInfo(mid) {
  mid_default.data.mid = mid;
  switch (Number(mid)) {
    case 11783021:
      mid_default.data.name = "哔哩哔哩番剧出差";
      mid_default.data.official.desc = "哔哩哔哩番剧出差 官方帐号";
      break;
    case 1988098633:
      mid_default.data.name = "b站_戲劇咖";
      mid_default.data.official.desc = "b站_戲劇咖 官方帐号";
      break;
    case 2042149112:
      mid_default.data.name = "b站_綜藝咖";
      mid_default.data.official.desc = "b站_綜藝咖 官方帐号";
      break;
  }
  xhrhook("api.bilibili.com/x/space/acc/info", void 0, (obj) => {
    if (obj.responseText && obj.responseText.includes("-404")) {
      obj.response = obj.responseText = JSON.stringify(mid_default);
      toast.warning("该用户被404，已使用缓存数据恢复访问！");
    }
  }, false);
}

// src/content/space/space.ts
function spacePage() {
  const path2 = location.href.split("/");
  const mid = Number(path2[3] && path2[3].split("?")[0]);
  (mid == 11783021 || mid == 1988098633 || mid == 2042149112) && midInfo(mid);
  setting.album && album();
  setting.jointime && jointime(mid);
  setting.lostVideo && lostVideo();
}

// src/content/web_rtc.ts
function disableWebRTC() {
  if (typeof navigator.getUserMedia !== "undefined")
    navigator.getUserMedia = void 0;
  if (typeof window.MediaStreamTrack !== "undefined")
    window.MediaStreamTrack = void 0;
  if (typeof window.RTCPeerConnection !== "undefined")
    window.RTCPeerConnection = void 0;
  if (typeof window.RTCSessionDescription !== "undefined")
    window.RTCSessionDescription = void 0;
  if (typeof navigator.mozGetUserMedia !== "undefined")
    navigator.mozGetUserMedia = void 0;
  if (typeof window.mozMediaStreamTrack !== "undefined")
    window.mozMediaStreamTrack = void 0;
  if (typeof window.mozRTCPeerConnection !== "undefined")
    window.mozRTCPeerConnection = void 0;
  if (typeof window.mozRTCSessionDescription !== "undefined")
    window.mozRTCSessionDescription = void 0;
  if (typeof navigator.webkitGetUserMedia !== "undefined")
    navigator.webkitGetUserMedia = void 0;
  if (typeof window.webkitMediaStreamTrack !== "undefined")
    window.webkitMediaStreamTrack = void 0;
  if (typeof window.webkitRTCPeerConnection !== "undefined")
    window.webkitRTCPeerConnection = void 0;
  if (typeof window.webkitRTCSessionDescription !== "undefined")
    window.webkitRTCSessionDescription = void 0;
}

// src/content/global.ts
function globalVector() {
  if (window.BILIOLD_GOLBAL)
    return;
  window.BILIOLD_GOLBAL = true;
  if (!sessionStorage2.getItem("rebuild")) {
    setting.section && section();
    setting.comment && loadComment();
  } else {
    addCss(_default7);
  }
  setting.logReport && blockReport();
  setting.player && /\\/festival\\//.test(location.href) && bnj();
  path[2] == "message.bilibili.com" && messagePage();
  setting.liveP2p && disableWebRTC();
  /live\\.bilibili\\.com/.test(location.href) && livePage();
  /space\\.bilibili\\.com/.test(location.href) && spacePage();
  path[2] == "t.bilibili.com" && setting.liveRecord && dynamicPage();
  location.href.includes("www.bilibili.com/account/history") && historyPage();
  /bangumi\\/media\\/md/.test(location.href) && mediaPage();
  setting.timeline && /anime\\/timeline/.test(location.href) && timeline();
  setting.album && /t.bilibili.com\\/\\d+/.test(location.href) && album();
  window.addEventListener("message", (ev) => {
    if (GM_getValue)
      return;
    if (typeof ev.data === "object") {
      switch (ev.data.\$type) {
        case "getPageInfo":
          window.postMessage({
            \$type: "pageInfoResponse",
            data: {
              aid: API.aid,
              cid: API.cid,
              pgc: API.pgc,
              cover: API.cover,
              title: API.title,
              playerParam: API.playerParam
            }
          });
          break;
        default:
      }
    }
  });
}

// src/content/av/keep_new.ts
function keepNewCheck() {
  const keepNew = sessionStorage.getItem("keepNew");
  const redirect = sessionStorage.getItem("redirect");
  if (keepNew) {
    toast.warning(keepNew);
    sessionStorage.removeItem("keepNew");
    globalVector();
    throw new Error("禁用旧版页面重构！");
  }
  if (redirect) {
    replaceUrl(redirect);
    sessionStorage.removeItem("redirect");
  }
}

// src/content/av/code.ts
function avPage() {
  keepNewCheck();
  sessionStorage2.setItem("rebuild", true);
  location.href.includes("/s/video") && replaceUrl(location.href.replace("/s/video", "/video"));
  const title = document.title;
  document.documentElement.replaceWith(createElements(htmlVnode(av_default)));
  title && !title.includes("404") && (document.title = title);
  loadVideoScript();
  loadComment();
  webpackhook(717, 274, (code) => code.replace("init:function(){", "init:function(){window.biliUIcomponents=this;").replace("this.getAdData()", "this.getAdData"));
  webpackhook(717, 251, (code) => code.replace("e[0].code", "e.code").replace("i[0].code", "i.code"));
  webpackhook(717, 660, (code) => code.replace('tag/"+t.info.tag_id+"/?pagetype=videopage', 'topic/"+t.info.tag_id+"/?pagetype=videopage'));
  webpackhook(717, 100, (code) => code.replace(/MenuConfig[\\S\\s]+?LiveMenuConfig/, \`MenuConfig=\${menu_config_default},e.LiveMenuConfig\`));
  webpackhook(717, 609, () => \`()=>{}\`);
  webpackhook(717, 2, (code) => code.replace("av\$1</a>')", \`av\$1</a>').replace(/(?!<a[^>]*>)cv([0-9]+)(?![^<]*<\\\\/a>)/ig, '<a href="//www.bilibili.com/read/cv\$1/" target="_blank" data-view="\$1">cv\$1</a>').replace(/(?!<a[^>]*>)(bv1)(\\\\w{9})(?![^<]*<\\\\/a>)/ig, '<a href="//www.bilibili.com/video/bv1\$2/" target="_blank">\$1\$2</a>')\`).replace("http://acg.tv/sm", "https://www.nicovideo.jp/watch/sm"));
  webpackhook(717, 286, (code) => code.replace('e("setVideoData",t)', \`e("setVideoData",t);\$("#bofqi").attr("id","__bofqi").html('<div class="bili-wrapper" id="bofqi"><div id="player_placeholder"></div></div>');new Function(t.embedPlayer)();\`));
  setting.automate.electric && jsonphookasync("api.bilibili.com/x/web-interface/elec/show", void 0, async () => {
    return { code: -404 };
  }, false);
  Object.defineProperty(window, "__INITIAL_STATE__", { configurable: true, value: void 0 });
  appendScripts(script_default);
  setting.enlike && new enLike();
  avLostCheck();
  primaryMenu();
  banner();
  loadByDmId();
  globalVector();
}

// src/content/index/ad_block.ts
function adblock(prev) {
  return prev.filter((d) => !d.is_ad);
}

// src/content/index/index.html
var index_default = '<!-- <!DOCTYPE html> -->\\r\\n<html lang="zh-CN">\\r\\n\\r\\n<head>\\r\\n    <meta charset="utf-8" />\\r\\n    <title>哔哩哔哩 (゜-゜)つロ 干杯~-bilibili</title>\\r\\n    <meta name="description" content="bilibili是国内知名的视频弹幕网站，这里有最及时的动漫新番，最棒的ACG氛围，最有创意的Up主。大家可以在这里找到许多欢乐。" />\\r\\n    <meta name="keywords"\\r\\n        content="Bilibili,哔哩哔哩,哔哩哔哩动画,哔哩哔哩弹幕网,弹幕视频,B站,弹幕,字幕,AMV,MAD,MTV,ANIME,动漫,动漫音乐,游戏,游戏解说,二次元,游戏视频,ACG,galgame,动画,番组,新番,初音,洛天依,vocaloid,日本动漫,国产动漫,手机游戏,网络游戏,电子竞技,ACG燃曲,ACG神曲,追新番,新番动漫,新番吐槽,巡音,镜音双子,千本樱,初音MIKU,舞蹈MMD,MIKUMIKUDANCE,洛天依原创曲,洛天依翻唱曲,洛天依投食歌,洛天依MMD,vocaloid家族,OST,BGM,动漫歌曲,日本动漫音乐,宫崎骏动漫音乐,动漫音乐推荐,燃系mad,治愈系mad,MAD MOVIE,MAD高燃" />\\r\\n    <meta name="renderer" content="webkit" />\\r\\n    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\\r\\n    <link rel="search" type="application/opensearchdescription+xml" href="//static.hdslb.com/opensearch.xml"\\r\\n        title="哔哩哔哩" />\\r\\n    <link rel="stylesheet"\\r\\n        href="//s1.hdslb.com/bfs/static/jinkela/home/css/home.0.4eadf4209b1762230047120e0a9945a9f3b56fd1.css" />\\r\\n    <style type="text/css">\\r\\n        /* 隐藏失效节点 */\\r\\n        #fixed_app_download,\\r\\n        #app>div.report-wrap-module.elevator-module>div.ver {\\r\\n            display: none;\\r\\n        }\\r\\n\\r\\n        /* 禁用失效节点 */\\r\\n        .bili-tab.rank-tab,\\r\\n        .bili-dropdown.rank-dropdown {\\r\\n            pointer-events: none;\\r\\n        }\\r\\n\\r\\n        /* 资讯区图标 */\\r\\n        .icon.icon_t.icon-news {\\r\\n            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA39pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplMzNhZmQ3OS04ZTViLWQ2NDItOTYxZi0yNDM2MGQyN2JhM2YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTFEMzQ4MEJBNUM1MTFFQ0FGQTk5NEVFMjgwODg3M0UiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTFEMzQ4MEFBNUM1MTFFQ0FGQTk5NEVFMjgwODg3M0UiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBiNzNlZjA5LTA1ZmEtNTM0MC1iMWY3LWE4MTljMjFhYmEzMiIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjI2MDJjOTk2LTBiNzQtZDQ0MC1hMzcxLTIxN2NkM2ZlOTgzMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsCIXZoAAAi+SURBVHja7Fh7TJvXFT+fwTa2MX5gXjZgg3kEJvICh6YELUujNKNb10ZpWFc17aapSxcpy1YlUjctUbt0L22VMm2NlkXLsqZJWdT0sWwlaZOmCwW1gfIMCSYYDOZhDH6ADdjGvvvOhc8YY8Bru61/9EhX97vnnnvv755z7znnfgwhBD7PxIPPOcWHNxiGWdSp0Wi2eX0+uSxJVuxyOaXIk8nkk1hj2+FwlHGyCoWiMbwfaXLCNRIEsAsFAufU9LSdLxL2jw4O21cCFGlRJpzBAUzTqnX2Qdtlti8/XFir04AqK58RieVgtxinPB6XyFBRRQf19nfDtH10Cr+Rj/XIuNvnnXQJuPFCqcznc0+YgyRoCQaD/ckq1d/HbLaLMQP0zPjmtCFN7Nq45csFzxz4IeTk6ilPJBGDLjMNJAmCmM0zMu4Ci2UEek09YBs0w+jENHR13aV9nS0fTHXe6hRpdbojPT13jy0HkDK44p72QmpKyncl8uQZEiOxY2j5JLT/0E9IfFx8EC0WDQ+WJRqUihNOVz++78nzZ14KafS/QWgJnF+eKCFypWI3Z+pIDS65xTweL7vSULLsxHE8Hj2rkRdq0Rzz/VzhLSOLIEsrtzIsCGXMbobH8DJzS8qjCuMygWAwpP7lKBhhpmAUWc46ZYZy7M+PGaAgMUkb3u7r7YWrV94Bv98PZL7d3NT0mZm6pGQdhLurFQF2dfaowt0C3anbDUODg9DR1hZq28ftnxlAbbaeWi0mgLV1danRHLZAKGQBtgPr+BbxUZM1587DG6+9Bk6nk7aNXV2078b196m2kdACttFRWr98+i+s3MeRniTf+uP90phMjOBUcskinkqlArVGAw0f1Id4uCCC1uXowOv1Qf2NOhAIBHDX2E03guAGzP1UDi3g9/lpvbGsFHL0uaF5sjQptD6Vti5rVYDD/b1aTnuRx3rt+nV0gZHhEdoetVpp7Z50g1AogPGxMdBkZdG612SiG0KQKKfLyQF1pgYK1hRCR3sHCPj80LzJiiQaYXDtVQFmZOeYlzsLKampdCEEGW56BF5RWQk7H6gCuVw+dxxYEPr8PJAmSeHjxibI0mZT+fLNm0EqlcL1a+99umxmzOmJKlxqWLhsOblzZmpraYU7nbfxJtI2mtzn9YImMxMy1GrKS2U3N2QZpGdwcnISfD7vkrndnqn1q2Yzx399lNrP7bCGeLl5emo6JLFEAl9/+KGF7288SM0pSUwEuUIx5zbWroXCoiLgs2bE71y9nsoioVbTM9JDm0NiN0PQcyRKxC2rAmx/Ypdff6IGPaiQu8cikZgWjtCMHOHCXypZHHWQJw7/ngeHNR6RSJqc8jJRjnx0E0t++iLN5UYtff+zhHTaQzM0MFRs88d0Bll1m+saO0KxcqWElgt/keyFWLy0L5IwFUOyDPQOxQQwL0/f8uGNSySWbJdzR5HshVi8tC+SME+E1VLs8HxQlZKyC3O0my13FuVuASyBIC3++TKL7SCbH9PyiVJC8s29TxPMP7lIEpkPxi9RqSD+OtavvPQ8FB0/DX0WKzVjUe1lGLm/FOKS9ayb8BE2ajAkTI+xPg7T/noOhqrKwK/eACn8IH0qZKepmtN+/ofJVW8xkulun51NWs/86W+XH12z5U0hBvPUty4A+f0JMmLez1j2PAYJXh89WbJpE1imJaAWutlavOwxQOKrsyGruR54hw5Pqxu3i7oOfh9uTCXTd4xtfPxfy20o6puELp4ovpoglVfI9v5CaPBPwQWlHWzt3dOHlEoRXoDkNDkok5SQmiRaERhH+B550GaFEkkCtHtm4HmvGhqMTeB4/1VjYpK02mG3t0SbZ5EGERSmPrOB2Xo2swZJaZXQVvxVeKf1FrQ+ooNS93HR2NlzYFLIiNXu8eFkMxNOAcbSCE8g4F5x4d/fySsW8N/4DbPjnBkc7nWgvP4q4FocuJhMLMsvLSDf/lGB3J9FknfeA/iasXS+jUGMTd5K4NK+FOAfe44Z7LopnHv7OsEx7hAqkuciCfsdmovlURlpkhy89WcFWa1+hkgVILS0Anm4wKerqBHAweonXd1N9yLQ3Fw9+pxjywJMksmewTRPf98jkC2eZHrYvIDPruv0Z8OfGzuhbE8pkOpfAsyOgKbQQGuINwC5+RGQzjvAFK8BYh0G3mM7WH76fH86ndv/8iWGbNDDW7e9MDNkhfUBEPBU2ZB7tgGCY/0FfQerC/q7m4yRABf5QVS1w3jzWt/hvdA/JaXgkGZScqCm9haAZhN0GPLh/vRiYDUYWpwxbAJIl8Hsm/+gIClx4Nj6e9u2B4/WnATeE3vhSkc3O5+Bzu1nlc0qYi6iDHd78Syu6Adp5qHJUPLj+V2p9z1O9C80BAsvuMiGdwkRP11L37F6vTaIfhJL+dbt5OBT3yL1b9cQ4h+ec2xsffujK5R39IXfEk4WC8qqD5wkca+4yKYmQgu2sQ/9bzQ/uARgWBb9KxyIE+y+PUF4R7qoQ0XHah60UnAcSORvrdpNN4BtVdE9RLn7Z7Qgf3jMSUFzfARWdtlMx+PYlR7uUQHiTyPUIg7efMJEJ0QNNgy4QxGgd8JPeRzhwqh13BD+aUDZHadM7sjIgWOY94gX50QLIWhUxnIajI92tfGPFv7g8bknoO1Zg1aUkS9k2DNy3LNHOPDQ16CYTbFOmueGbjn2Lq2dxXtg16MZ8M/f1bNuyQi1bR6oa3ZKjmaOwE4yAC5RHpjaP4REYwNk1Mv4cco0UJSpGUfzAzDx+nOHAsHAGXaaiys66mjZCqo/MOXfyG6nnHu/snnKVwRPXWKqDtwLF88PUzkEp01LBLPVTUHixcoR2on5SCVwfhJ9IveHayGxCFqSlcrzozbbqZh/v60YS1nAbpf3zj6TTZgvWBjb7Vs6FvuvnfwjvH74B0aZQv5sIBAwrfaP8FMDjIuLu6ooMGz7TxNT1hkb/bP+wtXkVgT4xT/qLwD+H+jfAgwAa4KbOGyf2aUAAAAASUVORK5CYII=);\\r\\n            background-position: unset;\\r\\n        }\\r\\n    </style>\\r\\n</head>\\r\\n\\r\\n<body>\\r\\n    <div id="home-app"></div>\\r\\n    <div id="app" data-server-rendered="true"></div>\\r\\n    <div class="footer bili-footer report-wrap-module"></div>\\r\\n</body>\\r\\n\\r\\n</html>';

// src/content/index/news.html
var news_default = '<div class="r-con">\\r\\n    <div class="r-con">\\r\\n        <header style="margin-bottom: 14px">\\r\\n            <h3 style="font-size: 18px;font-weight: 400;">资讯分区正式上线啦！</h3>\\r\\n        </header>\\r\\n        <div class="carousel-module">\\r\\n            <div class="panel"><a href="https://www.bilibili.com/v/information" target="_blank"><img\\r\\n                        src="//i0.hdslb.com/bfs/archive/0747d26dbbc3bbf087d47cff49e598a326b0030c.jpg@320w_330h_1c.webp"\\r\\n                        width="260" height="280" /></a></div>\\r\\n        </div>\\r\\n    </div>\\r\\n</div>';

// src/content/index/initial_state.ts
var __INITIAL_STATE__ = {
  locsData: {
    23: null,
    29: null,
    31: null,
    34: null,
    40: null,
    42: null,
    44: null,
    142: null
  },
  recommendData: null
};

// src/content/index/recommend_data.ts
async function recommendData(privateRecommend = false) {
  const d = await fetch("https://api.bilibili.com/x/web-interface/index/top/rcmd?fresh_type=3", {
    credentials: privateRecommend ? "include" : "omit"
  }).then((d2) => d2.json());
  d.data.item.forEach((d_1, i, s) => {
    s[i].author = d_1.owner.name;
    s[i].play = d_1.stat.view;
    s[i].aid = d_1.id;
  });
  return d.data.item;
}

// src/content/index/code.ts
function indexPage() {
  keepNewCheck();
  sessionStorage2.setItem("rebuild", true);
  document.documentElement.replaceWith(createElements(htmlVnode(index_default)));
  window.__INITIAL_STATE__ = __INITIAL_STATE__;
  appendScripts(\`
<script type="text/javascript" src="//static.hdslb.com/js/jquery.min.js"><\\/script>
<script type="text/javascript" src="//s1.hdslb.com/bfs/cm/st/bundle.js"><\\/script>
<script src="//s1.hdslb.com/bfs/static/jinkela/home/1.home.4eadf4209b1762230047120e0a9945a9f3b56fd1.js"><\\/script>
<script src="//s1.hdslb.com/bfs/static/jinkela/home/home.4eadf4209b1762230047120e0a9945a9f3b56fd1.js"><\\/script>
<script src="//static.hdslb.com/common/js/footer.js"><\\/script>
\`);
  fetch("https://api.bilibili.com/x/web-show/res/locs?pf=0&ids=4694,29,31,34,40,42,44").then((d) => d.text()).then((d) => {
    d = JSON.parse(d.replace(/[bB][vV]1[fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF]{9}/g, (s) => "av" + abv(s)));
    __INITIAL_STATE__.locsData[23] = adblock(d.data[4694]);
    __INITIAL_STATE__.locsData[29] = adblock(d.data[29]);
    __INITIAL_STATE__.locsData[31] = adblock(d.data[31]);
    __INITIAL_STATE__.locsData[34] = adblock(d.data[34]);
    __INITIAL_STATE__.locsData[40] = adblock(d.data[40]);
    __INITIAL_STATE__.locsData[42] = adblock(d.data[42]);
    __INITIAL_STATE__.locsData[44] = adblock(d.data[44]);
  }).catch((reason) => {
    debug.error("获取推荐数据失败 ಥ_ಥ", reason);
    toast.error("获取推荐数据失败 ಥ_ಥ");
  });
  recommendData(setting.privateRecommend).then((d) => {
    if (uid && setting.privateRecommend) {
      __INITIAL_STATE__.recommendData = d;
      doWhile(() => document.querySelector(".rec-btn.prev"), () => {
        addElement(
          "span",
          { class: "rec-btn prev" },
          void 0,
          "刷新",
          void 0,
          document.querySelector(".rec-btn.prev")
        ).addEventListener("click", () => {
          recommendData(setting.privateRecommend).then((d2) => __INITIAL_STATE__.recommendData = d2);
        });
        addElement(
          "span",
          { class: "rec-btn next" },
          void 0,
          "刷新",
          void 0,
          document.querySelector(".rec-btn.next")
        ).addEventListener("click", () => {
          recommendData(setting.privateRecommend).then((d2) => __INITIAL_STATE__.recommendData = d2);
        });
      });
    } else {
      const one = d.splice(0, 10);
      const two = d.splice(0, 10);
      __INITIAL_STATE__.recommendData = [...one];
      jsonphookasync("api.bilibili.com/x/web-interface/ranking/index", void 0, async (str) => {
        const obj = urlObj(str);
        if (obj) {
          if (obj.day == "7") {
            return { code: 0, data: two, message: "0", ttl: 1 };
          } else if (obj.day == "1") {
            return { code: 0, data: d, message: "0", ttl: 1 };
          }
          return { code: 0, data: one, message: "0", ttl: 1 };
        }
      }, false);
    }
  }).catch((reason) => {
    toast.error("获取推荐数据失败 ಥ_ಥ");
    debug.error("获取推荐数据失败 ಥ_ಥ", reason);
  });
  doWhile(() => document.querySelector("#ranking_ad"), () => {
    const vue = document.querySelector("#app > div.report-wrap-module.elevator-module").__vue__;
    const ranking_ad = document.querySelector("#ranking_ad").__vue__;
    const ranking_technology = document.querySelector("#ranking_technology").__vue__;
    const ranking_digital = document.querySelector("#ranking_digital").__vue__;
    vue.config[13].morelink = "/v/information/";
    vue.config[13].name = "资讯";
    vue.config[13].tid = 202;
    vue.config[13].type = "news";
    vue.config[8].morelink = "/v/knowledge/";
    vue.config[8].name = "知识";
    vue.config[9].morelink = "/v/tech/";
    vue.config[9].name = "科技";
    ranking_ad.config.morelink = "/v/information/";
    ranking_ad.config.name = "资讯";
    ranking_ad.config.tid = 202;
    ranking_ad.config.type = "news";
    ranking_technology.config.morelink = "/v/knowledge/";
    ranking_technology.config.name = "知识";
    ranking_digital.config.morelink = "/v/tech/";
    ranking_digital.config.name = "科技";
    doWhile(() => document.querySelector("#ranking_news"), () => {
      document.querySelector("#ranking_news").replaceChildren(createElements(htmlVnode(news_default)));
    });
  });
  xhrhook("api.live.bilibili.com/room/v1/RoomRecommend/biliIndexRec", (args) => {
    args[1] = args[1].includes("List") ? args[1].replace("api.live.bilibili.com/room/v1/RoomRecommend/biliIndexRecList", "api.live.bilibili.com/xlive/web-interface/v1/webMain/getList?platform=web") : args[1].replace("api.live.bilibili.com/room/v1/RoomRecommend/biliIndexRecMore", "api.live.bilibili.com/xlive/web-interface/v1/webMain/getMoreRecList?platform=web");
  }, (obj) => {
    let response = obj.responseText?.replace(/preview_banner_list/, "preview").replace(/ranking_list/, "ranking").replace(/recommend_room_list/, "recommend");
    if (response) {
      response = JSON.parse(response);
      response.data.text_link = { text: "233秒居然能做这些！", link: "//vc.bilibili.com" };
      if (response.data.recommend) {
        for (let i = 0; i < response.data.recommend.length; i++) {
          response.data.recommend[i].pic = response.data.recommend[i].cover;
          response.data.recommend[i].link = "//live.bilibili.com" + response.data.recommend[i].link;
        }
      }
      if (response.data.preview)
        for (let i = 0; i < response.data.preview.length; i++)
          response.data.preview[i].url = response.data.preview[i].link;
      obj.response = obj.responseText = JSON.stringify(response);
    }
  }, false);
  jsonphook(["newlist", "rid=202"], (url) => url.replace("rid=202", "rid=203"), void 0, false);
  jsonphook("api.bilibili.com/x/web-interface/ranking/region", (url) => {
    const obj = new URL(url);
    let arr2 = void 0;
    switch (obj.searchParams.get("rid")) {
      case "23":
        arr2 = [document.querySelector("#ranking_movie"), 2, "/ranking/cinema/23/0/3"];
        break;
      case "11":
        arr2 = [document.querySelector("#ranking_teleplay"), 5, "/ranking/cinema/11/0/3"];
        break;
      case "177":
        arr2 = [document.querySelector("#ranking_documentary"), 3, "/ranking/cinema/177/0/3"];
        break;
    }
    if (arr2) {
      fetch(\`https://api.bilibili.com/pgc/season/rank/web/list?season_type=\${arr2[1]}&day=3\`).then((d) => d.json()).then((d) => {
        const data = jsonCheck(d).data;
        let html = \`<header class="rank-head"><h3>排行</h3><div class="bili-dropdown rank-dropdown"><span class="selected">三日</span><i class="icon icon-arrow-down"></i><ul class="dropdown-list"><li class="dropdown-item" style="display: none;">三日</li><li class="dropdown-item">一周</li></ul></div></header><div class="rank-list-wrap"><ul class="bangumi-rank-list rank-list">\`;
        for (let i = 0; i < 8; i++) {
          html += \`<li class="rank-item\${i < 3 ? " highlight" : ""}"><i class="ri-num">\${i + 1}</i><a href="\${data.list[i].url}" target="_blank" title="\${data.list[i].title} 播放:\${data.list[i].stat.view}" class="ri-info-wrap"><p class="ri-title">\${data.list[i].title}</p><span class="ri-total">\${data.list[i].new_ep.index_show}</span></a></li>\`;
        }
        html += \`</ul></div><a href="\${arr2[2]}" target="_blank" class="more-link">查看更多<i class="icon icon-arrow-r"></i></a>\`;
        const vnode = htmlVnode(html);
        vnode[1].children[0].children?.forEach((d2, i) => {
          let node2;
          d2.event = {
            "mouseover": (e) => {
              const target = e.target;
              const nodes = createElements(htmlVnode(\`<div class="bangumi-info-module" style="left: \${target.getBoundingClientRect().left}px; top: \${getTotalTop(target) - 150}px;"><div class="v-preview clearfix"><div class="lazy-img cover"><img alt="\${data.list[i].title}" src="\${data.list[i].cover.replace("http:", "")}" /></div><div><p class="title">\${data.list[i].title}</p><p class="desc">\${data.list[i].new_ep.index_show}</p></div></div><div class="v-data"><span class="play"><i class="icon"></i>\${unitFormat(data.list[i].stat.view)}</span><span class="danmu"><i class="icon"></i>\${unitFormat(data.list[i].stat.danmaku)}</span><span class="fav"><i class="icon"></i>\${unitFormat(data.list[i].stat.follow)}</span></div></div>\`));
              node2 = nodes.children[0];
              document.body.appendChild(nodes);
            },
            "mouseout": () => node2.remove()
          };
        });
        arr2[0].replaceChildren(createElements(vnode));
      }).catch((e) => {
        debug.error(arr2[0], e);
      });
    }
    return url;
  }, void 0, false);
  xhrhook("api.bilibili.com/pgc/web/timeline?types=1", void 0, (res) => {
    setting.timeline && timeline();
  });
  primaryMenu();
  banner();
  globalVector();
}

// src/tampermonkey/vector.ts
replaceUrl(urlClean(location.href));
if (setting.index && path[2] == "www.bilibili.com" && (!path[3] || (path[3].startsWith("?") || path[3].startsWith("#") || path[3].startsWith("index.")))) {
  indexPage();
}
if (setting.av && /(\\/s)?\\/video\\/[AaBb][Vv]/.test(location.href)) {
  path[3] === "s" && replaceUrl(location.href.replace("s/video", "video"));
  avPage();
}
/**
 * remove-invalid-xml-characters.js
 * @link https://gist.github.com/john-doherty/b9195065884cdbfd2017a4756e6409cc
 * @license MIT
 * @see https://en.wikipedia.org/wiki/Valid_characters_in_XML
 */
// @license GFUL
// @license MIT

`;// src/tampermonkey/index.ts
(function() {
  new Function(
    "GM",
    "GM_xmlhttpRequest",
    "GM_getResourceText",
    "GM_getResourceURL",
    "GM_getValue",
    "GM_setValue",
    "GM_deleteValue",
    "GM_listValues",
    modules
  )(
    GM,
    GM_xmlhttpRequest,
    GM_getResourceText,
    GM_getResourceURL,
    GM_getValue,
    GM_setValue,
    GM_deleteValue,
    GM_listValues
  );
})();

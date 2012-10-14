var fs       = require('fs'),
    path     = require('path'),
    stat     = fs.statSync,
    readdir  = fs.readdirSync,
    dirname  = path.dirname,
    basename = path.basename,
    extname  = path.extname,
    sep      = path.sep,

    $ = function (key, val) {
        console.log("%s: %s", key, val);
    },

    dire = function (root, flat, ext) {
        var m = {};
        (flat ? direFlat : direNested)(
            m, root, [], ext
        );
        return m;
    },

    direNested = function (m, r, d, e) {
        var entries = readdir([r, d.join(sep)].join(sep));

        for (var i = 0; i < entries.length; ++i) {

            var p = [r, d.join(sep), entries[i]].join(sep);
            
            if (stat(p).isDirectory()) {

                var d1 = d.slice(0);
                d1.push(entries[i]);
                direNested(m, r, d1, e);
            
            } else {
            
                if (!e || extname(p) === e) {
                    var m1 = m;
                    for (var j = 0; j < d.length; ++j) {
                        m1[d[j]] = m1[d[j]] || {};
                        m1 = m1[d[j]];
                    }
                    m1[basename(entries[i], extname(entries[i]))] = require(p);
                }
            
            }
        }
    },

    direFlat = function (m, r, d, e) {
        var entries = readdir([r, d.join(sep)].join(sep));

        for (var i = 0; i < entries.length; ++i) {

            var p = [r, d.join(sep), entries[i]].join(sep);
            
            if (stat(p).isDirectory()) {
            
                var d1 = d.slice(0);
                d1.push(entries[i]);
                direFlat(m, r, d1, e);
            
            } else {
            
                if (!e || extname(p) === e) {
                    var n = d.length ?
                        [d.join(sep), basename(entries[i], extname(entries[i]))].join(sep) :
                        basename(entries[i], extname(entries[i]));
                    m[n] = require(p);
                }
            
            }
        }
    };


module.exports = dire;

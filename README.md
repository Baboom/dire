dire
====

dire (DIrectory REquire) is a simple node.js module capable of requiring an entire directory of other modules.

Features:
---------

- requiring a directory with one statement, either as a flat (one level) or nested (namespaced) object;
- filtering modules by file extension (i.e. you can require just the .json files or just the .js files).

Installation:
-------------

TODO: put npm instructions here

Usage:
------

    var dire = require('dire');
    var x = dire('/path/to/some/directory/');

This is the simplest use case. It requires any loadable node.js files in that directory and returns a nested object. If `/path/to/some/directory` had the following structure:

    /path/to/some/directory/
    '-- a/
        '-- cfg.json
        '-- mod.js
    '-- b/
        '-- cfg.json
        '-- mod.js
        '-- err.js
        '-- completelyrandommodule.js

the object `x` would be:

    {
        a: {
            cfg: [...],
            mod: [...]
        },
        b: {
            cfg: [...],
            mod: [...],
            err: [...],
            completelyrandommodule: [...]
        }
    }

`dire` can also be told to load a flat object:

    var x = dire('/path/to/some/directory/', true);

and then `x` would be:

    {
        'a/cfg': [...],
        'a/mod': [...],
        'b/cfg': [...],
        'b/mod': [...],
        'b/err': [...],
        'b/completelyrandommodule': [...]
    }

The third parameter provided to `dire` specifies the file extension filter:

    var x = dire('/path/to/some/directory/', false, '.json');

The value of `x` would now be:

    {
        a: {
            cfg: [...]
        },
        b: {
            cfg: [...]
        }
    }

License
-------

This software is available under the terms of the [MIT License](./dire/blob/master/LICENSE).

Credits
-------

This module is largely inspired by Troy Goode's [node-require-directory](https://github.com/TroyGoode/node-require-directory)

Bugs/Feature requests
---------------------

You gotta be kidding. There is no possibility in this universe of a software such as this to have any bugs. You are entitled, however, to at least try to prove me wrong. I hereby permit you to do that using the issue tracker or by sending an email to <carlosdavidepto@13brane.net>. xD
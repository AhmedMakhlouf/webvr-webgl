var Content = {};
Content.wavefrontObjParser = function(resource) {
    var indices = [],
        vertices = [],
        texturecoords = [],
        normals = [];

    var v = [], vt = [], vn = []; // Buffers
    var FACE = function (F) {
        var face = F.split(' ').map(function (fv) {
            var i = fv.split('/').map(function (i) {
                return parseInt(i, 10) - 1;
            });
            //console.log(i[0]);
            return {
                
                v: v[i[0]],
                vt: vt[i[1]],
                vn: vn[i[2]],
                //vi: i[0]
            };
        });

        //Generate indices for triangle
        var len = vertices.length;
        indices.push(len);
        indices.push(len + 1);
        indices.push(len + 2);

        // Generate indices for 4 point polygon
        if (face.length === 4) {
            indices.push(len);
            indices.push(len + 2);
            indices.push(len + 3);
        }

        // SAVE PARSED DATA:
        face.forEach(function (f) {
            vertices.push(f.v);
            texturecoords.push(f.vt);
            normals.push(f.vn);
            //indices.push(f.vi);
        });
    };
    var toFloatArr = function (s) {
            return s.split(' ').map(parseFloat);
        },
        lineParsers = {
            'v ': function (S) {
                v.push(toFloatArr(S.slice(2)));
            },
            'vt': function (S) {
                var x = (function (v) {
                    v[1] = 1 - v[1];
                    return v;
                }(toFloatArr(S.slice(3))));
                vt.push(x);
            },
            'vn': function (S) {
                vn.push(toFloatArr(S.slice(3)));
            },
            'f ': function (S) {
                FACE(S.slice(2));
            }
        };

    resource.split('\n').forEach(function (line) {
        if (line.length > 2) {
            Object.keys(lineParsers).forEach(function (key) {
                if (line.indexOf(key) === 0) {
                    lineParsers[key](line);
                }
            });
        }
    });

    return {
        vertices: vertices,
        texturecoords: texturecoords,
        normals: normals,
        indices: indices
    };
};


/**
 * Created by WebrexStudio on 5/9/17.
 */

const BaseAutoBindedClass = require(APP_BASE_PACKAGE_PATH + 'base-autobind');
const express = require('express');
var path = require('path');
const app = express();
var Jimp = require("jimp");
var fs = require("fs");
var lwip = require('lwip');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

class ImageHandler extends BaseAutoBindedClass {
    constructor() {
        super();
        this._validator = require('validator');
    }

    getImage(req, res) {
        console.log(req.params);
        var year = req.params.year;
        var month = req.params.month;
        var url = req.params.url;
        var fileName = url.replace(/\.[^/.]+$/, "");
        var ext = url.split('.').pop();
        var mainImage = path.resolve(__dirname + '/../../public/' + year + '/' + month + '/' + url);
        if (req.query.width) {
            var resizeImage = path.resolve(__dirname + '/../../public/' + year + '/' + month + '/' + fileName + '-' + req.query.width + '.' + ext);
        }
        console.time("concatenation");
        lwip.open(mainImage, function (err, image) {

            // check err...
            // manipulate image:
            image.resize(parseInt(req.query.width), 100, cubic, function (err, image) {

                // check err...
                // manipulate some more:
                // image.rotate(45, 'white', function (err, image) {

                // check err...
                // encode to jpeg and get a buffer object:
                image.writeFile(resizeImage, function (err, buffer) {

                    // check err...
                    // save buffer to disk / send over network / etc.
                    console.timeEnd("concatenation");
                    res.sendFile(resizeImage);
                });

                //});

            });

        });
        //   console.log(new Date().getTime());

        // fs.exists(mainImage, function (exists) {
        //     if (exists) {
        //         if (resizeImage) {
        //             fs.exists(resizeImage, function (exists) {

        //                 if (exists) {
        //                     // console.log(resizeImage);
        //                     res.sendFile(resizeImage);
        //                 } else {
        //                     // console.log(new Date().getTime());
        //                     Jimp.read(mainImage, function (err, img) {
        //                         if (err) {
        //                             res.sendFile(path.resolve(__dirname + '/../../public/' + year + '/' + month + '/' + 'untitled-1.png'));
        //                         }
        //                         console.time("concatenation");
        //                         img.resize(parseInt(req.query.width), Jimp.AUTO, Jimp.RESIZE_BEZIER).quality(50).write(resizeImage, function () {

        //                             console.timeEnd("concatenation");
        //                             imagemin([resizeImage, path.resolve(__dirname + '/../../public/' + year + '/' + month + '/')], {
        //                                 plugins: [
        //                                     imageminMozjpeg(),
        //                                     imageminPngquant({ quality: '65-80' })
        //                                 ]
        //                             }).then(files => {

        //                                 res.sendFile(resizeImage);
        //                                 console.log(files);
        //                                 //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …] 
        //                             });


        //                         });

        //                     }).then(function () {

        //                     });
        //                 }
        //             });
        //         } else {
        //             res.sendFile(mainImage);
        //         }
        //     } else {
        //         res.sendFile(path.resolve(__dirname + '/../../public/' + year + '/' + month + '/' + 'untitled-1.png'));
        //     }
        // });

        // console.log(fileName);
        // Jimp.read(path.resolve(__dirname + '/../../public/' + req.params.year + '/' + req.params.month + '/' + req.params.url), function (err, img) {

        //     img.scaleToFit(size, Jimp.AUTO, Jimp.RESIZE_BEZIER).quality(quality)
        //     .write(targetDir + '/' + 'img_3258' +  + '_s_' + size + '.jpg'); // save
        //     var sizes = [256, 128, 64],
        //         quality = 100;
        //     if (err) {
        //         throw err;
        //     }
        //     console.log(img);
        //     // resize for all sizes
        //     sizes.forEach(function (size) {

        //         console.log('resize to: ' + size);
        //         console.log(img);
        //         // resize, and save to the build folder
        //         img.scaleToFit(size, Jimp.AUTO, Jimp.RESIZE_BEZIER).quality(quality)
        //             .write(targetDir + '/' + 'img_3258' + quality + '_s_' + size + '.jpg'); // save
        //     });

        // });

        // res.sendFile(path.resolve(__dirname + '/../../public/' + year + '/' + month + '/' + 'untitled-1.png'));
    }
}

module.exports = ImageHandler;
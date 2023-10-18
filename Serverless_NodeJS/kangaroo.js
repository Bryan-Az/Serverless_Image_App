'use strict';
/* AWS Lambda ships with imageMagick out of the box */
var gm = require('gm').subClass({ imageMagick: true }),
    fs = require('fs'),
    AWS = require('aws-sdk'),
    s3 = new AWS.S3(),
    axios = require('axios')

var colors = [
  "red",
  "blue",
  "yellow",
  "green"
]
const maxFontSize = 28
const minFontSize = 14

module.exports.create = (event, context, cb) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  try {
    var kangaroorand = Math.floor(Math.random() * 10+1)
    var kangaroofile = `kangaroo-` + kangaroorand + `.jpg`
    var image = gm(kangaroofile),
        fileNum = Math.floor(Math.random() * 1000),
        fileName = `/tmp/kangaroo-${fileNum}.jpg`,
        s3filename = `kangaroo-${fileNum}.jpg`

    image.size((err, value) => {
      if (err) {
        return cb(err, null)
      }
      var maxWidth = value.width,
          maxHeight = value.height
      if (event.query && typeof event.query.text === 'string') {
        for (var bird of event.query.text.split(" ")) {
          var fontSize = Math.floor(Math.random() * (maxFontSize - minFontSize) + minFontSize + 1),
              x = Math.floor(Math.random() * (maxWidth - (fontSize * bird.length))),
              y = Math.floor(Math.random() * (maxHeight - (fontSize * 2)) + fontSize),
              color = colors[Math.floor(Math.random() * 4)]

          image = image.font('/opt/fonts/NimbusSanL-Bol.otf').fontSize(fontSize).fill(color).drawText(x, y, bird)
        }
      } else {
        console.error('Invalid input: The event.query.text is missing or not a string');
      }

      console.log("Writing file: ", fileName)
      image.write(fileName, (err) => {
        if (err) {
          console.log("Error writing file: ", err)
          return cb(err, image)
        }
        var imgdata = fs.readFileSync(fileName)
        var s3params = {
           Bucket: 'kangaroo-images',
           Key: s3filename,
           Body: imgdata,
           ContentType: 'image/jpeg'
        }
        s3.putObject(s3params,
          (err, obj) => {
            cb(err, {
              text: `<https://s3.amazonaws.com/${s3params.Bucket}/${s3filename}>`,
              unfurl_links: true,
              response_type: "in_channel"
            })
          }
        )
      })
    })
  }
  catch (err) {
    return cb(err, null)
  }
}

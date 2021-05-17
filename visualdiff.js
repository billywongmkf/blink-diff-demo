var BlinkDiff = require('blink-diff');
var path = require('path');
var screenshots_base = "test/functional/screenshots/base";
var screenshots_current = "test/functional/screenshots/current";
var screenshots_diff = "test/functional/screenshots/diff";
var screenshots = [
  'lego2.png',
// Specify all the screenshot filenames here.
// Filenames should be same in base and current folder.
];

screenshots.forEach(function (screenshot) {
    var imageAPath = path.resolve(screenshots_base, screenshot);
    var imageBPath = path.resolve(screenshots_current, screenshot);
    var imageOutputPath = path.resolve(screenshots_diff, screenshot);

    var diff = new BlinkDiff({
        imageAPath: imageAPath,
        imageBPath: imageBPath,
        thresholdType: BlinkDiff.THRESHOLD_PERCENT,
        threshold: 0.01, // 1% threshold
        imageOutputPath: imageOutputPath
    });
    diff.run(function (error, result) {
        if (error) {
            throw error;
        } else {
            console.log(diff.hasPassed(result.code) ? 'Passed' : 'Failed');
            console.log('Found ' + result.differences + ' differences.');
        }
    });
});

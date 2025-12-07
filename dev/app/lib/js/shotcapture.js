var ShotCapture = {
    readFile: function (file) {
        return new Promise((resolve) => {
            if (file.size > 52428800) {
                resolve(`data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=`);
            } else {
                var fileReader = new FileReader();
                fileReader.onloadend = function (fileLoadedEvent) {
                    resolve(fileLoadedEvent.target.result);
                };
                fileReader.onerror = function (event) {
                    console.error("File could not be read! Code " + event.target.error.code);
                };
                fileReader.readAsDataURL(file);
            }
        });
    },

    createVideo: (content) => {
        return new Promise((resolve, reject) => {
            var video = document.createElement('video');
            video.onloadstart = function () {
                resolve(video);
            };
            video.src = content;
        })
    },
    getThumbnail: function (uri, size, callback) {
        shotimage = new Image();
        shotimage.width = size.width;
        shotimage.height = size.height;
        shotimage.src = uri;
        var canvas = document.createElement('canvas');
        canvas.width = size.width;
        canvas.height = size.height;
        canvas.getContext('2d').drawImage(shotimage, 0, 0, size.width, size.height);
        callback(canvas.toDataURL('image/jpeg'));

    },
    getThumbnails: (uri, size) => {
        return new Promise((resolve) => {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext("2d");
            shotimage = new Image();
            shotimage.src = uri;
            shotimage.onload = () => {
                canvas.setAttribute('width', size.width);
                canvas.setAttribute('height', size.height);

                context.drawImage(shotimage, 0, 0, size.width, size.height);
                setTimeout(function () {
                    resolve(canvas.toDataURL('image/jpg'));
                }, 100);
            }
        })
    },

    getShot: (base64, size, frame) => {
        return new Promise((resolve, reject) => {
            ShotCapture.createVideo(base64)
                .then((video) => {
                    ShotCapture.playVideo(video, frame, size)
                        .then((thumbnail) => {
                            resolve(thumbnail);
                        })
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
        })
    },

    calculateVideoLength: (content) => {
        return new Promise((resolve, reject) => {
            var video = document.createElement('video');
            video.src = content;
            video.ondurationchange = function () {
                resolve(Math.floor(video.duration));
            };
        })

    },


    playVideo: (video, frame, size) => {
        return new Promise((resolve, reject) => {
            var endtime = Math.floor(frame) - 1;
            var canvas;
            video.currentTime = endtime;
            video.onpause = function () {
                setTimeout(function () {
                    // console.log(canvas.toDataURL());
                    resolve(canvas.toDataURL());
                }, 1000);
            };
            video.addEventListener("timeupdate", function () {
                if (Math.floor(this.currentTime) == endtime) {
                    this.pause();
                    canvas = document.createElement('canvas');
                    canvas.width = size.width;
                    canvas.height = size.height;
                    canvas.getContext('2d').drawImage(this, 0, 0, size.width, size.height);
                }
            }, false);
            try {
                video.play();
            } catch (ex) {
                resolve("could not play video");
            }
        })

    }
}
var deviceHelper = {
    logOutApp: function (app) {
        if (crossplat.device.platform == 'Android') {
            window.location.href = config.apps[app];
        } else if (crossplat.device.platform == 'iOS') {
            window.location.href = window.WkWebView.convertFilePath(config.apps[app]);
        } else {
            window.location.href = config.web[app];
        }
    },
    navigateApp: function (app) {
        if (crossplat.device.platform == 'Android' || crossplat.device.platform == 'iOS') {
            if (app == "core" || app == 'core') {
                //console.log("12345")
                if (crossplat.device.platform == 'Android') {
                    window.location.href = config.apps[app];
                } else if (crossplat.device.platform == 'iOS') {
                    window.location.href = window.WkWebView.convertFilePath(config.apps[app]);
                } 
            } else {
                if (!localStorage.getItem(`__APPVERSION_${app}`)) {
                    //console.log("yes app version 98765", !localStorage.getItem(`__APPVERSION_${app}`))
                    // appManager.appScreen(app, () => {
                    appManager.checkUpdate(app)
                        .then((updateResponse) => {
                            /**
                             * setting app version
                             */
                            localStorage.setItem(`__APPVERSION_${app}`, JSON.stringify({
                                "version": updateResponse.app_version,
                                "build": updateResponse[`${crossplat.device.platform}_build_number`]
                            }));
                            /**
                            * Show App intro and next btn
                            */
                            // $(document).on('click', '#app-intro-next-btn', function () {
                            //     //console.log("app-intro-next-btn")
                            // var app = $(this).attr('data-app');
                            appManager.navigateToApp(app);
                            // });
                            /**
                             * Back button
                             */
                            // $(document).on('click', '.app-info-btn-back', function () {
                            //     //console.log("app-info-btn-back")
                            //     location.hash = '#login';
                            // });
                        })
                        .catch((err) => {
                            appManager.navigateToApp(app);
                        })
                    // });
                } else {
                    //console.log("no app version 1234", config.apps[app])
                    appManager.navigateToApp(app);
                }
            }
        } else {
            window.location.href = config.web[app];
        }
    },
    navigateToAccounts: function (from, params = {}) {
        sessionStorage.setItem('__APPSTATUS', 'NAVIGATE');
        sessionStorage.setItem('__NAVIGATE_FROM', from);
        sessionStorage.setItem('__NAVIGATE_PARMS', JSON.stringify(params));
        if (crossplat.device.platform == 'iOS') {
            location.href = window.WkWebView.convertFilePath(config['apps']['accounts']);
        } else if (crossplat.device.platform == 'Android') {
            location.href = config['apps']['accounts'];
        } else {
            location.href = config['web']['accounts'] + `?ref=${config['web']['digibiz']}`;
        }
    },
    navigateAppCore: function (app) {
        //console.log("navigateAppCore", app)
        if (crossplat.device.platform == 'Android') {
            window.location.href = config.apps[app];
        } else if (crossplat.device.platform == 'iOS') {
            window.location.href = window.WkWebView.convertFilePath(config.apps[app]);
        } else {
            window.location.href = config.web[app];
        }
    },
    navigateLocalApp: function (app) {
        if (crossplat.device.platform == 'Android') {
            window.location.href = config.apps[app];
        } else if (crossplat.device.platform == 'iOS') {
            window.location.href = window.WkWebView.convertFilePath(config.apps[app]);
        } else {
            window.location.href = config.local_web[app];
        }        
    },
    navigateToApps: function (params) {
        var navigateApp = startApp.set({
            "application": params.package
        }).start();
    },
    byRolenavigateToApp: function (user_id, role, app) {
        var data = {};
        data[app] = {
            user_id: user_id,
            role: role
        };
        setServerSession(crossplat.device.uuid, data, function (session) {
            if (crossplat.device.platform === 'Android' || crossplat.device.platform === 'iOS') {
                window.location = config.apps[app];
            } else {
                window.location = config['web'][app];
            }
        });
    },
    b64toBlob: function (b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    },
    savebase64AsImageFile: function (folderpath, filename, content, contentType, callback) {
        // Convert the base64 string in a Blob
        var DataBlob = deviceHelper.b64toBlob(content, contentType);
        window.resolveLocalFileSystemURL(folderpath, function (dir) {
            dir.getFile(filename, { create: true }, function (file) {
                file.createWriter(function (fileWriter) {
                    fileWriter.write(DataBlob);
                    callback();
                }, function () {
                    callback();
                    alert('Unable to save file in path ' + folderpath);
                });
            });
        });
    },
    onDirectorySuccess: function (parent) {
    },
    onDirectoryFail: function (error) {
        //console.log("Unable to create new directory: " + error.code);
    },
    createDirectory: function (device_url, callback) {
        window.resolveLocalFileSystemURL(device_url, function (fileSystem) {
            var directoryEntry = fileSystem;
            var folderName = "Assets";
            directoryEntry.getDirectory(folderName, { create: true, exclusive: false }, deviceHelper.onDirectorySuccess, deviceHelper.onDirectoryFail);
            callback();
        }, function () {
            callback("failed");
        });
    },
    downloadToDevice: function (file_url, device_url, extension, callback) {
        var base64_content = file_url;
        var block = base64_content.split(";");
        var dataType = block[0].split(":")[1];
        var realData = block[1].split(",")[1];
        var filename = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/-/g, '').replace(/:/g, '').replace(/ /g, '') + "." + extension;
        deviceHelper.createDirectory(device_url, function (err) {
            if (err) {
                //console.log(err);
            } else {
                deviceHelper.savebase64AsImageFile(device_url + "/Assets", filename, realData, dataType, function () {
                    callback();
                });
            }
        });
    },
    captureMultimediaFromDevice: function (event, options, callback) {
        navigator.device.capture[event](captureSuccess, captureError, options);
        function captureSuccess(mediaFiles) {
            callback(null, mediaFiles);
        };
        function captureError(error) {
            callback(error);
        };
    },
    getFileContentAsBase64: function (path, callback) {
        window.resolveLocalFileSystemURL(path, gotFile, fail);
        function fail(e) {
            //console.log('Cannot find requested file');
        }
        function gotFile(fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    var content = this.result;
                    callback(content);
                };
                // readAsDatURL Method from the file plugin
                reader.readAsDataURL(file);
            });
        }
    },
    sendCapturedMultimedia: function (media, attachmentArray, callback) {
        deviceHelper.getFileContentAsBase64(media.fullPath, function (base64Image) {
            var fileType = media.type.split("/");
            var content_type = fileType[0];
            var extension = fileType[1];
            local.getSession(["individual_id"], function (storage) {
                $('#text_message').find('#emoji_value').html("<br>");
                var sender = $('body').find('#text_message').attr('data-sender');
                var sendertype = $('body').find('#text_message').attr('data-sendertype');
                var receiver = $('body').find('#text_message').attr('data-receiver');
                var type = $('body').find('#text_message').attr('data-type');
                var communication_method = $('body').find('#text_message').attr('data-communication_method');
                var random_number = Math.floor(100000 + Math.random() * 900000);
                var tempId = storage.individual_id + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/-/g, '').replace(/:/g, '').replace(/ /g, '') + random_number;
                attachmentArray[tempId] = base64Image;
                var requestParams = {
                    communication_type: "individual",
                    communication_method: communication_method,
                    sender: sender,
                    sender_type: sendertype,
                    receiver: receiver,
                    type: type,
                    content_type: content_type,
                    tempId: tempId
                };
                requestParams.content = {
                    name: media.name.split('.')[0],
                    size: media.size,
                    permission: "read",
                    keywords: "truchat files",
                    type: media.type.split('/')[0],
                    extension: media.type.split('/')[1],
                    data: base64Image
                };
                var data = {
                    id: tempId,
                    type: type,
                    send_date: new Date().toISOString() //system time
                };
                if (type == "reply") {
                    requestParams.parent = $('body').find('#text_message').attr('data-parent');
                    data.parent = requestParams.parent;
                }
                if (communication_method == "group") {
                    requestParams.groupId = receiver;
                }
                if (storage.individual_id == sender) {
                    if (type == "reply" || type == "warn") {
                        data.parent_name = $('body').find('.compose-reply-panel').find('.reply-msgbox-username').html();
                        data.parent_content = $('body').find('.compose-reply-panel').find('.reply-content').html();
                    }
                }
                var size = {
                    width: '200',
                    height: '113'
                };
                if (content_type == "image") {
                    data.content_type = content_type;
                    data.extension = extension;
                    data.content_thumbnail = "";
                    messageLayout.appendRightMsgTemplateCb(function (err) {
                        if (err) {
                            //console.log(err);
                        } else {
                            $("input.select-msg#" + tempId).parents('.checkbox-container').find('.message-out-container').find('.multimedia-container').addClass('disable');
                            var thumbnailDetails = {
                                name: media.name.split('.')[0],
                                type: media.type.split('/')[0],
                                size: 10000,
                                permission: "read",
                                keywords: "truchat image thumbnails",
                                extension: media.type.split('/')[1],
                                data: base64Image
                            };
                            requestParams.content["thumbnailDetails"] = thumbnailDetails;
                            $("input.select-msg#" + tempId).parents('.checkbox-container').find('.message-out-container').find('.multimedia-container').find(".loader-wrapper").remove();
                            $("input.select-msg#" + tempId).parents('.checkbox-container').find('.message-out-container').find('.multimedia-container').find('img').attr('src', base64Image);
                            requestParams.content_thumbnail = base64Image;
                            messageMethod.sendChat(requestParams, attachmentArray, tempId);
                            callback();
                        }
                    }, data);
                }
                if (content_type == "audio") { // audio
                    data.content_type = content_type;
                    messageLayout.appendRightMsgTemplateCb(function (err) {
                        if (err) {
                            //console.log(err);
                        } else {
                            $("input.select-msg#" + tempId).parents('.checkbox-container').find('.message-out-container').find('.multimedia-container').addClass('disable');
                            messageMethod.sendChat(requestParams, attachmentArray, tempId);
                            callback();
                        }
                    }, data);
                }
                if (content_type == "video") { // video
                    data.content_type = "video";
                    data.content_thumbnail = "";
                    messageLayout.appendRightMsgTemplateCb(function (err) {
                        if (err) {
                            //console.log(err);
                        } else {
                            $("input.select-msg#" + tempId).parents('.checkbox-container').find('.message-out-container').find('.multimedia-container').addClass('disable');
                            var loaderElement = $("input.select-msg#" + tempId).parents('.checkbox-container').find('.message-out-container').find('.multimedia-container');
                            fetch.addLoader(loaderElement);
                            ShotCapture.calculateVideoLength(base64Image, function (length) {
                                ShotCapture.getShot(base64Image, size, length / 2, function (shot) {
                                    var thumbnailType = shot.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
                                    var thumbnailDetails = {
                                        name: media.name.split('.')[0],
                                        size: 10000,
                                        permission: "read",
                                        keywords: "truchat video thumbnails",
                                        type: thumbnailType[1].split('/')[0],
                                        extension: thumbnailType[1].split('/')[1],
                                        data: shot
                                    };
                                    requestParams.content["thumbnailDetails"] = thumbnailDetails;
                                    $("input.select-msg#" + tempId).parents('.checkbox-container').find('.message-out-container').find('.multimedia-container').find(".loader-wrapper").remove();
                                    $("input.select-msg#" + tempId).parents('.checkbox-container').find('.message-out-container').find('.multimedia-container').find('img').attr('src', shot);
                                    requestParams.content_thumbnail = shot;
                                    messageMethod.sendChat(requestParams, attachmentArray, tempId);
                                    callback();
                                });
                            });
                        }
                    }, data);
                }
            });
        });
    },
    captureEvents: function (event, options, callback) {
        deviceHelper.captureMultimediaFromDevice(event, options, function (err, media) {
            if (err) {
                //console.log(err);
                if (err.code == 3 || err.message == "Canceled.") {
                } else {
                    Materialize.toast('Error happened in capture multimedia', 4000, 'round error-alert');
                }
            } else {
                $.each(media, function (index, value) {
                    deviceHelper.sendCapturedMultimedia(value, attachmentArray, function () {
                        callback();
                    });
                });
            }
        });
    }
}
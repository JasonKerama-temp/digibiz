var appManager = {
    dataPath: `${cordova.file.dataDirectory}www`,
    appPath: `${cordova.file.applicationDirectory}www`,
    tempPath: `${cordova.file.dataDirectory}temp`,
    app_updater: `https://release.digitaljeevi.com`,
    defaultHtml: `/index.html`,
    env: 'sandbox',
    init: () => {
        appManager.showStartupScreen(config.app_name, (statusElement, intervalID) => {
            if (!localStorage.getItem('__FIRSTRUN')) {
               // app.logout();
                //Installing accounts start
                appManager.checkUpdate('accounts')
                    .then((updateResponse) => {
                        //console.log(updateResponse);
                        $(statusElement).html(`Downloading files...`);
                        let updateFileName = `accounts_${updateResponse.app_version.replace('.', '_')}_${updateResponse[`${crossplat.device.platform}_build_number`]}.zip`;
                        appManager.downloadUpdate(updateFileName, 'accounts')
                            .then(() => {
                                //console.log("updateFileName", updateFileName);
                                $(statusElement).html(`Installing files...`);
                                appManager.removeIfDirExists(cordova.file.dataDirectory + 'accounts')
                                    .then(() => {
                                        appManager.extractResources(`${appManager.tempPath}/${updateFileName}`, `${cordova.file.dataDirectory}accounts`, function (progressEvent) {
                                            $(statusElement).html(`Extracting Resources...(${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%)`);
                                        }).then(() => {
                                            //update version
                                            localStorage.setItem(`__APPVERSION_accounts`, JSON.stringify({
                                                "version": updateResponse.app_version,
                                                "build": updateResponse[`${crossplat.device.platform}_build_number`]
                                            }));
                                            //Installing accounts end
                                            appManager.checkUpdate(config.app_name)
                                                .then((updateResponse) => {
                                                    appManager.removeIfDirExists(appManager.dataPath)
                                                        .then(() => {
                                                            $(statusElement).html(`Downloading Interface...`);
                                                            //console.log('Installing App');
                                                            let updateFileName = `${config.app_name}_${updateResponse.app_version.replace('.', '_')}_${updateResponse[`${crossplat.device.platform}_build_number`]}.zip`;
                                                            appManager.downloadUpdate(updateFileName)
                                                                .then(() => {
                                                                    $(statusElement).html(`Downloading Completed`);
                                                                    appManager.extractResources(`${appManager.tempPath}/${updateFileName}`, appManager.dataPath, function (progressEvent) {
                                                                        $(statusElement).html(`Extracting Resources...(${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%)`);
                                                                    }).then(() => {
                                                                        localStorage.setItem('__FIRSTRUN', 'true');
                                                                        sessionStorage.setItem('__APPSTATUS', 'NAVIGATE');
                                                                        localStorage.setItem(`__APPVERSION_digibiz_${crossplat.device.platform}`, JSON.stringify({
                                                                            "version": updateResponse.app_version,
                                                                            "build": updateResponse[`${crossplat.device.platform}_build_number`]
                                                                        }));
                                                                        setTimeout(function () {
                                                                            if (crossplat.device.platform == 'iOS') {
                                                                                location.href = window.WkWebView.convertFilePath(`${appManager.dataPath}${appManager.defaultHtml}`);
                                                                            } else {
                                                                                location.href = `${appManager.dataPath}${appManager.defaultHtml}`
                                                                            }
                                                                        }, 300);
                                                                    }).catch((err) => {
                                                                        //console.log("error in download update", err);
                                                                        $(statusElement).html(err);
                                                                    })
                                                                })
                                                                .catch((err) => {
                                                                    //console.log("downloading error", err);
                                                                    $(statusElement).html(`Error While downloading updates. Please restart the application.`);
                                                                });
                                                        })
                                                        .catch((err) => {
                                                            //console.log(err);
                                                            // alert("Unable to Connect to Server!!!");
                                                            // navigator.app.exitApp();
                                                        });
                                                })
                                                .catch((err) => {
                                                    //console.log(err);
                                                    // alert("Unable to Connect to Server!!!");
                                                    // navigator.app.exitApp();
                                                });
                                        })
                                            .catch((err) => {
                                                //console.log("remove if dir exists ", err);
                                            });
                                    }).catch((err) => {
                                        //console.log("error in download update", err);
                                        $(statusElement).html(err);
                                    })
                            })
                            .catch((err) => {
                                //console.log("downloading error", err);
                                $(statusElement).html(`Error While downloading updates. Please restart the application.`);
                            });

                    }).catch((err) => {
                        //console.log(err);
                    });
            } else {
                //check update
                $(statusElement).html(`Checking Updates.`);
                //check if user is online
                if (navigator.onLine) {
                    //check accounts app updates
                    appManager.checkUpdate('accounts')
                        .then((updateResponse) => {
                            appManager.getAppVersion('accounts', function (current_app_version, current_app_build_number) {
                                //console.log('getting app version');
                                if (updateResponse.app_version == current_app_version) {
                                    //console.log('checking build number');
                                    if (updateResponse[`${crossplat.device.platform}_build_number`] != current_app_build_number) {
                                        $(statusElement).html(`Downloading files...`);
                                        //console.log('download latest build');
                                        let updateFileName = `accounts_${updateResponse.app_version.replace('.', '_')}_${updateResponse[`${crossplat.device.platform}_build_number`]}.zip`;
                                        appManager.downloadUpdate(updateFileName, 'accounts')
                                            .then(() => {
                                                $(statusElement).html(`Installing files...`);
                                                appManager.extractResources(`${appManager.tempPath}/${updateFileName}`, `${cordova.file.dataDirectory}accounts`, function (progressEvent) {
                                                    $(statusElement).html(`Extracting Resources...(${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%)`);
                                                }).then(() => {
                                                    //update version
                                                    localStorage.setItem(`__APPVERSION_accounts`, JSON.stringify({
                                                        "version": updateResponse.app_version,
                                                        "build": updateResponse[`${crossplat.device.platform}_build_number`]
                                                    }));
                                                    appManager.checkUpdate(config.app_name)
                                                        .then((updateResponse) => {
                                                            //console.log('checking update');
                                                            appManager.getAppVersion(config.app_name, function (current_app_version, current_app_build_number) {
                                                                //console.log('getting app version');
                                                                if (updateResponse.app_version == current_app_version) {
                                                                    //console.log('checking build number');
                                                                    if (updateResponse[`${crossplat.device.platform}_build_number`] == current_app_build_number) {
                                                                        //console.log('getting directory entry');
                                                                        appManager.getDirectoryEntry(appManager.dataPath)
                                                                            .then(() => {
                                                                                //console.log('inside getting directory entry');
                                                                                $(statusElement).html(`Loading Resources.`);
                                                                                setTimeout(function () {
                                                                                    //console.log("navigating to data directory");
                                                                                    sessionStorage.setItem('__APPSTATUS', 'NAVIGATE');
                                                                                    if (crossplat.device.platform == 'iOS') {
                                                                                        location.href = window.WkWebView.convertFilePath(`${appManager.dataPath}${appManager.defaultHtml}`);
                                                                                    } else {
                                                                                        location.href = `${appManager.dataPath}${appManager.defaultHtml}`
                                                                                    }
                                                                                }, 300);
                                                                            })
                                                                            .catch((err) => {
                                                                                $(statusElement).html(`Unable to load app properly.`);
                                                                                //console.log("get data dir err", err);
                                                                                setTimeout(function () {
                                                                                    delete localStorage['__FIRSTRUN'];
                                                                                    sessionStorage.setItem('__APPSTATUS', 'NAVIGATE');
                                                                                    if (crossplat.device.platform == 'iOS') {
                                                                                        location.href = window.WkWebView.convertFilePath(`${appManager.dataPath}${appManager.defaultHtml}`);
                                                                                    } else {
                                                                                        location.href = `${appManager.dataPath}${appManager.defaultHtml}`
                                                                                    }
                                                                                }, 300);

                                                                            });
                                                                    } else {
                                                                        $(statusElement).html(`Downloading updates.`);
                                                                        //console.log('download latest build');
                                                                        let updateFileName = `${config.app_name}_${updateResponse.app_version.replace('.', '_')}_${updateResponse[`${crossplat.device.platform}_build_number`]}.zip`;
                                                                        appManager.downloadUpdate(updateFileName)
                                                                            .then(() => {
                                                                                $(statusElement).html(`Downloading Completed`);
                                                                                appManager.extractResources(`${appManager.tempPath}/${updateFileName}`, appManager.dataPath, function (progressEvent) {
                                                                                    $(statusElement).html(`Extracting Resources...(${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%)`);
                                                                                }).then(() => {
                                                                                    localStorage.setItem('__APPVERSION_digibiz', JSON.stringify({
                                                                                        "version": updateResponse.app_version,
                                                                                        "build": updateResponse[`${crossplat.device.platform}_build_number`]
                                                                                    }));
                                                                                    sessionStorage.setItem('__APPSTATUS', 'NAVIGATE');
                                                                                    if (crossplat.device.platform == 'iOS') {
                                                                                        location.href = window.WkWebView.convertFilePath(`${appManager.dataPath}${appManager.defaultHtml}`);
                                                                                    } else {
                                                                                        location.href = `${appManager.dataPath}${appManager.defaultHtml}`
                                                                                    }
                                                                                }).catch((err) => {
                                                                                    //console.log("error in download update", err);
                                                                                    $(statusElement).html(err);
                                                                                })
                                                                            })
                                                                            .catch((err) => {
                                                                                //console.log("downloading error", err);
                                                                                $(statusElement).html(`Error While downloading updates. Please restart the application.`);
                                                                            });
                                                                    }
                                                                } else {
                                                                    alert("Current Version of App is Outdated. Please reinstall from App store");
                                                                    if (crossplat.device.platform == 'Android') {
                                                                        window.open(`itms-apps://itunes.apple.com/app/com.digitaljeevi.djbusiness`);
                                                                    }
                                                                    if (crossplat.device.platform == 'iOS') {
                                                                        window.open(`market://details?id=com.digitaljeevi.djbusiness`);
                                                                    }
                                                                }
                                                            })
                                                        })
                                                        .catch((err) => {
                                                            //console.log(err);
                                                            alert("Unable to Connect to Server!!!");
                                                        });
                                                }).catch((err) => {
                                                    //console.log("error in download update", err);
                                                    $(statusElement).html(err);
                                                })
                                            })
                                            .catch((err) => {
                                                //console.log("downloading error", err);
                                                $(statusElement).html(`Error While downloading updates. Please restart the application.`);
                                            });
                                    } else {
                                        appManager.checkUpdate(config.app_name)
                                            .then((updateResponse) => {
                                                //console.log('checking update');
                                                appManager.getAppVersion(config.app_name, function (current_app_version, current_app_build_number) {
                                                    //console.log('getting app version');
                                                    if (updateResponse.app_version == current_app_version) {
                                                        //console.log('checking build number');
                                                        if (updateResponse[`${crossplat.device.platform}_build_number`] == current_app_build_number) {
                                                            //console.log('getting directory entry');
                                                            appManager.getDirectoryEntry(appManager.dataPath)
                                                                .then(() => {
                                                                    //console.log('inside getting directory entry');
                                                                    $(statusElement).html(`Loading Resources.`);
                                                                    setTimeout(function () {
                                                                        //console.log("navigating to data directory");
                                                                        sessionStorage.setItem('__APPSTATUS', 'NAVIGATE');
                                                                        if (crossplat.device.platform == 'iOS') {
                                                                            location.href = window.WkWebView.convertFilePath(`${appManager.dataPath}${appManager.defaultHtml}`);
                                                                        } else {
                                                                            location.href = `${appManager.dataPath}${appManager.defaultHtml}`
                                                                        }
                                                                    }, 300);
                                                                })
                                                                .catch((err) => {
                                                                    $(statusElement).html(`Unable to load app properly.`);
                                                                    //console.log("get data dir err", err);
                                                                    setTimeout(function () {
                                                                        delete localStorage['__FIRSTRUN'];
                                                                        sessionStorage.setItem('__APPSTATUS', 'NAVIGATE');
                                                                        if (crossplat.device.platform == 'iOS') {
                                                                            location.href = window.WkWebView.convertFilePath(`${appManager.dataPath}${appManager.defaultHtml}`);
                                                                        } else {
                                                                            location.href = `${appManager.dataPath}${appManager.defaultHtml}`
                                                                        }
                                                                    }, 300);

                                                                });
                                                        } else {
                                                            $(statusElement).html(`Downloading updates.`);
                                                            //console.log('download latest build');
                                                            let updateFileName = `${config.app_name}_${updateResponse.app_version.replace('.', '_')}_${updateResponse[`${crossplat.device.platform}_build_number`]}.zip`;
                                                            appManager.downloadUpdate(updateFileName)
                                                                .then(() => {
                                                                    $(statusElement).html(`Downloading Completed`);
                                                                    appManager.extractResources(`${appManager.tempPath}/${updateFileName}`, appManager.dataPath, function (progressEvent) {
                                                                        $(statusElement).html(`Extracting Resources...(${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%)`);
                                                                    }).then(() => {
                                                                        localStorage.setItem('__APPVERSION_digibiz', JSON.stringify({
                                                                            "version": updateResponse.app_version,
                                                                            "build": updateResponse[`${crossplat.device.platform}_build_number`]
                                                                        }));
                                                                        sessionStorage.setItem('__APPSTATUS', 'NAVIGATE');
                                                                        if (crossplat.device.platform == 'iOS') {
                                                                            location.href = window.WkWebView.convertFilePath(`${appManager.dataPath}${appManager.defaultHtml}`);
                                                                        } else {
                                                                            location.href = `${appManager.dataPath}${appManager.defaultHtml}`
                                                                        }
                                                                    }).catch((err) => {
                                                                        //console.log("error in download update", err);
                                                                        $(statusElement).html(err);
                                                                    })
                                                                })
                                                                .catch((err) => {
                                                                    //console.log("downloading error", err);
                                                                    $(statusElement).html(`Error While downloading updates. Please restart the application.`);
                                                                });
                                                        }
                                                    } else {
                                                        alert("Current Version of App is Outdated. Please reinstall from App store");
                                                        if (crossplat.device.platform == 'Android') {
                                                            window.open(`itms-apps://itunes.apple.com/app/com.digitaljeevi.djbusiness`);
                                                        }
                                                        if (crossplat.device.platform == 'iOS') {
                                                            window.open(`market://details?id=com.digitaljeevi.djbusiness`);
                                                        }
                                                    }
                                                })
                                            })
                                            .catch((err) => {
                                                //console.log(err);
                                                alert("Unable to Connect to Server!!!");
                                            });
                                    }
                                } else {
                                    alert("Current Version of App is Outdated. Please reinstall from App store");
                                    if (crossplat.device.platform == 'Android') {
                                        window.open(`itms-apps://itunes.apple.com/app/com.digitaljeevi.djbusiness`);
                                    }
                                    if (crossplat.device.platform == 'iOS') {
                                        window.open(`market://details?id=com.digitaljeevi.djbusiness`);
                                    }
                                }
                            })
                        }).catch((err) => {
                            //console.log(err);
                            alert("Unable to Connect to Server!!!");
                        });
                } else {
                    //offline case
                    window.plugins.toast.showLongBottom("You are Offline!!!");
                    appManager.getDirectoryEntry(appManager.dataPath)
                        .then(() => {
                            $(statusElement).html(`Loading Resources.`);
                            setTimeout(function () {
                                //console.log("navigating to data directory");
                                sessionStorage.setItem('__APPSTATUS', 'NAVIGATE');
                                if (crossplat.device.platform == 'iOS') {
                                    location.href = window.WkWebView.convertFilePath(`${appManager.dataPath}${appManager.defaultHtml}`);
                                } else {
                                    location.href = `${appManager.dataPath}${appManager.defaultHtml}`
                                }
                            }, 300);
                        })
                        .catch((err) => {
                            $(statusElement).html(`Unable to load app properly.`);
                            //console.log("get data dir err", err);
                            setTimeout(function () {
                                delete localStorage['__FIRSTRUN'];
                                sessionStorage.setItem('__APPSTATUS', 'NAVIGATE');
                                if (crossplat.device.platform == 'iOS') {
                                    location.href = window.WkWebView.convertFilePath(`${appManager.dataPath}${appManager.defaultHtml}`);
                                } else {
                                    location.href = `${appManager.dataPath}${appManager.defaultHtml}`
                                }
                            }, 300);

                        });
                }
            }
        });
    },
    getAppVersion: (app, callback) => {
        if (!localStorage.getItem(`__APPVERSION_${app}`) && app == config.app_name) {
            cordova.getAppVersion.getVersionNumber(function (current_app_version) {
                cordova.getAppVersion.getVersionCode(function (current_app_build_number) {
                    callback(current_app_version, current_app_build_number);
                });
            });
        } else {
            var appVersion = JSON.parse(localStorage.getItem(`__APPVERSION_${app}`));
            callback(appVersion.version, appVersion.build);
        }
    },
    getDirectoryEntry: (dir) => {
        return new Promise((resolve, reject) => {
            window.resolveLocalFileSystemURL(dir, function (dirEntry) {
                resolve(dirEntry);
            }, function (err) {
                reject(err);
            });
        });
    },
    getFileEntry: (dirEntry, filePath, create = false) => {
        return new Promise((resolve, reject) => {
            dirEntry.getFile(filePath, { create, exclusive: false }, function (fileEntry) {
                resolve(fileEntry);
            }, function (err) {
                //console.log("fileEntry err", err);
                reject(err);
            });
        });
    },
    getTempDirEntry: () => {
        return new Promise((resolve, reject) => {
            appManager.removeIfDirExists(appManager.tempPath)
                .then(() => {
                    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (rootDirEntry) {
                        rootDirEntry.getDirectory('temp', { create: true }, function (dirEntry) {
                            resolve(dirEntry);
                        }, function (err) {
                            reject(err);
                        });
                    }, function (err) {
                        reject(err);
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    listDirectory: (dir) => {
        return new Promise((resolve, reject) => {
            appManager.getDirectoryEntry(dir)
                .then((dirEntry) => {
                    var reader = dirEntry.createReader();
                    reader.readEntries(
                        function (entries) {
                            resolve(entries);
                        },
                        function (err) {
                            reject(err);
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    removeIfDirExists: (dir) => {
        return new Promise((resolve, reject) => {
            appManager.getDirectoryEntry(dir)
                .then((entry) => {
                    entry.removeRecursively(function () {
                        //console.log('directory removed');
                        resolve();
                    }, function (err) {
                        //console.log('remove directory - error while removing directory', err);
                        reject(err);
                    });
                })
                .catch((err) => {
                    //console.log('remove directory - directory doesnot exist');
                    resolve();
                });
        });
    },
    copyBundledFilesToDataDirectory: () => {
        return new Promise((resolve, reject) => {
            appManager.getDirectoryEntry(cordova.file.applicationDirectory + 'www')
                .then((applicationDirEntry) => {
                    appManager.getDirectoryEntry(cordova.file.dataDirectory)
                        .then((dataDirEntry) => {
                            dataDirEntry.getDirectory('www', { create: true }, function (downloadEntry) {
                                //before copy check if other files are there
                                //check the alternate version of application
                                applicationDirEntry.copyTo(dataDirEntry, 'www', function () {
                                    resolve();
                                }, function (err) {
                                    //console.log("copy to", err);
                                    reject(err);
                                });
                            }, function (err) {
                                //console.log("Err -", err);
                                reject(err);
                            });
                        })
                        .catch((err) => {
                            //console.log("data directory", err);
                            reject(err);
                        });
                })
                .catch((err) => {
                    //console.log("application directory", err);
                    reject(err);
                });
        });
    },
    checkUpdate: (app_name) => {
        return new Promise((resolve, reject) => {
            var requestParams = {
                app: app_name
            }
            fetch.apiCall(function (response, status, xhr) {
                if (status === "success") {
                    resolve(response);
                } else {
                    reject(JSON.parse(response.responseText));
                }
            }, `${appManager.app_updater}/checkupdate`, "POST", "JSON", requestParams);
        });
    },
    showStartupScreen: (app, callback) => {
        var data = {
            app_logo: config.app_logos[app]
        }
        emptycol.getEmptyLayout(function () {
            var element = $("#text-container");
            $(element).html(`Loading...`);
            callback(element);
        }, "page/startup/init_page", "#init-page-template", '#login-container', data);
    },
    appScreen: (app, callback) => {
        var data = {
            app_logo: config.app_logos[app],
            app: app,
            description: config.app_descriptions[app]
        }
        emptycol.getEmptyLayout(function () {
            callback();
        }, "page/startup/app_info", "#app-info-template", '#login-container', data);
    },
    download: (download_uri, download_path, progress = false) => {
        return new Promise((resolve, reject) => {
            var fileTransfer = new FileTransfer();
            //console.log('download uri', download_uri);
            //console.log('download path', download_path);
            fileTransfer.download(
                encodeURI(download_uri),
                download_path,
                function (entry) {
                    //console.log("download complete: " + entry.toURL());
                    resolve(entry);
                },
                function (error) {
                    //console.log("download error source " + error.source);
                    //console.log("download error target " + error.target);

                    // 1 = FileTransferError.FILE_NOT_FOUND_ERR
                    // 2 = FileTransferError.INVALID_URL_ERR
                    // 3 = FileTransferError.CONNECTION_ERR
                    // 4 = FileTransferError.ABORT_ERR
                    // 5 = FileTransferError.NOT_MODIFIED_ERR
                    //console.log("upload error code " + error.code);
                    reject(error);
                },
                false);
            if (progress) {
                fileTransfer.onprogress = function (result) {
                    // //console.log("Progress", result);
                    var percent = result.loaded / result.total * 100;
                    percent = Math.round(percent);
                    $(progress).html(`Downloading Update...(${percent}%)`);
                };
            }
        });
    },
    downloadUpdate: (updateFile, app_name = 'digibiz') => {
        return new Promise((resolve, reject) => {
            appManager.getTempDirEntry()
                .then((tempEntry) => {
                    appManager.getFileEntry(tempEntry, updateFile, true)
                        .then((fileEntry) => {
                            appManager.download(`${appManager.app_updater}/update?app=${app_name}&platform=${crossplat.device.platform}`, fileEntry.toURL(), $('#text-container'))
                                .then((fileResult) => {
                                    resolve(fileResult);
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                        })
                        .catch((err) => {
                            //console.log("dir entry error", err);
                            reject(err);
                        });
                })
                .catch((err) => {
                    //console.log("temp entry", err);
                    reject(err);
                });
        });
    },
    extractResources: (source, destination, progress) => {
        return new Promise((resolve, reject) => {
            zip.unzip(source, destination, function (err) {
                if (!err) {
                    resolve()
                } else {
                    reject("Error While Extracting Downloaded Resources");
                }
            }, progress);
        });
    },
    downloadApp: (app, updateFile) => {
        return new Promise((resolve, reject) => {
            appManager.getTempDirEntry()
                .then((tempEntry) => {
                    appManager.getFileEntry(tempEntry, updateFile, true)
                        .then((fileEntry) => {
                            appManager.download(`${appManager.app_updater}/update?app=${app}&platform=${crossplat.device.platform}`, fileEntry.toURL(), $('#text-container'))
                                .then((fileResult) => {
                                    //console.log('download completed');
                                    resolve(fileResult);
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                        })
                        .catch((err) => {
                            //console.log("dir entry error", err);
                            reject(err);
                        });
                })
                .catch((err) => {
                    //console.log("temp entry", err);
                    reject(err);
                });
        });
    },
    getAppDirEntry: (app) => {
        return new Promise((resolve, reject) => {
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (rootDirEntry) {
                rootDirEntry.getDirectory('app', { create: true }, function (dirEntry) {
                    resolve(dirEntry);
                }, function (err) {
                    reject(err);
                });
            }, function (err) {
                reject(err);
            });
        });
    },
    navigateToApp: (app) => {
        return new Promise((resolve, reject) => {
            appManager.showStartupScreen(app, (statusElement) => {
                $(statusElement).html(`Checking updates`);
                if (navigator.onLine) {
                    appManager.checkUpdate(app)
                        .then((updateResponse) => {
                            //console.log(updateResponse)
                            appManager.getDirectoryEntry(`${cordova.file.dataDirectory}${app}`)
                                .then(() => {
                                    appManager.getAppVersion(app, function (current_app_version, current_app_build_number) {
                                        setTimeout(function () {
                                            //console.log('inside timeout');
                                            if (updateResponse.app_version == current_app_version) {
                                                //console.log(updateResponse[`${crossplat.device.platform}_build_number`] + ">" + current_app_build_number);
                                                if (updateResponse[`${crossplat.device.platform}_build_number`] > current_app_build_number) {
                                                    //download
                                                    //console.log("inside download app");
                                                    $(statusElement).html(`Downloading updates`);
                                                    let updateFileName = `${app}_${updateResponse.app_version.replace('.', '_')}_${updateResponse[`${crossplat.device.platform}_build_number`]}.zip`;
                                                    appManager.downloadApp(app, updateFileName)
                                                        .then(() => {
                                                            $(statusElement).html(`Downloading Completed`);
                                                            appManager.extractResources(`${appManager.tempPath}/${updateFileName}`, `${cordova.file.dataDirectory}${app}`, function (progressEvent) {
                                                                $(statusElement).html(`Extracting Resources...(${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%)`);
                                                            }).then(() => {
                                                                localStorage.setItem(`__APPVERSION_${app}`, JSON.stringify({
                                                                    "version": updateResponse.app_version,
                                                                    "build": updateResponse[`${crossplat.device.platform}_build_number`]
                                                                }));
                                                                sessionStorage.setItem(`__APPSTATUS`, 'NAVIGATE');
                                                                if (crossplat.device.platform == 'iOS') {
                                                                    location.href = window.WkWebView.convertFilePath(config['apps'][app]);
                                                                } else {
                                                                    location.href = config['apps'][app];
                                                                }
                                                            }).catch((err) => {
                                                                $(statusElement).html(err);
                                                                reject(err);
                                                            })
                                                        })
                                                        .catch((err) => {
                                                            reject(err);
                                                        });
                                                } else {
                                                    //console.log("navigating app");
                                                    if (crossplat.device.platform == 'iOS') {
                                                        location.href = window.WkWebView.convertFilePath(config['apps'][app]);
                                                    } else {
                                                        location.href = config['apps'][app];
                                                    }
                                                }
                                            } else {
                                                $(statusElement).html(`Error While getting app version`);
                                            }
                                        }, 200);
                                    });
                                })
                                .catch((err) => {
                                    $(statusElement).html(`Downloading App`);
                                    let updateFileName = `${app}_${updateResponse.app_version.replace('.', '_')}_${updateResponse[`${crossplat.device.platform}_build_number`]}.zip`;
                                    appManager.downloadApp(app, updateFileName)
                                        .then(() => {
                                            $(statusElement).html(`Downloading Completed`);
                                            appManager.extractResources(`${appManager.tempPath}/${updateFileName}`, `${cordova.file.dataDirectory}${app}`, function (progressEvent) {
                                                $(statusElement).html(`Extracting Resources...(${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%)`);
                                            }).then(() => {
                                                localStorage.setItem(`__APPVERSION_${app}`, JSON.stringify({
                                                    "version": updateResponse.app_version,
                                                    "build": updateResponse[`${crossplat.device.platform}_build_number`]
                                                }));
                                                sessionStorage.setItem(`__APPSTATUS`, 'NAVIGATE');
                                                if (crossplat.device.platform == 'iOS') {
                                                    location.href = window.WkWebView.convertFilePath(config['apps'][app]);
                                                } else {
                                                    location.href = config['apps'][app];
                                                }
                                            }).catch((err) => {
                                                reject(err);
                                                $(statusElement).html(err);
                                            })
                                        })
                                        .catch((err) => {
                                            reject(err);
                                        });

                                });
                        })
                        .catch((err) => {
                            Materialize.toast("Error while checking update", 3000, 'error-alert');
                            reject(err);
                        });
                } else {
                    //offline case
                    appManager.getDirectoryEntry(`${cordova.file.dataDirectory}${app}`)
                        .then(() => {
                            sessionStorage.setItem(`__APPSTATUS`, 'NAVIGATE');
                            if (crossplat.device.platform == 'iOS') {
                                location.href = window.WkWebView.convertFilePath(config['apps'][app]);
                            } else {
                                location.href = config['apps'][app];
                            }
                        })
                        .catch(() => {
                            Materialize.toast("You are offlline!!!", 3000, 'error-alert');
                        });
                }
            });
        });
    }
}
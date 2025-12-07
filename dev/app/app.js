document.addEventListener('filenotfound', function () {
    alert("filenotfound");
}, false);
document.addEventListener('pagenotfound', function () {
    setTimeout(function () {
        console.log("111")
        router.navigateUri('home');
    }, 500);
}, false);
document.addEventListener('page_error', function () {
    setTimeout(function () {
        console.log("111")
        router.navigateUri('home');
    }, 500);
}, false);
document.addEventListener('loaderror', function (e) {
    setTimeout(function () {
        console.log("111")
        router.navigateUri('home');
    }, 500);
});
var pdfViewerData = {};
var app = {
    env: 'staging',
    indexRoute: 'jeevi/app/hub',
    backButton: {
        pressedTime: '',
        waitTime: 2000
    },
    online: false,
    init: function (callback) {
        console.log("inside the init");
        if (crossplat.device.platform == 'iOS' || crossplat.device.platform == 'Android') {
            console.log("inside android/ios");
            //detect if internet connection is there
            if (navigator.onLine) {
                console.log("inside navigator online");
                if (!localStorage.getItem('__DEVSTATUS')) {
                    console.log("if cond");
                    window.handleOpenURL = function (url) {
                        setTimeout(function () {
                            console.log('handleopenurl event', url);
                            cordova.plugins.browsertab.close();
                            if (url) {
                                const urlSearchParams = new URLSearchParams(url.split("djbusiness://device").pop());
                                const urlQueryParms = Object.fromEntries(urlSearchParams.entries());

                                localStorage.setItem('device_id', urlQueryParms.id);
                                crossplat.device.uuid = urlQueryParms.id;
                                localStorage.setItem('__DEVSTATUS', 'TRUE');
                                if (!sessionStorage.getItem('__APPSTATUS')) {
                                    appManager.init();
                                } else {
                                    callback();
                                }
                            }
                        }, 0);
                    }
                } else {
                    console.log("else cond");
                    if (!sessionStorage.getItem('__APPSTATUS')) {
                        appManager.init();
                    } else {
                        callback();
                    }
                }
            } else {
                console.log("internet is not present")
                var $toastContent = $('<span>You are offline!!!</span>').add($('<button class="btn-flat toast-action" id="network-retry-btn">retry</button>'));
                Materialize.toast($toastContent);

                //event listener for retry network
                var retry_btn = document.querySelector("#network-retry-btn");
                if (retry_btn) {
                    retry_btn.addEventListener("click", function (event) {
                        if (navigator.onLine) {
                            if (!sessionStorage.getItem('__APPSTATUS')) {
                                appManager.init();
                            } else {
                                callback();
                            }
                        }
                    }, false);
                }
            }
        } else {
            callback();
        }
    },
    start: function () {
        setTimeout(function () {
            console.log("start method")
            if (crossplat.device.platform == "Android" || crossplat.device.platform == "iOS") {
                if (localStorage.getItem('navigate_to_digibiz_role')) {
                    if (localStorage.getItem('navigate_to_digibiz_role') == "administrator") {
                        location.hash = `business_owner/business/list`;
                    } else if (localStorage.getItem('navigate_to_digibiz_role') == "employee") {
                        location.hash = `employee/business/list`;
                    } else if (localStorage.getItem('navigate_to_digibiz_role') == "customer") {
                        location.hash = `customer/business/list`;
                    } else if (localStorage.getItem('navigate_to_digibiz_role') == "jeevi") {
                        location.hash = `jeevi/app/hub`;
                    } else if (localStorage.getItem('navigate_to_digibiz_role') == "request") {
                        location.hash = `digibiz/notifications`;
                    }
                } else if (sessionStorage.getItem('__APPSTATUS') == "NAVIGATE" && sessionStorage.getItem('__NAVIGATE_FROM') == "core") {
                    var getParams = JSON.parse(sessionStorage.getItem('__NAVIGATE_PARMS'));
                    console.log("getParams", getParams);
                    if (getParams.purpose == "jeevi_profile" || getParams.purpose == "devices" || getParams.purpose == "settings_security") {
                        sessionStorage.removeItem('__APPSTATUS');
                        sessionStorage.removeItem('__NAVIGATE_FROM');
                        sessionStorage.removeItem('__NAVIGATE_PARMS');
                        location.hash = `digibiz/profile`;
                    }
                } else {
                    console.log("There is no navigate_to_digibiz_role session variable")
                }
            } else {
                console.log("Platform is not Android/iOS")
                if (sessionStorage.getItem('__APPSTATUS') == "NAVIGATE" && sessionStorage.getItem('__NAVIGATE_FROM') == "core") {
                    var getParams = JSON.parse(sessionStorage.getItem('__NAVIGATE_PARMS'));
                    console.log("getParams", getParams);
                    if (getParams.purpose == "jeevi_profile" || getParams.purpose == "devices" || getParams.purpose == "settings_security") {
                        sessionStorage.removeItem('__APPSTATUS');
                        sessionStorage.removeItem('__NAVIGATE_FROM');
                        sessionStorage.removeItem('__NAVIGATE_PARMS');
                        location.hash = `digibiz/profile`;
                    }
                }
            }


            if (localStorage.getItem('navigate_role_from')) {
                if (localStorage.getItem('navigate_role_from') == "employee") {
                    localStorage.removeItem('navigate_role_from');
                    location.hash = `employee/business/apps/hub`;
                } else if (localStorage.getItem('navigate_role_from') == "customer") {
                    localStorage.removeItem('navigate_role_from');
                    location.hash = `customer/business/apps/hub`;
                } else {
                    localStorage.removeItem('navigate_role_from');
                    location.hash = `jeevi/app/hub`;
                }
            }


            // if (localStorage.getItem('navigate_role')) {
            //     //console.log("cheeeeck", localStorage.getItem('navigate_role'))
            //     if (localStorage.getItem('navigate_role') !== undefined && localStorage.getItem('navigate_role') != null && localStorage.getItem('navigate_role') != "") {
            //         //console.log("123")
            //         if (localStorage.getItem('navigate_role') == "employee") {
            //             // setTimeout(function () {
            //             localStorage.setItem('navigate_role', "");
            //             localStorage.removeItem('navigate_role');
            //             //console.log("789")
            //             location.hash = `employee/business/list`;
            //             // }, 100);
            //             //console.log("456")
            //         } else if (localStorage.getItem('navigate_role') == "customer") {
            //             // setTimeout(function () {
            //             localStorage.setItem('navigate_role', "");
            //             localStorage.removeItem('navigate_role');
            //             location.hash = `customer/business/list`;
            //             // }, 100);
            //         } else {
            //             // setTimeout(function () {
            //             localStorage.setItem('navigate_role', "");
            //             localStorage.removeItem('navigate_role');
            //             location.hash = `prospect/app/hub`;
            //             // }, 100);

            //         }
            //     }
            // }
            // if (crossplat.device.platform == 'browser') {
            //     //check for different tabs
            //     broadcast = new BroadcastChannel("new_window");
            //     //console.log("broadcast", broadcast);
            //     broadcast.postMessage((new Date).getTime() + Math.random());
            //     broadcast.onmessage = function (ev) {
            //         app.newWindowPrompt();
            //     }
            // }

            if (crossplat.device.platform === "Android" || crossplat.device.platform === 'iOS') {
                //lock orientation
                screen.orientation.lock('portrait');


                if (crossplat.device.platform == 'iOS') {
                    //set ios keyboard settings
                    Keyboard.hideFormAccessoryBar(true);
                    Keyboard.shrinkView(true);
                    Keyboard.disableScrollingInShrinkView(true);
                }

                if (FirebasePlugin) {
                    if (crossplat.device.platform == 'iOS' && !localStorage.getItem('ios_notification_check')) {
                        FirebasePlugin.grantPermission(function (hasPermission) {
                            console.log("Permission was " + (hasPermission ? "granted" : "denied"));
                            localStorage.setItem('ios_notification_check', (hasPermission ? "granted" : "denied"))
                        });
                    }

                    // notification 
                    FirebasePlugin.clearAllNotifications();

                    //on token refresh
                    FirebasePlugin.onTokenRefresh(function (fcmToken) {
                        console.log("Token refresh", fcmToken);
                    }, function (error) {
                        console.error(error);
                    });

                    //on notification received
                    FirebasePlugin.onMessageReceived(function (message) {
                        console.log("message type", message.messageType);
                        if (message.messageType === "notification") {
                            if (message.tap) {
                                appManager.navigateToApp(message.notification_app);
                            }
                        }
                    }, function (error) {
                        console.error(error);
                    });
                }

            }

            if (crossplat.device.platform == "Android") {
                console.log("12345")
                // custom url scheme
                window.handleOpenURL = function (url) {
                    if (url) {
                        console.log("url", url);
                        var path = url.split('pathCode=').pop();
                        console.log("path", path);
                        var status = url.split("status=")[1].split("&")[0];
                        console.log("status", status);
                        sessionStorage.removeItem('successCode');
                        sessionStorage.removeItem('authErrorCode');
                        if (status && status == 'false') {
                            var errMsg = decodeURIComponent(url.split('msg=').pop());
                            sessionStorage.setItem('authErrorCode', JSON.stringify(errMsg));
                            console.log("errMsg", errMsg);
                        } else if (status && status == 'true') {
                            var successMsg = decodeURIComponent(url.split('msg=').pop());
                            console.log("successMsg", JSON.stringify(successMsg));
                            sessionStorage.setItem('successCode', JSON.stringify(successMsg));
                        }
                        if (path == 1 || path == "1") {
                            router.navigateUri('business/add');
                        } else if (path == 2 || path == "2") {
                            router.navigateUri('business/edit');
                        } else if (path == 3 || path == "3") {
                            router.navigateUri('business/storage');
                        } else if (path == 4 || path == "4") {
                            router.navigateUri('digibiz/account/storage');
                        }
                    }
                }
            }

            if (window.location.hash) {
                // console.log("111", window.location.hash)
                router.navigateUri(window.location.hash.substr(1));
            } else {
                // console.log("111", app.indexRoute)
                router.navigateUri(app.indexRoute);
            }
            // add platform in body
            $('body').attr('platform', crossplat.device.platform);


            //back button click message
            document.addEventListener("backbutton", function () {
                if (new Date().getTime() - app.backButton.lastTimeBackPress < app.backButton.waitTime) {
                    console.log("NAVIGATING TO CORE")
                    setTimeout(function () {
                        deviceHelper.navigateToAccounts('core');
                    }, 1000);
                } else {
                    window.plugins.toast.showLongBottom("Please navigate using menu or press again to exit the app");
                    app.backButton.lastTimeBackPress = new Date().getTime();
                }
            }, false);

            //on resume of application
            document.addEventListener("resume", function () {
                app.checkIfSession(function (status) {
                    if (!status) {
                        deviceHelper.navigateToAccounts('core');
                    }
                });

                app.checkJeeviDetails(function (status) {
                    if (!status) {
                        deviceHelper.navigateToAccounts('core');
                    }
                });
                app.socketEmit();
            }, false);

            //on online of the application
            document.addEventListener("online", function () {
                if (!app.online) {
                    window.plugins.toast.showLongBottom("Device is Online now");
                    app.socketEmit();
                    $("body").removeClass('offline');
                    $("body").addClass('online');
                    app.online = true;
                }
            }, false);

            //on offline of the application
            document.addEventListener("offline", function () {
                app.online = false;
                $("body").removeClass('online');
                $("body").addClass('offline');
                window.plugins.toast.showLongBottom("Device is Offline");
            }, false);


            //cache service worker
            // if (crossplat.device.platform == 'browser' || crossplat.device.platform == 'desktop') {
            //     navigator.serviceWorker.register('../sw.js').then(
            //         () => {
            //             // registered
            //             //console.log('registered');
            //         },
            //         err => {
            //             console.error('SW registration failed! 😱', err)
            //         });
            // }

            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function (registrations) {
                    for (let registration of registrations) {
                        registration.unregister()
                    }
                }).catch(function (err) {
                    console.log('Service Worker registration failed: ', err);
                });
            }

            //sockets init
            sockets.init();

            // // Dark Mode selection 
            // const currentTheme = localStorage.getItem('theme');
            // if (currentTheme && currentTheme === 'on') {
            //     document.documentElement.setAttribute('data-darkmode', currentTheme);
            // }   
        }, 500);
    },
    logout: function () {
        var requestParams = {
            device_id: crossplat.device.uuid,
            app:'business'
        }
        fetch.apiCall(function (response, status, xhr) {
            if (status === "success") {
                sockets.coreSocket.emit('joinroom', crossplat.device.uuid);
                sockets.coreSocket.emit('leaveroom', sessionStorage.getItem('socketID'));
                // __firebase.unsubscribeTopic(sessionStorage.getItem('socketID'));
                sessionStorage.clear();
                // clearGlobals();
                setTimeout(function () {
                    deviceHelper.navigateToAccounts('core');
                }, 1000);
            } else {
                var jsonResponse = JSON.parse(response.responseText);
            }
        }, api.logout, "POST", "JSON", requestParams);
    },
    socketEmit: function () {
        if (sessionStorage.getItem('socketID')) {
            sockets.coreSocket.emit('joinroom', sessionStorage.getItem('socketID'));
            sockets.digibizSocket.emit('joinroom', sessionStorage.getItem('socketID'));
            sockets.searchSocket.emit('joinroom', crossplat.device.uuid);
        } else {
            var requestParams = {
                device_id: crossplat.device.uuid,
            }
            fetch.apiCall(function (response, status, xhr) {
                if (status === "success") {
                    sessionStorage.setItem('socketID', response.Data.socketid);
                    sockets.coreSocket.emit('joinroom', response.Data.socketid);
                    sockets.digibizSocket.emit('joinroom', response.Data.socketid);
                    sockets.searchSocket.emit('joinroom', crossplat.device.uuid);
                } else {
                    sockets.coreSocket.emit('joinroom', crossplat.device.uuid);
                }
            }, api.get_session, "POST", "JSON", requestParams);
        }
    },
    newWindowPrompt: function () {
        var alert_parms = {
            alert_id: "window-prompt",
            alert_platform: crossplat.device.platform,
            alert_title: "",
            alert_body: `This page is already opened in different tab.`,
            alert_btn: [{
                name: "Use There",
                attr: [{ name: "id", value: "close-window-prompt" }]
            },
            {
                name: "Use Here",
                attr: [{ name: "id", value: "show-window-prompt" }]
            }]
        }
        showAlert(alert_parms, function () {
            document.querySelector("#show-window-prompt").addEventListener("click", function () {
                broadcast.postMessage((new Date).getTime() + Math.random());
                $("#window-prompt").remove();
            });
            document.querySelector("#close-window-prompt").addEventListener("click", function () {
                window.location = config.web.hub;
            });
        });
    },
    change: function () {
        //socket init
        sockets.init();

        // if (crossplat.device.platform == 'browser') {
        //     //check for different tabs
        //     broadcast = new BroadcastChannel("new_window");
        //     broadcast.postMessage((new Date).getTime() + Math.random());
        //     broadcast.onmessage = function (ev) {
        //         app.newWindowPrompt();
        //     }
        // }
        setTimeout(function () {
            if (window.location.hash) {
                console.log("111")
                router.navigateUri(window.location.hash.substr(1));
            } else {
                console.log("11122")
                router.navigateUri(app.indexRoute);
            }
        }, 500);
    },

    checkIfSession(callback) {
        var requestParams = {
            device_id: crossplat.device.uuid,
        }
        fetch.apiCall(function (response, status, xhr) {
            if (status === "success") {
                callback(true);
            } else {
                deviceHelper.navigateToAccounts('core');
            }
        }, api.get_session, "POST", "JSON", requestParams);
    },

    checkJeeviDetails(callback){
        var requestParams = {
            device_id: crossplat.device.uuid,
        }
        fetch.apiCall(function (response, status, xhr) {
            if (status === "success") {
                callback(true);
            } else {
                deviceHelper.navigateToAccounts('core');
            }
        }, api.checkJeeviDetails, "POST", "JSON", requestParams);
    }
};
Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var crossplat = {
    app: {},
    device: {},
    initialize: function (callback) {
        crossplat.loadJsCss('./framework/assets/css/normalize.css', 'text/css', 'head', 'base')
            .then(() => {
                crossplat.loadJsCss('./framework/assets/css/loader.css', 'text/css', 'head', 'base')
                    .then(() => {
                        crossplat.loadPackages(function () {
                            callback();
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    },
    loadPackages: function (callback) {
        jQuery.getJSON("./app/app.json", function (json) {
            crossplat.app = json;
            callback();
        });
    },

    loadFile: function (urlToFile, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', urlToFile, true);
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status == 0) {
                    callback(xhr.responseText);
                } else {
                    callback(false);
                }
            } else {
                callback(false);
            }
        };
        xhr.onerror = function (e) {
            callback(false);
        };
        xhr.send();
    },

    loadJsCss: function (path, type, destination, reference) {
        return new Promise((resolve, reject) => {
            var data = {
                path: path,
                type: type,
                destination: destination,
                reference: reference
            };
            var fileref;
            if (type == "text/javascript") {
                fileref = document.createElement('script');
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", path);
                fileref.setAttribute("route", reference);
            } else if (type == "text/css") {
                fileref = document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", path);
                fileref.setAttribute("route", reference);
            }
            if (typeof fileref != "undefined") {
                document.getElementsByTagName(destination)[0].appendChild(fileref);
                fileref.onload = function () {
                    resolve(true);
                }
            } else {
                var evt = new CustomEvent("loaderror", { detail: data });
                document.dispatchEvent(evt);
                reject("load Error");
            }
        })
    },

    removeJsCss: function (filename, filetype) {
        var targetelement = (filetype == "text/javascript") ? "script" : (filetype == "text/css") ? "link" : "none";
        var targetattr = (filetype == "text/javascript") ? "src" : (filetype == "text/css") ? "href" : "none";
        var allsuspects = document.getElementsByTagName(targetelement);
        for (let i = allsuspects.length; i >= 0; i--) {
            if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
                allsuspects[i].parentNode.removeChild(allsuspects[i]);
        }
    },
    generateDeviceID: function () {
        var nav = window.navigator;
        var date = new Date();
        var screen = window.screen;
        var guid = nav.mimeTypes.length;
        guid += nav.userAgent.replace(/\D+/g, '');
        guid += nav.plugins.length;
        guid += screen.height || '';
        guid += screen.width || '';
        guid += screen.pixelDepth || '';
        guid += date.getTime() || '';
        guid += window.performance.now() || '';
        return guid;
    },
    getBrowserName: function () {
        var sBrowser, sUsrAg = navigator.userAgent;
        if (sUsrAg.indexOf("Firefox") > -1) {
            sBrowser = "mozilla";
        } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
            sBrowser = "Samsung_Internet";
            // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
        } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
            sBrowser = "opera";
            // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
        } else if (sUsrAg.indexOf("Trident") > -1) {
            sBrowser = "internet_explorer";
            // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
        } else if (sUsrAg.indexOf("Edge") > -1) {
            sBrowser = "edge";
            // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
        } else if (sUsrAg.indexOf("Chrome") > -1) {
            sBrowser = "chrome";
            // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
        } else if (sUsrAg.indexOf("Safari") > -1) {
            sBrowser = "safari";
            // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
        } else {
            sBrowser = "unknown";
        }
        return sBrowser;
    }
};

var fetch = {
    getHtml: function (callback, view, identifier, data = null) {
        crossplat.loadFile('./app/views/render/' + view + '.html', function (response) {
            if (response) {
                var $div = $("<div>");
                $("body").append($div);
                $($div).append(response);
                var templateHtml = $(identifier).html();
                var templateScript = Handlebars.compile(templateHtml);
                var html = templateScript(data);
                $($div).remove();
                callback(null, html);
            } else {
                callback(response);
            }
        });
    },

    replaceHtml: function (callback, view, identifier, template, data = null) {
        fetch.getHtml(function (error, response) {
            if (error) {
                callback(error);
            } else {
                if ($(template).length) {
                    $("#loader").fadeIn("slow", function () {
                        $(this).addClass("loader");
                    });
                    $(template).html(response).promise().done(function () {
                        fetch.loadhref();
                        callback();
                    });
                } else {
                    console.error(template + "does not exist");
                }
            }
        }, view, identifier, data);
    },

    appendHtml: function (callback, view, identifier, template, data = null) {
        fetch.getHtml(function (error, response) {
            if (error) {
                callback(error);
            } else {
                if ($(template).length) {
                    $(template).append(response).promise().done(function () {
                        fetch.loadhref();
                        callback();
                    });
                } else {
                    console.error(template + "does not exist");
                }
            }
        }, view, identifier, data);
    },

    prependHtml: function (callback, view, identifier, template, data = null) {
        fetch.getHtml(function (error, response) {
            if (error) {
                callback(error);
            } else {
                if ($(template).length) {
                    $(template).prepend(response).promise().done(function () {
                        fetch.loadhref();
                        callback();
                    });
                } else {
                    console.error(template + "does not exist");
                }
            }
        }, view, identifier, data);
    },

    loadhref: function () {
        $('a').each(function (index, element) {
            if ($(element)[0].hasAttribute("data-href")) {
                $(element).attr('href', '#' + window.urls.get($(element).attr('data-href')));
            }
        });
        $('img').each(function (index, element) {
            if ($(element)[0].hasAttribute("data-href")) {
                $(element).attr('src', window.urls.get($(element).attr('data-href')));
            }
        });
    },
    apiCall: function (callback, requestApi, requestMethod, dataType = null, requestParams = null, requestHeader = null) {
        $.ajax({
            type: requestMethod,
            data: requestParams,
            url: requestApi,
            dataType: dataType,
            success: function (response, status, xhr) {
                callback(response, status, xhr);
            },
            error: function (error, status, xhr) {
                callback(error, status, xhr);
            }
        });
    },
    addLoader: function (element) {
        $(element).addClass('loader');
    },
    removeLoader: function (element) {
        $(element).removeClass('loader');
    }
};

var urls = {
    get: function (name) {
        return (crossplat.app.urls[name]);
    }
};

var router = {
    page: "",
    clearEvents: function () {
        $(document).off('click').off('dblclick').off('mouseenter').off('mouseleave').off('keypress').off('keydown').off('keyup').off('submit').off('change').off('focus').off('blur').off('load').off('resize').off('scroll').off('unload');
    },
    getRoutesByUri: function (uri, callback) {
        let package, route;
        for (let package_index in crossplat.app.packages) {
            package = crossplat.app.packages[package_index];
            for (let route_index in package.routes) {
                route = package.routes[route_index];
                if (route.uri === uri) {
                    callback(route);
                    break;
                } else {
                    router.checkDataUri(route.uri, uri, function (data) {
                        if (data != null) {
                            callback(route, data);
                        }
                        if (data === false) {
                            var evt = new CustomEvent("loaderror", { detail: details });
                            document.dispatchEvent(evt);
                        }
                    });
                }
            }
        }
    },
    checkDataUri: function (route, uri, callback) {
        if (route !== undefined) {
            if (route.split("/").length === uri.split("/").length) {
                real_route = route.split("{")[0];
                if (!uri.indexOf(real_route)) {
                    var data = [];
                    var expression = new RegExp('{' + '(.*?)' + '}', 'gm');
                    real_var = route.match(expression);
                    real_data = uri.split(real_route)[1].split("/");
                    for (let index in real_var) {
                        variables = real_var[index];
                        key = variables.slice(1, -1);
                        data[key] = real_data[index];
                        if (index == real_var.length - 1) {
                            callback(data);
                            break;
                        }
                    }
                }
            } else {
                callback(null);
            }
        } else {
            callback(false);
        }

    },
    navigateUri: function (uri) {
        console.log("uri", uri);
        router.getRoutesByUri(uri, function (route, uriData) {
            if (route.middlewares && route.middlewares.length > 0) {
                var middleware_flag = false;
                var middleware_data = [];
                let counter = 0;
                let route_middleware;
                for (let index in route.middlewares) {
                    route_middleware = route.middlewares[index];
                    try {
                        window[crossplat.app.middlewares[route_middleware]](function (next, data) {
                            counter++;
                            if (data) {
                                middleware_data[route_middleware] = data;
                            }
                            middleware_flag = next;
                            if (counter == Object.keys(route.middlewares).length) {
                                if (middleware_flag) {
                                    if (router.page != route.name) {
                                        router.loadPage(route, uriData, middleware_data, true);
                                    } else {
                                        router.loadPage(route, uriData, middleware_data, false);
                                    }
                                } else {
                                    document.dispatchEvent(new CustomEvent('page_error'));
                                }
                            }
                        });
                    } catch (e) {
                        document.dispatchEvent(new CustomEvent('page_error'));
                    }
                }
            } else {
                if (router.page != route.name) {
                    router.loadPage(route, uriData, null, true);
                } else {
                    router.loadPage(route, uriData, null, false);
                }
            }
        });
    },
    loadPage: function (route, uriData = null, middleware_data = null, load = true) {
        if (load) {
            router.clearEvents();
            resources.loadResources(route)
                .then(() => {
                    setTimeout(() => {
                        window.eval(window.eval(route.package)[route.method](function () {
                            resources.removeResources(function () {
                                router.page = route.name;
                                document.getElementsByTagName("BODY")[0].setAttribute("app", route.name);
                            });
                        }, uriData, middleware_data));
                    }, 100);
                })
                .catch((e) => {
                    if (e instanceof TypeError) {
                        document.dispatchEvent(new CustomEvent('filenotfound'));
                    }
                });
            // resources.loadResources(route, function () {
            //     try {

            //         window.eval(window.eval(route.package)[route.method](function () {
            //             resources.removeResources(function () {
            //                 fetch.removeLoader('body');
            //                 router.page = route.name;
            //                 document.getElementsByTagName("BODY")[0].setAttribute("app", route.name);
            //             });
            //         }, uriData, middleware_data));
            //     } catch (e) {
            //         if (e instanceof TypeError) {
            //             document.dispatchEvent(new CustomEvent('filenotfound'));
            //         }
            //     }
            // });
        } else {
            try {
                window.eval(window.eval(route.package)[route.method](function () {
                    router.page = route.name;
                    document.getElementsByTagName("BODY")[0].setAttribute("app", route.name);
                }, uriData));
            } catch (e) {
                if (e instanceof TypeError) {
                    document.dispatchEvent(new CustomEvent('filenotfound'));
                }
            }
        }
    }
};

var resources = {
    loadResources: function (route) {
        return new Promise((resolve, reject) => {
            try {
                crossplat.loadJsCss(`./app/packages/${route.package}/${route.name}/build.js`, 'text/javascript', 'head', route.name)
                    .then(() => {
                        crossplat.loadJsCss(`./app/packages/${route.package}/${route.name}/build.css`, 'text/css', 'head', route.name)
                            .then(() => {
                                resolve();
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } catch (err) {
                reject(err);
            }
        });
        // callback();
        // console.log("resources loaded");
    },
    removeResources: function (callback) {
        route = document.getElementsByTagName('BODY')[0].getAttribute('app');
        if (route != null) {
            $('script[route=' + route + ']').remove();
            $('link[route=' + route + ']').remove();
        }
        callback();
    }
};

document.addEventListener('deviceready', function () {
    try {
        const machine = require('node-machine-id');
        crossplat.device.platform = "desktop";
        crossplat.device.uuid = machine.machineIdSync();
        crossplat.device.model = crossplat.getBrowserName();
        crossplat.device.agent = navigator.userAgent;
    } catch (e) {
        crossplat.device = device;
        crossplat.device.agent = navigator.userAgent;
        crossplat.device.model = crossplat.getBrowserName();
        if (!device.uuid) {
            console.log("generating device id from generatedeviceID");
            crossplat.device.uuid = crossplat.generateDeviceID();
        }
    }
    crossplat.loadJsCss(`./app/assets/js/build.js`, 'text/javascript', 'head', 'base')
        .then(() => {
            crossplat.loadJsCss(`./app/assets/css/build.css`, 'text/css', 'head', 'base')
                .then(() => {
                    crossplat.initialize(function () {
                        app.init(function () {
                            app.start();
                        });
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}, false);



window.addEventListener("hashchange", app.change, false);
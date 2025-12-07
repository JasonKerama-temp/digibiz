class Chunkuploader {
    constructor({ elementIdentifier, postUrl, fileIdentifierRule, attributes, splitter = 8, preview = false, fileIdentifierLength = 10, limit }, handler) {
        var self = this;
        this._elementIdentifier = elementIdentifier;
        this._postURL = postUrl;
        this._splitter = splitter;
        this._customAttributes = attributes;
        this._preview = preview;
        this._fileIdentifierRule = (fileIdentifierRule) ? fileIdentifierRule : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        this._fileIdentifierLength = fileIdentifierLength;
        this._fileIdentifier = [];
        this._files = {};
        this._events = {};
        this._chunks = {};
        this._xhr = {};
        if (elementIdentifier) {
            document.querySelector(elementIdentifier).addEventListener("click", function fileClick(event) {
                this.value = null;
            });
            document.querySelector(elementIdentifier).addEventListener("change", function fileChange(event) {
                self.calculateFiles(event.target.files)
                    .then((filesResult) => {
                        if (limit && (filesResult.count > limit.files || filesResult.size > limit.size)) {
                            if (filesResult.count > limit.files) {
                                Materialize.toast('You can not select more than 5 files', 3000, 'rounded error-alert');
                            }
                            if (filesResult.size > limit.size) {
                                Materialize.toast('You can select maximum 100 MB at a time', 4000, 'round error-alert');
                            }
                            self.dispatch("error", { type: "validation", message: "validation error from the files limit" });
                            return null;
                        }
                        Object.keys(event.target.files).map((key) => {
                            self.addFiles(event.target.files[key], self.generateIdentifier(self._fileIdentifierLength));
                        });
                    })
                    .catch((error) => {
                        return null;
                    });
            });
            document.querySelector(elementIdentifier).addEventListener("change", handler);
        }
    }
    on(event, handler) {
        this._events[event] = handler;
    }
    dispatch(event, data) {
        if (this._events[event]) {
            this._events[event](data);
        }
    }
    calculateFiles(files) {
        let response = {};
        response.count = files.length;
        response.size = 0;
        return new Promise((resolve, reject) => {
            Object.keys(files).map((key) => {
                response.size += parseInt(files[key].size);
            });
            if (response) {
                resolve(response);
            } else {
                reject(new error("Could not process request"));
            }
        });
    }
    generateIdentifier(length) {
        var self = this;
        var uniqueText = "";
        var rule = this._fileIdentifierRule;
        for (var i = 0; i < length; i++) {
            uniqueText += rule.charAt(Math.floor(Math.random() * rule.length));
        }
        if (!self._fileIdentifier.includes(uniqueText)) {
            self._fileIdentifier.push(uniqueText);
            return uniqueText;
        } else {
            return generateIdentifier(length);
        }
    }
    generateElement(file, callback) {
        var type = typeof (file.type) == "object" ? file.type.type.split('/')[0] : file.type.split('/')[0];
        var extension = typeof (file.type) == "object" ? file.type.type.split('/')[1] : file.type.split('/')[1];
        let element;
        switch (type) {
            case 'image':
                element = document.createElement('img');
                element.setAttribute("class", "preview-element responsive-img");
                break;
            case 'audio':
                element = document.createElement('audio');
                element.setAttribute('controls', true);
                element.setAttribute("class", "preview-element responsive-audio");
                break;
            case 'video':
                element = document.createElement('video');
                element.setAttribute('controls', true);
                element.setAttribute("class", "preview-element responsive-video");
                break;
            case 'application':
                element = document.createElement('embed');
                element.setAttribute("class", "preview-element");
                element.setAttribute("alt", extension);
                element.setAttribute("pluginspage", "http://www.adobe.com/products/acrobat/readstep2.html");
                break;
            default:
                return callback();
        }
        var reader = new FileReader();
        reader.onload = function (event) {
            element.src = event.target.result;
            return callback(element);
        };
        reader.readAsDataURL(file);
    }
    addFiles(file, identifier) {
        var self = this;
        var data = {};
        data[identifier] = { totalSize: parseInt(file.size), file };
        Object.assign(self._files, data);
        if (self._preview) {
            self.generateElement(file, (element) => {
                self.dispatch("added", { identifier, file, element });
            });
        } else {
            self.dispatch("added", { identifier, file });
        }
    }
    removeFile(identifier, callback) {
        var self = this;
        delete self._files[identifier];
        callback(identifier);
    }
    uploadFiles(postUrl, attributes, splitter) {
        var self = this;
        let filesToBeUploaded = this._files;
        let apiMethod = (postUrl) ? postUrl : this._postURL;
        let parameters = (attributes) ? attributes : this._customAttributes;
        self._splitter = (splitter) ? splitter : self._splitter;
        if (apiMethod) {
            console.log("uploading files");
            self._files = {};
            self._fileIdentifier = [];
            Object.keys(filesToBeUploaded).map((key) => {
                self.uploadChunk(key, filesToBeUploaded[key]['file'], apiMethod, parameters);
            });
        }
    }
    uploadData(content, filename, mime, splitter) {
        var self = this;
        self._splitter = (splitter) ? splitter : self._splitter;
        try {
            let file = new File([self.base64ToArrayBuffer(content)], filename, { type: mime });
            self.addFiles(file, self.generateIdentifier(self._fileIdentifierLength));
        } catch (error) {
            return error;
        }
        // fetch(content)
        //     .then(function(res) {
        //         return res.arrayBuffer();
        //     })
        //     .then(function(buf) {
        //         try {
        //             let file = new File([buf], filename, { type: mime });
        //             self.addFiles(file, self.generateIdentifier(self._fileIdentifierLength));
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     });
    }
    base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
    uploadChunk(identifier, file, postUrl, parameters) {
        var self = this;
        var loaded = 0;
        var chunknumber = 0;
        var start = 0;
        var progress = 0;
        var total = parseInt(file.size);
        var step = Math.ceil(parseInt(file.size) / self._splitter);
        var data = { identifier, fileName: file.name, totalChunks: Math.ceil(total / step), totalSize: file.size };
        self._chunks[identifier] = { identifier, totalChunks: Math.ceil(total / step), chunksCollected: [], progress, fileName: file.name, totalSize: file.size };
        self.dispatch("start", data);
        var reader = new FileReader();
        reader.onload = function (event) {
            if (event.target.error == null) {
                var formData = new FormData();
                formData.append("chunk", blob);
                formData.append("identifier", identifier);
                formData.append("fileName", file.name);
                formData.append("type", file.type);
                formData.append("extension", file.name.split('.').pop());
                formData.append("totalSize", total);
                formData.append("chunkSize", step);
                formData.append("currentChunkSize", blob.size);
                formData.append("currentChunkNumber", chunknumber);
                formData.append("totalChunkNumber", Math.ceil(total / step));
                if (parameters) {
                    Object.keys(parameters).map((attribute) => {
                        formData.append(attribute, parameters[attribute]);
                    });
                }
                var xhr = new XMLHttpRequest();
                var upload = xhr.upload;
                upload.addEventListener('load', function () {
                    loaded += step;
                    chunknumber++;
                    progress = Math.ceil((loaded / total) * 100);
                    if (loaded < total) {
                        blob = file.slice(loaded, loaded + step);
                        reader.readAsDataURL(blob);
                    } else {
                        loaded = total;
                    }
                }, false);
                xhr.addEventListener('load', function (event) {
                    if (event.target.status == 200) {
                        var res = JSON.parse(event.target.responseText);
                        self._chunks[res.data.identifier]['progress'] = 100;
                        self.dispatch("progress", self._chunks[res.data.identifier]);
                        self.dispatch("complete", res);
                    } else if (event.target.status >= 400) {
                        self.dispatch("failed", event.target.responseText);
                    }
                }, false);
                xhr.addEventListener('progress', function (event) {
                    if (event.target.status == 206) {
                        var res = JSON.parse(event.target.responseText);
                        self._chunks[res.data.identifier]['chunksCollected'].push(parseInt(res.data.currentChunkNumber));
                        self._chunks[res.data.identifier]['progress'] = progress;
                        self._chunks[res.data.identifier]['nextOffset'] = loaded;
                        self.dispatch("progress", self._chunks[res.data.identifier]);
                    }
                }, false);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 0) {
                        self.dispatch("error", { type: "network", message: "Network error" });
                    }
                };
                xhr.open("POST", postUrl, true);
                xhr.send(formData);
            } else {
                self.dispatch("failed", identifier);
                return;
            }
        };
        var blob = file.slice(start, step);
        reader.readAsDataURL(blob);
    }
}
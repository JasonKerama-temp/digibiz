Handlebars.registerHelper('ifcond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
Handlebars.registerHelper("encode", function (value, options) {
    value = Handlebars.Utils.escapeExpression(value);
    if (value) {
        let stringarray = value.split(" ");
        if (stringarray.length) {
            let newString = "";
            $.each(stringarray, function (index, stringElement) {
                //parse link
                let link = stringElement.match("(?:(?:https?|ftp):\\/\\/)?[\\w/\\-?=%.]+\\.[\\w/\\-?=%.]+");
                let hyperlink;
                if (link) {
                    if (!stringElement.includes('//')) {
                        hyperlink = `<a href="http://${stringElement}" target="_blank">${stringElement}</a>`;
                    } else {
                        hyperlink = `<a href="${stringElement}" target="_blank">${stringElement}</a>`;
                    }
                    newString = newString + " " + String(hyperlink);
                } else {
                    newString = newString + " " + stringElement;
                }
                if (stringarray.length == index + 1) {
                    data = newString;
                }
            });
            return new Handlebars.SafeString(data);
        } else {
            return value;
        }
    } else {
        return;
    }
});
Handlebars.registerHelper("firstletter", function (word, options) {
    if (word) {
        return word.charAt(0).toUpperCase();
    } else {
        return;
    }
});
Handlebars.registerHelper("firstletterCaps", function (word, options) {
    if (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
        return;
    }
});
Handlebars.registerHelper("core_api_url", function (options) {
    return config.api.core;
});
Handlebars.registerHelper("digibiz_api_url", function (options) {
    return config.api.digibiz;
});

Handlebars.registerHelper("filesize", function (bytes, options) {
    if (bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    } else {
        return;
    }
});
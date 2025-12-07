var emptycol = {
    getEmptyLayout: function (callback, view, identifier, template, data) {
        router.clearEvents();
        removeLoader();
        $(".global-loader-wrapper").remove();
        $('link.components').remove();
        // $('body').empty();
        // if (!$('#login-container').length) {
        console.log("@@@@")
        fetch.replaceHtml(function (error) {
            console.log("####")
            fetch.appendHtml(function (error) {
                console.log("removed logo display container")
                $('.logo-display-container').addClass('hide');
                callback(true);
            }, view, identifier, template, data);
        }, 'layouts/login', '#login-layout-web', '#app-root');
        // }
    }
};


var onecol = {
    getDigibizLayout: function (callback) {
        if ($('#onecol-layout').length == 0) {
            getUserProfile(function (err) {
                if (!err) {
                    if (!$('#digibiz_header').length) {
                        onecol.getLayout(function () {
                            onecol.getHeader(function () {
                                onecol.getUserSidebar(function () {
                                    onecol.getFileManger(function () {
                                        onecol.getNotification(function () {
                                            onecol.getAppSwitchSidebar(function () {
                                                $(".global-loader-wrapper").remove();
                                                removeLoader();
                                                showBackButton();
                                                callback();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    } else {
                        // //hide profile and bell icon
                        // if ($('body').attr('app') == "business_owner_business_list" || $('body').attr('app') == "employee_business_list" || $('body').attr('app') == "customer_business_list" || $('body').attr('app') == "prospect_app_hub_page" || $('body').attr('app') == "digibiz_notifications") {
                        //     console.log("check length111", $('#my-profile-menu'))
                        //     console.log("check length1111", $('#my-notifications-menu'))
                        //     $('#my-profile-menu').addClass('hide');
                        //     $('#my-notifications-menu').addClass('hide');
                        // }
                        console.log("11");
                        callback();
                    }
                } else {
                    console.log("22");
                    callback();
                }
            })
        } else {
            // //hide profile and bell icon
            // if ($('body').attr('app') == "business_owner_business_list" || $('body').attr('app') == "employee_business_list" || $('body').attr('app') == "customer_business_list" || $('body').attr('app') == "prospect_app_hub_page" || $('body').attr('app') == "digibiz_notifications") {
            //     console.log("check length111", $('#my-profile-menu'))
            //     console.log("check length1111", $('#my-notifications-menu'))
            //     $('#my-profile-menu').addClass('hide');
            //     $('#my-notifications-menu').addClass('hide');
            // }
            console.log("kjhgf");
        }
    },

    getLayout: (callback) => {
        fetch.replaceHtml(function (error) {
            $('.logo-display-container').remove();
            callback();
        }, 'layouts/one.col', '#onecol-layout', '#app-root');
    },
    getHeader: (callback) => {
        var profile = JSON.parse(sessionStorage.getItem('profile_details'));
        if (profile.pictures.profile_display.hasOwnProperty('image_id') && profile.pictures.profile_display.image_id) {
            var image = `${config.api.core}/api/individual/get_image?image_id=${profile.pictures.profile_display.image_id}&device_id=${crossplat.device.uuid}`;
        } else {
            var image = ``;
        }
        var headerData = {
            image_id: profile.pictures.profile_display.image_id,
            account_id: profile.individual.id,
            imageUrl: image,
            imageLetter: profile.individual.name.first.charAt(0).toUpperCase()
        }
        fetch.replaceHtml(function (error) {
            // //hide profile and bell icon
            // if ($('body').attr('app') == "business_owner_business_list" || $('body').attr('app') == "employee_business_list" || $('body').attr('app') == "customer_business_list" || $('body').attr('app') == "prospect_app_hub_page" || $('body').attr('app') == "digibiz_notifications") {
            //     console.log("check length111", $('#my-profile-menu'))
            //     console.log("check length1111", $('#my-notifications-menu'))
            //     $('#my-profile-menu').addClass('hide');
            //     $('#my-notifications-menu').addClass('hide');
            // }
            callback();
        }, 'sections/header', '#header-layout', '#digibiz_header', headerData);
    },
    getUserSidebar: (callback) => {
        var profile = JSON.parse(sessionStorage.getItem('profile_details'));
        if (profile.pictures.profile_display.hasOwnProperty('image_id') && profile.pictures.profile_display.image_id) {
            var image = `${config.api.core}/api/individual/get_image?image_id=${profile.pictures.profile_display.image_id}&device_id=${crossplat.device.uuid}`;
        } else {
            var image = ``;
        }
        var sidebarData = {
            account_id: profile.individual.id,
            name: profile.individual.name,
            mobileNumber: profile.login.mobile_number,
            user_name: profile.login.user_name,
            avatarUrl: profile.pictures.profile_display.image_id,
            imageUrl: image,
            imageLetter: profile.individual.name.first.charAt(0).toUpperCase(),
        }
        fetch.replaceHtml(function (error) {
            callback();
        }, 'sections/user_sidebar', '#user-menu-layout', '#profile-menu-toggle', sidebarData);
    },
    getAppSwitchSidebar: (callback) => {
        fetch.replaceHtml(function (error) {
            callback();
        }, 'sections/app_sidebar', '#app-menu-layout', '#app-menu-toggle');
    },
    getNotification: (callback) => {
        fetch.replaceHtml(function (error) {
            // alertExecutables();
            callback();
        }, 'sections/notifications', '#notifications-template', '#notifications_menu_toggle');
    },
    getFileManger: (callback) => {
        fetch.replaceHtml(function (error) {
            callback();
        }, 'sections/filemanager_sidebar', '#filemanager-sidebar-layout', '#filemanger_container_toggle');
    }
};
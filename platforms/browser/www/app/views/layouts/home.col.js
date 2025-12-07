var homecol = {
    getHomeLayout: function (callback) {
        if ($('#onecol-layout').length == 0) {
            getUserProfile(function (err) {
                if (!err) {
                    if (!$('#digibiz-layout-main-contentbox').length) {
                        homecol.getLayout(function () {
                            // homecol.getHeader(function () {
                            // homecol.getUserSidebar(function () {
                            // homecol.getFileManger(function () {
                            // homecol.getNotification(function () {
                            // homecol.getAppSwitchSidebar(function () {
                            $(".global-loader-wrapper").remove();
                            removeLoader();
                            showBackButton();
                            callback();
                            // });
                            // });
                            // });
                            // });
                            // });
                        });
                    } else {
                        console.log("h11111");
                        callback();
                    }
                } else {
                    console.log("h222222");
                    callback();
                }
            })
        } else {
            console.log("honecol-layout already present");
        }
    },

    getLayout: (callback) => {
        console.log("****GETLAYOUT");
        var accountData = JSON.parse(sessionStorage.getItem('accountDetails'));
        var getPlatform;
        if (crossplat.device.platform == 'browser' || crossplat.device.platform == 'desktop') {
            getPlatform = false;
        } else {
            getPlatform = true;//in android and ios should show qr scan button
        }
        if (sessionStorage.getItem('get_role_btn')) {
            var getData = {
                role_btn: sessionStorage.getItem('get_role_btn'),
                roles: accountData.roles,
                platform: getPlatform
            }
        } else {
            var getData = {
                role_btn: 'jeevi-role-btn',
                roles: accountData.roles,
                platform: getPlatform
            }
        }
        fetch.replaceHtml(function (error) {
            $('.logo-display-container').remove();
            callback();
        }, 'page/landPage/home_page', '#digibiz-home-page-template', '#app-root', getData);
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
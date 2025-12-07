/**
* Route Name : checkAppSession
* Description: checks for app session and creates session 
* Request Parms: 
*/
function checkAppSession(callback) {
    var requestParams = {
        device_id: crossplat.device.uuid,
        app: "business"
    }
    fetch.apiCall(function (roles, status, xhr) {
        if (status === "success") {
            // //console.log("111")
            let rolesData = Object.keys(roles.Data);
            // //console.log("222", rolesData)
            if (rolesData.length == 1 && rolesData.includes('individual')) {
                // //console.log("333", rolesData)
                var data = {};
                data['digibiz'] = {
                    user_id: window.sessionStorage.getItem("user_id"),
                    role: 'individual'
                };
                param = {
                    device_id: crossplat.device.uuid,
                    data: data
                };
                // //console.log("444", param)
                fetch.apiCall(function (response, status, xhr) {
                    if (status == "success") {
                        callback(true);
                    } else {
                        //console.log('unable to set session');
                    }
                }, api.set_session, "POST", "JSON", param);
            } else {
                // sessionStorage.clear();
                //navigate to roles page
                //console.log("NAVIGATING TO CORE");
                // setTimeout(function () {
                    deviceHelper.navigateToAccounts('core');
                // }, 1000);
            }
        } else {
            sessionStorage.clear();
            //console.log("NAVIGATING TO CORE");
            setTimeout(function () {
                // setTimeout(function () {
                    deviceHelper.navigateToAccounts('core');
                // }, 1000);
            }, 1000);
        }
    }, api.get_roles, "POST", "JSON", requestParams);
}

/**
* Route Name : checkSession
* Description: checks for session timeout
* Request Parms: 
*/
function checkSession(callback) {
    var requestParms = {
        device_id: crossplat.device.uuid,
        app: "business"
    };
    fetch.apiCall(function (response, status, xhr) {
        //console.log("checkSession", response);
        if (status == "success") {
            //console.log("success");
            // if (response.hasOwnProperty('appsession') && !response.appsession) {
            if (response.hasOwnProperty('appsession') && response.appsession == null && (crossplat.device.platform == 'Android' || crossplat.device.platform == 'iOS')) {
                //console.log("app session 1")
                if ($('body').attr('app') == "account_confirmation") {
                    //console.log("already in account confirmation page")
                } else {
                    //console.log("^^^^^^^^^navigating to confirmation page^^^^^^^^^^^^^^")
                    location.hash = `account_confirm`;
                }
            } else {
                //console.log("app session 2")
                if ('user_id' in response.Data) {
                    sessionStorage.setItem('user_id', response.Data.user_id);
                    sessionStorage.setItem("uuid", response.Data.uuid);
                }
                callback(true);
            }
        } else {
            //console.log("failure")
            sessionStorage.clear();
            //console.log("NAVIGATING TO CORE");
            setTimeout(function () {
                deviceHelper.navigateToAccounts('core');
            }, 1000);
        }
    }, api.get_session, "POST", "JSON", requestParms);
}

function checkDigibizAccount(callback) {
    setTimeout(function () {
        if(!window.register_confirmation){
            if (digibiz.checkAccountFlag == true) {
                var requestParms = {
                    device_id: crossplat.device.uuid,
                    app: "business"
                };
                fetch.apiCall(function (response, status, xhr) {
                    //console.log("checkSession", response);
                    if (status == "success") {
                        //console.log("success");
                        // if (response.hasOwnProperty('appsession') && !response.appsession) {
                        if (response.hasOwnProperty('appsession') && response.appsession == null && (crossplat.device.platform == 'Android' || crossplat.device.platform == 'iOS')) {
                            //console.log("app session 1")
                            if ($('body').attr('app') == "account_confirmation") {
                                //console.log("already in account confirmation page")
                            } else {
                                //console.log("^^^^^^^^^navigating to confirmation page^^^^^^^^^^^^^^")
                                location.hash = `account_confirm`;
                            }
                        } else {
                            //console.log("app session 2")
                            if ('user_id' in response.Data) {
                                sessionStorage.setItem('user_id', response.Data.user_id);
                                sessionStorage.setItem("uuid", response.Data.uuid);
                            }
                            callback(true);
                        }
                    } else {
                        //console.log("failure")
                        sessionStorage.clear();
                        //console.log("NAVIGATING TO CORE");
                        setTimeout(function () {
                            deviceHelper.navigateToAccounts('core');
                        }, 1000);
                    }
                }, api.get_session, "POST", "JSON", requestParms);
            } else {
                var requestParmss = {
                    device_id: crossplat.device.uuid,
                    app: "business"
                };
                //console.log("checkDigibizAccount checkSession", requestParmss)
                fetch.apiCall(function (sessionResponse, status, xhr) {
                    // //console.log("checkSession");
                    if (status == "success") {
                        //console.log("checkDigibizAccount if success")
                        if ('user_id' in sessionResponse.Data) {
                            sessionStorage.setItem('user_id', sessionResponse.Data.user_id);
                            sessionStorage.setItem("uuid", sessionResponse.Data.uuid);
                        }
                        if (sessionResponse.hasOwnProperty('appsession') && sessionResponse.appsession == null && (crossplat.device.platform == 'Android' || crossplat.device.platform == 'iOS')) {
                            //console.log("checkDigibizAccount app session 1")
                            if ($('body').attr('app') == "account_confirmation") {
                                console.log("already in account confirmation page")
                            } else {
                                console.log("^^^^^^^^^navigating to confirmation page^^^^^^^^^^^^^^")
                                location.hash = `account_confirm`;
                            }
                        } else {
                            var requestParms = {
                                device_id: crossplat.device.uuid,
                                uuid: sessionStorage.getItem("uuid"),
                            };
                            console.log("getAccount requestParms", requestParms)
                            fetch.apiCall(function (response, status, xhr) {
                                console.log("getAccount response", response)
                                if (status == "success") {
                                    // digibiz.checkAccountFlag = true;
                                    //digibiz account is present
                                    sessionStorage.setItem('account_id', response.Data.id);
                                    sessionStorage.setItem("accountDetails", JSON.stringify(response.Data));
                                    if (response.Data.status.status == "inactive") {//digibiz account is inactive
                                        sessionStorage.setItem('account_status', response.Data.status.status);
                                        var alert_parms = {
                                            alert_id: "digibiz-account-inactive",
                                            alert_platform: crossplat.device.platform,
                                            alert_title: "",
                                            alert_body: `Your account is inactive.`,
                                            alert_btn: [{
                                                name: "Activate",
                                                attr: [{ name: "id", value: "activate-digibiz-account" }]
                                            },
                                            {
                                                name: "Close",
                                                attr: [{ name: "id", value: "close-digibiz-account-inactive" }]
                                            }]
                                        }
                                        showAlert(alert_parms, function () {
                                            $('#digibiz-account-inactive').attr('account_id', response.Data.id);
                                            if ($(`.custom-modal[id="digibiz-account-inactive"]`).length > 1) {
                                                $(`.custom-modal[id="digibiz-account-inactive"]:last`).remove();
                                            }
                                            document.querySelector("#activate-digibiz-account").addEventListener("click", function () {
                                                addLoader();
                                                var getData = {
                                                    account_status: response.Data.status.status,
                                                    account_settings: response.Data.settings
                                                }
                                                //console.log("getData", getData);
                                                fetch.getHtml(function (fetchror, html) {
                                                    var modal_data = {
                                                        modal_id: "account-inactive-active-settings",
                                                        modal_header: "Active/Inactive",
                                                        modal_platform: crossplat.device.platform,
                                                        modal_body: html,
                                                        modal_action_buttons: [{
                                                            "name": "Activate",
                                                            "id": "add-account-inactive-data",
                                                        }]
                                                    }
                                                    showModal(modal_data, function () {
                                                        $('#digibiz-account-inactive').remove();
                                                        if (getData.account_status == "inactive") {
                                                            $('.account-inactive-start-end-date-time').addClass('hide');
                                                            $('.account-inactive-main-container').addClass('hide');
                                                        }
                                                        if (crossplat.device.platform == 'browser' || crossplat.device.platform == 'desktop') {
                                                            $('.custom-modal-popup').css({ "display": "flex", "background": "rgba(0,0,0,0.6)" }).addClass('modal-slide-top');
                                                            if ($('.modal-popup-content').length > 0) {
                                                                //console.log("scroll initiated for modal pop-up class")
                                                                appScroll.scrollBar('.modal-popup-content');
                                                            }
                                                        } else {
                                                            $('.custom-modal-popup').show().addClass('modal-slide-top');
                                                            if ($('.modal-popup-content').length > 0) {
                                                                //console.log("scroll initiated for modal pop-up class")
                                                                appScroll.scrollBar('.modal-popup-content');
                                                            }
                                                        }
                                                        // if (getData.account_status == "inactive" || getData.account_status == "inactive_pending") {
                                                        //     $('.account-inactive-start-end-date-time').removeClass('hide');
                                                        // }
    
                                                        if ($(`.custom-modal-popup[id="account-inactive-active-settings"]`).length > 1) {
                                                            $(`.custom-modal-popup[id="account-inactive-active-settings"]:last`).remove();
                                                        }
                                                        commonExecutables();
                                                        removeLoader();
                                                    });
                                                }, 'page/common/active_inactive_account', '#active_inactive_account-template', getData);
                                            });
                                            document.querySelector("#close-digibiz-account-inactive").addEventListener("click", function () {
                                                addLoader();
                                                $('#digibiz-account-inactive').remove();
                                                // sessionStorage.clear();                            
                                                //console.log("NAVIGATING TO CORE");
                                                setTimeout(function () {
                                                    deviceHelper.navigateToAccounts('core');
                                                }, 1000);
                                                logoutDigibiz();
                                            });
                                        });
                                    } else if (response.Data.status.status == "inactive_pending") {//digibiz account is inactive_pending
                                        if (response.Data.hasOwnProperty('storage') && response.Data.storage) {
                                            var requestParams = {
                                                device_id: crossplat.device.uuid,
                                                selected: true,
                                                id: sessionStorage.getItem('account_id'),
                                                type: "individual"
                                            }
                                            fetch.apiCall(function (checkTokenResponse, status, xhr) {
                                                if (status === "success") {
                                                    window.sessionStorage.setItem('storage_token', JSON.stringify(checkTokenResponse.Data));
                                                    callback(true);
                                                } else {
                                                    if (checkTokenResponse.status == 400) {
                                                        window.sessionStorage.setItem('storage_token', JSON.stringify(checkTokenResponse.Data));
                                                        location.hash = `digibiz/account/storage`;
                                                    } else {
                                                        //console.log("!@#$!@#$ checkkkkkkk in middleware")
                                                    }
                                                }
                                            }, api.check_token, "POST", "JSON", requestParams);
                                        } else {//no storage
                                            //console.log("setting_digibiz_storage_selection")
                                            sessionStorage.setItem('digibiz_storage_selection', 'first');
                                            location.hash = `digibiz/account/storage`;
                                        }
                                    } else {//digibiz account is active
                                        if (response.Data.hasOwnProperty('storage') && response.Data.storage) {
                                            var requestParams = {
                                                device_id: crossplat.device.uuid,
                                                selected: true,
                                                id: sessionStorage.getItem('account_id'),
                                                type: "individual"
                                            }
                                            fetch.apiCall(function (response, status, xhr) {
                                                if (status === "success") {
                                                    window.sessionStorage.setItem('storage_token', JSON.stringify(response.Data));
                                                    callback(true);
                                                } else {
                                                    if (response.status == 400) {
                                                        window.sessionStorage.setItem('storage_token', JSON.stringify(response.responseJSON.Data));
                                                        location.hash = `digibiz/account/storage`;
    
                                                    } else {
                                                        //console.log("!@#$!@#$ checkkkkkkk in middleware")
                                                    }
                                                }
                                            }, api.check_token, "POST", "JSON", requestParams);
                                        } else {//no storage
                                            sessionStorage.setItem('digibiz_storage_selection', 'first');
                                            location.hash = `digibiz/account/storage`;
                                        }
                                    }
                                } else {
                                    //digibiz account is not present
                                    if (response.hasOwnProperty('responseJSON') && response.responseJSON && response.responseJSON.hasOwnProperty('data') && response.responseJSON.data) {
                                        if (response.responseJSON.data.status.status == "inactive") {
                                            sessionStorage.setItem('account_id', response.responseJSON.data.id);
                                            sessionStorage.setItem('account_status', response.responseJSON.data.status.status);
                                            var alert_parms = {
                                                alert_id: "digibiz-account-inactive",
                                                alert_platform: crossplat.device.platform,
                                                alert_title: "",
                                                alert_body: `Your account is inactive.`,
                                                alert_btn: [{
                                                    name: "Activate",
                                                    attr: [{ name: "id", value: "activate-digibiz-account" }]
                                                },
                                                {
                                                    name: "Close",
                                                    attr: [{ name: "id", value: "close-digibiz-account-inactive" }]
                                                }]
                                            }
                                            showAlert(alert_parms, function () {
                                                $('#digibiz-account-inactive').attr('account_id', response.responseJSON.data.id)
                                                if ($(`.custom-modal[id="digibiz-account-inactive"]`).length > 1) {
                                                    $(`.custom-modal[id="digibiz-account-inactive"]:last`).remove();
                                                }
                                                document.querySelector("#activate-digibiz-account").addEventListener("click", function () {
                                                    addLoader();
                                                    var getData = {
                                                        account_status: response.responseJSON.data.status.status,
                                                        account_settings: response.responseJSON.data.settings
                                                    }
                                                    //console.log("getData", getData);
                                                    fetch.getHtml(function (fetchror, html) {
                                                        var modal_data = {
                                                            modal_id: "account-inactive-active-settings",
                                                            modal_header: "Active/Inactive",
                                                            modal_platform: crossplat.device.platform,
                                                            modal_body: html,
                                                            modal_action_buttons: [{
                                                                "name": "Activate",
                                                                "id": "add-account-inactive-data",
                                                            }]
                                                        }
                                                        showModal(modal_data, function () {
                                                            $('#digibiz-account-inactive').remove();
                                                            if (getData.account_status == "inactive") {
                                                                $('.account-inactive-start-end-date-time').addClass('hide');
                                                                $('.account-inactive-main-container').addClass('hide');
                                                            }
                                                            if (crossplat.device.platform == 'browser' || crossplat.device.platform == 'desktop') {
                                                                $('.custom-modal-popup').css({ "display": "flex", "background": "rgba(0,0,0,0.6)" }).addClass('modal-slide-top');
                                                                if ($('.modal-popup-content').length > 0) {
                                                                    //console.log("scroll initiated for modal pop-up class")
                                                                    appScroll.scrollBar('.modal-popup-content');
                                                                }
                                                            } else {
                                                                $('.custom-modal-popup').show().addClass('modal-slide-top');
                                                                if ($('.modal-popup-content').length > 0) {
                                                                    //console.log("scroll initiated for modal pop-up class")
                                                                    appScroll.scrollBar('.modal-popup-content');
                                                                }
                                                            }
                                                            // if (getData.account_status == "inactive" || getData.account_status == "inactive_pending") {
                                                            //     $('.account-inactive-start-end-date-time').removeClass('hide');
                                                            // }
                                                            if ($(`.custom-modal-popup[id="account-inactive-active-settings"]`).length > 1) {
                                                                $(`.custom-modal-popup[id="account-inactive-active-settings"]:last`).remove();
                                                            }
                                                            commonExecutables();
                                                            removeLoader();
                                                        });
                                                    }, 'page/common/active_inactive_account', '#active_inactive_account-template', getData);
                                                });
                                                document.querySelector("#close-digibiz-account-inactive").addEventListener("click", function () {
                                                    addLoader();
                                                    $('#digibiz-account-inactive').remove();
                                                    // sessionStorage.clear();                                
                                                    setTimeout(function () {
                                                        deviceHelper.navigateToAccounts('core');
                                                    }, 1000);
                                                    //console.log("NAVIGATING TO CORE");
                                                    logoutDigibiz();
                                                });
                                            });
                                        } else if (response.responseJSON.data.status.status == "inactive_pending") {
                                            sessionStorage.setItem('account_id', response.responseJSON.data.id);
                                            callback(true);
                                        } else {//no account(other status),add automatically digibiz and jeevi account
                                            console.log("no account(other status),add automatically digibiz and jeevi account 1")
                                            var reqParam = {
                                                device_id: crossplat.device.uuid,
                                                role: "prospect"
                                            }
                                            fetch.apiCall(function (AccountResponse, status, xhr) {
                                                if (status == "success") {
                                                    sessionStorage.setItem('account_id', AccountResponse.data.id);
                                                    var requestParameter = {
                                                        device_id: crossplat.device.uuid,
                                                        account_id: AccountResponse.data.id
                                                    }
                                                    fetch.apiCall(function (jeeviResponse, status, xhr) {
                                                        if (status == "success") {
                                                            //console.log("jeeviResponse", jeeviResponse);
                                                            sessionStorage.setItem('digibiz_storage_selection', 'first');
                                                            location.hash = `digibiz/account/storage`;
                                                        } else {
                                                            var err = JSON.parse(jeeviResponse.responseText);
                                                            //console.log("error in adding jeevi account", err)
                                                        }
                                                    }, api.add_jeevi, "POST", "JSON", requestParameter);
                                                } else {
                                                    var err = JSON.parse(AccountResponse.responseText);
                                                    console.log("error in adding digibiz account", err)
                                                }
                                            }, api.add_account, "POST", "JSON", reqParam);
                                        }
                                    } else {//no account,add automatically digibiz and jeevi account
                                        console.log("no account,add automatically digibiz and jeevi account 2")
                                        var alert_parms = {
                                            alert_id: "digibiz-account-creating",
                                            alert_platform: crossplat.device.platform,
                                            alert_title: "",
                                            alert_body: `CREATING ACCOUNT...please wait...`,
                                        }
                                        showAlert(alert_parms, function () {
                                            // $('#digibiz-account-creating').addClass('hide');
                                        });
                                        setTimeout(function () {
                                            var reqParam = {
                                                device_id: crossplat.device.uuid,
                                                role: "prospect"
                                            }
                                            fetch.apiCall(function (AccountResponse, status, xhr) {
                                                if (status == "success") {
                                                    $('#digibiz-account-creating').remove();
                                                    sessionStorage.setItem('account_id', AccountResponse.data.id);
                                                    var requestParameter = {
                                                        device_id: crossplat.device.uuid,
                                                        account_id: AccountResponse.data.id
                                                    }
                                                    fetch.apiCall(function (jeeviResponse, status, xhr) {
                                                        if (status == "success") {
                                                            //console.log("jeeviResponse", jeeviResponse);
                                                            sessionStorage.setItem('digibiz_storage_selection', 'first');
                                                            location.hash = `digibiz/account/storage`;
                                                        } else {
                                                            var err = JSON.parse(jeeviResponse.responseText);
                                                            //console.log("error in adding jeevi account", err)
                                                        }
                                                    }, api.add_jeevi, "POST", "JSON", requestParameter);
                                                } else {
                                                    var err = JSON.parse(AccountResponse.responseText);
                                                    console.log("error in adding digibiz account", err)
                                                }
                                            }, api.add_account, "POST", "JSON", reqParam);
                                        }, 3000);
                                    }
                                }
                            }, api.get_account, "POST", "JSON", requestParms);
                        }
                    } else {
                        //console.log("checkDigibizAccount else")
                        sessionStorage.clear();
                        //console.log("NAVIGATING TO CORE");
                        setTimeout(function () {
                            deviceHelper.navigateToAccounts('core');
                        }, 1000);
                    }
                }, api.get_session, "POST", "JSON", requestParmss);
            }
        }
    }, 1000);
}


function checkJeeviDetails(callback) {
    if (!(crossplat.device.platform == 'Android' || crossplat.device.platform == 'iOS')) {
        callback(true);
    } else {
        var requestParams = {
            device_id: crossplat.device.uuid,
            app: 'business'
        }
        fetch.apiCall(function (response, status, xhr) {
            if (status === "success") {
                callback(true);
            } else {
                if (crossplat.device.platform === "Android" || crossplat.device.platform === "iOS") {
                    var jsonResponse = JSON.parse(response.responseText);
                    if (jsonResponse.message == "business_role_deleted") {
                        window.plugins.toast.showLongBottom("Your Business account has been deleted");
                        router.navigateUri('register_confirmation');
                        window.register_confirmation = true;
                    } else{
                        deviceHelper.navigateToAccounts('core');
                    }
                } else {
                    var requestParams = {
                        device_id: crossplat.device.uuid,
                    }
                    fetch.apiCall(function (response, status, xhr) {
                        if (status === "success") {
                            fetch.apiCall(function (response, status, xhr) {
                                if (status === "success") {
                                    sockets.coreSocket.emit('leaveroom', response.Data);
                                } else {
                                    sockets.coreSocket.emit('leaveroom', crossplat.device.uuid);
                                }
                                deviceHelper.navigateToAccounts('core');
                            }, api.get_socket_id, "POST", "JSON", requestParams);

                        } else {
                            console.log(JSON.parse(response.responseText));
                        }
                    }, api.logout, "POST", "JSON", requestParams);
                }
            }
        }, api.checkJeeviDetails, "POST", "JSON", requestParams);
    }
}
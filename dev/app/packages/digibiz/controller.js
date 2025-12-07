var digibiz = {
    objectURLS: [],
    fileObject: {}, //used
    department_list_selection: [],//used
    active_super_admins_list: [],
    pending_super_admins_list: [],
    groupPictureblob: {},
    storages: [],
    digibiz_storages: [],
    access_list: [],
    employee_group_image: {},
    employee_group_employee_members: [],
    employee_group_standard_group_members: [],
    employeeControlSettings: {},
    employee_group_department_members: [],//check used or not
    standard_employees_groups_list_page: [],
    custom_employees_groups_list_page: [],
    business_owner_business_list: [],
    employee_notification_details_list: [],
    customer_notification_details_list: [],
    associate_customer_notification_details_list: [],
    super_admin_notification_details_list: [],
    employee_business_list: [],
    customer_business_list: [],
    customer_collaborator_business_list: [],
    digibiz_notifications: [],
    business_notifications: [],
    group_business_notifications: [],
    active_employee_creation_employee_list: [],
    pending_employee_creation_employee_list: [],
    employee_access_list: [],
    show_employee_access_list: [],
    show_customer_access_list: [],
    show_associate_customer_access_list: [],
    customer_identifiers: [],
    associate_customer_identifiers: [],
    customer_identifiers_active_customers_list: [],
    customer_identifiers_pending_customers_list: [],
    customer_creation_active_list: [],
    collaborator_business_customer_list: [],
    customer_creation_pending_list: [],
    standard_customer_groups_identifiers_list: [],
    customer_contacts_identifiers_list: [],
    customer_access_identifiers_list: [],
    contacts_items_list: [],
    customer_access_identifier_items_list: [],
    contacts_list: [],
    groups_list: [],
    custom_groups_list: [],
    employee_types_list: [],
    employee_category_list: [],
    employee_designation_list: [],
    all_employees_list: [],
    department_wise_employees_list: [],
    collaborator_contact_list: [],
    collaborator_customer_list: [],
    pending_collaborator_contact_list: [],
    alumini_collaborator_contact_list:[],
    collaborator_contact_list_notification_details: [],
    collaborator_groups_list: [],
    collaborator_employee_list: [],
    collaborator_group_owner_employee_members: [],
    cropper: {},
    declarationVideo: {},
    isDeclarationTransactionPictureSelected: false,
    isDeclarationSignaturePictureSelected: false,
    isDeclarationVideoPictureSelected: false,
    isAssociateCustomerIdentityPictureSelected: false,
    isCustomerIdentityPictureSelected: false,
    isEmployeeIdentityPictureSelected: false,
    isBusinessDisplayPictureSelected: false,
    isGroupPictureSelected: false,
    homePageList: [],
    file_type: "",
    selectedShareDocument: [],
    filemanager_breadcrumb_path: [],
    cloudAssets: [],
    uploadingFiles: [],
    cameraUploadingFiles: [],
    transactional_picture: {},
    signature_picture: {},
    device_multimedia_selected_files: [],
    cloud_uploading_files: [],
    cloud_multimedia_selected_files: [],
    camera_multimedia_selected_files: [],
    device_multimedia_uploaded_files: [],
    cloud_multimedia_uploaded_files: [],
    camera_multimedia_uploaded_files: [],
    assets: [],
    department_list: [],
    role_management_employee_list: [],
    role_management_employee_apps_access_list: [],
    role_assignment: {},
    logs_list: [],
    customerGroupsContactsList: [],
    customerGroupCustomGroupsList: [],
    communicationGroupsList: [],
    communicationEmployeeGroupsList: [],
    communicationCustomerGroupsList: [],
    communicationGroupsCustomerContactsList: [],
    communicationActivateEmployeeGroupsList: [],
    communicationActivateCustomersGroupsList: [],
    communicationActivateEmployeeGroupEmployeeList: [],
    communicationCreateEmployeeGroupEmployeeList: [],
    communicationActivateCustomerGroupCustomersList: [],
    communicationCreateEmployeeGroupsList: [],
    communicationCreateCustomersGroupsList: [],
    communicationCreateCollaboratorGroupsList: [],
    communicationGroupActivate: [],
    alreadySelected: [],
    alreadySelectedDepartment: [],
    alreadyModuleAdmin: [],
    customer_employee_contact_access_selection: [],
    customer_contact_add_access_customer_contact_item_selection: [],
    collaborator_business_members_search: [],
    show_employees_collaborator_group: [],
    communicationGroupEmployeeSelectionList: [],
    communicationSelectedContactList: [],
    customerSelectedContactList: [],
    employeeSelectedContactList: [],
    collboratorContactAdd: {},
    getRolesListData: [],
    alumini_customer_list: [],
    alumini_employee_list: [],
    employeeFilterData: {
        type: [],
        category: [],
        designation: [],
        department: [],
        status: []
    },
    customerFilterData: {
        status: []
    },
    groupFilterData: {
        status: []
    },
    customerGroupFilterData: {
        status: []
    },
    communicationGroupFilterData: {
        status: []
    },
    collaboratorGroupFilterData: {
        status: []
    },
    checkAccountFlag: false,
    chooseCustomerIdentifiers: [],
    selectedMembers: [],
    all_employee_active_list: [],
    // businessDisplayControlData: {},


    digibizAccount: function (callback, uriData = null, middlewareData = null) {
        $('.business-owner-business-list-title-band').remove();
        $('.employee-business-list-title-band').remove();
        $('.logo-display-container').remove();
        if (localStorage.getItem('theme') == "on") {
            document.documentElement.setAttribute('data-darkmode', "on");
            document.documentElement.classList.add('translate');
        } else {
            document.documentElement.setAttribute('data-darkmode', "off");
            document.documentElement.classList.add('translate');
        }
        console.log("digibizAccount");
        // add role in body
        $('body').attr('role', 'digibiz_registration');
        sessionStorage.setItem('role', 'prospect');
        var requestParms = {
            device_id: crossplat.device.uuid,
            uuid: sessionStorage.getItem("uuid"),
        };
        fetch.apiCall(function (response, status, xhr) {
            if (status == "success") {
                //olddddd code
                // if (response.Data.hasOwnProperty('storage') && response.Data.storage) {
                //     location.hash = `land/page`;
                // } else {//no storage
                //     location.hash = `digibiz/account/storage`;
                // }

                //newwwww code
                if (sessionStorage.getItem('role') == "prospect") {
                    if (response.Data.hasOwnProperty('storage') && response.Data.storage) {
                        sessionStorage.removeItem('role');
                        // location.hash = `prospect/app/hub`;
                        location.hash = `jeevi/app/hub`;
                    } else {//no storage
                        location.hash = `digibiz/account/storage`;
                    }
                } else if (sessionStorage.getItem('role') == "administrator") {
                    sessionStorage.removeItem('role');
                    // location.hash = `business_owner/business/list`;
                    location.hash = `business_owner/business/list`;
                } else if (sessionStorage.getItem('role') == "employee") {
                    sessionStorage.removeItem('role');
                    // location.hash = `employee/business/list`;
                    location.hash = `employee/business/list`;
                } else if (sessionStorage.getItem('role') == "customer") {
                    sessionStorage.removeItem('role');
                    // location.hash = `customer/business/list`;
                    location.hash = `customer/business/list`;
                }
            } else {
                getDigibizAccountPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        }, api.get_account, "POST", "JSON", requestParms);
    },

    digibizAccountRoleUpdate: function (callback, uriData = null, middlewareData = null) {
        $('.business-owner-business-list-title-band').remove();
        $('.employee-business-list-title-band').remove();
        $('.logo-display-container').remove()
        if (localStorage.getItem('theme') == "on") {
            document.documentElement.setAttribute('data-darkmode', "on");
            document.documentElement.classList.add('translate');
        } else {
            document.documentElement.setAttribute('data-darkmode', "off");
            document.documentElement.classList.add('translate');
        }
        console.log("digibizAccount");
        // add role in body
        $('body').attr('role', 'digibiz_registration');
        getDigibizAccountRoleUpdatePage()
            .then(() => {
                commonExecutables();
                removeLoader();
                callback();
            })
            .catch((err) => {
                removeLoader();
                console.log(err); callback();
            });
    },


    digibizAccountStorage: function (callback, uriData = null, middlewareData = null) {
        $('.business-owner-business-list-title-band').remove();
        $('.employee-business-list-title-band').remove();
        $('.logo-display-container').remove()
        if (localStorage.getItem('theme') == "on") {
            document.documentElement.setAttribute('data-darkmode', "on");
            document.documentElement.classList.add('translate');
        } else {
            document.documentElement.setAttribute('data-darkmode', "off");
            document.documentElement.classList.add('translate');
        }
        // add role in body
        $('body').attr('role', 'digibiz_registration');
        $('body').attr('header', 'on');
        // $('body').attr('header', 'off');
        // var requestParms = {
        //     device_id: crossplat.device.uuid,
        //     uuid: sessionStorage.getItem("uuid"),
        // };
        // fetch.apiCall(function (response, status, xhr) {
        //     if (status == "success") {
        // if (response.Data.hasOwnProperty('storage') && response.Data.storage) {
        //     location.hash = `land/page`;
        // } else {//no storage
        // location.hash = `digibiz/account/storage`;
        getDigibizAccountStoragePage()
            .then(() => {
                commonExecutables();
                removeLoader();
                callback();
            })
            .catch((err) => {
                removeLoader();
                console.log(err); callback();
            });
        // }
        //     } else {
        //         getDigibizAccountStoragePage()
        //             .then(() => {
        //                 commonExecutables();
        //                 removeLoader();
        //                 callback();
        //             })
        //             .catch((err) => {
        //                 removeLoader();
        //                 console.log(err); callback();
        //             });
        //     }
        // }, api.get_account, "POST", "JSON", requestParms);
    },
    // digibizAccountSettings: function (callback, uriData = null, middlewareData = null) {
    //     onecol.getDigibizLayout(function (err) {
    //         if (!err) {
    //             $('body').attr('role', 'business_owner');
    //             //$('.tabs-wrapper').addClass('hide');
    //             $('.view-digibiz-back-button').removeClass('hide');
    //             digibizAccountSettingsPage()
    //                 .then(() => {
    //                     commonExecutables();
    //                     removeLoader();
    //                     callback();
    //                 })
    //                 .catch((err) => {
    //                     removeLoader();
    //                     console.log(err); callback();
    //                 });
    //         }
    //     });
    // },
    businessStorage: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                $('body').attr('header', 'on');
                //$('.tabs-wrapper').addClass('hide');
                //back button
                // $('.view-digibiz-back-button').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                if (sessionStorage.getItem('business_name')) {
                    $('.header-heading-name').text("");
                    $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Business Settings</span>`);

                }
                $('.menu-toggle').addClass('hide');
                //cancel button
                // $('.digibiz-cancel-button').removeClass('hide');
                $('.digibiz-cancel-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');

                sessionStorage.removeItem('successCode');
                sessionStorage.removeItem('authErrorCode');
                sessionStorage.removeItem('business_storage_token');

                getBusinessStoragePage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        commonExecutables();
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    landingPage: function (callback, uriData = null, middlewareData = null) {
        sessionStorage.clear();
        setTimeout(function () {
            deviceHelper.navigateToAccounts('core');
        }, 1000);
        if (localStorage.getItem('theme') == "on") {
            document.documentElement.setAttribute('data-darkmode', "on");
            document.documentElement.classList.add('translate');
        } else {
            document.documentElement.setAttribute('data-darkmode', "off");
            document.documentElement.classList.add('translate');
        }
        sessionStorage.removeItem('group_creation_running');
        console.log("CHANGE THE ROLE HERE")
        // location.hash = `business_owner/business/list`;//business owner role
        // location.hash=`employee/business/list`;//employee role
        // location.hash=`customer/business/list`;//customer role
        // location.hash=`prospect/app/hub`;//jeevi role

        location.hash = `jeevi/app/hub`;//new jeevi role
        // location.hash=`customer/business/list`;//new customer role
        // location.hash = `employee/business/list`;//new employee role

        // // add role in body
        // $('body').attr('role', 'landing_page');
        // sessionStorage.removeItem('digibiz_storage_selection');
        // onecol.getDigibizLayout(function (err) {
        //     if (!err) {
        //         console.log("qwe")
        //         $('body').attr('header', 'on');
        //         //show profile and bell icon
        //         $('#my-profile-menu').removeClass('hide');
        //         $('#my-notifications-menu').removeClass('hide');
        //         getLandingPageList()
        //             .then(() => {
        //                 commonExecutables();
        //                 removeLoader();
        //                 callback();
        //             })
        //             .catch((err) => {
        //                 removeLoader();
        //                 console.log(err);
        //                 callback();
        //             });
        //     }
        // });
        callback();
    },
    digibizNotifications: function (callback, uriData = null, middlewareData = null) {
        $('body').attr('role', 'notifications_page');
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'off');
                if (cordova.platformId == 'android' || cordova.platformId === 'ios') {
                    StatusBar.overlaysWebView(false);
                    StatusBar.backgroundColorByHexString("#0e4d45");
                }
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //hide profile and bell icon
                // if ($('body').attr('app') == "business_owner_business_list" || $('body').attr('app') == "employee_business_list" || $('body').attr('app') == "customer_business_list" || $('body').attr('app') == "prospect_app_hub_page" || $('body').attr('app') == "digibiz_notifications") {
                $('#my-profile-menu').addClass('hide');
                $('#my-notifications-menu').addClass('hide');
                // }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                digibiz.digibiz_notifications = [];
                getDigibizNotificationsPage()
                    .then(() => {
                        localStorage.removeItem('navigate_to_digibiz_role')
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },
    businessNotifications: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.business_notifications = [];
                digibiz.group_business_notifications = [];
                if (sessionStorage.getItem('selected-business-notification-tab')) {
                    console.log("already the tab is been selected");
                } else {
                    sessionStorage.setItem('selected-business-notification-tab', 'business_notification');
                }
                fetch.replaceHtml(function (err) {
                    ``
                    if (!err) {
                        if (sessionStorage.getItem('selected-business-notification-tab')) {
                            $('.tab-content').removeClass('active');
                            $(`.tab-content[id="${sessionStorage.getItem('selected-business-notification-tab')}"`).addClass('active');
                            $('.tab').removeClass('active');
                            $(`.tab[data-id="${sessionStorage.getItem('selected-business-notification-tab')}"]`).addClass('active');
                            if (sessionStorage.getItem('selected-business-notification-tab') == 'business_notification') {
                                getBusinessNotificationsPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        console.log(err);
                                        callback();
                                    });
                            } else if (sessionStorage.getItem('selected-business-notification-tab') == 'group_business_notification') {
                                getGroupBusinessNotificationsPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            }
                        }
                    }
                }, "page/business/business_notification_tabs", "#business-notification-tabs-template", "#main-content-wrapper", null);

            }
        });
    },
    employeeNotificationDetailsPage: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.employee_notification_details_list = [];
                getEmployeeNotificationDetailsPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },
    superAdminNotificationDetailsPage: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.super_admin_notification_details_list = [];
                getSuperAdminNotificationDetailsPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },
    departmentManagement: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Employee Management</span>`);
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.department_list = [];
                getDepartmentManagementPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },
    departmentCreate: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                departmentCreatePage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },
    employeeTypes: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Employee Management</span>`);
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                employeeTypesPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },
    employeeCategory: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Employee Management</span>`);
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                employeeCategoryPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },
    employeeDesignation: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Employee Management</span>`);
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                employeeDesignationPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },
    employeeCreationList: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                //$('.header-logo').addClass('hide');
                // $('.header-heading-name').text('Employee List');
                $('.header-heading-name').text('');
                $('.header-heading-name').append(`<span class="header_primary truncate">Employee List</span>`);
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.isEmployeeIdentityPictureSelected = false;
                if (sessionStorage.getItem('selected-employee-tab')) {
                    console.log("already the tab is been selected");
                } else {
                    sessionStorage.setItem('selected-employee-tab', 'employee_active');
                }
                fetch.replaceHtml(function (err) {
                    if (!err) {
                        if (sessionStorage.getItem('selected-employee-tab')) {
                            $('.tab-content').removeClass('active');
                            $(`.tab-content[id="${sessionStorage.getItem('selected-employee-tab')}"`).addClass('active');
                            $('.tab').removeClass('active');
                            $(`.tab[data-id="${sessionStorage.getItem('selected-employee-tab')}"]`).addClass('active');
                            if (sessionStorage.getItem('selected-employee-tab') == 'employee_active') {
                                // employeeCreationListPage();
                                digibiz.active_employee_creation_employee_list = [];
                                activeEmployeeListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            } else if (sessionStorage.getItem('selected-employee-tab') == 'employee_pending') {
                                digibiz.pending_employee_creation_employee_list = [];
                                pendingEmployeeListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            } else if (sessionStorage.getItem('selected-employee-tab') == 'employee_alumini') {
                                digibiz.alumini_employee_list = [];
                                aluminiEmployeeListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            }
                        }
                    }
                }, "page/common/employee_creation_list_page", "#employee-list-page-template", "#main-content-wrapper", null);
            }
        });
    },
    employeeCreate: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                if (sessionStorage.getItem('digibiz_role') == "employee" && sessionStorage.getItem('edit_from') == "profile_page") {
                    $('#my-profile-menu').addClass('hide');
                    $('#my-notifications-menu').addClass('hide');
                    //hide main header
                    $('.header-band').addClass('hide');
                } else {
                    $('#my-profile-menu').removeClass('hide');
                    $('#my-notifications-menu').removeClass('hide');
                }
                employeeCreatePage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },
    employeeProfile: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                addLoader();
                $('.header-band').removeClass('hide');
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('#employee_business_list_more_icon_action').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // $('body').attr('role', 'business_owner');
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //hide profile and bell icon
                $('#my-profile-menu').addClass('hide');
                $('#my-notifications-menu').addClass('hide');
                employeeProfilePage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    customerProfile: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                addLoader();
                $('.header-band').removeClass('hide');
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('#employee_business_list_more_icon_action').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // $('body').attr('role', 'business_owner');
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //hide profile and bell icon
                $('#my-profile-menu').addClass('hide');
                $('#my-notifications-menu').addClass('hide');
                customerProfilePage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    businessTags: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                businessTagsPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },
    businessTypes: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                businessTypesPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },
    businessCreate: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                sessionStorage.removeItem('business_id');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                businessCreatePage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },

    businessAddPage: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                businessAddPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    businessEditPage: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                businessEditPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    viewBusinessProfile: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                addLoader();
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('#employee_business_list_more_icon_action').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // $('body').attr('role', 'business_owner');
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                // $('#my-profile-menu').removeClass('hide');
                // $('#my-notifications-menu').removeClass('hide');
                viewBusinessProfilePage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    businessProfileManagement: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Profile Mangement</span>`);
                $('.view-digibiz-back-button').removeClass('hide');
                $('.menu-toggle').removeClass('hide');
                $('.digibiz-cancel-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                businessProfileManagementPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    businessManagement: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                addLoader();
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // $('.header-heading-name').text(sessionStorage.getItem('business_name'));
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span>`);
                $('body').attr('role', 'business_owner');
                $('.header-band').removeClass('hide');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                $('.menu-toggle').removeClass('hide');
                $('.digibiz-cancel-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                // var requestParams = {
                //     device_id: crossplat.device.uuid,
                //     get_by: "digibiz",
                //     platform: crossplat.device.platform,
                //     business_id: sessionStorage.getItem('business_id'),
                //     owner: {
                //         id: sessionStorage.getItem('account_id'),
                //         type: "individual"
                //     }
                // }
                // fetch.apiCall(function (response, status, xhr) {
                //     if (status === "success") {
                //         localStorage.setItem('theme', "on");
                //         document.documentElement.setAttribute('data-darkmode', "on");
                //         document.documentElement.classList.add('translate');
                businessManagementPage()
                    .then(() => {
                        getBusinessNotificationCountHelperMethod();
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
                //     } else {
                //         localStorage.setItem('theme', "off");
                //         document.documentElement.setAttribute('data-darkmode', "off");
                //         document.documentElement.classList.add('translate');
                //         businessManagementPage()
                //             .then(() => {
                //                 getBusinessNotificationCountHelperMethod();
                //                 commonExecutables();
                //                 removeLoader();
                //                 callback();
                //             })
                //             .catch((err) => {
                //                 removeLoader();
                //                 console.log(err); callback();
                //             });
                //     }
                // }, api.get_theme, "POST", "JSON", requestParams);
            }
        });
    },
    digibizBusinessSettings: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Business Settings</span>`);
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibizBusinessSettingsPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    businessSettings: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                //back button
                // $('.view-digibiz-back-button').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Business Settings</span>`);
                $('.menu-toggle').addClass('hide');
                //cancel button
                // $('.digibiz-cancel-button').removeClass('hide');
                $('.digibiz-cancel-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                // if (sessionStorage.getItem('selected-business-settings-tab')) {
                //     console.log("already the tab has been selected");
                // } else {
                sessionStorage.setItem('selected-business-settings-tab', 'digibiz_admin');
                // }
                fetch.replaceHtml(function (err) {
                    if (!err) {
                        if (sessionStorage.getItem('selected-business-settings-tab')) {
                            $('.tab-content').removeClass('active');
                            $(`.tab-content[id="${sessionStorage.getItem('selected-business-settings-tab')}"`).addClass('active');
                            $('.tab').removeClass('active');
                            $(`.tab[data-id="${sessionStorage.getItem('selected-business-settings-tab')}"]`).addClass('active');
                            if (sessionStorage.getItem('selected-business-settings-tab') == 'digibiz_admin') {
                                businessDigibizAdminsTab()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            }
                            else if (sessionStorage.getItem('selected-business-settings-tab') == 'module_admin') {
                                businessModuleAdminsTab()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            }
                        }
                    }
                }, "page/business/business_settings_tab", "#business-settings-tab-template", "#main-content-wrapper", null);
            }
        });
    },
    moduleAdminManagement: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                //back button
                // $('.view-digibiz-back-button').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Business Settings</span>`);
                $('.menu-toggle').addClass('hide');
                //cancel button
                // $('.digibiz-cancel-button').removeClass('hide');
                $('.digibiz-cancel-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                // if (sessionStorage.getItem('selected-business-settings-tab')) {
                //     console.log("already the tab has been selected");
                // } else {
                sessionStorage.setItem('selected-business-settings-tab', 'module_admin');
                // }
                fetch.replaceHtml(function (err) {
                    if (!err) {
                        if (sessionStorage.getItem('selected-business-settings-tab')) {
                            $('.tab-content').removeClass('active');
                            $(`.tab-content[id="${sessionStorage.getItem('selected-business-settings-tab')}"`).addClass('active');
                            $('.tab').removeClass('active');
                            $(`.tab[data-id="${sessionStorage.getItem('selected-business-settings-tab')}"]`).addClass('active');
                            // if (sessionStorage.getItem('selected-business-settings-tab') == 'digibiz_admin') {
                            //     businessDigibizAdminsTab()
                            //         .then(() => {
                            //             commonExecutables();
                            //             removeLoader();
                            //             callback();
                            //         })
                            //         .catch((err) => {
                            //             removeLoader();
                            //             callback();
                            //         });
                            // }
                            // else
                            if (sessionStorage.getItem('selected-business-settings-tab') == 'module_admin') {
                                businessModuleAdminsTab()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            }
                        }
                    }
                }, "page/business/module_admin_management", "#module-admin-settings-tab-template", "#main-content-wrapper", null);
            }
        });
    },
    moduleAdminList: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Business Settings</span>`);
                $('.digibiz-cancel-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                moduleAdminListPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    superAdminManagementHub: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                //back button
                // $('.view-digibiz-back-button').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Business Settings</span>`);
                $('.menu-toggle').addClass('hide');
                //cancel button
                // $('.digibiz-cancel-button').removeClass('hide');
                $('.digibiz-cancel-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                if (sessionStorage.getItem('selected-super-admin-management-tab')) {
                    console.log("already the tab has been selected");
                } else {
                    sessionStorage.setItem('selected-super-admin-management-tab', 'active-super-admin');
                }
                fetch.replaceHtml(function (err) {
                    if (!err) {
                        if (sessionStorage.getItem('selected-super-admin-management-tab')) {
                            $('.tab-content').removeClass('active');
                            $(`.tab-content[id="${sessionStorage.getItem('selected-super-admin-management-tab')}"`).addClass('active');
                            $('.tab').removeClass('active');
                            $(`.tab[data-id="${sessionStorage.getItem('selected-super-admin-management-tab')}"]`).addClass('active');
                            digibiz.active_super_admins_list = [];
                            digibiz.pending_super_admins_list = [];
                            if (sessionStorage.getItem('selected-super-admin-management-tab') == 'active-super-admin') {
                                activeSuperAdminsTab()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            } else if (sessionStorage.getItem('selected-super-admin-management-tab') == 'pending-super-admin') {
                                pendingSuperAdminsTab()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            }
                        }
                    }
                }, "page/business/super_admins_tab", "#super-admin-management-tab-template", "#main-content-wrapper", null);
            }
        });
    },
    employeeConfigurations: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Employee Management</span>`);
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                employeeConfigurationsPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    employeeManagementHub: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Employee Management</span>`);
                employeeManagementHubPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },

    employeeBusinessAppsHub: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                //default light mode
                localStorage.setItem('theme', "off");
                document.documentElement.setAttribute('data-darkmode', "off");
                document.documentElement.classList.add('translate');
                if (cordova.platformId == 'android' || cordova.platformId === 'ios') {
                    StatusBar.overlaysWebView(false);
                    StatusBar.backgroundColorByHexString("#0e4d45");
                }

                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'off');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'employee');
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //hide profile and bell icon
                $('#my-profile-menu').addClass('hide');
                $('#my-notifications-menu').addClass('hide');
                employeeBusinessAppsHubPage()
                    .then(() => {
                        localStorage.removeItem('navigate_role_from');
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    employeeGroupCreate: function (callback, uriData = null, middlewareData = null) {
        //check
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                employeeGroupCreationPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },

    employeeControls: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Employee Management</span>`);
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                employeeControlsPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    customerManagementHub: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Customer Management</span>`);
                customerManagementHubPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    customerIdentifiersList: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                //$('.header-logo').addClass('hide');
                // $('.header-heading-name').text('Customer Identifiers');
                $('.header-heading-name').text('');
                $('.header-heading-name').append(`<span class="header_primary truncate">Customer Identifiers</span>`);
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                if (sessionStorage.getItem('selected-customer-identifier-tab')) {
                    console.log("already the tab has been selected");
                } else {
                    sessionStorage.setItem('selected-customer-identifier-tab', 'customer');//associate_customer
                }
                digibiz.customer_identifiers = [];
                digibiz.associate_customer_identifiers = [];
                fetch.replaceHtml(function (err) {
                    if (!err) {
                        if (sessionStorage.getItem('selected-customer-identifier-tab')) {
                            $('.tab-content').removeClass('active');
                            $(`.tab-content[id="${sessionStorage.getItem('selected-customer-identifier-tab')}"`).addClass('active');
                            $('.tab').removeClass('active');
                            $(`.tab[data-id="${sessionStorage.getItem('selected-customer-identifier-tab')}"]`).addClass('active');
                            if (sessionStorage.getItem('selected-customer-identifier-tab') == 'customer') {
                                customerIdentifierListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            } else if (sessionStorage.getItem('selected-customer-identifier-tab') == 'associate_customer') {
                                associateCustomerIdentifierListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            } else {
                                primaryCustomerLabelListPage()
                                    .then(() => {
                                        console.log("123");
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            }
                        }
                    }
                }, "page/customer/customer_identifiers_creation_list_page", "#customer-identifiers-creation-list-page-template", "#main-content-wrapper", null);
            }
        });
    },
    identifiersListForCustomerCreation: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                $('.header-heading-name').text('');
                $('.header-heading-name').append(`<span class="header_primary truncate">Identifiers</span>`);
                $('.header-heading-name').append(`<span class="customer_count_header_primary truncate">Total Customers</span>`);
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');



                digibiz.customer_identifiers_active_customers_list = [];
                // fetch.replaceHtml(function (err) {
                //     if (!err) {
                activeCustomerListPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        callback();
                    });
                // }
                // }, "page/customer/new_customer_creation_tab", "#new-customer-creation-tab-template", "#main-content-wrapper", null);
            }
        });
    },
    customerCreation: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                $('.header-heading-name').text('');
                $('.header-heading-name').append(`<span class="header_primary truncate">Customer Creation</span>`);
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');

                if (sessionStorage.getItem('selected-tab')) {
                    console.log("already the tab has been selected");
                } else {
                    sessionStorage.setItem('selected-tab', 'customer_active');
                    // sessionStorage.setItem('selected-tab', 'customer_pending');//pending tab default
                }
                // digibiz.customer_identifiers = [];
                digibiz.alumini_customer_list = [];
                digibiz.customer_creation_active_list = [];
                digibiz.customer_creation_pending_list = [];
                digibiz.customerFilterData = {
                    status: []
                }
                // digibiz.associate_customer_identifiers = [];
                // digibiz.customer_identifiers_active_customers_list = [];
                // digibiz.customer_identifiers_pending_customers_list = [];
                fetch.replaceHtml(function (err) {
                    if (!err) {
                        if (sessionStorage.getItem('selected-tab')) {
                            $('.tab-content').removeClass('active');
                            $(`.tab-content[id="${sessionStorage.getItem('selected-tab')}"`).addClass('active');
                            $('.tab').removeClass('active');
                            $(`.tab[data-id="${sessionStorage.getItem('selected-tab')}"]`).addClass('active');
                            if (sessionStorage.getItem('selected-tab') == 'identifiers') {
                                customerIdentifierListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            } else if (sessionStorage.getItem('selected-tab') == 'labels') {
                                associateCustomerIdentifierListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            } else if (sessionStorage.getItem('selected-tab') == 'customer_active') {

                                activeCustomerCreationListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });


                                // activeCustomerListPage()
                                //     .then(() => {
                                //         commonExecutables();
                                //         removeLoader();
                                //         callback();
                                //     })
                                //     .catch((err) => {
                                //         removeLoader();
                                //         callback();
                                //     });
                            } else if (sessionStorage.getItem('selected-tab') == 'customer_pending') {

                                pendingCustomerCreationListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            } else if (sessionStorage.getItem('selected-tab') == 'customer_alumini') {
                                aluminiCustomerListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            }
                        }
                    }
                }, "page/customer/new_customer_creation_tab", "#new-customer-creation-tab-template", "#main-content-wrapper", null);
            }
        });
    },
    customerCreationIdentifiersList: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                //$('.header-logo').addClass('hide');
                // $('.header-heading-name').text('Customer List');
                $('.header-heading-name').text('');
                $('.header-heading-name').append(`<span class="header_primary truncate">Customer List</span>`);
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.customer_identifiers = [];
                digibiz.customer_identifiers_active_customers_list = [];
                digibiz.customer_identifiers_pending_customers_list = [];
                if (sessionStorage.getItem('selected-customer-tab')) {
                    console.log("already the tab is been selected");
                } else {
                    sessionStorage.setItem('selected-customer-tab', 'customer_active');
                }
                fetch.replaceHtml(function (err) {
                    if (!err) {
                        if (sessionStorage.getItem('selected-customer-tab')) {
                            $('.tab-content').removeClass('active');
                            $(`.tab-content[id="${sessionStorage.getItem('selected-customer-tab')}"`).addClass('active');
                            $('.tab').removeClass('active');
                            $(`.tab[data-id="${sessionStorage.getItem('selected-customer-tab')}"]`).addClass('active');
                            if (sessionStorage.getItem('selected-customer-tab') == 'customer_active') {
                                activeCustomerListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            } else if (sessionStorage.getItem('selected-customer-tab') == 'customer_pending') {
                                pendingCustomerListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            }
                        }
                    }
                }, "page/customer/customer_creation_list_page", "#customer-list-page-template", "#main-content-wrapper", null);
            }
        });
    },
    customerCreationActiveList: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.customer_creation_active_list = [];
                digibiz.customerFilterData = {
                    status: []
                }
                activeCustomerCreationListPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        callback();
                    });
            }
        });
    },
    customerCreationPendingList: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.customer_creation_pending_list = [];
                pendingCustomerCreationListPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        callback();
                    });
            }
        });
    },
    customerCreate: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                if (sessionStorage.getItem('digibiz_role') == "customer" && sessionStorage.getItem('edit_from') == "profile_page") {
                    $('#my-profile-menu').addClass('hide');
                    $('#my-notifications-menu').addClass('hide');
                    //hide main header
                    $('.header-band').addClass('hide');
                } else {
                    $('#my-profile-menu').removeClass('hide');
                    $('#my-notifications-menu').removeClass('hide');
                }
                customerCreatePage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    customerNotificationDetailsPage: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.customer_notification_details_list = [];
                getCustomerNotificationDetailsPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    customerContactsIdentifiersListPage: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.customer_contacts_identifiers_list = [];
                getCustomerContactsIdentifiersListPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    customerGroupsTabPage: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                //$('.header-logo').addClass('hide');
                // $('.header-heading-name').text('Customer Groups');
                $('.header-heading-name').text('');
                $('.header-heading-name').append(`<span class="header_primary truncate">Customer Groups</span>`);
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                if (sessionStorage.getItem('selected-customer-group-type-tab')) {
                    console.log("already the tab has been selected");
                } else {
                    sessionStorage.setItem('selected-customer-group-type-tab', 'standard');//standard/custom
                }
                fetch.replaceHtml(function (err) {
                    if (!err) {
                        if (sessionStorage.getItem('selected-customer-group-type-tab')) {
                            $('.tab-content').removeClass('active');
                            $(`.tab-content[id="${sessionStorage.getItem('selected-customer-group-type-tab')}"`).addClass('active');
                            $('.tab').removeClass('active');
                            $(`.tab[data-id="${sessionStorage.getItem('selected-customer-group-type-tab')}"]`).addClass('active');
                            if (sessionStorage.getItem('selected-customer-group-type-tab') == 'standard') {
                                digibiz.standard_customer_groups_identifiers_list = [];
                                standardCustomerGroupsIdentifierListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            } else if (sessionStorage.getItem('selected-customer-group-type-tab') == 'custom') {
                                // getCustomerGroupsListPage()
                                digibiz.custom_groups_list = [];
                                customCustomerGroupsListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            }
                        }
                    }
                }, "page/customer/customer_contacts_groups_types_page", "#customer-contacts-groups-type-page-template", "#main-content-wrapper", null);
            }
        });
    },
    customerContactsItemsListPage: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.contacts_items_list = [];
                getCustomerContactsItemsListPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    customerContactListPage: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.contacts_list = [];
                getCustomerContactListPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    customerGroupsListPage: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                getCustomerGroupsListPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    customerGroupsDetails: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                getCustomerGroupsDetailPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    collaboratorCustomerCreate: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                if (sessionStorage.getItem('digibiz_role') == "customer" && sessionStorage.getItem('edit_from') == "profile_page") {
                    $('#my-profile-menu').addClass('hide');
                    $('#my-notifications-menu').addClass('hide');
                    //hide main header
                    $('.header-band').addClass('hide');
                } else {
                    $('#my-profile-menu').removeClass('hide');
                    $('#my-notifications-menu').removeClass('hide');
                }
                collaboratorCustomerCreatePage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    employeeContactListPage: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                //$('.header-logo').addClass('hide');
                // $('.header-heading-name').text('Employee Contact List');
                $('.header-heading-name').text('');
                $('.header-heading-name').append(`<span class="header_primary truncate">Employee Contact List</span>`);
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                if (sessionStorage.getItem('selected-employee-contact-list-type-tab')) {
                    console.log("already the tab has been selected");
                } else {
                    sessionStorage.setItem('selected-employee-contact-list-type-tab', 'all_employees');//all_employess, department_wise
                }
                fetch.replaceHtml(function (err) {
                    if (!err) {
                        if (sessionStorage.getItem('selected-employee-contact-list-type-tab')) {
                            $('.tab-content').removeClass('active');
                            $(`.tab-content[id="${sessionStorage.getItem('selected-employee-contact-list-type-tab')}"`).addClass('active');
                            $('.tab').removeClass('active');
                            $(`.tab[data-id="${sessionStorage.getItem('selected-employee-contact-list-type-tab')}"]`).addClass('active');
                            if (sessionStorage.getItem('selected-employee-contact-list-type-tab') == 'all_employees') {
                                allEmployessListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            } else if (sessionStorage.getItem('selected-employee-contact-list-type-tab') == 'department_wise') {
                                departmentWiseEmployessListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            }
                        }
                    }
                }, "page/employee/employee_contact_list_tab", "#employees-contact-list-tab-template", "#main-content-wrapper", null);
            }
        });
    },
    employeeAccessListPage: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                getEmployeeAccessListPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    employeeGroupCreationList: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                //$('.header-logo').addClass('hide');
                // $('.header-heading-name').text('Employee Groups');
                $('.header-heading-name').text('');
                $('.header-heading-name').append(`<span class="header_primary truncate">Employee Groups</span>`);
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                if (sessionStorage.getItem('selected-employee-group-list-type-tab')) {
                    console.log("already the tab has been selected");
                } else {
                    sessionStorage.setItem('selected-employee-group-list-type-tab', 'standard');//standard, custom
                }
                digibiz.groupFilterData = {
                    status: []
                }
                fetch.replaceHtml(function (err) {
                    if (!err) {
                        if (sessionStorage.getItem('selected-employee-group-list-type-tab')) {
                            $('.tab-content').removeClass('active');
                            $(`.tab-content[id="${sessionStorage.getItem('selected-employee-group-list-type-tab')}"`).addClass('active');
                            $('.tab').removeClass('active');
                            $(`.tab[data-id="${sessionStorage.getItem('selected-employee-group-list-type-tab')}"]`).addClass('active');
                            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == 'standard') {
                                standardEmployeesGroupsListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            } else if (sessionStorage.getItem('selected-employee-group-list-type-tab') == 'custom') {
                                customEmployeesGroupsListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            }
                        }
                    }
                }, "page/employee/employee_group_list_tab", "#employees-group-list-tab-template", "#main-content-wrapper", null);
            }
        });
    },
    collaboratorHub: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Collaborator Mangement</span>`);
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                collaboratorHubPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    collaboratorContactList: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                //$('.header-logo').addClass('hide');
                // $('.header-heading-name').text('Collaborator Contact List');
                $('.header-heading-name').text('');
                $('.header-heading-name').append(`<span class="header_primary truncate">Collaborator Contact List</span>`);
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                // if (localStorage.getItem('theme') == "on") {
                //     document.documentElement.setAttribute('data-darkmode', "on");
                //     document.documentElement.classList.add('translate');
                // } else {
                //     document.documentElement.setAttribute('data-darkmode', "off");
                //     document.documentElement.classList.add('translate');
                // }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.collaborator_contact_list = [];
                digibiz.pending_collaborator_contact_list = [];
                digibiz.alumini_collaborator_contact_list = [];
                if (sessionStorage.getItem('selected-collaborator-tab')) {
                    console.log("already the tab is been selected");
                } else {
                    sessionStorage.setItem('selected-collaborator-tab', 'active_collaborator');
                }
                fetch.replaceHtml(function (err) {
                    if (!err) {
                        if (sessionStorage.getItem('selected-collaborator-tab')) {
                            $('.tab-content').removeClass('active');
                            $(`.tab-content[id="${sessionStorage.getItem('selected-collaborator-tab')}"`).addClass('active');
                            $('.tab').removeClass('active');
                            $(`.tab[data-id="${sessionStorage.getItem('selected-collaborator-tab')}"]`).addClass('active');
                            if (sessionStorage.getItem('selected-collaborator-tab') == 'active_collaborator') {
                                activeCollaboratorContactListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            } else if (sessionStorage.getItem('selected-collaborator-tab') == 'pending_collaborator') {
                                pendingCollaboratorContactListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            } else if (sessionStorage.getItem('selected-collaborator-tab') == 'alumini_collaborator') {
                                aluminiCollaboratorContactListPage()
                                    .then(() => {
                                        commonExecutables();
                                        removeLoader();
                                        callback();
                                    })
                                    .catch((err) => {
                                        removeLoader();
                                        callback();
                                    });
                            }
                        }
                    }
                }, "page/collaborator/collaborator_tabs", "#collaborator-tabs-template", "#main-content-wrapper", null);
            }
        });
    },
    collaboratorContactListNotificationDetails: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.collaborator_contact_list_notification_details = [];
                getCollaboratorContactListNotificationDetailsPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    collaboratorGroupsList: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                if (sessionStorage.getItem('selected-collaborator-tab')) {
                    console.log("already the tab has been selected");
                } else {
                    sessionStorage.setItem('selected-collaborator-tab', 'my_group_collaborator');//standard, custom
                }
                digibiz.collaborator_groups_list = [];
                digibiz.other_collaborator_groups_list = [];
                fetch.replaceHtml(function (err) {
                    if (!err) {
                        getCollaboratorGroupsListPage()
                            .then(() => {
                                // getGroupsCount(function(){});
                                commonExecutables();
                                removeLoader();
                                callback();
                            })
                            .catch((err) => {
                                removeLoader();
                                console.log(err); callback();
                            });
                    }
                }, "page/collaborator/collaborator_group_tabs", "#collaborator-group-tabs-template", "#main-content-wrapper", null);
            }
        });
    },
    collaboratorGroupCreate: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                getCollaboratorGroupCreatePage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    collaboratorGroupDetails: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                getCollaboratorGroupDetailsPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    collaboratorCustomerList: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.collaborator_customer_list = [];
                collaboratorCustomerListPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    roleManagementEmployeeList: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                console.log("cfrvgbth")
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                getRoleManagementPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    roleManagementEmployeeAppsAccessList: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                console.log("cfrvgbth")
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                getRoleManagementEmployeeAppsAccessListPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    digibizLogs: function (callback, uriData = null, middlewareData = null) {
        $('#prospect_settings_back_btn').remove();
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                // add role in body
                $('body').attr('role', 'business_owner');
                // if (localStorage.getItem('theme') == "on") {
                //     document.documentElement.setAttribute('data-darkmode', "on");
                //     document.documentElement.classList.add('translate');
                // } else {
                //     document.documentElement.setAttribute('data-darkmode', "off");
                //     document.documentElement.classList.add('translate');
                // }
                // console.log("digibizLogs")
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //hide profile and bell icon
                $('#my-profile-menu').addClass('hide');
                $('#my-notifications-menu').addClass('hide');
                digibiz.logs_list = [];
                getDigibizLogsPage().then(() => {
                    commonExecutables();
                    removeLoader();
                    callback();
                }).catch((err) => {
                    removeLoader();
                    console.log(err);
                    callback();
                });
            }
        });
    },
    communicationGroups: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Communication Management</span>`);
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                sessionStorage.setItem('selected-communication-group-type-tab', 'communication');//communication/employee/customer
                if (sessionStorage.getItem('selected-communication-tab')) {
                    console.log("already the tab has been selected");
                } else {
                    sessionStorage.setItem('selected-communication-tab', 'communication-group-list');//standard, custom
                }
                digibiz.communicationGroupsList = [];
                fetch.replaceHtml(function () {
                    getCommunicationGroupsPage()
                        .then(() => {
                            commonExecutables();
                            removeLoader();
                            callback();
                        })
                        .catch((err) => {
                            removeLoader();
                            console.log(err);
                            callback();
                        });
                }, "page/communication/communication_group_list_wrapper", "#communication-groups-list-wrapper-template", "#main-content-wrapper", null);
            }
        });
        // onecol.getDigibizLayout(function (err) {
        //     if (!err) {
        //         //$('.tabs-wrapper').addClass('hide');
        //         $('.view-digibiz-back-button').removeClass('hide');
        //         if (sessionStorage.getItem('selected-communication-group-type-tab')) {
        //             console.log("already the tab has been selected");
        //         } else {
        //             sessionStorage.setItem('selected-communication-group-type-tab', 'communication');//communication/employee/customer
        //         }
        //         fetch.replaceHtml(function (err) {
        //             if (!err) {
        //                 if (sessionStorage.getItem('selected-communication-group-type-tab')) {
        //                     $('.tab-content').removeClass('active');
        //                     $(`.tab-content[id="${sessionStorage.getItem('selected-communication-group-type-tab')}"`).addClass('active');
        //                     $('.tab').removeClass('active');
        //                     $(`.tab[data-id="${sessionStorage.getItem('selected-communication-group-type-tab')}"]`).addClass('active');
        //                     digibiz.communicationGroupsList = [];
        //                     digibiz.communicationEmployeeGroupsList = [];
        //                     digibiz.communicationCustomerGroupsList = [];
        //                     if (sessionStorage.getItem('selected-communication-group-type-tab') == 'communication') {
        //                         getCommunicationGroupsPage()
        //                             .then(() => {
        //                                 commonExecutables();
        //                                 removeLoader();
        //                                 callback();
        //                             })
        //                             .catch((err) => {
        //                                 removeLoader();
        //                                 callback();
        //                             });
        //                     } else if (sessionStorage.getItem('selected-communication-group-type-tab') == 'employee') {
        //                         getCommunicationEmployeePage()
        //                             .then(() => {
        //                                 commonExecutables();
        //                                 removeLoader();
        //                                 callback();
        //                             })
        //                             .catch((err) => {
        //                                 removeLoader();
        //                                 callback();
        //                             });
        //                     } else if (sessionStorage.getItem('selected-communication-group-type-tab') == 'customer') {
        //                         getCommunicationCustomerPage()
        //                             .then(() => {
        //                                 commonExecutables();
        //                                 removeLoader();
        //                                 callback();
        //                             })
        //                             .catch((err) => {
        //                                 removeLoader();
        //                                 callback();
        //                             });
        //                     }
        //                 }
        //             }
        //         }, "page/communication/communication_tab_page", "#communication-tab-groups-type-page-template", "#main-content-wrapper", null);
        //     }
        // });
    },
    //used
    communicationGroupDetails: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                // //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                getCommunicationGroupDetailPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },
    communicationEmployeeGroupDetails: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                getCommunicationEmployeeGroupDetailPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },
    communicationCustomerGroupDetails: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                getCommunicationCustomerGroupDetailPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },

    customerBusinessAppsHub: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                //default light mode
                localStorage.setItem('theme', "off");
                document.documentElement.setAttribute('data-darkmode', "off");
                document.documentElement.classList.add('translate');
                if (cordova.platformId == 'android' || cordova.platformId === 'ios') {
                    StatusBar.overlaysWebView(false);
                    StatusBar.backgroundColorByHexString("#0e4d45");
                }

                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'off');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'customer');
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //hide profile and bell icon
                $('#my-profile-menu').addClass('hide');
                $('#my-notifications-menu').addClass('hide');
                customerBusinessAppsHub()
                    .then(() => {
                        localStorage.removeItem('navigate_role_from');
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    customerAccessIdentifiers: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.customer_access_identifiers_list = [];
                customerAccessIdentifiersPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    customerAccessIdentifiersItems: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.customer_access_identifier_items_list = [];
                customerAccessIdentifiersItemsPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    customerAccessIdentifiersItemPage: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                customerAccessIdentifiersItemAccessPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },


    collaboratorCustomerIdentifiers: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                digibiz.collaborator_business_customer_list = [];
                activeCollaboratorCustomerListPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        callback();
                    });
            }
        });
    },




    ProfileManager: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                getProfileManagerPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },

    /**************************QR Scanner********************************** */
    addEmployeeFromQR: function (callback, uriData, middlewareData = null) {
        console.log("addEmployeeFromQR");
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                console.log("employee qr result", result)
                // console.log("getText", result.text)
                var cdevice = result.text;
                // console.log("cdevice", cdevice);
                //console.log("check QR CODE", $('.contact-qr-container').attr('data-app'))
                // if ($('.contact-qr-container').attr('data-app') == "digibiz") {
                if (result.text && result.cancelled != true) {
                    console.log(cdevice);
                    decryptSring(cdevice, function (deviceRes) {
                        try {
                            parsedRes = JSON.parse(deviceRes);
                            // console.log("parsedRes", parsedRes);
                        } catch (e) {
                            window.location.hash = 'employee_creation/list';
                            Materialize.toast("Invalid QR Code", 3000, 'round error-alert');
                        }
                        // if (parsedRes.employee_id || parsedRes.jeevi_name || parsedRes.business_id) {
                        if (parsedRes.jeevi_name) {
                            var accountsReqParams = {
                                device_id: crossplat.device.uuid,
                                name: parsedRes.name,
                                mobile_number: parsedRes.mobile_number
                            }
                            fetch.apiCall(function (response, status, xhr) {
                                if (status === "success") {
                                    // console.log("account result success", response.Data)
                                    var requestParams = {
                                        device_id: crossplat.device.uuid,
                                        business_id: sessionStorage.getItem('business_id'),
                                        account_id: response.Data.id
                                    }
                                    fetch.apiCall(function (response, status, xhr) {
                                        if (status === "success") {
                                            window.location.hash = 'employee_creation/list';
                                            Materialize.toast(`${response.Data.name.first} ${response.Data.name.last} successfully added.`, 3000, 'round success-alert');
                                        } else {
                                            window.location.hash = 'employee_creation/list';
                                            var err = JSON.parse(response.responseText);
                                            Materialize.toast(err.msg, 3000, 'round error-alert');
                                            // if (jsonResponse.Data instanceof Object) {
                                            //     $.each(jsonResponse.Data, function (key, val) {
                                            //         window.plugins.toast.showLongBottom(val);
                                            //     });
                                            // } else {
                                            //     window.plugins.toast.showLongBottom(jsonResponse.message);
                                            // }
                                        }
                                    }, api.add_digibiz_employee, "POST", "JSON", requestParams);
                                } else {
                                    removeLoader();
                                    var err = JSON.parse(response.responseText);
                                    Materialize.toast(err.msg, 3000, 'round error-alert');
                                    window.location.hash = 'employee_creation/list';
                                }
                            }, api.get_digibiz_account, "POST", "JSON", accountsReqParams);
                        } else {
                            var alert_parms = {
                                alert_id: "alert-invalid-qr-code-cancel",
                                alert_platform: crossplat.device.platform,
                                alert_title: `Invalid QR Code`,
                                alert_body: `Failed! Please check the QR code.`,
                                alert_btn: [{
                                    name: "OK",
                                    attr: [{ name: "id", value: "btn-invalid-qr-code-ok" }]
                                }]
                            }
                            showAlert(alert_parms, function () {
                                window.location.hash = 'employee_creation/list';
                                removeLoader();
                            });
                        }
                    });
                } else {
                    console.log("else")
                    window.location.hash = 'employee_creation/list';
                }
                // } else {
                //     var alert_parms = {
                //         alert_id: "alert-invalid-qr-code-cancel",
                //         alert_platform: crossplat.device.platform,
                //         alert_title: `Invalid QR Code`,
                //         alert_body: `Failed! Please check the QR code.`,
                //         alert_btn: [{
                //             name: "OK",
                //             attr: [{ name: "id", value: "btn-invalid-qr-code-ok" }]
                //         }]
                //     }
                //     showAlert(alert_parms, function () {
                //         window.location.hash = 'employee_creation/list';
                //         removeLoader();
                //     });
                // }
            },
            function (error) {
                console.log("error!!!!!")
                console.log("Scanning failed: " + error);
            },
            {
                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: false, // iOS and Android
                showTorchButton: false, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt: "Place the QR code inside the scan area", // Android
                resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats: "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
                orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: false // iOS and Android
            }
        );
    },
    addCustomerFromQR: function (callback, uriData, middlewareData = null) {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                console.log("customer qr result", result)
                console.log("getText", result.text)
                var cdevice = result.text;
                console.log("cdevice", cdevice);
                //console.log("check QR CODE", $('.contact-qr-container').attr('data-app'))
                // if ($('.contact-qr-container').attr('data-app') == "digibiz") {
                if (result.text && result.cancelled != true) {
                    console.log(cdevice);
                    decryptSring(cdevice, function (deviceRes) {
                        try {
                            parsedRes = JSON.parse(deviceRes);
                            console.log("parsedRes", parsedRes);
                        } catch (e) {
                            window.location.hash = 'customer_creation/active/list';
                            Materialize.toast("Invalid QR Code", 3000, 'round error-alert');
                        }
                        // if (parsedRes.employee_id || parsedRes.jeevi_name || parsedRes.business_id) {
                        if (parsedRes.employee_id || parsedRes.jeevi_name) {
                            var accountsReqParams = {
                                device_id: crossplat.device.uuid,
                                name: parsedRes.name,
                                mobile_number: parsedRes.mobile_number
                            }
                            fetch.apiCall(function (response, status, xhr) {
                                if (status === "success") {
                                    console.log("account result success", response.Data)
                                    if (parsedRes.employee_id) {
                                        var empReqParam = {
                                            device_id: crossplat.device.uuid,
                                            get_by: "id",
                                            id: parsedRes.employee_id,
                                        }
                                        employeeGet(empReqParam).then((employeeresult) => {
                                            console.log('employeeresult', employeeresult)
                                            if (employeeresult.customer_control) {
                                                removeLoader();
                                                var requestParams = {
                                                    device_id: crossplat.device.uuid,
                                                    business_id: sessionStorage.getItem('business_id'),
                                                    account_id: response.Data.id,
                                                    identifier_id: sessionStorage.getItem('identifier_id'),
                                                    role: {
                                                        id: parsedRes.employee_id,
                                                        type: "employee"
                                                    }
                                                }
                                                fetch.apiCall(function (responseData, status, xhr) {
                                                    if (status === "success") {
                                                        window.location.hash = 'customer_creation/active/list';
                                                        Materialize.toast(`${response.Data.name.first} ${response.Data.name.last} successfully added.`, 3000, 'round success-alert');
                                                    } else {
                                                        window.location.hash = 'customer_creation/active/list';
                                                        var err = JSON.parse(responseData.responseText);
                                                        Materialize.toast(err.msg, 3000, 'round error-alert');
                                                    }
                                                }, api.add_digibiz_customer, "POST", "JSON", requestParams);
                                            } else {
                                                removeLoader();
                                                Materialize.toast(`You are not authorized to add customer`, 3000, 'round error-alert');
                                            }
                                        }).catch((err) => {
                                            console.log('err', err);
                                            removeLoader();
                                        })
                                    } else {
                                        var requestParams = {
                                            device_id: crossplat.device.uuid,
                                            business_id: sessionStorage.getItem('business_id'),
                                            account_id: response.Data.id,
                                            identifier_id: sessionStorage.getItem('identifier_id'),
                                            role: {
                                                id: response.Data.id,
                                                type: "jeevi"
                                            }
                                        }
                                        fetch.apiCall(function (responseData, status, xhr) {
                                            if (status === "success") {
                                                window.location.hash = 'customer_creation/active/list';
                                                Materialize.toast(`${response.Data.name.first} ${response.Data.name.last} successfully added.`, 3000, 'round success-alert');
                                            } else {
                                                window.location.hash = 'customer_creation/active/list';
                                                var err = JSON.parse(responseData.responseText);
                                                Materialize.toast(err.msg, 3000, 'round error-alert');
                                            }
                                        }, api.add_digibiz_customer, "POST", "JSON", requestParams);
                                    }
                                } else {
                                    removeLoader();
                                    var err = JSON.parse(response.responseText);
                                    Materialize.toast(err.msg, 3000, 'round error-alert');
                                    window.location.hash = 'customer_creation/active/list';
                                }
                            }, api.get_digibiz_account, "POST", "JSON", accountsReqParams);
                        } else {
                            var alert_parms = {
                                alert_id: "alert-invalid-qr-code-cancel",
                                alert_platform: crossplat.device.platform,
                                alert_title: `Invalid QR Code`,
                                alert_body: `Failed! Please check the QR code.`,
                                alert_btn: [{
                                    name: "OK",
                                    attr: [{ name: "id", value: "btn-invalid-qr-code-ok" }]
                                }]
                            }
                            showAlert(alert_parms, function () {
                                window.location.hash = 'customer_creation/active/list';
                                removeLoader();
                            });
                        }
                    });
                } else {
                    console.log("else")
                    window.location.hash = 'customer_creation/active/list';
                }
                // } else {
                //     var alert_parms = {
                //         alert_id: "alert-invalid-qr-code-cancel",
                //         alert_platform: crossplat.device.platform,
                //         alert_title: `Invalid QR Code`,
                //         alert_body: `Failed! Please check the QR code.`,
                //         alert_btn: [{
                //             name: "OK",
                //             attr: [{ name: "id", value: "btn-invalid-qr-code-ok" }]
                //         }]
                //     }
                //     showAlert(alert_parms, function () {
                //         window.location.hash = 'customer_creation/active/list';
                //         removeLoader();
                //     });
                // }
            },
            function (error) {
                console.log("error!!!!!")
                console.log("Scanning failed: " + error);
            },
            {
                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: false, // iOS and Android
                showTorchButton: false, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt: "Place the QR code inside the scan area", // Android
                resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats: "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
                orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: false // iOS and Android
            }
        );
    },
    addAssociateCustomerFromQR: function (callback, uriData, middlewareData = null) {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                console.log("associate_customer qr result", result)
                console.log("getText", result.text)
                var cdevice = result.text;
                console.log("cdevice", cdevice);
                //console.log("check QR CODE", $('.contact-qr-container').attr('data-app'))
                // if ($('.contact-qr-container').attr('data-app') == "digibiz") {
                if (result.text && result.cancelled != true) {
                    console.log(cdevice);
                    decryptSring(cdevice, function (deviceRes) {
                        try {
                            parsedRes = JSON.parse(deviceRes);
                            console.log("parsedRes", parsedRes);
                        } catch (e) {
                            // window.location.hash = 'customer_creation/active/list';
                            Materialize.toast("Invalid QR Code", 3000, 'round error-alert');
                        }
                        // if (parsedRes.employee_id || parsedRes.jeevi_name || parsedRes.business_id) {
                        if (parsedRes.employee_id || parsedRes.jeevi_name) {
                            var accountsReqParams = {
                                device_id: crossplat.device.uuid,
                                name: parsedRes.name,
                                mobile_number: parsedRes.mobile_number
                            }
                            fetch.apiCall(function (response, status, xhr) {
                                if (status === "success") {
                                    // console.log("account result success", response.Data)
                                    if (parsedRes.employee_id) {
                                        var empReqParam = {
                                            device_id: crossplat.device.uuid,
                                            get_by: "id",
                                            id: parsedRes.employee_id,
                                        }
                                        employeeGet(empReqParam).then((employeeresult) => {
                                            console.log('employeeresult', employeeresult)
                                            if (employeeresult.customer_control) {
                                                var requestParams = {
                                                    device_id: crossplat.device.uuid,
                                                    business_id: sessionStorage.getItem('business_id'),
                                                    account_id: response.Data.id,
                                                    // identifier_id: sessionStorage.getItem('identifier_id'),
                                                    customer_id: sessionStorage.getItem('customer_id'),
                                                    role: {
                                                        id: parsedRes.employee_id,
                                                        type: "employee"
                                                    }
                                                }
                                                fetch.apiCall(function (responseData, status, xhr) {
                                                    if (status === "success") {
                                                        window.location.hash = 'customer/create';
                                                        Materialize.toast(`${response.Data.name.first} ${response.Data.name.last} successfully added.`, 3000, 'round success-alert');
                                                    } else {
                                                        window.location.hash = 'customer/create';
                                                        var err = JSON.parse(responseData.responseText);
                                                        Materialize.toast(err.msg, 3000, 'round error-alert');
                                                    }
                                                }, api.add_digibiz_associate_customers, "POST", "JSON", requestParams);
                                            } else {
                                                removeLoader();
                                                Materialize.toast(`You are not authorized to add customer`, 3000, 'round error-alert');
                                            }
                                        }).catch((err) => {
                                            removeLoader();
                                            console.log('err', err);
                                        })
                                    } else {
                                        var requestParams = {
                                            device_id: crossplat.device.uuid,
                                            business_id: sessionStorage.getItem('business_id'),
                                            account_id: response.Data.id,
                                            // identifier_id: sessionStorage.getItem('identifier_id'),
                                            customer_id: sessionStorage.getItem('customer_id'),
                                            role: {
                                                id: response.Data.id,
                                                type: "jeevi"
                                            }
                                        }
                                        fetch.apiCall(function (responseData, status, xhr) {
                                            if (status === "success") {
                                                window.location.hash = 'customer/create';
                                                Materialize.toast(`${response.Data.name.first} ${response.Data.name.last} successfully added.`, 3000, 'round success-alert');
                                            } else {
                                                window.location.hash = 'customer/create';
                                                var err = JSON.parse(responseData.responseText);
                                                Materialize.toast(err.msg, 3000, 'round error-alert');
                                            }
                                        }, api.add_digibiz_associate_customers, "POST", "JSON", requestParams);
                                    }
                                } else {
                                    removeLoader();
                                    var err = JSON.parse(response.responseText);
                                    Materialize.toast(err.msg, 3000, 'round error-alert');
                                    window.location.hash = 'customer/create';
                                }
                            }, api.get_digibiz_account, "POST", "JSON", accountsReqParams);
                        } else {
                            var alert_parms = {
                                alert_id: "alert-invalid-qr-code-cancel",
                                alert_platform: crossplat.device.platform,
                                alert_title: `Invalid QR Code`,
                                alert_body: `Failed! Please check the QR code.`,
                                alert_btn: [{
                                    name: "OK",
                                    attr: [{ name: "id", value: "btn-invalid-qr-code-ok" }]
                                }]
                            }
                            showAlert(alert_parms, function () {
                                window.location.hash = 'customer/create';
                                removeLoader();
                            });
                        }
                    });
                } else {
                    console.log("else")
                    window.location.hash = 'customer/create';
                }
                // } else {
                //     var alert_parms = {
                //         alert_id: "alert-invalid-qr-code-cancel",
                //         alert_platform: crossplat.device.platform,
                //         alert_title: `Invalid QR Code`,
                //         alert_body: `Failed! Please check the QR code.`,
                //         alert_btn: [{
                //             name: "OK",
                //             attr: [{ name: "id", value: "btn-invalid-qr-code-ok" }]
                //         }]
                //     }
                //     showAlert(alert_parms, function () {
                //         window.location.hash = 'customer/create';
                //         removeLoader();
                //     });
                // }
            },
            function (error) {
                console.log("error!!!!!")
                console.log("Scanning failed: " + error);
            },
            {
                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: false, // iOS and Android
                showTorchButton: false, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt: "Place the QR code inside the scan area", // Android
                resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats: "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
                orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: false // iOS and Android
            }
        );
    },
    addSuperAdminFromQR: function (callback, uriData, middlewareData = null) {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                console.log("super admin qr result", result)
                console.log("getText", result.text)
                var cdevice = result.text;
                console.log("cdevice", cdevice);
                //console.log("check QR CODE", $('.contact-qr-container').attr('data-app'))
                // if ($('.contact-qr-container').attr('data-app') == "digibiz") {
                if (result.text && result.cancelled != true) {
                    console.log(cdevice);
                    decryptSring(cdevice, function (deviceRes) {
                        try {
                            parsedRes = JSON.parse(deviceRes);
                            console.log("parsedRes", parsedRes);
                        } catch (e) {
                            window.location.hash = 'super_admin/management/hub';
                            Materialize.toast("Invalid QR Code", 3000, 'round error-alert');
                        }
                        if (parsedRes.employee_id || parsedRes.jeevi_name || parsedRes.business_id) {
                            var accountsReqParams = {
                                device_id: crossplat.device.uuid,
                                name: parsedRes.name,
                                mobile_number: parsedRes.mobile_number
                            }
                            fetch.apiCall(function (response, status, xhr) {
                                if (status === "success") {
                                    console.log("account result success", response.Data)
                                    var requestParams = {
                                        device_id: crossplat.device.uuid,
                                        business_id: sessionStorage.getItem('business_id'),
                                        account_id: response.Data.id
                                    }
                                    fetch.apiCall(function (response, status, xhr) {
                                        if (status === "success") {
                                            window.location.hash = 'super_admin/management/hub';
                                            Materialize.toast(`${response.Data.name.first} ${response.Data.name.last} successfully added.`, 3000, 'round success-alert');
                                        } else {
                                            window.location.hash = 'super_admin/management/hub';
                                            var err = JSON.parse(response.responseText);
                                            Materialize.toast(err.msg, 3000, 'round error-alert');
                                            // if (jsonResponse.Data instanceof Object) {
                                            //     $.each(jsonResponse.Data, function (key, val) {
                                            //         window.plugins.toast.showLongBottom(val);
                                            //     });
                                            // } else {
                                            //     window.plugins.toast.showLongBottom(jsonResponse.message);
                                            // }
                                        }
                                    }, api.add_super_admin_by_qr, "POST", "JSON", requestParams);
                                } else {
                                    removeLoader();
                                    var err = JSON.parse(response.responseText);
                                    Materialize.toast(err.msg, 3000, 'round error-alert');
                                    window.location.hash = 'super_admin/management/hub';
                                }
                            }, api.get_digibiz_account, "POST", "JSON", accountsReqParams);
                        } else {
                            var alert_parms = {
                                alert_id: "alert-invalid-qr-code-cancel",
                                alert_platform: crossplat.device.platform,
                                alert_title: `Invalid QR Code`,
                                alert_body: `Failed! Please check the QR code.`,
                                alert_btn: [{
                                    name: "OK",
                                    attr: [{ name: "id", value: "btn-invalid-qr-code-ok" }]
                                }]
                            }
                            showAlert(alert_parms, function () {
                                window.location.hash = 'super_admin/management/hub';
                                removeLoader();
                            });
                        }
                    });
                } else {
                    console.log("else")
                    window.location.hash = 'super_admin/management/hub';
                }
                // } else {
                //     var alert_parms = {
                //         alert_id: "alert-invalid-qr-code-cancel",
                //         alert_platform: crossplat.device.platform,
                //         alert_title: `Invalid QR Code`,
                //         alert_body: `Failed! Please check the QR code.`,
                //         alert_btn: [{
                //             name: "OK",
                //             attr: [{ name: "id", value: "btn-invalid-qr-code-ok" }]
                //         }]
                //     }
                //     showAlert(alert_parms, function () {
                //         window.location.hash = 'super_admin/management/hub';
                //         removeLoader();
                //     });
                // }
            },
            function (error) {
                console.log("error!!!!!")
                console.log("Scanning failed: " + error);
            },
            {
                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: false, // iOS and Android
                showTorchButton: false, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt: "Place the QR code inside the scan area", // Android
                resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats: "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
                orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: false // iOS and Android
            }
        );
    },
    addBusinessFromQR: function (callback, uriData, middlewareData = null) {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                console.log("collaborator business qr result", result)
                console.log("getText", result.text)
                var cdevice = result.text;
                console.log("cdevice", cdevice);
                //console.log("check QR CODE", $('.contact-qr-container').attr('data-app'))
                // if ($('.contact-qr-container').attr('data-app') == "digibiz") {
                if (result.text && result.cancelled != true) {
                    console.log(cdevice);
                    decryptSring(cdevice, function (deviceRes) {
                        try {
                            parsedRes = JSON.parse(deviceRes);
                            console.log("parsedRes", parsedRes);
                        } catch (e) {
                            window.location.hash = 'collaborator/contact/list';
                            Materialize.toast("Invalid QR Code", 3000, 'round error-alert');
                        }
                        if (parsedRes.employee_id || parsedRes.jeevi_name || parsedRes.business_id) {
                            var reqparams = {
                                device_id: crossplat.device.uuid,
                                type: "collaborator_contact_list",
                                requestor_business_id: sessionStorage.getItem('business_id'),
                                add_type: "add",
                                data_type: "business_name",
                                business_id: parsedRes.business_id
                            }
                            fetch.apiCall(function (response, status, xhr) {
                                if (status === "success") {
                                    window.location.hash = 'collaborator/contact/list';
                                    Materialize.toast(`Successfully sent notification.`, 3000, 'round error-alert');
                                } else {
                                    window.location.hash = 'collaborator/contact/list';
                                    var err = JSON.parse(response.responseText);
                                    Materialize.toast(err.msg, 3000, 'round error-alert');
                                    // if (jsonResponse.Data instanceof Object) {
                                    //     $.each(jsonResponse.Data, function (key, val) {
                                    //         window.plugins.toast.showLongBottom(val);
                                    //     });
                                    // } else {
                                    //     window.plugins.toast.showLongBottom(jsonResponse.message);
                                    // }
                                }
                            }, api.add_business_notification, "POST", "JSON", reqparams);
                        } else {
                            var alert_parms = {
                                alert_id: "alert-invalid-qr-code-cancel",
                                alert_platform: crossplat.device.platform,
                                alert_title: `Invalid QR Code`,
                                alert_body: `Failed! Please check the QR code.`,
                                alert_btn: [{
                                    name: "OK",
                                    attr: [{ name: "id", value: "btn-invalid-qr-code-ok" }]
                                }]
                            }
                            showAlert(alert_parms, function () {
                                window.location.hash = 'collaborator/contact/list';
                                removeLoader();
                            });
                        }
                    });
                } else {
                    console.log("else")
                    window.location.hash = 'collaborator/contact/list';
                }
                // } else {
                //     var alert_parms = {
                //         alert_id: "alert-invalid-qr-code-cancel",
                //         alert_platform: crossplat.device.platform,
                //         alert_title: `Invalid QR Code`,
                //         alert_body: `Failed! Please check the QR code.`,
                //         alert_btn: [{
                //             name: "OK",
                //             attr: [{ name: "id", value: "btn-invalid-qr-code-ok" }]
                //         }]
                //     }
                //     showAlert(alert_parms, function () {
                //         window.location.hash = 'collaborator/contact/list';
                //         removeLoader();
                //     });
                // }
            },
            function (error) {
                console.log("error!!!!!")
                console.log("Scanning failed: " + error);
            },
            {
                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: false, // iOS and Android
                showTorchButton: false, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt: "Place the QR code inside the scan area", // Android
                resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats: "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
                orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: false // iOS and Android
            }
        );
    },


    prospectSettings: function (callback, uriData, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                // add role in body
                $('body').attr('role', 'prospect');
                $('body').attr('header', 'off');
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //hide profile and bell icon
                // if ($('body').attr('app') == "business_owner_business_list" || $('body').attr('app') == "employee_business_list" || $('body').attr('app') == "customer_business_list" || $('body').attr('app') == "prospect_app_hub_page" || $('body').attr('app') == "digibiz_notifications") {
                $('#my-profile-menu').addClass('hide');
                $('#my-notifications-menu').addClass('hide');
                // }
                prospectAppHubSettingsPage()
                    .then(() => {
                        sessionStorage.removeItem('digibiz_storage_selection');
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    businessDisplayControl: function (callback, uriData, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                $('body').attr('header', 'on');
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Profile Management</span>`);
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //hide profile and bell icon
                $('#my-profile-menu').addClass('hide');
                $('#my-notifications-menu').addClass('hide');
                businessDisplayControlPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },

    collaboratorAdd: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                // joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Collaborator Management</span>`);
                $('.menu-toggle').addClass('hide');
                $('.digibiz-cancel-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                // $('#my-profile-menu').removeClass('hide');
                // $('#my-notifications-menu').removeClass('hide');
                fetch.replaceHtml(function (err) {
                    if (!err) {
                        commonExecutables();
                        removeLoader();
                        callback();
                    }
                }, "page/collaborator/collaborator_add_wrapper", "#collaborator-add-search-list-wrapper-template", "#main-content-wrapper", null);
            }
        });
    },

    businessAppPermissionSettings: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                console.log("businessAppPermissionSettings");
                joinRoom(sessionStorage.getItem('business_id'));
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                $('body').attr('header', 'on');
                //$('.tabs-wrapper').addClass('hide');
                //back button
                // $('.view-digibiz-back-button').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //show header logs icon for this page
                $('#app-permission-logs-btn').removeClass('hide');
                if (sessionStorage.getItem('business_name')) {
                    $('.header-heading-name').text("");
                    $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Business Settings</span>`);

                }
                $('.menu-toggle').addClass('hide');
                //cancel button
                // $('.digibiz-cancel-button').removeClass('hide');
                $('.digibiz-cancel-button').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                getBusinessAppPermissionsPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },

    employeeFilter: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                // $('.business-owner-business-list-title-band').remove();
                // $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                // $('.header-heading-name').text('');
                // $('.header-heading-name').append(`<span class="header_primary truncate">Employee Contact List</span>`);
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                fetch.replaceHtml(function () {
                    departmentWiseEmployessListPage()
                        .then(() => {
                            commonExecutables();
                            removeLoader();
                            callback();
                        })
                        .catch((err) => {
                            removeLoader();
                            callback();
                        });
                }, "page/employee/department_wise_employees_list_wrapper", "#department-wise-employees-list-wrapper-template", "#main-content-wrapper", null);
            }
        });
    },

    ProspectAppHubPage: function (callback, uriData = null, middlewareData = null) {
        // homecol.getHomeLayout(function (err) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                //default light mode
                localStorage.setItem('theme', "off");
                document.documentElement.setAttribute('data-darkmode', "off");
                document.documentElement.classList.add('translate');
                if (cordova.platformId == 'android' || cordova.platformId === 'ios') {
                    StatusBar.overlaysWebView(false);
                    StatusBar.backgroundColorByHexString("#0e4d45");
                }

                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                // add role in body
                $('body').attr('role', 'prospect');
                $('body').attr('header', 'off');
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //hide profile and bell icon
                // if ($('body').attr('app') == "business_owner_business_list" || $('body').attr('app') == "employee_business_list" || $('body').attr('app') == "customer_business_list" || $('body').attr('app') == "prospect_app_hub_page" || $('body').attr('app') == "digibiz_notifications") {
                $('#my-profile-menu').addClass('hide');
                $('#my-notifications-menu').addClass('hide');
                // }
                prospectAppHubPage()
                    .then(() => {
                        localStorage.removeItem('navigate_role_from');
                        localStorage.removeItem('navigate_to_digibiz_role')
                        sessionStorage.removeItem('digibiz_storage_selection');
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    JeeviAppHubPage: function (callback, uriData = null, middlewareData = null) {
        console.log("entering jeevi hub page in controller")
        $('#app-root').empty();
        addLoader();
        homecol.getHomeLayout(function (err) {
            if (!err) {
                showHideRoleButtons();
                //default light mode
                localStorage.setItem('theme', "off");
                document.documentElement.setAttribute('data-darkmode', "off");
                document.documentElement.classList.add('translate');
                if (cordova.platformId == 'android' || cordova.platformId === 'ios') {
                    StatusBar.overlaysWebView(false);
                    StatusBar.backgroundColorByHexString("#0e4d45");
                }

                //highlight role button
                $(`#jeevi-role-btn`).addClass('active').siblings('.role-btn').removeClass('active');
                sessionStorage.setItem('get_role_btn', 'jeevi-role-btn');

                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                // add role in body
                $('body').attr('role', 'prospect');
                $('body').attr('header', 'off');
                //simultaneously calls
                if (digibiz.checkAccountFlag == true) {
                    console.log("***************CHECKACCOUNTFLAG--TRUE**********");
                } else {
                    // employeeBusinessListHelperMethod();
                    employeeModuleListHelperMethod();
                    // customerBusinessListHelperMethod();
                    customerModuleListHelperMethod();
                    associateCustomerModuleListHelperMethod();
                    businessAdminBusinessListHelperMethod();
                }
                jeeviAppHubPage()
                    .then(() => {
                        localStorage.removeItem('navigate_role_from');
                        localStorage.removeItem('navigate_to_digibiz_role')
                        sessionStorage.removeItem('digibiz_storage_selection');
                        if (digibiz.checkAccountFlag == false) {
                            digibiz.checkAccountFlag = true;
                        }
                        showHideRoleButtons();
                        notificationCountListHelperMethod();
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },

    businessOwnerBusinessList: function (callback, uriData = null, middlewareData = null) {
        $('#app-root').empty();
        addLoader();
        homecol.getHomeLayout(function (err) {
            if (!err) {
                showHideRoleButtons();
                //default light mode
                localStorage.setItem('theme', "off");
                document.documentElement.setAttribute('data-darkmode', "off");
                document.documentElement.classList.add('translate');

                //highlight role button
                $(`#business-role-btn`).addClass('active').siblings('.role-btn').removeClass('active');
                sessionStorage.setItem('get_role_btn', 'business-role-btn');

                sessionStorage.setItem('digibiz_role', 'business_owner');

                sessionStorage.removeItem('successCode');
                sessionStorage.removeItem('authErrorCode');
                sessionStorage.removeItem('business_id');
                sessionStorage.removeItem('business_name');
                sessionStorage.removeItem('business_storage_token');

                $('body').attr('role', 'business_owner');
                $('body').attr('header', 'off');

                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();

                $('#my-profile-menu').addClass('hide');
                $('#my-notifications-menu').addClass('hide');

                sessionStorage.removeItem('business_id');
                sessionStorage.removeItem('business_role');

                $('.view-digibiz-back-button').removeClass('hide');
                $('.menu-toggle').removeClass('hide');
                $('.digibiz-cancel-button').addClass('hide');

                //simultaneously calls
                if (digibiz.checkAccountFlag == true) {
                    console.log("***************CHECKACCOUNTFLAG--TRUE**********");
                    // if (digibiz.business_owner_business_list.length > 0) {
                    //     console.log("business is there")
                    // } else {
                    //     location.hash = `jeevi/app/hub`;
                    // }
                } else {
                    console.log("***************CHECKACCOUNTFLAG--FALSE**********");
                    // employeeBusinessListHelperMethod();
                    employeeModuleListHelperMethod();
                    customerBusinessListHelperMethod();
                    associateCustomerModuleListHelperMethod();
                    // businessAdminBusinessListHelperMethod();
                }
                businessAdminBusinessListPage()
                    .then(() => {
                        $('.business-owner-business-list-main-container').prepend(`<div class="business-owner-business-list-title-band">
                <div class="business-owner-business-list-title-band-wrapper">
                    <span class="digibiz-business-owner-role-logs waves-effect cursor-pointer"><i class="material-icons">local_activity</i></span>
                    <span class="searchbtn waves-effect cursor-pointer"><i class="material-icons">search</i></span>              
                    <div class="expand-search-wrap" id="business-owner-business-list-search-btn">
                      <input class="expand-search-input" type="search" placeholder="Search" autocomplete="off">
                      <span class="searchclosebtn"><i class="material-icons business-owner-business-list-close-btn hide">close</i></span>
                    </div>
                  </div>
                </div>`);

                        $('#my-profile-menu').addClass('hide');
                        $('#my-notifications-menu').addClass('hide');
                        localStorage.removeItem('navigate_to_digibiz_role');
                        if (digibiz.checkAccountFlag == false) {
                            digibiz.checkAccountFlag = true;
                        }
                        showHideRoleButtons();
                        notificationCountListHelperMethod();
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });

            }
        });
    },

    EmployeeBusinessList: function (callback, uriData = null, middlewareData = null) {
        $('#app-root').empty();
        addLoader();
        homecol.getHomeLayout(function (err) {
            if (!err) {
                showHideRoleButtons();
                //default light mode
                localStorage.setItem('theme', "off");
                document.documentElement.setAttribute('data-darkmode', "off");
                document.documentElement.classList.add('translate');

                //highlight role button
                $(`#employee-role-btn`).addClass('active').siblings('.role-btn').removeClass('active');
                sessionStorage.setItem('get_role_btn', 'employee-role-btn');

                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                // add role in body
                $('body').attr('role', 'employee');
                $('body').attr('header', 'off');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //hide profile and bell icon
                $('#my-profile-menu').addClass('hide');
                $('#my-notifications-menu').addClass('hide');
                //$('.tabs-wrapper').addClass('hide');
                sessionStorage.setItem('digibiz_role', 'employee');
                $('.view-digibiz-back-button').removeClass('hide');

                //simultaneously calls
                if (digibiz.checkAccountFlag == true) {
                    console.log("***************CHECKACCOUNTFLAG--TRUE**********");
                    if (digibiz.employee_business_list.length > 0) {
                        console.log("business is there")
                    } else {
                        location.hash = `jeevi/app/hub`;
                    }
                } else {
                    console.log("***************CHECKACCOUNTFLAG--FALSE**********");
                    // employeeBusinessListHelperMethod();
                    customerModuleListHelperMethod();
                    associateCustomerModuleListHelperMethod();
                    businessAdminBusinessListHelperMethod();
                }
                employeesBusinessListPage()
                    .then(() => {
                        $('.employee-business-list-main-container').prepend(`<div class="employee-business-list-title-band">
                <span class="searchbtn waves-effect"><i class="material-icons">search</i></span>
                <div class="expand-search-wrap" id="employee-business-list-search-btn">
                  <input class="expand-search-input" type="search" placeholder="Search" autocomplete="off">
                  <span class="searchclosebtn"><i class="material-icons employee-business-list-close-btn hide">close</i></span>
                </div>
            </div>`);

                        sessionStorage.removeItem('business_id');
                        localStorage.removeItem('navigate_to_digibiz_role');
                        if (digibiz.checkAccountFlag == false) {
                            digibiz.checkAccountFlag = true;
                        }
                        joinRoom(sessionStorage.getItem('socketID'));
                        showHideRoleButtons();
                        notificationCountListHelperMethod();
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },


    CustomerBusinessList: function (callback, uriData = null, middlewareData = null) {
        $('#app-root').empty();
        addLoader();
        homecol.getHomeLayout(function (err) {
            if (!err) {
                showHideRoleButtons();
                //default light mode
                localStorage.setItem('theme', "off");
                document.documentElement.setAttribute('data-darkmode', "off");
                document.documentElement.classList.add('translate');

                //highlight role button
                $(`#customer-role-btn`).addClass('active').siblings('.role-btn').removeClass('active');
                sessionStorage.setItem('get_role_btn', 'customer-role-btn');

                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                // add role in body
                $('body').attr('role', 'customer');
                $('body').attr('header', 'off');
                sessionStorage.removeItem('business_id');
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //hide profile and bell icon
                $('#my-profile-menu').addClass('hide');
                $('#my-notifications-menu').addClass('hide');
                sessionStorage.setItem('digibiz_role', 'customer');

                //simultaneously calls
                if (digibiz.checkAccountFlag == true) {
                    console.log("***************CHECKACCOUNTFLAG--TRUE**********");
                    if (digibiz.customer_business_list.length > 0) {
                        console.log("business is there")
                    } else {
                        location.hash = `jeevi/app/hub`;
                    }
                } else {
                    // employeeBusinessListHelperMethod();
                    employeeModuleListHelperMethod();
                    associateCustomerModuleListHelperMethod();
                    businessAdminBusinessListHelperMethod();
                }
                customersBusinessListPage()
                    .then(() => {
                        $('.employee-business-list-main-container').prepend(`<div class="employee-business-list-title-band">
                <span class="searchbtn waves-effect"><i class="material-icons">search</i></span>
                <div class="expand-search-wrap" id="employee-business-list-search-btn">
                  <input class="expand-search-input" type="search" placeholder="Search" autocomplete="off">
                  <span class="searchclosebtn"><i class="material-icons employee-business-list-close-btn hide">close</i></span>
                </div>
            </div>`);

                        $('#my-profile-menu').addClass('hide');
                        $('#my-notifications-menu').addClass('hide');
                        localStorage.removeItem('navigate_to_digibiz_role');
                        if (digibiz.checkAccountFlag == false) {
                            digibiz.checkAccountFlag = true;
                        }
                        var customer_business_list = digibiz.customer_business_list.filter(e => e.type == "customer");
                        var associate_customer_business_list = digibiz.customer_business_list.filter(e => e.type == "associate_customer");
                        console.log('112', customer_business_list, associate_customer_business_list);
                        if (customer_business_list.length == 0 && associate_customer_business_list.length > 0) {
                            $(`.tab[data-id="customer-business-list"]`).addClass('hide');
                            $(`.tab[data-id="customer-business-list"]`).removeClass('active');
                            $('#customer-business-list').removeClass('active')

                            $(`.tab[data-id="associate-customer-business-list"]`).removeClass('hide');
                            $(`.tab[data-id="associate-customer-business-list"]`).addClass('active');
                            $('#associate-customer-business-list').addClass('active')
                        }

                        if (customer_business_list.length > 0 && associate_customer_business_list.length == 0) {
                            $(`.tab[data-id="associate-customer-business-list"]`).addClass('hide');
                            $(`.tab[data-id="associate-customer-business-list"]`).removeClass('active');
                            $('#associate-customer-business-list').removeClass('active')

                            $(`.tab[data-id="customer-business-list"]`).removeClass('hide');
                            $(`.tab[data-id="customer-business-list"]`).addClass('active');
                            $('#customer-business-list').addClass('active')
                        }

                        showHideRoleButtons();
                        notificationCountListHelperMethod();
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },




    digibizHome: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                //default light mode
                localStorage.setItem('theme', "off");
                document.documentElement.setAttribute('data-darkmode', "off");
                document.documentElement.classList.add('translate');
                // add role in body(default page)
                $('body').attr('role', 'prospect');
                //add header attribute in body tag for background green gradient(default)
                $('body').attr('header', 'off');
                digibizHomePage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },

    digibizProfile: function (callback, uriData = null, middlewareData = null) {
        console.log("digibizProfile");
        $('#app-root').empty();
        addLoader();
        homecol.getHomeLayout(function (err) {
            if (!err) {
                console.log("got out of getHomeLayout")
                showHideRoleButtons();
                //default light mode
                localStorage.setItem('theme', "off");
                document.documentElement.setAttribute('data-darkmode', "off");
                document.documentElement.classList.add('translate');

                //add header attribute in body tag for background green gradient(default)
                $('body').attr('header', 'off');
                //highlight role button
                $(`#profile-btn`).addClass('active').siblings('.role-btn').removeClass('active');
                sessionStorage.setItem('get_role_btn', 'profile-btn');
                //simultaneously calls
                if (digibiz.checkAccountFlag == true) {
                    console.log("***************CHECKACCOUNTFLAG--TRUE**********");
                    if (digibiz.employee_business_list.length > 0) {
                        $('#employee-role-btn').removeClass('hide');
                    }
                    if (digibiz.customer_business_list.length > 0) {
                        $('#customer-role-btn').removeClass('hide');
                    }
                    if (digibiz.business_owner_business_list.length > 0) {
                        $('#business-role-btn').removeClass('hide');
                    }
                } else {
                    // employeeBusinessListHelperMethod();
                    employeeModuleListHelperMethod();
                    customerBusinessListHelperMethod();
                    associateCustomerModuleListHelperMethod();
                    businessAdminBusinessListHelperMethod();
                }
                digibizProfilePage()
                    .then(() => {
                        notificationCountListHelperMethod();
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            } else {
                console.log("error from getHomeLayout")
            }
        });
    },

    digibizAccounts: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {

                $('body').attr('header', 'off');

                $('.view-digibiz-back-button').removeClass('hide');

                // prospectAppHubSettingsPage()
                digibizAccountsSettingsPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    digibizCredentials: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('body').attr('header', 'off');
                $('.view-digibiz-back-button').removeClass('hide');
                // prospectAppHubSettingsPage()
                digibizCredentialsSettingsPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    digibizActivity: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('body').attr('header', 'off');
                $('.view-digibiz-back-button').removeClass('hide');
                // prospectAppHubSettingsPage()
                digibizActivitySettingsPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },
    showLoginConfirmation: function (callback, uriData = null, middlewareData = null) {
        console.log('inside login confirmation');
        getUserProfile(function (getProfileDetailsError, profileDetails) {
            console.log("1234567890")
            var fchar = profileDetails.individual.name.first.charAt(0);
            var profileImageData = {
                warningUrl: url.warning,
                profileImage: false
            };
            // get profile picture
            if (profileDetails.pictures.profile_display.image_id) {
                profileDetails.image_url = profileDetails.pictures.profile_display.image_id ? config.api.core + "/api/individual/get_image?image_id=" + profileDetails.pictures.profile_display.image_id + "&device_id=" + crossplat.device.uuid : null;
                profileImageData.avatarUrl = profileDetails.pictures.profile_display.image_id ? config.api.core + "/api/individual/get_image?image_id=" + profileDetails.pictures.profile_display.image_id + "&device_id=" + crossplat.device.uuid : null;
                profileImageData.thumbnailUrl = profileDetails.pictures.profile_display.image_id ? config.api.core + "/api/individual/get_image?image_id=" + profileDetails.pictures.profile_display.image_id + "&device_id=" + crossplat.device.uuid : null;
                profileImageData.profileImage = profileDetails.pictures.profile_display.image_id ? true : false;
                profileImageData.defaultImage = profileDetails.pictures.profile_display.image_id ? false : true;
                profileImageData.imageLetter = fchar;
            } else {
                profileImageData.avatarUrl = null;
                profileImageData.imageLetter = fchar;
                profileImageData.defaultImage = true;
            }

            let data = {
                user_id: profileDetails.individual.id,
                user_name: profileDetails.individual.name.first + " " + profileDetails.individual.name.last,
                mobile_number: profileDetails.login.mobile_number,
                unique_name: profileDetails.login.user_name,
                profileImageData
            }
            console.log("data", data);
            emptycol.getEmptyLayout(function (status) {
                console.log("!!!!!!!")
                $('.logo-display-container').addClass('hide');
                commonExecutables();
                removeLoader();
                callback();
            }, 'page/axxount_confirmation/login_account_confirmation', '#login-confirmation-template', '#login-container', data);
        });
    },
    showReregisterConfirmation: function (callback, uriData = null, middlewareData = null) {
        console.log('inside reregister confirmation');
        getUserProfile(function (getProfileDetailsError, profileDetails) {
            var fchar = profileDetails.individual.name.first.charAt(0);
            var profileImageData = {
                warningUrl: url.warning,
                profileImage: false
            };
            // get profile picture
            if (profileDetails.pictures.profile_display.image_id) {
                profileDetails.image_url = profileDetails.pictures.profile_display.image_id ? config.api.core + "/api/individual/get_image?image_id=" + profileDetails.pictures.profile_display.image_id + "&device_id=" + crossplat.device.uuid : null;
                profileImageData.avatarUrl = profileDetails.pictures.profile_display.image_id ? config.api.core + "/api/individual/get_image?image_id=" + profileDetails.pictures.profile_display.image_id + "&device_id=" + crossplat.device.uuid : null;
                profileImageData.thumbnailUrl = profileDetails.pictures.profile_display.image_id ? config.api.core + "/api/individual/get_image?image_id=" + profileDetails.pictures.profile_display.image_id + "&device_id=" + crossplat.device.uuid : null;
                profileImageData.profileImage = profileDetails.pictures.profile_display.image_id ? true : false;
                profileImageData.defaultImage = profileDetails.pictures.profile_display.image_id ? false : true;
                profileImageData.imageLetter = fchar;
            } else {
                profileImageData.avatarUrl = null;
                profileImageData.imageLetter = fchar;
                profileImageData.defaultImage = true;
            }

            let data = {
                user_id: profileDetails.individual.id,
                firstname: profileDetails.individual.name.first,
                lastname: profileDetails.individual.name.last,
                user_name: profileDetails.individual.name.first + " " + profileDetails.individual.name.last,
                mobile_number: profileDetails.login.mobile_number,
                unique_name: profileDetails.login.user_name,
                profileImageData
            }

            emptycol.getEmptyLayout(function (status) {
                $('.logo-display-container').addClass('hide');
                commonExecutables();
                removeLoader();
                callback();
            }, 'page/reregistration/recreate_account', '#delete-confirmation-template', '#login-container', data);
        });
    },
    testController: function (callback, uriData = null, middlewareData = null) {
        console.log("inside the test Controller");
        $('.logo-display-container').addClass('hide');
        removeLoader();
        callback();
    },
    editEmployeeProfile: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'employee');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                $('.view-digibiz-back-button').addClass('hide');
                $('#app-permission-logs-btn').addClass('hide');
                // if (sessionStorage.getItem('digibiz_role') == "employee" && sessionStorage.getItem('edit_from') == "profile_page") {
                $('#my-profile-menu').addClass('hide');
                $('#my-notifications-menu').addClass('hide');
                //hide main header
                $('.header-band').addClass('hide');
                employeeProfileEditPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },
    editCustomerProfile: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'employee');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                $('.view-digibiz-back-button').addClass('hide');
                $('#app-permission-logs-btn').addClass('hide');
                // if (sessionStorage.getItem('digibiz_role') == "employee" && sessionStorage.getItem('edit_from') == "profile_page") {
                $('#my-profile-menu').addClass('hide');
                $('#my-notifications-menu').addClass('hide');
                //hide main header
                $('.header-band').addClass('hide');
                customerProfileEditPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },
    editAssociateCustomerProfile: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'employee');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                $('.view-digibiz-back-button').addClass('hide');
                $('#app-permission-logs-btn').addClass('hide');
                // if (sessionStorage.getItem('digibiz_role') == "employee" && sessionStorage.getItem('edit_from') == "profile_page") {
                $('#my-profile-menu').addClass('hide');
                $('#my-notifications-menu').addClass('hide');
                //hide main header
                $('.header-band').addClass('hide');
                associateCustomerProfileEditPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err);
                        callback();
                    });
            }
        });
    },

    teamsManagementHub: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                $('.header-heading-name').text("");
                $('.header-heading-name').append(`<span class="header_primary truncate">${sessionStorage.getItem('business_name')}</span><span class="header_secondary truncate">Team Management</span>`);
                teamManagementHubPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },

    teamGroupCreationList: function (callback, uriData = null, middlewareData = null) {
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                //$('.header-logo').addClass('hide');
                // $('.header-heading-name').text('Employee Groups');
                $('.header-heading-name').text('');
                $('.header-heading-name').append(`<span class="header_primary truncate">Team Groups</span>`);
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').removeClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                // if (sessionStorage.getItem('selected-employee-group-list-type-tab')) {
                //     console.log("already the tab has been selected");
                // } else {
                //     sessionStorage.setItem('selected-employee-group-list-type-tab', 'standard');//standard, custom
                // }
                // fetch.replaceHtml(function (err) {
                //     if (!err) {
                teamGroupsListPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        callback();
                    });
                // }
                // }, "page/employee/employee_group_list_tab", "#employees-group-list-tab-template", "#main-content-wrapper", null);
            }
        });
    },

    teamsGroupCreate: function (callback, uriData = null, middlewareData = null) {
        //check
        onecol.getDigibizLayout(function (err) {
            if (!err) {
                $('.business-owner-business-list-title-band').remove();
                $('.employee-business-list-title-band').remove();
                $('body').attr('header', 'on');
                joinRoom(sessionStorage.getItem('business_id'));
                // add role in body
                $('body').attr('role', 'business_owner');
                if (localStorage.getItem('theme') == "on") {
                    document.documentElement.setAttribute('data-darkmode', "on");
                    document.documentElement.classList.add('translate');
                } else {
                    document.documentElement.setAttribute('data-darkmode', "off");
                    document.documentElement.classList.add('translate');
                }
                //$('.tabs-wrapper').addClass('hide');
                $('.view-digibiz-back-button').addClass('hide');
                //hide header logs icon for this page
                $('#app-permission-logs-btn').addClass('hide');
                //show profile and bell icon
                $('#my-profile-menu').removeClass('hide');
                $('#my-notifications-menu').removeClass('hide');
                teamGroupCreationPage()
                    .then(() => {
                        commonExecutables();
                        removeLoader();
                        callback();
                    })
                    .catch((err) => {
                        removeLoader();
                        console.log(err); callback();
                    });
            }
        });
    },

};
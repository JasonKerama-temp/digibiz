let sockets = {
    coreSocket: io(`${config.api.socket}/core`, { transports: ['websocket'] }),
    digibizSocket: io(`${config.api.socket}/digibiz`, { transports: ['websocket'] }),
    searchSocket: io(`${config.api.search}/search`, { transports: ['websocket'] }),
    coreSearchSocket: io(`${config.api.core_search}/search`, { transports: ['websocket'] }),
    requestParams: {
        device_id: crossplat.device.uuid,
    },
    init: function () {
        fetch.apiCall(function (response, status, xhr) {
            if (status === "success") {
                //console.log("9999 success");
                document.dispatchEvent(new CustomEvent('loggedin_socket'));
            } else {
                //console.log("888 failure");
                sockets.digibizSocket.emit('joinroom', crossplat.device.uuid);
            }
        }, api.get_session, "POST", "JSON", this.requestParams);
    },
    appInit: function (rec) {
        //console.log(rec);
        if (rec.data.app != config.app_name && crossplat.device.uuid == rec.data.device.id) {
            // sessionStorage.clear();
            //console.log("NAVIGATING TO CORE")
            setTimeout(function () {
                deviceHelper.navigateToAccounts('core');
            }, 1000);
        }
    },

    logout: function (rec) {
        console.log("logout", rec.data);
        let device_id = rec.data.device_id;
        if (crossplat.device.uuid == device_id) {
            sockets.digibizSocket.emit('leaveroom', sessionStorage.getItem('socketID'));
            sockets.digibizSocket.emit('joinroom', crossplat.device.uuid);
            sessionStorage.clear();
            setTimeout(function () {
                deviceHelper.navigateToAccounts('core');
            }, 1000);
        }
    },

    renderSearchResult: function (rec) {
        //console.log("search new res", rec);
        removeLoader();
        let current_route = $("body").attr('app');
        let element = document.querySelector(".expand-search-input");
        let deptElem = $('#department-wise-employees-list-modal').find('.expand-search-input');
        let elementTwo = $('#modal-communication-group-activate-employee-group-employee-list-selection').find('.expand-search-input');
        let elementThree = $('#modal-collaborator-group-business-members').find('.expand-search-input');
        let elementFour = $('#modal-collaborator-group-owner-business-employee-selection').find('.expand-search-input');
        let elementFive = $('#group-member-search-modal').find('.expand-search-input');
        let elementSix = $('#modal-communication-group-employee-group-selection').find('.expand-search-input');
        let elementSeven = $('#modal-communication-group-collaborator-group-selection').find('.expand-search-input');
        let elementEight = $('#modal-communication-group-customer-group-selection').find('.expand-search-input');
        let elementNine = $('#modal-communication-group-employees-selection').find('.expand-search-input');
        let elementTen = $('#modal-communication-group-customer-contact-list-selection').find('.expand-search-input');
        let elementEleven = $('#modal-communication-group-moderator-selection').find('.expand-search-input');
        let elementTwelve = $('#modal-communication-group-create-employee-group-employee-list-selection').find('.expand-search-input');
        let elementThirteen = $('#modal-collaborator-group-owner-business-employee-selection').find('.expand-search-input');
        switch (current_route) {
            case 'module_admin_list':
                if ($('#modal-module-admin-add-employee-selection').length > 0) {
                    if (rec.socketid == element.getAttribute("socketid")) {

                        processSearchedEmployeeSelectionList(rec.data, function (pro) {
                        });
                    }
                }
                break;
            case 'business_settings':
                if ($('#modal-digibiz-admin-add-employee-selection').length > 0) {
                    if (rec.socketid == element.getAttribute("socketid")) {

                        processSearchedEmployeeSelectionList(rec.data, function (pro) {
                        });
                    }
                }
                break;
            case 'super_admin_management_hub':
                if ($('#modal-super-admin-add-employee-selection').length > 0) {
                    if (rec.socketid == element.getAttribute("socketid")) {

                        processSearchedEmployeeSelectionList(rec.data, function (pro) {
                        });
                    }
                }
                break;
            case 'collaborator_add':
                if (rec.socketid == element.getAttribute("socketid")) {
                    digibiz.collboratorContactAdd = {};
                    processSearchedCollaboratorAddSearchListPage(rec.data, function (pro) {
                    });
                }
                break;
            case 'business_owner_business_list':
                if (rec.socketid == element.getAttribute("socketid")) {
                    //console.log("search socket business owner business list page");
                    processSearchedBusinessOwnerBusinessListPage(rec.data, function (pro) {
                    });
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'employee_business_list':
                if (rec.socketid == element.getAttribute("socketid")) {
                    //console.log("search socket business owner business list page");
                    processSearchedEmployeeBusinessListPage(rec.data, function (pro) {
                    });
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'customer_business_list':
                if (rec.socketid == element.getAttribute("socketid")) {
                    //console.log("search socket customer_business_list");
                    processSearchedCustomerBusinessListPage(rec.data, function (pro) {
                    });
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'department_management':
                if (rec.socketid == element.getAttribute("socketid")) {
                    //console.log("search socket department list page");
                    processSearchedDepartmentListPage(rec.data, function (pro) {
                    });
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'employee_creation_list':
                if (rec.socketid == element.getAttribute("socketid")) {
                    if (sessionStorage.getItem('selected-employee-tab') == "employee_active") {
                        //console.log("search socket employee craetion active list page");
                        processSearchedEmployeeCreationActivePage(rec.data, function (pro) {
                        });
                    } else if (sessionStorage.getItem('selected-employee-tab') == "employee_pending") {
                        //console.log("search socket employee craetion pending list page");
                        processSearchedEmployeeCreationPendingPage(rec.data, function (pro) {
                        });
                    }
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'employee_create':
                if (rec.socketid == element.getAttribute("socketid")) {
                    if ($('#assign-employee-department-modal').length > 0) {
                        processSearchedEmployeeCreatDepartmentList(rec.data, function (pro) {
                        });
                    }
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'employee_contact_list':
                if (rec.socketid == element.getAttribute("socketid") || rec.socketid == deptElem.attr("socketid")) {
                    if (sessionStorage.getItem('selected-employee-contact-list-type-tab') == "all_employees") {
                        //console.log("search socket employee contact list all employess list page");
                        processSearchedEmployeeContactListAllEmployeePage(rec.data, function () {
                        });
                    } else if (sessionStorage.getItem('selected-employee-contact-list-type-tab') == "department_wise") {
                        //console.log("211")
                        if ($('#department-wise-employees-list-modal').length > 0) {
                            //console.log("123")
                            processSearchedEmployeeCreatDepartmentList(rec.data, function () {
                            });
                        }
                    }
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'employee_access_list':
                if (rec.socketid == element.getAttribute("socketid")) {
                    processSearchedEmployeeAccessListPage(rec.data, function (pro) {
                    });
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'employee_types':
                if (rec.socketid == element.getAttribute("socketid")) {
                    processSearchedEmployeeTypesListPage(rec.data, function (pro) {
                    });
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'employee_category':
                if (rec.socketid == element.getAttribute("socketid")) {
                    processSearchedEmployeeCategoryListPage(rec.data, function (pro) {
                    });
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'employee_designation':
                if (rec.socketid == element.getAttribute("socketid")) {
                    processSearchedEmployeeDesignationListPage(rec.data, function (pro) {
                    });
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'employee_group_creation_list':
                if (rec.socketid == element.getAttribute("socketid") || rec.socketid == elementTwo.attr("socketid")) {
                    if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "standard") {
                        if ($('#modal-communication-group-activate-employee-group-employee-list-selection').length > 0) {
                            processSearchedEmployeeStandardGroupNewModeratorAddSearchResult(rec.data, function () {
                            });
                        } else {
                            processSearchedStandardEmployeeGroupsList(rec.data, function () {
                            });
                        }
                    } else {//custom tab
                        if ($('#modal-communication-group-activate-employee-group-employee-list-selection').length > 0) {
                            //console.log("123", rec.data);
                            //console.log("234", rec.data[0].group_data)
                            processSearchedCommunicationGroupActivateEmployeeGroupEmployeeList(rec.data, rec.data[0].group_data, function () {
                            });
                        } else {
                            processSearchedCustomEmployeeGroupsList(rec.data, function () {
                            });
                        }
                    }
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'employee_group_create':
                if (rec.socketid == element.getAttribute("socketid") || rec.socketid == elementTwo.attr("socketid")) {
                    if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "standard") {
                        if ($('#modal-communication-group-activate-employee-group-employee-list-selection').length > 0) {
                            processSearchedEmployeeStandardGroupNewModeratorAddSearchResult(rec.data, function () {
                            });
                        } else {
                            if ($('#group-member-search-modal').length > 0) {
                                //console.log("rec.data", rec.data);
                                processSearchedEmployeeStandardGroupMember(rec.data, function () {
                                });
                            }
                        }
                    } else {//member
                        if ($('#modal-communication-group-activate-employee-group-employee-list-selection').length > 0) {
                            if (rec.data[0].group_data.custom_group_from == "standard_group") {
                                processSearchedCommunicationGroupActivateEmployeeGroupEmployeeList(rec.data, rec.data[0].group_data, function () {
                                });
                            } else {
                                processSearchedCommunicationGroupActivateEmployeeGroupEmployeeList(rec.data, rec.data[0].group_data, function () {
                                });
                            }
                        } else if ($('#modal-employee-selection').length > 0) {
                            processSearchedEmployeeGroupEmployeeSelectionList(rec.data, function () {
                                listenForSearchedEmployeeGroupEmployeeSelectionListScrollEvent($(".modal-popup-content"));
                            });
                        } else if ($('#modal-standard-employee-group-selection').length > 0) {
                            processSearchedEmployeeGroupStandardGroupSelectionList(rec.data, function () {
                            });
                        } else if ($('#group-member-search-modal').length > 0) {
                                //console.log("rec.data", rec.data);
                                processSearchedEmployeeStandardGroupMember(rec.data, function () {
                                });
                            
                        } else if ($('#modal-communication-group-moderator-selection').length > 0) {
                            //console.log("rec.data", rec.data);
                            processSearchedCommunicationGroupActivate(rec.data, "contact_list", function () { })
                        }
                    
                    }
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'employee_access_list':
                if (rec.socketid == element.getAttribute("socketid")) {
                    processSearchedEmployeeAccessList(rec.data, function () {
                    });
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'customer_identifiers_list':
                if (rec.socketid == element.getAttribute("socketid")) {
                    if (sessionStorage.getItem('selected-customer-identifier-tab') == "customer") {
                        //console.log("search socket customer identifier tab page");
                        processSearchedCustomerIdentifierTabPage(rec.data, function (pro) {
                        });
                    } else if (sessionStorage.getItem('selected-customer-identifier-tab') == "associate_customer") {
                        //console.log("search socket associate customer identifier tab page");
                        processSearchedAssociateCustomerIdentifierTabPage(rec.data, function (pro) {
                        });
                    }
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'customer_creation_identifiers_list':
                if (rec.socketid == element.getAttribute("socketid")) {
                    if (sessionStorage.getItem('selected-customer-tab') == "customer_active") {
                        processSearchedCustomerIdentifiersActiveCustomerCreationList(rec.data, function () {
                        });
                    } else {
                        processSearchedCustomerIdentifiersPendingCustomerCreationList(rec.data, function () {
                        });
                    }
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'customer_creation_active_list':
                if (rec.socketid == element.getAttribute("socketid")) {
                    processSearchedActiveCustomersListPage(rec.data, function (pro) {
                    });
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'customer_creation_pending_list':
                if (rec.socketid == element.getAttribute("socketid")) {
                    processSearchedPendingCustomersListPage(rec.data, function (pro) {
                    });
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'customer_contacts_identifiers_list':
                if (rec.socketid == element.getAttribute("socketid")) {
                    processSearchedCustomerContactsIdentifiersList(rec.data, function (pro) {
                    });
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'customer_contacts_items_list':
                if (rec.socketid == element.getAttribute("socketid")) {
                    processSearchedCustomerContactsItemsList(rec.data, function (pro) {
                    });
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'customer_contact_list':
                if (rec.socketid == element.getAttribute("socketid")) {
                    processSearchedCustomerContactList(rec.data, function () {
                    });
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'customer_groups_identifiers_list':
                if (rec.socketid == element.getAttribute("socketid")) {
                    if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                        processSearchedStandardCustomerGroupsIdentifiersList(rec.data, function () {
                        });
                    } else {
                        processSearchedCustomerCustomGroupList(rec.data, function () {
                        });
                    }
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'customer_groups_list':
                processSearchedCustomerGroupList(rec.data, function () {
                });
                break;
            case 'customer_access_identifiers':
                processSearchedCustomerAccessIdentifiersList(rec.data, function () {
                });
                break;
            case 'customer_access_identifiers_items'://reused
                processSearchedCustomerAccessIdentifierItemsList(rec.data, function () {
                });
                break;
            case 'communication_groups':
                if ($('#modal-communication-group-moderator-selection').length > 0) {
                    processSearchedCommunicationGroupActivate(rec.data, "contact_list", function () { })
                } else {
                    processSearchedCommunicationGroupsList(rec.data, function () {
                    });
                }
                break;
            case 'collaborator_contact_list':
                if (sessionStorage.getItem('selected-collaborator-tab') == 'active_collaborator') {
                    processSearchedActiveCollaboratorContactList(rec.data, function () {
                    });
                } else if (sessionStorage.getItem('selected-collaborator-tab') == 'pending_collaborator') {
                    processSearchedPendingCollaboratorContactList(rec.data, function () {
                    });
                }
                break;
            case 'collaborator_groups_list':
                if(sessionStorage.getItem('selected-collaborator-tab') == "my_group_collaborator") {
                processSearchedCollaboratorGroupsList(rec.data, function () {
                });
            } else {
                processSearchedOtherCollaboratorGroupsList(rec.data, function () {
                });
            }
                break;
            case 'digibiz_logs':
                processSearchedLogsList(rec.data, function () {
                });
                break;
            case 'business_notifications':
                processSearchedBusinessNotificationsList(rec.data, function () {
                });
                break;
            case 'customer_groups_details':
                if (rec.socketid == element.getAttribute("socketid")) {
                    if (sessionStorage.getItem('selected-customer-group-type-tab') == "custom") {
                        if ($('#modal-customer-group-contact-list-selection').length > 0) {
                            processSearchedCustomerGroupContactsList(rec.data, function () { });
                        }
                        if ($('#modal-customer-group-groups-list-selection').length > 0) {
                            processSearchedCustomerGroupCustomGroupList(rec.data, function () { });
                        }
                        if ($('#group-member-search-modal').length > 0) {
                            processSearchedEmployeeStandardGroupMember(rec.data, function () { })
                        }
                    } else {
                        if ($('#group-member-search-modal').length > 0) {
                            processSearchedEmployeeStandardGroupMember(rec.data, function () { })
                        }
                    }
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'collaborator_group_details':
                if (rec.socketid == element.getAttribute("socketid") || rec.socketid == elementThree.attr("socketid") || rec.socketid == elementFour.attr('socketid')) {
                    if ($('#group-member-search-modal').length > 0) {
                        processSearchedGroupBusinessMemberSearch(rec.data, function () { })
                    }
                    if ($('#modal-collaborator-group-business-members').length > 0) {
                        processSearchedShowEmployeesCollaboratorGroupBusinessMembers(rec.data, function () { })
                    }
                    if ($('#modal-collaborator-group-owner-business-employee-selection').length > 0) {
                        processSearchedCollaboratorGroupOwnerBusinessEmployeeSelection(rec.data, function () { })
                    }
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'communication_group_details':
                if (rec.socketid == elementFive.attr("socketid") || rec.socketid == elementSix.attr("socketid") || rec.socketid == elementSeven.attr('socketid') || rec.socketid == elementEight.attr('socketid') || rec.socketid == elementNine.attr('socketid') || rec.socketid == elementTen.attr('socketid')
                    || rec.socketid == elementEleven.attr("socketid") || rec.socketid == elementTwelve.attr("socketid")) {
                    //console.log("!111")
                    if ($('#group-member-search-modal').length > 0) {
                        processSearchedEmployeeStandardGroupMember(rec.data, function () { })
                    }
                    if ($('#group-moderator-search-btn').length > 0) {
                        // processSearchedGroupModerator(rec.data, function () { })
                        processSearchedCommunicationGroupActivate(rec.data, '"contact_list"', function () {
                            // appScroll.scrollBar('#communication-group-moderator-members-list');
                            // listentForCommunicationGroupModeratorList($('#communication-group-moderator-members-list'));
                        });
                    }
                    if ($('#modal-communication-group-employee-group-selection').length > 0) {
                        rec.data = rec.data.filter(e => e.name != "Super Admin");
                        processSearchedCommunicationGroupCreateEmployeeGroupsList(rec.data, function () { })
                    }
                    if ($('#modal-communication-group-collaborator-group-selection').length > 0) {
                        processSearchedCommunicationGroupCreateCollaboratorGroupsList(rec.data, function () { })
                    }
                    if ($('#modal-communication-group-customer-group-selection').length > 0) {
                        processSearchedCommunicationGroupCreateCustomerGroupsList(rec.data, function () { })
                    }
                    if ($('#modal-communication-group-employees-selection').length > 0) {
                        processSearchedCommunicationGroupCreateEmployeeSelectionList(rec.data, function () { })
                    }
                    if ($('#modal-communication-group-customer-contact-list-selection').length > 0) {
                        processSearchedCommunicationGroupContactListCustomerList(rec.data, function () { })
                    }
                    if ($('#modal-communication-group-moderator-selection').length > 0) {
                        processSearchedCommunicationGroupActivate(rec.data, "contact_list", function () { })
                    }
                    if ($('#modal-communication-group-create-employee-group-employee-list-selection').length > 0) {
                        if ($('#modal-communication-group-create-employee-group-employee-list-selection').attr('data-group-type') == "customer_group") {
                            processSearchedCommunicationGroupCreateCustomerGroupCustomerList(rec.data, function () { })
                        } else {
                            processSearchedCommunicationGroupCreateEmployeeGroupEmployeeList(rec.data, function () { })
                        }
                    }
                } else {
                    //console.log('doesnt match');
                }
                break;
                case 'collaborator_group_create':
                if ($('#group-moderator-search-btn').length > 0) {
                    // processSearchedGroupModerator(rec.data, function () { })
                    processSearchedCommunicationGroupActivate(rec.data, function () {
                        // appScroll.scrollBar('#communication-group-moderator-members-list');
                        // listentForCommunicationGroupModeratorList($('#communication-group-moderator-members-list'));
                    });
                }
                break;
            case 'collaborator_group_create':
                if (rec.socketid == elementThirteen.attr("socketid")) {
                    //console.log("collaborator_group_create")
                    if ($('#modal-collaborator-group-owner-business-employee-selection').length > 0) {
                        processSearchedEmployeeGroupEmployeeSelectionList(rec.data, function () {
                            //console.log("done")
                        })
                    }
                } else {
                    //console.log('doesnt match');
                }
                break;
            case 'customer_creation':
                if ($('.tab.active').attr('data-id') == "customer_pending") {
                    if ($('#choose-customer-identifier-modal').length > 0) {
                        processSearchedChooseCustomerIdentifierList(rec.data, function () {
                            //console.log("done")
                        })
                    }
                }
                break;
            default:
                // if ($('#group-member-search-modal').length > 0) {
                //     //console.log("rec.data", rec.data)
                // }
                break;
        }
    },

    renderRolesSearchResult: function (rec) {
        //console.log("renderRolesSearchResult", rec);
        let element = document.querySelector("#get-roles-list-search.expand-search-input");
        if (rec.socketid == element.getAttribute("socketid")) {
            processSearchedGetRoleslist(rec.data, function (pro) {
                removeLoader();
            });
        } else {
            //console.log('doesnt match');
        }
    },

    businessCreate: function (rec) {
        //console.log("business create socket reached", rec);
        //automatic update in the global array
        businessAdminBusinessListHelperMethod();
        //Case:1 Add in business list
        if ($('body').attr("app") == "business_owner_business_list") {
            // var list_data = [];
            // list_data.push(rec.data);
            // processBusinessOwnerBusinessList(list_data, function () { });
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "my_business"
            }
            businessList(reqParam)
                .then((response) => {
                    digibiz.business_owner_business_list = [];
                    processBusinessOwnerBusinessList(response, function () {
                    });
                })
                .catch((err) => {
                })
        }
    },
    businessUpdate: function (rec) {
        //console.log("business update socket reached", rec);
        //automatic update in the global array
        // if (sessionStorage.getItem('account_id') == rec.data.owner.id && rec.data.status.status == "self-verified") {
        if (rec.data.status.status == "self-verified") {
            businessAdminBusinessListHelperMethod();
            employeeBusinessListHelperMethod();
            customerBusinessListHelperMethod();
            associateCustomerModuleListHelperMethod();
        }
        //Case:1 update in business list
        if ($('body').attr("app") == "business_owner_business_list") {
            //console.log("uPDATIng")
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "my_business"
            }
            businessList(reqParam)
                .then((response) => {
                    digibiz.business_owner_business_list = [];
                    processBusinessOwnerBusinessList(response, function () {
                    });
                })
                .catch((err) => {
                })
        }
        //case:2 if business is self-verified, for super-admin business should list in employee role
        if ($('body').attr("app") == "employee_business_list" && sessionStorage.getItem('account_id') == rec.data.owner.id && rec.data.status.status == "self-verified") {
            //console.log("Super-Admin Role mY page")
            digibiz.employee_business_list = [];
            // employeeBusinessListPage();
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "employee"
            }
            businessList(reqParam)
                .then((response) => {
                    processEmployeeBusinessList(response, function () {
                        removeLoader();
                    });
                })
                .catch((err) => {
                })
        }
    },
    employeeTypeAdd: function (rec) {
        //console.log("employee type socket reached", rec);
        //Case:1 update in employee types list
        if ($('body').attr("app") == "employee_types") {
            digibiz.employee_types_list.push(rec.data);
            digibiz.employee_types_list.sort((a, b) => a.type.localeCompare(b.type));
            var getSearchedKeyword = $(`body[app="employee_types"]`).find('.expand-search-input').val();
            if (getSearchedKeyword == undefined || getSearchedKeyword == null || getSearchedKeyword == "") {
                processEmployeeTypesList(digibiz.employee_types_list, function () {
                    $('.employee-types-create-container').addClass('hide');
                });
            } else {
                if (rec.data.type.toLowerCase().startsWith(getSearchedKeyword.toLowerCase())) {
                    // processSearchedEmployeeTypesListPage([rec.data], function () {
                    // });
                    var template = `<div class="employee-type-wrapper" data-employee-type-id="${rec.data.id}">
                    <div class="employee-type-container">
                        <div class="employee_type_name">${rec.data.type}</div>                    
                    </div>   
                    <div class="more-menu-wrapper show-action-employee-type-data"><i class="material-icons">more_vert</i></div>                
                    </div>`;
                    $('.employee-types-content-box').prepend(template);
                }
                $('.employee-types-create-container').addClass('hide');
            }
            removeLoader();
        }
    },
    employeeTypeUpdate: function (rec) {
        //console.log("employeeTypeUpdate socket reached", rec);
        //Case:1 update in employee types list
        if ($('body').attr("app") == "employee_types") {
            removeLoader();
            $('#alert-edit-employee-type-add').prop('disabled', false);
            $(`.employee-type-wrapper[data-employee-type-id="${rec.data.id}"]`).find('.employee_type_name').text(rec.data.type);

            var getIndex = digibiz.employee_types_list.findIndex((e) => e.id == rec.data.id);
            if (getIndex > -1) {
                digibiz.employee_types_list[getIndex].type = rec.data.type;
            }
        }
        //Case:2 update in employee creation flow
        if ($('body').attr("app") == "employee_create") {
            if (sessionStorage.getItem('business_id') == rec.data.business_id) {
                $('#employee-type-choose-select-dropdown').find(`option[value="${rec.data.id}"]`).attr('data-value', rec.data.type);
                $('#employee-type-choose-select-dropdown').find(`option[value="${rec.data.id}"]`).text(rec.data.type);
            }
        }
    },
    employeeTypeDelete: function (rec) {
        //console.log("employeeTypeDelete socket reached", rec);
        //Case:1 update in employee types list
        if ($('body').attr("app") == "employee_types") {
            removeLoader();
            $(`.employee-type-wrapper[data-employee-type-id="${rec.data.id}"]`).remove();
        }
    },

    employeeCategoryAdd: function (rec) {
        //console.log("employeeCategoryAdd socket reached", rec);
        //Case:1 update in employee category list
        if ($('body').attr("app") == "employee_category") {
            // var template = `<div class="employee-category-wrapper" data-employee-category-id="${rec.data.id}">
            //     <div class="employee-category-container">
            //         <div class="employee_category_name">${rec.data.category}</div>                    
            //     </div>   
            //     <div class="more-menu-wrapper show-action-employee-category-data"><i class="material-icons">more_vert</i></div>                
            //     </div>`;
            // $('.employee-category-content-box').prepend(template);
            // $('.employee-category-create-container').addClass('hide');
            digibiz.employee_category_list.push(rec.data);
            digibiz.employee_category_list.sort((a, b) => a.category.localeCompare(b.category));
            var getSearchedKeyword = $(`body[app="employee_category"]`).find('.expand-search-input').val();
            if (getSearchedKeyword == undefined || getSearchedKeyword == null || getSearchedKeyword == "") {
                processEmployeeCategoryList(digibiz.employee_category_list, function () {
                    $('.employee-category-create-container').addClass('hide');
                });
            } else {
                if (rec.data.category.toLowerCase().startsWith(getSearchedKeyword.toLowerCase())) {
                    var template = `<div class="employee-category-wrapper" data-employee-category-id="${rec.data.id}">
                <div class="employee-category-container">
                    <div class="employee_category_name">${rec.data.category}</div>                    
                </div>   
                <div class="more-menu-wrapper show-action-employee-category-data"><i class="material-icons">more_vert</i></div>                
                </div>`;
                    $('.employee-category-content-box').prepend(template);
                }
                $('.employee-category-create-container').addClass('hide');
            }
            removeLoader();
        }
    },
    employeeCategoryUpdate: function (rec) {
        //console.log("employeeCategoryUpdate socket reached", rec);
        //Case:1 update in employee category list
        if ($('body').attr("app") == "employee_category") {
            removeLoader();
            $(`.employee-category-wrapper[data-employee-category-id="${rec.data.id}"]`).find('.employee_category_name').text(rec.data.category);
            var getIndex = digibiz.employee_category_list.findIndex((e) => e.id == rec.data.id);
            //console.log("getIndex", getIndex)
            if (getIndex > -1) {
                //console.log("get", digibiz.employee_category_list[getIndex].category)
                digibiz.employee_category_list[getIndex].category = rec.data.category;
                //console.log("afetr", digibiz.employee_category_list)
            }
        }
        //Case:2 update in employee creation flow
        if ($('body').attr("app") == "employee_create") {
            if (sessionStorage.getItem('business_id') == rec.data.business_id) {
                $('#employee-category-choose-select-dropdown').find(`option[value="${rec.data.id}"]`).attr('data-value', rec.data.category);
                $('#employee-category-choose-select-dropdown').find(`option[value="${rec.data.id}"]`).text(rec.data.category);
            }
        }
    },
    employeeCategoryDelete: function (rec) {
        //console.log("employeeTypeDelete socket reached", rec);
        //Case:1 update in employee category list
        if ($('body').attr("app") == "employee_category") {
            removeLoader();
            $(`.employee-category-wrapper[data-employee-category-id="${rec.data.id}"]`).remove();
        }
    },

    employeeDesignationAdd: function (rec) {
        //console.log("employeeDesignationAdd socket reached", rec);
        //Case:1 update in employee designation list
        if ($('body').attr("app") == "employee_designation") {
            // var template = `<div class="employee-designation-wrapper" data-employee-designation-id="${rec.data.id}">
            //     <div class="employee-designation-container">
            //         <div class="employee_designation_name">${rec.data.designation}</div>                    
            //     </div>   
            //     <div class="more-menu-wrapper show-action-employee-designation-data"><i class="material-icons">more_vert</i></div>                
            //     </div>`;
            // $('.employee-designation-content-box').prepend(template);
            // $('.employee-designation-create-container').addClass('hide');
            digibiz.employee_designation_list.push(rec.data);
            digibiz.employee_designation_list.sort((a, b) => a.designation.localeCompare(b.designation));
            var getSearchedKeyword = $(`body[app="employee_designation"]`).find('.expand-search-input').val();
            if (getSearchedKeyword == undefined || getSearchedKeyword == null || getSearchedKeyword == "") {
                processEmployeeDesignationList(digibiz.employee_designation_list, function () {
                    $('.employee-designation-create-container').addClass('hide');
                });
            } else {
                if (rec.data.designation.toLowerCase().startsWith(getSearchedKeyword.toLowerCase())) {
                    var template = `<div class="employee-designation-wrapper" data-employee-designation-id="${rec.data.id}">
                <div class="employee-designation-container">
                    <div class="employee_designation_name">${rec.data.designation}</div>                    
                </div>   
                <div class="more-menu-wrapper show-action-employee-designation-data"><i class="material-icons">more_vert</i></div>                
                </div>`;
                    $('.employee-designation-content-box').prepend(template);
                }
                $('.employee-designation-create-container').addClass('hide');
            }
            removeLoader();
        }
    },
    employeeDesignationUpdate: function (rec) {
        //console.log("employeeDesignationUpdate socket reached", rec);
        //Case:1 update in employee designation list
        if ($('body').attr("app") == "employee_designation") {
            $(`.employee-designation-wrapper[data-employee-designation-id="${rec.data.id}"]`).find('.employee_designation_name').text(rec.data.designation);
            var getIndex = digibiz.employee_designation_list.findIndex((e) => e.id == rec.data.id);
            if (getIndex > -1) {
                digibiz.employee_designation_list[getIndex].designation = rec.data.designation;
            }
        }
        //Case:2 update in employee creation flow
        if ($('body').attr("app") == "employee_create") {
            if (sessionStorage.getItem('business_id') == rec.data.business_id) {
                $('#employee-designation-choose-select-dropdown').find(`option[value="${rec.data.id}"]`).attr('data-value', rec.data.designation);
                $('#employee-designation-choose-select-dropdown').find(`option[value="${rec.data.id}"]`).text(rec.data.designation);
            }
        }
    },
    employeeDesignationDelete: function (rec) {
        //console.log("employeeDesignationDelete socket reached", rec);
        //Case:1 update in employee designation list
        if ($('body').attr("app") == "employee_designation") {
            $(`.employee-designation-wrapper[data-employee-designation-id="${rec.data.id}"]`).remove();
        }
    },

    employeeDepartmentAdd: function (rec) {
        //console.log("employeeDepartmentAdd socket reached", rec);
        //Case:1 update in employee department_management list
        if ($('body').attr("app") == "department_management") {
            if (rec.data.hasOwnProperty('parent_id') && rec.data.parent_id) {
            } else {
                if ($('.no_data').length > 0) {
                    $('.no_data').remove();
                }
                // var template = `<div class="department-wrapper" data-id="${rec.data.id}">
                //     <div class="profile-pic-info-wrapper">
                //         <div class="department-data-wrapper ellipsify">
                //             <div class="department-name"><span class="truncate">${rec.data.name}</span></div>
                //         </div>
                //     </div> 
                //     <div class="btn-wrap">              
                //         <div class="more-menu-wrapper show-action-department" id="show-action-department"><i class="material-icons">more_vert</i></div>
                //     </div>                
                // </div>`;
                // $('.department-list-contentbox').prepend(template);
                digibiz.department_list.push(rec.data);
                digibiz.department_list.sort((a, b) => a.name.localeCompare(b.name));
                var getSearchedKeyword = $(`body[app="department_management"]`).find('.expand-search-input').val();
                if (getSearchedKeyword == undefined || getSearchedKeyword == null || getSearchedKeyword == "") {
                    processDepartmentList(digibiz.department_list, function () {
                    });
                } else {
                    if (rec.data.name.toLowerCase().startsWith(getSearchedKeyword.toLowerCase())) {
                        var template = `<div class="department-wrapper" data-id="${rec.data.id}">
                    <div class="profile-pic-info-wrapper">
                        <div class="department-data-wrapper ellipsify">
                            <div class="department-name"><span class="truncate">${rec.data.name}</span></div>
                        </div>
                    </div> 
                    <div class="btn-wrap">              
                        <div class="more-menu-wrapper show-action-department" id="show-action-department"><i class="material-icons">more_vert</i></div>
                    </div>                
                </div>`;
                        $('.department-list-contentbox').prepend(template);
                    }
                }
                removeLoader();
            }
        }
        //Case:2 update in department create page
        if ($('body').attr("app") == "department_create") {
            if (rec.data.hasOwnProperty('parent_id') && rec.data.parent_id) {
                if (sessionStorage.getItem('business_id') == rec.data.business_id) {
                    //get the parentid from the above result and get the record of that parent if present
                    var requestParams = {
                        device_id: crossplat.device.uuid,
                        id: rec.data.parent_id
                    }
                    departmentGet(requestParams)
                        .then((response) => {
                            //console.log("response", response);
                            if (response.hasOwnProperty('parent_id') && response.parent_id != null) {
                                //console.log("not-level-2");
                                //display below the heading
                                var template = `<div class="sub-departments-content-box sub-department-box" data-id="${rec.data.id}" data-parent-id="${rec.data.parent_id}">
                                                <div class="sub-department-box-name-symbol-content-box">
                                                <i class="material-icons arrow-right" id="arrow_button">keyboard_arrow_right</i>                                
                                                <div id="added_sub_department" type="text" data-length="60" contenteditable="false" class="validate" autocomplete="off" disabled>${rec.data.name}</div>
                                                </div>
                                                <div class="sub_sub_department_conatiner_box" data-id="${rec.data.id}"></div>
                                                </div>`;
                                $(`.sub_sub_department_conatiner_box[data-id="${rec.data.parent_id}"]`).append(template);
                                $(`.sub_sub_department_conatiner_box[data-id="${rec.data.parent_id}"]`).siblings('.sub-department-box-name-symbol-content-box').find('.material-icons').remove();
                                $(`.sub_sub_department_conatiner_box[data-id="${rec.data.parent_id}"]`).siblings('.sub-department-box-name-symbol-content-box').prepend(`<i class="material-icons arrow-down" id="arrow_button">keyboard_arrow_down</i>`)
                            } else {
                                //console.log("level-2 addition");
                                //display below the heading
                                var template = `<div class="sub-departments-content-box sub-department-box" data-id="${rec.data.id}" data-parent-id="${rec.data.parent_id}">
                                                <div class="sub-department-box-name-symbol-content-box">
                                                <i class="material-icons arrow-right" id="arrow_button">keyboard_arrow_right</i>                                
                                                <div id="added_sub_department" type="text" data-length="60" contenteditable="false" class="validate" autocomplete="off" disabled>${rec.data.name}</div>
                                                </div>
                                                <div class="sub_sub_department_conatiner_box" data-id="${rec.data.id}"></div>
                                                </div>`;
                                $(`.create-sub-departments-main-container[data-parent-id="${rec.data.parent_id}"]`).append(template);
                            }
                        })
                        .catch((err) => {
                            removeLoader();
                            $(this).prop('disabled', false);
                            Materialize.toast("Error in getting the parent department record", 3000, 'round success-alert');
                        })
                }

            }
        }
        //Case:3 update in employee standard groups Page
        if ($('body').attr("app") == "employee_group_creation_list") {
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "standard") {
                digibiz.standard_employees_groups_list_page = [];
                standardEmployeesGroupsListPage();
            }
        }
        //Case:4 update in employee creation page while assigning department assignment page
        if ($('body').attr("app") == "employee_create") {
            digibiz.department_list_selection.push(rec.data);
            processDepartmentListSelection(digibiz.department_list_selection, function () { })
        }

        if ($('body').attr('app') == "employee_creation_list") {
            if ($('#employee-filter-option-modal').length > 0) {
                var data = rec.data;
                //console.log("data", data);
                processDepartmentList(data, function () {
                })
            }
        }
    },
    employeeDepartmentUpdate: function (rec) {
        //console.log("employeeDepartmentUpdate socket reached", rec);
        //Case:1 update in employee department_management list
        if ($('body').attr("app") == "department_management") {
            if (rec.data.hasOwnProperty('parent_id') && rec.data.parent_id) {
            } else {
                $(`.department-wrapper[data-id="${rec.data.id}"]`).find('.department-name .truncate').text(rec.data.name);
                var getIndex = digibiz.department_list.findIndex((e) => e.id == rec.data.id);
                if (getIndex > -1) {
                    digibiz.department_list[getIndex].name = rec.data.name;
                }
            }
        }
        //Case:2 update in department create page
        if ($('body').attr("app") == "department_create") {
            if (sessionStorage.getItem('business_id') == rec.data.business_id) {
                if (rec.data.hasOwnProperty('parent_id') && rec.data.parent_id) {
                    //display the new edited name in the list
                    $(`.sub-department-box[data-id="${rec.data.id}"]`).find('#added_sub_department').text(rec.data.name);
                } else {
                    $(`#department_name`).text(rec.data.name);
                }
            }
        }
        //Case:3 update in employee creation flow
        if ($('body').attr("app") == "employee_create") {
            if (sessionStorage.getItem('business_id') == rec.data.business_id) {
                //console.log("222", $(`.employee-department-assignment-box[data-id="${rec.data.id}"]`).find(`.employee-department-assignment-name`))
                $(`.employee-department-assignment-box[data-id="${rec.data.id}"]`).find(`.employee-department-assignment-name`).text(rec.data.name);
                if ($(`#assign-employee-department-modal`).length > 0) {
                    $('#assign-employee-department-modal').find(`.department-wrapper[data-id="${rec.data.id}"]`).find('.department-name span').text(rec.data.name);
                }
            } else {
                //console.log("1234")
            }
        }
        //Case:4 update in communication group detail page(both in pop-up and in the members list)
        if ($('body').attr('app') == "communication_group_details" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            $('#communication-group-employee-members-list').find(`.communication-group-employee-group-member-wrapper[data-department-id="${rec.data.id}"]`).find('.filemanager-file-wrapper span').text(rec.data.name);
            //check modal is present
            if ($('#modal-communication-group-employee-group-selection').length > 0) {
                //check if that employee std group is present in the modal
                if ($('#modal-communication-group-employee-group-selection').find(`.group-selection-wrapper[data-department-id="${rec.data.id}"]`).length > 0) {
                    var getName = rec.data.name;
                    $('#modal-communication-group-employee-group-selection').find(`.group-selection-wrapper[data-department-id="${rec.data.id}"]`).find('.employee-group-name span').text(getName);
                }
            }
        }
        if ($('body').attr("app") == "employee_group_creation_list") {
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "standard") {
                digibiz.standard_employees_groups_list_page = [];
                standardEmployeesGroupsListPage();
            }
        }
        if ($(`#modal-communication-group-activate-employee-group-employee-list-selection`).length > 0) {
            if ($(`#modal-communication-group-activate-employee-group-employee-list-selection`).find(`.accordion-content[data-group-id="${rec.data.std_grp.id}"]`).length > 0) {
                $(`#modal-communication-group-activate-employee-group-employee-list-selection`).find(`.accordion-content[data-group-id="${rec.data.std_grp.id}"]`).siblings('.accordion-title').find('.contact-item-name span').text(rec.data.std_grp.name)
            }
        }
        //Case:3 update in employee group creation
        if ($('body').attr("app") == "employee_group_create") {
            $('#employeeGroupName').val(rec.data.name);
            var getString = `All Employees assigned to ${rec.data.name} department are members of this group.`;
            $('.standard-employee-group-members-msg').text(getString);
            if ($(`#employee-group-members-list`).find(`.custom-employee-group-member-wrapper[data-member-group-id="${rec.data.std_grp.id}"]`).length > 0) {
                $(`#employee-group-members-list`).find(`.custom-employee-group-member-wrapper[data-member-group-id="${rec.data.std_grp.id}"]`).find('.custom-employee-group-member-name').text(rec.data.std_grp.name);
            }
            if ($(`#employee-group-members-list`).find(`.employee-group-member-wrapper[data-id="${rec.data.std_grp.id}"]`).length > 0) {
                $(`#employee-group-members-list`).find(`.employee-group-member-wrapper[data-id="${rec.data.std_grp.id}"]`).find('.filemanager-file-wrapper span').text(rec.data.std_grp.name);
            }
        }

        if ($('#modal-standard-employee-group-selection').length > 0) {
            $('#modal-standard-employee-group-selection').find(`.contact-profile-container[data-id="${rec.data.std_grp.id}"]`).siblings('.standard-group-name').text(rec.data.std_grp.name);
        }

    },

    digibizNotification: function (rec) {
        //console.log("digibizNotification socket reached", rec);
        //Case:2 update the count in the landing page for whom the notification was sent
        if ($('#request-btn').length == 1) {
            //console.log("got request btn")
            if (sessionStorage.getItem('uuid') == rec.data.contact.uuid) {
                //console.log("if")
                if ($('.digibiz_notification_count').text() == "" || $('.digibiz_notification_count').text() == null || $('.digibiz_notification_count').text() == undefined || $('.digibiz_notification_count').text() == 0) {
                    //console.log("1")
                    $('.digibiz_notification_count').text('1');
                    $('.digibiz_notification_count').attr('data-count', '1');
                    $('.digibiz_notification_count').removeClass('hide');
                } else {
                    //console.log("else")
                    var getCount = $('.digibiz_notification_count').text();
                    getCount++;
                    $('.digibiz_notification_count').text(getCount);
                    $('.digibiz_notification_count').attr('data-count', getCount);
                    $('.digibiz_notification_count').removeClass('hide');
                }
            }
        }
        //Case:1 update in notification list page for the whom the notification was sent
        if ($('body').attr("app") == "digibiz_notifications") {
            if (sessionStorage.getItem('uuid') == rec.data.contact.uuid) {
                digibiz.digibiz_notifications = [];
                getDigibizNotificationsPage();
            }
        }
        //Case:3 update in pending employee list in the notification sender side
        if ($('body').attr("app") == "employee_creation_list") {
            if (sessionStorage.getItem('selected-employee-tab') == "employee_pending") {
                digibiz.pending_employee_creation_employee_list = [];
                pendingEmployeeListPage();
            }
        }
        //Case:4 update in pending customer creation list in the notification sender side
        if ($('body').attr("app") == "customer_creation_pending_list") {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_pending") {
                digibiz.customer_creation_pending_list = [];
                pendingCustomerCreationListPage();
            }
        }
        //Case:5 update in pending super-admin list in the notification sender side
        if ($('body').attr("app") == "super_admin_management_hub") {
            if (sessionStorage.getItem('selected-super-admin-management-tab') == "pending-super-admin") {
                // digibiz.pending_super_admins_list.push(rec.data);
                // processPendingSuperAdminsList(digibiz.pending_super_admins_list, function () { })
                digibiz.pending_super_admins_list = [];
                pendingSuperAdminsTab();
            }
        }
    },
    digibizNotificationRemove: function (rec) {
        //console.log("digibizNotificationRemove socket reached", rec);
        //Case:1 update in notification list page for the whom the notification was sent
        if ($('body').attr("app") == "digibiz_notifications") {
            if (sessionStorage.getItem('uuid') == rec.data.uuid) {
                digibiz.digibiz_notifications = [];
                getDigibizNotificationsPage();
            }
        }
        //Case:2 update the count in the landing page for whom the notification was sent
        if ($('body').attr("app") == "landing_page") {
            if (sessionStorage.getItem('uuid') == rec.data.uuid) {
                if ($('.digibiz_notification_count').text() == "" || $('.digibiz_notification_count').text() == null || $('.digibiz_notification_count').text() == undefined) {
                    // $('.digibiz_notification_count').text('1');
                    // $('.digibiz_notification_count').removeClass('hide');
                } else {
                    var getCount = $('.digibiz_notification_count').text();
                    getCount--;
                    $('.digibiz_notification_count').text(getCount);
                    $('.digibiz_notification_count').removeClass('hide');
                }
            }
        }
        //Case:3 update in pending employee list in the notification sender side
        if ($('body').attr("app") == "employee_creation_list") {
            if (sessionStorage.getItem('selected-employee-tab') == "employee_pending") {
                digibiz.pending_employee_creation_employee_list = [];
                pendingEmployeeListPage();
            }
        }
        if ($('body').attr("app") == "employee_notification_details_page" && sessionStorage.getItem('contact_uuid') == rec.data.uuid) {
            digibiz.employee_notification_details_list = [];
            getEmployeeNotificationDetailsPage();
        }
        //Case:4 update in pending customer creation list in the notification sender side
        if ($('body').attr("app") == "customer_creation_pending_list") {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_pending") {
                digibiz.customer_creation_pending_list = [];
                pendingCustomerCreationListPage();
            }
        }
        //Case:4 update in pending customer creation list in the notification sender side
        if ($('body').attr("app") == "super_admin_management_hub") {
            if (sessionStorage.getItem('selected-super-admin-management-tab') == "pending-super-admin") {
                digibiz.pending_super_admins_list = [];
                pendingSuperAdminsTab();
            }
        }
        if ($('body').attr("app") == "customer_notification_details_page") {
            digibiz.customer_notification_details_list = [];
            getCustomerNotificationDetailsPage();
        }
        if ($('body').attr("app") == "super_admin_notification_details_page") {
            //console.log("notification details page");
            digibiz.super_admin_notification_details_list = [];
            getSuperAdminNotificationDetailsPage();
        }
    },
    digibizNotificationExpire: function (rec) {
        //console.log("digibizNotificationExpire socket reached", rec);
        //Case:1 update in notification list page for the whom the notification was sent
        if ($('body').attr("app") == "digibiz_notifications") {
            if (sessionStorage.getItem('uuid') == rec.data.contact.uuid) {
                digibiz.digibiz_notifications = [];
                getDigibizNotificationsPage();
            }
        }
        //Case:2 update the count in the landing page for whom the notification was sent
        if ($('body').attr("app") == "landing_page") {
            if (sessionStorage.getItem('uuid') == rec.data.contact.uuid) {
                if ($('.digibiz_notification_count').text() == "" || $('.digibiz_notification_count').text() == null || $('.digibiz_notification_count').text() == undefined) {
                    // $('.digibiz_notification_count').text('1');
                    // $('.digibiz_notification_count').removeClass('hide');
                } else {
                    var getCount = $('.digibiz_notification_count').text();
                    getCount--;
                    $('.digibiz_notification_count').text(getCount);
                    $('.digibiz_notification_count').removeClass('hide');
                }
            }
        }
        //Case:3 update in pending employee list in the notification sender side
        if ($('body').attr("app") == "employee_creation_list") {
            if (sessionStorage.getItem('selected-employee-tab') == "employee_pending") {
                digibiz.pending_employee_creation_employee_list = [];
                pendingEmployeeListPage();
            }
        }
        //Case:4 update in pending customer creation list in the notification sender side
        if ($('body').attr("app") == "customer_creation_pending_list") {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_pending") {
                digibiz.customer_creation_pending_list = [];
                pendingCustomerCreationListPage();
            }
        }
        if ($('body').attr("app") == "employee_notification_details_page" && sessionStorage.getItem('contact_uuid') == rec.data.contact.uuid) {
            digibiz.employee_notification_details_list = [];
            getEmployeeNotificationDetailsPage();
        }
        if ($('body').attr("app") == "customer_notification_details_page" && sessionStorage.getItem('contact_uuid') == rec.data.contact.uuid) {
            digibiz.customer_notification_details_list = [];
            getCustomerNotificationDetailsPage();
        }
        if ($('body').attr('app') == "customer_create" && rec.data.hasOwnProperty('customer_id') && sessionStorage.getItem('customer_id') == rec.data.customer_id) {
            if (rec.data.contact.status.status == "rejected" || rec.data.contact.status.status == "expired") {
                $(`.pending-associate-customer-wrapper[data-notification-id="${rec.data.id}"]`).remove();
            }
        }
        if ($(`#associate-customers-pending-notification-details-modal[contact-uuid="${rec.data.contact.uuid}"]`).length > 0) {
            digibiz.associate_customer_notification_details_list = digibiz.associate_customer_notification_details_list.filter((p) => {
                return p.id != rec.data.id;
            });
            //console.log("after filter", digibiz.associate_customer_notification_details_list);
            var list = [];
            // list.push(rec.data);
            var pushData = {
                log_data: list,
                last_notification: rec.data
            };
            //console.log("pushData", pushData);
            processPendingAssociateCustomerNotificationDetailsList(pushData, function () {
            })
            // $(`.associate-customer-notification-details-wrapper[data-notification-id="${rec.data.id}"]`).remove();
        }
        //Case:3 date in pending/active employee list in the notification sender side
        if ($('body').attr("app") == "super_admin_management_hub") {
            if (sessionStorage.getItem('selected-super-admin-management-tab') == "pending-super-admin") {
                digibiz.pending_super_admins_list = [];
                pendingSuperAdminsTab();
            }
        }
        if ($('body').attr("app") == "super_admin_notification_details_page" && sessionStorage.getItem('contact_uuid') == rec.data.contact.uuid) {
            //console.log("notification details page");
            digibiz.super_admin_notification_details_list = [];
            getSuperAdminNotificationDetailsPage();
        }
    },
    digibizNotificationChangeStatus: function (rec) {
        //console.log("digibizNotificationChangeStatus socket reached", rec);
        //Case:1 update in notification list page for the whom the notification was sent
        if ($('body').attr("app") == "digibiz_notifications") {
            $(`.accept_reject_wrap[data-notification-id="${rec.data.id}"]`).parents('.digibiz-notification-list-wrapper').remove();
        }
        //Case:2 update the count in the landing page for whom the notification was sent
        if ($('body').attr("app") == "landing_page") {
            if (sessionStorage.getItem('uuid') == rec.data.contact.uuid) {
                if ($('.digibiz_notification_count').text() == "" || $('.digibiz_notification_count').text() == null || $('.digibiz_notification_count').text() == undefined) {
                    $('.digibiz_notification_count').text('0');
                    $('.digibiz_notification_count').addClass('hide');
                } else {
                    var getCount = $('.digibiz_notification_count').text();
                    getCount--;
                    $('.digibiz_notification_count').text(getCount);
                    $('.digibiz_notification_count').removeClass('hide');
                }
            }
        }
        //Case:3 date in pending/active employee list in the notification sender side
        if ($('body').attr("app") == "employee_creation_list") {
            //accepted will be handles in add employee api socket
            // if (rec.data.contact.status.status == "accepted") {
            //     if (sessionStorage.getItem('selected-employee-tab') == "employee_pending") {
            //         digibiz.pending_employee_creation_employee_list = [];
            //         pendingEmployeeListPage();
            //     }
            //     if (sessionStorage.getItem('selected-employee-tab') == "employee_active") {
            //         digibiz.active_employee_creation_employee_list = [];
            //         activeEmployeeListPage();
            //     }
            // } else 
            if (rec.data.contact.status.status == "rejected") {
                if (sessionStorage.getItem('selected-employee-tab') == "employee_pending") {
                    digibiz.pending_employee_creation_employee_list = [];
                    pendingEmployeeListPage();
                }
            }
        }
        //Case:3 date in pending/active employee list in the notification sender side
        if ($('body').attr("app") == "super_admin_management_hub") {
            if (rec.data.contact.status.status == "rejected") {
                if (sessionStorage.getItem('selected-super-admin-management-tab') == "pending-super-admin") {
                    digibiz.pending_super_admins_list = [];
                    pendingSuperAdminsTab();
                }
            }
        }
        if ($('body').attr("app") == "super_admin_notification_details_page" && sessionStorage.getItem('contact_uuid') == rec.data.contact.uuid) {
            //console.log("notification details page");
            digibiz.super_admin_notification_details_list = [];
            getSuperAdminNotificationDetailsPage();
        }
        //Case:4 update in active customer creation list in the notification sender side
        if ($('body').attr("app") == "customer_creation_pending_list") {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_pending") {
                digibiz.customer_creation_pending_list = [];
                pendingCustomerCreationListPage();
            }
        }
        if ($('body').attr("app") == "customer_creation_active_list") {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_active") {
                digibiz.customer_creation_active_list = [];
                activeCustomerCreationListPage();
            }
        }
        //Case:6 update in customer contact list module-contacts list page (step-3)
        if ($('body').attr('app') == "customer_contact_list") {
            digibiz.contacts_list = [];
            getCustomerContactListPage()
        }
        if ($('body').attr("app") == "employee_notification_details_page" && sessionStorage.getItem('contact_uuid') == rec.data.contact.uuid) {
            digibiz.employee_notification_details_list = [];
            getEmployeeNotificationDetailsPage();
        }
        if ($('body').attr("app") == "customer_notification_details_page" && sessionStorage.getItem('contact_uuid') == rec.data.contact.uuid) {
            digibiz.customer_notification_details_list = [];
            getCustomerNotificationDetailsPage();
        }

        if ($('body').attr('app') == "customer_create" && rec.data.hasOwnProperty('customer_id') && sessionStorage.getItem('customer_id') == rec.data.customer_id) {
            if (rec.data.contact.status.status == "rejected") {
                $(`.pending-associate-customer-wrapper[data-notification-id="${rec.data.id}"]`).remove();
            }
        }
        if ($(`#associate-customers-pending-notification-details-modal[contact-uuid="${rec.data.contact.uuid}"]`).length > 0) {
            digibiz.associate_customer_notification_details_list = digibiz.associate_customer_notification_details_list.filter((p) => {
                return p.id != rec.data.id;
            });
            var list = [];
            list.push(rec.data);
            var pushData = {
                log_data: list,
                last_notification: rec.data
            };
            processPendingAssociateCustomerNotificationDetailsList(pushData, function () {
            })
        }
        //Case:13 date in pending/active super-admin list in the notification sender side
        if ($('body').attr("app") == "employee_creation_list") {
            //accepted will be handles in add employee api socket
            // if (rec.data.contact.status.status == "accepted") {
            //     if (sessionStorage.getItem('selected-employee-tab') == "employee_pending") {
            //         digibiz.pending_employee_creation_employee_list = [];
            //         pendingEmployeeListPage();
            //     }
            //     if (sessionStorage.getItem('selected-employee-tab') == "employee_active") {
            //         digibiz.active_employee_creation_employee_list = [];
            //         activeEmployeeListPage();
            //     }
            // } else 
            if (rec.data.contact.status.status == "rejected") {
                if (sessionStorage.getItem('selected-super-admin-management-tab') == "pending-super-admin") {
                    digibiz.pending_super_admins_list = [];
                    pendingSuperAdminsTab();
                }
            }
        }

    },

    businessChangeDevice: function (rec) {
        console.log("businessChangeDevice socket reached", rec);
        //Case:1 show pop-up in primary device
        if ($('body').attr("app") == "business_add" || $('body').attr("app") == "business_edit") {
            if (rec.data.device_id == crossplat.device.uuid) {
                console.log("businessChangeDevice --> not for thid device_id");
            } else {
                var alert_parms = {
                    alert_id: "alert-business-changed-device-confirm",
                    alert_platform: crossplat.device.platform,
                    alert_title: `Alert`,
                    alert_body: `You have choosed to work from other device.`,
                    alert_btn: [{
                        name: "OK",
                        attr: [{ name: "id", value: "btn-business-changed-device-ok" }]
                    }]
                }
                showAlert(alert_parms, function () {
                });
            }
        }
    },
    employeeChangeDevice: function (rec) {
        console.log("employeeChangeDevice socket reached", rec);
        //Case:1 show pop-up in primary device
        if ($('body').attr("app") == "employee_create") {
            var alert_parms = {
                alert_id: "alert-employee-changed-device-confirm",
                alert_platform: crossplat.device.platform,
                alert_title: `Alert`,
                alert_body: `You have choosed to work from other device or another admin, so you are back to employee page.`,
                alert_btn: [{
                    name: "OK",
                    attr: [{ name: "id", value: "btn-employee-changed-device-ok" }]
                }]
            }
            showAlert(alert_parms, function () {
                removeLoader();
                // location.hash = `employee_creation/list`;
            });
        }
    },
    customerChangeDevice: function (rec) {
        //console.log("customerChangeDevice socket reached", rec);
        //Case:1 show pop-up in primary device
        if ($('body').attr("app") == "customer_create" && sessionStorage.getItem('customer_id') == rec.data.customer_id) {
            var alert_parms = {
                alert_id: "alert-customer-changed-device-confirm",
                alert_platform: crossplat.device.platform,
                alert_title: `Alert`,
                alert_body: `You have choosed to work from other device,so you are back to customer page`,
                alert_btn: [{
                    name: "OK",
                    attr: [{ name: "id", value: "btn-customer-changed-device-ok" }]
                }]
            }
            showAlert(alert_parms, function () {
                removeLoader();
                // location.hash = `customer_creation/active/list`;
            });
        }
    },

    groupChangeDevice: function (rec) {
        console.log("groupChangeDevice socket reached", rec);
        //Case:1 show pop-up in primary device
        if ($('body').attr("app") == "employee_group_create") {
            var alert_parms = {
                alert_id: "alert-group-changed-device-confirm",
                alert_platform: crossplat.device.platform,
                alert_title: `Alert`,
                alert_body: `You have choosed to work from other device or another admin, so you are back to employee page.`,
                alert_btn: [{
                    name: "OK",
                    attr: [{ name: "id", value: "btn-group-changed-device-ok" }]
                }]
            }
            showAlert(alert_parms, function () {
                removeLoader();
                // location.hash = `employee_creation/list`;
            });
        } else if ($('body').attr("app") == "customer_groups_details") {
            var alert_parms = {
                alert_id: "alert-group-changed-device-confirm",
                alert_platform: crossplat.device.platform,
                alert_title: `Alert`,
                alert_body: `You have choosed to work from other device or another admin, so you are back to employee page.`,
                alert_btn: [{
                    name: "OK",
                    attr: [{ name: "id", value: "btn-group-changed-device-ok" }]
                }]
            }
            showAlert(alert_parms, function () {
                removeLoader();
                // location.hash = `employee_creation/list`;
            });
        } else if ($('body').attr("app") == "communication_group_details") {
            var alert_parms = {
                alert_id: "alert-group-changed-device-confirm",
                alert_platform: crossplat.device.platform,
                alert_title: `Alert`,
                alert_body: `You have choosed to work from other device or another admin, so you are back to employee page.`,
                alert_btn: [{
                    name: "OK",
                    attr: [{ name: "id", value: "btn-group-changed-device-ok" }]
                }]
            }
            showAlert(alert_parms, function () {
                removeLoader();
                // location.hash = `employee_creation/list`;
            });
        } else if ($('body').attr("app") == "collaborator_group_details") {
            var alert_parms = {
                alert_id: "alert-group-changed-device-confirm",
                alert_platform: crossplat.device.platform,
                alert_title: `Alert`,
                alert_body: `You have choosed to work from other device or another admin, so you are back to employee page.`,
                alert_btn: [{
                    name: "OK",
                    attr: [{ name: "id", value: "btn-group-changed-device-ok" }]
                }]
            }
            showAlert(alert_parms, function () {
                removeLoader();
                // location.hash = `employee_creation/list`;
            });
        }
    },

    employeeAdd: function (rec) {
        console.log("employeeAdd socket reached", rec);
        if (sessionStorage.getItem('account_id') == rec.data.account_id) {
            employeeBusinessListHelperMethod()
        }
        //Case:1 update in pending/active employee list in the notification sender side
        if ($('body').attr("app") == "employee_creation_list") {
            if (sessionStorage.getItem('selected-employee-tab') == "employee_pending") {
                digibiz.pending_employee_creation_employee_list = [];
                pendingEmployeeListPage();
            }
            if (sessionStorage.getItem('selected-employee-tab') == "employee_active") {
                if (sessionStorage.getItem('business_id') == rec.data.business_id) {
                    digibiz.active_employee_creation_employee_list.splice(0, 0, rec.data);
                    // activeEmployeeListPage();
                    processActiveEmployeeCreationEmployeeList(digibiz.active_employee_creation_employee_list, function () { });
                }
            }
        }
        if ($('body').attr("app") == "digibiz_notifications") {
            //console.log("11")
            digibiz.digibiz_notifications = [];
            getDigibizNotificationsPage();
        }
        if (sessionStorage.getItem('digibiz_role') == "employee") {
            if (sessionStorage.getItem('account_id') == rec.data.account_id) {
                if ($('body').attr('app') == "employee_business_list") {
                    digibiz.employee_business_list = [];
                    var reqParam = {
                        device_id: crossplat.device.uuid,
                        list_by: "employee"
                    }
                    businessList(reqParam)
                        .then((response) => {
                            processEmployeeBusinessList(response, function () {
                                removeLoader();
                            });
                        })
                        .catch((err) => {
                        })
                }
            }
        }
    },
    employeeUpdate: function (rec) {
        console.log("employeeUpdate socket reached", rec);
        //Case:1 update in pending/active employee list in the notification sender side
        if ($('body').attr("app") == "employee_creation_list") {
            if (sessionStorage.getItem('selected-employee-tab') == "employee_pending") {
                digibiz.pending_employee_creation_employee_list = [];
                pendingEmployeeListPage();
            }
            if (sessionStorage.getItem('selected-employee-tab') == "employee_active") {
                digibiz.active_employee_creation_employee_list = [];
                activeEmployeeListPage();
            }
        }
        //Case:2 update in  employee group list page
        if ($('body').attr("app") == "employee_group_creation_list") {
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "standard") {
                digibiz.standard_employees_groups_list_page = [];
                standardEmployeesGroupsListPage();
            }
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "custom") {
                digibiz.custom_employees_groups_list_page = [];
                customEmployeesGroupsListPage();
            }
        }

        if ($('#modal-communication-group-activate-employee-group-employee-list-selection').length > 0) {
            if ($('#modal-communication-group-activate-employee-group-employee-list-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).length > 0) {
                //console.log("already present");
                var getname;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    getname = rec.data.display_name;
                } else {
                    getname = `${rec.data.name.first} ${rec.data.name.last}`;
                }
                $('#modal-communication-group-activate-employee-group-employee-list-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).siblings('.contact-name-wrapper').text(getname);

            } else {
                if (rec.data.status.status == "active") {
                    if (rec.data.hasOwnProperty('identity_picture') && rec.data.identity_picture) {
                        if (rec.data.identity_picture.hasOwnProperty('thumbnail') && rec.data.identity_picture.thumbnail) {
                            rec.data.identity_picture.avtarUrl = `${api.get_employee_identity_picture}?id=${rec.data.dj_unique_employee_id}&device_id=${crossplat.device.uuid}&image_id=${rec.data.identity_picture.thumbnail}`;
                            rec.data['imageLetter'] = rec.data.name.first.charAt(0);
                        } else {
                            rec.data['imageLetter'] = rec.data.name.first.charAt(0);
                        }
                    } else {
                        rec.data['imageLetter'] = rec.data.name.first.charAt(0);
                    }
                    var getData = {
                        employeeData: rec.data
                    };
                    var getAppendElement = $('#modal-communication-group-activate-employee-group-employee-list-selection').find('.employee-selection-member-list');
                    fetch.appendHtml(function () {
                    }, "layouts/template_elements/employee_group_add_moderator_list_selection", "#employee-group-add-moderator-list-selection-template", getAppendElement, getData);
                }
            }
        }

        if ($('body').attr('app') == "employee_contact_list") {
            if (sessionStorage.getItem('selected-employee-contact-list-type-tab') == "all_employees") {
                digibiz.all_employees_list = [];
                allEmployessListPage();
            }
        }

        if ($('body').attr('app') == "employee_access_list") {
            // digibiz.employee_access_list.push(rec.data);
            // processEmployeeAccessList(digibiz.employee_access_list, function () { });
            digibiz.employee_access_list = [];
            getEmployeeAccessListPage();
        }

        if ($('#modal-communication-group-moderator-selection').length > 0) {
            //check if this employee is present in the modal
            if ($('#modal-communication-group-moderator-selection').find(`.contact-profile-container[data-id="${rec.data.dj_unique_employee_id}"][data-type="employee"]`).length > 0) {
                //check if the name in the pop-up is same as the name coming from the update(display name/core name)
                var nameInModal = $('#modal-communication-group-moderator-selection').find(`.contact-profile-container[data-id="${rec.data.dj_unique_employee_id}"][data-type="employee"]`).siblings('.contact-name-wrapper').text();
                var nameInUpdateResult;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    nameInUpdateResult = rec.data.display_name;
                } else {
                    nameInUpdateResult = `${rec.data.name.first} ${rec.data.name.last}`;
                }
                if (nameInModal == nameInUpdateResult) {
                    //console.log("name is same");
                } else {
                    $('#modal-communication-group-moderator-selection').find(`.contact-profile-container[data-id="${rec.data.dj_unique_employee_id}"][data-type="employee"]`).siblings('.contact-name-wrapper').text(nameInUpdateResult);
                }
            }
        }

        //Case:3 update in communication group detail page
        if ($('body').attr("app") == "communication_group_details") {
            if (sessionStorage.getItem('group_id')) {
                //check if moderator of this employee is present and then update
                if ($(`.communication-group-moderator-member-wrapper[data-id="${rec.data.dj_unique_employee_id}"][data-type="employee"]`).length > 0) {
                    var nameInModal = $(`.communication-group-moderator-member-wrapper[data-id="${rec.data.dj_unique_employee_id}"][data-type="employee"]`).find('.custom-communication-group-moderator-member-name').text();
                    var nameInUpdateResult;
                    if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                        nameInUpdateResult = rec.data.display_name;
                    } else {
                        nameInUpdateResult = `${rec.data.name.first} ${rec.data.name.last}`;
                    }
                    if (nameInModal == nameInUpdateResult) {
                        //console.log("name is same");
                    } else {
                        $(`.communication-group-moderator-member-wrapper[data-id="${rec.data.dj_unique_employee_id}"][data-type="employee"]`).find('.custom-communication-group-moderator-member-name').text(nameInUpdateResult);
                    }
                }
                //check if member of this employee is present and then update member name
                if ($(`.communication-group-member-wrapper[data-employee-id="${rec.data.dj_unique_employee_id}"][data-type="employee"]`).length > 0) {
                    var nameInModal = $(`.communication-group-member-wrapper[data-employee-id="${rec.data.dj_unique_employee_id}"][data-type="employee"]`).find('.communication-group-member-name').text();
                    var nameInUpdateResult;
                    if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                        nameInUpdateResult = rec.data.display_name;
                    } else {
                        nameInUpdateResult = `${rec.data.name.first} ${rec.data.name.last}`;
                    }
                    if (nameInModal == nameInUpdateResult) {
                        //console.log("name is same");
                    } else {
                        $(`.communication-group-member-wrapper[data-employee-id="${rec.data.dj_unique_employee_id}"][data-type="employee"]`).find('.communication-group-member-name').text(nameInUpdateResult);
                    }
                }
            } else {
                //group is still not created
                //update the employee if he is the moderator
                var nameInList = $(`.communication-group-moderator-member-wrapper-not-saved[data-id="${rec.data.dj_unique_employee_id}"]`).find('.filemanager-file-wrapper span').text();
                var nameInUpdateResult;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    nameInUpdateResult = rec.data.display_name;
                } else {
                    nameInUpdateResult = `${rec.data.name.first} ${rec.data.name.last}`;
                }
                if (nameInList == nameInUpdateResult) {
                    //console.log("name is same");
                } else {
                    $(`.communication-group-moderator-member-wrapper-not-saved[data-id="${rec.data.dj_unique_employee_id}"]`).find('.filemanager-file-wrapper span').text(nameInUpdateResult);
                }

                //update member name
                var nameInModal = $(`.communication-group-employee-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).find('.filemanager-file-wrapper span').text();
                var nameInUpdateResult;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    nameInUpdateResult = rec.data.display_name;
                } else {
                    nameInUpdateResult = `${rec.data.name.first} ${rec.data.name.last}`;
                }
                if (nameInModal == nameInUpdateResult) {
                    //console.log("name is same");
                } else {
                    $(`.communication-group-employee-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).find('.filemanager-file-wrapper span').text(nameInUpdateResult);
                }
            }
            //check if the employee contact list modal is open
            if ($('#modal-communication-group-employees-selection').length > 0) {
                //check if this employee is present in the modal
                if ($(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).length > 0) {
                    //check if the name in the pop-up is same as the name coming from the update(display name/core name)
                    var nameInModal = $(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).siblings('.contact-name-wrapper').text();
                    var nameInUpdateResult;
                    if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                        nameInUpdateResult = rec.data.display_name;
                    } else {
                        nameInUpdateResult = `${rec.data.name.first} ${rec.data.name.last}`;
                    }
                    if (nameInModal == nameInUpdateResult) {
                        //console.log("name is same");
                    } else {
                        $(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).siblings('.contact-name-wrapper').text(nameInUpdateResult);
                    }
                } else {
                    if (rec.data.status.status == "active") {
                        var imageLetter;
                        var avtarUrl;
                        var getname;
                        if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                            getname = rec.data.display_name;
                        } else {
                            getname = `${rec.data.name.first} ${rec.data.name.last}`;
                        }
                        if (rec.data.hasOwnProperty('identity_picture') && rec.data.identity_picture) {
                            if (rec.data.identity_picture.hasOwnProperty('thumbnail') && rec.data.identity_picture.thumbnail) {
                                avtarUrl = `${api.get_employee_identity_picture}?id=${rec.data.dj_unique_employee_id}&device_id=${crossplat.device.uuid}&image_id=${rec.data.identity_picture.thumbnail}`;
                                imageLetter = rec.data.name.first.charAt(0);
                            } else {
                                imageLetter = rec.data.name.first.charAt(0);
                            }
                        } else {
                            imageLetter = rec.data.name.first.charAt(0);
                        }
                        var template = `<div class="employee-selection-list-container">
                <div class="contact-profile-container" data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}" data-account-id="${rec.data.account_id}">
                        <img src="${avtarUrl}" class="chat-avatar-image">
                        <span class="persona">${imageLetter}</span>
                </div>
                <div class="contact-name-wrapper ellipsify">${getname}</div>
                 <p>
                    <input type="checkbox" class="filled-in communication-group-employee-select-btn" id="${rec.data.dj_unique_employee_id}" data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}">
                    <label for="${rec.data.dj_unique_employee_id}"></label>
                </p>
            </div>`;
                        $('#modal-communication-group-employees-selection').find('.employee-selection-member-list').append(template);
                    }
                }
            }
        }

        if ($('body').attr('app') == "collaborator_group_create" || $('body').attr('app') == "collaborator_group_details") {
            if (sessionStorage.getItem('group_id')) {
                //update moderator name moderator
                var nameInModal = $(`.collaborator-group-moderator-member-wrapper[data-employee-id="${rec.data.dj_unique_employee_id}"]`).find('.collaborator-group-business-member-name').text();
                var nameInUpdateResult;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    nameInUpdateResult = rec.data.display_name;
                } else {
                    nameInUpdateResult = `${rec.data.name.first} ${rec.data.name.last}`;
                }
                if (nameInModal == nameInUpdateResult) {
                    //console.log("name is same");
                } else {
                    $(`.collaborator-group-moderator-member-wrapper[data-employee-id="${rec.data.dj_unique_employee_id}"]`).find('.collaborator-group-business-member-name').text(nameInUpdateResult);
                }
            } else {
                //update moderator name 
                var nameInModal = $(`.collaborator-group-employee-moderator-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).find('.filemanager-file-wrapper span').text();
                var nameInUpdateResult;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    nameInUpdateResult = rec.data.display_name;
                } else {
                    nameInUpdateResult = `${rec.data.name.first} ${rec.data.name.last}`;
                }
                if (nameInModal == nameInUpdateResult) {
                    //console.log("name is same");
                } else {
                    $(`.collaborator-group-employee-moderator-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).find('.filemanager-file-wrapper span').text(nameInUpdateResult);
                }
                //update member name
                var nameInModal = $(`.collaborator-group-employee-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).find('.filemanager-file-wrapper span').text();
                var nameInUpdateResult;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    nameInUpdateResult = rec.data.display_name;
                } else {
                    nameInUpdateResult = `${rec.data.name.first} ${rec.data.name.last}`;
                }
                if (nameInModal == nameInUpdateResult) {
                    //console.log("name is same");
                } else {
                    $(`.collaborator-group-employee-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).find('.filemanager-file-wrapper span').text(nameInUpdateResult);
                }
            }
            //check if group creator business- employee member selection list pop-up is open          
            if ($('#modal-collaborator-group-owner-business-employee-selection').length > 0) {
                //check if the employee is present 
                if ($(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).length > 0) {
                    //check if the name in the pop-up is same as the name coming from the update(display name/core name)
                    var nameInModal = $('#modal-collaborator-group-owner-business-employee-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).siblings('.contact-name-wrapper').text();
                    var nameInUpdateResult;
                    if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                        nameInUpdateResult = rec.data.display_name;
                    } else {
                        nameInUpdateResult = `${rec.data.name.first} ${rec.data.name.last}`;
                    }
                    if (nameInModal == nameInUpdateResult) {
                        //console.log("name is same");
                    } else {
                        $('#modal-collaborator-group-owner-business-employee-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).siblings('.contact-name-wrapper').text(nameInUpdateResult);
                    }
                } else {
                    if (rec.data.status.status == "active") {
                        if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                            rec.data.getName = rec.data.display_name;
                        } else {
                            rec.data.getName = `${rec.data.name.first} ${rec.data.name.last}`;
                        }
                        if (rec.data.hasOwnProperty('identity_picture') && rec.data.identity_picture) {
                            if (rec.data.identity_picture.hasOwnProperty('thumbnail') && rec.data.identity_picture.thumbnail) {
                                rec.data.identity_picture.avtarUrl = `${api.get_employee_identity_picture}?id=${rec.data.dj_unique_employee_id}&device_id=${crossplat.device.uuid}&image_id=${rec.data.identity_picture.thumbnail}`;
                                rec.data['imageLetter'] = rec.data.name.first.charAt(0);
                            } else {
                                rec.data['imageLetter'] = rec.data.name.first.charAt(0);
                            }
                        } else {
                            rec.data['imageLetter'] = rec.data.name.first.charAt(0);
                        }
                        var getData = {
                            employee: rec.data
                        };
                        fetch.appendHtml(function () {
                        }, "layouts/template_elements/collaborator_group_employee_add_modal_template", "#collaborator-group-employee-add-modal-template", `#modal-collaborator-group-owner-business-employee-selection .employee-selection-member-list`, getData);
                    }
                }
            }
            if ($('#modal-collaborator-group-moderator-selection').length > 0) {
                //check if the name in the pop-up is same as the name coming from the update(display name/core name)
                var nameInModal = $('#modal-collaborator-group-moderator-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).siblings('.contact-name-wrapper').text();
                var nameInUpdateResult;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    nameInUpdateResult = rec.data.display_name;
                } else {
                    nameInUpdateResult = `${rec.data.name.first} ${rec.data.name.last}`;
                }
                if (nameInModal == nameInUpdateResult) {
                    //console.log("name is same");
                } else {
                    $('#modal-collaborator-group-moderator-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).siblings('.contact-name-wrapper').text(nameInUpdateResult);
                }
            }
            if ($('#modal-collaborator-group-business-members').length > 0) {
                //check if the name in the pop-up is same as the name coming from the update(display name/core name)
                var nameInModal = $('#modal-collaborator-group-business-members').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).siblings('.contact-name-wrapper').text();
                var nameInUpdateResult;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    nameInUpdateResult = rec.data.display_name;
                } else {
                    nameInUpdateResult = `${rec.data.name.first} ${rec.data.name.last}`;
                }
                //console.log("nameInModal", nameInModal, nameInUpdateResult)
                if (nameInModal == nameInUpdateResult) {
                    //console.log("name is same");
                } else {
                    $('#modal-collaborator-group-business-members').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).siblings('.contact-name-wrapper').text(nameInUpdateResult);
                }
            }
        }
        //update in business notification accept employee selection page
        if ($('body').attr('app') == "business_notifications") {
            if ($('#modal-collaborator-group-employees-selection').length > 0) {
                //check if this employee is present in the modal
                if ($('#modal-collaborator-group-employees-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).length > 0) {
                    //check if the name in the pop-up is same as the name coming from the update(display name/core name)
                    var nameInModal = $('#modal-collaborator-group-employees-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).siblings('.contact-name-wrapper').text();
                    var nameInUpdateResult;
                    if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                        nameInUpdateResult = rec.data.display_name;
                    } else {
                        nameInUpdateResult = `${rec.data.name.first} ${rec.data.name.last}`;
                    }
                    if (nameInModal == nameInUpdateResult) {
                        //console.log("name is same");
                    } else {
                        $('#modal-collaborator-group-employees-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).siblings('.contact-name-wrapper').text(nameInUpdateResult);
                    }
                } else {//employee not present so add
                    if (rec.data.status.status == "active") {
                        var imageLetter;
                        var avtarUrl;
                        var getname;
                        if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                            getname = rec.data.display_name;
                        } else {
                            getname = `${rec.data.name.first} ${rec.data.name.last}`;
                        }
                        if (rec.data.hasOwnProperty('identity_picture') && rec.data.identity_picture) {
                            if (rec.data.identity_picture.hasOwnProperty('thumbnail') && rec.data.identity_picture.thumbnail) {
                                avtarUrl = `${api.get_employee_identity_picture}?id=${rec.data.dj_unique_employee_id}&device_id=${crossplat.device.uuid}&image_id=${rec.data.identity_picture.thumbnail}`;
                                imageLetter = rec.data.name.first.charAt(0);
                            } else {
                                imageLetter = rec.data.name.first.charAt(0);
                            }
                        } else {
                            imageLetter = rec.data.name.first.charAt(0);
                        }
                        var template = `<div class="employee-selection-list-container">
                <div class="contact-profile-container" data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}" data-account-id="${rec.data.account_id}">
                        <img src="${avtarUrl}" class="chat-avatar-image">
                        <span class="persona">${imageLetter}</span>
                </div>
                <div class="contact-name-wrapper ellipsify">${getname}</div>
                 <p>
                    <input type="checkbox" class="filled-in collaborator-group-employee-select-btn" id="${rec.data.dj_unique_employee_id}" data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}">
                    <label for="${rec.data.dj_unique_employee_id}"></label>
                </p>
            </div>`;
                        $('#modal-collaborator-group-employees-selection').find('.employee-selection-member-list').append(template);
                    }
                }
            }
        }
        if ($('body').attr('app') == "employee_group_create") {
            var getName;
            if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                getName = rec.data.display_name;
            } else {
                getName = `${rec.data.name.first} ${rec.data.name.last}`;
            }
            // employeeGroupCreationPage();
            //modal for standard group employee
            if ($('#modal-standard-employee-group-selection').length > 0) {
                if (rec.data.hasOwnProperty('employee_groups') && rec.data.employee_groups && rec.data.employee_groups.length > 0) {
                    $.each(rec.data.employee_groups, function (index, group) {
                        if (group.status.status == "pending" || group.status.status == "deleted") {
                            $(`.standard-employee-group-select[data-id="${group.id}"]`).parents(`.standard-employee-group-selection-wrapper`).remove();
                        } else if (group.status.status == "draft") {
                            if ($('.standard-employee-selection-list').find(`.contact-profile-container[data-id="${group.id}"]`).length > 0) {

                            } else {
                                var getData = {
                                    id: group.id,
                                    name: group.name,
                                };
                                if (group.hasOwnProperty('group_image') && group.group_image) {
                                    if (group.group_image.hasOwnProperty('thumbnail') && group.group_image.thumbnail) {
                                        var avtarUrl = `${api.get_group_image}?device_id=${crossplat.device.uuid}&id=${group.id}&image_id=${group.group_image.thumbnail}`;
                                        getData['avtarUrl'] = avtarUrl;
                                        getData['imageLetter'] = group.name.charAt(0);
                                    } else {
                                        getData['imageLetter'] = group.name.charAt(0);
                                    }
                                } else {
                                    getData['imageLetter'] = group.name.charAt(0);
                                }
                                fetch.appendHtml(function () {
                                }, "layouts/template_elements/employee_custom_group_standard", "#employee-custom-group-standard-group-template", `.standard-employee-selection-list`, getData);
                            }
                        }
                    })
                }
            }
            //modal-employee-selection
            if ($('#modal-employee-selection').length > 0) {
                if ($('#modal-employee-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).length > 0) {
                    $('#modal-employee-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).siblings('.contact-name-wrapper').text(getName);
                } else {//employee not present                    
                    if (rec.data.status.status == "active") {
                        if (rec.data.hasOwnProperty('identity_picture') && rec.data.identity_picture) {
                            if (rec.data.identity_picture.hasOwnProperty('thumbnail') && rec.data.identity_picture.thumbnail) {
                                rec.data.identity_picture.avtarUrl = `${api.get_employee_identity_picture}?id=${rec.data.dj_unique_employee_id}&device_id=${crossplat.device.uuid}&image_id=${rec.data.identity_picture.thumbnail}`;
                                rec.data['imageLetter'] = rec.data.name.first.charAt(0);
                            } else {
                                rec.data['imageLetter'] = rec.data.name.first.charAt(0);
                            }
                        } else {
                            rec.data['imageLetter'] = rec.data.name.first.charAt(0);
                        }
                        var getData = {
                            employeeData: rec.data
                        };
                        var getAppendElement = $('#modal-employee-selection').find('.employee-selection-member-list');
                        fetch.appendHtml(function () {
                        }, "layouts/template_elements/employee_group_employee_list_selection_template", "#employee-group-employee-list-selection-template", getAppendElement, getData);
                    }
                }
            }
            //update from members heading list(b4 group creation)
            if ($('#employee-group-members-list').find(`.employee-group-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).length > 0) {
                $('#employee-group-members-list').find(`.employee-group-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).find('.filemanager-file-wrapper span').text(getName);
            }
            //update from members heading list(after group creation)
            if ($('#employee-group-members-list').find(`.custom-employee-group-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).length > 0) {
                $('#employee-group-members-list').find(`.custom-employee-group-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).find('.filemanager-file-wrapper span').text(getName);
            }
            //update in group moderator heading list
            if ($('#employee-group-moderator-members-list').find(`.employee-group-moderator-member-wrapper[data-id="${rec.data.dj_unique_employee_id}"]`).length > 0) {
                $('#employee-group-moderator-members-list').find(`.employee-group-moderator-member-wrapper[data-id="${rec.data.dj_unique_employee_id}"]`).find('.group-moderator-name').text(getName);
            }
        }
        if ($('body').attr('app') == "employee_business_list") {
            if (sessionStorage.getItem('digibiz_role') == "employee") {
                if (sessionStorage.getItem('account_id') == rec.data.account_id) {
                    digibiz.employee_business_list = [];
                    var reqParam = {
                        device_id: crossplat.device.uuid,
                        list_by: "employee"
                    }
                    businessList(reqParam)
                        .then((response) => {
                            processEmployeeBusinessList(response, function () { });
                        })
                        .catch((err) => {
                            //console.log("socket error")
                        })
                }
            }
        }
    },
    employeeDelete: function (rec) {
        //console.log("employeeDelete socket reached", rec);
        //Case:1 update in pending/active employee list in the owner/ notification sender side
        if ($('body').attr("app") == "employee_creation_list") {
            if (sessionStorage.getItem('selected-employee-tab') == "employee_pending") {
                digibiz.pending_employee_creation_employee_list = [];
                pendingEmployeeListPage();
            }
            if (sessionStorage.getItem('selected-employee-tab') == "employee_active") {
                digibiz.active_employee_creation_employee_list = [];
                activeEmployeeListPage();
            }
        }
        //Case:2 update business owner role business list page
        if ($('body').attr("app") == "business_owner_business_list" && sessionStorage.getItem('account_id') == rec.data.account_id) {
            digibiz.business_owner_business_list = [];
            // businessOwnerBusinessListPage();
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "my_business"
            }
            businessList(reqParam)
                .then((response) => {
                    processBusinessOwnerBusinessList(response, function () {
                    });
                })
                .catch((err) => {
                })
        }
        //Case:3 should show access revoked message
        if (sessionStorage.getItem('account_id') == rec.data.account_id && sessionStorage.getItem('digibiz_role') == "business_owner" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            Materialize.toast(`You're access as super-admin has been removed.`, 3000, 'round success-alert');
            // sessionStorage.removeItem('digibiz_role');
            // location.hash = `land/page`;
            // digibiz.business_owner_business_list = [];
            // businessOwnerBusinessListPage();
            // location.hash = `business_owner/business/list`;
            location.hash = `business_owner/business/list`;
            $('#alert-digibiz-admin-access-revoked').remove();
            // get all the required sessions and clear all and then set them again
            var userId = sessionStorage.getItem('user_id');
            var UUID = sessionStorage.getItem('uuid');
            var socketId = sessionStorage.getItem('socketID');
            var getAccountID = sessionStorage.getItem('account_id');
            var getAccountDetails = sessionStorage.getItem('accountDetails');
            var storageTokenDetails = sessionStorage.getItem('storage_token');
            var profileDetails = sessionStorage.getItem('profile_details');
            var DigibizRole = sessionStorage.getItem('digibiz_role');
            var getRoleBtn = sessionStorage.getItem('get_role_btn');
            sessionStorage.clear();
            sessionStorage.setItem('user_id', userId);
            sessionStorage.setItem('uuid', UUID);
            sessionStorage.setItem('socketID', socketId);
            sessionStorage.setItem('account_id', getAccountID);
            sessionStorage.setItem('accountDetails', getAccountDetails);
            sessionStorage.setItem('storage_token', storageTokenDetails);
            sessionStorage.setItem('profile_details', profileDetails);
            sessionStorage.setItem('digibiz_role', DigibizRole);
            sessionStorage.setItem('get_role_btn', getRoleBtn);
            // var alert_parms = {
            //     alert_id: "alert-digibiz-admin-access-revoked",
            //     alert_platform: crossplat.device.platform,
            //     alert_title: `Alert`,
            //     alert_body: `Your access to this business has been revoked. Click ok to continue.`,
            //     alert_btn: [{
            //         name: "OK",
            //         attr: [{ name: "id", value: "btn-digibiz-admin-access-revoked-ok" }]
            //     }]
            // }
            // showAlert(alert_parms, function () {
            // });
        }
        //case:4 remove business from employee role employee_business_list
        if ($('body').attr("app") == "employee_business_list" && sessionStorage.getItem('account_id') == rec.data.account_id) {
            digibiz.employee_business_list = [];
            // employeeBusinessListPage();
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "employee"
            }
            businessList(reqParam)
                .then((response) => {
                    processEmployeeBusinessList(response, function () {
                        removeLoader();
                    });
                })
                .catch((err) => {
                })
        }
        //case:5 update groups in groups listing page of employee
        if ($('body').attr("app") == "employee_group_creation_list") {
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "standard") {
                digibiz.standard_employees_groups_list_page = [];
                standardEmployeesGroupsListPage();
            }
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "custom") {
                digibiz.custom_employees_groups_list_page = [];
                customEmployeesGroupsListPage();
            }
        }
        //case:6 update in communication groups page
        if ($('body').attr('app') == "communication_groups") {
            if (sessionStorage.getItem('selected-communication-group-type-tab') == "communication") {
                digibiz.communicationGroupsList = [];
                getCommunicationGroupsPage();
            }
        }
        //case:7 update in communication group detail page
        if ($('body').attr('app') == "communication_group_details") {
            // getCommunicationGroupDetailPage();
            if (sessionStorage.getItem('group_id')) {
                if (rec.data.hasOwnProperty('employee_groups') && rec.data.employee_groups) {
                    $.each(rec.data.employee_groups, function (index, group) {
                        //console.log("group", group);
                        if (sessionStorage.getItem('group_id') == group.id) {
                            Materialize.toast(`Group Deleted`, 3000, 'round success-alert');
                            sessionStorage.removeItem('group_id');
                            $('.custom-modal-popup').remove();
                            location.hash = `communication/groups`;
                        }
                        //remove employee group in communication group page(using group list) below employee members heading(after group craetion)
                        if ($('#communication-group-employee-members-list').length > 0 && sessionStorage.getItem('group_id')) {
                            if ($('#communication-group-employee-members-list').find(`.communication-group-member-wrapper[data-group-id="${group.id}"]`).length > 0) {
                                $('#communication-group-employee-members-list').find(`.communication-group-member-wrapper[data-group-id="${group.id}"]`).remove();
                                $(`.communication-group-moderator-member-wrapper[data-group-id="${group.id}"]`).remove();
                            }
                            // getCommunicationGroupDetailPage();
                        }
                        //remove collab group in communication group page(using group list) below collab members heading(after group craetion)
                        if ($('#communication-group-collaborator-members-list').length > 0 && sessionStorage.getItem('group_id')) {
                            if ($('#communication-group-collaborator-members-list').find(`.communication-group-member-wrapper[data-group-id="${group.id}"]`).length > 0) {
                                $('#communication-group-collaborator-members-list').find(`.communication-group-member-wrapper[data-group-id="${group.id}"]`).remove();
                                $(`.communication-group-moderator-member-wrapper[data-group-id="${group.id}"]`).remove();
                            }
                            // getCommunicationGroupDetailPage();
                        }
                    })
                }
                //remove as moderator if present
                $(`.communication-group-moderator-member-wrapper[data-id="${rec.data.dj_unique_employee_id}"][data-type="employee"]`).remove();
                //remove employee
                $(`.communication-group-member-wrapper[data-employee-id="${rec.data.dj_unique_employee_id}"]`).remove();
            } else {
                //group is still not created
                //remove the employee as member(from employee members list)
                $(`.communication-group-employee-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).remove();
                //remove the employee as moderator(from group moderators list)
                $(`.communication-group-moderator-member-wrapper-not-saved[data-id="${rec.data.dj_unique_employee_id}"]`).remove();

                if (rec.data.hasOwnProperty('employee_groups') && rec.data.employee_groups) {
                    $.each(rec.data.employee_groups, function (index, group) {
                        //console.log("group", group);
                        //remove employee group in communication group page(using group list) below employee members heading(b4 group craetion)
                        if ($('#communication-group-employee-members-list').length > 0) {
                            if ($('#communication-group-employee-members-list').find(`.communication-group-employee-group-member-wrapper[data-id="${group.id}"]`).length > 0) {
                                $('#communication-group-employee-members-list').find(`.communication-group-employee-group-member-wrapper[data-id="${group.id}"]`).remove();
                            }
                        }
                        //remove collab group in communication group page(using group list) below collab members heading(b4 group craetion)
                        if ($('#communication-group-collaborator-members-list').length > 0) {
                            if ($('#communication-group-collaborator-members-list').find(`.communication-group-collaborator-group-member-wrapper[data-id="${group.id}"]`).length > 0) {
                                $('#communication-group-collaborator-members-list').find(`.communication-group-collaborator-group-member-wrapper[data-id="${group.id}"]`).remove();
                            }
                        }
                    })
                }
            }

            //remove employee from employee members selection modal pop-up
            if ($('#modal-communication-group-employees-selection').length > 0) {
                $('#modal-communication-group-employees-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).parent('.employee-selection-list-container').remove();
            }
            //remove employee-group from employee members selection modal pop-up
            if ($('#modal-communication-group-employee-group-selection').length > 0) {
                //console.log("111", rec.data.employee_groups);
                if (rec.data.hasOwnProperty('employee_groups') && rec.data.employee_groups) {
                    $.each(rec.data.employee_groups, function (index, group) {
                        //console.log("group", group);
                        digibiz.communicationCreateEmployeeGroupsList = digibiz.communicationCreateEmployeeGroupsList.filter((e) => {
                            return e.id != group.id;
                        })
                        $(`.group-selection-wrapper[data-group-id="${group.id}"]`).remove();
                    })
                }
            }
            //
            if ($('#modal-communication-group-collaborator-group-selection').length > 0) {
                if (rec.data.hasOwnProperty('employee_groups') && rec.data.employee_groups) {
                    $.each(rec.data.employee_groups, function (index, group) {
                        //console.log("group", group);
                        digibiz.communicationCreateCollaboratorGroupsList = digibiz.communicationCreateCollaboratorGroupsList.filter((e) => {
                            return e.id != group.id;
                        });
                        processCommunicationGroupCreateCollaboratorGroupsList(digibiz.communicationCreateCollaboratorGroupsList, function () { });
                    })
                }
            }
            //remove employee from moderator add modal
            if ($('#modal-communication-group-moderator-selection').length > 0) {
                $('#modal-communication-group-moderator-selection').find(`.contact-profile-container[data-id="${rec.data.dj_unique_employee_id}"]`).parents('.employee-selection-list-container').remove();
            }
        }
        if ($('body').attr('app') == "employee_contact_list") {
            $(`.employee-wrapper[data-employee-id="${rec.data.dj_unique_employee_id}"]`).remove();
        }
        if ($('body').attr('app') == "employee_access_list") {
            digibiz.employee_access_list = digibiz.employee_access_list.filter((e) => {
                return e.dj_unique_employee_id != rec.data.dj_unique_employee_id
            })
            $(`.employee-access-employee-wrapper[data-id="${rec.data.dj_unique_employee_id}"]`).remove();
        }
        if ($('body').attr('app') == "collaborator_group_create" || $('body').attr('app') == "collaborator_group_details") {
            //console.log("collaborator group craete")
            if (sessionStorage.getItem('group_id')) {
                //console.log("giot group_id", $(`.collaborator-group-moderator-member-wrapper[data-employee-id="${rec.data.dj_unique_employee_id}"]`));
                //remove moderator
                $(`.collaborator-group-moderator-member-wrapper[data-employee-id="${rec.data.dj_unique_employee_id}"]`).remove();
            } else {
                //remove member
                $(`.collaborator-group-employee-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).remove();
                //remove moderator
                $(`.collaborator-group-employee-moderator-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).remove();
            }
            if ($('#modal-collaborator-group-owner-business-employee-selection').length > 0 || $('#modal-collaborator-group-moderator-selection').length > 0) {
                $(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).parent('.employee-selection-list-container').remove();
            }
            if ($('#modal-collaborator-group-business-members').length > 0) {
                $('#modal-collaborator-group-business-members').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).parent('.employee-selection-list-container').remove();
            }
            if (rec.data.hasOwnProperty('employee_groups') && rec.data.employee_groups) {
                $.each(rec.data.employee_groups, function (index, group) {
                    //console.log("group", group);
                    if (sessionStorage.getItem('group_id') == group.id) {
                        Materialize.toast(`Group Deleted`, 3000, 'round success-alert');
                        sessionStorage.removeItem('group_id');
                        $('.custom-modal-popup').remove();
                        location.hash = `collaborator/groups/list`;
                    }
                })
            }

            digibiz.show_employees_collaborator_group = digibiz.show_employees_collaborator_group.filter((e) => {
                return e.member.employee_id != rec.data.dj_unique_employee_id
            })



        }
        //update in business notification accept employee selection page
        if ($('body').attr('app') == "business_notifications") {
            if ($('#modal-collaborator-group-employees-selection').length > 0) {
                //remove employee
                $('#modal-collaborator-group-employees-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).parent('.employee-selection-list-container').remove();
            }
        }
        if ($('body').attr('app') == "business_notifications") {
            digibiz.business_notifications = [];
            getBusinessNotificationsPage();
        }
        if ($('#customer-contact-add-access-for-employee-contact-selection-modal').length > 0) {
            $('#customer-contact-add-access-for-employee-contact-selection-modal').find(`.customer-contact-access-employee-wrapper[data-id="${rec.data.dj_unique_employee_id}"]`).remove();
        }
        if ($('body').attr('app') == "employee_group_create") {
            //console.log("1234", rec.data.dj_unique_employee_id);
            //console.log("45678", $('#employee-group-members-list').find(`.custom-employee-group-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`));
            //remove from members heading list(after group creation)
            $('#employee-group-members-list').find(`.custom-employee-group-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).remove();
            //remove from members heading list(b4 group creation)
            $('#employee-group-members-list').find(`.employee-group-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).remove();


            //remove from moderator heading list(after group creation)
            $('#employee-group-moderator-members-list').find(`.employee-group-moderator-member-wrapper[data-id="${rec.data.dj_unique_employee_id}"]`).remove();
            // employeeGroupCreationPage();
            if ($('#modal-standard-employee-group-selection').length > 0) {
                if (rec.data.hasOwnProperty('employee_groups') && rec.data.employee_groups && rec.data.employee_groups.length > 0) {
                    $.each(rec.data.employee_groups, function (index, group) {
                        if (group.status.status == "pending" || group.status.status == "deleted") {
                            $(`.standard-employee-group-select[data-id="${group.id}"]`).parents(`.standard-employee-group-selection-wrapper`).remove();
                        }
                    })
                }
            }
            if (rec.data.hasOwnProperty('employee_groups') && rec.data.employee_groups && rec.data.employee_groups.length > 0) {
                $.each(rec.data.employee_groups, function (index, group) {
                    if (group.status.status == "pending" || group.status.status == "deleted") {
                        if ($('#modal-communication-group-activate-employee-group-employee-list-selection').length > 0) {
                            if ($(`#modal-communication-group-activate-employee-group-employee-list-selection[data-group-id="${group.id}"]`).length > 0) {
                                $(`#modal-communication-group-activate-employee-group-employee-list-selection[data-group-id="${group.id}"]`).remove();
                            }
                        }
                        if (sessionStorage.getItem('group_id') == group.id) {
                            Materialize.toast(`Group Deleted`, 3000, 'round success-alert');
                            sessionStorage.removeItem('group_id');
                            sessionStorage.removeItem('group_from');
                            sessionStorage.removeItem('group_type');
                            $('.custom-modal-popup').remove();
                            location.hash = `employee_group_creation/list`;
                        }
                    }
                })
            }
            //modal-employee-selection
            if ($('#modal-employee-selection').length > 0) {
                if ($('#modal-employee-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).length > 0) {
                    $('#modal-employee-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).parents('.employee-selection-list-container').remove();
                }
            }

        }
        if ($('#modal-communication-group-activate-employee-group-employee-list-selection').length > 0) {
            if ($('#modal-communication-group-activate-employee-group-employee-list-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).length > 0) {
                $('#modal-communication-group-activate-employee-group-employee-list-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).parents('.employee-selection-list-container').remove();
                if ($('#modal-communication-group-activate-employee-group-employee-list-selection').find('.employee-selection-list-container').length < 1) {
                    $('#modal-communication-group-activate-employee-group-employee-list-selection').remove();
                }
            }
            if (rec.data.hasOwnProperty('employee_groups') && rec.data.employee_groups && rec.data.employee_groups.length > 0) {
                $.each(rec.data.employee_groups, function (index, group) {
                    if (group.status.status == "pending" || group.status.status == "deleted") {
                        if ($('#modal-communication-group-activate-employee-group-employee-list-selection').find(`.accordion-content[data-group-id="${group.id}"]`).length > 0) {
                            $('#modal-communication-group-activate-employee-group-employee-list-selection').find(`.accordion-content[data-group-id="${group.id}"]`).parents('.communication-groups-identifier-based-customer-contacts-item-wrapper').remove();
                            if ($('#modal-communication-group-activate-employee-group-employee-list-selection').find('.communication-groups-identifier-based-customer-contacts-item-wrapper').length <= 1) {
                                $('#modal-communication-group-activate-employee-group-employee-list-selection').remove();
                            }
                        }
                    }
                })
            }
        }
        if ($('#group-member-search-modal').length > 0) {
            if ($('#group-member-search-modal').find(`.group-member-search-wrapper[data-id="${rec.data.dj_unique_employee_id}"]`).length > 0) {
                $('#group-member-search-modal').find(`.group-member-search-wrapper[data-id="${rec.data.dj_unique_employee_id}"]`).remove();
                // if ($('#group-member-search-modal').find('.group-member-search-wrapper').length <= 1) {
                //     $('#modal-communication-group-activate-employee-group-employee-list-selection').remove();
                // }
            }
        }
        if ($('body').attr('app') == "customer_creation_active_list") {
            digibiz.customer_creation_active_list = [];
            activeCustomerCreationListPage()
        }
    },

    employeeUpdateEmployeeRole: function (rec) {
        console.log("employeeUpdateEmployeeRole socket reached", rec);
        //case:1 remove business from employee role employee_business_list
        if ($('body').attr("app") == "employee_business_list" && sessionStorage.getItem('account_id') == rec.data.account_id) {
            // //console.log("11", rec.data.status.status);
            if (rec.data.status.status == "active" || rec.data.status.status == "unassigned") {
                if ($(`.employee-business-wrapper[data-business-id="${rec.data.business_id}"]`).length > 0) {
                    //console.log("business already present");
                    //change status to active
                    $(`.employee-business-wrapper[data-business-id="${rec.data.business_id}"]`).attr('data-status', 'active')
                } else {
                    // //console.log("123")
                    digibiz.employee_business_list = [];
                    // employeeBusinessListPage();
                    var reqParam = {
                        device_id: crossplat.device.uuid,
                        list_by: "employee"
                    }
                    businessList(reqParam)
                        .then((response) => {
                            processEmployeeBusinessList(response, function () {
                                removeLoader();
                            });
                        })
                        .catch((err) => {
                        })
                }
            } else if (rec.data.status.status == "inactive") {
                if ($(`.employee-business-wrapper[data-business-id="${rec.data.business_id}"]`).length > 0) {
                    //console.log("business already present");
                    //change status to active
                    $(`.employee-business-wrapper[data-business-id="${rec.data.business_id}"]`).attr('data-status', 'inactive')
                } else {
                    // //console.log("123")
                    digibiz.employee_business_list = [];
                    // employeeBusinessListPage();
                    var reqParam = {
                        device_id: crossplat.device.uuid,
                        list_by: "employee"
                    }
                    businessList(reqParam)
                        .then((response) => {
                            processEmployeeBusinessList(response, function () {
                                removeLoader();
                            });
                        })
                        .catch((err) => {
                        })
                }
            }
        }
    },

    customerUpdateCustomerRole: function (rec) {
        //console.log("customerUpdateCustomerRole socket reached", rec);
        //case:1 remove business from employee role employee_business_list
        if ($('body').attr("app") == "customer_business_list" && sessionStorage.getItem('account_id') == rec.data.account_id) {
            // //console.log("11", rec.data.status.status);
            if (rec.data.status.status == "active") {
                if ($(`.employee-business-wrapper[data-business-id="${rec.data.business_id}"]`).length > 0) {
                    //console.log("business already present");
                    //change status to active
                    $(`.employee-business-wrapper[data-business-id="${rec.data.business_id}"]`).attr('data-status', 'active')
                } else {
                    // //console.log("123")
                    digibiz.customer_business_list = [];
                    // customerBusinessListPage();
                    var reqParam = {
                        device_id: crossplat.device.uuid,
                        list_by: "customer"
                    }
                    businessList(reqParam)
                        .then((response) => {
                            processCustomerBusinessList(response, function () {
                                removeLoader();
                            });
                        })
                        .catch((err) => {
                        })
                }
            } else if (rec.data.status.status == "inactive") {
                if ($(`.employee-business-wrapper[data-business-id="${rec.data.business_id}"]`).length > 0) {
                    //console.log("business already present");
                    //change status to active
                    $(`.employee-business-wrapper[data-business-id="${rec.data.business_id}"]`).attr('data-status', 'inactive')
                } else {
                    // //console.log("123")
                    digibiz.customer_business_list = [];
                    // customerBusinessListPage();
                    var reqParam = {
                        device_id: crossplat.device.uuid,
                        list_by: "customer"
                    }
                    businessList(reqParam)
                        .then((response) => {
                            processCustomerBusinessList(response, function () {
                                removeLoader();
                            });
                        })
                        .catch((err) => {
                        })
                }
            }
        }
    },

    superAdminAdd: function (rec) {
        //console.log("superAdminAdd socket reached", rec);
        //Case:1 update in pending/active super-admin list in the notification sender side
        if ($('body').attr("app") == "super_admin_management_hub") {
            if (sessionStorage.getItem('selected-super-admin-management-tab') == "active-super-admin") {
                digibiz.active_super_admins_list = [];
                activeSuperAdminsTab();
            }
            if (sessionStorage.getItem('selected-super-admin-management-tab') == "pending-super-admin") {
                digibiz.pending_super_admins_list = [];
                pendingSuperAdminsTab();
            }
        }
        if ($('body').attr("app") == "employee_creation_list") {
            if (sessionStorage.getItem('selected-employee-tab') == "employee_active") {
                digibiz.active_employee_creation_employee_list.splice(0, 0, rec.data);
                // activeEmployeeListPage();
                processActiveEmployeeCreationEmployeeList(digibiz.active_employee_creation_employee_list, function () { });
            }
        }
        if ($('body').attr('app') == "employee_group_create") {
            if (sessionStorage.getItem('group_id') == rec.data.std_group.id) {
                //add moderator modal
                if ($('#modal-communication-group-activate-employee-group-employee-list-selection').length > 0) {
                    if (rec.data.status.status == "active") {
                        if (rec.data.hasOwnProperty('identity_picture') && rec.data.identity_picture) {
                            if (rec.data.identity_picture.hasOwnProperty('thumbnail') && rec.data.identity_picture.thumbnail) {
                                rec.data.identity_picture.avtarUrl = `${api.get_employee_identity_picture}?id=${rec.data.dj_unique_employee_id}&device_id=${crossplat.device.uuid}&image_id=${rec.data.identity_picture.thumbnail}`;
                                rec.data['imageLetter'] = rec.data.name.first.charAt(0);
                            } else {
                                rec.data['imageLetter'] = rec.data.name.first.charAt(0);
                            }
                        } else {
                            rec.data['imageLetter'] = rec.data.name.first.charAt(0);
                        }
                        var getData = {
                            employeeData: rec.data
                        };
                        var getAppendElement = $('#modal-communication-group-activate-employee-group-employee-list-selection').find('.employee-selection-member-list');
                        fetch.appendHtml(function () {
                            $('#modal-communication-group-activate-employee-group-employee-list-selection').find(`.communication-group-employee-select-btn[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).attr('checked', true);
                        }, "layouts/template_elements/employee_group_add_moderator_list_selection", "#employee-group-add-moderator-list-selection-template", getAppendElement, getData);
                    }
                }
                //moderator heading
                employeeGroupCreationPage();
            }
        }
        if ($('body').attr("app") == "employee_business_list" && sessionStorage.getItem('account_id') == rec.data.account_id) {
            //console.log("Super-Admin Role mY page")
            digibiz.employee_business_list = [];
            // employeeBusinessListPage();
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "employee"
            }
            businessList(reqParam)
                .then((response) => {
                    processEmployeeBusinessList(response, function () {
                        removeLoader();
                    });
                })
                .catch((err) => {
                })
        } else {
            //console.log("Super-Admin Role Not Your page")
        }
        if ($('body').attr("app") == "business_owner_business_list" && sessionStorage.getItem('account_id') == rec.data.account_id) {
            digibiz.business_owner_business_list = [];
            // businessOwnerBusinessListPage();
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "my_business"
            }
            businessList(reqParam)
                .then((response) => {
                    processBusinessOwnerBusinessList(response, function () {
                    });
                })
                .catch((err) => {
                })
        }
        if (sessionStorage.getItem('account_id') == rec.data.account_id) {
            digibiz.business_owner_business_list = [];
            businessAdminBusinessListHelperMethod();
            // businessOwnerBusinessListPage();
        }
    },
    superAdminRevoke: function (rec) {
        //console.log("superAdminRevoke", rec)
        //Case:1 update in pending/active super-admin list in the notification sender side
        if ($('body').attr("app") == "super_admin_management_hub") {
            if (sessionStorage.getItem('selected-super-admin-management-tab') == "active-super-admin") {
                digibiz.active_super_admins_list = [];
                activeSuperAdminsTab();
            }
            if (sessionStorage.getItem('selected-super-admin-management-tab') == "pending-super-admin") {
                digibiz.pending_super_admins_list = [];
                pendingSuperAdminsTab();
            }
        }
        //Case:2 update business owner role business list page
        if ($('body').attr("app") == "business_owner_business_list" && sessionStorage.getItem('account_id') == rec.data.employee_data.account_id) {
            digibiz.business_owner_business_list = [];
            // businessOwnerBusinessListPage();
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "my_business"
            }
            businessList(reqParam)
                .then((response) => {
                    processBusinessOwnerBusinessList(response, function () {
                    });
                })
                .catch((err) => {
                })
        }
        if ($('body').attr("app") == "employee_business_list" && sessionStorage.getItem('account_id') == rec.data.employee_data.account_id) {
            digibiz.employee_business_list = [];
            // employeeBusinessListPage();
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "employee"
            }
            businessList(reqParam)
                .then((response) => {
                    processEmployeeBusinessList(response, function () {
                        removeLoader();
                    });
                })
                .catch((err) => {
                })
        }
        //Case:3 should show access revoked message
        if (sessionStorage.getItem('account_id') == rec.data.employee_data.account_id && sessionStorage.getItem('digibiz_role') == "business_owner" && sessionStorage.getItem('business_id') == rec.data.employee_data.business_id) {
            Materialize.toast(`You're access as super-admin has been removed.`, 3000, 'round success-alert');
            // sessionStorage.removeItem('digibiz_role');
            // location.hash = `land/page`;
            // digibiz.business_owner_business_list = [];//this line was present
            // businessOwnerBusinessListPage();
            // location.hash = `business_owner/business/list`;
            $('#alert-digibiz-admin-access-revoked').remove();//this line was present
            // get all the required sessions and clear all and then set them again
            var userId = sessionStorage.getItem('user_id');
            var UUID = sessionStorage.getItem('uuid');
            var socketId = sessionStorage.getItem('socketID');
            var getAccountID = sessionStorage.getItem('account_id');
            var getAccountDetails = sessionStorage.getItem('accountDetails');
            var storageTokenDetails = sessionStorage.getItem('storage_token');
            var profileDetails = sessionStorage.getItem('profile_details');
            var DigibizRole = sessionStorage.getItem('digibiz_role');
            var getRoleBtn = sessionStorage.getItem('get_role_btn');
            sessionStorage.clear();
            sessionStorage.setItem('user_id', userId);
            sessionStorage.setItem('uuid', UUID);
            sessionStorage.setItem('socketID', socketId);
            sessionStorage.setItem('account_id', getAccountID);
            sessionStorage.setItem('accountDetails', getAccountDetails);
            sessionStorage.setItem('storage_token', storageTokenDetails);
            sessionStorage.setItem('profile_details', profileDetails);
            sessionStorage.setItem('digibiz_role', DigibizRole);
            sessionStorage.setItem('get_role_btn', getRoleBtn);
            var alert_parms = {
                alert_id: "alert-digibiz-admin-access-revoked",
                alert_platform: crossplat.device.platform,
                alert_title: `Alert`,
                alert_body: `Your access to this business has been revoked.Please contact the business.Click ok to continue.`,
                alert_btn: [{
                    name: "OK",
                    attr: [{ name: "id", value: "btn-digibiz-admin-access-revoked-ok" }]
                }]
            }
            showAlert(alert_parms, function () {
            });
        }
        //Case:4 update in employee groups page
        if ($('body').attr('app') == "employee_group_creation_list") {
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "standard") {
                digibiz.standard_employees_groups_list_page = [];
                standardEmployeesGroupsListPage();
            }
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "custom") {
                digibiz.custom_employees_groups_list_page = [];
                customEmployeesGroupsListPage();
            }
        }
        if ($('body').attr('app') == "employee_group_create") {
            // if (sessionStorage.getItem('group_id') == rec.data.std_group.id) {
            // employeeGroupCreationPage();
            // //console.log("1234", rec.data.dj_unique_employee_id);
            // //console.log("45678", $('#employee-group-members-list').find(`.custom-employee-group-member-wrapper[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`));
            // }
            //add moderator modal
            if ($('#modal-communication-group-activate-employee-group-employee-list-selection').length > 0) {
                $('#modal-communication-group-activate-employee-group-employee-list-selection').find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.employee_data.dj_unique_employee_id}"]`).parents('.employee-selection-list-container').remove();
            }
        }
        if ($('body').attr("app") == "employee_creation_list") {
            if (sessionStorage.getItem('selected-employee-tab') == "employee_active") {
                digibiz.active_employee_creation_employee_list = [];
                activeEmployeeListPage();
            }
        }
        if ($('body').attr('app') == "communication_groups") {
            if (sessionStorage.getItem('selected-communication-group-type-tab') == "communication") {
                digibiz.communicationGroupsList = [];
                getCommunicationGroupsPage();
            } else if (sessionStorage.getItem('selected-communication-group-type-tab') == "employee") {
                digibiz.communicationEmployeeGroupsList = [];
                getCommunicationEmployeePage();
            } else if (sessionStorage.getItem('selected-communication-group-type-tab') == "customer") {
                digibiz.communicationCustomerGroupsList = [];
                getCommunicationCustomerPage();
            }
        }
        if ($('body').attr('app') == "communication_group_details") {
            getCommunicationGroupDetailPage();
        }
        if ($('body').attr('app') == "collaborator_group_details") {
            getCollaboratorGroupDetailsPage();
        }
    },

    employeeGroupAdd: function (rec) {
        //console.log("employeeGroupAdd socket reached", rec);
        //Case:1 update in custom side of the employee group list page
        if ($('body').attr("app") == "employee_group_creation_list") {
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "standard") {
                var list_data = [];
                list_data.push(rec.data);
                processStandardEmployeeGroupsList(list_data, function () { });
            }
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "custom") {
                var list_data = [];
                list_data.push(rec.data);
                processCustomEmployeeGroupsList(list_data, function () { });
            }
        }
    },
    customerGroupAdd: function (rec) {
        //console.log("customerGroupAdd socket reached", rec);
        //Case:1 update in groups list
        if ($('body').attr("app") == "customer_groups_identifiers_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard" && rec.data.group_type == "standard") {
                digibiz.standard_customer_groups_identifiers_list = [];
                standardCustomerGroupsIdentifierListPage();
            }
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "custom" && rec.data.group_type == "custom") {
                var list_data = [];
                list_data.push(rec.data);
                processCustomerCustomGroupList(list_data, function () { });
            }
        }
        //case:2 add in communication group(group list selection pop-up)
        var group = rec.data;
        if ($('#modal-communication-group-customer-group-selection').length > 0) {
            //check if this group is already present in the modal
            if ($(`.group-selection-wrapper[data-group-id="${group.id}"][data-group-type="customer"]`).length > 0) {
                //console.log("123");
                //console.log("Group already presetn");
            } else {//add it to the modal, not present
                if (group.status.status == "draft") {//check if group is draft
                    if (group.hasOwnProperty('group_image') && group.group_image) {
                        if (group.group_image.hasOwnProperty('thumbnail') && group.group_image.thumbnail) {
                            var avtarUrl = `${api.get_group_image}?device_id=${crossplat.device.uuid}&id=${group.id}&image_id=${group.group_image.thumbnail}`;
                            group.group_image['avtarUrl'] = avtarUrl;
                            group['imageLetter'] = group.name.charAt(0);
                        } else {
                            group['imageLetter'] = group.name.charAt(0);
                        }
                    } else {
                        group['imageLetter'] = group.name.charAt(0);
                    }
                    var getData = {
                        group_data: group
                    };
                    //console.log("not present group so add", getData);
                    fetch.appendHtml(function () {
                    }, "layouts/template_elements/communication_group_group_list_customer_group_add", "#communication-group-group-list-customer-group-add-template", `.customer-group-list-selection-main-container`, getData);
                }
            }
        }
    },
    communicationGroupAdd: function (rec) {
        //console.log("communicationGroupAdd socket reached", rec);
        //case:1 update in communication groups page
        if ($('body').attr('app') == "communication_groups") {
            if (sessionStorage.getItem('selected-communication-group-type-tab') == "communication") {
                digibiz.communicationGroupsList = [];
                getCommunicationGroupsPage();
            }
        }
    },
    collaboratorGroupAdd: function (rec) {
        //console.log("collaboratorGroupAdd socket reached", rec);
        if ($('body').attr('app') == "collaborator_groups_list") {
            digibiz.collaborator_groups_list = [];
            getCollaboratorGroupsListPage();
        }
    },

    groupCommonUpdate: function (rec) {
        //console.log("groupCommonUpdate socket reached", rec);
        //Case:1 update in custom side of the employee group list page
        if (rec.data.socket_enable_status) {
            $(`[data-group-id="${rec.data.id}"]`).attr('data-socket_enable_status', rec.data.socket_enable_status);
            $(`[data-group-id="${rec.data.group_id}"]`).attr('data-socket_enable_status', rec.data.socket_enable_status);
            $(`[data-id="${rec.data.group_id}"]`).attr('data-socket_enable_status', rec.data.socket_enable_status);
        }
        if ($('body').attr("app") == "employee_group_creation_list") {
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "custom") {
                digibiz.custom_employees_groups_list_page = [];
                customEmployeesGroupsListPage();
            }
        }
        //Case:2 update in detail page of the group
        if ($('body').attr('app') == "employee_group_create") {
            if (sessionStorage.getItem('group_id') == rec.data.id) {
                employeeGroupCreationPage();
            }
        }
        //Case:3 update in show access list of customer show access list    
        if ($('body').attr('app') == "customer_create") {
            if ($('#customer-access-show-modal').length > 0) {
                digibiz.show_customer_access_list = [];
                var requestParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "customer",
                    id: sessionStorage.getItem('customer_id')
                }
                getIdentifierItem(requestParams)
                    .then((result) => {
                        var reqParam = {
                            device_id: crossplat.device.uuid,
                            business_id: sessionStorage.getItem('business_id'),
                            type: "customer",
                            identifier_id: sessionStorage.getItem('identifier_id'),
                            identifier_item_id: result.id,
                            member_id: sessionStorage.getItem('customer_id'),
                        }
                        showAccessCustomerList(reqParam)
                            .then((response) => {
                                processCustomerShowAccessList(response, function () {
                                    removeLoader();
                                });
                            })
                            .catch((err) => { })
                    })
                    .catch((err) => { })
            }
            if ($('#associate-customer-access-show-modal').length > 0) {
                digibiz.show_associate_customer_access_list = [];
                var getAssociateCustomerId = $('#associate-customer-access-show-modal').attr('data-associate-customer-id');
                addLoader();
                var requestParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "associate_customer",
                    id: getAssociateCustomerId
                }
                getIdentifierItem(requestParams)
                    .then((result) => {
                        //console.log("result", result);
                        var getIdentifierIdData = result.data.find((e) => e.type == "associate_customer_identifier");
                        //console.log("getIdentifierIdData", getIdentifierIdData);
                        var reqParam = {
                            device_id: crossplat.device.uuid,
                            business_id: sessionStorage.getItem('business_id'),
                            type: "associate_customer",
                            identifier_id: getIdentifierIdData.identifier_id,
                            identifier_item_id: result.id,
                            member_id: getAssociateCustomerId,
                            parent_identifier_id: result.parent_customer_identifier_id
                        }
                        processAssociateCustomerShowAccessList(reqParam)
                            .then((response) => {
                            })
                            .catch((err) => {

                            })
                    })
                    .catch((err) => {

                    })
            }
        }
        //Case:4 update in show access list of employee show access list
        if ($('body').attr('app') == "employee_create") {
            if ($('#employee-access-show-modal').length > 0) {
                digibiz.show_employee_access_list = [];
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "employee",
                    member_id: sessionStorage.getItem('employee_id'),
                }
                showAccessEmployeeList(reqParam)
                    .then((response) => {
                        processEmployeeShowAccessList(response, function () {
                            removeLoader();
                        });
                    })
                    .catch((err) => { })
            }
        }
        //Case:5 update in communication group page
        if ($('#modal-communication-group-employee-group-selection').length > 0) {
            $('#modal-communication-group-employee-group-selection').find(`.group-selection-wrapper[data-group-id="${rec.data.id}"]`).find('.employee-group-name span').text(rec.data.name);
        }
        //update employee group in communication group page(using group list) below employee members heading(b4 group craetion)
        if ($('#communication-group-employee-members-list').length > 0) {
            if ($('#communication-group-employee-members-list').find(`.communication-group-employee-group-member-wrapper[data-id="${rec.data.id}"]`).length > 0) {
                $('#communication-group-employee-members-list').find(`.communication-group-employee-group-member-wrapper[data-id="${rec.data.id}"]`).find('.filemanager-file-wrapper span').text(rec.data.name);
            }
        }
        //update employee group in communication group page(using group list) below employee members heading(after group craetion)
        if ($('#communication-group-employee-members-list').length > 0 && sessionStorage.getItem('group_id')) {
            // if ($('#communication-group-employee-members-list').find(`.communication-group-member-wrapper[data-group-id="${rec.data.id}"]`).length > 0) {
            //     $('#communication-group-employee-members-list').find(`.communication-group-member-wrapper[data-group-id="${rec.data.id}"]`).remove();
            // }
            getCommunicationGroupDetailPage();
        }

        if ($('body').attr('app') == "communication_group_details") {
            //console.log("inside communication group details")
            //update collaborator group in communication group page(using group list) below collaborator members heading(b4 group craetion)
            if ($('#communication-group-collaborator-members-list').length > 0) {
                if ($('#communication-group-collaborator-members-list').find(`.communication-group-collaborator-group-member-wrapper[data-id="${rec.data.id}"]`).length > 0) {
                    $('#communication-group-collaborator-members-list').find(`.communication-group-collaborator-group-member-wrapper[data-id="${rec.data.id}"]`).find('.filemanager-file-wrapper span').text(rec.data.name);
                }
            }
            if ($('#communication-group-collaborator-members-list').length > 0 && sessionStorage.getItem('group_id')) {
                if ($('#communication-group-collaborator-members-list').find(`.communication-group-member-wrapper[data-group-id="${rec.data.id}"]`).length > 0) {
                    getCommunicationGroupDetailPage();
                }
            }
            if ($('#modal-communication-group-collaborator-group-selection').length > 0) {
                //console.log("modal is open");
                $('#modal-communication-group-collaborator-group-selection').find(`.group-selection-wrapper[data-group-id="${rec.data.id}"]`).find('.collaborator-group-name span').text(rec.data.name);
            }
        }
    },

    employeeGroupDepartmentAddUpdate: function (rec) {
        //console.log("employeeGroupDepartmentAddUpdate socket reached", rec);
        //Case:1 update in detail page of the group
        if ($('body').attr('app') == "employee_group_create") {
            if (sessionStorage.getItem('group_id') == rec.data.id) {
                // employeeGroupCreationPage();
                if (rec.data.department_data.length > 0) {
                    $.each(rec.data.department_data, function (index, department) {
                        if ($('#employee-group-members-list').find(`.custom-employee-group-member-wrapper[data-department-id="${department.id}"]`).length > 0) {
                        } else {
                            var getImageLetter = department.name.charAt(0);
                            var template = `<div class="custom-employee-group-member-wrapper" data-department-id="${department.id}">
                                        <div class="file-select">                                                    
                                            <div class="contact-profile-container" data-department-id="${department.id}">
                                                <span class="persona">${getImageLetter}</span>
                                            </div>
                                        </div>
                                        <div class="filemanager-file-wrapper">
                                            <span class="custom-employee-group-member-name">${department.name}</span>
                                        </div>
                                        <div class="btn-wrap">              
                                            <div class="more-menu-wrapper" id="delete_custom_department_list_group_department" data-department-id="${department.id}"><i class="material-icons">delete</i></div>
                                        </div>
                                    </div>`;
                            $('#employee-group-members-list').append(template);
                        }
                    })
                }
                Materialize.toast("Departments Added Successfully", 3000, 'round success-alert');
            }
        }
    },
    employeeGroupDepartmentDeleteUpdate: function (rec) {
        //console.log("employeeGroupDepartmentDeleteUpdate socket reached", rec);
        //Case:1 update in detail page of the group
        if ($('body').attr('app') == "employee_group_create") {
            if (sessionStorage.getItem('group_id') == rec.data.id) {
                employeeGroupCreationPage();
            }
        }
    },

    groupDelete: function (rec) {
        //console.log("groupDelete socket reached", rec);

        if (rec.data.group_for == "employee" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            //Case:1 update in custom side of the employee group list page
            if ($('body').attr("app") == "employee_group_creation_list") {
                if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "custom") {
                    digibiz.custom_employees_groups_list_page = [];
                    customEmployeesGroupsListPage();
                }
            }
            //Case:2 update in detail page of the group
            if ($('body').attr('app') == "employee_group_create") {
                if (sessionStorage.getItem('group_id') == rec.data.id) {
                    Materialize.toast(`Group Deleted`, 3000, 'round success-alert');
                    sessionStorage.removeItem('group_id');
                    sessionStorage.removeItem('group_from');
                    sessionStorage.removeItem('group_type');
                    $('.custom-modal-popup').remove();
                    location.hash = `employee_group_creation/list`;
                }
            }
            if ($('#modal-communication-group-employee-group-selection').length > 0) {
                if (rec.data.status.status == "draft" || rec.data.status.status == "deleted" || rec.data.status.status == "pending") {
                    //console.log("22");
                    digibiz.communicationCreateEmployeeGroupsList = digibiz.communicationCreateEmployeeGroupsList.filter((e) => {
                        return e.id != rec.data.id
                    })
                    processCommunicationGroupCreateEmployeeGroupsList(digibiz.communicationCreateEmployeeGroupsList, function () { });
                }
            }
            //remove employee group in communication group page(using group list) below employee members heading(b4 group craetion)
            if ($('#communication-group-employee-members-list').length > 0) {
                if ($('#communication-group-employee-members-list').find(`.communication-group-employee-group-member-wrapper[data-id="${rec.data.id}"]`).length > 0) {
                    $('#communication-group-employee-members-list').find(`.communication-group-employee-group-member-wrapper[data-id="${rec.data.id}"]`).remove();
                }
            }
            //remove employee group in communication group page(using group list) below employee members heading(after group craetion)
            if ($('#communication-group-employee-members-list').length > 0 && sessionStorage.getItem('group_id')) {
                // if ($('#communication-group-employee-members-list').find(`.communication-group-member-wrapper[data-group-id="${rec.data.id}"]`).length > 0) {
                //     $('#communication-group-employee-members-list').find(`.communication-group-member-wrapper[data-group-id="${rec.data.id}"]`).remove();
                // }
                getCommunicationGroupDetailPage();
            }
        }
        if (rec.data.group_for == "customer" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            //console.log("inside customer");
            //case:3 update in customer management group list
            if ($('body').attr("app") == "customer_groups_identifiers_list") {
                //console.log("1234");
                if (rec.data.group_type == "custom") {
                    //console.log("9876");
                    if (sessionStorage.getItem('selected-customer-group-type-tab') == "custom") {
                        //console.log("custom", rec.data.id);
                        digibiz.custom_groups_list = digibiz.custom_groups_list.filter((p) => {
                            return p.id != rec.data.id
                        });
                        //console.log("after filter", digibiz.custom_groups_list);
                        processCustomerCustomGroupList(digibiz.custom_groups_list, function () { });
                    }
                }
            }
            if ($('#modal-communication-group-customer-group-selection').length > 0) {
                if (rec.data.status.status == "deleted" || rec.data.status.status == "pending") {
                    //console.log("22");
                    digibiz.communicationCreateCustomersGroupsList = digibiz.communicationCreateCustomersGroupsList.filter((e) => {
                        return e.id != rec.data.id
                    })
                    processCommunicationGroupCreateCustomerGroupsList(digibiz.communicationCreateCustomersGroupsList, function () { });
                }
            }
            //in the listing(members)(b4 group created)
            if ($('#communication-group-customer-members-list').find(`.communication-group-customer-group-member-wrapper[data-id="${rec.data.id}"]`).length > 0) {
                $('#communication-group-customer-members-list').find(`.communication-group-customer-group-member-wrapper[data-id="${rec.data.id}"]`).remove();
            }
            //in the listing(members)(after group creating)
            if ($('#communication-group-customer-members-list').find(`.communication-group-member-wrapper[data-group-id="${rec.data.id}"]`).length > 0) {
                // $('#communication-group-customer-members-list').find(`.communication-group-member-wrapper[data-group-id="${rec.data.id}"]`).remove();
                getCommunicationGroupDetailPage();
            }
        }
        if (rec.data.group_for == "collaborator") {
            //console.log("inside collaborator grp");
            //case:3 update in customer management group list
            if ($('body').attr('app') == "collaborator_group_details" && sessionStorage.getItem('group_id') == rec.data.id) {
                Materialize.toast(`Group Deleted`, 3000, 'round success-alert');
                sessionStorage.removeItem('group_id');
                $('.custom-modal-popup').remove();
                location.hash = `collaborator/groups/list`;
            }
            if ($('body').attr('app') == "collaborator_groups_list") {
                digibiz.collaborator_groups_list = [];
                getCollaboratorGroupsListPage();
            }
            if ($('body').attr('app') == "communication_group_details") {
                //console.log("inside communication group details")
                $(`.communication-group-collaborator-group-member-wrapper[data-id="${rec.data.id}"]`).remove();
                $(`.communication-group-member-wrapper[data-group-id="${rec.data.id}"]`).remove();
                if ($('#modal-communication-group-collaborator-group-selection').length > 0) {
                    //console.log("modal is open");
                    digibiz.communicationCreateCollaboratorGroupsList = digibiz.communicationCreateCollaboratorGroupsList.filter((e) => {
                        return e.id != rec.data.id;
                    });
                    processCommunicationGroupCreateCollaboratorGroupsList(digibiz.communicationCreateCollaboratorGroupsList, function () { });
                }
                if (sessionStorage.getItem('group_id')) {
                    getCommunicationGroupDetailPage();
                }
            }
        }
        if (rec.data.group_for == "communication") {
            if ($('body').attr('app') == "communication_group_details") {

                if (sessionStorage.getItem('group_id') == rec.data.id) {
                    //console.log("communication group")
                    Materialize.toast(`Group Deleted`, 3000, 'round success-alert');
                    sessionStorage.removeItem('group_id');
                    sessionStorage.removeItem('group_type');
                    sessionStorage.removeItem('group_from');
                    $('.custom-modal-popup').remove();
                    location.hash = `communication/groups`;
                }
                if ($('#modal-communication-group-collaborator-group-selection').length > 0) {
                    // $(`.group-selection-wrapper[data-group-id="${rec.data.id}"]`).remove();
                    digibiz.communicationCreateCollaboratorGroupsList = digibiz.communicationCreateCollaboratorGroupsList.filter((e) => {
                        return e.id != rec.data.id;
                    });
                    processCommunicationGroupCreateCollaboratorGroupsList(digibiz.communicationCreateCollaboratorGroupsList, function () { });
                }
            }
            if ($('body').attr('app') == "communication_groups") {
                if (sessionStorage.getItem('selected-communication-group-type-tab') == "communication") {
                    digibiz.communicationGroupsList = [];
                    getCommunicationGroupsPage();
                }
            }
        }
        if ($('#employee-access-show-modal').length > 0) {
            var getContactGroup = digibiz.show_employee_access_list.find((e) => e.access_data_type == "contact" && e.access_data.type == "custom_group" && e.access_data.id == rec.data.id);
            if (getContactGroup != undefined) {
                digibiz.show_employee_access_list = digibiz.show_employee_access_list.filter((e) => {
                    return e.id != getContactGroup.id
                })
            }
            var getGroup = digibiz.show_employee_access_list.find((e) => e.access_data_type == "group" && e.id == rec.data.id);
            if (getGroup != undefined) {
                digibiz.show_employee_access_list = digibiz.show_employee_access_list.filter((e) => {
                    return e.id != getGroup.id
                })
            }
            processEmployeeShowAccessList(digibiz.show_employee_access_list, function () { });
        }
    },

    groupMemberDelete: function (rec) {
        //console.log("groupMemberDelete socket reached", rec);
        if ($('#modal-communication-group-activate-employee-group-employee-list-selection').length > 0) {
            // var reqParam = {
            //     device_id: crossplat.device.uuid,
            //     group_id: rec.data.group_data.id
            // }
            // getCompleteGroupMembers(reqParam)
            //     .then((response) => {
            digibiz.communicationActivateEmployeeGroupEmployeeList = digibiz.communicationActivateEmployeeGroupEmployeeList.filter((e) => {
                return e.id != rec.data.member_data.id;
            })
            processCommunicationGroupActivateEmployeeGroupEmployeeList(digibiz.communicationActivateEmployeeGroupEmployeeList, rec.data.group_data, function () { })
            // })
            // .catch((err) = {

            // })
        }
        //Case:1 update in custom side of the employee group list page
        if ($('body').attr("app") == "employee_group_creation_list") {
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "custom") {
                digibiz.custom_employees_groups_list_page = [];
                customEmployeesGroupsListPage();
            }
        }
        //Case:2 update in detail page of the group
        if ($('body').attr('app') == "employee_group_create") {
            // if (rec.data.group_data.group_for == "employee" && sessionStorage.getItem('group_id') == rec.data.group_data.id) {                
            //     $(`.custom-employee-group-member-wrapper[data-id="${rec.data.member_data.id}"]`).remove();
            //     Materialize.toast(`Group Member Deleted`, 3000, 'round success-alert');
            // }
            employeeGroupCreationPage();
            if (rec.data.hasOwnProperty('deleted_group') && rec.data.deleted_group && rec.data.deleted_group.length > 0) {
                $.each(rec.data.deleted_group, function (index, group) {
                    if (group.status.status == "pending" || group.status.status == "deleted") {
                        if (sessionStorage.getItem('group_id') == group.id) {
                            Materialize.toast(`Group Deleted`, 3000, 'round success-alert');
                            sessionStorage.removeItem('group_id');
                            sessionStorage.removeItem('group_from');
                            sessionStorage.removeItem('group_type');
                            $('.custom-modal-popup').remove();
                            location.hash = `employee_group_creation/list`;
                        }
                    }
                })
            }
        }

        //case:4 update in communication group detail page
        if ($('body').attr('app') == "communication_group_details") {
            //update in modal-communication-group-customer-group-list-selection(modal for selecting customer grp for communication group-group_list)
            if ($('#modal-communication-group-customer-group-selection').length > 0) {
                //console.log("111", rec.data.deleted_group);
                if (rec.data.hasOwnProperty('deleted_group') && rec.data.deleted_group) {
                    $.each(rec.data.deleted_group, function (index, group) {
                        //console.log("group", group);
                        digibiz.communicationCreateCustomersGroupsList = digibiz.communicationCreateCustomersGroupsList.filter((e) => {
                            return e.id != group.id;
                        })
                        $(`.group-selection-wrapper[data-group-id="${group.id}"]`).remove();
                    })
                }
            }

            if (rec.data.hasOwnProperty('deleted_group') && rec.data.deleted_group) {
                $.each(rec.data.deleted_group, function (index, group) {
                    //console.log("group", group);
                    //in the listing(members)(b4 group created)
                    if ($('#communication-group-customer-members-list').find(`.communication-group-customer-group-member-wrapper[data-id="${group.id}"]`).length > 0) {
                        $('#communication-group-customer-members-list').find(`.communication-group-customer-group-member-wrapper[data-id="${group.id}"]`).remove();
                    }
                    //in the listing(members)(after group creating)//need to check
                    if ($('#communication-group-customer-members-list').find(`.communication-group-member-wrapper[data-group-id="${group.id}"]`).length > 0) {
                        $('#communication-group-customer-members-list').find(`.communication-group-member-wrapper[data-group-id="${rec.data.id}"]`).remove();
                        $('#communication-group-moderator-members-list').find(`.communication-group-moderator-member-wrapper[data-group-id="${rec.data.id}"]`).remove();
                        // getCommunicationGroupDetailPage();
                    }
                })
            }


            if ($('#modal-communication-group-employee-group-selection').length > 0) {
                if (rec.data.hasOwnProperty('deleted_group') && rec.data.deleted_group.length > 0) {
                    $.each(rec.data.deleted_group, function (index, group) {
                        if (group.status.status == "draft" || group.status.status == "deleted" || group.status.status == "pending") {
                            //console.log("22");
                            digibiz.communicationCreateEmployeeGroupsList = digibiz.communicationCreateEmployeeGroupsList.filter((e) => {
                                return e.id != group.id
                            })
                            $(`.group-selection-wrapper[data-group-id="${group.id}"]`).remove();
                            // processCommunicationGroupCreateEmployeeGroupsList(digibiz.communicationCreateEmployeeGroupsList, function () { });
                        }
                    })
                }
            }
            //remove from moderator list in group page
            if (sessionStorage.getItem('group_id')) {
                getCommunicationGroupDetailPage();
            }
            if ($('#communication-group-employee-members-list').length > 0) {
                $.each(rec.data.deleted_group, function (index, group) {
                    if (group.status.status == "draft" || group.status.status == "deleted" || group.status.status == "pending") {
                        if ($('#communication-group-employee-members-list').find(`.communication-group-employee-group-member-wrapper[data-id="${group.id}"]`).length > 0) {
                            $('#communication-group-employee-members-list').find(`.communication-group-employee-group-member-wrapper[data-id="${group.id}"]`).remove();
                        }
                    }
                })
            }
        }

        if ($('body').attr('app') == "collaborator_group_details") {
            //console.log("11")
            //remove from moderator heading list
            if ($('#collaborator-group-moderator-list').find('.collaborator-group-moderator-member-wrapper').length > 0) {
                $('#collaborator-group-moderator-list').find(`.collaborator-group-moderator-member-wrapper[data-id="${rec.data.member_data.member.employee_id}"]`).remove();
            }
            //modal show employees
            if ($('#modal-collaborator-group-business-members').length > 0) {
                $('#modal-collaborator-group-business-members').find(`.contact-profile-container[data-member-id="${rec.data.member_data.id}"]`).parents('.employee-selection-list-container').remove();
            }
        }
    },

    groupCreation: function (rec) {
        if($('body').attr('app') == "employee_group_creation_list") {           
            $(`.employee-group-wrapper[data-group-id="${rec.data.id}"]`).attr('data-created_status',"completed");
            $(`.employee-group-wrapper[data-group-id="${rec.data.id}"]`).find('#activate-employee-group-btn').removeClass('hide');
        } else if($('body').attr('app') == "customer_groups_identifiers_list") {  
            $(`.customer-group-wrapper[data-group-id="${rec.data.id}"]`).attr('data-created_status',"completed");  
        } else if($('body').attr('app') == "collaborator_groups_list") {  
            $(`.collaborator-groups-list-wrapper[data-group-id="${rec.data.id}"]`).attr('data-created_status',"completed");  
        } else if($('body').attr('app') == "communication_groups") {  
            $(`.communication-group-wrapper[data-group-id="${rec.data.id}"]`).attr('data-created_status',"completed");  
        }
    },

    groupCreationProgress: function (rec) {
        if($('body').attr('app') == "employee_group_creation_list") {           
            $(`.employee-group-wrapper[data-group-id="${rec.data.id}"]`).attr('data-created_status',"progress");
            $(`.employee-group-wrapper[data-group-id="${rec.data.id}"]`).find('#activate-employee-group-btn').removeClass('hide');
        } else if($('body').attr('app') == "customer_groups_identifiers_list") {  
            $(`.customer-group-wrapper[data-group-id="${rec.data.id}"]`).attr('data-created_status',"progress");  
        } else if($('body').attr('app') == "collaborator_groups_list") {  
            $(`.collaborator-groups-list-wrapper[data-group-id="${rec.data.id}"]`).attr('data-created_status',"progress");  
        } else if($('body').attr('app') == "communication_groups") {  
            $(`.communication-group-wrapper[data-group-id="${rec.data.id}"]`).attr('data-created_status',"progress");  
        }
    },

    customerIdentifierAdd: function (rec) {
        //console.log("customerIdentifierAdd socket reached", rec);
        //Case:1 update in customer identifiers list page
        if ($('body').attr('app') == "customer_identifiers_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-identifier-tab') == "customer" && rec.data.type == "customer") {
                // var list_data = [];
                // list_data.push(rec.data);
                digibiz.customer_identifiers.splice(0, 0, rec.data);
                processCustomerIdentifiersList(digibiz.customer_identifiers, function () { });
            } else if (sessionStorage.getItem('selected-customer-identifier-tab') == "associate_customer" && rec.data.type == "associate_customer") {
                // var list_data = [];
                // list_data.push(rec.data);
                digibiz.associate_customer_identifiers.splice(0, 0, rec.data);
                processAssociateCustomerIdentifiersList(digibiz.associate_customer_identifiers, function () { });
            } else {
                // 
                primaryCustomerLabelListPage();
            }
        }
        //case: 1 update in new customer creation identifier list tab
        if ($('body').attr('app') == "customer_creation" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-tab') == "identifiers" && rec.data.type == "customer") {
                // var list_data = [];
                // list_data.push(rec.data);
                digibiz.customer_identifiers.splice(0, 0, rec.data);
                processCustomerIdentifiersList(digibiz.customer_identifiers, function () { });
            } else if (sessionStorage.getItem('selected-tab') == "labels" && (rec.data.type == "associate_customer" || rec.data.type == "primary_customer")) {
                // var list_data = [];
                // list_data.push(rec.data);
                digibiz.associate_customer_identifiers.splice(0, 0, rec.data);
                processAssociateCustomerIdentifiersList(digibiz.associate_customer_identifiers, function () { });
            }
        }
        //Case:2 update in customer groups sub-module(in standard tab)
        if ($('body').attr('app') == "customer_groups_identifiers_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.standard_customer_groups_identifiers_list = [];
                standardCustomerGroupsIdentifierListPage();
            }
        }
        //Case:3 update in customer groups sub-module(in standard tab) -> customer groups list page
        if ($('body').attr('app') == "customer_groups_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.groups_list = [];
                getCustomerGroupsListPage();
            }
        }
        //Case:4 update in customer contact-list sub-module 
        if ($('body').attr('app') == "customer_contacts_identifiers_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            digibiz.customer_contacts_identifiers_list = [];
            getCustomerContactsIdentifiersListPage();
        }
        //Case:5 update in customer contact-list sub-module -> contacts items list
        if ($('body').attr('app') == "customer_contacts_items_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            digibiz.contacts_items_list = [];
            getCustomerContactsItemsListPage();
        }
        //Case:6 update in customer creation sub-module(both in active and pending tabs)
        if ($('body').attr('app') == "customer_creation_identifiers_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (rec.data.type == "customer") {
                if (sessionStorage.getItem('selected-customer-tab') == "customer_active") {
                    var list_data = [];
                    list_data.push(rec.data);
                    processCustomerIdentifiersActiveCustomerCreationList(list_data, function () { });
                } else if (sessionStorage.getItem('selected-customer-tab') == "customer_pending") {
                    var list_data = [];
                    list_data.push(rec.data);
                    processCustomerIdentifiersPendingCustomerCreationList(list_data, function () { });
                }
            }
        }
        //Case:6 update in customer access module sub-module(step-1)
        if ($('body').attr('app') == "customer_access_identifiers" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (rec.data.type == "customer") {
                var list_data = [];
                list_data.push(rec.data);
                processCustomerAccessIdentifiersList(list_data, function () { });
            }
        }
        //Case:7 update in customer access module sub-module(step-2)
        if ($('body').attr('app') == "customer_access_identifiers_items" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            digibiz.customer_access_identifier_items_list = [];
            customerAccessIdentifiersItemsPage();
        }
        //Case:8 update in customer group creation page(in the contact-list modal) 
        if ($('body').attr('app') == "customer_groups_details" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if ($('#modal-customer-group-contact-list-selection').length > 0) {
                digibiz.customerGroupsContactsList = [];
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                }
                getCustomerGroupContactList(reqParam)
                    .then((response) => {
                        processCustomerGroupContactsList(response, function () { });
                    })
                    .catch((err) => {
                        //console.log("error in getCustomerGroupContactList socket");
                    })
            }
        }
        //Case:9 update in communication managemnt customer members modal label
        if ($('body').attr('app') == "communication_group_details" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            //check modal is present
            if ($('#modal-communication-group-customer-contact-list-selection').length > 0) {
                if (rec.data.type == "customer") {
                    var getData = {
                        identifier: rec.data
                    };
                    fetch.appendHtml(function () {
                    }, "layouts/template_elements/communication_group_contact_list_customer_identifier", "#communication-group-contact-list-customer-identifier-template", `.communication-group-identifier-based-customer-contact-list-contentbox`, getData);
                } else if (rec.data.type == "associate_customer") {
                    $.each($(`.accordion-contenttt[data-content-type="identifier"]`), function (index, element) {
                        //console.log("elemenr");
                        if ($(element).find('.communication-group-identifier-based-customer-contact-items-list-contentbox').length > 0) {
                            //console.log("lengtg is there");
                            // var getCustomerIdentifierName = $(element).siblings(`.accordion-titleee[data-type=""identifier]`).find('.communication-group-identifier-based-customer-contacts-identifier-name span').text();
                            var accordionitem = $(element).siblings(`.accordion-titleee[data-type="identifier"]`).attr('data-tab');
                            //console.log("accordionitem", accordionitem);
                            $("#" + accordionitem).slideToggle().parent().siblings().find(".accordion-content").slideUp();
                            $(element).siblings(`.accordion-titleee[data-type="identifier"]`).toggleClass("active-title");
                            // $("#" + accordionitem).parent().siblings().find(".accordion-titleee").removeClass("active-title");
                        }
                    })

                }
            }
        }
    },

    customerIdentifierUpdate: function (rec) {
        //console.log("customerIdentifierUpdate socket reached", rec);
        //Case:1 update in customer identifiers list page
        if ($('body').attr('app') == "customer_identifiers_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-identifier-tab') == "customer" && rec.data.type == "customer") {
                $(`.customer-identifier-wrapper[data-id="${rec.data.id}"]`).find('.customer-identifier-name').attr('value', rec.data.identifier);
                $(`.customer-identifier-wrapper[data-id="${rec.data.id}"]`).find('.customer-identifier-name').find('span').text(rec.data.identifier);
                var getIndex = digibiz.customer_identifiers.findIndex((e) => e.id == rec.data.id);
                if (getIndex > -1) {
                    digibiz.customer_identifiers[getIndex].identifier = rec.data.identifier;
                }
            } else if (sessionStorage.getItem('selected-customer-identifier-tab') == "associate_customer" && rec.data.type == "associate_customer") {
                $(`.associate-customer-identifier-wrapper[data-id="${rec.data.id}"]`).find('.associate-customer-identifier-name').attr('value', rec.data.identifier);
                $(`.associate-customer-identifier-wrapper[data-id="${rec.data.id}"]`).find('.associate-customer-identifier-name').find('span').text(rec.data.identifier);
                var getIndex = digibiz.associate_customer_identifiers.findIndex((e) => e.id == rec.data.id);
                if (getIndex > -1) {
                    digibiz.associate_customer_identifiers[getIndex].identifier = rec.data.identifier;
                }
            } else {
                $(`.customer-identifier-wrapper[data-id="${rec.data.id}"]`).find('.customer-identifier-name').attr('value', rec.data.identifier);
                $(`.customer-identifier-wrapper[data-id="${rec.data.id}"]`).find('.customer-identifier-name').find('span').text(rec.data.identifier);
            }
        }
        //case:1(new) update in customer creation identifier tab page list
        if ($('body').attr('app') == "customer_creation" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-tab') == "identifiers" && rec.data.type == "customer") {
                $(`.customer-identifier-wrapper[data-id="${rec.data.id}"]`).find('.customer-identifier-name').attr('value', rec.data.identifier);
                $(`.customer-identifier-wrapper[data-id="${rec.data.id}"]`).find('.customer-identifier-name').find('span').text(rec.data.identifier);
                var getIndex = digibiz.customer_identifiers.findIndex((e) => e.id == rec.data.id);
                if (getIndex > -1) {
                    digibiz.customer_identifiers[getIndex].identifier = rec.data.identifier;
                }
            } else if (sessionStorage.getItem('selected-tab') == "labels" && (rec.data.type == "associate_customer" || rec.data.type == "primary_customer")) {
                $(`.associate-customer-identifier-wrapper[data-id="${rec.data.id}"]`).find('.associate-customer-identifier-name').attr('value', rec.data.identifier);
                $(`.associate-customer-identifier-wrapper[data-id="${rec.data.id}"]`).find('.associate-customer-identifier-name').find('span').text(rec.data.identifier);
                var getIndex = digibiz.associate_customer_identifiers.findIndex((e) => e.id == rec.data.id);
                if (getIndex > -1) {
                    digibiz.associate_customer_identifiers[getIndex].identifier = rec.data.identifier;
                }
            }
        }
        //Case:2 update in customer contact-list sub-module 
        if ($('body').attr('app') == "customer_contacts_identifiers_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            $(`.customer-contacts-identifier-wrapper[data-id="${rec.data.id}"]`).find('.customer-contacts-identifier-name').find('span').text(rec.data.identifier);
        }
        //Case:3 update in customer groups sub-module(in standard tab)
        if ($('body').attr('app') == "customer_groups_identifiers_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            $(`.customer-groups-identifier-wrapper[data-id="${rec.data.id}"]`).find('.customer-groups-identifier-name').find('span').text(rec.data.identifier);
            //update groups
            if (rec.data.hasOwnProperty('updated_groups') && rec.data.updated_groups) {
                //console.log("gottt")
                $.each(rec.data.updated_groups, function (index, group) {
                    var getName = group.name;
                    $(`.customer-group-wrapper[data-id="${group.id}"]`).find(`.customer-group-name span`).text(getName);
                })
            }
        }
        //Case:4 update in customer creation sub-module(both in active and pending tabs)
        if ($('body').attr('app') == "customer_creation_identifiers_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_active") {
                $(`.create-customer-identifier-wrapper[data-id="${rec.data.id}"]`).find('.customer-identifier-name').find('span').text(rec.data.identifier);
            } else if (sessionStorage.getItem('selected-customer-tab') == "customer_pending") {
                $(`.create-customer-identifier-wrapper[data-id="${rec.data.id}"]`).find('.customer-identifier-name').find('span').text(rec.data.identifier);
            }
        }
        //Case:5 update in customer access module sub-module(step-1)
        if ($('body').attr('app') == "customer_access_identifiers" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            $(`.customer-access-identifier-wrapper[data-id="${rec.data.id}"]`).find('.customer-contacts-identifier-name').find('span').text(rec.data.identifier);
        }
        //Case:6 update in customer access module sub-module(step-2)
        if ($('body').attr('app') == "customer_access_identifiers_items" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            digibiz.customer_access_identifier_items_list = [];
            customerAccessIdentifiersItemsPage();
        }
        if ($('body').attr('app') == "customer_access_identifiers_item_page" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if ($('#customer-contact-add-access-for-customer-contact-item-selection-modal').length > 0) {
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "customer",
                    list_by: "primary_customer_identifier",
                    primary_customer_identifier_id: sessionStorage.getItem('identifier_id')
                }
                listContactsList(reqParam)
                    .then((response) => {
                        digibiz.customer_contact_add_access_customer_contact_item_selection = [];
                        digibiz.customer_contact_add_access_customer_contact_item_selection = response;
                        getCustomerContactAddAccessForCustomerContact(digibiz.customer_contact_add_access_customer_contact_item_selection, function () { })
                    })
                    .catch((err) => {
                        //console.log("err", err)
                    })
            }
        }
        //Case:7 update in customer contact list module-contacts list page (step-3)
        if ($('body').attr('app') == "customer_contact_list") {
            var gettext = $(`.customer-contact-wrapper[data-identifier-id="${rec.data.id}"]`).find('.associate-customer-info').find('span').text();
            var finalText = gettext.split('|')[1];
            $(`.customer-contact-wrapper[data-identifier-id="${rec.data.id}"]`).find('.associate-customer-info').find('span').text(`${rec.data.identifier}|${finalText}`);
        }
        //Case:8 update in customer group creation page(in the contact-list modal) 
        if ($('body').attr('app') == "customer_groups_details" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if ($('#modal-customer-group-contact-list-selection').length > 0) {
                digibiz.customerGroupsContactsList = [];
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                }
                getCustomerGroupContactList(reqParam)
                    .then((response) => {
                        processCustomerGroupContactsList(response, function () { });
                    })
                    .catch((err) => {
                        //console.log("error in getCustomerGroupContactList socket");
                    })
            }
            if (rec.data.hasOwnProperty('updated_groups') && rec.data.updated_groups) {
                //console.log("gottt")
                $.each(rec.data.updated_groups, function (index, group) {
                    //console.log("group")
                    //in the listing(members)(b4 group created)
                    if ($('#customer-group-members-list').find(`.customer-group-member-wrapper[data-id="${group.id}"]`).length > 0) {
                        var getName = group.name;
                        $('#customer-group-members-list').find(`.customer-group-member-wrapper[data-id="${group.id}"]`).find('.filemanager-file-wrapper span').text(getName);
                    }
                    //in the listing(members)(after group creating)
                    if ($('#customer-group-members-list').find(`.custom-customer-group-member-wrapper[data-group-id="${group.id}"]`).length > 0) {
                        var getName = group.name;
                        $('#customer-group-members-list').find(`.custom-customer-group-member-wrapper[data-group-id="${group.id}"]`).find('.filemanager-file-wrapper span').text(getName);
                    }
                    if ($('#modal-customer-group-groups-list-selection').length > 0) {
                        $(`.customer-group-custom-group-wrapper[data-id="${group.id}"]`).find(`.customer-custom-group-name span`).text(group.name);
                    }
                })
            }

        }
        //Case:9 update in employee creation sub-module(contact-acceess)
        if ($('#employee-contact-add-access-for-customer-contact-identifier-selection-modal').length > 0) {
            $('#select-customer-identifier-for-role-assignment').find(`option[data-id="${rec.data.id}"]`).attr('value', rec.data.identifier);
            $('#select-customer-identifier-for-role-assignment').find(`option[data-id="${rec.data.id}"]`).text(rec.data.identifier);
        }
        //Case:10 update in customer contact-list sub-module -> contacts items list
        if ($('body').attr('app') == "customer_contacts_items_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            //console.log("12345")
            digibiz.contacts_items_list = [];
            getCustomerContactsItemsListPage();
        }
        //Case:11 update in customer groups module(in standard tab) -> customer groups list page
        if ($('body').attr('app') == "customer_groups_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.groups_list = [];
                getCustomerGroupsListPage();
            }
        }
        //Case:12 update in communication group contact list customer  pop-up
        if ($('body').attr('app') == "communication_group_details" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            //check modal is present-contact list
            if ($('#modal-communication-group-customer-contact-list-selection').length > 0) {
                if (rec.data.type == "customer") {
                    $(`.accordion-titleee[data-tab="${rec.data.id}"][data-type="identifier"]`).find('.communication-group-identifier-based-customer-contacts-identifier-name span').text(rec.data.identifier);//updates only customer identifier
                    if ($(`.accordion-contenttt[id="${rec.data.id}"][data-content-type="identifier"]`).find('.communication-groups-identifier-based-customer-contacts-item-wrapper').length > 0) {//customer identifier tab is open, so update contact items also
                        $.each($(`.accordion-contenttt[id="${rec.data.id}"][data-content-type="identifier"]`).find('.communication-groups-identifier-based-customer-contacts-item-wrapper'), function (index, element) {
                            var gettext = $(element).find('.accordion-titleee .contact-item-name').find('span').text();
                            var finalText;
                            // var check = gettext.includes('|')
                            // if (check == "true" || check == false) {
                            //     finalText = "Primary Customers";//getting last part of the contact item
                            //     $(element).find('.contact-item-name').find('span').text(`${rec.data.identifier} ${finalText}`);
                            // } else {
                            finalText = gettext.split('|')[1];//getting last part of the contact item
                            $(element).find('.contact-item-name').find('span').text(`${rec.data.identifier}|${finalText}`);
                            // }
                        })
                    }
                } else if (rec.data.type == "associate_customer") {
                    $.each($(`.accordion-titleee[data-associate-customer-identifier-id="${rec.data.id}"][data-type="contact_item"]`), function (index, element) {
                        var gettext = $(element).find('.contact-item-name').find('span').text();
                        var finalText = gettext.split('|')[0];//getting first part of the contact item
                        $(element).find('.contact-item-name').find('span').text(`${finalText}_${rec.data.identifier}`);
                        var getAssociateCustomersElements = $(element).siblings(`.accordion-contenttt[id="${$(element).attr('data-tab')}"]`).find('.communication-groups-identifier-based-customer-contact-wrapper');
                        $.each(getAssociateCustomersElements, function (index, elem) {
                            var getAssociateCustomerInfo = $(elem).find('.associate-customer-info span').text();
                            var getParentCustomerName = getAssociateCustomerInfo.split('|')[1];
                            $(elem).find('.associate-customer-info span').text(`${rec.data.identifier}|${getParentCustomerName}`);
                        })
                    })
                } else {

                }
            }
            //check modal is present-group list
            if ($('#modal-communication-group-customer-group-selection').length > 0) {
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    type: "customer",
                    list_by: "draft_active_customer_groups",
                    business_id: sessionStorage.getItem('business_id')
                }
                groupsList(reqParam)
                    .then((response) => {
                        digibiz.communicationCreateCustomersGroupsList = [];
                        processCommunicationGroupCreateCustomerGroupsList(response, function () {
                            setTimeout(function () {
                                // listenForSurveyViewersUserScrollEvent($(".modal-popup-content"));
                            }, 0);
                        });
                    })
                    .catch((err) => {
                        //console.log("error in socket");
                    })
            }
            //update group names in the customer members list heading
            if ($('#communication-group-customer-members-list').length > 0) {
                if (rec.data.hasOwnProperty('updated_groups') && rec.data.updated_groups) {
                    //console.log("gottt")
                    $.each(rec.data.updated_groups, function (index, group) {
                        //console.log("group")
                        //in the customer members listing(members)(b4 group created)
                        if ($('#communication-group-customer-members-list').find(`.communication-group-customer-group-member-wrapper[data-id="${group.id}"]`).length > 0) {
                            var getName = group.name;
                            $('#communication-group-customer-members-list').find(`.communication-group-customer-group-member-wrapper[data-id="${group.id}"]`).find('.filemanager-file-wrapper span').text(getName);
                        }
                        //in the listing(members)(after group creating)
                        if ($('#communication-group-customer-members-list').find(`.communication-group-member-wrapper[data-group-id="${group.id}"]`).length > 0) {
                            var getName = group.name;
                            $('#communication-group-customer-members-list').find(`.communication-group-member-wrapper[data-group-id="${group.id}"]`).find('.filemanager-file-wrapper span').text(getName);
                        }
                    })
                }
            }
        }
        if ($('body').attr("app") == "customer_business_list") {
            digibiz.customer_business_list = [];
            // customerBusinessListPage();
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "customer"
            }
            businessList(reqParam)
                .then((response) => {
                    processCustomerBusinessList(response, function () {
                        removeLoader();
                    });
                })
                .catch((err) => {
                })
        }
    },

    customerIdentifierDelete: function (rec) {
        //console.log("customerIdentifierDelete socket reached applied check", rec);
        //Case:1 delete from the identifiers module
        if ($('body').attr('app') == "customer_identifiers_list") {
            if (sessionStorage.getItem('selected-customer-identifier-tab') == "customer" && rec.data.type == "customer") {
                digibiz.customer_identifiers = digibiz.customer_identifiers.filter((p) => {
                    return p.id != rec.data.id;
                });
                //console.log("after filter", digibiz.customer_identifiers);
                processCustomerIdentifiersList(digibiz.customer_identifiers, function () { });
            } else if (sessionStorage.getItem('selected-customer-identifier-tab') == "associate_customer" && rec.data.type == "associate_customer") {
                digibiz.associate_customer_identifiers = digibiz.associate_customer_identifiers.filter((e) => {
                    return e.id != rec.data.id;
                });
                //console.log("after filter", digibiz.associate_customer_identifiers);
                processAssociateCustomerIdentifiersList(digibiz.associate_customer_identifiers, function () { });
            }
        }
        //case:1(new) delete from the new customer creation module identifiers list tab
        if ($('body').attr('app') == "customer_creation") {
            if (sessionStorage.getItem('selected-tab') == "identifiers" && rec.data.type == "customer") {
                digibiz.customer_identifiers = digibiz.customer_identifiers.filter((p) => {
                    return p.id != rec.data.id;
                });
                //console.log("after filter", digibiz.customer_identifiers);
                processCustomerIdentifiersList(digibiz.customer_identifiers, function () { });
            } else if (sessionStorage.getItem('selected-tab') == "labels" && (rec.data.type == "associate_customer" || rec.data.type == "primary_customer")) {
                digibiz.associate_customer_identifiers = digibiz.associate_customer_identifiers.filter((e) => {
                    return e.id != rec.data.id;
                });
                //console.log("after filter", digibiz.associate_customer_identifiers);
                processAssociateCustomerIdentifiersList(digibiz.associate_customer_identifiers, function () { });
            }
        }
        //Case:2 update in customer creation module active/pending identifiers list(step-1)
        if ($('body').attr('app') == "customer_creation_identifiers_list") {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_active") {
                digibiz.customer_identifiers_active_customers_list = digibiz.customer_identifiers_active_customers_list.filter((p) => {
                    return p.id != rec.data.id;
                });
                //console.log("after filter", digibiz.customer_identifiers_active_customers_list)
                processCustomerIdentifiersActiveCustomerCreationList(digibiz.customer_identifiers_active_customers_list, function () { });
            } else if (sessionStorage.getItem('selected-customer-tab') == "customer_pending") {
                digibiz.customer_identifiers_pending_customers_list = digibiz.customer_identifiers_pending_customers_list.filter((p) => {
                    return p.id != rec.data.id;
                });
                processCustomerIdentifiersPendingCustomerCreationList(digibiz.customer_identifiers_pending_customers_list, function () { });
            }
        }
        //Case:3 update in customer creation module active tab identifier click page(step-2)
        if ($('body').attr('app') == "customer_creation_active_list") {
            digibiz.customer_creation_active_list = [];
            activeCustomerCreationListPage();
        }
        //Case:4 update in customer creation module pending tab identifier click page(step-2)        
        //Case:4 update in pending customer creation list in the notification sender side
        if ($('body').attr("app") == "customer_creation_pending_list") {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_pending") {
                digibiz.customer_creation_pending_list = [];
                pendingCustomerCreationListPage();
            }
        }
        if ($('body').attr("app") == "customer_notification_details_page" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            digibiz.customer_notification_details_list = [];
            getCustomerNotificationDetailsPage();
        }
        //Case:5 update in customer contact list module page(step-1) identifier page
        if ($('body').attr('app') == "customer_contacts_identifiers_list") {
            digibiz.customer_contacts_identifiers_list = digibiz.customer_contacts_identifiers_list.filter((p) => {
                return p.id != rec.data.id;
            });
            //console.log("after filter", digibiz.customer_contacts_identifiers_list)
            processCustomerContactsIdentifiersList(digibiz.customer_contacts_identifiers_list, function () { });
        }
        //Case:6 update in customer contact list module-contacts items list page (step-2)
        if ($('body').attr('app') == "customer_contacts_items_list") {
            digibiz.contacts_items_list = [];
            getCustomerContactsItemsListPage()
        }
        //Case:7 update in customer contact list module-contacts list page (step-3)
        if ($('body').attr('app') == "customer_contact_list") {
            digibiz.contacts_list = [];
            getCustomerContactListPage()
        }
        //Case:8 update in customer groups module
        if ($('body').attr('app') == "customer_groups_identifiers_list") {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.standard_customer_groups_identifiers_list = digibiz.standard_customer_groups_identifiers_list.filter((p) => {
                    // return p.id != rec.data.id && p.type == "customer";
                    return p.id != rec.data.id
                });
                processStandardCustomerGroupsIdentifiersList(digibiz.standard_customer_groups_identifiers_list, function () { });
            }
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "custom") {
                digibiz.custom_groups_list = [];
                customCustomerGroupsListPage();
            }
        }
        //Case:9 update in customer groups module(in standard tab) -> customer groups list page
        if ($('body').attr('app') == "customer_groups_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.groups_list = [];
                getCustomerGroupsListPage();
            }
        }
        //Case:10 update in customer access module sub-module(step-1)
        if ($('body').attr('app') == "customer_access_identifiers" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            digibiz.customer_access_identifiers_list = digibiz.customer_access_identifiers_list.filter((p) => {
                return p.id != rec.data.id && p.type == "customer";
            });
            processCustomerAccessIdentifiersList(digibiz.customer_access_identifiers_list, function () { });
        }
        //Case:11 update in customer access module sub-module(step-2)
        if ($('body').attr('app') == "customer_access_identifiers_items" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            digibiz.customer_access_identifier_items_list = [];
            customerAccessIdentifiersItemsPage();
        }
        if ($('body').attr('app') == "customer_access_identifiers_item_page" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if ($('#customer-contact-add-access-for-customer-contact-item-selection-modal').length > 0) {
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "customer",
                    list_by: "primary_customer_identifier",
                    primary_customer_identifier_id: sessionStorage.getItem('identifier_id')
                }
                listContactsList(reqParam)
                    .then((response) => {
                        digibiz.customer_contact_add_access_customer_contact_item_selection = [];
                        digibiz.customer_contact_add_access_customer_contact_item_selection = response;
                        getCustomerContactAddAccessForCustomerContact(digibiz.customer_contact_add_access_customer_contact_item_selection, function () { })
                    })
                    .catch((err) => {
                        //console.log("err", err)
                    })
            }
        }
        //Case:12 update in customer group creation page(in the contact-list modal) 
        if ($('body').attr('app') == "customer_groups_details" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if ($('#modal-customer-group-contact-list-selection').length > 0) {
                digibiz.customerGroupsContactsList = [];
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                }
                getCustomerGroupContactList(reqParam)
                    .then((response) => {
                        processCustomerGroupContactsList(response, function () { });
                    })
                    .catch((err) => {
                        //console.log("error in getCustomerGroupContactList socket");
                    })
            }
            if (sessionStorage.getItem('group_from') == "group_list") {
                if (rec.data.hasOwnProperty('customer_groups') && rec.data.customer_groups) {
                    $.each(rec.data.customer_groups, function (index, group) {
                        //console.log("group", group);
                        $('#customer-group-members-list').find(`.customer-group-member-wrapper[data-id="${group.id}"]`).remove();
                        $('#customer-group-members-list').find(`.custom-customer-group-member-wrapper[data-group-id="${group.id}"]`).remove();
                    })
                }
            }
            if (rec.data.hasOwnProperty('customer_groups') && rec.data.customer_groups) {
                $.each(rec.data.customer_groups, function (index, group) {
                    //console.log("group", group);
                    if (sessionStorage.getItem('group_id') == group.id) {
                        Materialize.toast(`Group Deleted`, 3000, 'round success-alert');
                        sessionStorage.removeItem('group_id');
                        sessionStorage.removeItem('group_from')
                        $('.custom-modal-popup').remove();
                        if (sessionStorage.getItem('group_type') == "custom") {
                            location.hash = `customer/groups/identifiers/list`;
                            sessionStorage.removeItem('group_type');
                        } else {
                            location.hash = `customer/groups/list`;
                            sessionStorage.removeItem('group_type');
                        }
                    }
                })
            }
        }
        //Case:13 update in communication group contact list customer  pop-up
        if ($('body').attr('app') == "communication_group_details" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (rec.data.hasOwnProperty('customer_groups') && rec.data.customer_groups) {
                $.each(rec.data.customer_groups, function (index, group) {
                    //console.log("group", group);
                    if (sessionStorage.getItem('group_id') == group.id) {
                        Materialize.toast(`Group Deleted`, 3000, 'round success-alert');
                        sessionStorage.removeItem('group_id');
                        $('.custom-modal-popup').remove();
                        location.hash = `communication/groups`;
                    }
                    //remove as member if present(after group creation)(if communication group is of group list)
                    //remove customer grp
                    if (group.status.status == "deleted") {
                        //delete customer group from customer members list(after group creation)
                        $(`.communication-group-member-wrapper[data-group-id="${group.id}"]`).remove();
                        //delete customer group from customer members list(b4 group creation)
                        $(`.communication-group-customer-group-member-wrapper[data-id="${group.id}"]`).remove();
                        //delete moderators from moderators list(after group craetion)
                        $(`.communication-group-moderator-member-wrapper[data-group-id="${group.id}"]`).remove();
                    }
                })
            }
            //remove from moderator heading listing(b4 group creation)
            if (rec.data.type == "customer") {
                $(`.communication-group-moderator-member-wrapper-not-saved[data-identifier-id="${rec.data.id}"]`).remove();
                $(`.communication-group-moderator-member-wrapper-not-saved[data-parent-customer-identifier-id="${rec.data.id}"]`).remove();
            } else if (rec.data.type == "associate_customer") {
                $(`.communication-group-moderator-member-wrapper-not-saved[data-identifier-id="${rec.data.id}"]`).remove();
            }

            //remove from moderator heading listing(after group creation)
            if (rec.data.type == "customer") {
                $(`.communication-group-moderator-member-wrapper[data-identifier-id="${rec.data.id}"][data-type="customer"]`).remove();
                $(`.communication-group-moderator-member-wrapper[data-parent-customer-identifier-id="${rec.data.id}"][data-type="associate_customer"]`).remove();
            } else if (rec.data.type == "associate_customer") {
                $(`.communication-group-moderator-member-wrapper[data-identifier-id="${rec.data.id}"][data-type="associate_customer"]`).remove();
            }

            //remove from members heading listing(b4 group creation)
            if (rec.data.type == "customer") {
                $(`.communication-group-customer-member-wrapper[data-identifier-id="${rec.data.id}"]`).remove();
                $(`.communication-group-customer-member-wrapper[data-parent-customer-identifier-id="${rec.data.id}"]`).remove();
            } else if (rec.data.type == "associate_customer") {
                $(`.communication-group-customer-member-wrapper[data-identifier-id="${rec.data.id}"]`).remove();
            }

            //remove from members heading listing(after group creation)
            if (rec.data.type == "customer") {
                $(`.communication-group-member-wrapper[data-identifier-id="${rec.data.id}"]`).remove();
                $(`.communication-group-member-wrapper[data-parent-customer-identifier-id="${rec.data.id}"]`).remove();
            } else if (rec.data.type == "associate_customer") {
                $(`.communication-group-member-wrapper[data-identifier-id="${rec.data.id}"]`).remove();
            }

            //check moderator add modal
            if ($('#modal-communication-group-moderator-selection').length > 0) {
                if (rec.data.type == "customer") {
                    $('#modal-communication-group-moderator-selection').find(`.contact-profile-container[data-identifier-id="${rec.data.id}"][data-customer-type="customer"]`).parents('.employee-selection-list-container').remove();
                    $('#modal-communication-group-moderator-selection').find(`.contact-profile-container[data-parent-customer-identifier-id="${rec.data.id}"][data-customer-type="associate_customer"]`).parents('.employee-selection-list-container').remove();
                } else if (rec.data.type == "associate_customer") {
                    $('#modal-communication-group-moderator-selection').find(`.contact-profile-container[data-identifier-id="${rec.data.id}"][data-customer-type="associate_customer"]`).parents('.employee-selection-list-container').remove();
                }
            }


            //check modal is present
            if ($('#modal-communication-group-customer-contact-list-selection').length > 0) {
                if (rec.data.type == "customer") {
                    $(`.accordion-titleee[data-tab="${rec.data.id}"][data-type="identifier"]`).parent('.communication-group-identifier-based-customer-contacts-identifier-wrapper').remove();
                } else if (rec.data.type == "associate_customer") {
                    $(`.accordion-titleee[data-associate-customer-identifier-id="${rec.data.id}"][data-type="contact_item"]`).parent('.communication-groups-identifier-based-customer-contacts-item-wrapper').remove();
                }
            }
            //update in modal-communication-group-customer-group-list-selection(modal for selecting customer grp for communication group-group_list)
            if ($('#modal-communication-group-customer-group-selection').length > 0) {
                //console.log("111", rec.data.customer_groups);
                if (rec.data.hasOwnProperty('customer_groups') && rec.data.customer_groups) {
                    $.each(rec.data.customer_groups, function (index, group) {
                        //console.log("group", group);
                        digibiz.communicationCreateCustomersGroupsList = digibiz.communicationCreateCustomersGroupsList.filter((e) => {
                            return e.id != group.id;
                        })
                        $(`.group-selection-wrapper[data-group-id="${group.id}"]`).remove();
                    })
                }
            }
        }
        //Case:14 customer create page
        if ($('body').attr('app') == "customer_create") {
            $(`.customer-associate-customer-assignment-box[data-identifier-id="${rec.data.id}"]`).remove();
            Materialize.toast(`Associate Customer Identifier Deleted!`, 3000, 'round error-alert');
        }
        //Case:17 update in pending customer creation list in the notification sender side
        if ($('body').attr("app") == "customer_creation_pending_list" && sessionStorage.getItem('identifier_id') == rec.data.id) {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_pending") {
                digibiz.customer_creation_pending_list = [];
                pendingCustomerCreationListPage();
            }
        }
        if ($('body').attr("app") == "customer_notification_details_page" && sessionStorage.getItem('identifier_id') == rec.data.id) {
            digibiz.customer_notification_details_list = [];
            getCustomerNotificationDetailsPage();
        }
    },

    customerIdentifierItemUpdate: function (rec) {
        //console.log("customerIdentifierItemUpdate rec", rec);
        if ($('body').attr('app') == "communication_group_details") {
            if ($('#modal-communication-group-customer-contact-list-selection').length > 0) {
                $('#modal-communication-group-customer-contact-list-selection').find(`.accordion-titleee[data-tab="${rec.data.id}"]`).find(`.contact-item-name span`).text(rec.data.name);
            }
        }
        if ($('body').attr('app') == "employee_create") {
            if ($('#employee-contact-add-access-for-customer-contact-identifier-item-selection-modal').length > 0) {
                $('#employee-contact-add-access-for-customer-contact-identifier-item-selection-modal').find(`.customer-identifier-item-wrapper[data-id="${rec.data.id}"]`).find(`.contact-item-name span`).text(rec.data.name);
            }
        }

    },

    customerAdd: function (rec) {
        //console.log("customerAdd socket reached", rec);
        //Case:1 update in active/pending customer creation list in the notification sender side
        if ($('body').attr("app") == "customer_creation_pending_list") {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_pending") {
                digibiz.customer_creation_pending_list = [];
                pendingCustomerCreationListPage();
            }
        }
        if ($('body').attr("app") == "customer_creation_active_list") {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_active") {
                digibiz.customer_creation_active_list = [];
                activeCustomerCreationListPage();
            }
        }
        //case:2 update in modal-communication-group-customer-contact-list-selection(modal for selecting customers for communication group-contact_list)
        if ($('#modal-communication-group-customer-contact-list-selection').length > 0) {
            //add in global variable and process
            // var getFirstArray = digibiz.communicationGroupsCustomerContactsList.find(e => e.id == rec.data.identifier_id);
            // if(getFirstArray.hasOwnProperty('contactItems') && getFirstArray.contactItems && getFirstArray.contactItems.length > 0) {
            //     var getSecondArray = getFirstArray.contactItems.find(p => p.data.length == "1" || p.data.length == 1);
            //     if(getSecondArray.hasOwnProperty('customerData') && getSecondArray.customerData) {
            //         getSecondArray.customerData.push(rec.data);
            //     }
            // }
            // digibiz.communicationGroupsCustomerContactsList = digibiz.communicationGroupsCustomerContactsList.map(e => {
            //     if (e.id == rec.data.identifier_id) {
            //         if (e.hasOwnProperty('contactItems') && e.contactItems && e.contactItems.length > 0) {
            //             e.contactItems = e.contactItems.map(p => {
            //                 if (p.data.length == 1 || p.data.length == "1") {
            //                     if (p.hasOwnProperty('customerData') && p.customerData) {
            //                         p.customerData.push(rec.data);
            //                     }
            //                 }
            //                 return p
            //             })
            //         }
            //     }
            //     return e;
            // })
            // processCommunicationGroupCustomerContactsList(digibiz.communicationGroupsCustomerContactsList, function () { });
        }
        //Case:12 update in customer group creation page(in the contact-list modal) 
        if ($('body').attr('app') == "customer_groups_details" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if ($('#modal-customer-group-contact-list-selection').length > 0) {
                digibiz.customerGroupsContactsList = digibiz.customerGroupsContactsList.map(e => {
                    if (e.id == rec.data.identifier_id) {
                        if (e.hasOwnProperty('contactItems') && e.contactItems && e.contactItems.length > 0) {
                            e.contactItems = e.contactItems.map(p => {
                                if (p.data.length == 1 || p.data.length == "1") {
                                    if (p.hasOwnProperty('customerData') && p.customerData) {
                                        p.customerData.push(rec.data);
                                    }
                                }
                                return p
                            })
                        }
                    }
                    return e;
                })
                processCustomerGroupContactsList(digibiz.customerGroupsContactsList, function () { });
            } else if ($('#modal-customer-group-groups-list-selection').length > 0) {
                //get all std groups
                digibiz.customerGroupCustomGroupsList = [];
                var reqParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "customer",
                    list_by: "draft_active_standard_customer_groups"
                }
                groupsList(reqParams)
                    .then((response) => {
                        processCustomerGroupCustomGroupList(response, function () { });
                    })
                    .catch((err) => {
                        //console.log("error in customers std group");
                    })
            }
        }
        if ($('body').attr("app") == "digibiz_notifications") {
            digibiz.digibiz_notifications = [];
            getDigibizNotificationsPage();
        }
        if (sessionStorage.getItem('digibiz_role') == "customer") {
            if (sessionStorage.getItem('account_id') == rec.data.account_id) {
                customerBusinessListHelperMethod();
                associateCustomerModuleListHelperMethod();
            }
        }
    },
    customerUpdate: function (rec) {
        //console.log("customerUpdate socket reached", rec);
        //Case:1 update in pending/active customer list in the notification sender side
        if ($('body').attr("app") == "customer_creation_pending_list") {
            // if (sessionStorage.getItem('selected-customer-tab') == "customer_pending") {
            digibiz.customer_creation_pending_list = [];
            pendingCustomerCreationListPage();
            // }
        }
        if ($('body').attr('app') == "customer_creation_active_list") {
            // if (sessionStorage.getItem('selected-customer-tab') == "customer_active") {
            digibiz.customer_creation_active_list = [];
            activeCustomerCreationListPage();
            // }
        }
        //Case:2 update in customer groups sub-module(in standard tab)
        if ($('body').attr('app') == "customer_groups_identifiers_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.standard_customer_groups_identifiers_list = [];
                standardCustomerGroupsIdentifierListPage();
            }
        }
        //Case:3 update in customer groups sub-module(in standard tab) -> customer groups list page
        if ($('body').attr('app') == "customer_groups_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.groups_list = [];
                getCustomerGroupsListPage();
            }
        }
        //Case:4 update in contact-list sub-module
        if ($('body').attr('app') == "customer_contact_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            digibiz.contacts_list = [];
            getCustomerContactListPage();
        }
        //case:5 update in communication managemnt customer members modal label
        if ($('body').attr('app') == "communication_group_details" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            //check modal is present
            if ($('#modal-communication-group-customer-contact-list-selection').length > 0) {
                //check if that customer is present in the modal
                if ($('#modal-communication-group-customer-contact-list-selection').find(`.communication-groups-identifier-based-customer-contact-wrapper[data-id="${rec.data.id}"]`).length > 0) {
                    var getName;
                    if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                        getName = rec.data.display_name;
                    } else {
                        getName = `${rec.data.name.first} ${rec.data.name.last}`;
                    }
                    $('#modal-communication-group-customer-contact-list-selection').find(`.communication-groups-identifier-based-customer-contact-wrapper[data-id="${rec.data.id}"]`).find('.customer-contact-name span').text(getName);
                    $('#modal-communication-group-customer-contact-list-selection').find(`.communication-groups-identifier-based-customer-contact-wrapper[data-id="${rec.data.id}"]`).find('.customer-label').find('span').text(`Label: ${rec.data.label}`);
                } else {//not present customer so add
                    if (rec.data.status.status == "active") {//check if customer is active
                        var getData = {
                            contact: rec.data
                        };
                        //console.log("not present customer so add", getData);
                        fetch.appendHtml(function () {
                        }, "layouts/template_elements/communication_group_contact_list_customer_contact", "#communication-group-contact-list-customer-contact-template", `.accordion-contenttt[id="${rec.data.customer_contact_item_id}"][data-content-type="contact_item"]`, getData);
                        // digibiz.communicationGroupsCustomerContactsList = digibiz.communicationGroupsCustomerContactsList.map(e => {
                        //     if (e.id == rec.data.identifier_id) {
                        //         if (e.hasOwnProperty('contactItems') && e.contactItems && e.contactItems.length > 0) {
                        //             e.contactItems = e.contactItems.map(p => {
                        //                 if (p.data.length == 1 || p.data.length == "1") {
                        //                     if (p.hasOwnProperty('customerData') && p.customerData) {
                        //                         p.customerData.push(rec.data);
                        //                     }
                        //                 }
                        //                 return p
                        //             })
                        //         }
                        //     }
                        //     return e;
                        // })
                        // processCommunicationGroupCustomerContactsList(digibiz.communicationGroupsCustomerContactsList, function () { });
                    }
                }

                if ($('#modal-communication-group-customer-contact-list-selection').find(`.communication-groups-identifier-based-customer-contact-wrapper[data-parent-customer-id="${rec.data.id}"]`).length > 0) {
                    var getName;
                    if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                        getName = rec.data.display_name;
                    } else {
                        getName = `${rec.data.name.first} ${rec.data.name.last}`;
                    }
                    var getAssociateCustomerInfo = $('#modal-communication-group-customer-contact-list-selection').find(`.communication-groups-identifier-based-customer-contact-wrapper[data-parent-customer-id="${rec.data.id}"]`).find('.associate-customer-info span').text();
                    var getAssociateCustomerIdentifier = getAssociateCustomerInfo.split('-')[0];
                    $('#modal-communication-group-customer-contact-list-selection').find(`.communication-groups-identifier-based-customer-contact-wrapper[data-parent-customer-id="${rec.data.id}"]`).find('.associate-customer-info span').text(`${getAssociateCustomerIdentifier} - ${getName}`);
                }
            }
            if ($('#modal-communication-group-customer-group-selection').length > 0) {
                //console.log("got modal");
                if (rec.data.hasOwnProperty('customer_groups') && rec.data.customer_groups && rec.data.customer_groups.length > 0) {
                    //console.log("length is present");
                    var getGroups = rec.data.customer_groups;
                    //console.log("getGroups", getGroups);
                    $.each(getGroups, function (index, group) {
                        //console.log("group", group);
                        //check if this group is already present in the modal
                        if ($(`.group-selection-wrapper[data-group-id="${group.id}"][data-group-type="customer"]`).length > 0) {
                            //console.log("123");
                            //console.log("Group already presetn");
                        } else {//add it to the modal, not present
                            if (group.status.status == "draft") {//check if group is draft
                                if (group.hasOwnProperty('group_image') && group.group_image) {
                                    if (group.group_image.hasOwnProperty('thumbnail') && group.group_image.thumbnail) {
                                        var avtarUrl = `${api.get_group_image}?device_id=${crossplat.device.uuid}&id=${group.id}&image_id=${group.group_image.thumbnail}`;
                                        group.group_image['avtarUrl'] = avtarUrl;
                                        group['imageLetter'] = group.name.charAt(0);
                                    } else {
                                        group['imageLetter'] = group.name.charAt(0);
                                    }
                                } else {
                                    group['imageLetter'] = group.name.charAt(0);
                                }
                                var getData = {
                                    group_data: group
                                };
                                //console.log("not present group so add", getData);
                                fetch.appendHtml(function () {
                                }, "layouts/template_elements/communication_group_group_list_customer_group_add", "#communication-group-group-list-customer-group-add-template", `.customer-group-list-selection-main-container`, getData);
                            }
                        }
                    })
                }
            }
            //in the listing(members)(b4 group created)
            if ($('#communication-group-customer-members-list').find(`.communication-group-customer-member-wrapper[data-id="${rec.data.id}"]`).length > 0) {
                var getName;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    getName = rec.data.display_name;
                } else {
                    getName = `${rec.data.name.fisrt} ${rec.data.name.last}`;
                }
                $('#communication-group-customer-members-list').find(`.communication-group-customer-member-wrapper[data-id="${rec.data.id}"]`).find('.filemanager-file-wrapper span').text(getName);
            }
            //in the listing(group moderator)(b4 group created)
            if ($('#communication-group-moderator-members-list').find(`.communication-group-moderator-member-wrapper-not-saved[data-id="${rec.data.id}"]`).length > 0) {
                var getName;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    getName = rec.data.display_name;
                } else {
                    getName = `${rec.data.name.fisrt} ${rec.data.name.last}`;
                }
                $('#communication-group-moderator-members-list').find(`.communication-group-moderator-member-wrapper-not-saved[data-id="${rec.data.id}"]`).find('.filemanager-file-wrapper span').text(getName);
            }
            //in the listing(members)(after group creating)
            if ($('#communication-group-customer-members-list').find(`.communication-group-member-wrapper[data-customer-id="${rec.data.id}"][data-type="customer"]`).length > 0) {
                var getName;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    getName = rec.data.display_name;
                } else {
                    getName = `${rec.data.name.fisrt} ${rec.data.name.last}`;
                }
                $('#communication-group-customer-members-list').find(`.communication-group-member-wrapper[data-customer-id="${rec.data.id}"][data-type="customer"]`).find('.filemanager-file-wrapper span').text(getName);
            }
            //in the listing(group moderator)(after group created)
            if ($('#communication-group-moderator-members-list').find(`.communication-group-moderator-member-wrapper[data-id="${rec.data.id}"]`).length > 0) {
                var getName;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    getName = rec.data.display_name;
                } else {
                    getName = `${rec.data.name.fisrt} ${rec.data.name.last}`;
                }
                $('#communication-group-moderator-members-list').find(`.communication-group-moderator-member-wrapper[data-id="${rec.data.id}"]`).find('.custom-communication-group-moderator-member-name').text(getName);
            }
        }

        //communication group add moderator modal
        if ($('#modal-communication-group-moderator-selection').length > 0) {
            var getName;
            if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                getName = rec.data.display_name;
            } else {
                getName = `${rec.data.name.fisrt} ${rec.data.name.last}`;
            }
            $(`.contact-profile-container[data-id="${rec.data.id}"][data-type="customer"][data-customer-type="customer"]`).siblings('.contact-name-wrapper').text(getName)
        }
        //Case:6 update in customer group creation page(in the contact-list modal) 
        if ($('body').attr('app') == "customer_groups_details" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            //customer groups using contact list modal
            if ($('#modal-customer-group-contact-list-selection').length > 0) {
                digibiz.customerGroupsContactsList = [];
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                }
                getCustomerGroupContactList(reqParam)
                    .then((response) => {
                        processCustomerGroupContactsList(response, function () { });
                    })
                    .catch((err) => {
                        //console.log("error in getCustomerGroupContactList socket");
                    })
            }
            //in the listing(members)(b4 group created)
            if ($('#customer-group-members-list').find(`.customer-group-member-wrapper[data-id="${rec.data.id}"]`).length > 0) {
                var getName;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    getName = rec.data.display_name;
                } else {
                    getName = `${rec.data.name.fisrt} ${rec.data.name.last}`;
                }
                $('#customer-group-members-list').find(`.customer-group-member-wrapper[data-id="${rec.data.id}"]`).find('.filemanager-file-wrapper span').text(getName);
            }
            //in the listing(group moderator)(b4 group created)
            if ($('#communication-group-moderator-members-list').find(`.communication-group-moderator-member-wrapper-not-saved[data-id="${rec.data.id}"]`).length > 0) {
                var getName;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    getName = rec.data.display_name;
                } else {
                    getName = `${rec.data.name.fisrt} ${rec.data.name.last}`;
                }
                $('#communication-group-moderator-members-list').find(`.communication-group-moderator-member-wrapper-not-saved[data-id="${rec.data.id}"]`).find('.filemanager-file-wrapper span').text(getName);
            }
            //in the listing(members)(after group creating)
            if ($('#customer-group-members-list').find(`.custom-customer-group-member-wrapper[data-customer-id="${rec.data.id}"][data-customer-type="customer"]`).length > 0) {
                var getName;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    getName = rec.data.display_name;
                } else {
                    getName = `${rec.data.name.fisrt} ${rec.data.name.last}`;
                }
                $('#customer-group-members-list').find(`.custom-customer-group-member-wrapper[data-customer-id="${rec.data.id}"][data-customer-type="customer"]`).find('.filemanager-file-wrapper span').text(getName);
            }
            //customer groups using group list modal
            if ($('#modal-customer-group-groups-list-selection').length > 0) {
                //get all std groups
                digibiz.customerGroupCustomGroupsList = [];
                var reqParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "customer",
                    list_by: "draft_active_standard_customer_groups"
                }
                groupsList(reqParams)
                    .then((response) => {
                        processCustomerGroupCustomGroupList(response, function () { });
                    })
                    .catch((err) => {
                        //console.log("error in customers std group");
                    })
            }
        }

        if ($('body').attr('app') == "customer_business_list") {
            if (sessionStorage.getItem('digibiz_role') == "customer") {
                if (sessionStorage.getItem('account_id') == rec.data.account_id) {
                    digibiz.customer_business_list = [];
                    var reqParam = {
                        device_id: crossplat.device.uuid,
                        list_by: "customer"
                    }
                    businessList(reqParam)
                        .then((response) => {
                            processCustomerBusinessList(response, function () { });
                        })
                        .catch((err) => {
                            //console.log("socket error")
                        })
                }
            }
        }
    },
    customerDelete: function (rec) {
        //console.log("customerDelete", rec)
        if ($('body').attr('app') == "customer_creation_active_list" && sessionStorage.getItem('identifier_id') == rec.data.identifier_id) {
            digibiz.customer_creation_active_list = [];
            activeCustomerCreationListPage()
        }
        //case:2 remove business from customer role customer_business_list
        if ($('body').attr("app") == "customer_business_list" && sessionStorage.getItem('account_id') == rec.data.account_id /*&& sessionStorage.getItem('digibiz_role') == "customer"*/) {
            digibiz.customer_business_list = [];
            // customerBusinessListPage();
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "customer"
            }
            businessList(reqParam)
                .then((response) => {
                    processCustomerBusinessList(response, function () {
                        removeLoader();
                    });
                })
                .catch((err) => {
                })
        }
        if ($('body').attr("app") == "customer_business_list" && rec.data.hasOwnProperty('associate_customer_socket') && sessionStorage.getItem('account_id') == rec.data.associate_customer_socket.account_id /*&& sessionStorage.getItem('digibiz_role') == "customer"*/) {
            digibiz.customer_business_list = [];
            // customerBusinessListPage();
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "customer"
            }
            businessList(reqParam)
                .then((response) => {
                    processCustomerBusinessList(response, function () {
                        removeLoader();
                    });
                })
                .catch((err) => {
                })
        }
        //case:3 update in communication groups page
        if ($('body').attr('app') == "communication_groups") {
            if (sessionStorage.getItem('selected-communication-group-type-tab') == "communication") {
                digibiz.communicationGroupsList = [];
                getCommunicationGroupsPage();
            }
        }
        //case:4 update in communication group detail page
        if ($('body').attr('app') == "communication_group_details") {
            // getCommunicationGroupDetailPage();
            if (sessionStorage.getItem('group_id')) {
                if (rec.data.hasOwnProperty('customer_groups') && rec.data.customer_groups) {
                    $.each(rec.data.customer_groups, function (index, group) {
                        //console.log("group", group);
                        if (sessionStorage.getItem('group_id') == group.id) {
                            Materialize.toast(`Group Deleted`, 3000, 'round success-alert');
                            sessionStorage.removeItem('group_id');
                            $('.custom-modal-popup').remove();
                            location.hash = `communication/groups`;
                        }

                        if (group.status.status == "deleted") {
                            //delete customer group from customer members list(after group creation)
                            $(`.communication-group-member-wrapper[data-group-id="${group.id}"]`).remove();
                            //delete customer group from customer members list(b4 group creation)
                            $(`.communication-group-customer-group-member-wrapper[data-id="${group.id}"]`).remove();
                            //delete moderators from moderators list(after group craetion)
                            $(`.communication-group-moderator-member-wrapper[data-group-id="${group.id}"]`).remove();
                        }
                    })
                }
                //remove as moderator if present(after group creation)
                //remove customer
                $(`.communication-group-moderator-member-wrapper[data-id="${rec.data.id}"][data-type="customer"]`).remove();
                //remove his associate customer
                $(`.communication-group-moderator-member-wrapper[data-parent-customer-id="${rec.data.id}"][data-type="associate_customer"]`).remove();
                //remove as member if present(after group creation)(if communication group is of contact list)
                //remove customer
                $(`.communication-group-member-wrapper[data-customer-id="${rec.data.id}"]`).remove();
                //for removing the customer's associate customers (if communication group is of contact list)
                $(`.communication-group-member-wrapper[data-parent-customer-id="${rec.data.id}"]`).remove();

            } else {
                $(`.communication-group-customer-member-checkbox[value="${rec.data.id}"][data-type="customer"]`).parents(`.communication-group-customer-member-wrapper[data-id="${rec.data.id}"]`).remove();
                $(`.communication-group-customer-member-checkbox[data-parent-customer-id="${rec.data.id}"][data-type="associate_customer"]`).parent().parent('.communication-group-customer-member-wrapper').remove();
                //remove from moderator heading list(before group creation)
                //remove customer
                $(`.communication-group-moderator-member-wrapper-not-saved[data-id="${rec.data.id}"]`).remove();
                //remove his associate customer
                $(`.communication-group-moderator-member-wrapper-not-saved[data-parent-customer-id="${rec.data.id}"]`).remove();
                if (rec.data.hasOwnProperty('customer_groups') && rec.data.customer_groups) {
                    $.each(rec.data.customer_groups, function (index, group) {
                        //console.log("group", group);
                        if (group.status.status == "deleted") {
                            //delete customer group from customer members list(after group creation)
                            $(`.communication-group-member-wrapper[data-group-id="${group.id}"]`).remove();
                            //delete customer group from customer members list(b4 group creation)
                            $(`.communication-group-customer-group-member-wrapper[data-id="${group.id}"]`).remove();
                            //delete moderators from moderators list(after group craetion)
                            $(`.communication-group-moderator-member-wrapper[data-group-id="${group.id}"]`).remove();
                        }
                    })
                }
            }
            //update in modal-communication-group-customer-contact-list-selection(modal for selecting customers for communication group-contact_list)
            if ($('#modal-communication-group-customer-contact-list-selection').length > 0) {
                //remove customer
                // $('#modal-communication-group-customer-contact-list-selection').find(`.accordion-contenttt[id="${rec.data.customer_contact_item_id}"][data-content-type="contact_item"]`).find(`.communication-groups-identifier-based-customer-contact-wrapper[data-id="${rec.data.identifier_id}"]`).remove();
                $('#modal-communication-group-customer-contact-list-selection').find(`.communication-groups-identifier-based-customer-contact-wrapper[data-id="${rec.data.id}"]`).remove();
                //for removing the customer's associate customers
                $('#modal-communication-group-customer-contact-list-selection').find(`.communication-groups-identifier-based-customer-contact-wrapper[data-parent-customer-id="${rec.data.id}"]`).remove();
            }
            //update in modal-communication-group-customer-group-list-selection(modal for selecting customer grp for communication group-group_list)
            if ($('#modal-communication-group-customer-group-selection').length > 0) {
                //console.log("111", rec.data.customer_groups);
                if (rec.data.hasOwnProperty('customer_groups') && rec.data.customer_groups) {
                    $.each(rec.data.customer_groups, function (index, group) {
                        //console.log("group", group);
                        digibiz.communicationCreateCustomersGroupsList = digibiz.communicationCreateCustomersGroupsList.filter((e) => {
                            return e.id != group.id;
                        })
                        $(`.group-selection-wrapper[data-group-id="${group.id}"]`).remove();
                    })
                }
            }
        }
        //remove customer from moderator add modal for communication grp
        if ($('#modal-communication-group-moderator-selection').length > 0) {
            //console.log("inside modal")
            //remove the customer
            $('#modal-communication-group-moderator-selection').find(`.contact-profile-container[data-id="${rec.data.id}"][data-type="customer"][data-customer-type="customer"]`).parents('.employee-selection-list-container').remove();
            //remove his associate customer
            $('#modal-communication-group-moderator-selection').find(`.contact-profile-container[data-parent-customer-id="${rec.data.id}"][data-type="customer"][data-customer-type="associate_customer"]`).parents('.employee-selection-list-container').remove();
        }
        //Case:6 update in contact-list sub-modulecustomer_contact_list
        if ($('body').attr('app') == "customer_contact_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            digibiz.contacts_list = [];
            getCustomerContactListPage();
        }
        //Case:7 update in customer groups module(in standard tab) -> customer groups list page
        if ($('body').attr('app') == "customer_groups_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.groups_list = [];
                getCustomerGroupsListPage();
            }
        }
        //Case:8 update in customer group creation page(in the contact-list modal) 
        if ($('body').attr('app') == "customer_groups_details" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if ($('#modal-customer-group-contact-list-selection').length > 0) {
                digibiz.customerGroupsContactsList = [];
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                }
                getCustomerGroupContactList(reqParam)
                    .then((response) => {
                        processCustomerGroupContactsList(response, function () { });
                    })
                    .catch((err) => {
                        //console.log("error in getCustomerGroupContactList socket");
                    })
            } else if ($('#modal-customer-group-groups-list-selection').length > 0) {
                //get all std groups
                digibiz.customerGroupCustomGroupsList = [];
                var reqParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "customer",
                    list_by: "draft_active_standard_customer_groups"
                }
                groupsList(reqParams)
                    .then((response) => {
                        processCustomerGroupCustomGroupList(response, function () { });
                    })
                    .catch((err) => {
                        //console.log("error in customers std group");
                    })
            } else {//heading list
                if ($('#customer-group-members-list').find('.customer-group-member-wrapper').length > 0 || $('#customer-group-members-list').find('.custom-customer-group-member-wrapper').length > 0) {
                    $(`.customer-group-member-wrapper[data-id="${rec.data.id}"]`).remove();//remove from first-time creation page/edit case page(if new members added)  
                    $(`.customer-group-member-wrapper[data-parent-customer-id="${rec.data.id}"]`).remove();
                    if (sessionStorage.getItem('group_id')) {//edit_case
                        $(`.custom-customer-group-member-wrapper[data-customer-id="${rec.data.id}"][data-customer-type="customer"]`).remove();//remove from edit page
                        $(`.custom-customer-group-member-wrapper[data-parent-customer-id="${rec.data.id}"][data-customer-type="associate_customer"]`).remove();
                        if ($('#customer-group-members-list').find(`.custom-customer-group-member-wrapper`).length < 2) {
                            Materialize.toast(`Group Deleted!`, 3000, "round error-alert");
                            location.hash = `customer/groups/identifiers/list`;
                        }
                    }
                    if (sessionStorage.getItem('group_from') == "group_list") {
                        if (rec.data.hasOwnProperty('customer_groups') && rec.data.customer_groups) {
                            $.each(rec.data.customer_groups, function (index, group) {
                                //console.log("group", group);
                                $('#customer-group-members-list').find(`.customer-group-member-wrapper[data-id="${group.id}"]`).remove();
                                $('#customer-group-members-list').find(`.custom-customer-group-member-wrapper[data-group-id="${group.id}"]`).remove();
                            })
                        }
                    }
                }
            }
        }
        //Case:9 update in customer groups sub-module(in standard tab)
        if ($('body').attr('app') == "customer_groups_identifiers_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.standard_customer_groups_identifiers_list = [];
                standardCustomerGroupsIdentifierListPage();
            } else {
                var getGroups = rec.data.customer_groups;
                //console.log("getGroups", getGroups);
                $.each(getGroups, function (index, group) {
                    digibiz.custom_groups_list = digibiz.custom_groups_list.filter((p) => {
                        return p.id != group.id
                    });
                })
                //console.log("after filter", digibiz.custom_groups_list);
                processCustomerCustomGroupList(digibiz.custom_groups_list, function () { });
            }
        }
        //Case:10 customer create page
        if ($('body').attr('app') == "customer_create" && sessionStorage.getItem('customer_id') == rec.data.id) {
            $('#associate-customers-pending-notification-details-modal').remove();
            sessionStorage.removeItem('customer_id');
            sessionStorage.removeItem('customer_name');
            Materialize.toast(`Customer Deleted!`, 3000, 'round error-alert');
            location.hash = `customer_creation/active/list`;
        }
        //Case:3 update in show access list of customer show access list    
        if ($('body').attr('app') == "customer_create" && sessionStorage.getItem('customer_id') != rec.data.id) {
            if ($('#customer-access-show-modal').length > 0) {
                digibiz.show_customer_access_list = [];
                var requestParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "customer",
                    id: sessionStorage.getItem('customer_id')
                }
                getIdentifierItem(requestParams)
                    .then((result) => {
                        var reqParam = {
                            device_id: crossplat.device.uuid,
                            business_id: sessionStorage.getItem('business_id'),
                            type: "customer",
                            identifier_id: sessionStorage.getItem('identifier_id'),
                            identifier_item_id: result.id,
                            member_id: sessionStorage.getItem('customer_id'),
                        }
                        showAccessCustomerList(reqParam)
                            .then((response) => {
                                processCustomerShowAccessList(response, function () {
                                    removeLoader();
                                });
                            })
                            .catch((err) => { })
                    })
                    .catch((err) => { })
            }
            if ($('#associate-customer-access-show-modal').length > 0) {
                digibiz.show_associate_customer_access_list = [];
                var getAssociateCustomerId = $('#associate-customer-access-show-modal').attr('data-associate-customer-id');
                addLoader();
                var requestParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "associate_customer",
                    id: getAssociateCustomerId
                }
                getIdentifierItem(requestParams)
                    .then((result) => {
                        //console.log("result", result);
                        var getIdentifierIdData = result.data.find((e) => e.type == "associate_customer_identifier");
                        //console.log("getIdentifierIdData", getIdentifierIdData);
                        var reqParam = {
                            device_id: crossplat.device.uuid,
                            business_id: sessionStorage.getItem('business_id'),
                            type: "associate_customer",
                            identifier_id: getIdentifierIdData.identifier_id,
                            identifier_item_id: result.id,
                            member_id: getAssociateCustomerId,
                            parent_identifier_id: result.parent_customer_identifier_id
                        }
                        processAssociateCustomerShowAccessList(reqParam)
                            .then((response) => {
                            })
                            .catch((err) => {

                            })
                    })
                    .catch((err) => {

                    })
            }
        }
    },

    associateCustomerAdd: function (rec) {
        //console.log("associateCustomerAdd socket reached", rec);
        //Case:1 update in customer creation flow step-3(from pendinf to accepted)
        if ($('body').attr('app') == "customer_create" && sessionStorage.getItem('customer_id') == rec.data.customer_id) {
            if (rec.data.role.type == "employee") {
                var template = `<div class="customer-associate-customer-assignment-box" data-id="${rec.data.id}" data-status="${rec.data.status.status}" data-account-id="${rec.data.account_id}" data-role-id="${rec.data.role.id}" data-role-type="${rec.data.role.type}">
            <div class="customer-associate-customer-assignment-wrapper">
                <div class="customer-associate-customer-assignment-name-container">
                    <div class="customer-associate-customer-assignment-name-wrapper">
                        <div class="customer-associate-customer-assignment-name">${rec.data.name.first}&nbsp;${rec.data.name.last}</div>
                        <div class="wrapper-secondary-heading">Employee: ${rec.data.role.business_name}</div>
                        <div class="customer-associate-customer-status">Status: ${rec.data.status.status}</div>
                    </div>
                </div>
                <div class="btn-wrap">
                    <div class="more-menu-wrapper" id="show_action_customer_associate-customer_assignment"><i class="material-icons">more_vert</i></div>
                </div>
            </div>              
        </div>`;
                // //console.log("template", template);
                $(`.pending-associate-customer-wrapper[data-account-id="${rec.data.account_id}"][data-role-id="${rec.data.role.id}"][data-role-type="${rec.data.role.type}"]`).remove();
                $('.customer-associate-customer-assignment-list-main-container').append(template);
            } else {
                var template = `<div class="customer-associate-customer-assignment-box" data-id="${rec.data.id}" data-status="${rec.data.status.status}" data-account-id="${rec.data.account_id}" data-role-id="${rec.data.role.id}" data-role-type="${rec.data.role.type}">
            <div class="customer-associate-customer-assignment-wrapper">
                <div class="customer-associate-customer-assignment-name-container">
                    <div class="customer-associate-customer-assignment-name-wrapper">
                        <div class="customer-associate-customer-assignment-name">${rec.data.name.first}&nbsp;${rec.data.name.last}</div>
                        <div class="customer-associate-customer-status">Status: ${rec.data.status.status}</div>
                    </div>
                </div>
                <div class="btn-wrap">
                    <div class="more-menu-wrapper" id="show_action_customer_associate-customer_assignment"><i class="material-icons">more_vert</i></div>
                </div>
            </div>              
        </div>`;
                // //console.log("template", template);
                $(`.pending-associate-customer-wrapper[data-account-id="${rec.data.account_id}"][data-role-id="${rec.data.role.id}"][data-role-type="${rec.data.role.type}"]`).remove();
                $('.customer-associate-customer-assignment-list-main-container').append(template);
            }

        }
        //Case:2 update in customer groups sub-module(in standard tab)
        if ($('body').attr('app') == "customer_groups_identifiers_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.standard_customer_groups_identifiers_list = [];
                standardCustomerGroupsIdentifierListPage();
            }
        }
        //Case:3 update in customer groups sub-module(in standard tab) -> customer groups list page
        if ($('body').attr('app') == "customer_groups_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.groups_list = [];
                getCustomerGroupsListPage();
            }
        }
        //case:4 update in modal-communication-group-customer-contact-list-selection(modal for selecting customers for communication group-contact_list)
        if ($('#modal-communication-group-customer-contact-list-selection').length > 0) {
            //add in global variable and process
            // var getFirstArray = digibiz.communicationGroupsCustomerContactsList.find(e => e.id == rec.data.identifier_id);
            // if(getFirstArray.hasOwnProperty('contactItems') && getFirstArray.contactItems && getFirstArray.contactItems.length > 0) {
            //     var getSecondArray = getFirstArray.contactItems.find(p => p.data.length == "1" || p.data.length == 1);
            //     if(getSecondArray.hasOwnProperty('customerData') && getSecondArray.customerData) {
            //         getSecondArray.customerData.push(rec.data);
            //     }
            // }
            // digibiz.communicationGroupsCustomerContactsList = digibiz.communicationGroupsCustomerContactsList.map(e => {
            //     if (e.id == rec.data.parent_customer_identifier_id) {
            //         if (e.hasOwnProperty('contactItems') && e.contactItems && e.contactItems.length > 0) {
            //             e.contactItems = e.contactItems.map(p => {
            //                 if (p.data.length == 2 || p.data.length == "2") {
            //                     var checkArray = p.data.find(q => q.identifier_id == rec.data.identifier_id && q.type == "associate_customer_identifier");
            //                     if (checkArray != undefined || checkArray != null) {
            //                         if (p.hasOwnProperty('customerData') && p.customerData) {
            //                             p.customerData.push(rec.data);
            //                         }
            //                     }
            //                 }
            //                 return p
            //             })
            //         }
            //     }
            //     return e;
            // })
            // processCommunicationGroupCustomerContactsList(digibiz.communicationGroupsCustomerContactsList, function () { });
        }
        //Case:12 update in customer group creation page(in the contact-list modal) 
        if ($('body').attr('app') == "customer_groups_details" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if ($('#modal-customer-group-contact-list-selection').length > 0) {
                digibiz.customerGroupsContactsList = digibiz.customerGroupsContactsList.map(e => {
                    if (e.id == rec.data.parent_customer_identifier_id) {
                        if (e.hasOwnProperty('contactItems') && e.contactItems && e.contactItems.length > 0) {
                            if (p.data.length == 2 || p.data.length == "2") {
                                var checkArray = p.data.find(q => q.identifier_id == rec.data.identifier_id && q.type == "associate_customer_identifier");
                                if (checkArray != undefined || checkArray != null) {
                                    if (p.hasOwnProperty('customerData') && p.customerData) {
                                        p.customerData.push(rec.data);
                                    }
                                }
                            }
                        }
                    }
                    return e;
                })
                processCustomerGroupContactsList(digibiz.customerGroupsContactsList, function () { });
            } else if ($('#modal-customer-group-groups-list-selection').length > 0) {
                //get all std groups
                digibiz.customerGroupCustomGroupsList = [];
                var reqParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "customer",
                    list_by: "draft_active_standard_customer_groups"
                }
                groupsList(reqParams)
                    .then((response) => {
                        processCustomerGroupCustomGroupList(response, function () { });
                    })
                    .catch((err) => {
                        //console.log("error in customers std group");
                    })
            }
        }
        if ($('body').attr("app") == "digibiz_notifications") {
            digibiz.digibiz_notifications = [];
            getDigibizNotificationsPage();
        }
        if (sessionStorage.getItem('digibiz_role') == "customer") {
            if (sessionStorage.getItem('account_id') == rec.data.account_id) {
                customerBusinessListHelperMethod();
                associateCustomerModuleListHelperMethod();
            }
        }
    },
    AssociateCustomerUpdate: function (rec) {
        //console.log("AssociateCustomerUpdate socket reached", rec);
        //Case:2 update in customer groups sub-module(in standard tab)
        if ($('body').attr('app') == "customer_groups_identifiers_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.standard_customer_groups_identifiers_list = [];
                standardCustomerGroupsIdentifierListPage();
            }
        }
        //Case:3 update in customer groups sub-module(in standard tab) -> customer groups list page
        if ($('body').attr('app') == "customer_groups_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.groups_list = [];
                getCustomerGroupsListPage();
            }
        }
        //Case:4 update in contact-list sub-modulecustomer_contact_list
        if ($('body').attr('app') == "customer_contact_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            digibiz.contacts_list = [];
            getCustomerContactListPage();
        }
        //Case:5 update in customer group creation page(in the contact-list modal) 
        if ($('body').attr('app') == "customer_groups_details" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if ($('#modal-customer-group-contact-list-selection').length > 0) {
                digibiz.customerGroupsContactsList = [];
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                }
                getCustomerGroupContactList(reqParam)
                    .then((response) => {
                        processCustomerGroupContactsList(response, function () { });
                    })
                    .catch((err) => {
                        //console.log("error in getCustomerGroupContactList socket");
                    })
            }
            //in the listing(members)(b4 group creating)
            if ($('#customer-group-members-list').find(`.customer-group-member-wrapper[data-id="${rec.data.id}"][data-parent-customer-id="${rec.data.customer_id}"]`).length > 0) {
                var getName;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    getName = rec.data.display_name;
                } else {
                    getName = `${rec.data.name.fisrt} ${rec.data.name.last}`;
                }
                $('#customer-group-members-list').find(`.customer-group-member-wrapper[data-id="${rec.data.id}"][data-parent-customer-id="${rec.data.customer_id}"]`).find('.filemanager-file-wrapper span').text(getName);
            }
            //in the listing(members)(after group creating)
            if ($('#customer-group-members-list').find(`.custom-customer-group-member-wrapper[data-customer-id="${rec.data.id}"][data-parent-customer-id="${rec.data.customer_id}"][data-customer-type="${rec.data.customer_type}"]`).length > 0) {
                var getName;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    getName = rec.data.display_name;
                } else {
                    getName = `${rec.data.name.fisrt} ${rec.data.name.last}`;
                }
                $('#customer-group-members-list').find(`.custom-customer-group-member-wrapper[data-customer-id="${rec.data.id}"][data-parent-customer-id="${rec.data.customer_id}"][data-customer-type="${rec.data.customer_type}"]`).find('.filemanager-file-wrapper span').text(getName);
            }
            //customer groups using group list modal
            if ($('#modal-customer-group-groups-list-selection').length > 0) {
                //get all std groups
                digibiz.customerGroupCustomGroupsList = [];
                var reqParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "customer",
                    list_by: "draft_active_standard_customer_groups"
                }
                groupsList(reqParams)
                    .then((response) => {
                        processCustomerGroupCustomGroupList(response, function () { });
                    })
                    .catch((err) => {
                        //console.log("error in customers std group");
                    })
            }
        }
        if ($('body').attr('app') == "communication_group_details" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            //update in modal-communication-group-customer-contact-list-selection(modal for selecting customers for communication group-contact_list)
            if ($('#modal-communication-group-customer-contact-list-selection').length > 0) {
                //check if that customer is present in the modal
                if ($('#modal-communication-group-customer-contact-list-selection').find(`.communication-groups-identifier-based-customer-contact-wrapper[data-id="${rec.data.id}"]`).length > 0) {
                    var getName;
                    if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                        getName = rec.data.display_name;
                    } else {
                        getName = `${rec.data.name.first} ${rec.data.name.last}`;
                    }
                    $('#modal-communication-group-customer-contact-list-selection').find(`.communication-groups-identifier-based-customer-contact-wrapper[data-id="${rec.data.id}"]`).find('.customer-contact-name span').text(getName);
                } else {//not present associate customer, so add
                    if (rec.data.status.status == "active") {
                        var getData = {
                            contact: rec.data
                        };
                        fetch.appendHtml(function () {
                        }, "layouts/template_elements/communication_group_contact_list_customer_contact", "#communication-group-contact-list-customer-contact-template", `.accordion-contenttt[id="${rec.data.customer_contact_item_id}"][data-content-type="contact_item"]`, getData);
                        // digibiz.communicationGroupsCustomerContactsList = digibiz.communicationGroupsCustomerContactsList.map(e => {
                        //     if (e.id == rec.data.parent_customer_identifier_id) {
                        //         if (e.hasOwnProperty('contactItems') && e.contactItems && e.contactItems.length > 0) {
                        //             e.contactItems = e.contactItems.map(p => {
                        //                 if (p.data.length == 2 || p.data.length == "2") {
                        //                     var checkArray = p.data.find(q => q.identifier_id == rec.data.identifier_id && q.type == "associate_customer_identifier");
                        //                     if (checkArray != undefined || checkArray != null) {
                        //                         if (p.hasOwnProperty('customerData') && p.customerData) {
                        //                             p.customerData.push(rec.data);
                        //                         }
                        //                     }
                        //                 }
                        //                 return p
                        //             })
                        //         }
                        //     }
                        //     return e;
                        // })
                        // processCommunicationGroupCustomerContactsList(digibiz.communicationGroupsCustomerContactsList, function () { });
                    }
                }
            }
            //check modal is present for group list
            if ($('#modal-communication-group-customer-group-selection').length > 0) {
                //console.log("got modal");
                if (rec.data.hasOwnProperty('customer_groups') && rec.data.customer_groups && rec.data.customer_groups.length > 0) {
                    //console.log("length is present");
                    var getGroups = rec.data.customer_groups;
                    //console.log("getGroups", getGroups);
                    $.each(getGroups, function (index, group) {
                        //console.log("group", group);
                        //check if this group is already present in the modal
                        if ($(`.group-selection-wrapper[data-group-id="${group.id}"][data-group-type="customer"]`).length > 0) {
                            //console.log("Group already presetn");
                        } else {//add it to the modal, not present
                            if (group.status.status == "draft") {//check if group is draft
                                if (group.hasOwnProperty('group_image') && group.group_image) {
                                    if (group.group_image.hasOwnProperty('thumbnail') && group.group_image.thumbnail) {
                                        var avtarUrl = `${api.get_group_image}?device_id=${crossplat.device.uuid}&id=${group.id}&image_id=${group.group_image.thumbnail}`;
                                        group.group_image['avtarUrl'] = avtarUrl;
                                        group['imageLetter'] = group.name.charAt(0);
                                    } else {
                                        group['imageLetter'] = group.name.charAt(0);
                                    }
                                } else {
                                    group['imageLetter'] = group.name.charAt(0);
                                }
                                var getData = {
                                    group_data: group
                                };
                                //console.log("not present group so add", getData);
                                fetch.appendHtml(function () {
                                }, "layouts/template_elements/communication_group_group_list_customer_group_add", "#communication-group-group-list-customer-group-add-template", `.customer-group-list-selection-main-container`, getData);
                            }
                        }
                    })
                }
            }
            //in the listing(members)(b4 group created)
            if ($('#communication-group-customer-members-list').find(`.communication-group-customer-member-wrapper[data-id="${rec.data.id}"]`).length > 0) {
                var getName;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    getName = rec.data.display_name;
                } else {
                    getName = `${rec.data.name.fisrt} ${rec.data.name.last}`;
                }
                $('#communication-group-customer-members-list').find(`.communication-group-customer-member-wrapper[data-id="${rec.data.id}"]`).find('.filemanager-file-wrapper span').text(getName);
            }
            //in the listing(group moderator)(b4 group created)
            if ($('#communication-group-moderator-members-list').find(`.communication-group-moderator-member-wrapper-not-saved[data-id="${rec.data.id}"]`).length > 0) {
                var getName;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    getName = rec.data.display_name;
                } else {
                    getName = `${rec.data.name.fisrt} ${rec.data.name.last}`;
                }
                $('#communication-group-moderator-members-list').find(`.communication-group-moderator-member-wrapper-not-saved[data-id="${rec.data.id}"]`).find('.filemanager-file-wrapper span').text(getName);
            }
            //in the listing(members)(after group creating)
            if ($('#communication-group-customer-members-list').find(`.communication-group-member-wrapper[data-customer-id="${rec.data.id}"]`).length > 0) {
                var getName;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    getName = rec.data.display_name;
                } else {
                    getName = `${rec.data.name.fisrt} ${rec.data.name.last}`;
                }
                $('#communication-group-customer-members-list').find(`.communication-group-member-wrapper[data-customer-id="${rec.data.id}"]`).find('.filemanager-file-wrapper span').text(getName);
            }
            //in the listing(group moderator)(after group created)
            if ($('#communication-group-moderator-members-list').find(`.communication-group-moderator-member-wrapper[data-id="${rec.data.id}"]`).length > 0) {
                var getName;
                if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                    getName = rec.data.display_name;
                } else {
                    getName = `${rec.data.name.fisrt} ${rec.data.name.last}`;
                }
                $('#communication-group-moderator-members-list').find(`.communication-group-moderator-member-wrapper[data-id="${rec.data.id}"]`).find('.custom-communication-group-moderator-member-name').text(getName);
            }
        }

        if ($('#modal-communication-group-moderator-selection').length > 0) {
            var getName;
            if (rec.data.hasOwnProperty('display_name') && rec.data.display_name) {
                getName = rec.data.display_name;
            } else {
                getName = `${rec.data.name.fisrt} ${rec.data.name.last}`;
            }
            $(`.contact-profile-container[data-id="${rec.data.id}"][data-type="customer"][data-customer-type="associate_customer"]`).siblings('.contact-name-wrapper').text(getName)
        }

        if ($('body').attr('app') == "customer_business_list") {
            if (sessionStorage.getItem('digibiz_role') == "customer") {
                if (sessionStorage.getItem('account_id') == rec.data.account_id) {
                    digibiz.customer_business_list = [];
                    var reqParam = {
                        device_id: crossplat.device.uuid,
                        list_by: "customer"
                    }
                    businessList(reqParam)
                        .then((response) => {
                            processCustomerBusinessList(response, function () { });
                        })
                        .catch((err) => {
                            //console.log("socket error")
                        })
                }
            }
        }

        //update the status in associate customers list
        if ($('body').attr('app') == "customer_create") {
            if ($(`.customer-create-stepper[data-stepper="3"]`).hasClass('is-active')) {
                $(`.customer-associate-customer-assignment-box[data-id="${rec.data.id}"]`).find('.customer-associate-customer-status').text(`Status: ${rec.data.status.status}`);
                $(`.customer-associate-customer-assignment-box[data-id="${rec.data.id}"]`).attr('data-status', rec.data.status.status);
            }
        }
    },
    AssociateCustomerDelete: function (rec) {
        //console.log("AssociateCustomerUpdate socket reached", rec);
        //Case:2 update in customer groups sub-module(in standard tab)
        if ($('body').attr('app') == "customer_groups_identifiers_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.standard_customer_groups_identifiers_list = [];
                standardCustomerGroupsIdentifierListPage();
            }
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "custom") {
                digibiz.custom_groups_list = [];
                customCustomerGroupsListPage();
            }
        }
        //Case:3 update in customer groups sub-module(in standard tab) -> customer groups list page
        if ($('body').attr('app') == "customer_groups_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.groups_list = [];
                getCustomerGroupsListPage();
            }
        }
        //Case:4 update in contact-list sub-modulecustomer_contact_list
        if ($('body').attr('app') == "customer_contact_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            digibiz.contacts_list = [];
            getCustomerContactListPage();
        }
        //case:6 update in communication groups page
        if ($('body').attr('app') == "communication_groups") {
            if (sessionStorage.getItem('selected-communication-group-type-tab') == "communication") {
                digibiz.communicationGroupsList = [];
                getCommunicationGroupsPage();
            }
        }
        //case:6 update in communication group detail page
        if ($('body').attr('app') == "communication_group_details") {
            // getCommunicationGroupDetailPage();
            if (sessionStorage.getItem('group_id')) {
                if (rec.data.hasOwnProperty('customer_groups') && rec.data.customer_groups) {
                    $.each(rec.data.customer_groups, function (index, group) {
                        //console.log("group", group);
                        if (sessionStorage.getItem('group_id') == group.id) {
                            Materialize.toast(`Group Deleted`, 3000, 'round success-alert');
                            sessionStorage.removeItem('group_id');
                            $('.custom-modal-popup').remove();
                            location.hash = `communication/groups`;
                        }
                        if (group.status.status == "deleted") {
                            //delete customer group from customer members list(after group creation)
                            $(`.communication-group-member-wrapper[data-group-id="${group.id}"]`).remove();
                            //delete customer group from customer members list(b4 group creation)
                            $(`.communication-group-customer-group-member-wrapper[data-id="${group.id}"]`).remove();
                            //delete moderators from moderators list(after group craetion)
                            $(`.communication-group-moderator-member-wrapper[data-group-id="${group.id}"]`).remove();
                        }

                    })
                }
                //remove as moderator if present
                $(`.communication-group-moderator-member-wrapper[data-id="${rec.data.id}"][data-type="associate_customer"]`).remove();
                //remove customer
                $(`.communication-group-member-wrapper[data-customer-id="${rec.data.id}"]`).remove();

            } else {
                if (rec.data.hasOwnProperty('customer_groups') && rec.data.customer_groups) {
                    $.each(rec.data.customer_groups, function (index, group) {
                        //console.log("group", group);
                        if (group.status.status == "deleted") {
                            //delete customer group from customer members list(after group creation)
                            $(`.communication-group-member-wrapper[data-group-id="${group.id}"]`).remove();
                            //delete customer group from customer members list(b4 group creation)
                            $(`.communication-group-customer-group-member-wrapper[data-id="${group.id}"]`).remove();
                            //delete moderators from moderators list(after group craetion)
                            $(`.communication-group-moderator-member-wrapper[data-group-id="${group.id}"]`).remove();
                        }
                    })
                }
                $(`.communication-group-customer-member-wrapper[data-id="${rec.data.id}"]`).remove();
                //remove from moderator heading list
                $(`.communication-group-moderator-member-wrapper-not-saved[data-id="${rec.data.id}"]`).remove();
            }
            //case:5 update in modal-communication-group-customer-contact-list-selection(modal for selecting customers for communication group-contact_list)
            if ($('#modal-communication-group-customer-contact-list-selection').length > 0) {
                $('#modal-communication-group-customer-contact-list-selection').find(`.communication-groups-identifier-based-customer-contact-wrapper[data-id="${rec.data.id}"]`).remove();
            }
            //update in modal-communication-group-customer-group-list-selection(modal for selecting customer grp for communication group-group_list)
            if ($('#modal-communication-group-customer-group-selection').length > 0) {
                //console.log("111", rec.data.customer_groups);
                if (rec.data.hasOwnProperty('customer_groups') && rec.data.customer_groups) {
                    $.each(rec.data.customer_groups, function (index, group) {
                        //console.log("group", group);
                        digibiz.communicationCreateCustomersGroupsList = digibiz.communicationCreateCustomersGroupsList.filter((e) => {
                            return e.id != group.id;
                        })
                        $(`.group-selection-wrapper[data-group-id="${group.id}"]`).remove();
                    })
                }
            }
        }
        //remove customer from moderator add modal
        if ($('#modal-communication-group-moderator-selection').length > 0) {
            $('#modal-communication-group-moderator-selection').find(`.contact-profile-container[data-id="${rec.data.id}"][data-type="customer"][data-customer-type="associate_customer"]`).parents('.employee-selection-list-container').remove();
        }
        if ($('body').attr("app") == "customer_business_list" && sessionStorage.getItem('account_id') == rec.data.account_id /*&& sessionStorage.getItem('digibiz_role') == "customer"*/) {
            digibiz.customer_business_list = [];
            // customerBusinessListPage();
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "customer"
            }
            businessList(reqParam)
                .then((response) => {
                    processCustomerBusinessList(response, function () {
                        removeLoader();
                    });
                })
                .catch((err) => {
                })
        }
        //Case:12 update in customer group creation page(in the contact-list modal) 
        if ($('body').attr('app') == "customer_groups_details" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if ($('#modal-customer-group-contact-list-selection').length > 0) {
                digibiz.customerGroupsContactsList = [];
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                }
                getCustomerGroupContactList(reqParam)
                    .then((response) => {
                        processCustomerGroupContactsList(response, function () { });
                    })
                    .catch((err) => {
                        //console.log("error in getCustomerGroupContactList socket");
                    })
            } else if ($('#modal-customer-group-groups-list-selection').length > 0) {
                //get all std groups
                digibiz.customerGroupCustomGroupsList = [];
                var reqParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "customer",
                    list_by: "draft_active_standard_customer_groups"
                }
                groupsList(reqParams)
                    .then((response) => {
                        processCustomerGroupCustomGroupList(response, function () { });
                    })
                    .catch((err) => {
                        //console.log("error in customers std group");
                    })
            } else {
                if ($('#customer-group-members-list').find('.customer-group-member-wrapper').length > 0 || $('#customer-group-members-list').find('.custom-customer-group-member-wrapper').length > 0) {
                    $(`.customer-group-member-wrapper[data-id="${rec.data.id}"]`).remove();//remove from first-time creation page/edit case page(if new members added)                    
                    if (sessionStorage.getItem('group_id')) {//edit_case
                        $(`.custom-customer-group-member-wrapper[data-customer-id="${rec.data.id}"][data-customer-type="associate_customer"]`).remove();//remove from edit page
                        if ($('#customer-group-members-list').find(`.custom-customer-group-member-wrapper`).length < 2) {
                            Materialize.toast(`Group Deleted!`, 3000, "round error-alert");
                            location.hash = `customer/groups/identifiers/list`;
                        }
                    }
                    if (sessionStorage.getItem('group_from') == "group_list") {
                        if (rec.data.hasOwnProperty('customer_groups') && rec.data.customer_groups) {
                            $.each(rec.data.customer_groups, function (index, group) {
                                //console.log("group", group);
                                $('#customer-group-members-list').find(`.customer-group-member-wrapper[data-id="${group.id}"]`).remove();
                                $('#customer-group-members-list').find(`.custom-customer-group-member-wrapper[data-group-id="${group.id}"]`).remove();
                            })
                        }
                    }
                }
                $.each(rec.data.customer_groups, function (index, group) {
                    //console.log("group", group);
                    if (sessionStorage.getItem('group_id') == group.id) {
                        Materialize.toast(`Group Deleted`, 3000, 'round success-alert');
                        sessionStorage.removeItem('group_id');
                        sessionStorage.removeItem('group_from')
                        $('.custom-modal-popup').remove();
                        if (sessionStorage.getItem('group_type') == "custom") {
                            location.hash = `customer/groups/identifiers/list`;
                            sessionStorage.removeItem('group_type');
                        } else {
                            location.hash = `customer/groups/list`;
                            sessionStorage.removeItem('group_type');
                        }
                    }
                })
            }
        }
        //Case:3 update in show access list of customer show access list    
        if ($('body').attr('app') == "customer_create") {
            if ($('#customer-access-show-modal').length > 0) {
                digibiz.show_customer_access_list = [];
                var requestParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "customer",
                    id: sessionStorage.getItem('customer_id')
                }
                getIdentifierItem(requestParams)
                    .then((result) => {
                        var reqParam = {
                            device_id: crossplat.device.uuid,
                            business_id: sessionStorage.getItem('business_id'),
                            type: "customer",
                            identifier_id: sessionStorage.getItem('identifier_id'),
                            identifier_item_id: result.id,
                            member_id: sessionStorage.getItem('customer_id'),
                        }
                        showAccessCustomerList(reqParam)
                            .then((response) => {
                                processCustomerShowAccessList(response, function () {
                                    removeLoader();
                                });
                            })
                            .catch((err) => { })
                    })
                    .catch((err) => { })
            }
            if ($('#associate-customer-access-show-modal').length > 0) {
                digibiz.show_associate_customer_access_list = [];
                var getAssociateCustomerId = $('#associate-customer-access-show-modal').attr('data-associate-customer-id');
                addLoader();
                var requestParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "associate_customer",
                    id: getAssociateCustomerId
                }
                getIdentifierItem(requestParams)
                    .then((result) => {
                        //console.log("result", result);
                        var getIdentifierIdData = result.data.find((e) => e.type == "associate_customer_identifier");
                        //console.log("getIdentifierIdData", getIdentifierIdData);
                        var reqParam = {
                            device_id: crossplat.device.uuid,
                            business_id: sessionStorage.getItem('business_id'),
                            type: "associate_customer",
                            identifier_id: getIdentifierIdData.identifier_id,
                            identifier_item_id: result.id,
                            member_id: getAssociateCustomerId,
                            parent_identifier_id: result.parent_customer_identifier_id
                        }
                        processAssociateCustomerShowAccessList(reqParam)
                            .then((response) => {
                            })
                            .catch((err) => {

                            })
                    })
                    .catch((err) => {

                    })
            }
        }
    },

    businessDisplayPictureUpdate: function (rec) {
        //console.log("businessDisplayPictureUpdate", rec);
        var avtarUrl = `${api.get_business_multimedia}?business_id=${rec.data.record_data.id}&device_id=${crossplat.device.uuid}&image_id=${rec.data.record_data.display_picture.thumbnail}`;
        //console.log("avtarUrl", avtarUrl);
        $(`.business-wrapper[data-business-id="${rec.data.record_data.id}"]`).find('img').attr('src', avtarUrl);
        $(`.employee-business-wrapper[data-business-id="${rec.data.record_data.id}"]`).find('img').attr('src', avtarUrl);
    },
    businessDisplayPictureRemove: function (rec) {
        //console.log("businessDisplayPictureRemove", rec);
        $(`.business-wrapper[data-business-id="${rec.data.record_data.id}"]`).find('img').attr('src', '');
        $(`.business-wrapper[data-business-id="${rec.data.record_data.id}"]`).find('span.persona').text(rec.data.record_data.name.charAt(0));
        $(`.employee-business-wrapper[data-business-id="${rec.data.record_data.id}"]`).find('img').attr('src', '');
        $(`.employee-business-wrapper[data-business-id="${rec.data.record_data.id}"]`).find('span.persona').text(rec.data.record_data.name.charAt(0));
    },

    businessOwnerAdd: function (rec) {
        //console.log("businessOwnerAdd", rec);
        if ($('body').attr('app') == "business_owner_business_list") {
            digibiz.business_owner_business_list = [];
            // businessOwnerBusinessListPage();
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "my_business"
            }
            businessList(reqParam)
                .then((response) => {
                    processBusinessOwnerBusinessList(response, function () {
                    });
                })
                .catch((err) => {
                })
        }
        if ($('body').attr('app') == "business_settings" && sessionStorage.getItem('selected-business-settings-tab') == "digibiz_admin" && rec.data.type == "digibiz_admin") {
            businessDigibizAdminsTab()
        } else if ($('body').attr('app') == "business_settings" && sessionStorage.getItem('selected-business-settings-tab') == "module_admin" && rec.data.type == "module_admin") {
            businessModuleAdminsTab()
        }
    },
    digibizBusinessNotification: function (rec) {
        //console.log("digibizBusinessNotification", rec);
        //case:1 for the receiving business 
        if ($('body').attr('app') == "business_management" && sessionStorage.getItem('account_id') == rec.data.account_id && sessionStorage.getItem('business_id') == rec.data.notification_data.contact.business_id) {
            businessManagementPage();
        }
        //case:2 for the receiving business notifications page
        if ($('body').attr('app') == "business_notifications" && sessionStorage.getItem('account_id') == rec.data.account_id && sessionStorage.getItem('business_id') == rec.data.notification_data.contact.business_id) {
            digibiz.business_notifications = [];
            getBusinessNotificationsPage();
        }
        //case:3 for the sending business collaborator contact list page
        if ($('body').attr('app') == "collaborator_contact_list" && sessionStorage.getItem('account_id') == rec.data.account_id && sessionStorage.getItem('business_id') == rec.data.notification_data.owner.business_id) {
            if (sessionStorage.getItem('selected-collaborator-tab') == "active_collaborator") {
                digibiz.collaborator_contact_list = [];
                activeCollaboratorContactListPage();
            } else if (sessionStorage.getItem('selected-collaborator-tab') == "pending_collaborator") {
                digibiz.pending_collaborator_contact_list = [];
                pendingCollaboratorContactListPage();
            }
        }
    },

    digibizBusinessNotificationChangeStatus: function (rec) {
        //console.log("digibizBusinessNotificationChangeStatus", rec);
        //case:1 for the receiving business 
        if ($('body').attr('app') == "business_management" && sessionStorage.getItem('account_id') == rec.data.account_id && sessionStorage.getItem('business_id') == rec.data.notification_data.contact.business_id) {
            businessManagementPage();
        }
        //case:2 for the receiving business notifications page
        if ($('body').attr('app') == "business_notifications" && sessionStorage.getItem('account_id') == rec.data.account_id && sessionStorage.getItem('business_id') == rec.data.notification_data.contact.business_id) {
            digibiz.business_notifications = [];
            getBusinessNotificationsPage();
        }
        //case:3 for the sending business collaborator contact list page
        if ($('body').attr('app') == "collaborator_contact_list" && sessionStorage.getItem('account_id') == rec.data.account_id && sessionStorage.getItem('business_id') == rec.data.notification_data.owner.business_id) {
            if (sessionStorage.getItem('selected-collaborator-tab') == "active_collaborator") {
                digibiz.collaborator_contact_list = [];
                activeCollaboratorContactListPage();
            }
            if (sessionStorage.getItem('selected-collaborator-tab') == "pending_collaborator") {
                //console.log("pending")
                digibiz.pending_collaborator_contact_list = [];
                pendingCollaboratorContactListPage();
            }
        }

        //case:4 for the sending business notification details page
        if ($('body').attr('app') == "collaborator_contact_list_notification_details" && sessionStorage.getItem('collaborator_business_id') == rec.data.notification_data.contact.business_id) {
            digibiz.collaborator_contact_list_notification_details = [];
            getCollaboratorContactListNotificationDetailsPage();
        }
        //case:4 for the sending business group details page
        if ($('body').attr('app') == "collaborator_group_details" && sessionStorage.getItem('account_id') == rec.data.account_id && sessionStorage.getItem('business_id') == rec.data.notification_data.owner.business_id) {
            if (rec.data.hasOwnProperty('group_data') && rec.data.group_data && rec.data.group_data.status.status == "inactive" && sessionStorage.getItem('group_id') == rec.data.group_data.id) {
                sessionStorage.removeItem('group_id');
                Materialize.toast("Group Inactivated.", 3000, 'round error-alert');
                location.hash = `collaborator/groups/list`;
            } else {
                if (rec.data.notification_data.contact.status.status == "accepted") {
                    $(`.collaborator-group-business-member-wrapper[data-business-id="${rec.data.notification_data.contact.business_id}"]`).find(`.collaborator-group-business-member-status`).text(`Status: active`);
                    if ($(`.collaborator-group-business-member-wrapper[data-business-id="${rec.data.notification_data.contact.business_id}"]`).find('#collaborator_group_business_member_actions').length > 0) {
                        //console.log("3 dot button already present");
                    } else {
                        var template = `<div class="more-menu-wrapper" id="collaborator_group_business_member_actions"><i class="material-icons">more_vert</i></div>`;
                        $(`.collaborator-group-business-member-wrapper[data-business-id="${rec.data.notification_data.contact.business_id}"]`).find('.btn-wrap').append(template);
                    }
                } else {
                    $(`.collaborator-group-business-member-wrapper[data-business-id="${rec.data.notification_data.contact.business_id}"]`).find(`.collaborator-group-business-member-status`).text(`Status: rejected`);
                }
            }
        }
        //case:5 for the sending business update collaborator group list page
        // if ($('body').attr('app') == "collaborator_groups_list" && sessionStorage.getItem('account_id') == rec.data.account_id && sessionStorage.getItem('business_id') == rec.data.notification_data.owner.business_id) {
        if ($('body').attr('app') == "collaborator_groups_list" && sessionStorage.getItem('account_id') == rec.data.account_id) {
            digibiz.collaborator_groups_list = [];
            getCollaboratorGroupsListPage();
        }

        if ($('body').attr('app') == "communication_group_details") {
            if ($('#modal-communication-group-collaborator-group-selection').length > 0) {
                if (rec.data.hasOwnProperty('group_data') && rec.data.group_data && rec.data.group_data.status.status == "active" && rec.data.group_data.group_for == "collaborator") {
                    //console.log("2");
                    digibiz.communicationCreateCollaboratorGroupsList.push(rec.data.group_data);
                    processCommunicationGroupCreateCollaboratorGroupsList(digibiz.communicationCreateCollaboratorGroupsList, function () { });
                }
            }
        }
    },
    digibizBusinessNotificationRemove: function (rec) {
        //console.log("digibizBusinessNotificationRemove", rec);
        //case:1 for the receiving business 
        if ($('body').attr('app') == "business_management" && sessionStorage.getItem('account_id') == rec.data.account_id && sessionStorage.getItem('business_id') == rec.data.business_id) {
            businessManagementPage();
        }
        //case:2 for the receiving business notifications page
        if ($('body').attr('app') == "business_notifications" && sessionStorage.getItem('account_id') == rec.data.account_id && sessionStorage.getItem('business_id') == rec.data.business_id) {
            digibiz.business_notifications = [];
            getBusinessNotificationsPage();
        }
        //case:3 for the sending business collaborator contact list page
        if ($('body').attr('app') == "collaborator_contact_list" && sessionStorage.getItem('account_id') == rec.data.account_id) {
            if (sessionStorage.getItem('selected-collaborator-tab') == "active_collaborator") {
                digibiz.collaborator_contact_list = [];
                activeCollaboratorContactListPage();
            }
            if (sessionStorage.getItem('selected-collaborator-tab') == "pending_collaborator") {
                digibiz.pending_collaborator_contact_list = [];
                pendingCollaboratorContactListPage();
            }
        }

        //case:4 for the sending business notification details page
        if ($('body').attr('app') == "collaborator_contact_list_notification_details" && sessionStorage.getItem('collaborator_business_id') == rec.data.business_id) {
            digibiz.collaborator_contact_list_notification_details = [];
            getCollaboratorContactListNotificationDetailsPage();
        }
    },

    digibizBusinessNotificationExpire: function (rec) {
        //console.log("digibizBusinessNotificationExpire socket reached", rec);
        //Case:1 update in notification list page for the whom the notification was sent
        if ($('body').attr("app") == "business_notifications") {
            if (sessionStorage.getItem('business_id') == rec.data.contact.business_id) {
                digibiz.business_notifications = [];
                getBusinessNotificationsPage();
            }
        }
        //Case:2 update the count in the landing page for whom the notification was sent
        if ($('body').attr("app") == "business_management") {
            if (sessionStorage.getItem('business_id') == rec.data.contact.business_id) {
                if ($('.business_notification_count').text() == "" || $('.business_notification_count').text() == null || $('.business_notification_count').text() == undefined) {
                    // $('.digibiz_notification_count').text('1');
                    // $('.digibiz_notification_count').removeClass('hide');
                } else {
                    var getCount = $('.business_notification_count').text();
                    getCount--;
                    $('.business_notification_count').text(getCount);
                    $('.business_notification_count').removeClass('hide');
                }
            }
        }
        //Case:3 update in pending employee list in the notification sender side
        if ($('body').attr("app") == "collaborator_contact_list") {
            if (sessionStorage.getItem('selected-collaborator-tab') == "pending_collaborator") {
                digibiz.pending_collaborator_contact_list = [];
                pendingCollaboratorContactListPage();
            }
        }
        //case:4 for the sending business notification details page
        if ($('body').attr('app') == "collaborator_contact_list_notification_details" && sessionStorage.getItem('collaborator_business_id') == rec.data.contact.business_id) {
            digibiz.collaborator_contact_list_notification_details = [];
            getCollaboratorContactListNotificationDetailsPage();
        }
    },

    groupModeratorAdd: function (rec) {
        //console.log("groupModeratorAdd", rec)
        if ($('body').attr('app') == "communication_groups") {
            if (sessionStorage.getItem('selected-communication-group-type-tab') == "communication") {
                digibiz.communicationGroupsList = [];
                getCommunicationGroupsPage();
            } else if (sessionStorage.getItem('selected-communication-group-type-tab') == "employee") {
                digibiz.communicationEmployeeGroupsList = [];
                getCommunicationEmployeePage();
            } else if (sessionStorage.getItem('selected-communication-group-type-tab') == "customer") {
                digibiz.communicationCustomerGroupsList = [];
                getCommunicationCustomerPage();
            }
        }
        if ($('body').attr('app') == "communication_group_details") {
            getCommunicationGroupDetailPage();
            if ($('#modal-communication-group-employee-group-selection').length > 0) {
                //console.log("1");
                if (rec.data.group_for == "employee" && rec.data.status.status == "active") {
                    //console.log("2");
                    digibiz.communicationCreateEmployeeGroupsList.push(rec.data);
                    processCommunicationGroupCreateEmployeeGroupsList(digibiz.communicationCreateEmployeeGroupsList, function () { });
                }
            }
        }
        if ($('body').attr('app') == "employee_group_creation_list") {
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "standard") {
                digibiz.standard_employees_groups_list_page = [];
                standardEmployeesGroupsListPage();
            } else if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "custom") {
                digibiz.custom_employees_groups_list_page = [];
                customEmployeesGroupsListPage();
            }
        }
        if ($('body').attr('app') == "employee_group_create") {
            if (sessionStorage.getItem('group_id')) {
                employeeGroupCreationPage();
            }
        }
        if ($('body').attr('app') == "collaborator_group_details") {
            getCollaboratorGroupDetailsPage();
        }
        //Case:3 update in show access list of customer show access list    
        if ($('body').attr('app') == "customer_create") {
            if ($('#customer-access-show-modal').length > 0) {
                digibiz.show_customer_access_list = [];
                var requestParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "customer",
                    id: sessionStorage.getItem('customer_id')
                }
                getIdentifierItem(requestParams)
                    .then((result) => {
                        var reqParam = {
                            device_id: crossplat.device.uuid,
                            business_id: sessionStorage.getItem('business_id'),
                            type: "customer",
                            identifier_id: sessionStorage.getItem('identifier_id'),
                            identifier_item_id: result.id,
                            member_id: sessionStorage.getItem('customer_id'),
                        }
                        showAccessCustomerList(reqParam)
                            .then((response) => {
                                processCustomerShowAccessList(response, function () {
                                    removeLoader();
                                });
                            })
                            .catch((err) => { })
                    })
                    .catch((err) => { })
            }
            if ($('#associate-customer-access-show-modal').length > 0) {
                digibiz.show_associate_customer_access_list = [];
                var getAssociateCustomerId = $('#associate-customer-access-show-modal').attr('data-associate-customer-id');
                addLoader();
                var requestParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "associate_customer",
                    id: getAssociateCustomerId
                }
                getIdentifierItem(requestParams)
                    .then((result) => {
                        //console.log("result", result);
                        var getIdentifierIdData = result.data.find((e) => e.type == "associate_customer_identifier");
                        //console.log("getIdentifierIdData", getIdentifierIdData);
                        var reqParam = {
                            device_id: crossplat.device.uuid,
                            business_id: sessionStorage.getItem('business_id'),
                            type: "associate_customer",
                            identifier_id: getIdentifierIdData.identifier_id,
                            identifier_item_id: result.id,
                            member_id: getAssociateCustomerId,
                            parent_identifier_id: result.parent_customer_identifier_id
                        }
                        processAssociateCustomerShowAccessList(reqParam)
                            .then((response) => {
                            })
                            .catch((err) => {

                            })
                    })
                    .catch((err) => {

                    })
            }
        }
        //Case:4 update in show access list of employee show access list
        if ($('body').attr('app') == "employee_create") {
            if ($('#employee-access-show-modal').length > 0) {
                digibiz.show_employee_access_list = [];
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "employee",
                    member_id: sessionStorage.getItem('employee_id'),
                }
                showAccessEmployeeList(reqParam)
                    .then((response) => {
                        processEmployeeShowAccessList(response, function () {
                            removeLoader();
                        });
                    })
                    .catch((err) => { })
            }
        }
        //add to show access list pop-up
        // if ($('#customer-access-show-modal').length > 0) {
        //     var getData = rec.data;
        //     getData['access_data_type'] = "contact";
        //     digibiz.show_customer_access_list.push(getData);
        //     processCustomerShowAccessList(digibiz.show_customer_access_list, function () { })
        // }
    },

    groupModeratorDelete: function (rec) {
        //console.log("group moderator delete", rec);
        if ($('body').attr('app') == "employee_group_creation_list") {
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "standard") {
                digibiz.standard_employees_groups_list_page = [];
                standardEmployeesGroupsListPage();
            } else if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "custom") {
                digibiz.custom_employees_groups_list_page = [];
                customEmployeesGroupsListPage();
            }
        }
        if ($('body').attr('app') == "employee_group_create") {
            if (sessionStorage.getItem('group_id')) {
                employeeGroupCreationPage();
            }
        }
        if ($('body').attr('app') == "communication_groups") {
            if (sessionStorage.getItem('selected-communication-group-type-tab') == "communication") {
                digibiz.communicationGroupsList = [];
                getCommunicationGroupsPage();
            } else if (sessionStorage.getItem('selected-communication-group-type-tab') == "employee") {
                digibiz.communicationEmployeeGroupsList = [];
                getCommunicationEmployeePage();
            } else if (sessionStorage.getItem('selected-communication-group-type-tab') == "customer") {
                digibiz.communicationCustomerGroupsList = [];
                getCommunicationCustomerPage();
            }
        }
        if ($('body').attr('app') == "communication_group_details") {
            getCommunicationGroupDetailPage();
            if ($('#modal-communication-group-employee-group-selection').length > 0) {
                //console.log("11");
                if (rec.data.group_for == "employee" && rec.data.status.status == "draft") {
                    //console.log("22");
                    digibiz.communicationCreateEmployeeGroupsList = digibiz.communicationCreateEmployeeGroupsList.filter((e) => {
                        return e.id != rec.data.id
                    })
                    processCommunicationGroupCreateEmployeeGroupsList(digibiz.communicationCreateEmployeeGroupsList, function () { });
                }
            }
        }
        if ($('body').attr('app') == "collaborator_group_details") {
            getCollaboratorGroupDetailsPage();
        }
        //Case:3 update in show access list of customer show access list    
        if ($('body').attr('app') == "customer_create") {
            if ($('#customer-access-show-modal').length > 0) {
                digibiz.show_customer_access_list = [];
                var requestParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "customer",
                    id: sessionStorage.getItem('customer_id')
                }
                getIdentifierItem(requestParams)
                    .then((result) => {
                        var reqParam = {
                            device_id: crossplat.device.uuid,
                            business_id: sessionStorage.getItem('business_id'),
                            type: "customer",
                            identifier_id: sessionStorage.getItem('identifier_id'),
                            identifier_item_id: result.id,
                            member_id: sessionStorage.getItem('customer_id'),
                        }
                        showAccessCustomerList(reqParam)
                            .then((response) => {
                                processCustomerShowAccessList(response, function () {
                                    removeLoader();
                                });
                            })
                            .catch((err) => { })
                    })
                    .catch((err) => { })
            }
            if ($('#associate-customer-access-show-modal').length > 0) {
                digibiz.show_associate_customer_access_list = [];
                var getAssociateCustomerId = $('#associate-customer-access-show-modal').attr('data-associate-customer-id');
                addLoader();
                var requestParams = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "associate_customer",
                    id: getAssociateCustomerId
                }
                getIdentifierItem(requestParams)
                    .then((result) => {
                        //console.log("result", result);
                        var getIdentifierIdData = result.data.find((e) => e.type == "associate_customer_identifier");
                        //console.log("getIdentifierIdData", getIdentifierIdData);
                        var reqParam = {
                            device_id: crossplat.device.uuid,
                            business_id: sessionStorage.getItem('business_id'),
                            type: "associate_customer",
                            identifier_id: getIdentifierIdData.identifier_id,
                            identifier_item_id: result.id,
                            member_id: getAssociateCustomerId,
                            parent_identifier_id: result.parent_customer_identifier_id
                        }
                        processAssociateCustomerShowAccessList(reqParam)
                            .then((response) => {
                            })
                            .catch((err) => {

                            })
                    })
                    .catch((err) => {

                    })
            }
        }
        //Case:4 update in show access list of employee show access list
        if ($('body').attr('app') == "employee_create") {
            if ($('#employee-access-show-modal').length > 0) {
                digibiz.show_employee_access_list = [];
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    business_id: sessionStorage.getItem('business_id'),
                    type: "employee",
                    member_id: sessionStorage.getItem('employee_id'),
                }
                showAccessEmployeeList(reqParam)
                    .then((response) => {
                        processEmployeeShowAccessList(response, function () {
                            removeLoader();
                        });
                    })
                    .catch((err) => { })
            }
        }
    },

    employeeDepartmentDelete: function (rec) {
        //console.log("employeeDepartmentDelete", rec);
        if ($('body').attr('app') == "department_management") {
            digibiz.department_list = digibiz.department_list.filter((p) => {
                return p.id != rec.data.id;
            });
            $(`.department-wrapper[data-id="${rec.data.id}"]`).remove();
        }
        if ($('body').attr('app') == "employee_create") {
            digibiz.alreadySelectedDepartment = digibiz.alreadySelectedDepartment.filter((p) => {
                return p.id != rec.data.id;
            });
            $(`.employee-department-assignment-box[data-id="${rec.data.id}"]`).remove();
            if ($('#assign-employee-department-modal').length > 0) {
                //console.log("11")
                digibiz.department_list_selection = digibiz.department_list_selection.filter((p) => {
                    return p.id != rec.data.id;
                });
                //console.log("22", digibiz.department_list_selection)
                $(`.department-wrapper[data-id="${rec.data.id}"]`).remove();
            }
        }
        if ($('body').attr('app') == "employee_contact_list") {
            if ($('#department-wise-employees-list-modal').length > 0) {
                digibiz.department_list_selection = digibiz.department_list_selection.filter((p) => {
                    return p.id != rec.data.id;
                });
                $(`.department-wrapper[data-id="${rec.data.id}]"`).remove();
            }
        }
        if ($('body').attr('app') == "employee_group_creation_list") {
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "standard") {
                // digibiz.standard_employees_groups_list_page = digibiz.standard_employees_groups_list_page.filter((p) => {
                //     return p.department_data[0].id != rec.data.id;
                // });
                digibiz.standard_employees_groups_list_page = [];
                standardEmployeesGroupsListPage();
            } else if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "custom") {
                digibiz.custom_employees_groups_list_page = [];
                customEmployeesGroupsListPage();
            }
        }
        if ($('body').attr('app') == "employee_group_create") {
            // employeeGroupCreationPage();
            if ($('#employee-group-members-list').length > 0) {
                if (rec.data.std_grp.status.status == "pending" || rec.data.std_grp.status.status == "deleted") {
                    //console.log("222")
                    $('#employee-group-members-list').find(`.employee-group-member-wrapper[data-id="${rec.data.std_grp.id}"]`).remove();
                    $('#employee-group-members-list').find(`.custom-employee-group-member-wrapper[data-member-group-id="${rec.data.std_grp.id}"]`).remove();
                }
            }

            if (rec.data.hasOwnProperty('employee_groups') && rec.data.employee_groups && rec.data.employee_groups.length > 0) {
                //console.log("1111")
                $.each(rec.data.employee_groups, function (index, group) {
                    //console.log("222", group);
                    if (group.status.status == "pending" || group.status.status == "deleted") {
                        //console.log("3333")
                        if ($('#modal-standard-employee-group-selection').length > 0) {
                            $(`.standard-employee-group-select[data-id="${group.id}"]`).parents(`.standard-employee-group-selection-wrapper`).remove();
                        }
                        if (sessionStorage.getItem('group_id') == group.id) {
                            //console.log("444")
                            sessionStorage.removeItem('group_id');
                            sessionStorage.removeItem('group_type');
                            sessionStorage.removeItem('group_from');
                            location.hash = `employee_group_creation/list`;
                        }
                    }
                })
            }
        }
        if ($(`#modal-communication-group-activate-employee-group-employee-list-selection`).length > 0) {
            $.each(rec.data.employee_groups, function (index, group) {
                //console.log("asdfgh")
                $(`#modal-communication-group-activate-employee-group-employee-list-selection[data-group-id="${group.id}"]`).remove();
            })
            if (rec.data.std_grp.status.status == "pending" || rec.data.std_grp.status.status == "deleted") {
                if ($(`#modal-communication-group-activate-employee-group-employee-list-selection`).find(`.accordion-content[data-group-id="${rec.data.std_grp.id}"]`).length > 0) {
                    $(`#modal-communication-group-activate-employee-group-employee-list-selection`).find(`.accordion-content[data-group-id="${rec.data.std_grp.id}"]`).parents('.communication-groups-identifier-based-customer-contacts-item-wrapper').remove();
                }
            } else {
                //console.log("123", $(`#modal-communication-group-activate-employee-group-employee-list-selection`).find(`.accordion-content[data-group-id="${rec.data.std_grp.id}"]`).find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`))
                if ($(`#modal-communication-group-activate-employee-group-employee-list-selection`).find(`.accordion-content[data-group-id="${rec.data.std_grp.id}"]`).length > 0) {
                    $(`#modal-communication-group-activate-employee-group-employee-list-selection`).find(`.accordion-content[data-group-id="${rec.data.std_grp.id}"]`).find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).parents('.employee-selection-list-container').remove();
                }
            }
        }
        //case:6 update in communication groups page
        if ($('body').attr('app') == "communication_groups") {
            if (sessionStorage.getItem('selected-communication-group-type-tab') == "communication") {
                digibiz.communicationGroupsList = [];
                getCommunicationGroupsPage();
            }
        }
        //case:7 update in communication group detail page
        if ($('body').attr('app') == "communication_group_details") {
            if (sessionStorage.getItem('group_id')) {
                getCommunicationGroupDetailPage();//need to check
                if (rec.data.hasOwnProperty('employee_groups') && rec.data.employee_groups) {
                    $.each(rec.data.employee_groups, function (index, group) {
                        if (sessionStorage.getItem('group_id') == group.id) {
                            //console.log("444")
                            sessionStorage.removeItem('group_id');
                            sessionStorage.removeItem('group_type');
                            sessionStorage.removeItem('group_from');
                            location.hash = `communication/groups`;
                        }
                    })
                }
            } else {
                if (rec.data.hasOwnProperty('employee_groups') && rec.data.employee_groups) {
                    $.each(rec.data.employee_groups, function (index, group) {
                        if ($('#communication-group-employee-members-list').length > 0) {
                            if ($('#communication-group-employee-members-list').find(`.communication-group-employee-group-member-wrapper[data-id="${group.id}"]`).length > 0) {
                                $('#communication-group-employee-members-list').find(`.communication-group-employee-group-member-wrapper[data-id="${group.id}"]`).remove();
                            }
                        }
                        if (sessionStorage.getItem('group_id') == group.id) {
                            //console.log("444")
                            sessionStorage.removeItem('group_id');
                            sessionStorage.removeItem('group_type');
                            sessionStorage.removeItem('group_from');
                            location.hash = `communication/groups`;
                        }
                    })
                }
            }
            if ($('#modal-communication-group-employee-group-selection').length > 0) {
                if (rec.data.hasOwnProperty('employee_groups') && rec.data.employee_groups) {
                    $.each(rec.data.employee_groups, function (index, group) {
                        $(`.group-selection-wrapper[data-group-id="${group.id}"]`).remove();
                    })
                }
            }
        }
        if ($(`#modal-communication-group-activate-employee-group-employee-list-selection[data-group-id="${rec.data.std_grp.id}"]`).length > 0) {
            if ($(`#modal-communication-group-activate-employee-group-employee-list-selection[data-group-id="${rec.data.std_grp.id}"]`).find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).length > 0) {
                $(`#modal-communication-group-activate-employee-group-employee-list-selection[data-group-id="${rec.data.std_grp.id}"]`).find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.dj_unique_employee_id}"]`).parents('.employee-selection-list-container').remove();
            }
        }
    },



    storageUpdate: function (rec) {
        //console.log("storageUpdate", rec);
        let current_route = $("body").attr('app');
        removeLoader();
        if (rec.device_id != crossplat.device.uuid) {
            switch (rec.data.active_storage) {
                case "Onedrive":

                    Materialize.toast(rec.data.active_storage + "is set as default storage. And is active now", 3000, 'success-alert');

                    // $('.card-custom').removeClass('active');
                    // $('.card-custom').addClass('not-active');
                    // $('.monedrive-wrapper').find('.card-custom').removeClass('not-active');
                    // $('.monedrive-wrapper').find('.card-custom').addClass('active');
                    // $('.activate-storage').removeClass('disabled');
                    // $('.activate-storage').text('ACTIVATE');

                    // $('.monedrive-wrapper .activate-storage').addClass('disabled');
                    // $('.monedrive-wrapper .activate-storage').text('ACTIVATED');

                    break;
                case "GoogleDrive":

                    Materialize.toast(rec.data.active_storage + "is set as default storage. And is active now.", 3000, 'success-alert');

                    // $('.card-custom').removeClass('active');
                    // $('.card-custom').addClass('not-active');
                    // $('.gdrive-wrapper').find('.card-custom').removeClass('not-active');
                    // $('.gdrive-wrapper').find('.card-custom').addClass('active');
                    // $('.activate-storage').removeClass('disabled');
                    // $('.activate-storage').text('ACTIVATE');

                    // $('.gdrive-wrapper .activate-storage').addClass('disabled');
                    // $('.gdrive-wrapper .activate-storage').text('ACTIVATED');

                    break;
                case "DropBox":

                    Materialize.toast(rec.data.active_storage + "is set as default storage. And is active now.", 3000, 'success-alert');

                    // $('.card-custom').removeClass('active');
                    // $('.card-custom').addClass('not-active');
                    // $('.dropbox-wrapper').find('.card-custom').removeClass('not-active');
                    // $('.dropbox-wrapper').find('.card-custom').addClass('active');
                    // $('.activate-storage').removeClass('disabled');
                    // $('.activate-storage').text('ACTIVATE');

                    // $('.dropbox-wrapper .activate-storage').addClass('disabled');
                    // $('.dropbox-wrapper .activate-storage').text('ACTIVATED');

                    break;
                case "DJ":

                    Materialize.toast(rec.data.active_storage + "is set as default storage. And is active now.", 3000, 'success-alert');

                    // $('.card-custom').removeClass('active');
                    // $('.card-custom').addClass('not-active');
                    // $('.dj-btn-container').find('.card-custom').removeClass('not-active');
                    // $('.dj-btn-container').find('.card-custom').addClass('active');
                    // $('.activate-storage').removeClass('disabled');
                    // $('.activate-storage').text('ACTIVATE');

                    // $('.dj-btn-container .activate-storage').addClass('disabled');
                    // $('.dj-btn-container .activate-storage').text('ACTIVATED');

                    break;
                default:
                    break;
            }
        }
    },

    adminDelete: function (rec) {
        //console.log("adminDelete", rec);
        if ($('body').attr('app') == "business_settings" && sessionStorage.getItem('selected-business-settings-tab') == "digibiz_admin" && rec.data.type == "digibiz_admin") {
            businessDigibizAdminsTab()
        } else if ($('body').attr('app') == "business_settings" && sessionStorage.getItem('selected-business-settings-tab') == "module_admin" && rec.data.type == "module_admin") {
            businessModuleAdminsTab()
        }
        if ($('body').attr('app') == "module_admin_list" && sessionStorage.getItem('selected-business-settings-tab') == "module_admin" && rec.data.type == "module_admin") {
            moduleAdminListPage();
        }
        //Case:2 update business owner role business list page
        if ($('body').attr("app") == "business_owner_business_list" && sessionStorage.getItem('account_id') == rec.data.owner_data.account_id) {
            digibiz.business_owner_business_list = [];
            // businessOwnerBusinessListPage();
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "my_business"
            }
            businessList(reqParam)
                .then((response) => {
                    processBusinessOwnerBusinessList(response, function () {
                    });
                })
                .catch((err) => {
                })
        }
        //Case:3 should show access revoked message
        if (sessionStorage.getItem('account_id') == rec.data.owner_data.account_id && sessionStorage.getItem('business_role') == "digibiz_admin" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            Materialize.toast(`You're access as digibiz-admin has been removed.`, 3000, 'round error-alert');

            // digibiz.business_owner_business_list = [];
            // location.hash = `business_owner/business/list`;
            // $('#alert-digibiz-admin-access-revoked').remove();

            //get all the required sessions and clear all and then set them again
            // var getAccountID = sessionStorage.getItem('account_id');
            // var userId = sessionStorage.getItem('user_id');
            // var DigibizRole = sessionStorage.getItem('digibiz_role');
            // var socketId = sessionStorage.getItem('socketID');
            // var UUID = sessionStorage.getItem('uuid');
            // var profileDetails = sessionStorage.getItem('profile_details');
            // sessionStorage.clear();
            // sessionStorage.setItem('user_id', userId);
            // sessionStorage.setItem('digibiz_role', DigibizRole);
            // sessionStorage.setItem('account_id', getAccountID);
            // sessionStorage.setItem('socketID', socketId);
            // sessionStorage.setItem('uuid', UUID);
            // sessionStorage.setItem('profile_details', profileDetails);

            var alert_parms = {
                alert_id: "alert-digibiz-admin-access-revoked",
                alert_platform: crossplat.device.platform,
                alert_title: `Alert`,
                alert_body: `Your access to this business as digibiz admin has been revoked.Click ok to continue.`,
                alert_btn: [{
                    name: "OK",
                    attr: [{ name: "id", value: "btn-digibiz-admin-access-revoked-ok" }]
                }]
            }
            showAlert(alert_parms, function () {
            });
        } else if (sessionStorage.getItem('account_id') == rec.data.owner_data.account_id && sessionStorage.getItem('business_role') == "module_admin" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            Materialize.toast(`You're access as module-admin has been removed.`, 3000, 'round error-alert');
            var alert_parms = {
                alert_id: "alert-digibiz-admin-access-revoked",
                alert_platform: crossplat.device.platform,
                alert_title: `Alert`,
                alert_body: `Your access to this business as module admin has been revoked.Click ok to continue.`,
                alert_btn: [{
                    name: "OK",
                    attr: [{ name: "id", value: "btn-digibiz-admin-access-revoked-ok" }]
                }]
            }
            showAlert(alert_parms, function () {
            });
        }
    },

    digibizBusinessLogout: function (rec) {
        //console.log("digibizBusinessLogout", rec);
        if (sessionStorage.getItem('digibiz_role') == rec.data.role && sessionStorage.getItem('business_id') == rec.data.business_id && sessionStorage.getItem('account_id') == rec.data.owner.id) {
            sessionStorage.removeItem('business_id');
            sessionStorage.removeItem('employee_id');
            // location.hash = `employee/business/list`;
            location.hash = `employee/business/list`;
        }
    },

    employeeIdentityPicture: function (rec) {
        //console.log("employeeIdentityPicture", rec);
        var avtarUrl = `${api.get_employee_identity_picture}?id=${rec.data.record_data.dj_unique_employee_id}&device_id=${crossplat.device.uuid}&image_id=${rec.data.record_data.identity_picture.thumbnail}`;
        if ($('body').attr('app') == "customer_creation_active_list" && sessionStorage.getItem('business_id') == rec.data.record_data.business_id) {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_active") {
                $(`.active-customer-wrapper[data-customer-id="${rec.data.record_data.id}"]`).find('.profile-pic-container img').attr('src', avtarUrl);
            }
        }
        if ($('body').attr('app') == "customer_groups_details" && sessionStorage.getItem('business_id') == rec.data.record_data.business_id) {
            $(`.custom-customer-group-member-wrapper[data-customer-id="${rec.data.record_data.id}"][data-customer-type="customer"]`).find('.contact-profile-container img').attr('src', avtarUrl);
        }
        if ($('body').attr('app') == "communication_group_details" && sessionStorage.getItem('business_id') == rec.data.record_data.business_id) {
            $(`.communication-group-moderator-member-wrapper[data-id="${rec.data.record_data.id}"][data-type="customer"]`).find('.contact-profile-container img').attr('src', avtarUrl);
            $(`.communication-group-member-wrapper[data-customer-id="${rec.data.record_data.id}"][data-type="customer"]`).find('.contact-profile-container img').attr('src', avtarUrl);
        }
    },

    customerIdentityPicture: function (rec) {
        //console.log("customerIdentityPicture", rec);
        var avtarUrl = `${api.get_customer_identity_picture}?id=${rec.data.record_data.id}&device_id=${crossplat.device.uuid}&image_id=${rec.data.record_data.identity_picture.thumbnail}`;
        if ($('body').attr('app') == "customer_creation_active_list" && sessionStorage.getItem('business_id') == rec.data.record_data.business_id) {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_active") {
                $(`.active-customer-wrapper[data-customer-id="${rec.data.record_data.id}"]`).find('.profile-pic-container img').attr('src', avtarUrl);
            }
        }
        if ($('body').attr('app') == "customer_groups_details" && sessionStorage.getItem('business_id') == rec.data.record_data.business_id) {
            $(`.custom-customer-group-member-wrapper[data-customer-id="${rec.data.record_data.id}"][data-customer-type="customer"]`).find('.contact-profile-container img').attr('src', avtarUrl);
        }
        if ($('body').attr('app') == "communication_group_details" && sessionStorage.getItem('business_id') == rec.data.record_data.business_id) {
            $(`.communication-group-moderator-member-wrapper[data-id="${rec.data.record_data.id}"][data-type="customer"]`).find('.contact-profile-container img').attr('src', avtarUrl);
            $(`.communication-group-member-wrapper[data-customer-id="${rec.data.record_data.id}"][data-type="customer"]`).find('.contact-profile-container img').attr('src', avtarUrl);
        }
    },

    customerIdentityPictureRemoved: function (rec) {
        //console.log("customerIdentityPictureRemoved", rec);
        var getImageLetter = rec.data.record_data.name.first.charAt(0);
        if ($('body').attr('app') == "customer_creation_active_list" && sessionStorage.getItem('business_id') == rec.data.record_data.business_id) {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_active") {
                $(`.active-customer-wrapper[data-customer-id="${rec.data.record_data.id}"]`).find('.profile-pic-container img').attr('src', '');
                $(`.active-customer-wrapper[data-customer-id="${rec.data.record_data.id}"]`).find('.profile-pic-container span').text(getImageLetter);
            }
        }
        if ($('body').attr('app') == "customer_groups_details" && sessionStorage.getItem('business_id') == rec.data.record_data.business_id) {
            $(`.custom-customer-group-member-wrapper[data-customer-id="${rec.data.record_data.id}"][data-customer-type="customer"]`).find('.contact-profile-container img').attr('src', '');
            $(`.custom-customer-group-member-wrapper[data-customer-id="${rec.data.record_data.id}"][data-customer-type="customer"]`).find('.contact-profile-container span').text(getImageLetter);
        }
        if ($('body').attr('app') == "communication_group_details" && sessionStorage.getItem('business_id') == rec.data.record_data.business_id) {
            $(`.communication-group-moderator-member-wrapper[data-id="${rec.data.record_data.id}"][data-type="customer"]`).find('.contact-profile-container img').attr('src', '');
            $(`.communication-group-moderator-member-wrapper[data-id="${rec.data.record_data.id}"][data-type="customer"]`).find('.contact-profile-container span').text(getImageLetter);
            $(`.communication-group-member-wrapper[data-customer-id="${rec.data.record_data.id}"][data-type="customer"]`).find('.contact-profile-container img').attr('src', '');
            $(`.communication-group-member-wrapper[data-customer-id="${rec.data.record_data.id}"][data-type="customer"]`).find('.contact-profile-container span').text(getImageLetter);
        }
    },

    AssociateCustomerIdentityPicture: function (rec) {
        //console.log("AssociateCustomerIdentityPicture", rec);
        var avtarUrl = `${api.get_associate_customer_identity_picture}?id=${rec.data.record_data.id}&device_id=${crossplat.device.uuid}&image_id=${rec.data.record_data.identity_picture.thumbnail}`;
        if ($('body').attr('app') == "customer_create") {
            if ($(`.customer-associate-customer-assignment-box[data-id="${rec.data.record_data.id}"]`).length > 0) {
                $(`.customer-associate-customer-assignment-box[data-id="${rec.data.record_data.id}"]`).find('.profile-pic-container img').attr('src', avtarUrl);
            }
        }
        if ($('body').attr('app') == "customer_creation_active_list" && sessionStorage.getItem('business_id') == rec.data.record_data.business_id) {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_active") {
                $(`.active-customer-wrapper[data-customer-id="${rec.data.record_data.id}"]`).find('.profile-pic-container img').attr('src', avtarUrl);
            }
        }
        if ($('body').attr('app') == "customer_groups_details" && sessionStorage.getItem('business_id') == rec.data.record_data.business_id) {
            $(`.custom-customer-group-member-wrapper[data-customer-id="${rec.data.record_data.id}"][data-customer-type="customer"]`).find('.contact-profile-container img').attr('src', avtarUrl);
        }
        if ($('body').attr('app') == "communication_group_details" && sessionStorage.getItem('business_id') == rec.data.record_data.business_id) {
            $(`.communication-group-moderator-member-wrapper[data-id="${rec.data.record_data.id}"][data-type="customer"]`).find('.contact-profile-container img').attr('src', avtarUrl);
            $(`.communication-group-member-wrapper[data-customer-id="${rec.data.record_data.id}"][data-type="customer"]`).find('.contact-profile-container img').attr('src', avtarUrl);
        }
    },

    AssociateCustomerIdentityPictureRemoved: function (rec) {
        //console.log("AssociateCustomerIdentityPictureRemoved", rec);
        var getImageLetter = rec.data.record_data.name.first.charAt(0);
        if ($('body').attr('app') == "customer_create") {
            if ($(`.customer-associate-customer-assignment-box[data-id="${rec.data.record_data.id}"]`).length > 0) {
                $(`.customer-associate-customer-assignment-box[data-id="${rec.data.record_data.id}"]`).find('.profile-pic-container img').attr('src', '');
                $(`.customer-associate-customer-assignment-box[data-id="${rec.data.record_data.id}"]`).find('.profile-pic-container span').text(getImageLetter);
            }
        }
        if ($('body').attr('app') == "customer_creation_active_list" && sessionStorage.getItem('business_id') == rec.data.record_data.business_id) {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_active") {
                $(`.active-customer-wrapper[data-customer-id="${rec.data.record_data.id}"]`).find('.profile-pic-container img').attr('src', '');
                $(`.active-customer-wrapper[data-customer-id="${rec.data.record_data.id}"]`).find('.profile-pic-container span').text(getImageLetter);
            }
        }
        if ($('body').attr('app') == "customer_groups_details" && sessionStorage.getItem('business_id') == rec.data.record_data.business_id) {
            $(`.custom-customer-group-member-wrapper[data-customer-id="${rec.data.record_data.id}"][data-customer-type="customer"]`).find('.contact-profile-container img').attr('src', '');
            $(`.custom-customer-group-member-wrapper[data-customer-id="${rec.data.record_data.id}"][data-customer-type="customer"]`).find('.contact-profile-container span').text(getImageLetter);
        }
        if ($('body').attr('app') == "communication_group_details" && sessionStorage.getItem('business_id') == rec.data.record_data.business_id) {
            $(`.communication-group-moderator-member-wrapper[data-id="${rec.data.record_data.id}"][data-type="customer"]`).find('.contact-profile-container img').attr('src', '');
            $(`.communication-group-moderator-member-wrapper[data-id="${rec.data.record_data.id}"][data-type="customer"]`).find('.contact-profile-container span').text(getImageLetter);
            $(`.communication-group-member-wrapper[data-customer-id="${rec.data.record_data.id}"][data-type="customer"]`).find('.contact-profile-container img').attr('src', '');
            $(`.communication-group-member-wrapper[data-customer-id="${rec.data.record_data.id}"][data-type="customer"]`).find('.contact-profile-container span').text(getImageLetter);
        }
    },


    reassignCustomer: function (rec) {
        //console.log("reassignCustomer", rec);
        if ($('body').attr("app") == "customer_creation_active_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-tab') == "customer_active") {
                digibiz.customer_creation_active_list = [];
                activeCustomerCreationListPage();
            }
        }
        //Case:2 update in customer contact list module-contacts list page (step-3)
        if ($('body').attr('app') == "customer_contact_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            digibiz.contacts_list = [];
            getCustomerContactListPage()
        }
        //Case:3 update in customer groups sub-module(in standard tab) -> customer groups list page
        if ($('body').attr('app') == "customer_groups_list" && sessionStorage.getItem('business_id') == rec.data.business_id) {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "standard") {
                digibiz.groups_list = [];
                getCustomerGroupsListPage();
            }
        }
        //Case:8 update in customer groups module
        if ($('body').attr('app') == "customer_groups_identifiers_list") {
            if (sessionStorage.getItem('selected-customer-group-type-tab') == "custom") {
                digibiz.custom_groups_list = [];
                customCustomerGroupsListPage();
            }
        }
        //check modal is present-group list
        if ($('#modal-communication-group-customer-group-selection').length > 0) {
            var reqParam = {
                device_id: crossplat.device.uuid,
                type: "customer",
                list_by: "draft_active_customer_groups",
                business_id: sessionStorage.getItem('business_id')
            }
            groupsList(reqParam)
                .then((response) => {
                    digibiz.communicationCreateCustomersGroupsList = [];
                    processCommunicationGroupCreateCustomerGroupsList(response, function () {
                        setTimeout(function () {
                            // listenForSurveyViewersUserScrollEvent($(".modal-popup-content"));
                        }, 0);
                    });
                })
                .catch((err) => {
                    //console.log("error in socket");
                })
        }
    },

    collaboratorContactDelete: function (rec) {
        //case:1 collaborator contact list page
        if ($('body').attr('app') == "collaborator_contact_list" && sessionStorage.getItem('business_id') == rec.data.contact_data.owner.business_id) {
            if (sessionStorage.getItem('selected-collaborator-tab') == "active_collaborator") {
                digibiz.collaborator_contact_list = [];
                activeCollaboratorContactListPage();
            }
        }
        //case:2 collaborator group list page
        if ($('body').attr('app') == "collaborator_groups_list" && sessionStorage.getItem('business_id') == rec.data.contact_data.owner.business_id) {
            digibiz.collaborator_groups_list = [];
            getCollaboratorGroupsListPage();
        }
        if ($('body').attr('app') == "collaborator_group_create" || $('body').attr('app') == "collaborator_group_details") {
            if (rec.data.hasOwnProperty('deleted_groups') && rec.data.deleted_groups) {
                $.each(rec.data.deleted_groups, function (index, group) {
                    //console.log("group", group);
                    if (sessionStorage.getItem('group_id') == group.id) {
                        Materialize.toast("Group Deleted.", 3000, 'round error-alert');
                        sessionStorage.removeItem('group_id');
                        location.hash = `collaborator/groups/list`;
                    }
                })
            }
            if ($('#modal-collaborator-group-contact-list-selection').length > 0) {
                $(`.collaborator-contact-selection-list-container[data-business-id="${rec.data.contact_data.business_id}"]`).remove();
            }
            $(`.collaborator-group-member-wrapper[data-contact-id="${rec.data.contact_data.id}"]`).remove();
        }
        if ($('body').attr('app') == "communication_group_details") {
            if ($('#modal-communication-group-collaborator-group-selection').length > 0) {
                if (rec.data.hasOwnProperty('deleted_groups') && rec.data.deleted_groups) {
                    $.each(rec.data.deleted_groups, function (index, group) {
                        //console.log("group", group);
                        digibiz.communicationCreateCollaboratorGroupsList = digibiz.communicationCreateCollaboratorGroupsList.filter((e) => {
                            return e.id != group.id;
                        });
                        processCommunicationGroupCreateCollaboratorGroupsList(digibiz.communicationCreateCollaboratorGroupsList, function () { });
                    })
                }
            }
        }
        if ($('body').attr('app') == "business_notifications") {
            digibiz.business_notifications = [];
            getBusinessNotificationsPage();
        }

    },

    collaboratorContactAdd: function (rec) {
        //console.log("collaboratorContactAdd", rec);
        if ($('body').attr('app') == "collaborator_contact_list" && sessionStorage.getItem('business_id') == rec.data.contact_data.owner.business_id) {
            if (sessionStorage.getItem('selected-collaborator-tab') == "active_collaborator") {
                digibiz.collaborator_contact_list = [];
                activeCollaboratorContactListPage();
            }
        }
        //add the business in the collaborator group creation page(business members selection pop-up)
        if ($('body').attr('app') == "collaborator_group_create" || $('body').attr('app') == "collaborator_group_details") {
            if ($('#modal-collaborator-group-contact-list-selection').length > 0) {
                //console.log("modal is open")
                if (rec.data.contact_data.status.status == "active") {//check if contact is active
                    if (rec.data.hasOwnProperty('business_data') && rec.data.business_data) {
                        if (rec.data.business_data.hasOwnProperty('display_picture') && rec.data.business_data.display_picture) {
                            if (rec.data.business_data.display_picture.hasOwnProperty('thumbnail') && rec.data.business_data.display_picture.thumbnail) {
                                var avtarUrl = `${api.get_business_multimedia}?business_id=${rec.data.business_data.id}&device_id=${crossplat.device.uuid}&image_id=${rec.data.business_data.display_picture.thumbnail}`;
                                rec.data.business_data.display_picture['avtarUrl'] = avtarUrl;
                                rec.data.business_data['imageLetter'] = rec.data.business_data.name.charAt(0);
                            } else {
                                rec.data.business_data['imageLetter'] = rec.data.business_data.name.charAt(0);
                            }
                        } else {
                            rec.data.business_data['imageLetter'] = rec.data.business_data.name.charAt(0);
                        }
                    } else {
                        rec.data.business_data['imageLetter'] = rec.data.business_data.name.charAt(0);
                    }
                    var getData = {
                        collaboratorContact: rec.data.contact_data,
                        business_data: rec.data.business_data
                    };
                    //console.log("not present collaboratorContact so add", getData);
                    fetch.appendHtml(function () {
                    }, "layouts/template_elements/collaborator_business_contact_add_template", "#collaborator-group-business-contact-add-template", `#modal-collaborator-group-contact-list-selection .collaborator-contact-selection-list`, getData);
                }
            }
        }
    },

    groupImageUpdate: function (rec) {
        //console.log("groupImageUpdate", rec);
        var group = rec.data.record_data;
        if (group.hasOwnProperty('group_image') && group.group_image) {
            if (group.group_image.hasOwnProperty('thumbnail') && group.group_image.thumbnail) {
                var avtarUrl = `${api.get_group_image}?device_id=${crossplat.device.uuid}&id=${group.id}&image_id=${group.group_image.thumbnail}`;
                $(`.group_img[data-group-id="${group.id}"]`).attr('src', avtarUrl);
            }
        }
    },

    groupImageRemove: function (rec) {
        //console.log("groupImageRemove", rec);
        var group = rec.data.record_data;
        $(`.group_img[data-group-id="${group.id}"]`).attr('src', "");
        $(`.group_img[data-group-id="${group.id}"]`).siblings('span').text(group.name.charAt(0))
    },

    access_revoke: function (rec) {
        //console.log("access_revoke", rec);
        if (rec.data.type == "employee") {
            digibiz.show_employee_access_list = digibiz.show_employee_access_list.filter((e) => e.id != rec.data.id);
            //remove from show access list pop-up
            if ($('#employee-access-show-modal').length > 0) {
                $(`.employee-access-employee-wrapper[data-id="${rec.data.id}"]`).remove();
            }
            if ($(`#customer-contact-add-access-for-employee-contact-selection-modal`).length > 0) {
                if (rec.data.access_for == "customer_contact") {
                    if (rec.data.access_data.id == sessionStorage.getItem('identifier_item_id')) {
                        $(`.customer-contact-access-employee-wrapper[data-id="${rec.data.member_id}"]`).remove();
                    }
                }
            }
        }
        if (rec.data.type == "customer") {
            //remove from show access list pop-up
            if ($('#customer-access-show-modal').length > 0) {
                digibiz.show_customer_access_list = digibiz.show_customer_access_list.filter((e) => e.id != rec.data.id);
                $(`.customer-access-customer-wrapper[data-id="${rec.data.id}"]`).remove();
            }
        }
    },

    add_contact_access: function (rec) {
        //console.log("add_contact_access", rec);
        if (rec.data.type == "employee") {
            //remove from show access list pop-up
            if ($('#employee-access-show-modal').length > 0) {
                var getData = rec.data;
                getData['access_data_type'] = "contact";
                digibiz.show_employee_access_list.push(getData);
                processEmployeeShowAccessList(digibiz.show_employee_access_list, function () { })
            }
            if ($(`#customer-contact-add-access-for-employee-contact-selection-modal`).length > 0) {
                if (rec.data.access_for == "customer_contact") {
                    if (rec.data.access_data.id == sessionStorage.getItem('identifier_item_id')) {
                        //console.log("check now");
                        var reqParam = {
                            device_id: crossplat.device.uuid,
                            business_id: sessionStorage.getItem('business_id'),
                            access_to: sessionStorage.getItem('identifier_id'),
                            access_data_id: sessionStorage.getItem('identifier_item_id')
                        }
                        identifierItemsEmployeesAccessList(reqParam)
                            .then((response) => {
                                digibiz.customer_employee_contact_access_selection = [];
                                digibiz.customer_employee_contact_access_selection = response;
                                processCustomerEmployeeContactAccessSelection(digibiz.customer_employee_contact_access_selection, function () { })
                            })
                            .catch((err) => {
                                //console.log("err", err);
                            })
                    }
                }
            }
        }
        if (rec.data.type == "customer") {
            //add to show access list pop-up
            if ($('#customer-access-show-modal').length > 0) {
                var getData = rec.data;
                getData['access_data_type'] = "contact";
                digibiz.show_customer_access_list.push(getData);
                processCustomerShowAccessList(digibiz.show_customer_access_list, function () { })
            }
        }
    },

    businessInactivateStart: function (rec) {
        //console.log("businessInactivateStart", rec);
        if (sessionStorage.getItem('business_id') == rec.data.id && sessionStorage.getItem('digibiz_role') == "business_owner") {
            Materialize.toast(`${rec.data.name} inactivated.`, 3000, 'round error-alert');
            // location.hash = `business_owner/business/list`;
            location.hash = `business_owner/business/list`;
        }
        if ($('body').attr('app') == "business_owner_business_list") {
            digibiz.business_owner_business_list = [];
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "my_business"
            }
            businessList(reqParam)
                .then((response) => {
                    Materialize.toast(`${rec.data.name} inactivated.`, 3000, 'round error-alert');
                    processBusinessOwnerBusinessList(response, function () { });
                })
                .catch((err) => {
                })
        } else {
            //update global array of business admin role business list, if this business is present
            var getBusinessAdminRoleBusiness = digibiz.business_owner_business_list.findIndex(e => e.id == rec.data.id);
            if (getBusinessAdminRoleBusiness != -1) {
                businessAdminBusinessListHelperMethod();
                // var reqParam = {
                //     device_id: crossplat.device.uuid,
                //     list_by: "my_business"
                // }
                // businessList(reqParam)
                //     .then((response) => {
                //         digibiz.business_owner_business_list = removeDuplicates(digibiz.business_owner_business_list.concat(response), "id");
                //     })
                //     .catch((err) => {
                //     })
            }
        }

        if (sessionStorage.getItem('digibiz_role') == "employee" && $('body').attr('app') == "employee_business_list") {
            digibiz.employee_business_list = [];
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "employee"
            }
            businessList(reqParam)
                .then((response) => {
                    Materialize.toast(`${rec.data.name} inactivated.`, 3000, 'round error-alert');
                    processEmployeeBusinessList(response, function () { });
                })
                .catch((err) => {
                })
        } else {
            //update global array of employee role business list, if this business is present
            var getEmployeeRoleBusiness = digibiz.employee_business_list.findIndex(e => e.id == rec.data.id);
            if (getEmployeeRoleBusiness != -1) {
                employeeBusinessListHelperMethod();
                // var reqParam = {
                //     device_id: crossplat.device.uuid,
                //     list_by: "employee"
                // }
                // businessList(reqParam)
                //     .then((response) => {
                //         digibiz.employee_business_list = removeDuplicates(digibiz.employee_business_list.concat(response), "id");
                //     })
                //     .catch((err) => {
                //     })
            }
        }

        if (sessionStorage.getItem('digibiz_role') == "employee" && $('body').attr('app') != "employee_business_list") {
            // location.hash = `employee/business/list`;
            location.hash = `employee/business/list`;
            Materialize.toast(`${rec.data.name} inactivated.`, 3000, 'round error-alert');
        }

        if (sessionStorage.getItem('digibiz_role') == "customer" && $('body').attr('app') == "customer_business_list") {
            digibiz.customer_business_list = [];
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "customer"
            }
            businessList(reqParam)
                .then((response) => {
                    Materialize.toast(`${rec.data.name} inactivated.`, 3000, 'round error-alert');
                    processCustomerBusinessList(response, function () { });
                })
                .catch((err) => {
                })
        } else {
            //update global array of employee role business list, if this business is present
            var getCustomerRoleBusiness = digibiz.customer_business_list.findIndex(e => e.id == rec.data.id);
            if (getCustomerRoleBusiness != -1) {
                // var reqParam = {
                //     device_id: crossplat.device.uuid,
                //     list_by: "customer"
                // }
                // businessList(reqParam)
                //     .then((response) => {
                //         digibiz.customer_business_list = removeDuplicates(digibiz.customer_business_list.concat(response), "id");
                //     })
                //     .catch((err) => {
                //     })
                customerBusinessListHelperMethod();
                associateCustomerModuleListHelperMethod();
            }
        }

        if (sessionStorage.getItem('digibiz_role') == "customer" && $('body').attr('app') != "customer_business_list") {
            // location.hash = `customer/business/list`;
            location.hash = `customer/business/list`;
            Materialize.toast(`${rec.data.name} inactivated.`, 3000, 'round error-alert');
        }
    },

    businessInactivateEnd: function (rec) {
        //console.log("businessInactivateEnd", rec);
        if (sessionStorage.getItem('business_id') == rec.data.id && sessionStorage.getItem('digibiz_role') == "business_owner") {
            Materialize.toast(`${rec.data.name} activated.`, 3000, 'round success-alert');
            // location.hash = `business_owner/business/list`;
            $('#alert-business-owner-inactive-ok').remove();
        }
        if ($('body').attr('app') == "business_owner_business_list") {
            digibiz.business_owner_business_list = [];
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "my_business"
            }
            businessList(reqParam)
                .then((response) => {
                    Materialize.toast(`${rec.data.name} activated.`, 3000, 'round error-alert');
                    processBusinessOwnerBusinessList(response, function () { });
                })
                .catch((err) => {
                })
        } else {
            //update global array of business admin role business list, if this business is present
            var getBusinessAdminRoleBusiness = digibiz.business_owner_business_list.findIndex(e => e.id == rec.data.id);
            if (getBusinessAdminRoleBusiness != -1) {
                businessAdminBusinessListHelperMethod();
                // var reqParam = {
                //     device_id: crossplat.device.uuid,
                //     list_by: "my_business"
                // }
                // businessList(reqParam)
                //     .then((response) => {
                //         digibiz.business_owner_business_list = removeDuplicates(digibiz.business_owner_business_list.concat(response), "id");
                //     })
                //     .catch((err) => {
                //     })
            }
        }

        if (sessionStorage.getItem('digibiz_role') == "employee" && $('body').attr('app') == "employee_business_list") {
            digibiz.employee_business_list = [];
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "employee"
            }
            businessList(reqParam)
                .then((response) => {
                    Materialize.toast(`${rec.data.name} activated.`, 3000, 'round error-alert');
                    processEmployeeBusinessList(response, function () { });
                })
                .catch((err) => {
                })
        } else {
            //update global array of employee role business list, if this business is present
            var getEmployeeRoleBusiness = digibiz.employee_business_list.findIndex(e => e.id == rec.data.id);
            if (getEmployeeRoleBusiness != -1) {
                employeeBusinessListHelperMethod();
                // var reqParam = {
                //     device_id: crossplat.device.uuid,
                //     list_by: "employee"
                // }
                // businessList(reqParam)
                //     .then((response) => {
                //         digibiz.employee_business_list = removeDuplicates(digibiz.employee_business_list.concat(response), "id");
                //     })
                //     .catch((err) => {
                //     })
            }
        }

        if (sessionStorage.getItem('digibiz_role') == "employee" && $('body').attr('app') != "employee_business_list") {
            // location.hash = `employee/business/list`;
            location.hash = `employee/business/list`;
            Materialize.toast(`${rec.data.name} activated.`, 3000, 'round error-alert');
        }

        if (sessionStorage.getItem('digibiz_role') == "customer" && $('body').attr('app') == "customer_business_list") {
            digibiz.customer_business_list = [];
            var reqParam = {
                device_id: crossplat.device.uuid,
                list_by: "customer"
            }
            businessList(reqParam)
                .then((response) => {
                    Materialize.toast(`${rec.data.name} activated.`, 3000, 'round error-alert');
                    processCustomerBusinessList(response, function () { });
                })
                .catch((err) => {
                })
        } else {
            //update global array of employee role business list, if this business is present
            var getCustomerRoleBusiness = digibiz.customer_business_list.findIndex(e => e.id == rec.data.id);
            if (getCustomerRoleBusiness != -1) {
                customerBusinessListHelperMethod();
                associateCustomerModuleListHelperMethod();
                // var reqParam = {
                //     device_id: crossplat.device.uuid,
                //     list_by: "customer"
                // }
                // businessList(reqParam)
                //     .then((response) => {
                //         digibiz.customer_business_list = removeDuplicates(digibiz.customer_business_list.concat(response), "id");
                //     })
                //     .catch((err) => {
                //     })
            }
        }

        if (sessionStorage.getItem('digibiz_role') == "customer" && $('body').attr('app') != "customer_business_list") {
            // location.hash = `customer/business/list`;
            location.hash = `customer/business/list`;
            Materialize.toast(`${rec.data.name} activated.`, 3000, 'round error-alert');
        }
    },

    collaboratorGroupMemberAdd: function (rec) {
        //console.log("collaboratorGroupMemberAdd", rec);
        if ($(`#modal-collaborator-group-business-members[data-business-id="${rec.data.member.business_id}"]`).length > 0) {
            var getBusinessId = $('#modal-collaborator-group-business-members').attr('data-business-id');
            var reqparams = {
                device_id: crossplat.device.uuid,
                group_id: sessionStorage.getItem('group_id'),
                business_id: getBusinessId
            }
            getCollaboratorBusinessEmployeeMembers(reqparams)
                .then((response) => {
                    //console.log("success", response);
                    if (getBusinessId == sessionStorage.getItem('business_id')) {
                        var EmployeeList = {
                            EmployeeList: response.map(e => {
                                if (e.hasOwnProperty('identity_picture') && e.identity_picture) {
                                    if (e.identity_picture.hasOwnProperty('thumbnail') && e.identity_picture.thumbnail) {
                                        var avtarUrl = `${api.get_employee_identity_picture}?id=${e.member.employee_id}&device_id=${crossplat.device.uuid}&image_id=${e.identity_picture.thumbnail}`;
                                        e.identity_picture['avtarUrl'] = avtarUrl;
                                        e['imageLetter'] = e.member_name.first.charAt(0);
                                    } else {
                                        e['imageLetter'] = e.member_name.first.charAt(0);
                                    }
                                } else {
                                    e['imageLetter'] = e.member_name.first.charAt(0);
                                }
                                e.can_edit = "yes"
                                return e;
                            }),
                            page_for: "listing_employees"
                        }
                    } else {
                        var EmployeeList = {
                            EmployeeList: response.map(e => {
                                if (e.hasOwnProperty('identity_picture') && e.identity_picture) {
                                    if (e.identity_picture.hasOwnProperty('thumbnail') && e.identity_picture.thumbnail) {
                                        var avtarUrl = `${api.get_employee_identity_picture}?id=${e.member.employee_id}&device_id=${crossplat.device.uuid}&image_id=${e.identity_picture.thumbnail}`;
                                        e.identity_picture['avtarUrl'] = avtarUrl;
                                        e['imageLetter'] = e.member_name.first.charAt(0);
                                    } else {
                                        e['imageLetter'] = e.member_name.first.charAt(0);
                                    }
                                } else {
                                    e['imageLetter'] = e.member_name.first.charAt(0);
                                }
                                return e;
                            }),
                            page_for: "listing_employees"
                        }
                    }
                    //console.log("EmployeeList", EmployeeList);
                    var getElement = $(`#modal-collaborator-group-business-members[data-business-id="${rec.data.member.business_id}"]`).find('.employee-selection-member-list');
                    fetch.replaceHtml(function (fetcherror, html) {
                        // //console.log("getHtml", html)
                        // var modal_data = {
                        //     modal_id: "modal-collaborator-group-business-members",
                        //     modal_header: "Business Employee List",
                        //     modal_platform: crossplat.device.platform,
                        //     modal_body: html
                        // }
                        // showModal(modal_data, function () {
                        //     $('#collaborator-group-business-member-action-sheet').remove();
                        //     if (crossplat.device.platform == 'browser' || crossplat.device.platform == 'desktop') {
                        //         $('.custom-modal-popup').css({ "display": "flex", "background": "rgba(0,0,0,0.6)" }).addClass('modal-slide-top');
                        //     } else {
                        //         $('.custom-modal-popup').show().addClass('modal-slide-top');
                        //     }
                        //     removeLoader();
                        // });
                    }, 'page/collaborator/moderator_selection_list', '#moderator-selection-list-template', getElement, EmployeeList);
                })
                .catch((err) => {

                })

        }
    },

    groupMemberAdd: function (rec) {
        //console.log("groupMemberAdd socket reached", rec);
        if ($(`#modal-communication-group-activate-employee-group-employee-list-selection[data-group-id="${rec.data.group_data.id}"]`).length > 0) {
            var reqParam = {
                device_id: crossplat.device.uuid,
                group_id: rec.data.group_data.id
            }
            getCompleteGroupMembers(reqParam)
                .then((response) => {
                    processCommunicationGroupActivateEmployeeGroupEmployeeList(response, rec.data.group_data, function () { })
                })
                .catch((err) = {

                })
        }
    },

    digibizNotificationPage: function (rec) {
        //console.log("digibizNotificationPage", rec);
        $(`.accept_reject_wrap[data-notification-id="${rec.data.id}"]`).parents('.digibiz-notification-list-wrapper').remove();
    },

    employeeAddDepartmentAdd: function (rec) {
        //console.log("employeeAddDepartmentAdd", rec);
        if ($('#modal-communication-group-activate-employee-group-employee-list-selection').length > 0) {
            if ($('#modal-communication-group-activate-employee-group-employee-list-selection').find(`.accordion-content[data-group-id="${rec.data.std_grp.id}"]`).length > 0) {
                if ($('#modal-communication-group-activate-employee-group-employee-list-selection').find(`.accordion-content[data-group-id="${rec.data.std_grp.id}"]`).find(`.contact-profile-container[data-dj-unique-employee-id="${rec.data.employeeData.dj_unique_employee_id}"]`).length > 0) {
                    // $('#modal-communication-group-activate-employee-group-employee-list-selection').find(`.accordion-content[data-group-id="${rec.data.std_grp.id}"]`).parents('.employee-selection-list-container').remove();
                    //console.log("already present");
                } else {
                    if (rec.data.employeeData.hasOwnProperty('identity_picture') && rec.data.employeeData.identity_picture) {
                        if (rec.data.employeeData.identity_picture.hasOwnProperty('thumbnail') && rec.data.employeeData.identity_picture.thumbnail) {
                            rec.data.employeeData.identity_picture.avtarUrl = `${api.get_employee_identity_picture}?id=${rec.data.employeeData.dj_unique_employee_id}&device_id=${crossplat.device.uuid}&image_id=${rec.data.employeeData.identity_picture.thumbnail}`;
                            rec.data.employeeData['imageLetter'] = rec.data.employeeData.name.first.charAt(0);
                        } else {
                            rec.data.employeeData['imageLetter'] = rec.data.employeeData.name.first.charAt(0);
                        }
                    } else {
                        rec.data.employeeData['imageLetter'] = rec.data.employeeData.name.first.charAt(0);
                    }
                    var getData = {
                        employeeData: rec.data.employeeData
                    };
                    var getAppendElement = $('#modal-communication-group-activate-employee-group-employee-list-selection').find(`.accordion-content[data-group-id="${rec.data.std_grp.id}"]`);
                    fetch.appendHtml(function () {
                    }, "layouts/template_elements/employee_group_add_moderator_list_selection", "#employee-group-add-moderator-list-selection-template", getAppendElement, getData);
                }
            }
        }
    },

    businessDelete: function (rec) {
        //console.log("businessDelete", rec);
        if (rec.data.status.status == "deleted") {
            if (sessionStorage.getItem('business_id') == rec.data.id) {
                digibiz.business_owner_business_list = digibiz.business_owner_business_list.filter(function (e) {
                    return e.id != rec.data.id;
                });
                // get all the required sessions and clear all and then set them again
                var userId = sessionStorage.getItem('user_id');
                var UUID = sessionStorage.getItem('uuid');
                var socketId = sessionStorage.getItem('socketID');
                var getAccountID = sessionStorage.getItem('account_id');
                var getAccountDetails = sessionStorage.getItem('accountDetails');
                var storageTokenDetails = sessionStorage.getItem('storage_token');
                var profileDetails = sessionStorage.getItem('profile_details');
                var DigibizRole = sessionStorage.getItem('digibiz_role');
                var getRoleBtn = sessionStorage.getItem('get_role_btn');
                sessionStorage.clear();
                sessionStorage.setItem('user_id', userId);
                sessionStorage.setItem('uuid', UUID);
                sessionStorage.setItem('socketID', socketId);
                sessionStorage.setItem('account_id', getAccountID);
                sessionStorage.setItem('accountDetails', getAccountDetails);
                sessionStorage.setItem('storage_token', storageTokenDetails);
                sessionStorage.setItem('profile_details', profileDetails);
                sessionStorage.setItem('digibiz_role', DigibizRole);
                sessionStorage.setItem('get_role_btn', getRoleBtn);
                if (digibiz.business_owner_business_list.length > 0) {
                    //console.log("business is there")
                    location.hash = `business_owner/business/list`;
                } else {
                    location.hash = `jeevi/app/hub`;
                }
            }
            if ($('body').attr('app') == "business_owner_business_list") {
                digibiz.business_owner_business_list = [];
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    list_by: "my_business"
                }
                businessList(reqParam)
                    .then((response) => {
                        Materialize.toast(`${rec.data.name} deleted.`, 3000, 'round error-alert');
                        processBusinessOwnerBusinessList(response, function () { });
                    })
                    .catch((err) => {
                    })
            }
            if (sessionStorage.getItem('digibiz_role') == "employee" && $('body').attr('app') == "employee_business_list") {
                digibiz.employee_business_list = [];
                // employeeBusinessListPage();
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    list_by: "employee"
                }
                businessList(reqParam)
                    .then((response) => {
                        processEmployeeBusinessList(response, function () {
                            removeLoader();
                        });
                    })
                    .catch((err) => {
                    })
                Materialize.toast(`${rec.data.name} deleted.`, 3000, 'round error-alert');
            }
            if (sessionStorage.getItem('digibiz_role') == "employee" && $('body').attr('app') != "employee_business_list") {
                // location.hash = `employee/business/list`;
                location.hash = `employee/business/list`;
                Materialize.toast(`${rec.data.name} deleted.`, 3000, 'round error-alert');
            }
            if (sessionStorage.getItem('digibiz_role') == "customer" && $('body').attr('app') == "customer_business_list") {
                digibiz.customer_business_list = [];
                // customerBusinessListPage();
                var reqParam = {
                    device_id: crossplat.device.uuid,
                    list_by: "customer"
                }
                businessList(reqParam)
                    .then((response) => {
                        processCustomerBusinessList(response, function () {
                            removeLoader();
                        });
                    })
                    .catch((err) => {
                    })
                Materialize.toast(`${rec.data.name} deleted.`, 3000, 'round error-alert');
            }
            if (sessionStorage.getItem('digibiz_role') == "customer" && $('body').attr('app') != "customer_business_list") {
                // location.hash = `customer/business/list`;
                location.hash = `customer/business/list`;
                Materialize.toast(`${rec.data.name} deleted.`, 3000, 'round error-alert');
            }
        }
    },

    accountInactivateStart: function (rec) {
        //console.log("accountInactivateStart", rec);
        // if (sessionStorage.getItem('account_id') == rec.data.id) {
        //     sessionStorage.setItem(`__APPSTATUS`, 'NAVIGATE');
        //     sessionStorage.clear();
        //     setTimeout(function () {
        //     deviceHelper.navigateToAccounts('core');
        // }, 1000);
        // }
        if (sessionStorage.getItem('account_id') == rec.data.id) {
            logoutDigibiz();
        }
    },

    jeeviAccountInactivateStart: function (rec) {
        console.log("jeeviAccountInactivateStart", rec);
        // if (sessionStorage.getItem('account_id') == rec.data.account_id && $('body').attr('role') == "prospect") {
        //     sessionStorage.setItem(`__APPSTATUS`, 'NAVIGATE');
        //     sessionStorage.clear();
        //     setTimeout(function () {
        //     deviceHelper.navigateToAccounts('core');
        // }, 1000);
        // }
        if (sessionStorage.getItem('account_id') == rec.data.account_id && $('body').attr('role') == "prospect") {
            sessionStorage.removeItem('jeevi_id');
            sessionStorage.removeItem('jeevi_status');
            var getAccountDetails = JSON.parse(sessionStorage.getItem('accountDetails'));
            //console.log("getAccountDetails", getAccountDetails);
            getAccountDetails.roles.prospect = "inactive";
            //console.log("final getAccountDetails", getAccountDetails);
            window.sessionStorage.setItem('accountDetails', JSON.stringify(getAccountDetails));
            // location.hash = `jeevi/app/hub`;
            if ($('body').attr('app') == "jeevi_app_hub_page") {
                $('#jeevi-account-inactive').remove();
                $('.prospect-app-hub-page-wrapper').remove();
                jeeviAppHubPage();
            } else if ($('body').attr('app') == "prospect_settings") {
                $('#jeevi-account-inactive').remove();
                location.hash = `jeevi/app/hub`;
            }
        }
    },

    accountInactivateEnd: function (rec) {
        //console.log("accountInactivateEnd", rec);
        if (sessionStorage.getItem('account_id') == rec.data.id) {
            // sessionStorage.clear();
        }
    },

    jeeviAccountInactivateEnd: function (rec) {
        console.log("jeeviAccountInactivateEnd", rec);
        // if (sessionStorage.getItem('account_id') == rec.data.account_id && $('body').attr('role') == "prospect") {
        //     sessionStorage.clear();
        // }
        if (sessionStorage.getItem('account_id') == rec.data.account_id && $('body').attr('role') == "prospect") {
            sessionStorage.removeItem('jeevi_id');
            sessionStorage.removeItem('jeevi_status');
            var getAccountDetails = JSON.parse(sessionStorage.getItem('accountDetails'));
            //console.log("getAccountDetails", getAccountDetails);
            getAccountDetails.roles.prospect = "active";
            Materialize.toast("Jeevi account has been activated successfully as per schedule", 3000, 'round success-alert');
            //console.log("final getAccountDetails", getAccountDetails);
            window.sessionStorage.setItem('accountDetails', JSON.stringify(getAccountDetails));
            // location.hash = `jeevi/app/hub`;
            if ($('body').attr('app') == "jeevi_app_hub_page") {
                var data = {
                    jeevi_role_status: true
                };
                //console.log("data", data);
                fetch.replaceHtml(function () {
                    $('#jeevi-account-inactive').remove();
                    $('#jeevi-account-not-present').remove();
                    $('#jeevi-account-inactive-active-settings').remove();
                    $('#alert-confirm-transactional-password').remove();
                    removeLoader();
                    var slider = new Swiper('.hubSwiper', {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        grabCursor: true,
                        observer: true,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        }
                    });
                    $(".swiper").removeClass("hubSwiper");
                }, "page/prospect/app_hub", "#prospect-app-hub-page-template", "#digibiz-home-page-middle-band-wrapper", data);
            } else {
                $('#jeevi-account-not-present').remove();
                $('#jeevi-account-inactive').remove();
                $('#jeevi-account-inactive-active-settings').remove();
                $('#alert-confirm-transactional-password').remove();
            }
        }
    },

    accountDelete: function (rec) {
        //console.log("accountDelete", rec);
        // if (sessionStorage.getItem('account_id') == rec.data.id) {
        //     sessionStorage.clear();
        //     setTimeout(function () {
        //     deviceHelper.navigateToAccounts('core');
        // }, 1000);
        // }
        if (sessionStorage.getItem('account_id') == rec.data.id) {
            logoutDigibiz();
        }
    },

    jeeviAccountDelete: function (rec) {
        //console.log("jeeviAccountDelete", rec);
        // if (sessionStorage.getItem('account_id') == rec.data.account_id && $('body').attr('role') == "prospect") {
        //     sessionStorage.clear();
        //     setTimeout(function () {
        //     deviceHelper.navigateToAccounts('core');
        // }, 1000);
        // }
        if (sessionStorage.getItem('account_id') == rec.data.account_id && $('body').attr('role') == "prospect") {
            var getAccountDetails = JSON.parse(sessionStorage.getItem('accountDetails'));
            //console.log("getAccountDetails", getAccountDetails);
            getAccountDetails.roles.prospect = "pending";
            //console.log("final getAccountDetails", getAccountDetails);
            window.sessionStorage.setItem('accountDetails', JSON.stringify(getAccountDetails));
            location.hash = `jeevi/app/hub`;
        }
    },

    killAppSession: function (rec) {
        //console.log("killAppSession", rec);
        // sessionStorage.clear();
        //console.log("NAVIGATING TO CORE kILL APP SESSION");
        // setTimeout(function () {
        //     deviceHelper.navigateToAccounts('core');
        // }, 1000);
    },

    primaryMobileNumberChange: function (rec) {
        //console.log("inside data", rec)
        if (rec.destination == sessionStorage.getItem('socketID')) {
            //in slider
            $('.profile-info-container').find('.mobile_number').text(rec.data.mobile_number);
            var user = JSON.parse(sessionStorage.getItem('profile_details'));
            user.login.mobile_number = rec.data.mobile_number;
        }
    },

    digibizGroupInactive: function (rec) {
        if ($('body').attr('app') == "employee_group_creation_list") {
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "standard") {
                digibiz.standard_employees_groups_list_page = [];
                standardEmployeesGroupsListPage();
            }
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "custom") {
                digibiz.custom_employees_groups_list_page = [];
                customEmployeesGroupsListPage();
            }
        }
        if ($('body').attr('app') == "communication_groups") {
            digibiz.communicationGroupsList = [];
            getCommunicationGroupsPage();
        }
        if ($('body').attr('app') == "collaborator_groups_list") {
            digibiz.collaborator_groups_list = [];
            getCollaboratorGroupsListPage();
        }
    },
    digibizGroupActive: function (rec) {
        //console.log("digibizGroupActive", rec);
        if ($('body').attr('app') == "employee_group_creation_list") {
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "standard") {
                digibiz.standard_employees_groups_list_page = [];
                standardEmployeesGroupsListPage();
            }
            if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "custom") {
                digibiz.custom_employees_groups_list_page = [];
                customEmployeesGroupsListPage();
            }
        }
        if ($('body').attr('app') == "communication_groups") {
            digibiz.communicationGroupsList = [];
            getCommunicationGroupsPage();
        }
        if ($('body').attr('app') == "collaborator_groups_list") {
            digibiz.collaborator_groups_list = [];
            getCollaboratorGroupsListPage();
        }
    },

    businessAppPermission: function (rec) {
        //console.log("businessAppPermission", rec);
        if ($('body').attr('app') == "business_app_permission_settings") {
            if (sessionStorage.getItem('business_id') == rec.data.business_id) {
                $(`.apps-choose-business[data-value="${rec.data.app}"]`).attr('data-status', 'active');
                setTimeout(function () {
                    if ($(`.apps-choose-business[data-value="${rec.data.app}"]`).find('.checkbox-conatiner').length > 0) {
                        //console.log("right mark is already present");
                    } else {
                        $(`.apps-choose-business[data-value="${rec.data.app}"]`).append(`<div class="checkbox-conatiner">
                <input type="checkbox" class="filled-in app-choice-business-selected disabled" id="filled-in-box" checked="checked" disabled="disabled" />
                <label for="filled-in-box"></label>
                </div>`);
                    }
                }, 1000);
            }
        }
    },

    businessAppPermissionInactive: function (rec) {
        //console.log("businessAppPermissionInactive", rec);
        if ($('body').attr('app') == "business_app_permission_settings") {
            if (sessionStorage.getItem('business_id') == rec.data.appData.business_id) {
                $(`.apps-choose-business[data-value="${rec.data.appData.app}"]`).attr('data-status', 'inactive');
                $(`.apps-choose-business[data-value="${rec.data.appData.app}"]`).find('.checkbox-conatiner').remove();
            }
        }
    },

    businessAppPermissionDeleted: function (rec) {
        //console.log("businessAppPermissionDeleted", rec);
        if ($('body').attr('app') == "business_app_permission_settings") {
            if (sessionStorage.getItem('business_id') == rec.data.appData.business_id) {
                $(`.apps-choose-business[data-value="${rec.data.appData.app}"]`).attr('data-status', 'deleted');
                $(`.apps-choose-business[data-value="${rec.data.appData.app}"]`).find('.checkbox-conatiner').remove();
            }
        }
    },

    businessAppPermissionActive: function (rec) {
        //console.log("businessAppPermissionActive", rec);
        if ($('body').attr('app') == "business_app_permission_settings") {
            if (sessionStorage.getItem('business_id') == rec.data.appData.business_id) {
                $(`.apps-choose-business[data-value="${rec.data.appData.app}"]`).attr('data-status', 'active');
                setTimeout(function () {
                    if ($(`.apps-choose-business[data-value="${rec.data.appData.app}"]`).find('.checkbox-conatiner').length > 0) {
                        //console.log("right mark is already present");
                    } else {
                        $(`.apps-choose-business[data-value="${rec.data.appData.app}"]`).append(`<div class="checkbox-conatiner">
                <input type="checkbox" class="filled-in app-choice-business-selected disabled" id="filled-in-box" checked="checked" disabled="disabled" />
                <label for="filled-in-box"></label>
                </div>`);
                    }
                }, 1000);
            }
        }
    },

    roleAdded: function (rec) {
        //console.log("roleAdded", rec);
        if (sessionStorage.getItem('account_id') == rec.data.account_data.id) {
            //update in the session
            window.sessionStorage.setItem('accountDetails', JSON.stringify(rec.data.account_data));
            if (rec.data.role_activated == "employee") {
                employeeBusinessListHelperMethod();
            }
            if (rec.data.role_activated == "customer") {
                customerBusinessListHelperMethod();
                associateCustomerModuleListHelperMethod();
            }
            if (rec.data.role_activated == "administrator") {
                businessAdminBusinessListHelperMethod();
            }
        }
    },

    transactionSignaturePictureUpdate: function (rec) {
        console.log("transactionSignaturePictureUpdate", rec);
        if ($('body').attr('app') == "digibiz_credentials") {
            //check if the image is inactive
            if (rec.data.status.status == "inactive") {
                if ($(`.view-transaction-signature-picture[id="${rec.data.id}"]`).hasClass('inactivated')) {
                    console.log("already class inactivated is present");
                } else {
                    $(`.view-transaction-signature-picture[id="${rec.data.id}"]`).addClass('inactivated');
                }
            }
            //check if the image is used
            if (rec.data.picture_used == "yes") {
                if ($(`.view-transaction-signature-picture[id="${rec.data.id}"]`).parent('.identity-picture-wrapper').find('.picture-used').length > 0) {
                    console.log("already lock icon is present");
                } else {
                    $(`.view-transaction-signature-picture[id="${rec.data.id}"]`).parent('.identity-picture-wrapper').append(`<span class="picture-used material-icons">lock</span>`);
                }
            }
        }
        if ($('body').attr('app') == "business_add" || $('body').attr('app') == "business_edit") {

            //check if the image is inactive
            if (rec.data.status.status == "inactive") {
                $(`.picture_wrapper[data-id="${rec.data.id}"]`).parents('.transaction_signature_select').remove();
            }
            //check if the image is used
            if (rec.data.picture_used == "yes") {
                if ($(`.picture_wrapper[data-id="${rec.data.id}"]`).parents('.transaction_signature_select').find('.picture-used').length > 0) {
                    console.log("already lock icon is present");
                } else {
                    $(`.picture_wrapper[data-id="${rec.data.id}"]`).parents('.transaction_signature_select').append(`<span class="picture-used material-icons">lock</span>`);
                }
            }
        }
    },

    transactionSignaturePictureAdd: function (rec) {
        console.log("transactionSignaturePictureAdd", rec);
        if ($('body').attr('app') == "digibiz_credentials") {
            //add picture in the container
            var avtarUrl = `${api.get_transaction_signature_picture}?id=${rec.data.id}&device_id=${crossplat.device.uuid}&image_id=${rec.data.picture_details.thumbnail}`;
            console.log("avtarUrl", avtarUrl);
            var getPictureContainer = `<div class="transaction_signature_picture_contentbox">
             <div class="multimedia-container">        
                 <div class="multimedia_wrapper">
                     <div class="identity-picture-wrapper view">   
                         <img class="attached-img transaction_signature_container" id="${rec.data.id}" thumbnail_id="${rec.data.picture_details.thumbnail}" data-status="${rec.data.status.status}" type="${rec.data.type}" src="${avtarUrl}"/>                             
                     </div>
                 </div>    
             </div>
         </div>`;
            console.log("getPictureContainer socket side", getPictureContainer);
            if (rec.data.type == "transaction_picture") {
                if ($(`.transaction_signature_container[id="${rec.data.id}"]`).length <= 0) {
                    $('#transaction_pictures_main_container').append(getPictureContainer);
                }
            } else if (rec.data.type == "signature_picture") {
                if ($(`.transaction_signature_container[id="${rec.data.id}"]`).length <= 0) {
                    $('#signature_pictures_main_container').append(getPictureContainer);
                }
            }
        }
    },

    transactionSignaturePictureDelete: function (rec) {
        console.log("transactionSignaturePictureDelete", rec);
        if ($('body').attr('app') == "digibiz_credentials") {
            $(`.view-transaction-signature-picture[id="${rec.data.id}"]`).parents('.transaction_signature_picture_contentbox').remove();
        }
        if ($('body').attr('app') == "business_add" || $('body').attr('app') == "business_edit") {
            $(`.picture_wrapper[data-id="${rec.data.id}"]`).parents('.transaction_signature_select').remove();
        }
    }







};

document.addEventListener('loggedin_socket', function () {
    fetch.apiCall(function (response, status, xhr) {
        if (status === "success") {
            //console.log("success loggedin_socket", response);
            sessionStorage.setItem('socketID', response.Data);
            sockets.coreSocket.emit('joinroom', crossplat.device.uuid);
            sockets.digibizSocket.emit('joinroom', crossplat.device.uuid);
            sockets.digibizSocket.emit('joinroom', response.Data);
            sockets.searchSocket.emit('joinroom', crossplat.device.uuid);
            //digibiz public room
            sockets.digibizSocket.emit('joinroom', 'public_digibiz_event');
            //app init
            var app_data = {
                destination: response.Data,
                event: 'app_init',
                data: {
                    device: {
                        id: crossplat.device.uuid,
                        platform: crossplat.device.platform
                    },
                    // app: config.app_name,
                    app: "digibiz",
                    user: {
                        socket_id: response.Data,
                        id: window.sessionStorage.getItem("user_id"),
                        type: "individual"
                    }
                }
            }
            sockets.digibizSocket.emit('app_init', app_data);
        } else {
            //console.log("222")
            sockets.digibizSocket.emit('joinroom', crossplat.device.uuid);
        }
    }, api.get_socket_id, "POST", "JSON", sockets.requestParams);
}, false);


sockets.digibizSocket.on('jeevi_update_storage', function (data) {
    sockets.storageUpdate(data);
});

sockets.coreSocket.on('app_init', function (data) {
    sockets.appInit(data);
});

//business_create
sockets.digibizSocket.on('business_create', function (data) {
    sockets.businessCreate(data);
});
//business_create
sockets.digibizSocket.on('business_update', function (data) {
    sockets.businessUpdate(data);
});
//business_display_picture
sockets.digibizSocket.on('business_display_picture_update', function (data) {
    sockets.businessDisplayPictureUpdate(data);
});
//business_display_picture_remove 
sockets.digibizSocket.on('business_display_picture_removed', function (data) {
    sockets.businessDisplayPictureRemove(data);
});

//employee_type_add
sockets.digibizSocket.on('employee_type_add', function (data) {
    sockets.employeeTypeAdd(data);
});

//employee_type_update
sockets.digibizSocket.on('employee_type_update', function (data) {
    sockets.employeeTypeUpdate(data);
});

//employee_type_delete
sockets.digibizSocket.on('employee_type_delete', function (data) {
    sockets.employeeTypeDelete(data);
});

//employee_category_add
sockets.digibizSocket.on('employee_category_add', function (data) {
    sockets.employeeCategoryAdd(data);
});

//employee_category_update
sockets.digibizSocket.on('employee_category_update', function (data) {
    sockets.employeeCategoryUpdate(data);
});

//employee_category_delete
sockets.digibizSocket.on('employee_category_delete', function (data) {
    sockets.employeeCategoryDelete(data);
});

//employee_designation_add
sockets.digibizSocket.on('employee_designation_add', function (data) {
    sockets.employeeDesignationAdd(data);
});

//employee_designation_update
sockets.digibizSocket.on('employee_designation_update', function (data) {
    sockets.employeeDesignationUpdate(data);
});

//employee_designation_delete
sockets.digibizSocket.on('employee_designation_delete', function (data) {
    sockets.employeeDesignationDelete(data);
});

//employee_department_add
sockets.digibizSocket.on('employee_department_add', function (data) {
    sockets.employeeDepartmentAdd(data);
});

//employee_department_update
sockets.digibizSocket.on('employee_department_update', function (data) {
    sockets.employeeDepartmentUpdate(data);
});

//employee_department_delete
sockets.digibizSocket.on('employee_department_delete', function (data) {
    sockets.employeeDepartmentDelete(data);
});

//digibiz_notification
sockets.digibizSocket.on('digibiz_notification', function (data) {
    sockets.digibizNotification(data);
});

//digibiz_notification_change_status
sockets.digibizSocket.on('digibiz_notification_change_status', function (data) {
    sockets.digibizNotificationChangeStatus(data);
});

//digibiz notification remove 
sockets.digibizSocket.on('digibiz_notification_remove', function (data) {
    sockets.digibizNotificationRemove(data);
});

//digibiz_notification_expire
sockets.digibizSocket.on('digibiz_notification_expire', function (data) {
    sockets.digibizNotificationExpire(data);
});

//digibiz business notification add  
sockets.digibizSocket.on('digibiz_business_notification', function (data) {
    sockets.digibizBusinessNotification(data);
});

//digibiz_business_notification_change_status
sockets.digibizSocket.on('digibiz_business_notification_change_status', function (data) {
    sockets.digibizBusinessNotificationChangeStatus(data);
});

//digibiz business notification remove 
sockets.digibizSocket.on('digibiz_business_notification_delete', function (data) {
    sockets.digibizBusinessNotificationRemove(data);
});

//digibiz_business_notification_expire
sockets.digibizSocket.on('digibiz_business_notification_expire', function (data) {
    sockets.digibizBusinessNotificationExpire(data);
});


//business_change_device
sockets.digibizSocket.on('business_change_device', function (data) {
    console.log('customer business_change_device device', data);
    sockets.businessChangeDevice(data);
});

//employee_change_device
sockets.digibizSocket.on('employee_change_device', function (data) {
    console.log('change admin', data);
    sockets.employeeChangeDevice(data);
});

//customer_change_device
sockets.digibizSocket.on('customer_change_device', function (data) {
    console.log('customer change device', data);
    sockets.customerChangeDevice(data);
});

//group_change_device
sockets.digibizSocket.on('group_change_device', function (data) {
    console.log('groups change admin', data);
    sockets.groupChangeDevice(data);
});

//employee_add
sockets.digibizSocket.on('employee_add', function (data) {
    console.log('employee employee_add', data);
    sockets.employeeAdd(data);
});

//employee_add
sockets.digibizSocket.on('employee_update', function (data) {
    console.log('employee update', data);
    sockets.employeeUpdate(data);
});

//employee_update_employee_role
sockets.digibizSocket.on('employee_update_employee_role', function (data) {
console.log('employee_update_employee_role',data);
    sockets.employeeUpdateEmployeeRole(data);
});


sockets.digibizSocket.on('employee_identity_picture_removed', function (data) {
    console.log('employee_identity_picture_removed',data);
        sockets.employeeUpdateEmployeeRole(data);
    });



//customer_update_customer_role
sockets.digibizSocket.on('customer_update_customer_role', function (data) {
    sockets.customerUpdateCustomerRole(data);
});

//employee_delete
sockets.digibizSocket.on('employee_delete', function (data) {
    sockets.employeeDelete(data);
});

//employee_group_add
sockets.digibizSocket.on('employee_group_add', function (data) {
    sockets.employeeGroupAdd(data);
});

//customer_group_add
sockets.digibizSocket.on('customer_group_add', function (data) {
    sockets.customerGroupAdd(data);
});

//communication_group_add
sockets.digibizSocket.on('communication_group_add', function (data) {
    sockets.communicationGroupAdd(data);
});

//collaborator_group_add
sockets.digibizSocket.on('collaborator_group_add', function (data) {
    sockets.collaboratorGroupAdd(data);
});

//group_common_update
sockets.digibizSocket.on('group_common_update', function (data) {
    console.log('group update', data);
    sockets.groupCommonUpdate(data);
});

//employee_group_department_add_update
sockets.digibizSocket.on('employee_group_department_add_update', function (data) {
    sockets.employeeGroupDepartmentAddUpdate(data);
});

//employee_group_department_delete_update
sockets.digibizSocket.on('employee_group_department_delete_update', function (data) {
    sockets.employeeGroupDepartmentDeleteUpdate(data);
});

//group_delete
sockets.digibizSocket.on('group_delete', function (data) {
    sockets.groupDelete(data);
});

//group_member_delete
sockets.digibizSocket.on('group_member_delete', function (data) {
    sockets.groupMemberDelete(data);
});


//customer_identifier_add
sockets.digibizSocket.on('customer_identifier_add', function (data) {
    sockets.customerIdentifierAdd(data);
});

//customer_identifier_update
sockets.digibizSocket.on('customer_identifier_update', function (data) {
    sockets.customerIdentifierUpdate(data);
});

//customer_identifier_delete
sockets.digibizSocket.on('customer_identifier_delete', function (data) {
    sockets.customerIdentifierDelete(data);
});

//customer_add
sockets.digibizSocket.on('customer_add', function (data) {
    sockets.customerAdd(data);
});

//customer_update
sockets.digibizSocket.on('customer_update', function (data) {
    sockets.customerUpdate(data);
});

//customer_delete
sockets.digibizSocket.on('customer_delete', function (data) {
    sockets.customerDelete(data);
});

//associate_customer_add
sockets.digibizSocket.on('associate_customer_add', function (data) {
    sockets.associateCustomerAdd(data);
});

//associate_customer_update
sockets.digibizSocket.on('associate_customer_update', function (data) {
    sockets.AssociateCustomerUpdate(data);
});

//associate_customer_delete
sockets.digibizSocket.on('associate_customer_delete', function (data) {
    sockets.AssociateCustomerDelete(data);
});


//business owner add
sockets.digibizSocket.on('business_owner_add', function (data) {
    sockets.businessOwnerAdd(data);
});

//group_moderator_add
sockets.digibizSocket.on('group_moderator_add', function (data) {
    sockets.groupModeratorAdd(data);
});

//group_moderator_delete
sockets.digibizSocket.on('group_moderator_delete', function (data) {
    sockets.groupModeratorDelete(data);
});

//admin delete
sockets.digibizSocket.on('admin_delete', function (data) {
    sockets.adminDelete(data);
});

//digibiz_business_logout
sockets.digibizSocket.on('digibiz_business_logout', function (data) {
    sockets.digibizBusinessLogout(data);
});

//super_admin_add
sockets.digibizSocket.on('super_admin_add', function (data) {
    //console.log("super_admin_add socket received")
    sockets.superAdminAdd(data);
});

//super_admin_revoke
sockets.digibizSocket.on('super_admin_revoke', function (data) {
    sockets.superAdminRevoke(data);
});

sockets.coreSocket.on('update_session', function (data) {
    if (crossplat.device.uuid == data.data.device_id) {
        idleTime = 0;
    }
});

//employee_identity_picture_update
sockets.digibizSocket.on('employee_identity_picture_update', function (data) {
    sockets.employeeIdentityPicture(data);
});

//customer_identity_picture_update
sockets.digibizSocket.on('customer_identity_picture_update', function (data) {
    sockets.customerIdentityPicture(data);
});

//customer_identity_picture_removed
sockets.digibizSocket.on('customer_identity_picture_removed', function (data) {
    sockets.customerIdentityPictureRemoved(data);
});

//associate_customer_identity_picture_update
sockets.digibizSocket.on('associate_customer_identity_picture_update', function (data) {
    sockets.AssociateCustomerIdentityPicture(data);
});

sockets.digibizSocket.on('associate_customer_identity_picture_removed', function (data) {
    sockets.AssociateCustomerIdentityPictureRemoved(data);
});

//customer_reassign
sockets.digibizSocket.on('customer_reassign', function (data) {
    sockets.reassignCustomer(data);
});

//collaborator_contact_delete
sockets.digibizSocket.on('collaborator_contact_delete', function (data) {
    sockets.collaboratorContactDelete(data);
});

//collaborator_contact_add
sockets.digibizSocket.on('collaborator_contact_add', function (data) {
    sockets.collaboratorContactAdd(data);
});

//group_image_update
sockets.digibizSocket.on('group_image_update', function (data) {
    sockets.groupImageUpdate(data);
});

//group_image_removed
sockets.digibizSocket.on('group_image_removed', function (data) {
    sockets.groupImageRemove(data);
});

//access_revoked
sockets.digibizSocket.on('access_revoked', function (data) {
    sockets.access_revoke(data);
});

//add_contact_access
sockets.digibizSocket.on('add_contact_access', function (data) {
    sockets.add_contact_access(data);
});

//business_inactivate_start
sockets.digibizSocket.on('business_inactivate_start', function (data) {
    sockets.businessInactivateStart(data);
});

//business_inactivate_end
sockets.digibizSocket.on('business_inactivate_end', function (data) {
    sockets.businessInactivateEnd(data);
});

//collaborator_group_member_add
sockets.digibizSocket.on('collaborator_group_member_add', function (data) {
    sockets.collaboratorGroupMemberAdd(data);
});

//group_member_add
sockets.digibizSocket.on('group_member_add', function (data) {
    sockets.groupMemberAdd(data);
});

sockets.digibizSocket.on('group_creation_completed', function (data) {
    console.log('group comploted',data);
    sockets.groupCreation(data);
});

sockets.digibizSocket.on('group_creation_progress', function (data) {
    console.log('group progress',data);
    sockets.groupCreationProgress(data);
});


//digibiz_notification_page
sockets.digibizSocket.on('digibiz_notification_page', function (data) {
    sockets.digibizNotificationPage(data);
});
//employee_add_department_add
sockets.digibizSocket.on('employee_add_department_add', function (data) {
    sockets.employeeAddDepartmentAdd(data);
});

//business_delete
sockets.digibizSocket.on('business_delete', function (data) {
    sockets.businessDelete(data);
});

//digibiz_account_inactivate_start
sockets.digibizSocket.on('digibiz_account_inactivate_start', function (data) {
    sockets.accountInactivateStart(data);
});

//digibiz_account_inactivate_start
sockets.digibizSocket.on('digibiz_account_inactivate_end', function (data) {
    sockets.accountInactivateEnd(data);
});

//digibiz_account_delete
sockets.digibizSocket.on('digibiz_account_delete', function (data) {
    sockets.accountDelete(data);
});

//jeevi_account_inactivate_start
sockets.digibizSocket.on('jeevi_account_inactivate_start', function (data) {
    sockets.jeeviAccountInactivateStart(data);
});

//jeevi_account_inactivate_end
sockets.digibizSocket.on('jeevi_account_inactivate_end', function (data) {
    sockets.jeeviAccountInactivateEnd(data);
});

//jeevi_account_delete
sockets.digibizSocket.on('jeevi_account_delete', function (data) {
    sockets.jeeviAccountDelete(data);
});

//search socket 
sockets.searchSocket.on('response', function (data) {
    console.log("search response", data)
    if ($('#get-roles-list-search-btn').length > 0) {
        //console.log("rolesSearch");
        sockets.renderRolesSearchResult(data);
    } else {
        sockets.renderSearchResult(data);
    }
});

//socket.js
sockets.digibizSocket.on('kill_app_session', function (data) {
    //console.log("trigerring kill app session", data);
    sockets.killAppSession(data);
});

sockets.digibizSocket.on('customer_identifier_contact_item_update', function (data) {
    sockets.customerIdentifierItemUpdate(data);
});

//socket.js
sockets.digibizSocket.on('core_primary_mobile_number_change', function (data) {
    //console.log("digibizSocket core_primary_mobile_number_change", data);
    sockets.primaryMobileNumberChange(data);
});


sockets.digibizSocket.on('group_inactive', function (data) {
    //console.log("digibizSocket group_inactive", data);
    sockets.digibizGroupInactive(data);
});

sockets.digibizSocket.on('group_active', function (data) {
    //console.log("digibizSocket group_active", data);
    sockets.digibizGroupActive(data);
});

/*****CORE LOGOUT******** */
sockets.digibizSocket.on('logout', function (data) {
    //console.log("logout 1", data)
    sockets.logout(data);
});

sockets.coreSocket.on('logout', function (data) {
    //console.log("logout 2", data)
    sockets.logout(data);
});

sockets.digibizSocket.on('business_app_permission', function (data) {
    sockets.businessAppPermission(data);
});
sockets.digibizSocket.on('app_permission_inactive', function (data) {
    sockets.businessAppPermissionInactive(data);
});
sockets.digibizSocket.on('app_permission_deleted', function (data) {
    sockets.businessAppPermissionDeleted(data);
});
sockets.digibizSocket.on('app_permission_active', function (data) {
    sockets.businessAppPermissionActive(data);
});
sockets.digibizSocket.on('role_added', function (data) {
    sockets.roleAdded(data);
});

sockets.digibizSocket.on('digibiz_update_storage', function (data) {
    console.log("@@@@@@@@@@@@@digibiz_update_storage@@@@@@@@")
});


sockets.digibizSocket.on('transaction_signature_picture_update', function (data) {
    sockets.transactionSignaturePictureUpdate(data);
});

sockets.digibizSocket.on('transaction_signature_picture_add', function (data) {
    sockets.transactionSignaturePictureAdd(data);
});

sockets.digibizSocket.on('transaction_signature_picture_deleted', function (data) {
    sockets.transactionSignaturePictureDelete(data);
});
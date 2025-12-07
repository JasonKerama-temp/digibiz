$(document).on('click', '#collaborator_group_add_moderator', function () {
    addLoader();
    var getGroupReqParms = {
        device_id: crossplat.device.uuid,
        id: sessionStorage.getItem('group_id')
    }
    groupGet(getGroupReqParms)
        .then((result) => {
            var reqparams = {
                device_id: crossplat.device.uuid,
                group_id: sessionStorage.getItem('group_id'),
                business_id: sessionStorage.getItem('business_id')
            }
            getCollaboratorBusinessEmployeeMembers(reqparams)
                .then((response) => {
                    //console.log("success", response);
                    var EmployeeList = {
                        EmployeeList: response.map(e => {
                            if (e.hasOwnProperty('identity_picture') && e.identity_picture) {
                                if (e.identity_picture.hasOwnProperty('asset_id') && e.identity_picture.asset_id) {
                                    var avtarUrl = `${api.get_employee_thumbnail}?id=${e.member.employee_id}&device_id=${crossplat.device.uuid}&type=display_picture`;
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
                        page_for: "moderator"
                    }
                    //console.log("EmployeeList", EmployeeList);
                    fetch.getHtml(function (fetcherror, html) {
                        var modal_data = {
                            modal_id: "modal-collaborator-group-moderator-selection",
                            modal_header: "Business Employee List",
                            modal_platform: crossplat.device.platform,
                            modal_body: html,
                            modal_action_buttons: [{
                                "name": "Save",
                                "id": "add-collaborator-group-selected-moderator",
                            }]
                        }
                        showModal(modal_data, function () {
                            //add search element
                            $('.moderator-selection-list-main-box').prepend(`<div class="search">
                                    <div class="expand-search-wrap search-wrapper" id="moderator-selection-list-search-btn">
                                        <span class="searchbtn waves-effect cursor-pointer"><i class="material-icons">search</i></span>
                                        <input class="expand-search-input" type="search" placeholder="Search" autocomplete="off"/>
                                        <span class="searchclosebtn"><i class="material-icons moderator-selection-list-close-btn hide">close</i></span>
                                    </div>
                                </div>
                            `);
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
                            //check already present moderators
                            if (result.hasOwnProperty('moderator') && result.moderator) {
                                digibiz.alreadySelected = result.moderator;
                                $.each(result.moderator, function (index, elem) {
                                    $(`.collaborator-group-moderator-select-btn[data-dj-unique-employee-id="${elem.id}"]`).parents('.employee-select-btn-wrapper').addClass('selected-row');
                                    $(`.collaborator-group-moderator-select-btn[data-dj-unique-employee-id="${elem.id}"]`).prop('checked', true);
                                })
                            }
                            removeLoader();
                            setTimeout(function () {
                                // listenForSurveyViewersUserScrollEvent($(".modal-popup-content"));
                                var element = $('#moderator-selection-list-search-btn').find('.expand-search-input');
                                if (element) {
                                    //console.log('element22', element);
                                    //if element is there
                                    $(document).on('input', element, function () {
                                        //on input set attribute socketid 
                                        timestamp = (new Date()).getTime();
                                        element.attr("socketid", timestamp);
                                    });
                                    // element.addEventListener("keyup", function (e) {
                                    $(document).on('keyup', element, function () {
                                        // if (!hasClass(e.target, 'filemanager-search')) {
                                        //console.log("not has class")
                                        // on keyup get attribute 
                                        socketid = element.attr("socketid");
                                        keyword = element.val();
                                        if (socketid && keyword) {
                                            //if socketid attribute and keyword is there
                                            document.getElementsByClassName('searchclosebtn')[0].style.display = 'flex';
                                            currentroute = $("body").attr('app');
                                            data = {
                                                room: crossplat.device.uuid,
                                                socketid,
                                                app: 'digibiz',
                                                keyword
                                            };
                                            switch (currentroute) {
                                                case 'collaborator_group_create':
                                                    // if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "custom") {
                                                    if ($('#modal-collaborator-group-moderator-selection').length > 0) {
                                                        // if (sessionStorage.getItem('group_from') == "employee_list") {
                                                        data['index'] = 'getEmployeeContactListAllEmployees';
                                                        data['business_id'] = sessionStorage.getItem('business_id')
                                                        // }
                                                    }
                                                    // }
                                                    break;
                                                default:
                                                    break;
                                            }
                                            addLoader();
                                            //console.log("search emit", data);
                                            sockets.searchSocket.emit('search', data);
                                            setTimeout(() => {
                                                removeLoader();
                                            }, 300);
                                        } else {
                                            //console.log("going to else part111", digibiz.communicationActivateEmployeeGroupEmployeeList)
                                            //else show default list
                                            removeLoader();
                                            document.getElementsByClassName('searchclosebtn')[0].style.display = 'none';
                                            currentroute = $("body").attr('app');
                                            // element.removeAttribute("socketid");
                                            element.attr("socketid", "");
                                            switch (currentroute) {
                                                case 'collaborator_group_create':
                                                    // if (sessionStorage.getItem('selected-employee-group-list-type-tab') == "custom") {
                                                    if ($('#modal-collaborator-group-moderator-selection').length > 0) {
                                                        //console.log("ERROR", unique_member)
                                                        processSearchedEmployeeGroupEmployeeSelectionList(finalSelectedEmployeeList, function () { })
                                                    }
                                                    // }
                                                    break;
                                                default:
                                                    break;
                                            }

                                        }
                                    });
                                    $(document).on('click', '.searchclosebtn', function () {
                                        if ($("body").attr('app') == "collaborator_group_create") {
                                            if ($('#modal-collaborator-group-moderator-selection').length > 0) {
                                                //console.log("CLOSED", unique_member)
                                                processSearchedEmployeeGroupEmployeeSelectionList(finalSelectedEmployeeList, function () { })
                                            }
                                        }
                                    })
                                }
                            }, 0);
                        });
                    }, 'page/collaborator/moderator_selection_list', '#moderator-selection-list-template', EmployeeList);
                })
                .catch((err) => {
                    removeLoader();
                    Materialize.toast(`No Employees Found`, 3000, 'round success-alert');
                })
        })
        .catch((err) => {
            removeLoader();
            Materialize.toast(`No group Found`, 3000, 'round success-alert');
        })

});
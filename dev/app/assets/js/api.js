const api = {
  // core api's
  set_session: config.api.core + '/api/jeevi/setSession',
  get_roles: config.api.core + '/api/jeevi/getRoles',
  get_profile: config.api.core + '/api/individual/getProfile',
  get_session: config.api.core + '/api/jeevi/getSession',
  get_jeevi_roles: config.api.core + '/api/jeevi/getRoles',
  checkJeeviDetails: config.api.core + '/api/jeevi/checkJeeviDetails',
  kill_session: config.api.core + '/api/jeevi/killSession',
  get_socket_id: config.api.core + '/api/jeevi/socket/get_id',
  verify_transaction_password: config.api.core + '/api/jeevi/verify_transaction_password',
  get_contacts: config.api.core + '/api/contact/list',
  get_groups: config.api.core + '/api/group/list',
  set_profile: config.api.core + '/api/individual/setprofile',
  // get_group_members: config.api.core + '/api/group/members',
  get_details: config.api.core + '/api/jeevi/get_details',
  update_contact_status: config.api.core + '/api/contact/changeStatus',
  get_jeevi_contact: config.api.core + '/api/jeevi/get_details',
  logout: config.api.core + '/api/jeevi/logout',
  list_digibiz_login_logs: config.api.core + '/api/activity/get',

  //asset
  core_asset_details: config.api.core + '/api/asset/details',
  core_get_assets: config.api.core + '/api/assets/get',

  //storage api's
  // revoke_storage: config.api.storage + '/api/storage/revoke',
  store_file: config.api.storage + '/api/storage/write',
  // get_assets: config.api.core + '/api/assets/get',
  storage_copy: config.api.storage + '/api/chunks/copy',
  chunk_upload: config.api.storage + '/api/chunks/write',
  // file_write: config.api.storage + '/api/storage/write_file',
  core_chunk_download: config.api.storage + '/api/chunks/download',
  core_chunk_view_by_file: config.api.storage + '/api/chunks/view_by_url',
  get_multi_media_info: config.api.core + '/api/asset/details',
  view_multimedia_asset: config.api.storage + '/api/chunks/view_by_url',
  // check_drive_status: config.api.storage + '/api/storage/check_token',
  check_drive_status: config.api.digibiz_storage + '/api/storage/check_token',
  copy_multimedia: config.api.storage + '/api/chunks/copy',
  file_read: config.api.storage + '/api/storage/read',
  file_write: config.api.digibiz_storage + '/api/storage/write_file',
  revoke_storage: config.api.digibiz_storage + '/api/storage/revoke',
  set_active_storage: config.api.digibiz_storage + '/api/storage/set_active_storage',
  GoogleDrive_auth: config.api.digibiz_storage + '/api/storage/google/oauth2callback',
  DropBox_auth: config.api.digibiz_storage + '/api/storage/dropbox/oauth2callback',
  OneDrive_auth: config.api.digibiz_storage + '/api/storage/onedrive/oauth2callback',
  encrypt_string: config.api.digibiz_storage + '/api/encrypt/string',
  decrypt_string: config.api.digibiz_storage + '/api/decrypt/string',
  check_token: config.api.digibiz_storage + '/api/storage/check_token',

  //department Management api
  add_department_data: config.api.digibiz + '/api/department/add',
  get_department_data: config.api.digibiz + '/api/department/get',
  list_department_data: config.api.digibiz + '/api/department/list',
  update_department_data: config.api.digibiz + '/api/department/update',
  delete_department_data: config.api.digibiz + '/api/department/delete',

  //employee Type api
  add_employee_type: config.api.digibiz + '/api/employee_type/add',
  get_employee_type: config.api.digibiz + '/api/employee_type/get',
  list_employee_type: config.api.digibiz + '/api/employee_type/list',
  update_employee_type: config.api.digibiz + '/api/employee_type/update',
  delete_employee_type: config.api.digibiz + '/api/employee_type/delete',

  //employee Category api
  add_employee_category: config.api.digibiz + '/api/employee_category/add',
  get_employee_category: config.api.digibiz + '/api/employee_category/get',
  list_employee_category: config.api.digibiz + '/api/employee_category/list',
  update_employee_category: config.api.digibiz + '/api/employee_category/update',
  delete_employee_category: config.api.digibiz + '/api/employee_category/delete',

  //employee designation api
  add_employee_designation: config.api.digibiz + '/api/employee_designation/add',
  get_employee_designation: config.api.digibiz + '/api/employee_designation/get',
  list_employee_designation: config.api.digibiz + '/api/employee_designation/list',
  update_employee_designation: config.api.digibiz + '/api/employee_designation/update',
  delete_employee_designation: config.api.digibiz + '/api/employee_designation/delete',

  //employee api
  add_employee: config.api.digibiz + '/api/employee/add',
  add_digibiz_employee: config.api.digibiz + '/api/employee/add_employee',
  get_employee: config.api.digibiz + '/api/employee/get',
  list_employee: config.api.digibiz + '/api/employee/list',
  count_employee: config.api.digibiz + '/api/employee/count',
  filter_employee: config.api.digibiz + '/api/employee/filter',
  update_employee: config.api.digibiz + '/api/employee/update',
  update_employee_profile: config.api.digibiz + '/api/employee/profile/update',
  delete_employee: config.api.digibiz + '/api/employee/delete',
  device_change_employee: config.api.digibiz + '/api/employee/employee/device/change',
  delete_employee_asset: config.api.digibiz + '/api/employee/delete/asset',
  employee_delete_department: config.api.digibiz + '/api/employee/department_delete',
  set_employee_identity_picture: config.api.digibiz + '/api/employee/setEmployeeIdentityPicture',
  store_employee_identity_picture: config.api.digibiz + '/api/employee/storeEmployeeIdentityPicture',
  store_employee_identity_video_thumbnail: config.api.digibiz + '/api/employee/storeEmployeeIdentityVideoThumbnail',
  store_employee_identity_video: config.api.digibiz + '/api/employee/storeEmployeeIdentityVideo',
  get_employee_identity_picture: config.api.digibiz + '/api/employee/getEmployeeIdentityPicture',
  get_employee_thumbnail: config.api.digibiz + '/api/employee/getEmployeeIdentityPicture',
  remove_employee_identity_picture: config.api.digibiz + '/api/employee/removeEmployeeIdentityPicture',
  remove_employee_identity_video: config.api.digibiz + '/api/employee/removeEmployeeIdentityVideo',
  update_setting_info: config.api.digibiz + '/api/employee/update_setting',
  get_employee_control_setting: config.api.digibiz + '/api/employee/get-employee-control-setting',

  //employee group api's
  add_group: config.api.digibiz + '/api/groups/add',
  get_group: config.api.digibiz + '/api/groups/get',
  list_group: config.api.digibiz + '/api/groups/list',
  moderator_list_group: config.api.digibiz + '/api/groups/moderator_list',
  list_group_communication: config.api.digibiz + '/api/groups/communication_groups_list',
  list_groups_collaborator: config.api.digibiz + '/api/groups/collaborator_groups_list',
  update_employee_group: config.api.digibiz + '/api/groups/update',
  delete_group: config.api.digibiz + '/api/groups/delete',
  update_department_employee_group: config.api.digibiz + '/api/groups/department_update',
  delete_department_employee_group: config.api.digibiz + '/api/groups/department_delete',
  add_moderator_group: config.api.digibiz + '/api/groups/moderator_add',
  delete_moderator_group: config.api.digibiz + '/api/groups/moderator_delete',
  update_member_group_customer_group: config.api.digibiz + '/api/groups/memberGroupUpdate',
  delete_member_group_customer_group: config.api.digibiz + '/api/groups/memberGroupDelete',
  get_employee_group_thumbnail: config.api.digibiz + '/api/groups/getStorageFiles',
  // get_group_image: config.api.digibiz + '/api/groups/get_group_image',
  store_group_image: config.api.digibiz + '/api/groups/storeGroupDisplayPicture',
  get_group_image: config.api.digibiz + '/api/groups/getGroupImage',
  remove_group_image: config.api.digibiz + '/api/groups/removeGroupImage',
  device_change_group: config.api.digibiz + '/api/groups/device/change',
  inactive_group: config.api.digibiz + '/api/groups/inactive',
  filter_list_group: config.api.digibiz + '/api/groups/filter_list',
  filter_list_group_communication: config.api.digibiz + '/api/groups/communication_groups_filter_list',
  filter_list_groups_collaborator: config.api.digibiz + '/api/groups/collaborator_groups_filter_list',
  group_count: config.api.digibiz + '/api/groups/count',
  communication_group_count: config.api.digibiz + '/api/groups/communication_groups_count',
  collaborator_group_count: config.api.digibiz + '/api/groups/collaborator_groups_count',

  //employee group members api's 
  add_group_member: config.api.digibiz + '/api/group_members/add',
  get_employee_group_member: config.api.digibiz + '/api/group_members/get',
  list_group_member: config.api.digibiz + '/api/group_members/list',
  get_group_members: config.api.digibiz + '/api/group_members/groupMembersList',
  get_complete_group_members: config.api.digibiz + '/api/group_members/completeGroupMembersList',
  get_complete_members_list: config.api.digibiz + '/api/group_members/completeMembersList',
  get_collaborator_business_employees: config.api.digibiz + '/api/group_members/getCollaboratorBusinessEmployees',
  get_collaborator_business_list: config.api.digibiz + '/api/group_members/getCollaboratorBusinessList',
  // update_employee_group_member: config.api.digibiz + '/api/employee_group_members/update',
  delete_group_member: config.api.digibiz + '/api/group_members/delete',
  check_delete_group_member: config.api.digibiz + '/api/group_members/checkCanDeleteMember',
  get_complete_list: config.api.digibiz + '/api/group_members/getCompleteList',
  group_members_count: config.api.digibiz + '/api/group_members/count',


  //business tag api's
  add_business_tag: config.api.digibiz + '/api/business_tags/add',
  get_business_tag: config.api.digibiz + '/api/business_tags/get',
  list_business_tags: config.api.digibiz + '/api/business_tags/list',
  update_business_tag: config.api.digibiz + '/api/business_tags/update',
  delete_business_tag: config.api.digibiz + '/api/business_tags/delete',

  //business type api's
  add_business_type: config.api.digibiz + '/api/business_types/add',
  get_business_type: config.api.digibiz + '/api/business_types/get',
  list_business_type: config.api.digibiz + '/api/business_types/list',
  update_business_type: config.api.digibiz + '/api/business_types/update',
  delete_business_type: config.api.digibiz + '/api/business_types/delete',

  //business api's
  add_business: config.api.digibiz + '/api/business/add',
  get_business: config.api.digibiz + '/api/business/get',
  list_business: config.api.digibiz + '/api/business/list',
  update_business: config.api.digibiz + '/api/business/update',
  delete_business: config.api.digibiz + '/api/business/delete',
  add_super_admin: config.api.digibiz + '/api/business/add_super_admin',
  add_super_admin_by_qr: config.api.digibiz + '/api/business/add_super_admin_by_qr',
  revoke_super_admin: config.api.digibiz + '/api/business/remove_super_admin',
  view_business_check_role: config.api.digibiz + '/api/business/view_business_check_role',
  delete_business_asset: config.api.digibiz + '/api/business/delete/asset',
  get_business_thumbnail: config.api.digibiz + '/api/business/getStorageFiles',
  storage_video_declaration: config.api.digibiz + '/api/business/storageWrite',
  device_change_business: config.api.digibiz + '/api/business/business/device/change',
  set_business_multimedia: config.api.digibiz + '/api/business/setBusinessMultimedia',
  get_business_multimedia: config.api.digibiz + '/api/business/getBusinessMultimedia',
  get_business_multimedia_download: config.api.digibiz + '/api/business/getBusinessMultimediaToDownload',
  set_business_display_picture: config.api.digibiz + '/api/business/setBusinessDisplayPicture',
  set_business_display_video_thumbnail: config.api.digibiz + '/api/business/setBusinessDisplayVideoThumbnail',
  set_business_display_video: config.api.digibiz + '/api/business/setBusinessDisplayVideo',
  remove_business_display_picture: config.api.digibiz + '/api/business/removeBusinessDisplayPicture',
  remove_business_display_video: config.api.digibiz + '/api/business/removeBusinessDisplayVideo',
  individual_cloud_file_read: config.api.digibiz + '/api/business/cloudFileRead',
  business_settings: config.api.digibiz + '/api/business/business_settings',

  //navigate logs
  add_navigate_logs: config.api.digibiz + '/api/navigate_logs/add',
  get_navigate_logs: config.api.digibiz + '/api/navigate_logs/get',
  list_navigate_logs: config.api.digibiz + '/api/navigate_logs/list',
  update_navigate_logs: config.api.digibiz + '/api/navigate_logs/update',
  delete_navigate_logs: config.api.digibiz + '/api/navigate_logs/delete',

  //notification api's
  add_notification: config.api.digibiz + '/api/notifications/add',
  get_notification: config.api.digibiz + '/api/notifications/get',
  list_notification: config.api.digibiz + '/api/notifications/list',
  count_notification: config.api.digibiz + '/api/notifications/count',
  change_status_notification: config.api.digibiz + '/api/notifications/changeStatus',
  delete_notification: config.api.digibiz + '/api/notifications/delete',

  //business notification api's
  add_business_notification: config.api.digibiz + '/api/business_notifications/add',
  get_business_notification: config.api.digibiz + '/api/business_notifications/get',
  list_business_notification: config.api.digibiz + '/api/business_notifications/list',
  change_status_business_notification: config.api.digibiz + '/api/business_notifications/changeStatus',
  delete_business_notification: config.api.digibiz + '/api/business_notifications/delete',
  count_business_notification: config.api.digibiz + '/api/business_notifications/count',


  //customer identifiers api's
  add_customer_identifiers: config.api.digibiz + '/api/customer_identifiers/add',
  get_customer_identifiers: config.api.digibiz + '/api/customer_identifiers/get',
  list_customer_identifiers: config.api.digibiz + '/api/customer_identifiers/list',
  update_customer_identifiers: config.api.digibiz + '/api/customer_identifiers/update',
  delete_customer_identifiers: config.api.digibiz + '/api/customer_identifiers/delete',
  count_customer_identifiers: config.api.digibiz + '/api/customer_identifiers/count',

  //customer api's
  add_customer: config.api.digibiz + '/api/customers/add',
  add_digibiz_customer: config.api.digibiz + '/api/customers/add_customer',
  get_customer: config.api.digibiz + '/api/customers/get',
  list_customer: config.api.digibiz + '/api/customers/list',
  count_customer: config.api.digibiz + '/api/customers/count',
  update_customer: config.api.digibiz + '/api/customers/update',
  update_customer_profile: config.api.digibiz + '/api/customers/profile/update',
  delete_customer: config.api.digibiz + '/api/customers/delete',
  reassign_customer: config.api.digibiz + '/api/customers/reassign',
  device_change_customer: config.api.digibiz + '/api/customers/customer/device/change',
  delete_customer_asset: config.api.digibiz + '/api/customers/delete/asset',
  get_customer_thumbnail: config.api.digibiz + '/api/customers/getStorageFiles',
  set_customer_identity_picture: config.api.digibiz + '/api/customers/setCustomerIdentityPicture',
  get_customer_identity_picture: config.api.digibiz + '/api/customers/getCustomerIdentityPicture',
  remove_customer_identity_picture: config.api.digibiz + '/api/customers/removeCustomerIdentityPicture',
  remove_customer_identity_video: config.api.digibiz + '/api/customers/removeCustomerIdentityVideo',
  store_customer_identity_picture: config.api.digibiz + '/api/customers/storeCustomerIdentityPicture',
  store_customer_identity_video_thumbnail: config.api.digibiz + '/api/customers/storeCustomerIdentityVideoThumbnail',
  store_customer_identity_video: config.api.digibiz + '/api/customers/storeCustomerIdentityVideo',
  filter_customers: config.api.digibiz + '/api/customers/filter',

  add_collaborator_customer: config.api.digibiz + '/api/customers/collaborator-add-customer',
  delete_collaborator_customer: config.api.digibiz + '/api/customers/collaborator-delete-customer',
  update_collaborator_business_customer: config.api.digibiz + '/api/customers/collaborator-update-customers',
  delete_collaborator_identifier_customer: config.api.digibiz + '/api/customers/collaborator-delete-customer-identifier',
  get_collaborator_business_customer: config.api.digibiz + '/api/customers/get-collaborator-business-customer',
  collaborator_reassign_customer: config.api.digibiz + '/api/customers/collaborator-customers-reassign',
  //associate customer api's
  add_associate_customers: config.api.digibiz + '/api/associate_customers/add',
  add_digibiz_associate_customers: config.api.digibiz + '/api/associate_customers/add_associate_customer',
  get_associate_customers: config.api.digibiz + '/api/associate_customers/get',
  list_associate_customers: config.api.digibiz + '/api/associate_customers/list',
  update_associate_customers: config.api.digibiz + '/api/associate_customers/update',
  update_associate_customer_profile: config.api.digibiz + '/api/associate_customers/profile/update',
  delete_associate_customers: config.api.digibiz + '/api/associate_customers/delete',
  get_associate_customer_thumbnail: config.api.digibiz + '/api/associate_customers/getStorageFiles',
  delete_associate_customer_asset: config.api.digibiz + '/api/associate_customers/delete/asset',
  set_associate_customer_identity_picture: config.api.digibiz + '/api/associate_customers/setAssociateCustomerIdentityPicture',
  get_associate_customer_identity_picture: config.api.digibiz + '/api/associate_customers/getAssociateCustomerIdentityPicture',
  remove_associate_customer_identity_picture: config.api.digibiz + '/api/associate_customers/removeAssociateCustomerIdentityPicture',
  remove_associate_customer_identity_video: config.api.digibiz + '/api/associate_customers/removeAssociateCustomerIdentityVideo',
  store_associate_customer_identity_picture: config.api.digibiz + '/api/associate_customers/storeAssociateCustomerIdentityPicture',
  store_associate_customer_identity_video_thumbnail: config.api.digibiz + '/api/associate_customers/storeAssociateCustomerIdentityVideoThumbnail',
  store_associate_customer_identity_video: config.api.digibiz + '/api/associate_customers/storeAssociateCustomerIdentityVideo',

  //contact lists api's
  list_contacts_lists: config.api.digibiz + '/api/contact_lists/list',
  get_contacts_list: config.api.digibiz + '/api/contact_lists/getCustomersContactList',
  get_contact_group_contact_list: config.api.digibiz + '/api/contact_lists/getGroupContactList',
  get_identifier_item_customer: config.api.digibiz + '/api/contact_lists/get_identifier_item_customer',

  //collaborator api's
  add_collaborator: config.api.digibiz + '/api/collaborators/add',
  get_collaborator: config.api.digibiz + '/api/collaborators/get',
  list_collaborator: config.api.digibiz + '/api/collaborators/list',
  count_collaborator: config.api.digibiz + '/api/collaborators/count',
  update_collaborator: config.api.digibiz + '/api/collaborators/update',
  delete_collaborator: config.api.digibiz + '/api/collaborators/delete',
  list_collaborator_business_customer: config.api.digibiz + '/api/collaborators/collaborator_business_list',
  list_collaborator_customer: config.api.digibiz + '/api/collaborators/customer_list',
  count_collaborator_business_customer: config.api.digibiz + '/api/collaborators/collaborator_business_count',


  //collaborator groups api's
  // add_collaborator_group: config.api.digibiz + '/api/collaborator_groups/add',
  // get_collaborator_group: config.api.digibiz + '/api/collaborator_groups/get',
  // list_collaborator_group: config.api.digibiz + '/api/collaborator_groups/list',
  // update_collaborator_group: config.api.digibiz + '/api/collaborator_groups/update',
  // delete_collaborator_group: config.api.digibiz + '/api/collaborator_groups/delete',


  //role_management api's
  add_role_management: config.api.digibiz + '/api/role_management/add',
  get_role_management: config.api.digibiz + '/api/role_management/get',
  list_role_management: config.api.digibiz + '/api/role_management/list',
  update_role_management: config.api.digibiz + '/api/role_management/update',
  delete_role_management: config.api.digibiz + '/api/role_management/delete',

  //business_owner api's
  add_business_owner: config.api.digibiz + '/api/role_management/addBusinessOwner',
  get_business_owner: config.api.digibiz + '/api/role_management/getBusinessOwner',
  list_business_owner: config.api.digibiz + '/api/role_management/listBusinessOwners',
  update_business_owner: config.api.digibiz + '/api/role_management/updateBusinessOwner',
  delete_business_owner: config.api.digibiz + '/api/role_management/remove',

  //digibiz logs api's
  list_digibiz_logs: config.api.digibiz + '/api/digibiz_logs/list',
  update_digibiz_logs: config.api.digibiz + '/api/digibiz_logs/update',
  delete_digibiz_logs: config.api.digibiz + '/api/digibiz_logs/delete',
  get_digibiz_logs_by_filters: config.api.digibiz + '/api/digibiz_logs/logs-filter-list',

  // //Communication groups api's
  // add_communication_group: config.api.digibiz + '/api/communication_groups/add',
  // get_communication_group: config.api.digibiz + '/api/communication_groups/get',
  // list_communication_group: config.api.digibiz + '/api/communication_groups/list',
  // update_communication_group: config.api.digibiz + '/api/communication_groups/update',
  // delete_communication_group: config.api.digibiz + '/api/communication_groups/delete',
  // get_communication_group_image_thumbnail: config.api.digibiz + '/api/communication_groups/getStorageFiles',

  // //Communication group members api's
  // add_communication_group_members: config.api.digibiz + '/api/communication_group_members/add',
  // get_communication_group_member: config.api.digibiz + '/api/communication_group_members/get',
  // list_communication_group_members: config.api.digibiz + '/api/communication_group_members/list',
  // delete_communication_group_member: config.api.digibiz + '/api/communication_group_members/delete',


  //contact access members api's
  add_contact_access: config.api.digibiz + '/api/contact_access/addContactAccess',
  list_contact_access: config.api.digibiz + '/api/contact_access/list',
  list_identifier_items_employees: config.api.digibiz + '/api/contact_access/listIdentifierItemsEmployees',
  active_custom_group_employee: config.api.digibiz + '/api/contact_access/getActiveCustomGroupList',
  show_access_list_employee: config.api.digibiz + '/api/contact_access/show_access_list_employee',
  show_access_list_customer: config.api.digibiz + '/api/contact_access/show_access_list_customer',
  access_list: config.api.digibiz + '/api/contact_access/access_list',

  revoke_access: config.api.digibiz + '/api/contact_access/revoke',
  delete_records: config.api.digibiz + '/api/contact_access/deleteRecords',


  //group access members api's
  add_group_access: config.api.digibiz + '/api/group_access/addGroupAccess',
  group_access_list: config.api.digibiz + '/api/group_access/access_list',
  group_revoke_access: config.api.digibiz + '/api/group_access/revoke',
  group_delete_records: config.api.digibiz + '/api/group_access/deleteRecords',

  //account api's
  add_account: config.api.digibiz + '/api/accounts/add',
  get_account: config.api.digibiz + '/api/accounts/get',
  get_digibiz_account: config.api.digibiz + '/api/accounts/get_account',
  get_digibiz_record: config.api.digibiz + '/api/accounts/get_account_record',
  account_settings: config.api.digibiz + '/api/accounts/account_settings',
  account_update: config.api.digibiz + '/api/accounts/update',
  account_delete: config.api.digibiz + '/api/accounts/delete',
  check_can_account_delete: config.api.digibiz + '/api/accounts/checkCanDeleteDigibizAccount',
  update_digibiz_record: config.api.digibiz + '/api/accounts/updateRole',

  //jeevi api's
  add_jeevi: config.api.digibiz + '/api/jeevi/add',
  get_jeevi: config.api.digibiz + '/api/jeevi/get',
  jeevi_account_settings: config.api.digibiz + '/api/jeevi/jeevi_account_settings',
  jeevi_account_delete: config.api.digibiz + '/api/jeevi/delete',

  //display control api's
  add_display_control: config.api.digibiz + '/api/display_control/add',
  get_display_control: config.api.digibiz + '/api/display_control/get',
  delete_display_control: config.api.digibiz + '/api/display_control/delete',


  //common api;s
  get_core_file: config.api.digibiz + '/api/common/getStorageFiles',
  get_base64: config.api.digibiz + '/api/common/getBase64core',

  //employee department assignment api's
  add_employee_department: config.api.digibiz + '/api/employee_department_assignment/add',
  get_employee_department: config.api.digibiz + '/api/employee_department_assignment/get',
  list_employee_department: config.api.digibiz + '/api/employee_department_assignment/list',
  delete_employee_department: config.api.digibiz + '/api/employee_department_assignment/department_delete',

  digibiz_get_assets: config.api.bizassets + '/api/assets/get',
  digibiz_asset_details: config.api.bizassets + '/api/assets/get_details',
  chunk_download: config.api.digibiz_storage + '/api/chunks/download',
  chunk_view_by_file: config.api.digibiz_storage + '/api/chunks/view_by_url',


  //theme changes apis
  add_theme: config.api.digibiz + '/api/theme/add',
  get_theme: config.api.digibiz + '/api/theme/get',
  delete_theme: config.api.digibiz + '/api/theme/delete',


  //app permissions api
  add_app_permissions: config.api.digibiz + '/api/app_permissions/add',
  get_app_permissions: config.api.digibiz + '/api/app_permissions/get',
  list_app_permissions: config.api.digibiz + '/api/app_permissions/list',
  change_status_app_permissions: config.api.digibiz + '/api/app_permissions/status_change',

  //roles list
  get_customer_roles_list: config.api.digibiz + '/api/customers/getRolesList',
  get_associate_customer_roles_list: config.api.digibiz + '/api/associate_customers/getRolesList',

  //transaction signature picture
  add_transaction_signature_picture: config.api.digibiz + '/api/transaction_signature_pictures/add',
  get_record_transaction_signature_picture: config.api.digibiz + '/api/transaction_signature_pictures/getRecord',
  get_transaction_signature_picture: config.api.digibiz + '/api/transaction_signature_pictures/get',
  get_base64_transaction_signature_picture: config.api.digibiz + '/api/transaction_signature_pictures/getBase64digibiz',
  list_transaction_signature_picture: config.api.digibiz + '/api/transaction_signature_pictures/list',
  update_transaction_signature_picture: config.api.digibiz + '/api/transaction_signature_pictures/update',
  delete_record_transaction_signature_picture: config.api.digibiz + '/api/transaction_signature_pictures/delete',
};

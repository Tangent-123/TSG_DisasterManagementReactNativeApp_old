let BasicUrl = 'http://Devapi.tatadisasterresponse.com/'
export default BASEURLS = {
    LoginUrl: BasicUrl + 'api/app-user-login',
    UpdateUser: BasicUrl + 'api/update-user-profile',
    GenrateCode: BasicUrl + 'api/view-generate-code?userid=',
    ResponceCode: BasicUrl + 'api/view-generate-team?responce_code=',
    DeleteResponseBeneficiary: BasicUrl + 'api/delete-response-beneficiary-list',
    UpdateResposeList: BasicUrl + 'api/update-response-beneficiary-list',
    AddResponseList: BasicUrl + 'api/add-response-beneficiary-list',
    GetHemletReport: BasicUrl + 'api/get-hemlet-report?village_sys_id=',
    GetVillageReport: BasicUrl + 'api/get-village-report?village_sys_id=',
    GetGramPanchayatReport: BasicUrl + 'api/get-gram-panchayat-report?block_sys_id=',
    GetBlockReport: BasicUrl + 'api/get-block-report?district_sys_id=',
    PostVillageName: BasicUrl + 'api/post-village-name',
    PostPanchayatName: BasicUrl + 'api/post-gram-panchayat-name',
    PostBlockName: BasicUrl + 'api/post-block-name',
    PostDistrictName: BasicUrl + 'api/post-district-name',
    PostHemletName: BasicUrl + 'api/post-hemlet-name',
    AddNotice: BasicUrl +'api/add-notice-board',
    AddMappingData: BasicUrl + 'api/add-response-location-mapping',
    UpadateMapping:BasicUrl + 'api/update-response-location-mapping',

}


//http://Devapi.tatadisasterresponse.com/api/update-response-location-mapping
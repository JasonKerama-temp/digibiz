var api_update_session = config.api.core + '/api/jeevi/update_session';
var device_id = crossplat.device.uuid;
var idle=true;
$(function () {
    setInterval(pingPage, 60000);
    $(this).on('mousemove keypress click scroll', function (e) {
        idle = false;
    });
});
function pingPage(){
    if(!idle && window.location.hash != "#login"){
        updateSession(function(status){
            if(status == 'success'){
                idle=true;
            }
        });
    }
}
function updateSession(callback) {
    var requestParams = {
        device_id
    };
    fetch.apiCall(function (response, status, xhr) {
        callback(status);
    }, api_update_session, 'POST', 'JSON', requestParams);
}
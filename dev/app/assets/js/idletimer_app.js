// let api_update_app_session = config.api.core + '/api/jeevi/update_app_session';
// let idle_app = true;
// $(function () {
//     setInterval(function () {
//         //console.log('ping page', !idle_app);
//         if (!idle_app) {
//             //console.log("inside if");
//             updateAppSession(function (status) {
//                 if (status == 'success') {
//                     idle_app = true;
//                 }
//             });
//         }
//     }, 60000);
//     $(this).on('mousemove keypress click scroll', function (e) {
//         idle_app = false;
//     });
// });
// function updateAppSession(callback) {
//     //console.log("inside updateAppSession");
//     var requestParams = {
//         device_id,
//         app: 'digibiz'
//     };
//     fetch.apiCall(function (response, status, xhr) {
//         //console.log("result", status);
//         callback(status);
//     }, api_update_app_session, 'POST', 'JSON', requestParams);
// }


let api_update_app_session = config.api.core + '/api/jeevi/update_app_session';
let idle_app = true;
$(function () {
    setInterval(function () {
        //console.log('ping page', !idle_app);
        if (!idle_app) {
            //console.log("inside");
            updateAppSession(function (status) {
                if (status == 'success') {
                    idle_app = true;
                }
            });
        } else {
            //console.log("else");
        }
    }, 60000);
    $(this).on('mousemove keypress click scroll', function (e) {
        //console.log("********mouse move*********")
        idle_app = false;
    });
});
function updateAppSession(callback) {
    //console.log("inside updateAppSession")
    var requestParams = {
        device_id: crossplat.device.uuid,
        app: 'digibiz'
    };
    //console.log("requestParams", requestParams);
    fetch.apiCall(function (response, status, xhr) {
        //console.log("result", status);
        callback(status);
    }, api_update_app_session, 'POST', 'JSON', requestParams);
}
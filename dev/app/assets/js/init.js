if (crossplat.device.platform == 'browser') {    
    if (window.Cookies.get('misc')) {
        crossplat.device.uuid = window.Cookies.get('misc');
    }
}

//digibiz init\
// if (crossplat.device.platform == 'Android') {
//     //console.log("init.js -condition chec");
//     if (!localStorage.getItem('__DEVSTATUS')) {
//         //console.log("Devstatus not theress");
//         cordova.plugins.browsertab.openUrl("https://accounts.digitaljeevi.com/device/config?proposed_id=" + crossplat.device.uuid + "&redirect=djbusiness", {}, function (status) {
//             //console.log("success -", status);
//         }, function (err) {
//             //console.log("err -", err);
//         });
//     } else {
//         //console.log("Devstatus present");
//         crossplat.device.uuid = localStorage.getItem('device_id');
//     }
// }

if (crossplat.device.platform == 'Android' || crossplat.device.platform == 'iOS') {
    // console.log("init.js -condition chec");
    if (!localStorage.getItem('__DEVSTATUS')) {
        console.log("Devstatus not theress");
        cordova.plugins.browsertab.openUrl("https://accounts.digitaljeevi.com/device/config?proposed_id=" + crossplat.device.uuid + "&redirect=djbusiness", {scheme: "djbusiness://"}, function (status) {
            // console.log("success -", status);
        }, function (err) {
            // console.log("err -", err);
        });
    } else {
        console.log("Devstatus present-", localStorage.getItem('device_id'));
        crossplat.device.uuid = localStorage.getItem('device_id');
    }
}
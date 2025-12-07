var validate = {    
    checkIfValidString: function (val) {
        var pattern = /^[A-Za-z]+$/;
        return typeof (val) == pattern ? true : false;
    },
    checkIfValidNumber: function (number) {
        var pattern = /^[0-9]+$/;
        return pattern.test(number);
    },   
    checkIfValidEmail: function (email) {
        var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    },
    checkIfIntelValidPhoneNumber: function(phone_number){
        //console.log("checkIfIntelValidPhoneNumber", phone_number);
        return phone_number.intlTelInput("isValidNumber");
    },
    checkIfValidMobileNumber: function (mobile_number) {
        var pattern = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
        return pattern.test(mobile_number);
    },
    checkIfAlphanumeric: function (name) {
        var pattern = /^[0-9a-zA-Z]+$/;
        return pattern.test(name);
    },
    checkIfAlpha: function (name) {
        var pattern = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
        return pattern.test(name);
    },
    checkIfValidUrl: function (url) {
        //igenores http/https
        var pattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
        return pattern.test(url);
    }
}
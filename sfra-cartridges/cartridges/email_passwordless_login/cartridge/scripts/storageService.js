'use strict';

var CustomObjectMgr = require('dw/object/CustomObjectMgr')

function createLoginAttemptsCustomObject(data) {
    var CustomObject = CustomObjectMgr.createCustomObject('PasswordlessLoginAttempt', data.email)  
    CustomObject.custom.attempts = data.attempt
    return CustomObject
}

function getLoginAttemptsCustomObject(email) {
    var CustomObject = CustomObjectMgr.getCustomObject('PasswordlessLoginAttempt', email)
    return CustomObject
}

module.exports = {
    createLoginAttemptsCustomObject: createLoginAttemptsCustomObject, 
    getLoginAttemptsCustomObject: getLoginAttemptsCustomObject
}
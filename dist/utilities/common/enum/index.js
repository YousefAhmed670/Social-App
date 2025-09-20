"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_TYPE = exports.USER_AGENT = exports.GENDER = exports.SYS_ROLE = void 0;
var SYS_ROLE;
(function (SYS_ROLE) {
    SYS_ROLE["User"] = "user";
    SYS_ROLE["Admin"] = "admin";
    SYS_ROLE["SuperAdmin"] = "superAdmin";
})(SYS_ROLE || (exports.SYS_ROLE = SYS_ROLE = {}));
var GENDER;
(function (GENDER) {
    GENDER["Male"] = "male";
    GENDER["Female"] = "female";
})(GENDER || (exports.GENDER = GENDER = {}));
var USER_AGENT;
(function (USER_AGENT) {
    USER_AGENT["Local"] = "local";
    USER_AGENT["Google"] = "google";
})(USER_AGENT || (exports.USER_AGENT = USER_AGENT = {}));
var TOKEN_TYPE;
(function (TOKEN_TYPE) {
    TOKEN_TYPE["Refresh"] = "refresh";
    TOKEN_TYPE["Access"] = "access";
})(TOKEN_TYPE || (exports.TOKEN_TYPE = TOKEN_TYPE = {}));

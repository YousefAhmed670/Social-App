"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_TYPE = exports.USER_AGENT = exports.GENDER = exports.SYS_ROLE = void 0;
var SYS_ROLE;
(function (SYS_ROLE) {
    SYS_ROLE[SYS_ROLE["User"] = 0] = "User";
    SYS_ROLE[SYS_ROLE["Admin"] = 1] = "Admin";
    SYS_ROLE[SYS_ROLE["SuperAdmin"] = 2] = "SuperAdmin";
})(SYS_ROLE || (exports.SYS_ROLE = SYS_ROLE = {}));
var GENDER;
(function (GENDER) {
    GENDER[GENDER["Male"] = 0] = "Male";
    GENDER[GENDER["Female"] = 1] = "Female";
})(GENDER || (exports.GENDER = GENDER = {}));
var USER_AGENT;
(function (USER_AGENT) {
    USER_AGENT[USER_AGENT["Local"] = 0] = "Local";
    USER_AGENT[USER_AGENT["Google"] = 1] = "Google";
})(USER_AGENT || (exports.USER_AGENT = USER_AGENT = {}));
var TOKEN_TYPE;
(function (TOKEN_TYPE) {
    TOKEN_TYPE[TOKEN_TYPE["Access"] = 0] = "Access";
    TOKEN_TYPE[TOKEN_TYPE["Refresh"] = 1] = "Refresh";
})(TOKEN_TYPE || (exports.TOKEN_TYPE = TOKEN_TYPE = {}));

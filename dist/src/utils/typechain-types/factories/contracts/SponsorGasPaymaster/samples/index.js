"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyingPaymaster__factory = exports.SimpleAccountFactory__factory = exports.SimpleAccount__factory = exports.callback = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
exports.callback = __importStar(require("./callback"));
var SimpleAccount__factory_1 = require("./SimpleAccount__factory");
Object.defineProperty(exports, "SimpleAccount__factory", { enumerable: true, get: function () { return SimpleAccount__factory_1.SimpleAccount__factory; } });
var SimpleAccountFactory__factory_1 = require("./SimpleAccountFactory__factory");
Object.defineProperty(exports, "SimpleAccountFactory__factory", { enumerable: true, get: function () { return SimpleAccountFactory__factory_1.SimpleAccountFactory__factory; } });
var VerifyingPaymaster__factory_1 = require("./VerifyingPaymaster__factory");
Object.defineProperty(exports, "VerifyingPaymaster__factory", { enumerable: true, get: function () { return VerifyingPaymaster__factory_1.VerifyingPaymaster__factory; } });
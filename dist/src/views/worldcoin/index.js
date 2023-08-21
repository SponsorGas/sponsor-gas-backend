"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const idkit_1 = require("@worldcoin/idkit");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const App = () => {
    const onSuccess = () => {
        console.log("onSuccess");
    };
    const handleVerify = async (data) => {
        console.log(data);
        const url = new URL(window.location.href);
        url.search = '';
        // Construct the challenge submission URL
        const submissionUrl = `${url.toString()}/worldcoin/submit`;
        // Call the API to submit the challenge response
        try {
            const response = await fetch(`${submissionUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            });
            console.log(response);
            // Check if the API call was successful
            if (response.ok) {
                // Get the JSON data from the response
                const data = await response.json();
                // Send the response back to the UI using window.postMessage()
                window.opener.postMessage({ target: 'sponsor-gas', data: data }, '*');
                window.close();
            }
            else {
                // Handle the case when the API call fails
                console.error('Identity Proof Verification failed.');
                throw new Error('Identity Proof Verification failed.');
                // You can show an error message to the user or handle the error in any other way
            }
        }
        catch (error) {
            // Handle any other errors that may occur during the API call
            console.error('An error occurred:', error);
            throw new Error('Identity Proof Verification failed.');
        }
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Sybil Resistant Identity!"),
        react_1.default.createElement("p", null, "Prove you are a human via Worldcoin."),
        react_1.default.createElement(idkit_1.IDKitWidget, { app_id: "app_staging_05593ec5ccbc03aede3ee2a86e3686d6" // obtained from the Developer Portal
            , action: "identityproof" // this is your action name from the Developer Portal
            , onSuccess: onSuccess, handleVerify: handleVerify, credential_types: [idkit_1.CredentialType.Phone], enableTelemetry // optional, defaults to false
            : true }, ({ open }) => react_1.default.createElement("button", { onClick: open }, "Verify with World ID"))));
};
react_dom_1.default.render(react_1.default.createElement(App, null), document.getElementById('root'));

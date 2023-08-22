import { CredentialType, IDKitWidget, ISuccessResult } from '@worldcoin/idkit';
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const onSuccess = ()=>{
    console.log("onSuccess")
  }
  const handleVerify = async(data:ISuccessResult)=>{
      console.log(data)
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

        console.log(response)
        // Check if the API call was successful
        if (response.ok) {
          // Get the JSON data from the response
          const data = await response.json();

          // Send the response back to the UI using window.postMessage()
          window.opener.postMessage({ target:'sponsor-gas', data: data }, '*');
          window.close();
        } else {
          // Handle the case when the API call fails
          console.error('Identity Proof Verification failed.');
          throw new Error('Identity Proof Verification failed.')
          // You can show an error message to the user or handle the error in any other way
        }
      } catch (error) {
       
        // Handle any other errors that may occur during the API call
        console.error('An error occurred:', error);
        throw new Error('Identity Proof Verification failed.')
      }

  }
  return (
    <div>
      <h1>Sybil Resistant Identity!</h1>
      <p>Prove you are a human via Worldcoin.</p>
      <IDKitWidget
        app_id="app_staging_05593ec5ccbc03aede3ee2a86e3686d6" // obtained from the Developer Portal
        action="identityproof" // this is your action name from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        handleVerify={handleVerify} // optional callback when the proof is received
        credential_types={[CredentialType.Phone]} // optional, defaults to ['orb']
        enableTelemetry // optional, defaults to false
      >
        {({ open }) => <button onClick={open}>Verify with World ID</button>}
      </IDKitWidget>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

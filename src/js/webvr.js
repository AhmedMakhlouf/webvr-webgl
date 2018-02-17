    var vr = {};
    var polyfill = new WebVRPolyfill();

    /* var polyfill = new WebVRPolyfill({
        // Ensures the polyfill is always active on mobile, due to providing
        // a polyfilled CardboardVRDisplay when no native API is available,
        // and also polyfilling even when the native API is available, due to
        // providing a CardboardVRDisplay when no native VRDisplays exist.
        PROVIDE_MOBILE_VRDISPLAY: true,
        // Polyfill optimizations
        DIRTY_SUBMIT_FRAME_BINDINGS: true,
        BUFFER_SCALE: 0.75,
      }); */

    console.log(polyfill);
    console.log(navigator.getVRDisplays());
    console.log(navigator);

    navigator.getVRDisplays().then(displays => {
        // Filter down to devices that can present.
        displays = displays.filter(display => display.capabilities.canPresent);
    
        // If there are no devices available, quit out.
        if (displays.length === 0) {
            console.warn('No devices available able to present.');
            alert("No devices available able to present.");
            return;
        }
    
        // Store the first display we find. A more production-ready version should
        // allow the user to choose from their available displays.
        //console.log(displays[0]);
        vr.display = displays[0];
        vr.display.depthNear = 0.1;
        vr.display.depthFar = 100;

        vr.display.requestPresent([{
            //source: this._renderer.domElement
            source: document.querySelector('#glcanvas')
        }]);

        //console.log(vr.display);
        //console.log(vr.display.requestAnimationFrame());
        vr.frameData = new VRFrameData();
        vr.display.getFrameData(vr.frameData);
        //console.log(vr.display);
        //console.log(vr.frameData);
        
    });

    /* console.log("HI AHMED");
    console.log(vr.display.requestPresent); */
    // leftProjectionMatrix: Float32Array(16), leftViewMatrix: Float32Array(16), rightProjectionMatrix: Float32Array(16)

    
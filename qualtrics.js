Qualtrics.SurveyEngine.addOnload(function () {

    // Retrieve Qualtrics object and save in qthis
    var qthis = this;

    // Hide buttons
    qthis.hideNextButton();

    // Defining and load required resources
    var jslib_url = "https://lhw-1.github.io/jspsych-6.3.1/";
    var requiredResources = [
        jslib_url + "jspsych.js",
        jslib_url + "plugins/jspsych-html-keyboard-response.js"
    ];

    function loadScript(idx) {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if ((idx + 1) < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                initExp();
            }
        });
    }

    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }

    // Append the display_stage Div using jQuery
    // jQuery is loaded in Qualtrics by default
    jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
    jQuery("<div id = 'display_stage'></div>").appendTo('body');


    // Wrap jsPsych.init() in a function
    function initExp() {

        /* CHANGE HERE: Your JsPsych Variables */
        var hello_trial = {
            type: 'html-keyboard-response',
            stimulus: 'Hello world!'
        }

        jsPsych.init({
            /* CHANGE HERE: Your JsPsych Timeline */
            timeline: [hello_trial],
            display_element: 'display_stage',

            // Adding the clean up and continue functions
            on_finish: function (data) {
                jQuery('#display_stage').remove();
                jQuery('#display_stage_background').remove();

                // Simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
                qthis.clickNextButton();
            }
        });
    }
});
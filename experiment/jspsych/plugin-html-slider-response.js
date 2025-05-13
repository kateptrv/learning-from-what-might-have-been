var jsPsychHtmlSliderResponse = (function (jspsych) {
    'use strict';
  
    const info = {
      name: "html-slider-response",
      parameters: {
        stimulus: {
          type: jspsych.ParameterType.HTML_STRING,
          pretty_name: "Stimulus",
          default: undefined,
        },
        min: {
          type: jspsych.ParameterType.INT,
          pretty_name: "Min slider",
          default: 0,
        },
        max: {
          type: jspsych.ParameterType.INT,
          pretty_name: "Max slider",
          default: 100,
        },
        slider_start: {
          type: jspsych.ParameterType.INT,
          pretty_name: "Slider starting value",
          default: 50,
        },
        step: {
          type: jspsych.ParameterType.INT,
          pretty_name: "Step",
          default: 1,
        },
        labels: {
          type: jspsych.ParameterType.HTML_STRING,
          pretty_name: "Labels",
          default: [],
          array: true,
        },
        slider_width: {
          type: jspsych.ParameterType.INT,
          pretty_name: "Slider width",
          default: null,
        },
        button_label: {
          type: jspsych.ParameterType.STRING,
          pretty_name: "Button label",
          default: "Continue",
          array: false,
        },
        require_movement: {
          type: jspsych.ParameterType.BOOL,
          pretty_name: "Require movement",
          default: false,
        },
        prompt: {
          type: jspsych.ParameterType.HTML_STRING,
          pretty_name: "Prompt",
          default: null,
        },
        stimulus_duration: {
          type: jspsych.ParameterType.INT,
          pretty_name: "Stimulus duration",
          default: null,
        },
        trial_duration: {
          type: jspsych.ParameterType.INT,
          pretty_name: "Trial duration",
          default: null,
        },
        response_ends_trial: {
          type: jspsych.ParameterType.BOOL,
          pretty_name: "Response ends trial",
          default: true,
        },
      },
    };
  
    class HtmlSliderResponsePlugin {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
  
      trial(display_element, trial) {
        var half_thumb_width = 7.5;
        var html = '<div id="jspsych-html-slider-response-wrapper" style="margin: 100px 0px;">';
        html += '<div id="jspsych-html-slider-response-stimulus">' + trial.stimulus + "</div>";
        html += '<div class="jspsych-html-slider-response-container" style="position:relative; margin: 0 auto 3em auto; ';
        if (trial.slider_width !== null) {
          html += "width:" + trial.slider_width + "px;";
        } else {
          html += "width:auto;";
        }
        html += '">';
        html += '<input type="range" class="jspsych-slider-unclicked" ';
        html +=
          'value="' +
          trial.slider_start +
          '" min="' +
          trial.min +
          '" max="' +
          trial.max +
          '" step="' +
          trial.step +
          '" id="jspsych-html-slider-response-response"></input>';
        html += "<div>";
  
        for (var j = 0; j < trial.labels.length; j++) {
          var label_width_perc = 100 / (trial.labels.length - 1);
          var percent_of_range = j * (100 / (trial.labels.length - 1));
          var percent_dist_from_center = ((percent_of_range - 50) / 50) * 100;
          var offset = (percent_dist_from_center * half_thumb_width) / 100;
          html +=
            '<div style="border: 1px solid transparent; display: inline-block; position: absolute; ' +
            "left:calc(" +
            percent_of_range +
            "% - (" +
            label_width_perc +
            "% / 2) - " +
            offset +
            "px); text-align: center; width: " +
            label_width_perc +
            '%;">';
          html += '<span style="text-align: center; font-size: 80%;">' + trial.labels[j] + "</span>";
          html += "</div>";
        }
        html += "</div>";
        html += "</div>";
        html += "</div>";
  
        if (trial.prompt !== null) {
          html += trial.prompt;
        }
  
        // add submit button
        html +=
          '<button id="jspsych-html-slider-response-next" class="jspsych-btn" ' +
          (trial.require_movement ? "disabled" : "") +
          ">" +
          trial.button_label +
          "</button>";
  
        display_element.innerHTML = html;
  
        var response = {
          rt: null,
          response: null,
        };
  
        if (trial.require_movement) {
          const enable_button = () => {
            display_element.querySelector("#jspsych-html-slider-response-next").disabled = false;
          };
  
          display_element
            .querySelector("#jspsych-html-slider-response-response")
            .addEventListener("mousedown", enable_button);
          display_element
            .querySelector("#jspsych-html-slider-response-response")
            .addEventListener("touchstart", enable_button);
          display_element
            .querySelector("#jspsych-html-slider-response-response")
            .addEventListener("change", enable_button);
        }
  
        document
          .getElementById("jspsych-html-slider-response-response")
          .addEventListener("mousedown", function (e) {
            e.target.classList.remove("jspsych-slider-unclicked");
          });
        document
          .getElementById("jspsych-html-slider-response-response")
          .addEventListener("touchstart", function (e) {
            e.target.classList.remove("jspsych-slider-unclicked");
          });
  
        const end_trial = () => {
          this.jsPsych.pluginAPI.clearAllTimeouts();
          var trialdata = {
            rt: response.rt,
            stimulus: trial.stimulus,
            slider_start: trial.slider_start,
            response: response.response,
          };
          display_element.innerHTML = "";
          this.jsPsych.finishTrial(trialdata);
        };
  
        display_element
          .querySelector("#jspsych-html-slider-response-next")
          .addEventListener("click", () => {
            var endTime = performance.now();
            response.rt = Math.round(endTime - startTime);
            response.response = display_element.querySelector("#jspsych-html-slider-response-response").valueAsNumber;
            if (trial.response_ends_trial) {
              end_trial();
            } else {
              display_element.querySelector("#jspsych-html-slider-response-next").disabled = true;
            }
          });
  
        if (trial.stimulus_duration !== null) {
          this.jsPsych.pluginAPI.setTimeout(() => {
            display_element.querySelector("#jspsych-html-slider-response-stimulus").style.visibility = "hidden";
          }, trial.stimulus_duration);
        }
  
        if (trial.trial_duration !== null) {
          this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
        }
  
        var startTime = performance.now();
      }
    }
  
    HtmlSliderResponsePlugin.info = info;
    return HtmlSliderResponsePlugin;
  
  })(jsPsychModule);
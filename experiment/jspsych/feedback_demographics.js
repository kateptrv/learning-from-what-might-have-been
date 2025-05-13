const feedback_demographics = {
    type: jsPsychSurveyHtmlForm,
    html: `
      <div style="max-width:700px; margin:auto; text-align:left;">
        <p style="text-align:center;">Please provide the following information to complete the study:</p>
  
        <!-- Open-ended feedback -->
        <p><strong>What factors influenced how you decided to respond?
        Do you have any questions or comments regarding the experiment?</strong></p>
        <textarea name="feedback" cols="50" rows="6" autofocus style="width:100%;">
        </textarea>
  
        <!-- Best Tree -->
        <p><strong>Which tree do you think was the best one?</strong></p>
        <label><input type="radio" name="best_tree" value="left"> Left</label><br>
        <label><input type="radio" name="best_tree" value="center"> Center</label><br>
        <label><input type="radio" name="best_tree" value="right"> Right</label><br>
  
        <!-- Confidence -->
        <p><strong>How confident are you that you found the best tree?</strong></p>
        <label><input type="radio" name="confidence" value="not_at_all_confident"> 
          Not at all confident
        </label><br>
        <label><input type="radio" name="confidence" value="a_little_bit_confident"> 
          A little bit confident
        </label><br>
        <label><input type="radio" name="confidence" value="moderately_confident"> 
          Moderately confident
        </label><br>
        <label><input type="radio" name="confidence" value="extremely_confident"> 
          Extremely confident
        </label><br>
        
        <!-- Proportion of Ripe Fruit -->
        <p><strong>On what proportion of the trials do you think the tree that you've 
        identified as the best one returned ripe fruit?</strong>
        (Enter a number between 0% and 100%)</p>
        <input type="number" name="ripe_proportion" min="0" max="100" 
               style="width:100%; max-width:150px;"/>
        <br><br>
  
        <!-- Demographics Section -->
        <div style="
          display: grid; 
          grid-template-columns: 150px auto; 
          row-gap: 1.5em; 
          column-gap: 1em;
        ">
          <!-- Age -->
          <div style="align-self:center;"><strong>Age:</strong></div>
          <div>
            <input name="age" type="number" min="18" max="100" 
                   style="width:100%; max-width:100px;" />
          </div>
  
          <!-- Gender -->
          <div style="align-self:center;"><strong>Gender:</strong></div>
          <div>
            <label><input name="gender" type="radio" value="Female"> Female</label>
            <label><input name="gender" type="radio" value="Male"> Male</label>
            <label><input name="gender" type="radio" value="Non-binary"> Non-binary</label><br>
            <label>Other: <input type="text" name="other_gender" style="width:50%;" /></label>
          </div>
  
          <!-- Race -->
          <div style="align-self:center;"><strong>Race:</strong></div>
          <div>
            <label><input name="race" type="radio" value="White"> White</label><br>
            <label><input name="race" type="radio" value="Black/African American"> 
                   Black/African American
            </label><br>
            <label><input name="race" type="radio" value="American Indian/Alaska Native"> 
                   American Indian/Alaska Native
            </label><br>
            <label><input name="race" type="radio" value="Asian"> Asian</label><br>
            <label><input name="race" type="radio" value="Native Hawaiian/Pacific Islander"> 
                   Native Hawaiian/Pacific Islander
            </label><br>
            <label><input name="race" type="radio" value="Multiracial/Mixed"> 
                   Multiracial/Mixed
            </label><br>
            <label>Other: <input type="text" name="other_race" style="width:50%;" /></label>
          </div>
  
          <!-- Ethnicity -->
          <div style="align-self:center;"><strong>Ethnicity:</strong></div>
          <div>
            <label><input name="ethnicity" type="radio" value="Hispanic"> Hispanic</label>
            <label><input name="ethnicity" type="radio" value="Non-Hispanic"> Non-Hispanic</label>
          </div>
        </div><!-- end demographic grid -->
  
        <p style="text-align:center;">Please press the finish button to complete the experiment.</p>
      </div>`, // end html
  
    button_label: 'Finish',
  
    on_finish: function (data) {
      let response = {};
      response.feedback = data.response.feedback;
      response.age = parseInt(data.response.age);
      response.confidence = data.response.confidence;
      response.best_tree = data.response.best_tree;
      response.ripe_proportion = parseInt(data.response.ripe_proportion);
  
      // Race
      response.race =
        data.response.race === 'other_race' || 
        typeof data.response.race === 'undefined'
          ? data.response.other_race
          : data.response.race;
  
      // Gender
      response.gender = data.response.gender;
  
      // Ethnicity
      response.ethnicity = typeof data.response.ethnicity === 'undefined'
        ? ''
        : data.response.ethnicity;
  
      data.response = response;
    }
  };
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");


//========================= This is the 1st question (team name) =========================
const teamName = async () => {
  const teamResult = await inquirer.prompt([
    {
      type: "input",
      name: "team",
      message: "What would you like the Team name to be?"
    }
  ]);
  const team = teamResult.team;
  console.log("team name: " + team);
    console.log("Successfully wrote to output.html");

  questions();
}
//Self Note: function above is called at the bottom of the page


  //this function is triggered after the last prompt, asking user if they would like to add an additional team member.
  function addMember() {
    questions();
  }


  //this variable stores an array of objects (from employee prompts)
  const everything = [];

  //========================= This is the 1st set of questions =========================
  const questions = async () => {
    const userResult = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Please write Employee's first name: "
        },
        {
          type: "list",
          choices: ["Intern","Engineer", "Manager"],
          name: "title",
          message: "Please select a position title: "
        },
        {
          type: "input",
          name: "id",
          message: "Please include Employee ID: "
        },
        {
          type: "input",
          name: "email",
          message: "Please include Employee Email: "
        },

    ]);
    const name = userResult.name;
    const title = userResult.title;
    const id = userResult.id;
    const email = userResult.email;
    console.log("userResult: " + userResult);
    console.log("name: " + name);
    console.log("title: " + title);
    console.log("id: " + id);
    console.log("email: " + email);

    // this adds to everything array (to store data)
    everything.push(userResult);
    console.log("everything array: " + everything);

    // this goes to next set of questions
    questionsTwo(title);
  }


  //========================= This is the 2nd set of questions (conditional: based on chosen title from 1st set) =========================
  const questionsTwo = async (title) => {
      if (title === "Intern"){
        const internResult = await inquirer.prompt([
            {
              type: "input",
              name: "school",
              message: "Please list Intern's School: "
            }
          ])
          const school = internResult.school;
          console.log("internResult: " + internResult);
          console.log("school: " + school);

          //this adds to everything array (to store data)
          everything.push(internResult);
          console.log("everything array: " + everything);
      }
      else if (title === "Engineer"){
        const engineerResult = await inquirer.prompt([
            {
              type: "input",
              name: "github",
              message: "Please provide Engineer's GitHub username: "
            }
          ])
          const github = engineerResult.github;
          console.log("engineerResult: " + engineerResult);
          console.log("github: " + github);

          //this adds to everything array (to store data)
          everything.push(engineerResult);
          console.log("everything array: " + everything);
      }
      else {
        const managerResult = await inquirer.prompt([
            {
              type: "input",
              name: "officeNumber",
              message: "Please provide Office Number: "
            }
          ])
          const officeNumber = managerResult.officeNumber;
          console.log("managerResult: " + managerResult);
          console.log("officeNumber: " + officeNumber);

          // this adds to everything array (to store data)
          everything.push(managerResult);
          console.log("everything array: " + everything);
      }

      // call function (to ask for additional team members)
      queryToAddMoreTeam();
  };


  const queryToAddMoreTeam = async (title) =>{
    const queryChoice = await inquirer.prompt([
        {
          type: "list",
          choices: ["Yes", "No"],
          name: "choice",
          message: "Would you like to add an additional Team member?"
        }
      ])
      const choice = queryChoice.choice;
      console.log("queryChoice: " + queryChoice);
      console.log("choice: " + choice);

      
      conditional();


      function conditional(){
        if (choice === "Yes"){
          addMember();
        }
        else {
          quit();
        };
      };


      function quit(){
        console.log("\nGoodbye!");
        process.exit(0);
      }
    };





    const writeFileAsync = util.promisify(fs.writeFile);

  //generate the HTML after the first question (team name)
  //then insert each employee card with every prompt (using js)...look at group project 1 for how to do this (search list)
  function generateHTML(answers) {
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Template Engine - Employee Summary</title>
      
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      
          <style>
      
              body {
                  margin: 0;
                  padding: 0;
              }
      
              .heading {
                  background-color: #c53737;
                  color: white;
                  width: 100%;
                  padding-top: 12px;
                  padding-bottom: 6px;
      
                  font-weight: bold;
                  font-size: 20px;
                  text-align: center;
              }
      
              .employee-card {
                  width: 225px;
                  height: 250px;
                  background-color: #e5e5e5;
      
                  margin: 25px;
      
                  border: 0.4px solid #246fc4;
                  border-radius: 3px;
                  box-shadow: 7px 7px 10px #999999;
              }
      
      
                      .mini-header {
                          background-color: #246fc4;
                          color: white;
      
                          border-top-left-radius: 3px;
                          border-top-right-radius: 3px;
      
                          margin-bottom: 20px;
                          padding-top: 5px;
                          padding-bottom: 10px;
                      }
      
                          .name {
                              padding: 0;
                              margin: 0;
                              margin-left: 20px;
                              font-size: 36px;
                          }
                          .title {
                              padding: 0;
                              margin: 0;
                              margin-left: 42px;
                              font-size: 25px;
                          }
      
                      .dem-stats {
                          margin-top: 20px;
                          margin-bottom: 20px;
                          margin-left: 20px;
                          margin-right: 20px;
                      }
      
                          .thingy {
                              background-color: white;
                              color: black;
                              font-size: 20px;
      
                              margin: 0;
                              padding: 10px;
                              border-radius: 3px;
                              border: 0.5px solid gray;
                          }
          </style>
      
      </head>
      <body>
      
          <div class="heading">
              <h1>My Team: ${answers.team}</h1>
          </div>
          <div class="col">
                  <div class="employee-card">
                      <div class="mini-header">
                          <p class="name">name</p>
                          <p class="title">title</p>
                      </div>
                      <div class="dem-stats">
                          <p class="thingy" id="id">ID</p>
                          <p class="thingy" id="email">Email</p>
                          <!-- this changes with each class -->
                          <p class="thingy" id="third-thing">Other</p>
                      </div>
                  </div>
          </div>
      
      </body>
      </html>`;
  }

teamName()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("./output/output.html", html);
  })
  .catch(function(err) {
    console.log(err);
  });










  // Explort the everything array (this contains all information)
  // Self Note: every two array of objects is for one employee
  // example: the first two array of objects:
  //    [object object], [object object] will refer to the first team made created
  module.exports = everything;

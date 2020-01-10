const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
// const Employee = require("./lib/Employee");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
// const Manager = require("./lib/Manager");


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

  questions();
}

teamName();


  //this function is triggered after the last prompt, asking user if they would like to add an additional team member.
  function addMember() {
    questions();
  }


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


        //possibly place this here?
        questionsTwo()

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

    //as opposed to here
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


    //generate the HTML after the first question (team name)
    //then insert each employee card with every prompt (using js)...look at group project 1 for how to do this (search list)
    function generateHTML(answers) {
      return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
    </body>
    </html>`;
    }












  // Explort the everything array (this contains all information)
  // Self Note: every two array of objects is for one employee
  // example: the first two array of objects:
  //    [object object], [object object] will refer to the first team made created
  module.exports = everything;

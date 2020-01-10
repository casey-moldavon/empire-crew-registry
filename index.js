const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Inter");
const Manager = require("./lib/Manager");


// class Team {

//   constructor(answer) {
//     this.answer = answer;
//   }

  function addMember() {
    this.questions();
  }

  function questions() {
    inquirer
      .prompt([
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
  }

    function conditional(title){
      if (title === "Intern"){
        inquirer
          .prompt([
            {
              type: "input",
              name: "school",
              message: "Please list Intern's School: "
            }
          ])
      }
      else if (title === "Engineer"){
        inquirer
          .prompt([
            {
              type: "input",
              name: "github",
              message: "Please provide Engineer's GitHub username: "
            }
          ])
      }
      else {
        inquirer
          .prompt([
            {
              type: "input",
              name: "office number",
              message: "Please provide Office Number: "
            }
          ])
      }

      // call function (to ask for additional team members)
      askToAddMoreTeam()
    };
    conditional(title);

  function askToAddMoreTeam(){
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "choice",
          message: "Would you like to add more to you Team?"
          // message: "Would you like to add an Employee to the Team?"
        }
      ])

      .then(val => {
        if (val.choice) {
          this.addMember();
        } else {
          this.quit();
        }
      });

    }
      function quit(){
        console.log("\nGoodbye!");
        process.exit(0);
      }
  }

  module.exports = Team;

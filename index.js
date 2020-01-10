const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");



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
    ]);
    const name = userResult.name;
    const title = userResult.title;
    const id = userResult.id;
    const email = userResult.email;
    console.log("userResukt: " + userResult);
    console.log("name: " + name);
    console.log("title: " + title);
    console.log("id: " + id);
    console.log("email: " + email);

    // this adds to everything array (to store data)
    everything.push(userResult);
    console.log("everything array: " + everything);

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

    questions();


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


  // module.exports = Team;

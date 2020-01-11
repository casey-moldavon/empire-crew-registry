const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
// const Employee = require("./lib/Employee");
// const Stormtrooper = require("./lib/Engineer");
// const Pilot = require("./lib/Intern");
// const Captain = require("./lib/Manager");


//========================= This is the 1st question (team name) =========================

const teamName = async () => {
  console.log("Assemble your crew to defend the Empire against the dirty rebels!!")
  const teamResult = await inquirer.prompt([
    {
      type: "input",
      name: "team",
      message: "What would you like the Team name to be?"
    }
  ]);

  const team = teamResult.team;
  console.log("team name: " + team);

  return team;
}
//Self Note: function above is called at the bottom of the page



//asks crew member title
const members = [];

const addMember = async () => {
  const memberResult = await inquirer.prompt([
      {
        type: "list",
        choices: ["Captain", "Stormtrooper", "Pilot"],
        name: "title",
        message: "To add crew, select a position title: "
      }
  ]);
  const title = memberResult.title;
  console.log("memberResult: " + memberResult.title)
  console.log("title: " + title)
  
  if (title === "Captain") {
    const member = await captainQuestions();
    members.push({
      title: title,
      name: member.name,
      id: member.id,
      email: member.email,
      shipNumber: member.shipNumber
    });
  }
  else if (title === "Stormtrooper") {
    const member = await stormtrooperQuestions();
    members.push({
      title: title,
      name: member.name,
      id: member.id,
      email: member.email,
      accuracy: member.accuracy
    });
  }
  else {
    const member = await pilotQuestions();
    members.push({
      title: title,
      name: member.name,
      id: member.id,
      email: member.email,
      school: member.school
    });
  }
  await queryToAddMoreTeam();
}


  //this variable stores an array of objects (from employee prompts)

  // ========================= This is the 1st set of questions =========================
  // ========================= Captain Prompts =========================
  const captainQuestions = async () => {
    const userResult = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Please write Crew Member's first name: "
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
        {
          type: "input",
          name: "shipNumber",
          message: "Please provide Ship Number: "
        }
    ]);

    return userResult
  }

  // ========================= Stormtrooper Prompts =========================
  const stormtrooperQuestions = async () => {
    const userResult = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Please write Crew Member's first name: "
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
        {
          type: "input",
          name: "accuracy",
          message: "Please provide Stormtrooper's accuracy level: "
        }
    ]);

    console.log(JSON.stringify(userResult));
    return userResult
  }

  // ========================= Pilot Prompts =========================
  const pilotQuestions = async () => {
    const userResult = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Please write Crew Member's first name: "
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
        {
          type: "input",
          name: "school",
          message: "Please list Pilot's School: "
        }
    ]);
    console.log(JSON.stringify(userResult));
    return userResult
  }

  // here user is asked to add more team members
  const queryToAddMoreTeam = async (title) =>{
    const queryChoice = await inquirer.prompt([
        {
          type: "list",
          choices: ["Yes", "No"],
          name: "choice",
          message: "Would you like to add an additional crew member?"
        }
      ]);
      const choice = queryChoice.choice;
      console.log("queryChoice: " + queryChoice);
      console.log("choice: " + choice);

      if (choice === "Yes"){
        await addMember();
      }
    };




  //generate the HTML after the first question (team name)
  //then insert each employee card with every prompt (using js)...look at group project 1 for how to do this (search list)
  function generateHTML(teamName, members) {

    let membersHtml = '';

    for (const member of members) {
      if (member.title == 'captain'){
        const captainCard = `
        <div class="employee-card">
          <div class="mini-header">
              <p class="name">Name: ${member.name}</p>
              <p class="title"><i class="fab fa-empire"></i> Title: Captain </p>
          </div>
          <div class="dem-stats">
              <p class="thingy" id="id">ID: ${member.id}</p>
              <p class="thingy" id="email">Email: ${member.Email}</p>
              <!-- this changes with each class -->
              <p class="thingy" id="third-thing">Ship Number: ${member.shipNumber}</p>
          </div>
        </div>`;

        membersHtml += captainCard;
      }
      else if (member.title == 'stormtrooper') {
        const stormtrooperCard = `
        <div class="employee-card">
          <div class="mini-header">
              <p class="name">Name: ${member.name}</p>
              <p class="title"><i class="fab fa-empire"></i> Title: Stormtrooper </p>
          </div>
          <div class="dem-stats">
              <p class="thingy" id="id">ID: ${member.id}</p>
              <p class="thingy" id="email">Email: ${member.Email}</p>
              <!-- this changes with each class -->
              <p class="thingy" id="third-thing">Accuracy: ${member.accuracy}</p>
          </div>
        </div>`;

        membersHtml += stormtrooperCard;
      }
      else {
        const pilotCard = `
        <div class="employee-card">
          <div class="mini-header">
              <p class="name">Name: ${member.name}</p>
              <p class="title"><i class="fab fa-empire"></i> Title: Pilot </p>
          </div>
          <div class="dem-stats">
              <p class="thingy" id="id">ID: ${member.id}</p>
              <p class="thingy" id="email">Email: ${member.Email}</p>
              <!-- this changes with each class -->
              <p class="thingy" id="third-thing">School: ${member.school}</p>
          </div>
        </div>`;

        membersHtml += pilotCard;
      }
    }

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

@font-face {
  font-family: Star Jedi;
  src: url(fonts/Starjedi.ttf);
}


      
body {
    margin: 0;
    padding: 0;
    font-family: 'Blippo', fantasy;
}

  .heading {
    background-image: url(images/star-destroyer-new.jpg);
    background-size: 200px 500px;
    background-color: black;
    background-size: cover;
    color: white;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 42px;
    height: 400px;

    font-weight: bold;
    font-size: 20px;
    text-align: center;
  }
    .h1 {
        margin-right: 40%;
        font-family: Star Jedi;
        font-size: 50px;
        letter-spacing: 4.2px;
        text-shadow: 5px 5px red;
    }

  .employee-card {
    width: 260px;
    height: 260px;
    background-color: #e5e5e5;

    margin-top: 25px;
    margin-left: 25px;

    border: 0.4px solid Black;
    border-radius: 3px;
    box-shadow: 7px 7px 10px #999999;

    float: left;
  }

    .mini-header {
      background-color: Black;
      color: white;

      border-top-left-radius: 3px;
      border-top-right-radius: 3px;

      margin-bottom: 20px;
      padding-top: 5px;
      padding-bottom: 10px;

      font-family: 'Blippo', fantasy;
      letter-spacing: 1px;
    }

      .name {
          padding: 0;
          margin: 0;
          margin-left: 20px;
          font-size: 30px;
      }
      .title {
          padding: 0;
          margin: 0;
          margin-left: 42px;
          font-size: 21px;
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
            <h1 class="h1">Ship Name: ${teamName}</h1>
        </div>
    </div>
        <div class="cards">

        ${membersHtml}

        </div>
    </div>
</body>
</html>`
};




  // const card = `
  // <div class="employee-card">
  //   <div class="mini-header">
  //       <p class="name">Name: ${answers.name}</p>
  //       <p class="title"><i class="fab fa-empire"></i> Title: ${answers.title}</p>
  //   </div>
  //   <div class="dem-stats">
  //       <p class="thingy" id="id">ID: ${answers.id}</p>
  //       <p class="thingy" id="email">Email: ${answers.Email}</p>
  //       <!-- this changes with each class -->
  //       <p class="thingy" id="third-thing">Other</p>
  //   </div>
  // </div>`;


  
const app = async () => {
  const teamNameResult = await teamName();

  await addMember();
  // at this point, `members` is populated
  
  const html = generateHTML(teamNameResult, members);

  await writeFileAsync("output.html", html);

  console.log("\nGoodbye!");
};

const promiseOfApp = app();
promiseOfApp.then(function(){
  console.log('Done');
}).catch(function(err) {
  console.log('err',err)
});
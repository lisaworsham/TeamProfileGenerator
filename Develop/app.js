const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


// Write code to use inquirer to gather information about the development team members,

// and to create objects for each team member (using the correct classes as blueprints!)


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
const teamMembers = [];

function createManager(){
    console.log("Please enter your Manager's info");
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?"
        },{
            type: "input",
            name: "managerId",
            message: "What is your manager's ID number?"
        },{
            type: "input",
            name: "managerEmail",
            message: "What is your manager's Email?"
        },{
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your manager's office number?"
        }
    ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        teamMembers.push(manager);
        createTeam();
    });
}

function createTeam(){
    inquirer.prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members"
          ]
        }
      ]).then(userChoice => {
        switch(userChoice.memberChoice) {
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        default:
          buildTeam();
        }
      });
}

function addEngineer(){
  console.log("Please enter your engineer's info");
  inquirer.prompt([
      {
          type: "input",
          name: "engineerName",
          message: "What is your engineer's name?"
      },{
          type: "input",
          name: "engineerID",
          message: "What is your engineer's ID number?"
      },{
          type: "input",
          name: "engineerEmail",
          message: "What is your engineer's Email?"
      },{
          type: "input",
          name: "engineerGithub",
          message: "What is your engineer's Github account name?"
      }
  ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
      teamMembers.push(engineer);
      createTeam();
  });
}

function addIntern(){
  console.log("Please enter your intern's info");
  inquirer.prompt([
      {
          type: "input",
          name: "internName",
          message: "What is your intern's name?"
      },{
          type: "input",
          name: "internID",
          message: "What is your intern's ID number?"
      },{
          type: "input",
          name: "internEmail",
          message: "What is your intern's Email?"
      },{
          type: "input",
          name: "internSchool",
          message: "What is your intern's school?"
      }
  ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      createTeam();
  });
}

function buildTeam(){
    //this is where you want to use fs.writefile/sync
}

createManager();
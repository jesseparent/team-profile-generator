const fs = require("fs");
const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const generateTemplate = require("./src/generateTemplate");
// const { create } = require("domain");

const employees = [];

// Validate that email is a valid address format
// REGEX provided by https://www.codespot.org/javascript-email-validation/
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

const extraQuestion = (employeeType) =>{
  switch (employeeType) {
    case "manager":
      return "\tWhat is the manager's office number?";
    case "engineer":
      return "\tWhat is the engineer's github name?";
    case "intern":
      return "\tWhat is the intern's school?";
    default:
      return "";
  }
};

const extraValidation = (employeeType) =>{
  switch (employeeType) {
    case "manager":
      return "Please enter the manager's office number!";
    case "engineer":
      return "Please enter the engineer's github name!";
    case "intern":
      return "Please enter the intern's school!";
    default:
      return "";
  }
};

const createEmployee = (employeeType) => {
  console.log("Enter the following information for the " + employeeType + ":")
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '\tWhat is the ' + employeeType + '\'s name?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter the ' + employeeType + '\'s name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'id',
      message: '\tWhat is the ' + employeeType + '\'s ID?',
      validate: idInput => {
        if (idInput) {
          return true;
        } else {
          console.log('Please enter the ' + employeeType + '\'s ID!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'email',
      message: '\tWhat is the ' + employeeType + '\'s email address?',
      validate: emailInput => {
        if (emailInput) {
          // validate email entered is in correct format
          if (validateEmail(emailInput)) {
            return true;
          }
          else {
            console.log('\tPlease enter a valid email!');
            return false;
          }
        } else {
          console.log('Please enter the ' + employeeType + '\s email!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'extraInfo',
      message: extraQuestion(employeeType),
      validate: extraInput => {
        if (extraInput) {
          return true;
        } else {
          console.log(extraValidation(employeeType));
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'nextAction',
      message: 'What employee type would you like to add next?',
      choices: ["None", "Engineer", "Intern"]
    },
  ])
    .then(data => {
      const { name, id, email, extraInfo, nextAction } = data;

      switch (employeeType) {
        case "manager":
          employees.push(new Manager(name, id, email, extraInfo));
          break;
        case "engineer":
          employees.push(new Engineer(name, id, email, extraInfo));
          break;
        case "intern":
          employees.push(new Intern(name, id, email, extraInfo));
          break;
      }

      if (nextAction === "None") {
        return;
      }
      else {
        return createEmployee(nextAction.toLowerCase());
      }
    });
};

const writeToFile = (fileName, fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, fileContent, err => {
      // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
      if (err) {
        reject(err);
        // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
        return;
      }

      // if everything went well, resolve the Promise and send the successful data to the `.then()` method
      resolve({
        ok: true,
        message: 'HTML File created!'
      });
    });
  });
}

createEmployee("manager")
.then(managerData => {
  // const {name, id, email, officeNumber, nextAction} = managerData;
  // employees.push(new Manager(name, id, email, officeNumber))
  return generateTemplate(employees);
})
.then(htmlData => {
  return writeToFile("./dist/myteam.html", htmlData);
})
.then(result => { // Give feedback to user 
  if (result.ok) {
    console.log(result.message);
  }
});
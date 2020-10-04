const fs = require("fs");
const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const generateTemplate = require("./src/generateTemplate");

// Employees array for all employee objects generated
const employees = [];

// Validate that email is a valid address format
// REGEX provided by https://www.codespot.org/javascript-email-validation/
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

// information for the employee's last question
const extraInformation = (employeeType) =>{
  switch (employeeType) {
    case "manager":
      return "the manager's office number";
    case "engineer":
      return "the engineer's github name";
    case "intern":
      return "the intern's school";
    default:
      return "";
  }
};

// Ask questions to gather information about the current employee
const createEmployee = (employeeType) => {
  console.log("Enter the following information for the " + employeeType + ":")
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '   What is the ' + employeeType + '\'s name?',
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
      message: '   What is the ' + employeeType + '\'s ID?',
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
      message: '   What is the ' + employeeType + '\'s email address?',
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
      message: '   What is ' + extraInformation(employeeType) + '?',
      validate: extraInput => {
        if (extraInput) {
          return true;
        } else {
          console.log("Please enter " + extraInformation(employeeType) + "!");
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

      // Create employee object specific to type being asked about and push it to employees array
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

      // Decide what to do next: exit or ask for a specific employee's information
      if (nextAction === "None") {
        return;
      }
      else {
        return createEmployee(nextAction.toLowerCase());
      }
    });
};

// Function to write HTML file
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

// Create the first employee - The manager
createEmployee("manager")
.then((managerData) => {
  // Generate the HTML needed for the Web page
  return generateTemplate(employees);
})
.then(htmlData => {
  // Write the HTML to a file
  return writeToFile("./dist/myteam.html", htmlData);
})
.then(result => { 
  // Give feedback to user on whether the file was written or not
  if (result.ok) {
    console.log(result.message);
  }
});
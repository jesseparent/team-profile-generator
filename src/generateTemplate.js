const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");

const employeeMarkupItems = {
  "Manager" : {
    "icon" : "<i></i>",
    "extraTitle" : "Office Number"
  },
  "Engineer" : {
    "icon" : "<i></i>",
    "extraTitle" : "GitHub"
  },
  "Intern" : {
    "icon" : "<i></i>",
    "extraTitle" : "School"
  }
};

const displayExtraProperty = (employee) =>{
  switch (employee.getRole()) {
    case "Manager":
      return employee.getSchool();
    case "Engineer":
      return '<a href="https://github.com/' + employee.getGithub() + '/" target="_blank" rel="noreferrer noopener">' + employee.getGithub() + '</a>';
    case "Intern":
      return employee.getSchool();
    default:
      return "";
  }
}

const generateTemplate = (employeeArray) => {
  let html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  
  </head>
  <body>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 jumbotron mb-3">
          <h1 class="text-center">My Team</h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">`;
  for(let i=0; i < employeeArray.length; i++){
    html += `
        <!-- Card Template -->
        <div class="card" style="max-width: 18rem;">
          <div class="card-header text-white bg-primary">
            <h2>${employeeArray[i].getName()}</h2>
            <h3>${employeeMarkupItems[employeeArray[i].getRole()].icon} ${employeeArray[i].getRole()}</h3>
          </div>
          <div class="card-body">
            <ul class="list-group">
              <li class="list-group-item">ID: ${employeeArray[i].getId()}</li>
              <li class="list-group-item">Email: <a href="mailto:${employeeArray[i].getEmail()}">${employeeArray[i].getEmail()}</a></li>
              <li class="list-group-item">${employeeMarkupItems[employeeArray[i].getRole()].extraTitle}: ${displayExtraProperty(employeeArray[i])}</li>
            </ul>
          </div>
        </div>
        <!-- Card Template -->
        `;
  }
  html += `
      </div>
    </div>
  </body>
  </html>  
  `;

  return html;
};

module.exports = generateTemplate;
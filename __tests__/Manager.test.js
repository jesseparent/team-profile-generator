const Manager = require("../lib/Manager");

test("Retrieves manager name", () => {
  const testPerson = new Manager("tester", 1234, "e@mail.com", 5678);

  expect(testPerson.getName()).toEqual(expect.any(String));
  expect(testPerson.getName()).toEqual(testPerson.name);
  expect(testPerson.getName()).toEqual("tester");
});

test("Retrieves manager id", () => {
  const testPerson = new Manager("tester", 1234, "e@mail.com", 5678);

  expect(testPerson.getId()).toEqual(expect.any(Number));
  expect(testPerson.getId()).toEqual(testPerson.id);
  expect(testPerson.getId()).toEqual(1234);
});

test("Retrieves manager email", () => {
  const testPerson = new Manager("tester", 1234, "e@mail.com", 5678);

  expect(testPerson.getEmail()).toEqual(expect.any(String));
  expect(testPerson.getEmail()).toEqual(testPerson.email);
  expect(testPerson.getEmail()).toEqual("e@mail.com");
});

test("Retrieves manager office number", () => {
  const testPerson = new Manager("tester", 1234, "e@mail.com", 5678);

  expect(testPerson.getOfficeNumber()).toEqual(expect.any(Number));
  expect(testPerson.getOfficeNumber()).toEqual(testPerson.officeNumber);
  expect(testPerson.getOfficeNumber()).toEqual(5678);
});

test("Retrieves manager role", () => {
  const testPerson = new Manager("tester", 1234, "e@mail.com", 5678);

  expect(testPerson.getRole()).toEqual(expect.any(String));
  expect(testPerson.getRole()).toEqual(testPerson.role);
  expect(testPerson.getRole()).toEqual("Manager");
});
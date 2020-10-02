const Employee = require("../lib/Employee");

test("Retrieves employee name", () => {
  const testPerson = new Employee("tester", 1234, "e@mail.com");

  expect(testPerson.getName()).toEqual(expect.any(String));
  expect(testPerson.getName()).toEqual(testPerson.name);
  expect(testPerson.getName()).toEqual("tester");
});

test("Retrieves employee id", () => {
  const testPerson = new Employee("tester", 1234, "e@mail.com");

  expect(testPerson.getId()).toEqual(expect.any(Number));
  expect(testPerson.getId()).toEqual(testPerson.id);
  expect(testPerson.getId()).toEqual(1234);
});

test("Retrieves employee email", () => {
  const testPerson = new Employee("tester", 1234, "e@mail.com");

  expect(testPerson.getEmail()).toEqual(expect.any(String));
  expect(testPerson.getEmail()).toEqual(testPerson.email);
  expect(testPerson.getEmail()).toEqual("e@mail.com");
});

test("Retrieves employee role", () => {
  const testPerson = new Employee("tester", 1234, "e@mail.com");

  expect(testPerson.getRole()).toEqual(expect.any(String));
  expect(testPerson.getRole()).toEqual(testPerson.role);
  expect(testPerson.getRole()).toEqual("Employee");
});

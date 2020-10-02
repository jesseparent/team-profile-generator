const Intern = require("../lib/Intern");

test("Retrieves intern name", () => {
  const testPerson = new Intern("tester", 1234, "e@mail.com", "University of Utah");

  expect(testPerson.getName()).toEqual(expect.any(String));
  expect(testPerson.getName()).toEqual(testPerson.name);
  expect(testPerson.getName()).toEqual("tester");
});

test("Retrieves intern id", () => {
  const testPerson = new Intern("tester", 1234, "e@mail.com", "University of Utah");

  expect(testPerson.getId()).toEqual(expect.any(Number));
  expect(testPerson.getId()).toEqual(testPerson.id);
  expect(testPerson.getId()).toEqual(1234);
});

test("Retrieves intern email", () => {
  const testPerson = new Intern("tester", 1234, "e@mail.com", "University of Utah");

  expect(testPerson.getEmail()).toEqual(expect.any(String));
  expect(testPerson.getEmail()).toEqual(testPerson.email);
  expect(testPerson.getEmail()).toEqual("e@mail.com");
});

test("Retrieves intern school", () => {
  const testPerson = new Intern("tester", 1234, "e@mail.com", "University of Utah");

  expect(testPerson.getSchool()).toEqual(expect.any(String));
  expect(testPerson.getSchool()).toEqual(testPerson.school);
  expect(testPerson.getSchool()).toEqual("University of Utah");
});

test("Retrieves intern role", () => {
  const testPerson = new Intern("tester", 1234, "e@mail.com", "University of Utah");

  expect(testPerson.getRole()).toEqual(expect.any(String));
  expect(testPerson.getRole()).toEqual(testPerson.role);
  expect(testPerson.getRole()).toEqual("Intern");
});
const Engineer = require("../lib/Engineer");

test("Retrieves engineer name", () => {
  const testPerson = new Engineer("tester", 1234, "e@mail.com", 5678);

  expect(testPerson.getName()).toEqual(expect.any(String));
  expect(testPerson.getName()).toEqual(testPerson.name);
  expect(testPerson.getName()).toEqual("tester");
});

test("Retrieves engineer id", () => {
  const testPerson = new Engineer("tester", 1234, "e@mail.com", "githubName");

  expect(testPerson.getId()).toEqual(expect.any(Number));
  expect(testPerson.getId()).toEqual(testPerson.id);
  expect(testPerson.getId()).toEqual(1234);
});

test("Retrieves engineer email", () => {
  const testPerson = new Engineer("tester", 1234, "e@mail.com", "githubName");

  expect(testPerson.getEmail()).toEqual(expect.any(String));
  expect(testPerson.getEmail()).toEqual(testPerson.email);
  expect(testPerson.getEmail()).toEqual("e@mail.com");
});

test("Retrieves engineer github name", () => {
  const testPerson = new Engineer("tester", 1234, "e@mail.com", "githubName");

  expect(testPerson.getGithub()).toEqual(expect.any(String));
  expect(testPerson.getGithub()).toEqual(testPerson.github);
  expect(testPerson.getGithub()).toEqual("githubName");
});

test("Retrieves engineer role", () => {
  const testPerson = new Engineer("tester", 1234, "e@mail.com", "githubName");

  expect(testPerson.getRole()).toEqual(expect.any(String));
  expect(testPerson.getRole()).toEqual(testPerson.role);
  expect(testPerson.getRole()).toEqual("Engineer");
});
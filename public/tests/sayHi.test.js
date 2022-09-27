// Run the test
test('Returns a greeting as a string', function() {
  // should return a string
  expect(typeof sayHi()).toBe('string')

  // should include the provided name
  expect(sayHi('Merlin').includes('Merlin')).toBe(true)
  // expect(sayHi('Merlin')).toContain('Merlin');
  // expect(sayHi()).not.toHaveLength(0);
  // expect(sayHi()).toBeTruthy();
})


describe('The sayHi() method', function() {
  test('it returns a string', function() {
    expect(typeof sayHi()).toBe('string')
  })

  test('it includes the provided name', function() {
    expect(sayHi('Merlin')).toContain('Merlin')
  })

  test('it has a value when no name is included', function() {
    expect(sayHi()).not.toHaveLength(0)
  })
})

# README #

## Todo ##
- Todo is an IFFE to allow for input validation as well as creating a private closure to store unique `ids` from each `todo` instance.
- Input validation is performed on the length of title and description, and on the month and year of data. Title length less than 3 charaters, description length less than 5 characters, and month/year combination that is prior to current date are considered invalid. Missing one of the input properties would also render an input data object invalid.

## Todo List ##
- TodoList is a factory function, and initialized with an array of todo objects.
- I chose to use the factory function pattern, since using an IIFE would result in separate todoList instances mingling with each other, and using a constructor function approach has little benefit since shielding off private data and returning the public methods as an API to the users would result in factory objects created, even when `new` keyword is called. In the case that there is only one instance of the todoList, then it's possible to set up the function as an IIFE.
- The interface allows adding and deletion of objects from the list, and returns a copy of the objects when called, but the objects themselves are never changed through the TodoList interface except through the `edit()` functionality
- Users also can not use `all()` to access and change `todo` object instances or mutate the `todoList` object.

## Todo Manager ###
- Returns list of todo objects based on specification
- A todoManager object is created from OLOO
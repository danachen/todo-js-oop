var $ol = document.querySelector("ol");

function outputResult(message) {
  var $li = document.createElement("li");
  $li.innerText = message;
  $ol.appendChild($li);
  return $li;
};

function test(message, assertion) {
  const $msg = outputResult(message);
      passed = false;

  try {
    passed = assertion();
  }
  catch (e) {
    passed = false;
  }
  $msg.setAttribute("class", passed ? "pass" : "fail");
};

// ---------------------------------------- Todo object tests (19) ------------------------------------- //
test("Todo function is defined", function() {
  return typeof Todo !== "undefined";
});

(function() {
  const data1 = {
    title: 'get fish',
    month: '7',
    year: '2021',
    description: 'get fish for dinner',
  };

  const invalidData1 = {
    title: 'abc',
    month: '7',
    year: '2021',
    description: 'this data set is invalid because of length of title',
  };

  const invalidData2 = {
    title: 'get some candy',
    month: '13',
    year: '2021',
    description: 'this data set is invalid because due month is before current date',
  };

  const invalidData3 = {
    title: 'get some veggies',
    month: '8',
    year: '2020',
    description: 'this data set is invalid because due year is before current year',
  };

  const invalidData4 = {
    title: 'get some ice cream',
    month: '7',
    year: '2021',
    description: 'abc',
  };

  const incompleteData = {
    title: '',
    month: '7',
    year: '2021',
    description: 'this data set is invalid, has no title',
  };

  const incompleteData2 = {
    title: 'get some popcorn',
    month: '',
    year: '2021',
    description: 'this data set is invalid, has no month',
  };

  const incompleteData3 = {
    title: 'get some pop',
    month: '7',
    description: 'this data set is invalid, has no year',
  };

  const incompleteData4 = {
    title: 'get some cotton candy',
    month: '7',
    year: '2021',
  };

  const todo = Object.create(Todo).init(data1)
  const invalidTodo = Object.create(Todo).init(invalidData1);
  const invalidTodo2 = Object.create(Todo).init(invalidData2);
  const invalidTodo3 = Object.create(Todo).init(invalidData3);
  const invalidTodo4 = Object.create(Todo).init(invalidData4);

  const incompleteTodo = Object.create(Todo).init(incompleteData);
  const incompleteTodo2 = Object.create(Todo).init(incompleteData2);
  const incompleteTodo3 = Object.create(Todo).init(incompleteData3);
  const incompleteTodo4 = Object.create(Todo).init(incompleteData4);

  // Test objects from Todo function has the correct properties
  test("The prototype of an object created from the IIFE Todo is Todo", function() {
    return Object.getPrototypeOf(todo) === Todo;
  }); 

  test("Todo object instance is constructed", function() {
    return typeof todo === "object";
  });  

  test("Todo object instance title is correct", function() {
    return todo.title === 'get fish';
  });

  test("Todo object instance month is correct", function() {
    return todo.month === '7';
  });

  test("Todo object instance year is correct", function() {
    return todo.year === '2021';
  });

  test("Todo object instance description is correct", function() {
    return todo.description === 'get fish for dinner';
  });

  test("Todo object instance property title is correct", function() {
    return todo.title === 'get fish';
  });

  test("Todo object instance property completed is set to false by default", function() {
    return todo.completed === false;
  });

  // Test Todo object creation validation, check mistakes on title, month, year, description
  test("Todo object creation fails because of title length", function() {
    return invalidTodo.notValid;
  });

  test("Todo object creation fails because due month is before current month", function() {
    return invalidTodo2.notValid;
  });

  test("Todo object creation fails because due year is before current year", function() {
    return invalidTodo3.notValid;
  });

  test("Todo object creation fails because of description length", function() {
    return invalidTodo4.notValid;
  });

  // Test Todo object creation validation, check incomplete data properties
  test("Todo object creation fails initialization, has no todo title", function() {
    return incompleteTodo.notValid;
  });

  test("Todo object creation fails initialization, has no due month", function() {
    return incompleteTodo2.notValid;
  });

  test("Todo object creation fails initialization, has no due year", function() {
    return incompleteTodo3.notValid;
  });

  test("Todo object creation fails initialization, has no description", function() {
    return incompleteTodo4.notValid;
  });

  // Test Todo object has method `isWithinMonthYear()`
  test("Todo.prototype.isWithinMonthYear() returns true if parameters match data month/year", function() {
    return todo.isWithinMonthYear('7', '2021');
  });
  
  test("Todo.prototype.isWithinMonthYear() returns false if parameters do not match data month/year", function() {
    return !todo.isWithinMonthYear('8', '2021');
  });
})();

// ---------------------------------------- TodoList methods tests (24) ------------------------------------- //

test("todoList function is defined", function() {
  return typeof TodoList !== "undefined";
});

(function() {
  const data1 = {
    title: 'get fish',
    month: '7',
    year: '2021',
    description: 'get fish for dinner',
  };
  
  const data2 = {
    title: 'drop off package at post office',
    month: '7',
    year: '2021',
    description: 'return package to sender',
  };
  
  const data3 = {
    title: 'have lunch',
    month: '8',
    year: '2021',
    description: 'grab some healthy lunch',
  };
  
  const data4 = {
    title: 'go to yoga',
    month: '7',
    year: '2021',
    description: 'time for some stretching',
  };

  const invalidData1 = {
    title: 'ab',
    month: '7',
    year: '2021',
    description: 'this data set is invalid because of length of title',
  };

  const todo1 = Object.create(Todo).init(data1);
  const todo2 = Object.create(Todo).init(data2);
  const todo3 = Object.create(Todo).init(data3);
  const todo4 = Object.create(Todo).init(data4);
  
  let todoList = TodoList();
  todoList.init([todo1, todo2]);

  let todoList3 = TodoList();
  todoList3.init([todo3, todo4]);

  // Test TodoList object creation
  test("TodoList object exists", function() {
    return typeof todoList  === 'object';
  });

  // Test TodoList object instance will not allow direct access to the `list` property
  test("Cannot alter properties of todo property through todoList.all()", function() {
    return todoList.all()[0].completed !== true && todoList.all()[0].title !== 'get meat';
  });

  test("Cannot mutate todoList through todoList.all()", function() {
    todoList.all().pop();
    todoList.all().shift();
    return todoList.all().length === 2;
  });

  // Test TodoList.prototype.add() function
  test("Correct number of todos inserted into list", function() {
    return todoList.all().length === 2;
  });

  todoList3.add(todo1, todo2);

  test("Multiple todos inserted into a list at once", function() {
    return todoList3.all().length === 4;
  });

  const listHasIds = function (list, idArr) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id !== idArr[i]) return false;
    }
    return true;
  }
  
  test("Todos object instances have correct id numbers", function() {
    const ids = [2, 3];
    return listHasIds(todoList.all(), ids);
  });

  test("Todo object instances have correct id numbers, another test", function() {
    const ids = [4, 5, 2, 3];
    return listHasIds(todoList3.all(), ids);
  });

  todoList.add(todo3, todo4);
  const ids = [2, 3, 4, 5];
  test("TodoList object instances have intended id numbers after multiple insertions", function() {
    return listHasIds(todoList.all(), ids);
  });

  test("TodoList object instances have correct length after multiple insertions", function() {
    return ids.length === todoList.all().length;
  });

  // TodoList can't add a invalid todo instance
  const todo5 = Object.create(Todo).init([invalidData1]);

  test("TodoList does not add an invalid todo instance", function() {
    todoList.add(todo5);
    return todoList.all().length === 4;
  });

  // TodoList can't add an existing todo again
  test("TodoList does not add an existing todo again", function() {
    todoList.add(todo1);
    return todoList.all().length === 4;
  });

  // Test TodoList.prototype.delete() function
  todoList3.delete(4);

  test("Correct remaining todo item after deletion", function() {
    const ids = [5, 2, 3];
    return listHasIds(todoList3.all(), ids);
  });

  todoList.delete(5);

  test("Correct number of todos item after deletion", function() {
    const ids = [2, 3, 4];
    return listHasIds(todoList.all(), ids);
  });

  // Test TodoList.prototype.get() function
  test("Correct todo item is picked based on id input", function() {
    return todoList.get(2).id === 2;
  });

  test("Changes on a variable saved to the result of the get() function does not change the original todo objects", function() {
    let todo = todoList.get(2);
    todo.title = "mutate";
    todoList.all()[0];
    return todoList.get(2).title !== 'mutate';
  });

  // Test TodoList.prototype.edit() function
  const data1Edit = {
    title: 'get tofu',
    month: '8',
    year: '2021',
    description: 'get tofu for dinner',
  };

  todoList.edit(2, data1Edit);

  const checkData = function(editedData, newData) {
    return (editedData.title === newData.title && editedData.month === newData.month && editedData.description === newData.description);
  };

  test("List item property replaced by new data", function() {
    let item = todoList.all()[0];
    return checkData(item, data1Edit);
  });

  todoList.edit(2, {month: '9'});

  test("List item property replaced by new data property", function() {
    const item = todoList.all()[0];
    return item.month === '9';
  });

  test("Same todo object instance is not affected by the edit() change in current list", function() {
    const todoInAnotherList = todoList3.all()[2];
    return todoInAnotherList.month === '7';
  });

  test("The original data object that constructed the todo is not changed", function() {
    return data1.title === 'get fish' && data1.month === '7' && data1.year === '2021' && data1.description === 'get fish for dinner';
  });

  // Test `all()` method in TodoList
  test("Test all() returns all objects in the list", function() {
    let todoListAll = todoList.all();
    let newList = [todo1, todo2, todo3];

    for (let i = 0; i < todoListAll.length; i++) {
      if (todoListAll[i].title !== newList[i].title || todoListAll[i].completed !== newList[i].completed || todoListAll[i].id !== newList[i].id || todoListAll[i].month !== newList[i].month || todoListAll[i].year !== newList[i].year) {
        return false;
      }
    }
    return true;
  });

  const todoList4 = new TodoList();
  todoList4.init([todo1, todo2]);

  test("Test all() returns a collection that is a copy of the original list of todos", function() {
    let originalList = [todo1, todo2];
    let returnedCollection = todoList4.all();

    for (let i = 0; i < originalList.length; i++) {
      if (originalList[i] === returnedCollection[i]) {
        return false;
      }
    }
    return true;
  });

  // Test Todo object ids are immutable
  test("Todo object ids are immutable", function() {
    try {
      todoList.edit(2, {id: 200});
    } catch {
      console.log('todo id cannot be changed');
    }
    return todoList.get(2).id === 2;
  });

  // Test user cannot add additional properties to the Todo object other than what is defined
  test("Todo object does not allow additional properties", function() {
    try {
      todoList.edit(2, {moreProp: 'another property'});
    } catch {
      console.log('no additional properties can be added');
    }
    return todoList.get(2).moreProp === undefined;
  });

})();

// ---------------------------------------- TodoManager methods tests (14) ------------------------------------- //

test("TodoManager function is defined", function() {
  return typeof TodoManager !== "undefined";
});

(function() {
  const data1 = {
    title: 'get fish',
    month: '7',
    year: '2021',
    description: 'get fish for dinner',
  };
  
  const data2 = {
    title: 'drop off package at post office',
    month: '7',
    year: '2021',
    description: 'return package to sender',
  };
  
  const data3 = {
    title: 'have lunch',
    month: '8',
    year: '2021',
    description: 'grab some healthy lunch',
  };
  
  const data4 = {
    title: 'go to yoga',
    month: '7',
    year: '2021',
    description: 'time for some stretching',
  };

  const todo1 = Object.create(Todo).init(data1);
  const todo2 = Object.create(Todo).init(data2);
  const todo3 = Object.create(Todo).init(data3);
  const todo4 = Object.create(Todo).init(data4);

  let todoList = TodoList();
  todoList.init([todo1, todo2]);

  let todoList3 = TodoList();
  todoList3.init([todo3, todo4]);
  
  const todoManager = Object.create(TodoManager);

  // Test TodoList object creation
  test("TodoManager object exists", function() {
    return typeof todoManager  === 'object';
  });

  test("TodoManager object instance is a constructed object from object TodoManager", function() {
    return Object.getPrototypeOf(todoManager)  === TodoManager;
  });

  // Test TodoManager.prototype.all() method
  const propertiesCheck = function(listA, listB) {
    for (let i = 0; i < listA.length; i++) {
      const curr = listA[i];
      const expectedCurr = listB[i];

      if (curr.id !== expectedCurr.id || curr.title !== expectedCurr.title || curr.month !== expectedCurr.month || curr.year !== expectedCurr.year || curr.description !== expectedCurr.description) {
        return false;
      }
    }
    return true;
  }

  const allItems = todoManager.all(todoList);

  test("Method `all()` returns expected length of collection", function() {
    return allItems.length === todoList.all().length;
  });

  test("Method `all()` returns the expected collection for todoList", function() {
    return propertiesCheck(allItems, todoList.all());
  });

  const allItems2 = todoManager.all(todoList3);

  test("Method `all()` returns expected length of collection again", function() {
    return allItems2.length === todoList3.all().length;
  });

  test("Method `all()` returns the expected collection for todoList3", function() {
    return propertiesCheck(allItems2, todoList3.all());
  });

  // Test TodoManager.prototype.completed() method
  const completedCheck = function(completed) {
    for (let i = 0; i < completed.length; i++) {
      const curr = completed[i];

      if (curr.completed !== true) {
        return false;
      }
    }
    return true;
  }

  todoList.edit(6, {completed: true});
  test("Method `completed()` returns completed item from list", function() {
    const completedItems = todoManager.completed(todoList);
    const expectCompleted = [todoList.all()[0]];

    return propertiesCheck(completedItems, expectCompleted) && completedCheck(completedItems);
  });
 
  todoList.edit(7, {completed: true});
  test("Method `completed()` returns multiple completed item from list", function() {
    const completedItems = todoManager.completed(todoList);
    const expectCompleted = [todoList.all()[0], todoList.all()[1]];
    return propertiesCheck(completedItems, expectCompleted) && completedCheck(completedItems);
  });

  // Test TodoManager.prototype.withinYearMonth() method
  const itemsWithinPeriod = todoManager.withinMonthYear(todoList, '7', '2021');
  const expectedItems = [todoList.all()[0], todoList.all()[1]];
  test("Method `withinYearMonth()` returns correct number of items completed in specified year and month", function() {
    return itemsWithinPeriod.length === expectedItems.length;
  });

  test("Method `withinYearMonth()` returns correct item in specified year and month", function() {
    return propertiesCheck(itemsWithinPeriod, expectedItems);
  });

  test("Method `withinYearMonth()` returns correct item in specified year and month for another list", function() {
    const itemsWithinPeriod = todoManager.withinMonthYear(todoList3, '8', '2021');
    const expectedItems = [todoList3.all()[1]];
    return propertiesCheck(itemsWithinPeriod, expectedItems);
  });

  // Test TodoManager.prototype.completedWithinYearMonth() method
  todoList.add(todo3, todo4);

  test("Method `completedWithinYearMonth()` returns multiple items completed given year and month", function() {
    const itemsCompletedWithinPeriod = todoManager.completedWithinMonthYear(todoList, '7', '2021');
    const expectedItemsCompletedWithinPeriod = [todoList.all()[0], todoList.all()[1]];

    return propertiesCheck(itemsCompletedWithinPeriod, expectedItemsCompletedWithinPeriod) && completedCheck(itemsCompletedWithinPeriod);
  });

  todoList3.edit(8, {completed: true});

  test("Method `completedWithinYearMonth()` returns single item completed given year and month", function() {
    const itemsCompletedWithinPeriod = todoManager.completedWithinMonthYear(todoList3, '8', '2021');
    const expectedItemsCompletedWithinPeriod = [todoList3.all()[0]];
    
    return propertiesCheck(itemsCompletedWithinPeriod, expectedItemsCompletedWithinPeriod) && completedCheck(itemsCompletedWithinPeriod);
  });
})();
'use strict'

let Todo = (function() {
  let id = 0;
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
  const validateTitle = function(title) {
      return title && title.length > 3;
  };

  const validateMonth = function (monthStr, yearStr) {
    let month = Number(monthStr);
    let year = Number(yearStr);

    return month && (month > 1 && month < 13) && (year > currentYear || year === currentYear && month >= currentMonth);
  };

  const validateYear = function (yearStr) {
    let year = Number(yearStr);
    return year && year >= currentYear;
  };

  const validateDescription = function (description) {
    return description && description.length > 5 && description.length < 100;
  };

  return {
    init: function(item) {
      if (!validateTitle(item.title) || !validateMonth(item.month, item.year) || !validateYear(item.year) || !validateDescription(item.description)) {
        return {notValid: true};
      } else {
        this.id = id + 1;
        this.title = item.title;
        this.completed = false;
        this.month = item.month;
        this.year = item.year;
        this.description = item.description;
        id = this.id;

        Object.preventExtensions(this);

        Object.defineProperties(this, {
          id: {
            writable: false,
          },
        });
        return this;
      }
    },

    isWithinMonthYear(monthStr, yearStr) {
      let month = Number(monthStr);
      let year = Number(yearStr);
      return (month === currentMonth && year === currentYear);
    },
  }
})();

let TodoList = function() {
  let list = [];  

  const getIndex = function(id, list) {
    for (let i = 0; i < list.length; i++) {
      if (id === list[i].id) {
        return i;
      }
    }
  };

  const duplicateCheck = function(id, list) {
    for (let item of list) {
      if (item.id === id) {
        return false;
      }
    }
    return true;
  };

  const addSingle = function(todo, list) {
    if (!todo.notValid && duplicateCheck(todo.id, list)) {
      list.push(Object.assign({}, todo));
    }
  };

  return {
    init(arr) {
      for (let item of arr) {
        list.push(item);
      }
    },

    all() {
     return list.map(item => Object.assign({}, item, Todo));
    },

    add(...args) {
      let itemsToAdd = args;
      for (let item of itemsToAdd) {
        addSingle(item, list);
      }
    },

    delete(id) {
      for (let item of list) {
        if (item.id === id) {
          list.splice(getIndex(id, list), 1);
        }
      }
    },

    get(id) {
      for (let item of this.all()) {
        if (item.id === id) {
          return item;
        }
      }
    },

    edit(id, item) {
      let thisIndex = getIndex(id, list);
      let thisItem = list[thisIndex];
      for (let prop of Object.keys(item)) {
        if (Object.getOwnPropertyDescriptor(item, prop).writable) {
          thisItem[prop] = item[prop];
        } else {
          throw console.error('not possible');
        }
        
      }
    },
  }
};

const TodoManager = {
  all(list) {
    return list.all();
  },

  completed(list) {
    return list.all().filter(item => item.completed);
  },

  withinMonthYear(list, month, year) {
    return list.all().filter(item => item.isWithinMonthYear(month, year));
  },

  completedWithinMonthYear(list, month, year) {
    return list.all().filter(item => item.completed && item.isWithinMonthYear(month, year));
  },
}
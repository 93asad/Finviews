(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var employeeService = require('./data.js');

var Header = {
	view: function(ctrl, args) {
		return m('h1.title', args.text);
	}
};

var SearchBar = {
	controller: function(args) {
		var ctrl = this;
		ctrl.searchKey = m.prop('');
		ctrl.searchHandler = function(event) {
			ctrl.searchKey(event.target.value);
			args.searchHandler(event.target.value);
		};
	},
	view: function(ctrl) {
		return m('input[type=search]', {
			value: ctrl.searchKey(),
			oninput: ctrl.searchHandler
		});
	}
};

var EmployeeListItem = {
	view: function(ctrl, args) {
		return m('li', [
			m('a', {
				href: '#employees/' + args.employee.id
			}, [
				m('span', args.employee.firstName),
				m('span', args.employee.lastName)
			])
		])
	}
};

var EmployeeList = {
	view: function(ctrl, args) {
		var items = args.employees.map(function(employee) {
			return m.component(EmployeeListItem, {
				key: employee.id,
				employee: employee
			})
		})
		return m('ul', items);
	}
}

var HomePage = {
	controller: function (args) {
		var ctrl = this;
		ctrl.employees = m.prop([]);
		ctrl.searchHandler = function (key) {
			args.service.findByName(key).then(function (result) {
				// ctrl.searchKey(key); <--- see line 58 of https://github.com/ccoenraets/react-employee-directory/blob/master/iteration4/js/app.js
				ctrl.employees(result);
			})
		}

	},
	view: function(ctrl, args) {
		return m('div', [
			m.component(Header, {
				text: 'Employee Directory'
			}),
			m.component(SearchBar, {searchHandler: ctrl.searchHandler}),
			m.component(EmployeeList, {
				employees: ctrl.employees()
			})
		])
	}
}

m.mount(document.body, m.component(HomePage, {service: employeeService}));
},{"./data.js":2}],2:[function(require,module,exports){
employeeService = (function() {
	var findById = function(id) {
		var deferred = m.deferred();
		var employee = null;
		var l = employees.length;
		for (var i = 0; i < l; i++) {
			if (employees[i].id == id) {
				employee = employees[i];
				break;
			}
		}
		deferred.resolve(employee);
		return deferred.promise;
	},
	findByName = function (searchKey) {
		var deferred = m.deferred();
		var results = employees.filter(function (element) {
			var fullName = element.firstName + ' ' + element.lastName;
			return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
		});
		deferred.resolve(results);
		return deferred.promise;
	},
	findByManager = function (managerId) {
		var deferred = m.deferred();
		var results = employees.filter(function (element) {
			return managerId === element.managerId;
		});
		deferred.resolve(results);
		return deferred.promise;
	},
	employees = [
		 {"id": 1, "firstName": "James ", "lastName": "King", "managerId": 0, "managerName": "", "reports": 4, "title": "President and CEO", "department": "Corporate", "mobilePhone": "617-000-0001", "officePhone": "781-000-0001", "email": "jking@fakemail.com", "city": "Boston, MA", "pic": "james_king.jpg", "twitterId": "@fakejking", "blog": "http://lhorie.github.io/mithril-blog/"},
            {"id": 2, "firstName": "Julie ", "lastName": "Taylor", "managerId": 1, "managerName": "James King", "reports": 2, "title": "VP of Marketing", "department": "Marketing", "mobilePhone": "617-000-0002", "officePhone": "781-000-0002", "email": "jtaylor@fakemail.com", "city": "Boston, MA", "pic": "julie_taylor.jpg", "twitterId": "@fakejtaylor", "blog": "http://lhorie.github.io/mithril-blog/"},
            {"id": 3, "firstName": "Eugene ", "lastName": "Lee", "managerId": 1, "managerName": "James King", "reports": 0, "title": "CFO", "department": "Accounting", "mobilePhone": "617-000-0003", "officePhone": "781-000-0003", "email": "elee@fakemail.com", "city": "Boston, MA", "pic": "eugene_lee.jpg", "twitterId": "@fakeelee", "blog": "http://lhorie.github.io/mithril-blog/"},
            {"id": 4, "firstName": "John ", "lastName": "Williams", "managerId": 1, "managerName": "James King", "reports": 3, "title": "VP of Engineering", "department": "Engineering", "mobilePhone": "617-000-0004", "officePhone": "781-000-0004", "email": "jwilliams@fakemail.com", "city": "Boston, MA", "pic": "john_williams.jpg", "twitterId": "@fakejwilliams", "blog": "http://lhorie.github.io/mithril-blog/"},
            {"id": 5, "firstName": "Ray ", "lastName": "Moore", "managerId": 1, "managerName": "James King", "reports": 2, "title": "VP of Sales", "department": "Sales", "mobilePhone": "617-000-0005", "officePhone": "781-000-0005", "email": "rmoore@fakemail.com", "city": "Boston, MA", "pic": "ray_moore.jpg", "twitterId": "@fakermoore", "blog": "http://lhorie.github.io/mithril-blog/"},
            {"id": 6, "firstName": "Paul ", "lastName": "Jones", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "QA Manager", "department": "Engineering", "mobilePhone": "617-000-0006", "officePhone": "781-000-0006", "email": "pjones@fakemail.com", "city": "Boston, MA", "pic": "paul_jones.jpg", "twitterId": "@fakepjones", "blog": "http://lhorie.github.io/mithril-blog/"},
            {"id": 7, "firstName": "Paula ", "lastName": "Gates", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "mobilePhone": "617-000-0007", "officePhone": "781-000-0007", "email": "pgates@fakemail.com", "city": "Boston, MA", "pic": "paula_gates.jpg", "twitterId": "@fakepgates", "blog": "http://lhorie.github.io/mithril-blog/"},
            {"id": 8, "firstName": "Lisa ", "lastName": "Wong", "managerId": 2, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "mobilePhone": "617-000-0008", "officePhone": "781-000-0008", "email": "lwong@fakemail.com", "city": "Boston, MA", "pic": "lisa_wong.jpg", "twitterId": "@fakelwong", "blog": "http://lhorie.github.io/mithril-blog/"},
            {"id": 9, "firstName": "Gary ", "lastName": "Donovan", "managerId": 2, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "mobilePhone": "617-000-0009", "officePhone": "781-000-0009", "email": "gdonovan@fakemail.com", "city": "Boston, MA", "pic": "gary_donovan.jpg", "twitterId": "@fakegdonovan", "blog": "http://lhorie.github.io/mithril-blog/"},
            {"id": 10, "firstName": "Kathleen ", "lastName": "Byrne", "managerId": 5, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "mobilePhone": "617-000-0010", "officePhone": "781-000-0010", "email": "kbyrne@fakemail.com", "city": "Boston, MA", "pic": "kathleen_byrne.jpg", "twitterId": "@fakekbyrne", "blog": "http://lhorie.github.io/mithril-blog/"},
            {"id": 11, "firstName": "Amy ", "lastName": "Jones", "managerId": 5, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "mobilePhone": "617-000-0011", "officePhone": "781-000-0011", "email": "ajones@fakemail.com", "city": "Boston, MA", "pic": "amy_jones.jpg", "twitterId": "@fakeajones", "blog": "http://lhorie.github.io/mithril-blog/"},
            {"id": 12, "firstName": "Steven ", "lastName": "Wells", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "mobilePhone": "617-000-0012", "officePhone": "781-000-0012", "email": "swells@fakemail.com", "city": "Boston, MA", "pic": "steven_wells.jpg", "twitterId": "@fakeswells", "blog": "http://lhorie.github.io/mithril-blog/"}

	];
	return {
		findById: findById,
		findByName: findByName,
		findByManager: findByManager
	}
}());
module.exports.employeeService = employeeService;
},{}]},{},[1]);

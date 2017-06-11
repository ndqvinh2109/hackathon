var app = angular.module("myApp", ['ngRoute']);

app.controller('NotesIndexController', function($scope, noteService) {
    $scope.notes = noteService.getNotes();

    $scope.resetNote = function() {
        $scope.note = {};
    }

    $scope.deleteNote = function(id) {
        noteService.deleteNote(id);
    }
})

app.controller('NotesEditController', function($scope, $routeParams, noteService, $location) {
    $scope.note = noteService.findNoteById($routeParams.id);

    $scope.addNote = function(note) {
        if ($routeParams.id) {
            noteService.editNote(note);
        } else {
            noteService.addNote(note);
        }

        $scope.notes = noteService.getNotes();
        $location.path('/');
    }
})

app.controller('myCtrl', function($scope, noteService) {});

app.config(function($routeProvider) {
    $routeProvider.when("/", {
            templateUrl: "list-notes.html",
            controller: 'NotesIndexController'
        })
        .when("/newNote", {
            templateUrl: "new-note.html",
            controller: 'NotesEditController'
        })
        .when("/notes/:id", {
            templateUrl: "new-note.html",
            controller: 'NotesEditController'
        })

})

app.directive('newNote', function() {
    return {
        templateUrl: "directive/new-note.html",
        scope: true
    }
})

app.directive('listNotes', function() {
    return {
        templateUrl: "directive/list-notes.html",
        scope: true
    }
})

app.directive('noteItem', function() {

    return {
        templateUrl: "directive/note-item.html",
        scope: true
    }
})

app.factory('noteService', function() {
    var data = [{
        id: 1,
        title: 'Prepare for presentation',
        description: '123Prepare for presentation'
    }, {
        id: 2,
        title: 'Prepare for angular js exercise',
        description: '456Prepare for angular js exercise'
    }, {
        id: 3,
        title: 'Rememter to play badminton everyday',
        description: '789Rememter to play badminton everyday'
    }];
    return {

        getNotes: function() {
            return data;
        },
        addNote: function(note) {
            var id = Math.random().toString(36).substr(2, 9);
            note.id = id;
            data.push(note);
        },
        editNote: function(note) {
            var foundNote = this.findNoteById(note.id);
            foundNote = note;
        },
        findNoteById: function(id) {
            var note = data.filter(function(element, index) {
                return element.id == id;
            })
            return note[0];
        },
        deleteNote: function(id) {
            var index = data.indexOf(this.findNoteById(id));
            data.splice(index, 1);
        }

    };
})

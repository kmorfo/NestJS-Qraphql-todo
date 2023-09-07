import { Injectable, NotFoundException } from '@nestjs/common';

import { Todo } from './entity/todo.entity';

import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';


@Injectable()
export class TodoService {

    private todos: Todo[] = [
        { id: 1, description: 'Piedra del alma', done: false },
        { id: 2, description: 'Piedra del espacio', done: false },
        { id: 3, description: 'Piedra del Poder', done: false },
        { id: 4, description: 'Piedra del fuego', done: true }
    ];

    get totalTodos() {
        return this.todos.length;
    }

    get completedTodos() {
        return this.todos.filter(todo => todo.done === true).length;
    }

    get pendingTodos() {
        return this.todos.filter(todo => todo.done === false).length;
    }

    findAll(statusArgs: StatusArgs): Todo[] {
        const { status } = statusArgs;
        if (status == undefined) return this.todos;

        return this.todos.filter(todo => todo.done === status);
    }

    findOne(id: number): Todo {
        const todo = this.todos.find(todo => todo.id === id);

        if (!todo) throw new NotFoundException(`Todo with ${id} not found`)

        return todo;
    }

    create(createTodoInput: CreateTodoInput): Todo {
        const todo = new Todo();
        todo.description = createTodoInput.description;
        todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1;

        this.todos.push(todo);
        return todo;
    }

    update(id: number, updateTodoInput: UpdateTodoInput): Todo {
        const { description, done } = updateTodoInput;
        const todoToUpdate = this.findOne(id);

        if (description) todoToUpdate.description = description;
        if (done != undefined) todoToUpdate.done = done;

        this.todos.map(todo => {
            return (todo.id === id) ? todoToUpdate : todo;
        })

        return todoToUpdate;
    }

    remove(id: number): boolean {
        this.findOne(id);
        this.todos = this.todos.filter(todo => todo.id !== id);

        return true;
    }


}

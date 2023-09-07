import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './types/aggregations.type';


@Resolver()
export class TodoResolver {
    constructor(
        private readonly todoService: TodoService
    ) { }

    @Query(() => [Todo], { name: 'todos' })
    findAll(
        @Args() statusArgs: StatusArgs
    ): Todo[] {
        return this.todoService.findAll(statusArgs);
    }

    @Query(() => Todo, { name: 'todo' })
    findOne(@Args('id', { type: () => Int }) id: number): Todo {
        return this.todoService.findOne(id);
    }

    @Mutation(() => Todo, { name: 'createTodo' })
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ): Todo {
        return this.todoService.create(createTodoInput);
    }

    @Mutation(() => Todo, { name: 'updateTodo' })
    updateTodo(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
    ): Todo {
        return this.todoService.update(updateTodoInput.id, updateTodoInput);
    }

    @Mutation(() => Boolean, { name: 'removeTodo' })
    removeTodo(@Args('id', { type: () => Int }) id: number) {
        return this.todoService.remove(id);
    }


    //Aggregations
    @Query(() => Int)
    totalTodos() {
        return this.todoService.totalTodos;
    }

    @Query(() => Int)
    completedTodos() {
        return this.todoService.completedTodos;
    }

    @Query(() => Int)
    pendingTodos() {
        return this.todoService.pendingTodos;
    }

    //ObjectTypes Aggregatios
    @Query(() => AggregationsType)
    aggregations(): AggregationsType {
        return {
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos
        }
    }

}


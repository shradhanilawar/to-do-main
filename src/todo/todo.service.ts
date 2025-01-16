import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      console.log(createTodoDto);
      const todo = await this.todoRepository.save(createTodoDto);
      console.log(todo);
      return todo;
    } catch (error) {
      console.log(error);
    }
  }

  findAll(page: number, limit: number, status: string, priority: string) {
    try {
      return this.todoRepository.findAndCount({
        where: {
          ...(status && { status }),
          ...(priority && { priority }),
        },
        skip: (page - 1) * limit,
        take: limit,
      });
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    try {
      const todo = this.todoRepository.findOneBy({ id: id });
      return todo;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      const data = await this.todoRepository.update(id, updateTodoDto);
      console.log(data);

      if (data.affected === 0) {
        return 'error:todo id not found';
      }
      const updatedTodo = await this.todoRepository.findOneBy({ id: id });
      return updatedTodo;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const todo = await this.todoRepository.delete({ id: id });
      console.log(todo);

      if (todo.affected === 0) {
        return 'error:todo id not found';
      }
      return todo;
    } catch (error) {
      return error;
    }
  }
}

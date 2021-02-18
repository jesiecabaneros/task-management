import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filterTaskDto } from './dto/task-filter.dto';
import { CreateTaskDto } from './dto/task.dto';
import { TaskStatus } from './task-status.enum.';
import { Task } from './task.entity';
import { TaskRepository } from "./task.repository";

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository) {}

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id)
        if(!found) {
            throw new NotFoundException(`task id "${id}" not found`);
        }
        return found;
    }
    async getTaskList(): Promise<Task[]> {
        const taskList = await this.taskRepository.find()
        if(!taskList) {
            throw new NotFoundException(`tasks is empty`);
        }
        return taskList;
    }
    async getTask(filterDto: filterTaskDto): Promise<Task[]> {
        return this.taskRepository.getTask(filterDto);
    }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();

        task.title =title;
        task.discription = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        
        return task;
    }
    async deleteTaskById(id: number): Promise<void> {
        const dResult = await this.taskRepository.delete(id);
        if (dResult.affected === 0) {
            throw new NotFoundException(`tasks "${id}" not found`);
        }
    }
    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = status;
        task.save();
        return task;
    }


}

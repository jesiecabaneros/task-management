import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { filterTaskDto } from './dto/task-filter.dto';

import { CreateTaskDto } from './dto/task.dto';
import { TaskStatus } from './task-status.enum.';
import { Task } from './task.entity';
import { TaskService } from "./task.service";

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
    constructor(public taskServices: TaskService){}

    @Get('')
    getTaskAll(@Query() filterDto: filterTaskDto): Promise<Task[]>{
        return this.taskServices.getTask(filterDto);
    }

    @Get('/:id')
    getTask(@Param('id', ParseIntPipe) id: number): Promise<Task>{
        return this.taskServices.getTaskById(id);
    }

    @Post()
    // @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return  this.taskServices.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.taskServices.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: number,@Body('status') status: TaskStatus): Promise<Task>
    {
        return this.taskServices.updateTaskStatus(id, status);
    }



}

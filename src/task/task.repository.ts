import { EntityRepository, Repository } from "typeorm";
import { filterTaskDto } from "./dto/task-filter.dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTask(filterDto: filterTaskDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', {status});
        }
        if (search) {
            query.andWhere('(task.title LIKE :search OR task.discription LIKE :search)', {search: `%${search}%`});
        }
        const task = await query.getMany();
        return task;
    }
}
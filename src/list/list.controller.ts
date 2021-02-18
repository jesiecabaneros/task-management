import { Controller, Get, Req, Body } from '@nestjs/common';
import { request, Request } from 'express'
@Controller('list')
export class ListController {
    @Get()
    findAll(@Body() request): string {
        return 'all list>>>>>>>>' + request.id;
    }
}

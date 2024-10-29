/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { Class } from './classes.entity';
import { ClassService } from './classes.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateClassDto } from 'src/dtos/createClass.dto';
import { OmitPasswordInterceptor } from 'src/interceptors/omitPasswordClassData.interceptor';

UseInterceptors(OmitPasswordInterceptor);
@ApiTags('Class')
@Controller('class')
export class ClassesController {
  constructor(private readonly classesService: ClassService) {}

  @Get()
  getClasses() {
    return this.classesService.getClasses();
  }

  @Get(':id')
  getClassById(@Param(ParseUUIDPipe) id: UUID) {
    return this.classesService.getClassById(id);
  }

  @Post()
  createClass(@Body() classData: CreateClassDto) {
    return this.classesService.createClass(classData);
  }

  @Put()
  updateClass(@Param('id', ParseUUIDPipe) id: UUID, @Body() classData: Class) {
    return this.classesService.updateClass(id, classData);
  }

  @Delete()
  deleteClass(@Param(ParseUUIDPipe) id: UUID) {
    return this.classesService.deleteClass(id);
  }
}

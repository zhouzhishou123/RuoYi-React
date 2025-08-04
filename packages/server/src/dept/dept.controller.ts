import { Controller, Get, Param } from '@nestjs/common';
import { DeptService } from './dept.service';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('dept')
@ApiBearerAuth()
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Get('list')
  async getDeptList() {
    return this.deptService.findAllDepts();
  }
  @Get(':id')
  async getDeptById(@Param('id') id: string) {
    return this.deptService.findDeptById(id);
  }
}

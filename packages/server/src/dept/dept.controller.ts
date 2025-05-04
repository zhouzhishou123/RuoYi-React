import { Controller, Get, Param } from '@nestjs/common';
import { DeptService } from './dept.service';

@Controller('dept')
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

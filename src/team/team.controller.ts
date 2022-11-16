import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamService, TeamRo } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';

@ApiTags('球队')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({ summary: '创建球队' })
  @Post()
  async create(@Body() player: CreateTeamDto) {
    return await this.teamService.create(player);
  }

  @ApiOperation({ summary: '获取球队列表' })
  @Get()
  async findAll(@Query() query): Promise<TeamRo> {
    return await this.teamService.findAll(query);
  }

  @ApiOperation({ summary: '获取球队' })
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.teamService.findOne(id);
  }

  @ApiOperation({ summary: '更新球队' })
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.teamService.update(id, post);
  }

  @ApiOperation({ summary: '删除球队' })
  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.teamService.remove(id);
  }
}

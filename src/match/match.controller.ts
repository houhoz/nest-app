import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MatchService, MatchRo } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';

@ApiTags('比赛')
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @ApiOperation({ summary: '创建比赛' })
  @Post()
  async create(@Body() match: CreateMatchDto) {
    return await this.matchService.create(match);
  }

  @ApiOperation({ summary: '获取比赛列表' })
  @Get()
  async findAll(@Query() query): Promise<MatchRo> {
    return await this.matchService.findAll(query);
  }

  @ApiOperation({ summary: '获取比赛' })
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.matchService.findOne(id);
  }

  @ApiOperation({ summary: '更新比赛' })
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.matchService.update(id, post);
  }

  @ApiOperation({ summary: '删除比赛' })
  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.matchService.remove(id);
  }
}

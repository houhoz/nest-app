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
import { PlayerService, PlayerRo } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';

@ApiTags('球员')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @ApiOperation({ summary: '创建球员' })
  @Post()
  async create(@Body() player: CreatePlayerDto) {
    return await this.playerService.create(player);
  }

  @ApiOperation({ summary: '获取球员列表' })
  @Get()
  async findAll(@Query() query): Promise<PlayerRo> {
    return await this.playerService.findAll(query);
  }

  @ApiOperation({ summary: '获取球员' })
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.playerService.findOne(id);
  }

  @ApiOperation({ summary: '更新球员' })
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.playerService.update(id, post);
  }

  @ApiOperation({ summary: '删除球员' })
  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.playerService.remove(id);
  }
}

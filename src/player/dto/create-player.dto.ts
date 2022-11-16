import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({ description: '球员姓名' })
  @IsNotEmpty({ message: '球员姓名必填' })
  readonly name: string;

  @ApiPropertyOptional({ description: '头像', default: '' })
  readonly avatar: string;

  @ApiProperty({ description: '主队' })
  @IsNumber()
  @IsNotEmpty({ message: '球员主队必填' })
  readonly team: number;

  @ApiPropertyOptional({ description: '进球数', default: 0 })
  readonly goal: number;

  @ApiPropertyOptional({ description: '助攻数', default: 0 })
  readonly assist: number;

  @ApiPropertyOptional({ description: '黄牌数', default: 0 })
  readonly yellowCard: number;

  @ApiPropertyOptional({ description: '红牌牌数', default: 0 })
  readonly redCard: number;
}

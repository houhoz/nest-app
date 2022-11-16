import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ description: '球队名称' })
  @IsNotEmpty({ message: '球队名称必填' })
  readonly name: string;

  @ApiPropertyOptional({ description: '球队头像', default: '' })
  readonly avatar: string;

  @ApiPropertyOptional({ description: '积分', default: 0 })
  readonly score: number;

  @ApiPropertyOptional({ description: '进球数', default: 0 })
  readonly goal: number;

  @ApiPropertyOptional({ description: '助攻数', default: 0 })
  readonly assist: number;

  @ApiPropertyOptional({ description: '黄牌数', default: 0 })
  readonly yellowCard: number;

  @ApiPropertyOptional({ description: '红牌牌数', default: 0 })
  readonly redCard: number;
}

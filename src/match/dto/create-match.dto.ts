import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMatchDto {
  @ApiProperty({ description: '比赛轮次' })
  @IsNotEmpty({ message: '比赛轮次必填' })
  @IsNumber()
  readonly round: number;

  @ApiPropertyOptional({ description: '比赛时间' })
  readonly time: Date;

  @ApiProperty({ description: '主队', default: 1 })
  @IsNotEmpty({ message: '球员主队必填' })
  readonly homeTeam: number;

  @ApiProperty({ description: '客队', default: 1 })
  @IsNotEmpty({ message: '客队主队必填' })
  readonly visitingTeam: number;

  @ApiPropertyOptional({ description: '主队得分', default: 0 })
  readonly homeScore: number;

  @ApiPropertyOptional({ description: '客队得分', default: 0 })
  readonly visitingScore: number;

  @ApiPropertyOptional({ description: '关键数据', default: [] })
  readonly keyData: { type: number; id: number }[];
}

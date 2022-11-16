import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { MatchEntity } from './entities/match.entity';
import { PlayerEntity } from './../player/entities/player.entity';
import { TeamEntity } from './../team/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatchEntity, PlayerEntity, TeamEntity])],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}

import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchEntity } from './entities/match.entity';
import { PlayerEntity } from './../player/entities/player.entity';
import { TeamEntity } from './../team/entities/team.entity';

export interface MatchRo {
  list: MatchEntity[];
  count: number;
}

function transformType(type) {
  switch (type) {
    case 1:
      return 'goal';
    case 2:
      return 'assist';
    case 3:
      return 'yellowCard';
    case 3:
      return 'redCard';
    default:
      break;
  }
}

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(MatchEntity)
    private readonly matchRepository: Repository<MatchEntity>,
    @InjectRepository(PlayerEntity)
    private readonly playerRepository: Repository<PlayerEntity>,
    @InjectRepository(TeamEntity)
    private readonly teamEntity: Repository<TeamEntity>,
  ) {}
  async create(match: Partial<MatchEntity>): Promise<MatchEntity> {
    // const { keyData, homeScore, visitingScore, homeTeam, visitingTeam } = match;
    // for (let index = 0; index < keyData.length; index++) {
    //   const { id, type } = keyData[index];
    //   const exist = await this.playerRepository.findOneBy({ id });
    //   if (!exist) {
    //     throw new HttpException(`id为${id}的球员不存在`, 401);
    //   }
    //   const key = transformType(type);
    //   const curNum = exist[key];
    //   exist[key] = curNum + 1;
    //   await this.playerRepository.save(exist);
    // }
    // const existHome = await this.teamEntity.findOneBy({ id: homeTeam });
    // if (!existHome) {
    //   throw new HttpException(`id为${homeTeam}的球队不存在`, 401);
    // }
    // const existVisiting = await this.teamEntity.findOneBy({ id: visitingTeam });
    // if (!existVisiting) {
    //   throw new HttpException(`id为${visitingTeam}的球队不存在`, 401);
    // }
    // if (homeScore > visitingScore) {
    //   existHome.score = existHome.score + 3;
    //   await this.playerRepository.save(existHome);
    // } else if (homeScore === visitingScore) {
    //   existHome.score = existHome.score + 1;
    //   existVisiting.score = existVisiting.score + 1;
    //   await this.playerRepository.save(existHome);
    //   await this.playerRepository.save(existVisiting);
    // } else {
    //   existVisiting.score = existVisiting.score + 3;
    //   await this.playerRepository.save(existVisiting);
    // }
    return await this.matchRepository.save(match);
  }
  async findAll(query): Promise<MatchRo> {
    const qb = await this.matchRepository.createQueryBuilder('match');
    qb.where('1 = 1');
    qb.orderBy('match.create_time', 'DESC');
    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10 } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));
    const matches = await qb.getMany();
    return { list: matches, count: count };
  }

  async findOne(id): Promise<MatchEntity> {
    return await this.matchRepository.findOneBy({ id });
  }

  async update(id, player): Promise<MatchEntity> {
    const exist = await this.matchRepository.findOneBy({ id });
    if (!exist) {
      throw new HttpException(`id为${id}的比赛不存在`, 401);
    }
    const updateMatch = this.matchRepository.merge(exist, player);
    return this.matchRepository.save(updateMatch);
  }

  async remove(id) {
    const exist = await this.matchRepository.findOneBy({ id });
    if (!exist) {
      throw new HttpException(`id为${id}的比赛不存在`, 401);
    }
    return await this.matchRepository.remove(exist);
  }
}

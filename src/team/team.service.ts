import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamEntity } from './entities/team.entity';

export interface TeamRo {
  list: TeamEntity[];
  count: number;
}

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
  ) {}

  async create(player: Partial<TeamEntity>): Promise<TeamEntity> {
    const { name } = player;
    const curPlayer = await this.teamRepository.findOne({ where: { name } });
    if (curPlayer) {
      throw new HttpException('球队已存在', 401);
    }
    return await this.teamRepository.save(player);
  }
  async findAll(query): Promise<TeamRo> {
    const qb = await this.teamRepository.createQueryBuilder('player');
    qb.where('1 = 1');
    qb.orderBy('player.create_time', 'ASC');
    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10 } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));
    const players = await qb.getMany();
    return { list: players, count: count };
  }

  async findOne(id): Promise<TeamEntity> {
    return await this.teamRepository.findOneBy({ id });
  }

  async update(id, player): Promise<TeamEntity> {
    const exist = await this.teamRepository.findOneBy({ id });
    if (!exist) {
      throw new HttpException(`id为${id}的球队不存在`, 401);
    }
    const updatePlayer = this.teamRepository.merge(exist, player);
    return this.teamRepository.save(updatePlayer);
  }

  async remove(id) {
    const exist = await this.teamRepository.findOneBy({ id });
    if (!exist) {
      throw new HttpException(`id为${id}的球队不存在`, 401);
    }
    return await this.teamRepository.remove(exist);
  }
}

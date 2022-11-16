import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerEntity } from './entities/player.entity';

export interface PlayerRo {
  list: PlayerEntity[];
  count: number;
}

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playerRepository: Repository<PlayerEntity>,
  ) {}

  async create(player: Partial<PlayerEntity>): Promise<PlayerEntity> {
    const { name } = player;
    const curPlayer = await this.playerRepository.findOne({ where: { name } });
    if (curPlayer) {
      throw new HttpException('球员已存在', 401);
    }
    return await this.playerRepository.save(player);
  }
  async findAll(query): Promise<PlayerRo> {
    const qb = await this.playerRepository.createQueryBuilder('player');
    qb.where('1 = 1');
    qb.orderBy('player.create_time', 'ASC');
    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10 } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));
    const players = await qb.getMany();
    return { list: players, count: count };
  }

  async findOne(id): Promise<PlayerEntity> {
    return await this.playerRepository.findOneBy({ id });
  }

  async update(id, player): Promise<PlayerEntity> {
    const exist = await this.playerRepository.findOneBy({ id });
    if (!exist) {
      throw new HttpException(`id为${id}的球员不存在`, 401);
    }
    const updatePlayer = this.playerRepository.merge(exist, player);
    return this.playerRepository.save(updatePlayer);
  }

  async remove(id) {
    const exist = await this.playerRepository.findOneBy({ id });
    if (!exist) {
      throw new HttpException(`id为${id}的球员不存在`, 401);
    }
    return await this.playerRepository.remove(exist);
  }
}

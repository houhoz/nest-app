import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createWriteStream } from 'fs';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import * as upyun from 'upyun';
import PrivateFile from './entities/private-file.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PrivateFilesService {
  constructor(
    @InjectRepository(PrivateFile)
    private privateFilesRepository: Repository<PrivateFile>,
    private readonly configService: ConfigService,
  ) {}
  async uploadPrivateFile(
    dataBuffer: Buffer,
    ownerId: number,
    filename: string,
  ) {
    const UPYUN_SERVICE_NAME = this.configService.get('UPYUN_SERVICE_NAME');
    const UPYUN_OPERATOR_NAME = this.configService.get('UPYUN_OPERATOR_NAME');
    const UPYUN_OPERATOR_PASSWORD = this.configService.get(
      'UPYUN_OPERATOR_PASSWORD',
    );
    const service = new upyun.Service(
      UPYUN_SERVICE_NAME,
      UPYUN_OPERATOR_NAME,
      UPYUN_OPERATOR_PASSWORD,
    );
    const client = new upyun.Client(service);
    const uid = uuid();
    const fileKey = `${uid}-${filename}`;
    const remotePath = `img/${uid}-${filename}`;
    await client.putFile(remotePath, dataBuffer);

    const newFile = this.privateFilesRepository.create({
      key: fileKey,
      owner: {
        id: ownerId,
      },
    });
    await this.privateFilesRepository.save(newFile);
    return newFile;
  }

  public async getPrivateFile(fileId: number) {
    const UPYUN_SERVICE_NAME = this.configService.get('UPYUN_SERVICE_NAME');
    const UPYUN_OPERATOR_NAME = this.configService.get('UPYUN_OPERATOR_NAME');
    const UPYUN_OPERATOR_PASSWORD = this.configService.get(
      'UPYUN_OPERATOR_PASSWORD',
    );
    const service = new upyun.Service(
      UPYUN_SERVICE_NAME,
      UPYUN_OPERATOR_NAME,
      UPYUN_OPERATOR_PASSWORD,
    );
    const client = new upyun.Client(service);
    const fileInfo = await this.privateFilesRepository.findOne({
      where: { id: fileId },
      relations: ['owner'],
    });
    if (fileInfo) {
      const saveTo = createWriteStream('./localSample.txt');
      const stream = await client.getFile(`img/${fileInfo.key}`, saveTo);
      return {
        stream,
        info: fileInfo,
      };
    }
    throw new NotFoundException();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import * as upyun from 'upyun';
import PublicFile from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
    private readonly configService: ConfigService,
  ) {}
  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const UPYUN_SERVICE_NAME = this.configService.get('UPYUN_SERVICE_NAME');
    const UPYUN_OPERATOR_NAME = this.configService.get('UPYUN_OPERATOR_NAME');
    const UPYUN_OPERATOR_PASSWORD = this.configService.get(
      'UPYUN_OPERATOR_PASSWORD',
    );
    const UPYUN_DOMAIN_NAME = this.configService.get('UPYUN_DOMAIN_NAME');
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
    const newFile = this.publicFilesRepository.create({
      key: fileKey,
      url: `${UPYUN_DOMAIN_NAME}/${remotePath}`,
    });
    await this.publicFilesRepository.save(newFile);
    return newFile;
  }

  async deletePublicFile(fileId: number) {
    const file = await this.publicFilesRepository.findOneBy({ id: fileId });
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
    const remotePath = `img/${file.key}`;
    await client.deleteFile(remotePath);
    await this.publicFilesRepository.delete(fileId);
  }
}

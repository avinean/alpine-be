import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TelegramEntity } from './telegram.entity';
import { DeepPartial, Repository } from 'typeorm';
import { TelegramMessage } from 'src/util/dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TelegramService {
  constructor(
    @InjectRepository(TelegramEntity)
    private readonly telegramRepository: Repository<TelegramEntity>,
    private readonly httpService: HttpService,
  ) {}

  findAll() {
    return this.telegramRepository.find({
      order: {
        region: 'DESC',
      },
    });
  }

  create(dto: DeepPartial<TelegramEntity>) {
    return this.telegramRepository.save(this.telegramRepository.create(dto));
  }

  async update(id: number, dto: DeepPartial<TelegramEntity>) {
    const record = await this.telegramRepository.findOne({ where: { id } });
    Object.assign(record, dto);
    return this.telegramRepository.save(record);
  }

  async message(body: TelegramMessage) {
    const apis = await this.telegramRepository.find();

    return Promise.all(
      apis.map(({ botApiKey, userIds }) =>
        userIds.split(',').map((userId) =>
          this.httpService.axiosRef.post(
            `https://api.telegram.org/bot${botApiKey}/sendMessage`,
            {
              chat_id: userId,
              parse_mode: 'HTML',
              text: `
Замовлення зворотнього дзвінка від
Ім'я: <b>${body.name}</b>
Телефон: <a href="tel:${body.phone}">${body.phone}</a>
Коментар: ${body.comment}`,
            },
          ),
        ),
      ),
    );
  }
}

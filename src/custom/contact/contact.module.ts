import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './contact.entity';

@Module({
  providers: [ContactService],
  controllers: [ContactController],
  imports: [TypeOrmModule.forFeature([ContactEntity])],
})
export class ContactModule {}

import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  providers: [HealthService],
  controllers: [HealthController],
  imports: [TerminusModule],
})
export class HealthModule {}

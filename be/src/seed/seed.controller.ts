import { Controller, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Difficulty, SubmissionStatus } from '@prisma/client';

@Controller('seed')
export class SeedController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async seed() {
    const user = await this.prisma.user.upsert({
      where: { username: 'thinh' },
      update: {},
      create: { username: 'thinh' },
    });

    const arrays = await this.prisma.topic.upsert({
      where: { name: 'Arrays' },
      update: {},
      create: { name: 'Arrays' },
    });

    const hashing = await this.prisma.topic.upsert({
      where: { name: 'Hashing' },
      update: {},
      create: { name: 'Hashing' },
    });

    const problem = await this.prisma.problem.upsert({
      where: { slug: 'two-sum' },
      update: {},
      create: {
        slug: 'two-sum',
        title: 'Two Sum',
        difficulty: Difficulty.EASY,
        topics: {
          create: [
            { topic: { connect: { id: arrays.id } } },
            { topic: { connect: { id: hashing.id } } },
          ],
        },
      },
    });

    const submission = await this.prisma.submission.create({
      data: {
        userId: user.id,
        problemId: problem.id,
        status: SubmissionStatus.ACCEPTED,
        language: 'python',
        runtimeMs: 52,
        memoryKb: 18000,
        submittedAt: new Date(),
      },
    });

    return { user, problem, submission };
  }
}
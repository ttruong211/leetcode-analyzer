import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get(':id/summary')
  async summary(@Param('id') id: string) {
    const userId = Number(id);
    if (Number.isNaN(userId)) {
      throw new NotFoundException('Invalid user id');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const total = await this.prisma.submission.count({
      where: { userId },
    });

    const accepted = await this.prisma.submission.count({
      where: { userId, status: 'ACCEPTED' },
    });

    return {
      userId: user.id,
      username: user.username,
      totalSubmissions: total,
      acceptedSubmissions: accepted,
      acceptanceRate: total === 0 ? 0 : accepted / total,
    };
  }
}
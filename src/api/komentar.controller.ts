import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { KomentarService } from 'src/domain/komentar/komentar.service';

@Controller('comments')
export class KomentarController {
  constructor(private readonly komentarService: KomentarService) {}

  /* NOTE: Treba napraviti nekakvu brzu provjeru je li se pokušava urediti/brisati vlastiti
   * komentar
   */

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateKomentar(@Body('tekst') tekst: string, @Param('id') id: number) {
    return this.komentarService.updateKomentar(id, tekst);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteKomentar(@Param('id') id: number) {
    return this.komentarService.deleteKomentar(id);
  }
}

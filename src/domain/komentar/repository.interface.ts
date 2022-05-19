export interface IKomentarRepository {
  updateKomentar(idKomentar: number, tekst: string): Promise<any>;
  deleteKomentar(idKomentar: number): Promise<any>;
}

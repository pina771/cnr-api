export class RegisterDTO {
  username: string;
  pwd: string;
  ime: string;
  prezime: string;
  email: string;
  uloga: 'ugostitelj' | 'gost';
}

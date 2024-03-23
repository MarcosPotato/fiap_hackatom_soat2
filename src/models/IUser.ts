export interface IUser {
  id: string;
  name: string;
  registration: string;
  email: string;
  password: string;
  avatar_url?: string | null;
  blocked: boolean;
  blocked_at?: Date | null;
  created_at: Date;

  address?: string | null;
  celphone?: string | null;
  cpf?: string | null;
  job_role?: string | null;
  pib?: string | null;
  telphone?: string | null;
}

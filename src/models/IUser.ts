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
}

import { User, Session } from '@supabase/supabase-js';

export type LoginResponse = {
	user: User | null;
	session: Session | null;
};

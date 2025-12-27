import { User, Session } from '@supabase/supabase-js';

export type LoginResponse = {
	user: User;
	session: Session;
};

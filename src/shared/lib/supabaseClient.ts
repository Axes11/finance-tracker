import { createClient } from '@supabase/supabase-js';

console.log('BASE URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!);

export default supabaseClient;

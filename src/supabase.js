import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zyxihvrdoobsictrgxch.supabase.co';
const supabaseAnonKey = 'sb_publishable_-6p7p3nG5akxySQjG6IWfw_uw8TXPOl';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zvzktgvtgagyxmhayrmi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2emt0Z3Z0Z2FneXhtaGF5cm1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MzcxMjcsImV4cCI6MjA2OTUxMzEyN30.rJ9D9uE8oWXRJAQlFBC_nqP52T546A-Yue0THlv24Kc';

export const supabase = createClient(supabaseUrl, supabaseKey);

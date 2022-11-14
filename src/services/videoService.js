import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pwbhuirjnnfvabzdnkyy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3Ymh1aXJqbm5mdmFiemRua3l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzODgxNjksImV4cCI6MTk4Mzk2NDE2OX0.oGFyf83yZQhtTRtf2vl65CBi3lx7X9jQ1ex9NLURcAw';
const supabase = createClient(supabaseUrl, supabaseKey);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*");
        }
    }
}
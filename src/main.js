import { createClient } from '@supabase/supabase-js'
import App from './App.svelte';

const supabaseUrl = 'https://zvhsalwwltwppgzlqiym.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxOTY5MDc2MiwiZXhwIjoxOTM1MjY2NzYyfQ.9RmXm28OWb1EK57iF_jgjm2i4gFGXhRn3i1TQtDPZus"

const app = new App({
	target: document.body,
	props: {
		supabase: createClient(supabaseUrl, supabaseKey)
	}
});

export default app;
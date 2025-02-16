import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Locations() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: locations } = await supabase.from('locations').select()

  return <pre>{JSON.stringify(locations, null, 2)}</pre>
}

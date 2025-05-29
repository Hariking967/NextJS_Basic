import { cookies } from 'next/headers'

export default async function HomePage() {
  const name = (await cookies()).get( "name")?.value;
  return(
    <p>{name}</p>
  )
}
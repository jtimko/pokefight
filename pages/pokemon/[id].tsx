import Image from 'next/image'
import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import Head from 'next/head'

type Params = {
	params: {
		id: string
	}
}

export default function Details({ pokemon }: any) {
    return (
        <div className='h-full w-full'>
             <Head>
                <title>PokeFight - {pokemon.name}</title>
            </Head>
            <Link href={`/`}>
                Back to home
            </Link>

            <div className='w-96 m-auto'>
            {!pokemon ? <div>Loading..</div>
                :
                <div className='flex flex-col mt-8'>
                    <div className='pl-10'>
                        <h1 className='text-2xl capitalize'>{pokemon.name}</h1>
                        {pokemon.types.map((p: any) => <span key={p.slot} className='text-gray-300 italic'>{p.type.name} </span>)}
                    </div>

                    <div className='w-200 ml-(-400)'>
                        <Image src={pokemon.sprites.front_default} height={200} width={200} />
                    </div>
                </div>}
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
    const data = await res.json()

    return {
        paths: data.results.map((p: any, i: number) => ({
            params: { id: (i+1).toString()},
        })),
        fallback: false,
    }
}

export async function getStaticProps({ params }: Params) {
    const { id } = params;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    return {
        props: {
            pokemon: data,
        }
    };
}
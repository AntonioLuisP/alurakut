import React, { useEffect } from 'react';
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import MainGrid from '../src/components/MainGrid';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet
} from '../src/lib/AlurakutCommons'

function ProfileSidebar(props) {

  return (
    <Box as="aside" style={{ gridArea: "profileArea" }}>
      <img src={"https://github.com/" + props.githubUser + ".png"} alt="avatar" style={{ borderRadius: '8px' }} />
      <hr />
      <a
        className='boxLink'
        href={"https://github.com/" + props.githubUser}
        target='_blank'
      >
        @{props.githubUser}
      </a>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox({ title, lista }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className='smallTitle'>
        {title} ({lista.length})
      </h2>
      <ul>
        {
          lista.map(item => (
            <li key={item.id}>
              <a href={item.html_url} >
                <img src={item.avatar_url} />
                <span>{item.login}</span>
              </a>
            </li>
          ))
        }
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {

  const githubUser = props.githubUser

  const [comunidades, setComunidades] = React.useState([])
  const [seguidores, setSeguidores] = React.useState([])

  const pessoasFavoritas = [
    'castielisgone',
    'developedbyed',
    'PovilasKorop',
    'WebDevSimplified',
    'gabrielfroes',
    'rafaballerini',
  ]

  useEffect(() => {
    fetch('https://api.github.com/users/' + githubUser + '/followers')
      .then(response => response.json())
      .then(response => {
        if (response.message !== 'Not Found') {
          setSeguidores(response)
        }
      })
      .catch(error => console.log(error))

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': '40d06f6fd71a3c4de591751619e699',
      },
      body: JSON.stringify({
        "query": `query {
        allCommunities{
          id,
          title,
          imageUrl,
          creatorSlug    
        }
       }`})

    })
      .then(response => response.json())
      .then(response => {
        setComunidades(response.data.allCommunities)
      })
      .catch(error => console.log(error))

  }, [])

  function handleCriarComunidade(e) {
    e.preventDefault()
    const dadosForm = new FormData(e.target);

    const comunidade = {
      title: dadosForm.get('title'),
      imageUrl: dadosForm.get('imageUrl'),
      creatorSlug: githubUser
    }

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comunidade)
    })
      .then(async response => {
        const dados = await response.json()
        setComunidades([...comunidades, dados.registroCriado])
      })

    // setComunidades([...comunidades, comunidade])
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className='welcomeArea' style={{ gridArea: "welcomeArea" }}>
          <Box style={{ gridArea: "welcomeArea" }}>
            <h1 className='title'>
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box >
            <h2 className='subTitle'>
              O que você deseja fazer?
            </h2>
            <form onSubmit={e => handleCriarComunidade(e)}>
              <div>
                <input
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name='title'
                  aria-label='Qual vai ser o nome da sua comunidade?'
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Coloque uma url para usarmos de capa?"
                  name='imageUrl'
                  aria-label='Coloque uma url para usarmos de capa?'
                />
              </div>
              <button>
                Criar sua comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>

          <ProfileRelationsBox title={'Seguidores'} lista={seguidores} />

          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Comunidade ({comunidades.length})
            </h2>
            <ul>
              {
                comunidades.map(comunidade => (
                  <li key={comunidade.id}>
                    <a href={'/users/' + comunidade.title} >
                      <img src={comunidade.imageUrl} />
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                ))
              }
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {
                pessoasFavoritas.map(pessoa => (
                  <li key={pessoa}>
                    <a href={'/users/' + pessoa} >
                      <img src={"https://github.com/" + pessoa + ".png"} />
                      <span>{pessoa}</span>
                    </a>
                  </li>
                ))
              }
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}


export async function getServerSideProps(context) {
  const token = nookies.get(context).USER_TOKEN
  const decodedToken = jwt.decode(token)
  const githubUser = decodedToken?.githubUser;

  if (!githubUser) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      githubUser: githubUser
    }
  }
}
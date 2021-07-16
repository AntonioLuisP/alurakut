import React, { useEffect } from 'react';
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
      <img src={"https://github.com/" + props.gitUser + ".png"} alt="avatar" style={{ borderRadius: '8px' }} />
      <hr />
      <a
        className='boxLink'
        href={"https://github.com/" + props.gitUser}
        target='_blank'
      >
        @{props.gitUser}
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
            <li key={item.tittle}>
              <a href={'/users/' + item.tittle} >
                <img src={item.image} />
                <span>{item.tittle}</span>
              </a>
            </li>
          ))
        }
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {

  const gitUser = "AntonioLuisP"

  const [comunidades, setComunidades] = React.useState([])
  const [seguidores, setSeguidores] = React.useState([])
  console.log(seguidores)

  const pessoasFavoritas = [
    'castielisgone',
    'developedbyed',
    'PovilasKorop',
    'WebDevSimplified',
    'gabrielfroes',
    'rafaballerini',
  ]

  useEffect(() => {

    fetch('https://api.github.com/users/AntonioLuisP/followers')
      .then(response => response.json())
      .then(response => {
        setSeguidores(response)
      })
      .catch(error => console.log(error))
  }, [])

  function handleCriarComunidade(e) {
    e.preventDefault()
    const dadosForm = new FormData(e.target);

    setComunidades([...comunidades, {
      tittle: dadosForm.get('tittle'),
      image: dadosForm.get('image')
    }])
  }

  return (
    <>
      <AlurakutMenu githubUser={gitUser} />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: "profileArea" }}>
          <ProfileSidebar gitUser={gitUser} />
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
                  name='tittle'
                  aria-label='Qual vai ser o nome da sua comunidade?'
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Coloque uma url para usarmos de capa?"
                  name='image'
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
          <ProfileRelationsBox title={'Comunidades'} lista={comunidades} />

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

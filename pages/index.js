import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSidebar(props) {

  return (
    <Box style={{ gridArea: "profileArea" }}>
      <img src={"https://github.com/" + props.gitUser + ".png"} alt="avatar" style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const gitUser = "AntonioLuisP"

  const pessoasFavoritas = [
    'castielisgone',
    'developedbyed',
    'PovilasKorop',
    'WebDevSimplified',
    'gabrielfroes',
    'rafaballerini',
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: "profileArea" }}>
          <ProfileSidebar gitUser={gitUser} />
        </div>
        <div className='welcomeArea' style={{ gridArea: "welcomeArea" }}>
          <Box style={{ gridArea: "welcomeArea" }}>
            <h1 className='tittle'>
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>
          <ProfileRelationsBoxWrapper style={{ gridArea: "profileRelationsArea" }}>
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
          <ProfileRelationsBoxWrapper style={{ gridArea: "profileRelationsArea" }}>
            Comunidades
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

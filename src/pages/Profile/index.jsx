import {FiArrowLeft, FiUser, FiMail, FiLock, FiCamera} from 'react-icons/fi'
import { Link } from "react-router-dom"
import {Input} from '../../Components/Input'
import {Button} from '../../Components/Button'
import {Container, Form, Avatar} from './style'
import { useState } from 'react'
import { useAuth } from "../../hooks/auth"

import { api } from '../../../../../Stage 08/iniciando-nodejs/src/services/api'
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"

export function Profile(){
  const { user, updateProfile } = useAuth()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [passwordOld, setPasswordOld] = useState()
  const [passwordNew, setPasswordNew] = useState()

  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
  const [avatar, setAvatar] = useState(avatarURL) //se já tem avatar mostra esse
  const [avatarFile, setAvatarFile] = useState(null) //esse carrega um novo avatar

  async function handleUpdate(){
    const user = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld
    }
    await updateProfile({user, avatarFile});
  }

  function handleChangeAvatar(event){
    const file = event.target.files[0];
    setAvatarFile(file)

    const imagePreview = URL.createObjectURL(file)
    setAvatar(imagePreview)
    
  }

  return(
    <Container>
      <header>
        <Link to="/"><FiArrowLeft/></Link>
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt="Foto do usuário" />

          <label htmlFor="avatar">
            <FiCamera/>

            <input id="avatar" type="file" onChange={handleChangeAvatar}/>
          </label>
        </Avatar>

        <Input 
        placeholder="Nome"
        type="text"
        icon={FiUser}
        value={name}
        onChange={e => setName(e.target.value)}
        />
        <Input 
        placeholder="Email"
        type="text"
        icon={FiMail}
        value={email}
        onChange={e => setEmail(e.target.value)}
        />
        <Input 
        placeholder="Senha Atual"
        type="password"
        icon={FiLock}
        onChange={e => setPasswordOld(e.target.value)}
        />
        <Input 
        placeholder="Nova Senha"
        type="password"
        icon={FiLock}
        onChange={e => setPasswordNew(e.target.value)}
        />
        <Button title="Salvar" onClick={handleUpdate}/>
      </Form>

    </Container>
  )
}
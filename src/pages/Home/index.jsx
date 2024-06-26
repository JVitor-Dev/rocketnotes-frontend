import { FiPlus, FiSearch } from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './style'

import { ButtonText } from '../../Components/ButtonText'

import{ api } from '../../services/api'
import { useState, useEffect } from 'react'

import { Header } from '../../Components/Header'
import { Input } from '../../Components/Input'
import { Section } from '../../Components/Section'
import { Note } from '../../Components/Note'
import { useNavigate } from 'react-router-dom'

export function Home(){
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([])
  const [notes, setNotes] = useState([])

  const navigate = useNavigate()

  function handleTagSelected(tagName){
    if(tagName === "all"){
      return setTagsSelected([])
    }

    const alreadySelected = tagsSelected.includes(tagName)

    if(alreadySelected){
      const filteredTags = tagsSelected.filter(tag => tag !== tagName)
      setTagsSelected(filteredTags)
    }else {
      setTagsSelected(prevState => [...prevState, tagName])
    }
  }

  function handleDetails(id){
    navigate(`/details/${id}`)
  }

  useEffect(() => {
    async function fetchTags(){
      const response = await api.get('/tags')
      setTags(response.data)
    }

    fetchTags()
  },[])

  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
      setNotes(response.data)
    }

    fetchNotes()

  }, [tagsSelected, search])

  return(
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>

      <Header/>

      <Menu>
        <li><ButtonText 
        title="Todos" 
        $isactive={tagsSelected.length === 0}
        onClick={() => handleTagSelected("all")}
        /></li>
        {
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText 
              title={tag.name}
              onClick={() => handleTagSelected(tag.name)}
              $isactive={tagsSelected.includes(tag.name)}
            /></li>
          ))
        }
      </Menu>

      <Search>
        <Input
          icon={FiSearch}
          placeholder="Pesquisar pelo título" 
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
              <Note 
                key={String(note.id)}
                data={note}
                onClick={() => handleDetails(note.id)}
                />
            ))
          }

        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus/>
        Criar nota
      </NewNote>

    </Container>
  )
}
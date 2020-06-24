import React from 'react'
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, Background } from './styles'

const SignUp: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data)
  }

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber logo" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu Cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="Email" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="#">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>

      <Background />
    </Container>
  )
}

export default SignUp

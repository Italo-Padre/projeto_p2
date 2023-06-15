import Navegacao from '@/components/Navegacao'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const index = () => {

    const [alunos, setAlunos] = useState([])
   

    useEffect(() => {
        getAll()
    }, [])
    function getAll() {
        axios.get('/api/alunos?OrderBy=modalidade').then(resultado => {
            setAlunos(resultado.data)
        })
    }

    console.log(alunos);
  return (
    <>
        <Navegacao>

        </Navegacao>
    </>
  )
}

export default index
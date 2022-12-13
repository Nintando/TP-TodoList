import { Container, Row, Col, Button } from 'react-bootstrap'
import AppNavbar from './App-Navbar/App-Navbar'
import { useState, useEffect } from 'react'

export default function TodoList() {
  const [tache, setTache] = useState([])

  let displaytache = tache.map((todoInfos, indice) => {
    const id = todoInfos.id
    return (
      <Col md={4} key={'todo-' + id}>
        <div className="d-grid gap-2 mt-5">
          <h2>{todoInfos.titre}</h2>
          <Button
            variant="outline-danger"
            size="lg"
            onClick={() => deleteListItem(indice)}
          >
            Supprimer la tâche
          </Button>
        </div>
      </Col>
    )
  })

  function add() {
    let titre = window.prompt("Veuillez saisir l'intitulé de votre tâche")
    if (titre !== null && titre.trim().length > 0) {
      let tmp = [...tache]
      let id = Date.now()
      let obj = { id, titre }
      tmp.push(obj)
      setTache(tmp)
    }
  }

  function deleteListItem(i) {
    let tmp = [...tache]
    tmp.splice(i, 1)
    setTache(tmp)
  }

  useEffect(() => {
    let datas = localStorage.getItem('btc-todoList')
    setTache(JSON.parse(datas))
  }, [])

  useEffect(() => {
    localStorage.setItem('btc-todoList', JSON.stringify(tache))
  }, [tache])

  return (
    <div className="App">
      <header className="mb-5">
        <AppNavbar />
      </header>

      <main>
        <Container>
          <Row className="mb-4">
            <Col>
              <Button onClick={add}>Créer une nouvelle tâche</Button>
            </Col>
          </Row>

          <Row>{displaytache}</Row>
        </Container>
      </main>
    </div>
  )
}

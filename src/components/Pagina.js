import { Container, Nav, Navbar } from "react-bootstrap";
import { FaCartShopping } from "react-icons/fa6";

export default function Pagina(props) {
  const backgroundStyle = {
    backgroundImage: 'url("https://i.ytimg.com/vi/9v8tB27etk4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCnJ1QpWj_6hs20iTlJ5HplMai_ig")',
    backgroundSize: 'cover',//para colocar so uma imagem
    backgroundPosition: 'center',
    minHeight: '100vh', // Defina a altura do background
    color: 'white',
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img src="https://d1mr3mwm0mcol2.cloudfront.net/eyJidWNrZXQiOiJtb250aW5rIiwia2V5IjoicGVyZmlsX21vbnRpbmsvMTYwMTE2NjE4NjVmNmZkYjZhYjcxNzUucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7ImhlaWdodCI6NDk3LCJ3aWR0aCI6MTkyMCwiZml0IjoiaW5zaWRlIn19fQ==" width="100" height="70" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/produtos">Produtos</Nav.Link>
              <Nav.Link href="/funcionario">Funcionarios</Nav.Link>
              <Nav.Link href="/cliente">Cliente</Nav.Link>
              <Nav.Link href="/pedido">Pedido</Nav.Link>
              <Nav.Link href="/carinho"><FaCartShopping /></Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>



      <div style={backgroundStyle}>
        <div className="bg-secondary text-white text-center p-3">
          <h1>{props.titulo}</h1>
        </div>
        <Container>

        </Container>
      </div>
    </>
  );
}
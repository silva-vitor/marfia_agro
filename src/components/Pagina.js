import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

export default function Pagina(props) {
  // Estado para controlar se o usuário está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica se o usuário está logado ao carregar a página
  useEffect(() => {
    const usuarioLogado = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(usuarioLogado === "true");
  }, []);

  // Função para realizar o logout e redirecionar
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    window.location.href = "/login"; // Redireciona para a página de login após logout
  };

  return (
    <>
      {/* Container para aplicar uma imagem de fundo em toda a página */}
      <div
        style={{
          backgroundImage: "url('https://www.comprerural.com/wp-content/uploads/2024/10/estados-mais-ricos-do-agronegocio-750x430.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        {/* Navbar com imagem de fundo e estilos personalizados */}
        <Navbar
          expand="lg"
          style={{
            backgroundImage: "url('https://midianinja.org/wp-content/uploads/2024/07/colheita-de-soja-1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container>
            {/* Logo da marca dentro da Navbar */}
            <Navbar.Brand href="/">
              <img
                src="https://d1mr3mwm0mcol2.cloudfront.net/eyJidWNrZXQiOiJtb250aW5rIiwia2V5IjoicGVyZmlsX21vbnRpbmsvMTYwMTE2NjE4NjVmNmZkYjZhYjcxNzUucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7ImhlaWdodCI6NDk3LCJ3aWR0aCI6MTkyMCwiZml0IjoiaW5zaWRlIn19fQ=="
                width="100"
                height="70"
                alt="Logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* Links de navegação sempre visíveis */}
                <Nav.Link href="/produtos" style={navLinkStyle}>
                  Produtos
                </Nav.Link>
                 
                {/* Renderiza condicionalmente os links "funcionarios" e "cliente" */}
                {isAuthenticated && (
                  <>
                    <Nav.Link href="/funcionarios" style={navLinkStyle}>
                      Funcionários
                    </Nav.Link>
                    <Nav.Link href="/clientes" style={navLinkStyle}>
                      Cliente
                    </Nav.Link>
                  
                    <Nav.Link href="/login/produtos" style={navLinkStyle}>
                      Produtos ad
                    </Nav.Link>
                  </>
                )}
                
                <Nav.Link href="/pedido" style={navLinkStyle}>
                  Pedido
                </Nav.Link>


                {/* Ícone de carrinho de compras */}
                <Nav.Link href="/carinho" style={navLinkStyle}>
                  <FaCartShopping />
                </Nav.Link>
              </Nav>

              {/* Ícone de login/logout à direita */}
              <Nav className="ms-auto">
                {isAuthenticated ? (
                  <Nav.Link onClick={handleLogout} style={loginLinkStyle}>
                    <FaUserCircle style={{ fontSize: "2rem" }} /> Sair
                  </Nav.Link>
                ) : (
                  <Nav.Link href="/login" style={loginLinkStyle}>
                    <FaUserCircle style={{ fontSize: "2rem" }} /> Login
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Conteúdo adicional da página */}
        <div className="container mt-5">{props.children}</div>
      </div>
    </>
  );
}

// Estilos reutilizáveis
const navLinkStyle = {
  fontWeight: "bold",
  color: "#32CD32",
  textShadow: "1px 1px 2px #000",
  fontSize: "1.2rem",
  textDecoration: "none",
};

const loginLinkStyle = {
  fontWeight: "bold",
  color: "#FFFFF0",
  textShadow: "1px 1px 2px #000",
  fontSize: "1.5rem",
};

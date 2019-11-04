import React from "react";
//import { Link } from "react-router-dom";
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <>
        <footer className="footer has-cards">
         <Container>
           <hr />
            <Row className="align-items-center justify-content-md-between">
              <Col md="6">
                <div className="copyright">
                  © {new Date().getFullYear()}{" "}
                  <a href="https://www.creative-tim.com?ref=adsr-footer">
                    CopyRight
                  </a>
                  .
                </div>
              </Col>
              <Col md="6">
                <Nav className="nav-footer justify-content-end">
                    <NavItem>
                        <NavLink
                            href="https://www.creative-tim.com/presentation?ref=adsr-footer"
                            target="_blank"
                        >
                            Quienes somos?
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        href="http://blog.creative-tim.com?ref=adsr-footer"
                        target="_blank"
                        >
                        Desarrolladores
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        href="https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md"
                        target="_blank"
                        >
                        MIT License
                        </NavLink>
                    </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Footer;
import React from "react";
import { Link } from "gatsby";
import { Col, Nav, Row, Navbar } from "react-bootstrap";
import { METADATA } from "../constants";

export default () => (
  <Row className="no-print">
    <Col>
      <Nav className="justify-content-center" activeKey="/">
        <Nav.Item>
          <Link className="nav-link" to="/">
            <Navbar.Brand href="#home">{METADATA.title}</Navbar.Brand>
          </Link>
        </Nav.Item>
      </Nav>

      <Nav className="justify-content-center" activeKey="/">
        <Nav.Item>
          <Link className="nav-link" to="/about/">
            About
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="nav-link" to="/contact/">
            Contact
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="nav-link" to="/legal/">
            Legal
          </Link>
        </Nav.Item>
      </Nav>
    </Col>
  </Row>
);

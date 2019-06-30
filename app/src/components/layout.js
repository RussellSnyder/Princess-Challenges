import React from "react"
import { Link } from "gatsby"
import {Col, Container, Nav, Row} from "react-bootstrap";

export default ({ children, footerScripts, className }) => (
        <Container className={className}>
            <Row>
                <Col>
                    <Nav className="justify-content-start" activeKey="/">
                        <Nav.Item>
                            <Link className="nav-link" to="/">
                                <h3>Princess Challenges</h3>
                            </Link>
                        </Nav.Item>
                    </Nav>

                    <Nav className="justify-content-end" activeKey="/">
                        <Nav.Item>
                            <Link className="nav-link" to="/challenges/">Challenges</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link" to="/blog/">Blog</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link" to="/contact/">Contact</Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
            {children}
            {footerScripts && footerScripts.map(footerScript => <script key={footerScript} async defer src={footerScript}/>)}
        </Container>
)

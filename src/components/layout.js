import React from "react";
import { Container } from "react-bootstrap";
import NavigationHeader from "./navigationHeader";
import NavigationFooter from "./navigationFooter";

export default ({ children, footerScripts, className }) => (
  <>
    <NavigationHeader />
    <Container className={className} style={{ minHeight: 400 }}>
      {children}
    </Container>
    <NavigationFooter />
    {footerScripts &&
      footerScripts.map(footerScript => (
        <script key={footerScript} async defer src={footerScript} />
      ))}
  </>
);

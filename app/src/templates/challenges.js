import React from "react"
import Layout from "../components/layout"
import Header from "../components/header"
import ChallengePreview from "../components/challenge-preview"
import {Col, Row} from "react-bootstrap";

export default ({ pageContext: { allChallenges } }) => {
    return <Layout>
        <Header/>
        <section className="challenges">
            <Row>
                {allChallenges.map(challenge => <Col xs={12} sm={6} md={4} key={challenge.slug}>
                        <ChallengePreview  { ...challenge }/>
                </Col>)}
            </Row>
        </section>

        </Layout>
}

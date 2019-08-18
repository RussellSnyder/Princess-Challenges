import React from "react"
import Layout from "../components/layout"
import {Col, Image, Row} from "react-bootstrap";
import {Link} from "gatsby"

import BingoChallengeGrid from '../components/BingoChallengeGrid'
import Card from "react-bootstrap/Card";

export default class Challenge extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            printPreview: false
        }
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "//assets.pinterest.com/js/pinit.js";
        script.async = true;

        document.body.appendChild(script);

    }



    render() {
        const props = this.props.pageContext

        // console.log(props.arrangedBingoSpaces)

        return (<Layout footerScripts={["//assets.pinterest.com/js/pinit.js"]} className="challenge">
            <h1>{props.title}</h1>
            <div className="featured-image no-print">
                <Image className={"d-block m-auto"}
                        src={props.featuredImage.url}
                       alt={props.featuredImage.title}
                       fluid="true"/>
            </div>
            <section className="description no-print" dangerouslySetInnerHTML={{__html: props.description}}/>
            <Row className={"print-only print-header"}>
                <Image fluid={true} src={props.featuredImage.url}/>
                <section className="description" dangerouslySetInnerHTML={{__html: props.description}}/>
            </Row>
            <section className="challenge-bingo">
                <h3 className="d-print-none">Tasks</h3>
                <BingoChallengeGrid { ...props } />
            </section>
            <section className="pinterst no-print">
                <header><h3>{props.pinterestHeader}</h3></header>
                <main>
                    <a data-pin-do="embedBoard"
                       data-pin-board-width="1500"
                       data-pin-scale-height="1500"
                       data-pin-scale-width="500"
                       href={props.pinterestLink}>
                    </a>
                </main>
                <footer><h4>{props.pinterestFooter}</h4></footer>
            </section>
            <section className="related-posts no-print">
                <Row>
                    {props.relevantBlogPosts.map(post => {
                        return <Col className={"mb-4"} key={post.slug} sm={6} md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        {post.title}
                                    </Card.Title>
                                    <Card.Text>
                                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {post.short}
                                        </div>
                                        <Link className={"w-100 mt-4 btn btn-primary"} to={`blog/${post.slug}`}>
                                            Read Post <i className="ml-2 fas fa-external-link-alt"/>
                                        </Link>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            {/*<Link to={`blog/${post.slug}`}>{post.title}</Link>*/}
                        </Col>
                    })}
                </Row>
            </section>
            <footer className={"print-only text-center"}>Pinterest Board: {props.pinterestLink}</footer>
        </Layout>)
    }
}

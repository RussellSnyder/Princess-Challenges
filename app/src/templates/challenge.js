import React from "react"
import Layout from "../components/layout"
import {Col, Image, Row} from "react-bootstrap";
import { Link } from "gatsby"

export default class Challenge extends React.Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "//assets.pinterest.com/js/pinit.js";
        script.async = true;

        document.body.appendChild(script);
    }

    createTaskBoxes(numBoxes) {
        let boxes = [];
        for (let i = 1; i <= Number(numBoxes); i++) {
            boxes.push(<span key={i} className="repetition-box"/>)
        }
        return boxes
    }

    render() {
        const props = this.props.pageContext

        return (<Layout footerScripts={["//assets.pinterest.com/js/pinit.js"]} className="challenge">
            <h1>{props.title}</h1>
            <div className="featured-image">
                <Image src={props.featuredImage.url} alt={props.featuredImage.title} fluid="true"/>
            </div>
            <section className="description" dangerouslySetInnerHTML={{__html: props.description}}/>
            <section className="challenge-bingo">
                <Row className="board h-100 justify-content-center align-items-center">
                    {props.challengeBingo.bingoChallengeSpaces.map((space, i) => {
                        return <Col key={i} xs={12} sm={3} md={{ span: 2, offset: i === 0 ? 1 : 0}}
                                    className="text-center space my-auto mx-2">
                            {space.task}
                            <div className="repetition">
                                {this.createTaskBoxes(space.repetitions)}
                            </div>
                        </Col>
                    })
                    }
                </Row>
            </section>
            <section className="pinterst">
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
            <section className="related-posts">
                <Row>
                    {props.relevantBlogPosts.map(post => {
                        return <Col>
                            <Link to={`blog/${post.slug}`}>{post.title}</Link>
                        </Col>
                    })}
                </Row>
            </section>
        </Layout>)
    }
}

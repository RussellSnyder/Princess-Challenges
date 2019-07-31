import React from "react"
import Layout from "../components/layout"
import {Col, Image, Row} from "react-bootstrap";
import {Link} from "gatsby"
import _ from 'lodash';

const BINGO_CARD_SIZE = 25;

export default class Challenge extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dirtyBingoSpaces: [],
            printPreview: false
        }
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "//assets.pinterest.com/js/pinit.js";
        script.async = true;

        document.body.appendChild(script);

        this.arrangeBingoSpaces()
    }

    createTaskBoxes(numBoxes) {
        let boxes = [];
        for (let i = 1; i <= Number(numBoxes); i++) {
            boxes.push(<span key={i} className="repetition-box"/>)
        }
        return boxes
    }

    arrangeBingoSpaces() {
        const {bingoChallengeSpaces} = this.props.pageContext.challengeBingo

        let dirtyBingoSpaces = _.sampleSize(bingoChallengeSpaces, BINGO_CARD_SIZE)
        // TODO use weighting system to determine likelihood of category placement

        this.setState({dirtyBingoSpaces})

    }

    render() {
        const props = this.props.pageContext
        const {dirtyBingoSpaces: spaces} = this.state;

        return (<Layout footerScripts={["//assets.pinterest.com/js/pinit.js"]} className="challenge">
            <h1>{props.title}</h1>
            <div className="featured-image no-print">
                <Image src={props.featuredImage.url} alt={props.featuredImage.title} fluid="true"/>
            </div>
            <section className="description" dangerouslySetInnerHTML={{__html: props.description}}/>
            <section className="challenge-bingo">
                <Image className="print-only background-image" src={props.featuredImage.url} />

                <Row className="no-print">
                    <Col>
                        <button className="btn btn-primary" onClick={() => this.arrangeBingoSpaces()}>Shuffle</button>
                    </Col>
                    <Col className="text-right">
                        <button className="btn btn-success" onClick={() => window.print()}>Print</button>
                    </Col>
                </Row>
                <hr/>
                <div className="board">
                    {spaces.map((space, i) => {
                        return <div key={i}
                                    className={`text-center space ${space.category}`}>
                            <div className="content">
                                {space.task}
                                <div className="repetition">
                                    {this.createTaskBoxes(space.repetitions)}
                                </div>

                            </div>
                        </div>
                    })
                    }
                </div>
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
                        return <Col>
                            <Link to={`blog/${post.slug}`}>{post.title}</Link>
                        </Col>
                    })}
                </Row>
            </section>
        </Layout>)
    }
}

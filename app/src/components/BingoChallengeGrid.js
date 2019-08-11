import {Col, Image, Row} from "react-bootstrap";
import React from "react";
import _ from "lodash";

const BINGO_CARD_SIZE = 25;
const CENTER_INDEX = 12;

export default class BingoChallengeGrid extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            arrangedBingoSpaces: [],
            freestyleTask: '',
            isEditingFreestyleTask: false
        }

        this.bingoChallengeSpaces = props.challengeBingo.bingoChallengeSpaces
        this.bingoChallengeGridTemplate = props.challengeBingo.bingoChallengeGridTemplate
    }

    componentDidMount() {
        const freestyleSpace = _.find(this.bingoChallengeSpaces, space => space.category === "Freestyle")

        this.setState({freestyleTask: freestyleSpace.task}, () => {
            this.arrangeBingoSpaces()
        })

    }

    createTaskBoxes(numBoxes) {
        let boxes = [];
        for (let i = 1; i <= Number(numBoxes); i++) {
            boxes.push(<span key={i} className="repetition-box"/>)
        }
        return boxes
    }

    arrangeBingoSpaces() {
        // TODO use weighting system to determine likelihood of category placement
        let arrangedBingoSpaces = [];
        let shuffledBingoSpaceOptions = _.shuffle(_.cloneDeep(this.bingoChallengeSpaces))

        // Fill what matches in the grid template
        this.bingoChallengeGridTemplate.categories.forEach((category, i) => {

            const matchedSpaceIndex = _.findIndex(shuffledBingoSpaceOptions, space => {
                return space.category === category.name
            });

            if (matchedSpaceIndex > -1) {
                arrangedBingoSpaces[i] = shuffledBingoSpaceOptions[matchedSpaceIndex];
                // center logic
                if (i === CENTER_INDEX) {
                    arrangedBingoSpaces[i].isCenter = true;
                }
                shuffledBingoSpaceOptions.splice(matchedSpaceIndex, 1)
            } else {
                arrangedBingoSpaces[i] = undefined;
            }
        })

        // Add freestyle default values to state to be editable but persisted through shuffles

        // Fill in undefined with random space
        arrangedBingoSpaces = arrangedBingoSpaces.map((space, i) => {
            if (space) {
                return space
            } else {
                return shuffledBingoSpaceOptions.pop()
            }
        })

        // let arrangedBingoSpaces = _.sampleSize(this.bingoChallengeSpaces, BINGO_CARD_SIZE)

        this.setState({
            arrangedBingoSpaces,
            spacesInitialized: true
        })

    }

    onSpaceEditableChange(e) {
        e.persist()

        this.setState({freestyleTask: e.target.value})
    }

    toggleEditable() {
        this.setState(state => {
            return ({isEditingFreestyleTask: !state.isEditingFreestyleTask})
        })
    }

    EditTask() {
        return <div className="form-group">
            <textarea
                    className="form-control mt-4"
                    defaultValue={this.state.freestyleTask}
                    onChange={(e) => this.onSpaceEditableChange(e)}
            />
        </div>
    }

    Space(space, i) {
        return <div
                key={space.category + i}
                className={`text-center space ${space.category} ${space.isCenter && 'editable'}`}
        >
            {space.isCenter && <span className="label no-print" onClick={() => this.toggleEditable()}>
                {this.state.isEditingFreestyleTask
                                    ? <button type="button" className="btn btn-outline-success btn-sm">
                                        <i className="far fa-save fa-2x"/>
                                    </button>
                                    : <button type="button" className="btn btn-outline-warning btn-sm">
                                        <i className="far fa-edit fa-2x"/>
                                    </button>
                    }
            </span>}
            <div className="content">
                {space.isCenter
                        ? this.state.isEditingFreestyleTask
                                ? this.EditTask()
                                : this.state.freestyleTask
                        : space.task
                }
                <div className="repetition">
                    {this.createTaskBoxes(space.repetitions)}
                </div>
            </div>
        </div>
    }

    render() {
        const {arrangedBingoSpaces: spaces} = this.state;


        return <>
            <Row className="no-print">
                <Col>
                    <button className="btn btn-primary" onClick={() => this.arrangeBingoSpaces()}>Shuffle</button>
                </Col>
                <Col className="text-right">
                    <button className="btn btn-success" onClick={() => window.print()}>Print</button>
                </Col>
            </Row>
            <hr className="no-print"/>
            <div className="board">
                {spaces.map((space, i) => this.Space(space, i))}
            </div>
        </>
    }
}

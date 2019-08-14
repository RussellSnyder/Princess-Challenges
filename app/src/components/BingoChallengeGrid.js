import {Col, Row} from "react-bootstrap";
import React from "react";
import _ from "lodash";
import header from "./header";

const CENTER_INDEX = 12;
const BINGO_SPACE_COUNT = 25;

export default class BingoChallengeGrid extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            arrangedBingoSpaces: [],
            freestyleTask: '',
            isEditingFreestyleTask: false,
            pinnedBingoSpaceIndexes: [],
            bannedBingoSpaces: [],
            maxBingoSpacesBanned: false
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
        const { bannedBingoSpaces } = this.state;

        let newlyArrangedBingoSpaces = [];

        let cleanBingoSpaces = _.cloneDeep(this.bingoChallengeSpaces);

        // remove banned bingo spaces
        if (bannedBingoSpaces.length > 0) {
            bannedBingoSpaces.forEach(bannedSpace => {
                const indexOfBannedInClean = cleanBingoSpaces.findIndex(space => space.task === bannedSpace.task)
                cleanBingoSpaces.splice(indexOfBannedInClean, 1)
            })
        }

        let shuffledBingoSpaceOptions = _.shuffle(cleanBingoSpaces)


        // Fill what matches in the grid template
        this.bingoChallengeGridTemplate.categories.forEach((category, i) => {

            // keep pinned ones where they are pinned
            if (this.state.pinnedBingoSpaceIndexes.includes(i)) {
                newlyArrangedBingoSpaces.push(this.state.arrangedBingoSpaces[i])
                return
            }

            const matchedSpaceIndex = _.findIndex(shuffledBingoSpaceOptions, space => {
                return space.category === category.name
            });

            if (matchedSpaceIndex > -1) {
                newlyArrangedBingoSpaces[i] = shuffledBingoSpaceOptions[matchedSpaceIndex];
                // center logic
                if (i === CENTER_INDEX) {
                    newlyArrangedBingoSpaces[i].isCenter = true;
                }
                shuffledBingoSpaceOptions.splice(matchedSpaceIndex, 1)
            } else {
                newlyArrangedBingoSpaces[i] = undefined;
            }
        })

        // Add freestyle default values to state to be editable but persisted through shuffles

        // Fill in undefined with random space
        newlyArrangedBingoSpaces = newlyArrangedBingoSpaces.map((space, i) => {
            if (space) {
                return space
            } else {
                return shuffledBingoSpaceOptions.pop()
            }
        })

        // let newlyArrangedBingoSpaces = _.sampleSize(this.bingoChallengeSpaces, BINGO_CARD_SIZE)

        this.setState({
            arrangedBingoSpaces: newlyArrangedBingoSpaces,
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

    pinBingoSpace(i) {
        this.setState(state => {
            let { pinnedBingoSpaceIndexes } = state;

            pinnedBingoSpaceIndexes.push(i)

            return {
                ...state,
                pinnedBingoSpaceIndexes
            }
        })
    }

    unpinBingoSpace(i) {
        this.setState(state => {
            let { pinnedBingoSpaceIndexes } = state;

            pinnedBingoSpaceIndexes = pinnedBingoSpaceIndexes.filter(index => index !== i)

            return {
                ...state,
                pinnedBingoSpaceIndexes
            }
        })
    }

    banBingoSpace(i) {
        this.setState(state => {
            let { bannedBingoSpaces, arrangedBingoSpaces } = state;
            let bannedBingoSpace = arrangedBingoSpaces[i];
            let { category } = bannedBingoSpace;

            let cleanBingoSpaces = _.cloneDeep(this.bingoChallengeSpaces);

            let bingoSpacesWithoutBannedSpaces = cleanBingoSpaces.filter((cleanSpace) => {
                // remove current space
                if (cleanSpace.task === bannedBingoSpace.task) {
                    return false
                }
                return !bannedBingoSpaces.find(bannedSpace => bannedSpace.task === cleanSpace.task)
            })

            // try to find a space with the same category and is not currently on the board
            let newBingoSpace = bingoSpacesWithoutBannedSpaces.find(space => {
                return space.category === category
                        && bingoSpacesWithoutBannedSpaces.find(currentlyPlacedSpace => currentlyPlacedSpace.task !== space.task)
            })

            // if no space with the same category, get a random one
            if (!newBingoSpace) {
                newBingoSpace = bingoSpacesWithoutBannedSpaces[_.random(0, bingoSpacesWithoutBannedSpaces - 1)]
            }

            arrangedBingoSpaces[i] = newBingoSpace
            bannedBingoSpaces.push(bannedBingoSpace);

            return {
                ...state,
                arrangedBingoSpaces,
                bannedBingoSpaces,
                maxBingoSpacesBanned: bingoSpacesWithoutBannedSpaces.length < BINGO_SPACE_COUNT + 1
            }
        })
    }

    unbanSpace(i) {
        this.setState(state => {
            let { bannedBingoSpaces } = state;

            bannedBingoSpaces.splice(i, 1)

            return {
                ...state,
                bannedBingoSpaces,
                maxBingoSpacesBanned: bannedBingoSpaces.length > BINGO_SPACE_COUNT + 1
            }
        })

    }

    clearBannedSpaces() {
        this.setState(state => {
            return {
                ...state,
                bannedBingoSpaces: [],
                maxBingoSpacesBanned: false
            }
        })
    }

    EditTask() {
        return <div className="form-group">
            <textarea
                    className="form-control"
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
            {space.isCenter ?
                    <header className="label no-print" onClick={() => this.toggleEditable()}>
                    {this.state.isEditingFreestyleTask
                                        ? <button type="button"
                                                  className="far fa-save btn btn-success btn-sm">
                                        </button>
                                        : <button type="button"
                                                  className="far fa-edit btn btn-warning btn-sm">
                                        </button>
                        }
                </header>
            : <header className={"pin-and-ban"}>
                            <span className="pin">
                                {this.state.pinnedBingoSpaceIndexes.includes(i)
                                        ? <span className="fa-stack" style={{ verticalAlign: 'top' }}
                                        onClick={() => this.unpinBingoSpace(i)}>
                                            <i className="fas fa-circle fa-stack-2x"/>
                                            <i className="fas fas fa-thumbtack fa-stack-1x fa-inverse"/>
                                        </span>
                                        : <span className="fa-stack text-muted" style={{ verticalAlign: 'top' }}
                                                onClick={() => this.pinBingoSpace(i)}>
                                            <i className="far fa-circle fa-stack-2x"/>
                                            <i className="fas fas fa-thumbtack fa-stack-1x "/>


                                        </span>}
                            </span>
                        {!this.state.maxBingoSpacesBanned && <span className="ban">
                                    <span className="fas fa-ban text-danger"
                                          onClick={() => this.banBingoSpace(i)}/>
                            </span>
                        }
                        </header>
            }
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
        const {arrangedBingoSpaces, bannedBingoSpaces } = this.state;


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
            <div className="board mb-4">
                {arrangedBingoSpaces.map((space, i) => this.Space(space, i))}
            </div>
            {bannedBingoSpaces.length > 0 && <div className="banned-spaces">
                <h3 className="banned-spaces__title mb-3">Banned Spaces
                    <span className="ml-2 fas fa-ban text-danger"/>
                    <button className="btn btn-success float-right" onClick={() => this.clearBannedSpaces()}>Unban All</button>
                </h3>

                <Row className="justify-content-md-center">
                    {bannedBingoSpaces.map((space, i) =>
                            <Col sm={3} className="banned-space text-center">
                                <div className="card">
                                    <div className="card-body">
                                        {space.task}
                                        <button className="mt-2 btn btn-success fas fa-plus-circle w-100"
                                              onClick={() => this.unbanSpace(i)}
                                        />
                                    </div>
                                </div>
                            </Col>
                    )}
                </Row>
            </div>}
        </>
    }
}

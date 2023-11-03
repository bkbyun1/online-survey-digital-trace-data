import React from "react";
import "./App.css";
import Divider from "@material-ui/core/Divider";
import ModalReact from "react-modal";
import firebase from "./firebase";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default class Resume extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//all tracking outputs
			educationOpenedCount: 0,
			workexpOpenedCount: 0,
			notesOpenedCount: 0,

			x: 0,
			y: 0,

			modalOpened: false,
			enterID: "",

			educationSectionOpened: false,
			workSectionOpened: false,

			city: "",

			initialNotes: "",
			degree: "",
			distinction: "",
			duration: "",
			major: "",
			university: "",

			parenthood: true,
			education: 0,
			work1: 0,
			work2: 0,
			remote: true,

			//upvote + downvote + question mark
			education_up: false,
			education_q: false,
			education_down: false,

			work1_up: false,
			work1_q: false,
			work1_down: false,

			work2_up: false,
			work2_q: false,
			work2_down: false,

			work3_up: false,
			work3_q: false,
			work3_down: false,

			notes_up: false,
			notes_q: false,
			notes_down: false,

			bulletList: [],
			remoteNotesText: "",
		};
		this.collapsibleOpened = this.collapsibleOpened.bind(this);
		this.submitUserID = this.submitUserID.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.voteClick = this.voteClick.bind(this);
		this.renderBulletList = this.renderBulletList.bind(this);
		this.positionList = [];
		this.mouseCounter = 0;
		this.activityCounter = 1;
		this.IDlist = [
			"sheep",
			"koala",
			"whale",
			"dolphin",
			"panda",
			"snake",
			"bear",
			"lion",
			"tiger",
			"celery",
			"carrot",
			"pizza",
			"salad",
			"chicken",
			"burger",
			"rice",
			"eggs",
			"soup",
			"green",
			"blue",
			"purple",
			"red",
			"orange",
			"yellow",
			"silver",
			"olive",
			"pink",
			"gold",
			"shirt",
			"pants",
			"tree",
			"smoke",
			"planet",
			"pencil",
			"pen",
			"cookie",
			"cake",
			"tire",
			"phone",
			"plant",
			"north",
			"east",
			"south",
			"west",
			"right",
			"left",
			"canyon",
			"mountain",
			"park",
			"field",
			"snow",
			"rain",
			"beach",
			"ocean",
			"wind",
			"storm",
			"thunder",
			"hill",
			"road",
			"traffic",
			"cliff",
			"waves",
			"shell",
			"island",
			"sand",
			"umbrella",
			"swim",
			"climb",
			"dive",
			"surf",

			"hike",
			"run",
			"walk",
			"bike",
			"canoe",
			"boat",
			"ice",
			"air",
			"river",
			"pond",
			"lake",
			"stream",
			"canal",
			"street",
			"coffee",
			"tea",
			"soda",
			"lunch",
			"dinner",
			"snack",
			"eat",
			"drink",
			"sleep",
			"wake",
			"jump",
			"fall",
			"alaska",
			"florida",
			"idaho",
			"ohio",
		];
	}

	componentDidMount() {
		console.log("study: " + this.props.studyVersion);
		firebase.firestore();

		this.setState({ studyVersion: this.props.studyVersion });

		console.log("resume: " + this.props.resumeVersion);
		this.setState({ resumeVersion: this.props.resumeVersion }, () => {
			if (this.state.resumeVersion === 1) {
				this.generateUniqueID();
			} else {
				this.setState({ modalOpened: true });
			}
		});
	}

	componentWillUnmount() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	}

	//called from generateUniqueID function (so only called for resume 1)
	selectValues() {
		const db = firebase.firestore();

		//get city
		db.collection("resume")
			.doc("study2_location")
			.get()
			.then((doc) => {
				this.setState({ city: doc.data().city });
			});

		//select remote text for initial notes section (if study 2)
		let remote_notes = Math.random();
		if (remote_notes < 0.5) {
			db.collection("resume")
				.doc("notes from initial phone screen")
				.get()
				.then((doc) => {
					this.setState({ remoteNotesText: doc.data().remote_text_1 });
					remote_notes = 1;
				});
		} else {
			db.collection("resume")
				.doc("notes from initial phone screen")
				.get()
				.then((doc) => {
					this.setState({ remoteNotesText: doc.data().remote_text_2 });
					remote_notes = 2;
				});
		}

		//select gender
		let gender = Math.random();
		if (gender < 0.5) {
			this.setState({ gender_icon: "male_user" });
			gender = "man";
		} else {
			this.setState({ gender_icon: "female_user" });
			gender = "woman";
		}

		//select parenthood
		let parenthood = Math.random();
		if (parenthood < 0.5) {
			this.setState({ parenthood: true }, () => {
				db.collection("resume")
					.doc("notes from initial phone screen")
					.get()
					.then((doc) => {
						let temp = doc.data().parent.toString();
						if (gender === "man") {
							temp = temp.replace("[pronoun]", "his");
						} else {
							temp = temp.replace("[pronoun]", "her");
						}
						var split = temp.split(".");
						this.setState({ bulletList: split });
					});
			});
			parenthood = true;
		} else {
			this.setState({ parenthood: false }, () => {
				db.collection("resume")
					.doc("notes from initial phone screen")
					.get()
					.then((doc) => {
						let temp = doc.data().nonparent.toString();
						if (gender === "man") {
							temp = temp.replace("[pronoun]", "his");
						} else {
							temp = temp.replace("[pronoun]", "her");
						}
						var split = temp.split(".");
						this.setState({ bulletList: split });
					});
			});
			parenthood = false;
		}

		//select education
		let education = Math.random();
		if (education < 0.5) {
			this.setState({ education: 0 }, () => {
				db.collection("resume")
					.doc("education a")
					.get()
					.then((doc) => {
						this.setState({ degree: doc.data().degree });
						this.setState({ distinction: doc.data().distinction });
						this.setState({ duration: doc.data().duration });
						this.setState({ major: doc.data().major });
						this.setState({ university: doc.data().university });
					});
			});
			education = "a";
		} else {
			this.setState({ education: 1 }, () => {
				db.collection("resume")
					.doc("education b")
					.get()
					.then((doc) => {
						this.setState({ degree: doc.data().degree });
						this.setState({ distinction: doc.data().distinction });
						this.setState({ duration: doc.data().duration });
						this.setState({ major: doc.data().major });
						this.setState({ university: doc.data().university });
					});
			});
			education = "b";
		}

		//select work experience 1
		let work1 = Math.random();
		if (work1 < 0.5) {
			this.setState({ work1: 0 }, () => {
				db.collection("resume")
					.doc("work box 1a")
					.get()
					.then((doc) => {
						this.positionList.push(doc);
					});
			});
			work1 = "a";
		} else {
			this.setState({ work1: 1 }, () => {
				db.collection("resume")
					.doc("work box 1b")
					.get()
					.then((doc) => {
						this.positionList.push(doc);
					});
			});
			work1 = "b";
		}

		//select work experience 2
		let work2 = Math.random();
		if (work2 < 0.5) {
			this.setState({ work2: 0 }, () => {
				db.collection("resume")
					.doc("work box 2a")
					.get()
					.then((doc) => {
						this.positionList.push(doc);
					});
			});
			work2 = "a";
		} else {
			this.setState({ work2: 1 }, () => {
				db.collection("resume")
					.doc("work box 2b")
					.get()
					.then((doc) => {
						this.positionList.push(doc);
					});
			});
			work2 = "b";
		}

		//JUST FOR STUDY 2:
		//select remote or not remote
		let remote = Math.random();
		if (this.state.studyVersion === 2) {
			if (remote < 0.5) {
				this.setState({ remote: true });
				remote = true;
			} else {
				this.setState({ remote: false });
				remote = false;
			}
		} else {
			remote = null;
		}

		//initialize resume 1 values
		db.collection("userIDs")
			.doc(this.state.currentUserID)
			.collection("values shown")
			.doc("resume 1")
			.set({
				gender: gender,
				parenthood: parenthood,
				education: education,
				work1: work1,
				work2: work2,
				remote: remote,
				remoteNotesText: remote_notes,
			});
	}

	populateValues() {
		const db = firebase.firestore();

		//get city
		db.collection("resume")
			.doc("study2_location")
			.get()
			.then((doc) => {
				this.setState({ city: doc.data().city });
			});

		db.collection("userIDs")
			.doc(this.state.currentUserID)
			.collection("values shown")
			.doc("resume 1")
			.get()
			.then((doc) => {
				let gender = null;
				let parenthood = null;
				let education = null;
				let work1 = null;
				let work2 = null;
				let work3 = null;
				let remote = null;

				//gender - show the same
				if (doc.data().remoteNotesText === 1) {
					db.collection("resume")
						.doc("notes from initial phone screen")
						.get()
						.then((doc) => {
							this.setState({ remoteNotesText: doc.data().remote_text_1 });
						});
				} else {
					db.collection("resume")
						.doc("notes from initial phone screen")
						.get()
						.then((doc) => {
							this.setState({ remoteNotesText: doc.data().remote_text_1 });
						});
				}

				//remote notes text
				if (doc.data().gender === "man") {
					this.setState({ gender_icon: "man" });
					gender = "man";
				} else {
					this.setState({ gender_icon: "woman" });
					gender = "woman";
				}

				//parenthood - show the opposite
				if (doc.data().parenthood === true) {
					console.log("TRUE");
					db.collection("resume")
						.doc("notes from initial phone screen")
						.get()
						.then((doc) => {
							let temp = doc.data().nonparent.toString();
							if (gender === "man") {
								temp = temp.replace("[pronoun]", "his");
							} else {
								temp = temp.replace("[pronoun]", "her");
							}
							var split = temp.split(".");
							this.setState({ bulletList: split });

							//this.setState({initialNotes: doc.data().nonparent})
						});
					parenthood = false;
				} else {
					console.log("FALSE");
					db.collection("resume")
						.doc("notes from initial phone screen")
						.get()
						.then((doc) => {
							let temp = doc.data().parent.toString();
							if (gender === "man") {
								temp = temp.replace("[pronoun]", "his");
							} else {
								temp = temp.replace("[pronoun]", "her");
							}
							var split = temp.split(".");
							this.setState({ bulletList: split });

							//this.setState({initialNotes: doc.data().parent})
						});
					parenthood = true;
				}

				//education - show the opposite
				if (doc.data().education === "a") {
					db.collection("resume")
						.doc("education b")
						.get()
						.then((doc) => {
							this.setState({ degree: doc.data().degree });
							this.setState({ distinction: doc.data().distinction });
							this.setState({ duration: doc.data().duration });
							this.setState({ major: doc.data().major });
							this.setState({ university: doc.data().university });
						});
					education = "b";
				} else {
					db.collection("resume")
						.doc("education a")
						.get()
						.then((doc) => {
							this.setState({ degree: doc.data().degree });
							this.setState({ distinction: doc.data().distinction });
							this.setState({ duration: doc.data().duration });
							this.setState({ major: doc.data().major });
							this.setState({ university: doc.data().university });
						});
					education = "a";
				}

				//work1 - show the opposite
				if (doc.data().work1 === "a") {
					db.collection("resume")
						.doc("work box 1b")
						.get()
						.then((doc) => {
							this.positionList.push(doc);
						});
					work1 = "b";
				} else {
					db.collection("resume")
						.doc("work box 1a")
						.get()
						.then((doc) => {
							this.positionList.push(doc);
						});
					work1 = "a";
				}

				//work2 - show the opposite
				if (doc.data().work2 === "a") {
					db.collection("resume")
						.doc("work box 2b")
						.get()
						.then((doc) => {
							this.positionList.push(doc);
						});
					work2 = "b";
				} else {
					db.collection("resume")
						.doc("work box 2a")
						.get()
						.then((doc) => {
							this.positionList.push(doc);
						});
					work2 = "a";
				}

				//remote - show the opposite (JUST FOR STUDY 2)
				if (this.state.studyVersion === 2) {
					if (doc.data().remote === true) {
						this.setState({ remote: false });
						remote = false;
					} else {
						this.setState({ remote: true });
						remote = true;
					}
				}

				//initialize resume 2 values
				db.collection("userIDs")
					.doc(this.state.currentUserID)
					.collection("values shown")
					.doc("resume 2")
					.set({
						gender: gender,
						parenthood: parenthood,
						education: education,
						work1: work1,
						work2: work2,
						work3: work3,
						remote: remote,
					});
			});
	}

	generateUniqueID = () => {
		var rand = Math.floor(Math.random() * 100) + 1;
		let r = Math.floor((Math.random() * 100 + 1) % this.IDlist.length);
		if (r < 10 || r > this.IDlist.length) {
			//TODO: is this correct?
			this.generateUniqueID();
			return;
		}
		let userID = this.IDlist[r] + "" + rand;
		console.log("user ID: " + userID);

		//check database to make sure it hasnt already been generated
		const db = firebase.firestore();
		const idRef = db
			.collection("studies")
			.doc("study " + this.state.studyVersion)
			.collection("userIDs")
			.doc(userID);
		idRef.get().then((docSnapshot) => {
			if (docSnapshot.exists) {
				idRef.onSnapshot((doc) => {
					//console.log("ALREADY EXISTS")
					this.generateUniqueID();
				});
			} else {
				//console.log("DOES NOT EXIST")

				//add userID to database
				db.collection("studies")
					.doc("study " + this.state.studyVersion)
					.collection("userIDs")
					.doc(userID)
					.set({
						//initialized: true,
					});

				//display ID to user
				this.setState({ currentUserID: userID }, () => {
					this.selectValues();
					db.collection("settings")
						.doc("mouse tracking")
						.get()
						.then((doc) => {
							this.timer = setInterval(
								this.updateMouseCSV,
								doc.data().interval
							);
						});
				});
			}
		});
	};

	renderBulletList = () => {
		if (this.state.bulletList.length > 0) {
			let viewBulletList = [];
			this.state.bulletList.forEach((item, index) => {
				if (item !== " " && item !== "" && item !== null) {
					viewBulletList.push(<li key={index}>{item}</li>);
				}
			});
			return viewBulletList;
		} else {
			return null;
		}
	};

	renderPositionList = () => {
		if (this.positionList.length > 0) {
			let viewPositionList = [];
			this.positionList.forEach((item, index) => {
				viewPositionList.push(
					<div key={index}>
						<div className="votingblock">
							<div id="vertical">
								<img
									name={"work" + (index + 1) + "_up"}
									src={
										this.state["work" + (index + 1) + "_up"]
											? imageToURL("upvote_selected")
											: imageToURL("upvote")
									}
									onClick={this.voteClick}
									alt="upvote"
								/>
								<img
									name={"work" + (index + 1) + "_q"}
									src={
										this.state["work" + (index + 1) + "_q"]
											? imageToURL("circle_selected")
											: imageToURL("circle")
									}
									onClick={this.voteClick}
									alt="question mark"
								/>
								<img
									name={"work" + (index + 1) + "_down"}
									src={
										this.state["work" + (index + 1) + "_down"]
											? imageToURL("downvote_selected")
											: imageToURL("downvote")
									}
									onClick={this.voteClick}
									alt="downvote"
								/>
							</div>
							<div id="subtext">
								{" "}
								{item.data().title}
								<div id="horizontal">
									<div id="subinfo">{item.data().company}</div>

									{/*remote && study version 2*/}
									{this.state.studyVersion === 2 &&
										this.state.remote &&
										index === 0 && (
											<div id="subinfo">
												<i>Remote</i>
											</div>
										)}
									{this.state.studyVersion === 2 &&
										!this.state.remote &&
										index === 0 && (
											<div id="subinfo">
												<i>{this.state.city}</i>
											</div>
										)}
									{this.state.studyVersion === 2 && index !== 0 && (
										<div id="subinfo">
											<i>{this.state.city}</i>
										</div>
									)}
								</div>
								<div id="subinfogray">{item.data().duration}</div>
								<div id="subinfo">{item.data().description}</div>
							</div>
						</div>
						<Divider />
					</div>
				);
			});
			return viewPositionList;
		} else {
			return null;
		}
	};

	collapsibleOpened(e) {
		const db = firebase.firestore();

		this.activityCounter = this.activityCounter + 1;
		let count = this.activityCounter.toString();
		let description = "";

		var options = { hour12: false };
		let time = new Date().toLocaleString("en-US", options);
		//let newObj = []
		if (e === 0) {
			//console.log(time + " education");
			this.setState((prevState) => {
				return { educationOpenedCount: prevState.educationOpenedCount + 1 };
			});
			description = "opened education section";
			//newObj = [time, "opened education section"]
		} else if (e === 1) {
			//console.log(time + " work");
			this.setState((prevState) => {
				return { workexpOpenedCount: prevState.workexpOpenedCount + 1 };
			});
			description = "opened work section";
			//newObj = [time, "opened work section"]
		}
		//console.log(newObj)
		//this.setState({activityData: [...this.state.activityData, newObj]})

		db.collection("studies")
			.doc("study " + this.state.studyVersion)
			.collection("userIDs")
			.doc(this.state.currentUserID)
			.collection("activityData_resume" + this.state.resumeVersion.toString())
			.doc(count)
			.set({
				time: time,
				description: description,
			});
	}

	submitUserID() {
		if (this.state.enterID === null || this.state.enterID === "") {
			this.setState({ errorMessage: true });
			return;
		}

		let userID = this.state.enterID.replace(/[.,/#!$%^&*;:{}=\-_'`~()]/g, "");
		userID = userID.replace(/\s{2,}/g, " ");
		userID = userID.replace(/\s/g, "");
		//console.log("USER ID:" + userID + "hello")

		//read database to see if this ID exists
		const db = firebase.firestore();
		const idRef = db
			.collection("studies")
			.doc("study " + this.state.studyVersion)
			.collection("userIDs")
			.doc(userID);
		idRef.get().then((docSnapshot) => {
			if (docSnapshot.exists) {
				idRef.onSnapshot((doc) => {
					console.log("VALID: THIS DOES EXIST");
					this.setState({ errorMessage: false });
					this.setState({ currentUserID: userID }, () => {
						this.populateValues();
						db.collection("settings")
							.doc("mouse tracking")
							.get()
							.then((doc) => {
								this.timer = setInterval(
									this.updateMouseCSV,
									doc.data().interval
								);
							});
						this.setState({ modalOpened: false });
					});
				});
			} else {
				console.log("INVALID: DOES NOT EXIST");

				//prompt them to re-enter
				this.setState({ errorMessage: true });
			}
		});
	}

	handleChange(event) {
		this.setState({ enterID: event.target.value });
	}

	voteClick(event) {
		const db = firebase.firestore();

		this.activityCounter = this.activityCounter + 1;
		let count = this.activityCounter.toString();

		var options = { hour12: false };
		let time = new Date().toLocaleString("en-US", options);

		this.setState(
			{ [event.target.name]: !this.state[event.target.name] },
			() => {
				if (this.state[event.target.name]) {
					db.collection("studies")
						.doc("study " + this.state.studyVersion)
						.collection("userIDs")
						.doc(this.state.currentUserID)
						.collection(
							"activityData_resume" + this.state.resumeVersion.toString()
						)
						.doc(count)
						.set({
							time: time,
							description: "clicked " + event.target.name + " button",
						});

					//unclick the others in the same box
					if (event.target.name === "work1_up") {
						this.setState({ work1_down: false, work1_q: false });
					} else if (event.target.name === "work2_up") {
						this.setState({ work2_down: false, work2_q: false });
					} else if (event.target.name === "work3_up") {
						this.setState({ work3_down: false, work3_q: false });
					} else if (event.target.name === "work1_down") {
						this.setState({ work1_up: false, work1_q: false });
					} else if (event.target.name === "work2_down") {
						this.setState({ work2_up: false, work2_q: false });
					} else if (event.target.name === "work3_down") {
						this.setState({ work3_up: false, work3_q: false });
					} else if (event.target.name === "work1_q") {
						this.setState({ work1_up: false, work1_down: false });
					} else if (event.target.name === "work2_q") {
						this.setState({ work2_up: false, work2_down: false });
					} else if (event.target.name === "work3_q") {
						this.setState({ work3_up: false, work3_down: false });
					} else if (event.target.name === "education_down") {
						this.setState({ education_up: false, education_q: false });
					} else if (event.target.name === "education_up") {
						this.setState({ education_down: false, education_q: false });
					} else if (event.target.name === "education_q") {
						this.setState({ education_up: false, education_down: false });
					} else if (event.target.name === "notes_down") {
						this.setState({ notes_up: false, notes_q: false });
					} else if (event.target.name === "notes_up") {
						this.setState({ notes_down: false, notes_q: false });
					} else if (event.target.name === "notes_q") {
						this.setState({ notes_up: false, notes_down: false });
					}
				} else {
					db.collection("studies")
						.doc("study " + this.state.studyVersion)
						.collection("userIDs")
						.doc(this.state.currentUserID)
						.collection(
							"activityData_resume" + this.state.resumeVersion.toString()
						)
						.doc(count)
						.set({
							time: time,
							description: "unclicked " + event.target.name + " button",
						});
				}
			}
		);
	}

	render() {
		return (
			<div className="overall">
				<div className="App">
					<div className="resume">
						<ModalReact className="modal_dtp" isOpen={this.state.modalOpened}>
							<div>enter code: </div>
							<input
								onChange={this.handleChange.bind(this)}
								value={this.state.enterID}
							/>
							<button onClick={() => this.submitUserID()}> Submit </button>
							{this.state.errorMessage && (
								<div id="red">Invalid ID. Please re-enter.</div>
							)}
						</ModalReact>

						{!this.state.modalOpened && (
							<div>
								<img
									className="profile_image"
									src={imageToURL(this.state.gender_icon)}
									alt="a man"
								/>
								<div className="header">
									Candidate {this.state.resumeVersion === 1 ? "A" : "B"}
								</div>

								<div className="votingblock_notes">
									<VotingButtons
										state={this.state}
										onClick={this.voteClick}
										sectionName="education"
									/>
									<div className="notes">
										Notes from Initial Phone Screen:
										<span id="subtext_bullet">
											<ul>
												{this.state.studyVersion === 2 && this.state.remote && (
													<li>{this.state.remoteNotesText}</li>
												)}
												{this.renderBulletList()}
											</ul>
										</span>
										{/*<span id="subtext"> {this.state.initialNotes} {this.state.studyVersion === 2 && this.state.remote && " + working remotely"}</span>*/}
									</div>
								</div>

								<Accordion>
									<Card>
										<Card.Header
											style={{
												background: "white",
												paddingLeft: 0,
												paddingRight: 0,
											}}
										>
											<Accordion.Toggle
												as={Button}
												style={{
													color: "black",
													width: "100%",
													display: "flex",
													flexDirection: "row",
													justifyContent: "space-between",
													fontSize: "18px",
													alignItems: "center",
												}}
												variant="link"
												eventKey="0"
												onClick={() =>
													this.setState(
														{
															educationSectionOpened:
																!this.state.educationSectionOpened,
														},
														() => {
															this.collapsibleOpened(0);
															if (this.state.educationSectionOpened) {
																this.setState({ workSectionOpened: false });
															}
														}
													)
												}
											>
												Education{" "}
												<img
													id="toggle_icon"
													src={
														this.state.educationSectionOpened
															? imageToURL("minus_icon")
															: imageToURL("plus_icon")
													}
													alt="toggle icon"
												/>
											</Accordion.Toggle>
										</Card.Header>
										<Accordion.Collapse eventKey="0">
											<Card.Body>
												<div className="votingblock">
													<div id="vertical">
														<img
															name="education_up"
															src={
																this.state.education_up
																	? imageToURL("upvote_selected")
																	: imageToURL("upvote")
															}
															onClick={this.voteClick}
															alt="upvote"
														/>
														<img
															name="education_q"
															src={
																this.state.education_q
																	? imageToURL("circle_selected")
																	: imageToURL("circle")
															}
															onClick={this.voteClick}
															alt="question mark"
														/>
														<img
															name="education_down"
															src={
																this.state.education_down
																	? imageToURL("downvote_selected")
																	: imageToURL("downvote")
															}
															onClick={this.voteClick}
															alt="downvote"
														/>
													</div>
													<div id="subtext">
														{this.state.university}
														<div id="subinfo">
															{this.state.degree}, {this.state.major}
														</div>
														<div id="subinfogray">{this.state.duration}</div>
													</div>
												</div>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
										<Card.Header
											style={{
												background: "white",
												paddingLeft: 0,
												paddingRight: 0,
												borderTop: "1px solid black",
											}}
										>
											<Accordion.Toggle
												as={Button}
												style={{
													color: "black",
													width: "100%",
													display: "flex",
													flexDirection: "row",
													justifyContent: "space-between",
													fontSize: "18px",
													alignItems: "center",
												}}
												variant="link"
												eventKey="1"
												onClick={() =>
													this.setState(
														{
															workSectionOpened: !this.state.workSectionOpened,
														},
														() => {
															this.collapsibleOpened(1);
															if (this.state.workSectionOpened) {
																this.setState({
																	educationSectionOpened: false,
																});
															}
														}
													)
												}
											>
												Work Experience{" "}
												<img
													id="toggle_icon"
													src={
														this.state.workSectionOpened
															? imageToURL("minus_icon")
															: imageToURL("plus_icon")
													}
													alt="toggle icon"
												/>
											</Accordion.Toggle>
										</Card.Header>
										<Accordion.Collapse eventKey="1">
											<Card.Body>{this.renderPositionList()}</Card.Body>
										</Accordion.Collapse>
									</Card>
								</Accordion>
							</div>
						)}
					</div>
				</div>
				{this.state.resumeVersion === 1 && (
					<div className="userID">
						<strong>{this.state.currentUserID}</strong>
					</div>
				)}
			</div>
		);
	}
}

/**
 * Turns an image name into the src, relative to /public/images. Image should be a png.
 */
function imageToURL(imageName) {
	return `${process.env.PUBLIC_URL}/images/${imageName}.png`;
}

/**
 * Component: upvote, circle, and downvote, in traffic light colors.
 */
const VotingButtons = ({ state, clickFunction, sectionName }) => {
	return (
		<div className="vertical">
			<img
				name={`${sectionName}_up`}
				src={
					state[`${sectionName}_up`]
						? imageToURL("upvote_selected")
						: imageToURL("upvote")
				}
				onClick={clickFunction}
				alt="upvote"
			/>

			<img
				name={`${sectionName}_q`}
				src={
					state[`${sectionName}_q`]
						? imageToURL("circle_selected")
						: imageToURL("circle")
				}
				onClick={clickFunction}
				alt="question mark"
			/>

			<img
				name={`${sectionName}_down`}
				src={
					state[`${sectionName}_down`]
						? imageToURL("downvote_selected")
						: imageToURL("downvote")
				}
				onClick={clickFunction}
				alt="downvote"
			/>
		</div>
	);
};

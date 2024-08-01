import React from "react";
import "./App.css";
import Divider from "@material-ui/core/Divider";
import firebase from "./firebase";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import VotingBlock from "./VotingBlock";

/*
  This is the main component for the resume page. It displays a resume with various sections that can be toggled open and closed.
  All of the randomization and pre-processing of the Firebase values is done here.
*/

export default class Resume extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			positionList: [],
		};

		// Add props to "this"
		this.recordActivity = this.props.recordActivity;

		const db = firebase.firestore();
		this.db = db; /*connects to firestore db, saves connection to this.db*/
		this.USER_DATA = db
			.collection("responseIDs") /*BK: likely need to change this part, responseID is not unique identifier bc read several apps*/
			.doc(this.props.qualtricsUserId);
		this.RESUME_CONTENT = db.collection("resume");
		this.APPLICANTS = db.collection("Applicants");

		this.collapsibleOpened = this.collapsibleToggled.bind(this);
	}

	componentDidMount() {
		this.setState({
			studyVersion: this.props.studyVersion,
			resumeVersion: this.props.resumeVersion,
			permanentAddress: "13 Hope Avenue, Anytown, MI",
			gender: "Male",
			citizenshipStatus: "U.S. citizen or U.S. National",
			hispanicStatus: "No",
			racialIdentity: "White",
			fathersEducation: "High school diploma",
			mothersEducation: "Associate's degree",
			/*secondarySchool: "Anytown High School",*/
			unweightedGPA: 3.95,
			weightedGPA: 4.34,
			honorsAPClasses: 13,
			courses: [
				{ name: "Statistics", firstSemester: "Full year / first semester", secondSemester: "n/a", thirdTrimester: "n/a" },
				{ name: "AP English Literature", firstSemester: "Full year / first semester", secondSemester: "n/a", thirdTrimester: "n/a" },
				{ name: "AP Chemistry", firstSemester: "Full year / first semester", secondSemester: "n/a", thirdTrimester: "n/a" },
				{ name: "AP US History", firstSemester: "Full year / first semester", secondSemester: "n/a", thirdTrimester: "n/a" },
				{ name: "Spanish 6", firstSemester: "Full year / first semester", secondSemester: "n/a", thirdTrimester: "n/a" }
			  ],
			  SAT: {
				readingWriting: 690,
				math: 780
			  },
			  AP: {
				biology: 5,
				englishLanguage: 4
			  }
		}, () => {
			this.parseCandidateData(() => {
				if (this.state.resumeVersion === 1) {
					this.getResume1Values(this.displayValues);
				} else {
					this.getResume2Values(this.displayValues);
				}
			});
		});
	}


	/** The first resume has randomly-decided values. Decide them and put into state. */
	getResume1Values(callback) {
		// Select gender
		const isMan = Math.random() < 0.5;

		let applicant = this.state.applicants[this.state.studyVersion - 1];
		let name = applicant.legal_name;

		// Select parenthood
		const isParent = Math.random() < 0.5;

		// Select education
		// Could be more than two options in the future
		const education = Math.random() < 0.5 ? "a" : "b";

		// Could be more than two options in the future
		const work1 = Math.random() < 0.5 ? "a" : "b";
		const work2 = Math.random() < 0.5 ? "a" : "b";

		// Store resume 1 values in state
		this.setState(
			{
				isMan: isMan,
				isParent: isParent,
				education: education,
				work1: work1,
				work2: work2,
				name: applicant.legal_name,
				college: applicant.college,
				major: applicant.major,
				school_name: applicant.school_name,
				state: applicant.state,
			},
			// Now that info is in state, call the callback
			callback
		);

		// Create document for this user
		this.USER_DATA.set({});

		// Store resume 1 values in the database
		this.USER_DATA.collection("values shown").doc("resume 1").set({
			isMan: isMan,
			isParent: isParent,
			education: education,
			work1: work1,
			work2: work2,
			name: name,
		});
	}

	/** The second resume has the opposite values to the first. Calculate them and put into state. */
	getResume2Values(callback) {
		// Get the values shown to this user for resume 1
		this.USER_DATA.collection("values shown")
			.doc("resume 1")
			.get()
			.then((doc) => {
				const resume1values = doc.data();
				// Same gender
				const isMan = resume1values.isMan;

				// The other name
				const nameIndex = resume1values.nameIndex === 0 ? 1 : 0;
				const name = isMan
					? this.state.maleCandidates[nameIndex].name
					: this.state.femaleCandidates[nameIndex].name;

				// Opposite parenthood
				const isParent = !resume1values.isParent;

				// Opposite education
				// Could be more than two options in the future, which would need more logic
				const education = resume1values.education === "a" ? "b" : "a";

				// Opposite work history
				// Could be more than two options in the future, which would need more logic
				const work1 = resume1values.work1 === "a" ? "b" : "a";
				const work2 = resume1values.work2 === "a" ? "b" : "a";

				// Store resume 2 values in state
				this.setState(
					{
						isMan: isMan,
						isParent: isParent,
						education: education,
						work1: work1,
						work2: work2,
						name: name,
						nameIndex: nameIndex,
					},
					// Now that info is in state, call the callback
					callback
				);

				// Store resume 2 values in the database
				this.USER_DATA.collection("values shown").doc("resume 2").set({
					isMan: isMan,
					isParent: isParent,
					education: education,
					work1: work1,
					work2: work2,
					name: name,
					nameIndex: nameIndex,
				});
			});
	}

	/** Once we've decided the values, actually display them (based on state) */
	displayValues() {
		// Misc section
		this.RESUME_CONTENT.doc("misc")
			.get()
			.then((doc) => {
				let parenthoodText = null;
				// Based on parent/nonparent
				if (this.state.isParent) {
					parenthoodText = doc.data().nonparent.toString();
				} else {
					parenthoodText = doc.data().parent.toString();
				}

				// Put the text into a nicer format
				let split = parenthoodText
					// Split each sentence into a bullet point
					.split(".")
					// Clean up whitespace
					.map((str) => str.trim())
					// Remove any empty strings (by removing falsy values)
					.filter(Boolean);
				this.setState({ misc: split });
			});

		// Education
		this.RESUME_CONTENT.doc(`education ${this.state.education}`)
			.get()
			.then((doc) => {
				this.setState({ degree: doc.data().degree });
				this.setState({ duration: doc.data().duration });
				this.setState({ university: doc.data().university });
			});

		// Work experience
		this.RESUME_CONTENT.doc(`work box 1${this.state.work1}`)
			.get()
			.then((doc) => {
				this.addPositionToList(doc.data());
			});
		this.RESUME_CONTENT.doc(`work box 2${this.state.work1}`)
			.get()
			.then((doc) => {
				this.addPositionToList(doc.data());
			});
	}

	/** Called when a section is toggled open/closed */
	collapsibleToggled(eventKey) {
		if (eventKey === 0) {
			// Education Section
			this.recordActivity(
				"collapsibleToggled",
				"education",
				"toggled education section "
			);
		} else if (eventKey === 1) {
			// Work Section
			this.recordActivity(
				"collapsibleToggled",
				"work",
				"toggled work section "
			);
		} else if (eventKey === 2) {
			// Misc Section
			this.recordActivity(
				"collapsibleToggled",
				"misc",
				"toggled misc section "
			);
		}
	}

	/** Fetches the candidate data (name and gender) from the database and stores it in state */
	parseCandidateData(callbackFunc) {
		const applicantData = this.db.collection("Applicants");

		const applicants = [];

		applicantData
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					applicants.push(doc.data());
				});
			})
			.then(() => {
				// Set to state and call callback
				this.setState(
					{
						applicants: applicants,
					},
					callbackFunc
				);
			})
			.catch((error) => {
				console.error("Error getting candidates:", error);
			});
	}

	/** Helper function: search through the text and replace option placeholders based on gender */
	replaceGenderOptions(text) {
		// We expect all options to be in the format [maleOption/femaleOption]
		const matches = text.match(/\[(.*?)\/(.*?)\]/g);

		if (!matches) {
			return text;
		}

		matches.forEach((match) => {
			// Slice off the brackets and split the options
			const options = match.slice(1, -1).split("/");
			// Replace the placeholder with the appropriate option
			text = text.replace(match, this.state.isMan ? options[0] : options[1]);
		});

		return text;
	}

	/** Helper function: append a new position to the positionList */
	addPositionToList(newPosition) {
		this.setState((prevState) => ({
			positionList: [...prevState.positionList, newPosition],
		}));
	}

	/** Runs when the user moves the mouse */
	_onMouseMove(e) {
		// this.recordActivity("mouse", `(${e.clientX},${e.clientY})`, "moved mouse");
	}

	render() {
		// If our data hasn't loaded yet, show a loading screen
		if (
			!(
				this.state.positionList.length > 0 &&
				this.state.name
			)
		) {
			return <h1>Loading...</h1>;
		}

		return (
			<div className="overall">
				<div className="App" onMouseMove={this._onMouseMove.bind(this)}>
					<div className="resume">
						<div>
							<div className="header">
								<span style={{ fontWeight: "bold" }}>Applicant #1</span>: <span>Engineering Undeclared</span>
							</div>
							<div className="header" style={{ marginTop: '20px' }}>Student Information</div>
							<p className="content" style={{ fontWeight: "bold" }}>Personal Information</p>
							<p className="content">
								Legal name: {this.state.name}
							</p>
							<p className="content">Permanent home address: {this.state.permanentAddress}</p>
							<p className="content" style={{ marginTop: '12px', marginBottom: '12px' }}></p> {/*to insert slight line*/}
							<p className="content" style={{ fontWeight: "bold" }}>Demographics</p>
							<p className="content">Gender: {this.state.gender}</p>
							<p className="content">Citizenship status: {this.state.citizenshipStatus}</p>
							<p className="content">Hispanic/Latino/a/x: {this.state.hispanicStatus}</p>
							<p className="content">Racial identity: {this.state.racialIdentity}</p>
							<p className="content" style={{ marginTop: '12px', marginBottom: '12px' }}></p>
							<p className="content" style={{ fontWeight: "bold" }}>Family</p>
							<p className="content">Father’s education: {this.state.fathersEducation}</p>
							<p className="content">Mother’s education: {this.state.mothersEducation}</p>
						</div>
						<div className="section">
						<div className="header" style={{ marginTop: '20px' }}>Education</div>
						{/* confirm with Mike} <p className="content">Secondary/high school: {this.state.secondarySchool}</p> */}
						</div>
						<div className="section">
							{/* confirm with Mike} <div className="content" style={{ marginTop: '12px', fontWeight: "bold" }}>Grades</div> */}
							<div className="content" style={{ fontWeight: "bold" }}>Grades</div> 
							<p className="content">Cumulative GPA: {this.state.weightedGPA} (weighted)</p>
							{/* confirm with Mike}
							<p className="content">Unweighted GPA: {this.state.unweightedGPA}</p>
							<p className="content">Weighted GPA: {this.state.weightedGPA} (*calculated by adding .5 points for honors classes and 1 point for AP classes)</p>
							<p className="content">Honors/AP classes: {this.state.honorsAPClasses}</p> */}
						</div>
						<div className="section">
							<div className="content" style={{ marginTop: '12px', fontWeight: "bold" }}>Courses taken in current or most recent year</div>
							<p className="content">Statistics, AP English Literature, AP Chemistry, AP US History, Spanish 6</p>
							{/*
							<p className="content">AP English Literature</p>
							<p className="content">AP Chemistry</p>
							<p className="content">AP US History</p>
							<p className="content">Spanish 6</p>
							*/}
						</div>
						<div className="section">
							<div className="header" style={{ marginTop: '20px' }}>Testing</div>
							<p className="content" style={{ fontWeight: "bold" }}>SAT</p>
							<p className="content">Evidence-Based Reading and Writing: {this.state.SAT.readingWriting}</p>
							<p className="content">Mathematics: {this.state.SAT.math}</p>
							<p className="content" style={{ fontWeight: "bold" }}>AP</p>
							<p className="content">Biology: {this.state.AP.biology}</p>
							<p className="content">English Language: {this.state.AP.englishLanguage}</p>
						</div>
						<Accordion>
							{/* High School Profile Section */}
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
													hsprofileSectionOpened:
														!this.state.hsprofileSectionOpened,
												},
												() => {
													this.collapsibleToggled(0);
													if (this.state.hsprofileSectionOpened) {
														// Mark the other sections as closed
														this.setState({
															transcriptSectionOpened: false,
															activitiesSectionOpened: false,
															essaySectionOpened: false,
															miscSectionOpened: false,
														});
													}
												}
											)
										}
									>
										High School Profile{" "}
										<img
											id="toggle_icon"
											src={
												this.state.hsprofileSectionOpened
													? imageToURL("minus_icon")
													: imageToURL("plus_icon")
											}
											alt="toggle icon"
										/>
									</Accordion.Toggle>
								</Card.Header>

    							<Accordion.Collapse eventKey="0" style={{ marginTop: 0 }}>
									<Card.Body style={{ marginTop: 0, paddingTop: 0 }}>
										<div className="votingblock">
											<div id="subtext" style={{ marginTop: 0 }}>
												<p className="header" style={{ marginTop: 0 }}>School Overview</p>
												<p className="content">Name: {this.state.school_name}</p>
												<p className="content">State: {this.state.state}</p>
												<p className="content">Institutional control: Public</p>
												<p className="content">Number of students: 318</p>
												<p className="content">Graduation rate: 96%</p>
												<p className="content">College enrollment: 31% at 4-year schools, 15% at 2-year schools</p>
												<p className="content">Average ACT comp: 22</p>
												<p className="content">Average SAT CR+M: 1050</p>
												<p className="content">% free/reduced lunch: 67%</p>
												<p className="content">% limited English prof.: 5%</p>
												<p className="content"># AP courses offered: 5</p>
												<p className="content">% who get 3+ on APs: 27%</p>
												<p className="content" style={{ marginTop: '12px', marginBottom: '12px' }}></p> {/*to insert slight line*/}
												<p className="header">School Profile</p>
											</div>
										</div>
									</Card.Body>
								</Accordion.Collapse>
							</Card>

							{/* Work Section */}
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
													this.collapsibleToggled(1);
													if (this.state.workSectionOpened) {
														this.setState({
															// Mark the other sections as closed
															educationSectionOpened: false,
															miscSectionOpened: false,
														});
													}
												}
											)
										}
									>
										Work Experience
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

								{/* Position List */}
								<Accordion.Collapse eventKey="1">
									<Card.Body>
										<img src={imageToURL("tier1_app1")}></img>
									</Card.Body>
								</Accordion.Collapse>
							</Card>

							{/* Misc Section */}
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
										eventKey="2"
										onClick={() =>
											this.setState(
												{
													miscSectionOpened: !this.state.miscSectionOpened,
												},
												() => {
													this.collapsibleToggled(2);
													if (this.state.miscSectionOpened) {
														// Mark the other sections as closed
														this.setState({
															educationSectionOpened: false,
															workSectionOpened: false,
														});
													}
												}
											)
										}
									>
										Miscellaneous
										<img
											id="toggle_icon"
											src={
												this.state.miscSectionOpened
													? imageToURL("minus_icon")
													: imageToURL("plus_icon")
											}
											alt="toggle icon"
										/>
									</Accordion.Toggle>
								</Card.Header>

								<Accordion.Collapse eventKey="2">
									<Card.Body>
										<div className="votingblock">
											<VotingBlock
												sectionName="misc"
												recordActivity={this.recordActivity}
											/>
											<div className="notes">
												Other:
												<ul>
													{this.state.misc.map((item, index) => {
														return (
															<li key={index}>
																{this.replaceGenderOptions(item)}
															</li>
														);
													})}
												</ul>
											</div>
										</div>
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
					</div>
				</div>
			</div>
		);
	}
}

/**
 * Turns an image name into the src, relative to /public/images. Image should be a png.
 */
export function imageToURL(imageName) {
	return `${process.env.PUBLIC_URL}/images/${imageName}.png`;
}

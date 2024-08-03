import React from "react";
import "./App.css";
import Divider from "@material-ui/core/Divider";
import firebase from "./firebase";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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

		this.collapsibleOpened = this.collapsibleToggled.bind(this);
	}


	componentDidMount() {
		this.setState({
			studyVersion: this.props.studyVersion,
			resumeVersion: this.props.resumeVersion,
			// courses: [
			// 	{ name: "Statistics", firstSemester: "Full year / first semester", secondSemester: "n/a", thirdTrimester: "n/a" },
			// 	{ name: "AP English Literature", firstSemester: "Full year / first semester", secondSemester: "n/a", thirdTrimester: "n/a" },
			// 	{ name: "AP Chemistry", firstSemester: "Full year / first semester", secondSemester: "n/a", thirdTrimester: "n/a" },
			// 	{ name: "AP US History", firstSemester: "Full year / first semester", secondSemester: "n/a", thirdTrimester: "n/a" },
			// 	{ name: "Spanish 6", firstSemester: "Full year / first semester", secondSemester: "n/a", thirdTrimester: "n/a" }
			//   ],
		}, () => {
			this.parseCandidateData(() => {
				this.getResumeValues();
			});
		});
	}

	/** The first resume has randomly-decided values. Decide them and put into state. */
	getResumeValues() {
		let applicant = this.state.applicants[this.state.studyVersion - 1];
		/*BK: INSERT FIREBASE DATA HERE. PART1*/
		/* values on the right are being held in key on the left  */
		this.setState(
			{
				personal_address: applicant.a_personal_address, 
				name: applicant.a_personal_legal_name,
				citizenship: applicant.b_demographics_citizenship,
				gender: applicant.b_demographics_gender,
				hispanic: applicant.b_demographics_hispanic,
				racial: applicant.b_demographics_racial,
				fedu: applicant.c_family_fedu,
				medu: applicant.c_family_medu,
				gpa: applicant.d_gpa, 
				courses_taken: applicant.d_courses_taken,
				sat_rw: applicant.e_sat_rw,
				sat_math: applicant.e_sat_math,
				ap_subject1: applicant.e_ap_subject1,
				ap_subject2: applicant.e_ap_subject2,
			}
		);
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

	/** Fetches the candidate data from the database and stores it in state */
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
							<p className="content">Permanent home address: {this.state.personal_address}</p>
							<p className="content" style={{ marginTop: '12px', marginBottom: '12px' }}></p> {/*to insert slight line*/}
							<p className="content" style={{ fontWeight: "bold" }}>Demographics</p>
							<p className="content">Gender: {this.state.gender}</p>
							<p className="content">Citizenship status: {this.state.citizenship}</p>
							<p className="content">Hispanic/Latino/a/x: {this.state.hispanic}</p>
							<p className="content">Racial identity: {this.state.racial}</p>
							<p className="content" style={{ marginTop: '12px', marginBottom: '12px' }}></p>
							<p className="content" style={{ fontWeight: "bold" }}>Family</p>
							<p className="content">Father’s education: {this.state.fedu}</p>
							<p className="content">Mother’s education: {this.state.medu}</p>
						</div>
						<div className="section">
						<div className="header" style={{ marginTop: '20px' }}>Education</div>
						{/* confirm with Mike} <p className="content">Secondary/high school: {this.state.secondarySchool}</p> */}
						</div>
						<div className="section">
							{/* confirm with Mike} <div className="content" style={{ marginTop: '12px', fontWeight: "bold" }}>Grades</div> */}
							<div className="content" style={{ fontWeight: "bold" }}>Grades</div> 
							<p className="content">Cumulative GPA: {this.state.gpa}</p>
							{/* confirm with Mike}
							<p className="content">Unweighted GPA: {this.state.unweightedGPA}</p>
							<p className="content">Weighted GPA: {this.state.weightedGPA} (*calculated by adding .5 points for honors classes and 1 point for AP classes)</p>
							<p className="content">Honors/AP classes: {this.state.honorsAPClasses}</p> */}
						</div>
						<div className="section">
							<div className="content" style={{ marginTop: '12px', fontWeight: "bold" }}>Courses taken in current or most recent year</div>
							<p className="content"> {this.state.courses_taken}</p>

						</div>
						<div className="section">
							<div className="header" style={{ marginTop: '20px' }}>Testing</div>
							<p className="content" style={{ fontWeight: "bold" }}>SAT</p>
							<p className="content">Evidence-Based Reading and Writing: {this.state.sat_rw}</p>
							<p className="content">Mathematics: {this.state.sat_math}</p>
							<p className="content" style={{ fontWeight: "bold" }}>AP</p>
							<p className="content"> {this.state.ap_subject1}</p>
							<p className="content"> {this.state.ap_subject2}</p>
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
												<p className="content">Graduation rate: {this.state.graduation_rate}</p>
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

							{/* Transcript Section */}
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
													transcriptSectionOpened: !this.state.transcriptSectionOpened,
												},
												() => {
													this.collapsibleToggled(1);
													if (this.state.transcriptSectionOpened) {
														this.setState({
															// Mark the other sections as closed
															hsprofileSectionOpened: false,
															activitiesSectionOpened: false,
															essaySectionOpened: false,
															miscSectionOpened: false,
														});
													}
												}
											)
										}
									>
										Transcript{" "}
										<img
											id="toggle_icon"
											src={
												this.state.transcriptSectionOpened
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

							{/* Activities Section */}
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
													activitiesSectionOpened: !this.state.activitiesSectionOpened,
												},
												() => {
													this.collapsibleToggled(2);
													if (this.state.activitiesSectionOpened) {
														// Mark the other sections as closed
														this.setState({
															hsprofileSectionOpened: false,
															transcriptSectionOpened: false,
															essaySectionOpened: false,
															miscSectionOpened: false,
														});
													}
												}
											)
										}
									>
										Activities {" "}
										<img
											id="toggle_icon"
											src={
												this.state.activitiesSectionOpened
													? imageToURL("minus_icon")
													: imageToURL("plus_icon")
											}
											alt="toggle icon"
										/>
									</Accordion.Toggle>
								</Card.Header>

								<Accordion.Collapse eventKey="2">
									<Card.Body>

									</Card.Body>
								</Accordion.Collapse>
							</Card> 

							{/* Personal Essay Section */}
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
										eventKey="3"
										onClick={() =>
											this.setState(
												{
													essaySectionOpened: !this.state.essaySectionOpened,
												},
												() => {
													this.collapsibleToggled(1); /*bkcheck*/
													if (this.state.essaySectionOpened) {
														this.setState({
															// Mark the other sections as closed
															hsprofileSectionOpened: false,
															transcriptSectionOpened: false,
															activitiesSectionOpened: false,
															miscSectionOpened: false,
														});
													}
												}
											)
										}
									>
										Personal Essay{" "}
										<img
											id="toggle_icon"
											src={
												this.state.essaySectionOpened
													? imageToURL("minus_icon")
													: imageToURL("plus_icon")
											}
											alt="toggle icon"
										/>
									</Accordion.Toggle>
								</Card.Header>

								{/* Position List */}
								<Accordion.Collapse eventKey="3">
									<Card.Body>
										<p className="content">n/a</p> 
									</Card.Body>
								</Accordion.Collapse>
							</Card>

							{/* Miscellaneous Section */}
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
										eventKey="4"
										onClick={() =>
											this.setState(
												{
													miscSectionOpened: !this.state.miscSectionOpened,
												},
												() => {
													this.collapsibleToggled(1); /*bkcheck*/
													if (this.state.miscSectionOpened) {
														this.setState({
															// Mark the other sections as closed
															hsprofileSectionOpened: false,
															transcriptSectionOpened: false,
															activitiesSectionOpened: false,
															essaySectionOpened: false,
														});
													}
												}
											)
										}
									>
										Miscellaneous{" "}
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

								{/* Position List */}
								<Accordion.Collapse eventKey="4">
									<Card.Body>
										<p className="content">n/a</p>
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

import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import './css/AddVacancy.css'

const AddVacancy = () => {
    //requests
    const url = `${process.env.REACT_APP_DB_URI}/industryPartner/vacancies`

    const [message, setMessage] = useState(<div></div>)
    const [vacancy, setVacancy] = useState({
        position: ``,
        location: ``,
        startDate: ``
    });
    const [reveal, setReveal] = useState(false);
    const handleClose = () => setReveal(false);
    const handleShow = () => setReveal(true);

    const handleChange = event => {

        const { name, value } = event.target;
        setVacancy({
            ...vacancy,
            [name]: value
        });
        // console.log(vacancy)
    }

    const handleSubmit = e => {
        e.preventDefault();
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).accessToken;
        }
        axios.post(url,
            vacancy,
            { headers: { "x-access-token": token } })
            .then(response => {
                //do something
                setMessage(<div className="success-msg">Vacancy successfully added!</div>)
                console.log("What up home dog. How it hanging. Cool. Aight. Got something to say. It worked. SCREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAm")

                window.location.reload(false);

            })
            .catch(err => {
                setMessage(<div className="fail-msg">Vacancy could not be added.</div>)
                console.log(err)
            })
        setVacancy({
            position: ``,
            location: ``,
            startDate: ``
        });
    }

    return (
        <div className="modal-display">
            <Button
                variant="primary"
                onClick={handleShow}
                className="modal-btn-toggle"
                data-testid="display-button"
            >
                Add Vacancy
            </Button>
            <Modal show={reveal} onHide={handleClose} className="something" contentClassName="vacancy-modal-content" style={{}}>
                <div className="modal-scroller">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Add Vacancy
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="add-vacancy-form row" onSubmit={handleSubmit}>
                            <div className="field form-group">
                                <input className="input-field form-control" type="text" data-testid="position" value={vacancy.position} placeholder="Position" name="position" onChange={handleChange} required />
                            </div>
                            <div className="field form-group">
                                <input className="input-field form-control" type="text" data-testid="location" value={vacancy.location} placeholder="Location" name="location" onChange={handleChange} required />
                            </div>
                            <div className="field form-group">
                                <input className="input-field form-control" type="date" data-testid="start-date" name="startDate" onChange={handleChange} required />
                            </div>
                            <div className="submit btn btn-success form-group">
                                <input className="submit-field" type="submit" data-testid="submit" value="Add!" />
                            </div>

                            {message}

                        </form>
                    </Modal.Body>
                    {/* <Modal.Footer>
                    </Modal.Footer> */}
                </div>
            </Modal>
        </div >
    )

}

export default AddVacancy;
import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../actions/ui';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).milliseconds(0).add(1, 'hours');
const endTime = now.clone().add(1, 'hours');




export const CalendarModal = () => {

  const {modalOpen} = useSelector( state => state.ui );
  const dispatch = useDispatch();
  
  const [ dateStart, setDateStart ] = useState(now.toDate());
  const [ dateEnd, setDateEnd ] = useState(endTime.toDate());
  const [ titleValid, setTitleValid ] = useState(true);
  
  
  const [formValues, setFormValues] = useState({
    title: 'Event Title',
    notes: '',
    start: now.toDate(),
    end:   endTime.toDate(),
  });

  const { title, notes, start, end } = formValues;

  const handleInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const closeModal = () => {
    dispatch(uiCloseModal())
  };


  const handleStartDateChange = (date) => {
    setDateStart(date);
    setFormValues({
      ...formValues,
      start: date
    })
  };


  const handleEndDateChange = (date) => {
    setDateEnd(date);
    setFormValues({
      ...formValues,
      end: date
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if(momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire('Error',"La hora de finalización debe ser posterior a la hora de inicio", 'error');
    }

    if(title.trim() === '' || title.trim().length < 2) {
      return setTitleValid(false);
    }

    //TODO: Send data to server

    setTitleValid(true);
    closeModal();


  }


  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm} >
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker 
            onChange={handleStartDateChange} 
            value={dateStart} 
            className="form-control"
          />

        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker 
            onChange={handleEndDateChange} 
            minDate={dateStart}
            value={dateEnd} 
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control is-valid ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            value={title}
            onChange = {handleInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            value={notes}
            onChange={handleInputChange}
            rows="5"
            name="notes"
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

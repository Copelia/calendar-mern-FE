import { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addHours, differenceInSeconds } from 'date-fns'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../../../src/styles.css'
import { useCalendarStore, useUiStore } from '../../hooks';
import { getEnvVars } from '../../helpers/getEnvVars';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

if(getEnvVars().VITE_MODE !== 'test'){
  Modal.setAppElement('#root')
}

export const CalendarModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const onCloseModal = () => {
    closeDateModal();
  };

  const [formValues, setFormValues] = useState({
    title: 'Cora',
    notes: 'Galletas',
    start: new Date(),
    end: addHours(new Date(), 2)
  });

  //validación del título
  const titleClass = useMemo(() => {
    //si no se ha enviado el form, la clase es un string vacío
    if(!formSubmitted) return '';

    return(formValues.title.length > 0)
      ? 'is-valid'
      : 'is-invalid';

  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    //se hace la sig validacion pq hay casos donde activeEvent es null, como al cargar la app
    if(activeEvent !== null){
      setFormValues({...activeEvent})
    }
  }, [activeEvent]);

  const onInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  };

  //no entendí pa que esta nueva función
  //no recibo el target, más bien es el evento del cambio de fecha?
  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  };

  const onSubmit = async(event) => {
    event.preventDefault();
    setFormSubmitted(true);
    //hacer validaciones
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if(isNaN(difference) || difference <= 0){
      Swal.fire('Fecha incorrecta', 'Revisar las fechas ingresadas');
      return;
    }
    if(formValues.title.length <= 0) return;

    await startSavingEvent(formValues);
    closeDateModal();
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className={'modal'}
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={(e) => onDateChanged(e, 'start')}
            className='form-control'
            dateFormat="Pp"
            showTimeSelect
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(e) => onDateChanged(e, 'end')}
            className='form-control'
            dateFormat="Pp"
            showTimeSelect
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
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
  )
};

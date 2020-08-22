import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Logo_Branco from '../../../../assets/Logo_Branco.png'
import Logo_Recorte_Branco from '../../../../assets/Logo_Recorte_Branco.png'
import '../components/Modal.css'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 550,
    height: 300,
    backgroundColor: '#00524A',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 0, 0),
  },
}));

export default (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(props.stateModal);

  const handleClose = () => {
    props.setStateModal(false);
  };


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="container-modal">
          <div className="column1">
            <h2 className="h2-nome">{props.modalProfile.name}</h2>
            <h2 className="h2-styled">{props.modalProfile.lastname}</h2>
            <h2 className="h2-modal" id="email">{props.modalProfile.email}</h2>
            <h2 className="h2-modal">RG: {props.modalProfile.rg}</h2>
            <h2 className="h2-modal">CPF: {props.modalProfile.cpf}</h2>
            <img src={Logo_Branco} className="logo_modal" alt="Novo Net"/>
          </div>
          <div className="column2">
            <h2 className="h2-styled-branco">COD:</h2>
            <h2 className="h2-modal" id="code">{props.modalProfile.code}</h2>
            <h2 className="h2-styled-branco">Status:</h2>
            <h2>{props.modalProfile.status}</h2>
          </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
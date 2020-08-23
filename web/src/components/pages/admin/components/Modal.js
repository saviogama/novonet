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
    background: 'linear-gradient(90deg, rgba(0,82,74,1) 0%, rgba(0,145,129,1) 100%)',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 0, 0),
  },
}));

export default (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(props.stateModal);

  const handleClose = () => {
    props.setStateModal(false);
  };


  const body = () => {
      if(props.partner){
          return(
            <div style={modalStyle} className={classes.paper}>
              <div className="container-modal">
                  <div className="column1">
                    <h2 className="h2-nome">{props.modalProfile.name}</h2>
                    <h2 className="h2-styled">{props.modalProfile.lastname}</h2>
                    <img src={Logo_Branco} className="logo_modal" alt="Novo Net"/>
                  </div>
                  <div className="column2">
                      <div className="row1">
                        <h2 className="h2-styled-branco">Cod:</h2>
                        <h2 className="h2-modal" id="code">{props.modalProfile.code}</h2>
                      </div>
                      <div className="row2">
                        <h2 className="h2-styled-branco">Status:</h2>
                        <h2 className="h2-modal" id="status">{props.modalProfile.status}</h2>
                      </div>
                  </div>
              </div>
            </div>
          );
      }else{
          return(
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
                      <div className="row1">
                        <h2 className="h2-styled-branco">Cod:</h2>
                        <h2 className="h2-modal" id="code">{props.modalProfile.code}</h2>
                      </div>
                      <div className="row2">
                        <h2 className="h2-styled-branco">Status:</h2>
                        <h2 className="h2-modal" id="status">{props.modalProfile.status}</h2>
                      </div>
                  </div>
              </div>
            </div>
          );
      }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body()}
      </Modal>
    </div>
  );
}
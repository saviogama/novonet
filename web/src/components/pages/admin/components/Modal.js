import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import background from '../../../../assets/carteirinha/frente/fundo-1.svg'
import Logo_Carteira from '../../../../assets/carteirinha/frente/empresa.png'
import Grupo_Direita from '../../../../assets/carteirinha/frente/grupo direita.svg'
import Grupo_Esquerda from '../../../../assets/carteirinha/frente/Grupo esquerda.svg'
import Grupo_DireitaBack from '../../../../assets/carteirinha/verso/grupo_direta.svg'
import RedesSociais from '../../../../assets/carteirinha/verso/redes_sociais.png'
import {IconButton} from '@material-ui/core';
import {SwapVerticalCircle} from '@material-ui/icons'
import '../components/Modal.css'

const QRCode = require('qrcode.react');

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
    width: 580,
    height: 350,
    backgroundImage: `url(${background})`,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 0, 0),
  },

  icon: {
    color: '#fff'
  }
}));

export default (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(props.stateModal);
  const [sideCard, setSideCard] = useState(true);

  const handleClose = () => {
    props.setStateModal(false);
  };

  function statusSelection(status){
    if(status === true){
        return 'Ativo'
    }else{
        return 'Inativo'
    }
  }

  const body = () => {
      if(props.partner){
        if(sideCard){
          return(
            <div>
              <IconButton className={classes.icon}  onClick={() => setSideCard(false)}>
                <SwapVerticalCircle/>
              </IconButton>
              <div style={modalStyle} className={classes.paper}>
                <div className="container-modal">
                  <img src={Grupo_Esquerda} className="grupo_esquerda" alt="Linhas verticais"/>
                    <div className="column1">
                      <h2 className="h2-nome">{props.modalProfile.firstname}</h2>
                      <h2 className="h2-styled">{props.modalProfile.lastname}</h2>
                      <img src={Logo_Carteira} className="logo_carteira" alt="Novo Net"/>
                    </div>
                    <div className="column2">
                    <img src={Grupo_Direita} className="grupo_direita" alt="Linhas horizontais"/>
                        <div className="row1">
                          <h2 className="h2-styled-branco">Cod:</h2>
                          <h2 className="h2-modal" id="content">{props.modalProfile.code}</h2>
                        </div>
                        <div className="row2">
                          <h2 className="h2-styled-branco">Status:</h2>
                          <h2 className="h2-modal" id="content">{statusSelection(props.modalProfile.status)}</h2>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          );
        }else{
          return(
            <div>
                        <IconButton className={classes.icon} onClick={() => setSideCard(true)}>
                            <SwapVerticalCircle/>
                        </IconButton>
                        <div style={modalStyle} className={classes.paper}>
                          <div className="client-cardAdmin">
                              <div className="container-card-backside">
                                  <div className="column1-backside">
                                      <QRCode value={props.modalProfile.code} renderAs='svg' size='158' bgColor='#065048' fgColor='#ccd336' />
                                      <img src={Logo_Carteira} className="logo_carteira-verso" alt="Novo Net"/>
                                  </div>
                                  <div className="column2-backside">
                                      <h2 className="texto-backside">É obrigatório a apresentação de um documento com foto comprovando a titularidade</h2>
                                      <img src={Grupo_DireitaBack} className="grupo-direita-backside" alt="Linhas horizontais" />
                                      <img src={RedesSociais} className="redes-sociais" alt="NOVONetoficial"/>
                                  </div>
                              </div>
                          </div>
                        </div>
                    </div>
          );
        }
      }else if(props.partnersProfile){
          return(
            <div style={modalStyle} className={classes.paper}>
            <div className="container-modal">
              <img src={Grupo_Esquerda} className="grupo_esquerda" alt="Linhas verticais"/>
                <div className="column1">

                  <h2 className="h2-nome">{props.modalProfile.name}</h2>

                  <div className="row1" id="margin">
                    <h2 className="h2-styled-branco">Email: </h2>
                    <h2 className="h2-modal" id="email">{props.modalProfile.email}</h2>
                  </div>

                  <div className="row2">
                    <h2 className="h2-styled-branco">RG: </h2>
                    <h2 className="h2-modal" id="content">{props.modalProfile.rg}</h2>
                  </div>

                  <div className="row3">
                    <h2 className="h2-styled-branco">CPF: </h2>
                    <h2 className="h2-modal" id="content">{props.modalProfile.cpf}</h2>
                  </div>

                  <div className="row4">
                    <h2 className="h2-styled-branco">Company:</h2>
                      <h2 className="h2-modal" id="email">{props.modalProfile.company_name}</h2>
                  </div>

                  <img src={Logo_Carteira} className="logo_carteira" alt="Novo Net"/>
                </div>
                <div className="column2">
                  <img src={Grupo_Direita} className="grupo_direita" alt="Linhas horizontais"/>
                    <div className="row1">
                      <h2 className="h2-styled-branco">CNPJ:</h2>
                      <h2 className="h2-modal" id="content">{props.modalProfile.cnpj}</h2>
                    </div>
                </div>
            </div>
          </div>
          );
      }else if(props.changePassword){
        return(
          <div className="changePassword-container">
            <div className="data-container" >
              <input type="text" placeholder="Digite a senha" value={props.password} onChange={e => props.setPassword(e.target.value)}/>
              <button className="button" id="butPass" onClick={() => props.changePasswordFunc()}>Mudar senha</button>
            </div>
          </div>
        );
      }else{
        if(sideCard){
          return(
            <div>
              <IconButton className={classes.icon}  onClick={() => setSideCard(false)}>
                <SwapVerticalCircle/>
              </IconButton>
              <div style={modalStyle} className={classes.paper}>
                <div className="container-modal">
                <img src={Grupo_Esquerda} className="grupo_esquerda" alt="Linhas verticais"/>
                    <div className="column1">

                      <h2 className="h2-nome">{props.modalProfile.firstname}</h2>
                      <h2 className="h2-styled">{props.modalProfile.lastname}</h2>

                      <div className="row1" id="margin">
                        <h2 className="h2-styled-branco">Email: </h2>
                        <h2 className="h2-modal" id="email">{props.modalProfile.email}</h2>
                      </div>

                      <div className="row2">
                        <h2 className="h2-styled-branco">RG: </h2>
                        <h2 className="h2-modal" id="content">{props.modalProfile.rg}</h2>
                      </div>

                      <div className="row3">
                        <h2 className="h2-styled-branco">CPF: </h2>
                        <h2 className="h2-modal" id="content">{props.modalProfile.cpf}</h2>
                      </div>

                      <img src={Logo_Carteira} className="logo_carteira" alt="Novo Net"/>
                    </div>
                    <div className="column2">
                      <img src={Grupo_Direita} className="grupo_direita" alt="Linhas horizontais"/>
                        <div className="row1">
                          <h2 className="h2-styled-branco">Cods:</h2>
                          <h2 className="h2-modal" id="content">{props.modalProfile.code}</h2>
                        </div>
                        <div className="row2">
                          <h2 className="h2-styled-branco">Status:</h2>
                          <h2 className="h2-modal" id="content">{statusSelection(props.modalProfile.status)}</h2>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          );
        }else{
          return(
            <div>
                        <IconButton className={classes.icon} onClick={() => setSideCard(true)}>
                            <SwapVerticalCircle/>
                        </IconButton>
                        <div style={modalStyle} className={classes.paper}>
                          <div className="client-cardAdmin">
                              <div className="container-card-backside">
                                  <div className="column1-backside">
                                      <QRCode value={props.modalProfile.code} renderAs='svg' size='158' bgColor='#065048' fgColor='#ccd336' />
                                      <img src={Logo_Carteira} className="logo_carteira-verso" alt="Novo Net"/>
                                  </div>
                                  <div className="column2-backside">
                                      <h2 className="texto-backside">É obrigatório a apresentação de um documento com foto comprovando a titularidade</h2>
                                      <img src={Grupo_DireitaBack} className="grupo-direita-backside" alt="Linhas horizontais" />
                                      <img src={RedesSociais} className="redes-sociais" alt="NOVONetoficial"/>
                                  </div>
                              </div>
                          </div>
                        </div>
                    </div>
          );
        }
      }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body()}
      </Modal>
    </div>
  );
}
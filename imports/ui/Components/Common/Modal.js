import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const getTooltip = msg => <Tooltip>{msg}</Tooltip>;

class NavBar extends Component {
  render() {
    const {
      title,
      children,
      showModal,
      closeModal,
      confirmationCallback,
      confirmationButtonTitle,
      full,
      disabledButton,
      disabledReason,
      id
    } = this.props;
    return (
      <Modal id={id} show={showModal} onHide={closeModal}>
        {title && (
          <Modal.Title>
            <h2 style={{ padding: "0 0.5em" }}>{title}</h2>
          </Modal.Title>
        )}
        <Modal.Body style={full ? { padding: 0 } : {}}>{children}</Modal.Body>
        <Modal.Footer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={closeModal}>Cancelar</Button>
            {confirmationCallback && (
              <div>
                {disabledButton ? (
                  <OverlayTrigger
                    overlay={getTooltip(disabledReason)}
                    placement="top"
                  >
                    <Button disabled={true} onClick={confirmationCallback}>
                      {confirmationButtonTitle}
                    </Button>
                  </OverlayTrigger>
                ) : (
                  <Button onClick={confirmationCallback}>
                    {confirmationButtonTitle}
                  </Button>
                )}
              </div>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

NavBar.propTypes = {
  showModal: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  id: PropTypes.string,
  closeModal: PropTypes.func,
  confirmationCallback: PropTypes.func,
  confirmationButtonTitle: PropTypes.string,
  full: PropTypes.bool,
  disabledReason: PropTypes.string
};

NavBar.defaultProps = {
  confirmationButtonTitle: "Cadastrar"
};

export default NavBar;

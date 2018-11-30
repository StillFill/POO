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
      id,
      small,
      showFooter
    } = this.props;
    return (
      <Modal
        id={id}
        className={small ? "small-modal" : ""}
        show={showModal}
        onHide={closeModal}
      >
        {title && (
          <Modal.Title>
            <h2 style={{ padding: "0 0.5em" }}>{title}</h2>
          </Modal.Title>
        )}
        <Modal.Body style={full ? { padding: 0 } : {}}>{children}</Modal.Body>
        {showFooter && (
          <Modal.Footer>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <buttton className="cancel-button" onClick={closeModal}>
                Cancelar
              </buttton>
              {confirmationCallback && (
                <div>
                  {disabledButton ? (
                    <OverlayTrigger
                      overlay={getTooltip(disabledReason)}
                      placement="top"
                    >
                      <button
                        className="success-button"
                        disabled={true}
                        onClick={confirmationCallback}
                      >
                        {confirmationButtonTitle}
                      </button>
                    </OverlayTrigger>
                  ) : (
                    <button
                      className="success-button"
                      onClick={confirmationCallback}
                    >
                      {confirmationButtonTitle}
                    </button>
                  )}
                </div>
              )}
            </div>
          </Modal.Footer>
        )}
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
  disabledReason: PropTypes.string,
  small: PropTypes.bool
};

NavBar.defaultProps = {
  confirmationButtonTitle: "Cadastrar",
  showFooter: true
};

export default NavBar;

import React from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';

const ModalComponent = props => {
  const { isOpen, onClose } = props;

  return (
    <Modal open={isOpen} onClose={onClose} center>
      <div style={{ fontSize: '20px' }}>
        <p>
          On 4th of September 2018, in a{' '}
          <a href="https://info.shapeshift.io/blog/2018/09/04/introducing-shapeshift-membership/">
            blogpost
          </a>
          , Shapeshift, one of the largest cryptocurrency entities, scummed to
          user data collection.
        </p>
        <p>
          By creating an account on a custodial exchange like Shapeshift, you
          are giving the government and anyone who can access that KYC data, the
          power to not only know that you have crypto assets but also to
          confiscate them during a trade.
        </p>
        <p>
          We built Boltz with a dream of a fairer financial world, with the
          primary goal to empower users with financial sovereignty. Therefore,{' '}
          <b>
            Boltz does not and will never collect any personal data from users
          </b>
          .
        </p>
        <p>
          Also, Boltz leverages atomic swaps in a way, so that trades either
          complete in full or get refunded. Users can rest assured to be in
          possession of their funds at all times, without worrying about who is
          behind Boltz and if this entity is trustworthy.
        </p>
        <p>
          Trading <b>{`shouldn't`}</b> require an account.
        </p>
      </div>
    </Modal>
  );
};

ModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default ModalComponent;
